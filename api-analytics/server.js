const express = require('express');
const cors = require('cors');
const { neon } = require('@neondatabase/serverless');

const app = express();
const PORT = process.env.PORT || 3002;

// Database connection
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_QDwB9pWHXm6S@ep-polished-moon-aieg89w2-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require';
const sql = neon(DATABASE_URL);

// Middlewares
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc)
    if (!origin) return callback(null, true);

    // Allow localhost on any port for development
    if (origin.match(/^http:\/\/localhost:\d+$/)) {
      return callback(null, true);
    }

    // Allow production domains
    const allowedOrigins = [
      'https://propiedadenrd.com',
      'https://www.propiedadenrd.com'
    ];

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(null, false);
  },
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/health', async (req, res) => {
  try {
    await sql`SELECT 1`;
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// ============================================================================
// ANALYTICS ENDPOINTS
// ============================================================================

// POST /api/analytics - Receive single event
app.post('/api/analytics', async (req, res) => {
  try {
    const { event_type, properties, session_id, url } = req.body;

    if (!event_type) {
      return res.status(400).json({ error: 'event_type es requerido' });
    }

    const result = await sql`
      INSERT INTO analytics_events (event_type, properties, session_id, url)
      VALUES (${event_type}, ${JSON.stringify(properties || {})}, ${session_id}, ${url})
      RETURNING id
    `;

    res.json({ success: true, id: result[0].id });
  } catch (error) {
    console.error('Error POST /api/analytics:', error);
    res.status(500).json({ error: 'Error al guardar evento', message: error.message });
  }
});

// POST /api/analytics/batch - Receive multiple events
app.post('/api/analytics/batch', async (req, res) => {
  try {
    const { events } = req.body;

    if (!Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ error: 'events debe ser un array no vacío' });
    }

    // Limit to 100 events per batch
    const eventsToInsert = events.slice(0, 100);
    const inserted = [];

    for (const event of eventsToInsert) {
      const result = await sql`
        INSERT INTO analytics_events (event_type, properties, session_id, url)
        VALUES (
          ${event.event_type || 'unknown'},
          ${JSON.stringify(event.properties || {})},
          ${event.session_id || null},
          ${event.url || null}
        )
        RETURNING id
      `;
      inserted.push(result[0].id);
    }

    res.json({ success: true, inserted: inserted.length, ids: inserted });
  } catch (error) {
    console.error('Error POST /api/analytics/batch:', error);
    res.status(500).json({ error: 'Error al guardar eventos', message: error.message });
  }
});

// ============================================================================
// STATS ENDPOINTS
// ============================================================================

// GET /api/stats/property/:slug - Stats for a specific property
app.get('/api/stats/property/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const days = parseInt(req.query.days) || 30;

    const result = await sql`
      SELECT
        COUNT(*) FILTER (WHERE event_type = 'property_view') as views,
        COUNT(*) FILTER (WHERE event_type = 'whatsapp_click') as whatsapp_clicks,
        COUNT(*) FILTER (WHERE event_type = 'favorite_added') as favorites,
        COUNT(*) FILTER (WHERE event_type = 'share_completed') as shares,
        COUNT(DISTINCT session_id) as unique_visitors
      FROM analytics_events
      WHERE properties->>'slug' = ${slug}
        AND created_at >= NOW() - INTERVAL '1 day' * ${days}
    `;

    res.json({
      slug,
      period_days: days,
      stats: result[0] || { views: 0, whatsapp_clicks: 0, favorites: 0, shares: 0, unique_visitors: 0 }
    });
  } catch (error) {
    console.error('Error GET /api/stats/property:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas', message: error.message });
  }
});

// GET /api/stats/top-properties - Most viewed properties
app.get('/api/stats/top-properties', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const limit = parseInt(req.query.limit) || 10;

    const result = await sql`
      SELECT
        properties->>'slug' as slug,
        properties->>'title' as title,
        COUNT(*) as views,
        COUNT(*) FILTER (WHERE event_type = 'whatsapp_click') as whatsapp_clicks
      FROM analytics_events
      WHERE event_type IN ('property_view', 'whatsapp_click')
        AND properties->>'slug' IS NOT NULL
        AND created_at >= NOW() - INTERVAL '1 day' * ${days}
      GROUP BY properties->>'slug', properties->>'title'
      ORDER BY views DESC
      LIMIT ${limit}
    `;

    res.json({ period_days: days, properties: result });
  } catch (error) {
    console.error('Error GET /api/stats/top-properties:', error);
    res.status(500).json({ error: 'Error al obtener top propiedades', message: error.message });
  }
});

