/**
 * Migration script for PropiedadEnRD Analytics Database
 * Run with: node migrations/run.js
 */

const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_QDwB9pWHXm6S@ep-polished-moon-aieg89w2-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require';
const sql = neon(DATABASE_URL);

async function migrate() {
  console.log('Starting migration...');

  try {
    // ============================================================================
    // TABLE: analytics_events
    // ============================================================================
    console.log('Creating analytics_events table...');
    await sql`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id SERIAL PRIMARY KEY,
        event_type VARCHAR(50) NOT NULL,
        properties JSONB DEFAULT '{}',
        session_id VARCHAR(100),
        url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_analytics_session ON analytics_events(session_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_analytics_properties_slug ON analytics_events((properties->>'slug'))`;

    console.log('analytics_events table created.');

    // ============================================================================
    // TABLE: user_favorites
    // ============================================================================
    console.log('Creating user_favorites table...');
    await sql`
      CREATE TABLE IF NOT EXISTS user_favorites (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(100) UNIQUE NOT NULL,
        favorites JSONB DEFAULT '[]',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    await sql`CREATE INDEX IF NOT EXISTS idx_favorites_user ON user_favorites(user_id)`;

    console.log('user_favorites table created.');

    // ============================================================================
    // TABLE: leads
    // ============================================================================
    console.log('Creating leads table...');
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        property_slug VARCHAR(255),
        property_title VARCHAR(500),
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        message TEXT,
        source VARCHAR(50) DEFAULT 'website',
        session_id VARCHAR(100),
        status VARCHAR(50) DEFAULT 'new',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    await sql`CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_leads_property ON leads(property_slug)`;

    console.log('leads table created.');

    console.log('Migration completed successfully!');

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