// GET /api/stats/overview - General stats overview
app.get('/api/stats/overview', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;

    const totals = await sql`
      SELECT
        COUNT(*) FILTER (WHERE event_type = 'page_view') as page_views,
        COUNT(*) FILTER (WHERE event_type = 'property_view') as property_views,
        COUNT(*) FILTER (WHERE event_type = 'whatsapp_click') as whatsapp_clicks,
        COUNT(*) FILTER (WHERE event_type = 'favorite_added') as favorites_added,
        COUNT(*) FILTER (WHERE event_type LIKE 'share_%') as shares,
        COUNT(*) FILTER (WHERE event_type = 'search') as searches,
        COUNT(DISTINCT session_id) as unique_visitors
      FROM analytics_events
      WHERE created_at >= NOW() - INTERVAL '1 day' * ${days}
    `;

    const trend = await sql`
      SELECT
        DATE(created_at) as date,
        COUNT(*) FILTER (WHERE event_type = 'property_view') as views,
        COUNT(*) FILTER (WHERE event_type = 'whatsapp_click') as clicks
      FROM analytics_events
      WHERE created_at >= NOW() - INTERVAL '1 day' * ${days}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;

    res.json({
      period_days: days,
      totals: totals[0],
      daily_trend: trend
    });
  } catch (error) {
    console.error('Error GET /api/stats/overview:', error);
    res.status(500).json({ error: 'Error al obtener resumen', message: error.message });
  }
});

// GET /api/stats/locations - Stats by location
app.get('/api/stats/locations', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const limit = parseInt(req.query.limit) || 20;

    const result = await sql`
      SELECT
        properties->>'location' as location,
        COUNT(*) as views,
        COUNT(*) FILTER (WHERE event_type = 'whatsapp_click') as whatsapp_clicks,
        COUNT(DISTINCT properties->>'slug') as unique_properties
      FROM analytics_events
      WHERE event_type IN ('property_view', 'whatsapp_click')
        AND properties->>'location' IS NOT NULL
        AND created_at >= NOW() - INTERVAL '1 day' * ${days}
      GROUP BY properties->>'location'
      ORDER BY views DESC
      LIMIT ${limit}
    `;

    res.json({ period_days: days, locations: result });
  } catch (error) {
    console.error('Error GET /api/stats/locations:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas por ubicación', message: error.message });
  }
});

// ============================================================================
// FAVORITES ENDPOINTS
// ============================================================================

// POST /api/favorites - Save user favorites
app.post('/api/favorites', async (req, res) => {
  try {
    const { user_id, favorites } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: 'user_id es requerido' });
    }

    const result = await sql`
      INSERT INTO user_favorites (user_id, favorites, updated_at)
      VALUES (${user_id}, ${JSON.stringify(favorites || [])}, NOW())
      ON CONFLICT (user_id)
      DO UPDATE SET favorites = ${JSON.stringify(favorites || [])}, updated_at = NOW()
      RETURNING id, updated_at
    `;

    res.json({ success: true, updated_at: result[0].updated_at });
  } catch (error) {
    console.error('Error POST /api/favorites:', error);
    res.status(500).json({ error: 'Error al guardar favoritos', message: error.message });
  }
});

// GET /api/favorites/:userId - Get user favorites
app.get('/api/favorites/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await sql`
      SELECT favorites, updated_at
      FROM user_favorites
      WHERE user_id = ${userId}
    `;

    if (result.length === 0) {
      return res.json({ favorites: [], updated_at: null });
    }

    res.json({
      favorites: result[0].favorites || [],
      updated_at: result[0].updated_at
    });
  } catch (error) {
    console.error('Error GET /api/favorites:', error);
    res.status(500).json({ error: 'Error al obtener favoritos', message: error.message });
  }
});

// ============================================================================
// SITE CONFIG ENDPOINTS
// ============================================================================

// Initialize site_config table (run once)
app.post('/api/config/init', async (req, res) => {
  try {
    // Create table if not exists
    await sql`
      CREATE TABLE IF NOT EXISTS site_config (
        id SERIAL PRIMARY KEY,
        key VARCHAR(100) UNIQUE NOT NULL,
        value JSONB NOT NULL,
        category VARCHAR(50) DEFAULT 'general',
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Default configuration values
    const defaults = [
      // Company Info
      { key: 'company_name', value: 'PropiedadEnRD.com', category: 'company' },
      { key: 'company_slogan', value: 'Tu portal inmobiliario en República Dominicana', category: 'company' },
      { key: 'logo_url', value: '/logo.png', category: 'company' },
      { key: 'favicon_url', value: '/favicon.ico', category: 'company' },

      // Contact Info
      { key: 'email', value: 'info@propiedadenrd.com', category: 'contact' },
      { key: 'phone', value: '+18095550000', category: 'contact' },
      { key: 'phone_display', value: '+1 809-555-0000', category: 'contact' },
      { key: 'whatsapp', value: '18095550000', category: 'contact' },
      { key: 'business_hours', value: 'Lun-Vie 9am-6pm', category: 'contact' },

      // Location
      { key: 'address_street', value: '', category: 'location' },
      { key: 'address_city', value: 'Santo Domingo', category: 'location' },
      { key: 'address_country', value: 'República Dominicana', category: 'location' },
      { key: 'address_country_code', value: 'DO', category: 'location' },
      { key: 'geo_latitude', value: '18.7357', category: 'location' },
      { key: 'geo_longitude', value: '-70.1627', category: 'location' },

      // Social Media
      { key: 'social_facebook', value: 'https://facebook.com/propiedadenrd', category: 'social' },
      { key: 'social_instagram', value: 'https://instagram.com/propiedadenrd', category: 'social' },
      { key: 'social_linkedin', value: 'https://linkedin.com/company/propiedadenrd', category: 'social' },
      { key: 'social_youtube', value: '', category: 'social' },
      { key: 'social_twitter', value: '', category: 'social' },
      { key: 'social_tiktok', value: '', category: 'social' },

      // SEO
      { key: 'site_url', value: 'https://propiedadenrd.com', category: 'seo' },
      { key: 'og_image', value: 'https://propiedadenrd.com/og-image.jpg', category: 'seo' },
      { key: 'meta_title', value: 'PropiedadEnRD.com - Propiedades en República Dominicana', category: 'seo' },
      { key: 'meta_description', value: 'Encuentra casas, apartamentos y terrenos en venta y alquiler en República Dominicana. El portal inmobiliario más completo del país.', category: 'seo' },

      // Portal Stats (for marketing pages)
      { key: 'stat_properties', value: '2,500+', category: 'stats' },
      { key: 'stat_agents', value: '150+', category: 'stats' },
      { key: 'stat_cities', value: '25+', category: 'stats' },
      { key: 'stat_monthly_visitors', value: '50K+', category: 'stats' },
      { key: 'stat_satisfaction', value: '95%', category: 'stats' },

      // API Config
      { key: 'analytics_api', value: 'http://5.161.98.140:3002', category: 'api' },
      { key: 'lead_source', value: 'propiedadenrd', category: 'api' }
    ];

    // Insert defaults (ignore if already exists)
    for (const config of defaults) {
      await sql`
        INSERT INTO site_config (key, value, category)
        VALUES (${config.key}, ${JSON.stringify(config.value)}, ${config.category})
        ON CONFLICT (key) DO NOTHING
      `;
    }

    res.json({ success: true, message: 'Site config initialized', count: defaults.length });
  } catch (error) {
    console.error('Error POST /api/config/init:', error);
    res.status(500).json({ error: 'Error initializing config', message: error.message });
  }
});

// GET /api/config - Get all site config
app.get('/api/config', async (req, res) => {
  try {
    const { category } = req.query;

    let result;
    if (category) {
      result = await sql`
        SELECT key, value, category, updated_at
        FROM site_config
        WHERE category = ${category}
        ORDER BY key
      `;
    } else {
      result = await sql`
        SELECT key, value, category, updated_at
        FROM site_config
        ORDER BY category, key
      `;
    }

    // Transform to object format for easier consumption
    const config = {};
    const byCategory = {};

    for (const row of result) {
      config[row.key] = row.value;

      if (!byCategory[row.category]) {
        byCategory[row.category] = {};
      }
      byCategory[row.category][row.key] = row.value;
    }

    res.json({
      config,
      byCategory,
      count: result.length
    });
  } catch (error) {
    console.error('Error GET /api/config:', error);
    res.status(500).json({ error: 'Error fetching config', message: error.message });
  }
});

// GET /api/config/:key - Get specific config value
app.get('/api/config/:key', async (req, res) => {
  try {
    const { key } = req.params;

    const result = await sql`
      SELECT key, value, category, updated_at
      FROM site_config
      WHERE key = ${key}
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: 'Config key not found' });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Error GET /api/config/:key:', error);
    res.status(500).json({ error: 'Error fetching config', message: error.message });
  }
});

// PUT /api/config/:key - Update specific config value
app.put('/api/config/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const { value, category } = req.body;

    if (value === undefined) {
      return res.status(400).json({ error: 'value is required' });
    }

    const result = await sql`
      UPDATE site_config
      SET value = ${JSON.stringify(value)},
          category = COALESCE(${category}, category),
          updated_at = NOW()
      WHERE key = ${key}
      RETURNING *
    `;

    if (result.length === 0) {
      // Insert if not exists
      const insertResult = await sql`
        INSERT INTO site_config (key, value, category)
        VALUES (${key}, ${JSON.stringify(value)}, ${category || 'general'})
        RETURNING *
      `;
      return res.json({ success: true, created: true, config: insertResult[0] });
    }

    res.json({ success: true, updated: true, config: result[0] });
  } catch (error) {
    console.error('Error PUT /api/config/:key:', error);
    res.status(500).json({ error: 'Error updating config', message: error.message });
  }
});

// PUT /api/config - Bulk update config
app.put('/api/config', async (req, res) => {
  try {
    const { configs } = req.body;

    if (!Array.isArray(configs)) {
      return res.status(400).json({ error: 'configs must be an array' });
    }

    const updated = [];
    for (const { key, value, category } of configs) {
      if (!key || value === undefined) continue;

      await sql`
        INSERT INTO site_config (key, value, category)
        VALUES (${key}, ${JSON.stringify(value)}, ${category || 'general'})
        ON CONFLICT (key)
        DO UPDATE SET value = ${JSON.stringify(value)}, updated_at = NOW()
      `;
      updated.push(key);
    }

    res.json({ success: true, updated: updated.length, keys: updated });
  } catch (error) {
    console.error('Error PUT /api/config (bulk):', error);
    res.status(500).json({ error: 'Error updating configs', message: error.message });
  }
});

// ============================================================================
// LEADS ENDPOINTS
// ============================================================================

// POST /api/leads - Save a lead (contact form submission)
app.post('/api/leads', async (req, res) => {
  try {
    const {
      property_slug,
      property_title,
      name,
      email,
      phone,
      message,
      source,
      session_id,
      agent_name,
      agent_company
    } = req.body;

    if (!name && !email && !phone) {
      return res.status(400).json({ error: 'Se requiere al menos nombre, email o teléfono' });
    }

    const result = await sql`
      INSERT INTO leads (property_slug, property_title, name, email, phone, message, source, session_id, agent_name, agent_company)
      VALUES (${property_slug}, ${property_title}, ${name}, ${email}, ${phone}, ${message}, ${source || 'propiedadenrd'}, ${session_id}, ${agent_name || null}, ${agent_company || null})
      RETURNING id, created_at
    `;

    res.json({ success: true, id: result[0].id, created_at: result[0].created_at });
  } catch (error) {
    console.error('Error POST /api/leads:', error);
    res.status(500).json({ error: 'Error al guardar lead', message: error.message });
  }
});

// GET /api/leads - Get all leads (for admin dashboard)
app.get('/api/leads', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const limit = parseInt(req.query.limit) || 100;

    const result = await sql`
      SELECT *
      FROM leads
      WHERE created_at >= NOW() - INTERVAL '1 day' * ${days}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;

    res.json({ leads: result, count: result.length });
  } catch (error) {
    console.error('Error GET /api/leads:', error);
    res.status(500).json({ error: 'Error al obtener leads', message: error.message });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'PropiedadEnRD Analytics API',
    version: '1.1.0',
    endpoints: {
      analytics: 'POST /api/analytics, POST /api/analytics/batch',
      stats: 'GET /api/stats/overview, /api/stats/property/:slug, /api/stats/top-properties, /api/stats/locations',
      favorites: 'GET/POST /api/favorites/:userId',
      leads: 'GET/POST /api/leads',
      config: 'GET /api/config, GET/PUT /api/config/:key, POST /api/config/init'
    }
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Analytics API running on port ${PORT}`);
});

module.exports = app;
