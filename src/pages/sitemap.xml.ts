import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = import.meta.env.DATABASE_URL || process.env.DATABASE_URL;
const UBIKALA_DATABASE_URL = import.meta.env.UBIKALA_DATABASE_URL || process.env.UBIKALA_DATABASE_URL;

const sql = DATABASE_URL ? neon(DATABASE_URL) : null;
const ubikalaDb = UBIKALA_DATABASE_URL ? neon(UBIKALA_DATABASE_URL) : null;

// Property types for /comprar/[type] routes (Spanish)
const PROPERTY_TYPES_ES = [
  'apartamento', 'casa', 'villa', 'penthouse', 'terreno',
  'local-comercial', 'oficina', 'nave', 'finca'
];

// Property types for /en/buy/[type] routes (English)
const PROPERTY_TYPES_EN = [
  'apartments', 'houses', 'villas', 'penthouses', 'land',
  'commercial', 'offices', 'warehouses'
];

// Static pages with their priority and change frequency
const STATIC_PAGES: { url: string; priority: string; changefreq: string }[] = [
  // Spanish (default)
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/comprar', priority: '0.9', changefreq: 'daily' },
  { url: '/alquilar', priority: '0.9', changefreq: 'daily' },
  { url: '/propiedades', priority: '0.8', changefreq: 'daily' },
  { url: '/asesores', priority: '0.8', changefreq: 'weekly' },
  { url: '/inmobiliarias', priority: '0.8', changefreq: 'weekly' },
  { url: '/buscar', priority: '0.7', changefreq: 'daily' },
  { url: '/publicar', priority: '0.7', changefreq: 'monthly' },
  { url: '/contacto', priority: '0.6', changefreq: 'monthly' },
  { url: '/nosotros', priority: '0.5', changefreq: 'monthly' },
  { url: '/guias', priority: '0.7', changefreq: 'monthly' },
  { url: '/guias/proceso-compra-propiedad', priority: '0.6', changefreq: 'monthly' },
  { url: '/guias/documentos-compra-venta', priority: '0.6', changefreq: 'monthly' },
  { url: '/guias/fideicomiso-inmobiliario', priority: '0.6', changefreq: 'monthly' },
  { url: '/guias/impuestos-inmobiliarios', priority: '0.6', changefreq: 'monthly' },
  { url: '/guias/invertir-punta-cana', priority: '0.6', changefreq: 'monthly' },
  { url: '/guias/extranjeros-comprando-rd', priority: '0.6', changefreq: 'monthly' },
  { url: '/privacidad', priority: '0.3', changefreq: 'yearly' },
  { url: '/terminos', priority: '0.3', changefreq: 'yearly' },

  // English
  { url: '/en', priority: '0.8', changefreq: 'daily' },
  { url: '/en/buy', priority: '0.7', changefreq: 'daily' },
  { url: '/en/rent', priority: '0.7', changefreq: 'daily' },
  { url: '/en/agents', priority: '0.6', changefreq: 'weekly' },
  { url: '/en/real-estate', priority: '0.6', changefreq: 'weekly' },
  { url: '/en/search', priority: '0.6', changefreq: 'daily' },
  { url: '/en/about', priority: '0.4', changefreq: 'monthly' },
  { url: '/en/contact', priority: '0.4', changefreq: 'monthly' },
  { url: '/en/list', priority: '0.5', changefreq: 'monthly' },
  { url: '/en/privacy', priority: '0.2', changefreq: 'yearly' },
  { url: '/en/terms', priority: '0.2', changefreq: 'yearly' },

  // French
  { url: '/fr', priority: '0.8', changefreq: 'daily' },
  { url: '/fr/acheter', priority: '0.7', changefreq: 'daily' },
  { url: '/fr/louer', priority: '0.7', changefreq: 'daily' },
  { url: '/fr/agents', priority: '0.6', changefreq: 'weekly' },
  { url: '/fr/recherche', priority: '0.6', changefreq: 'daily' },
  { url: '/fr/a-propos', priority: '0.4', changefreq: 'monthly' },
  { url: '/fr/contact', priority: '0.4', changefreq: 'monthly' },
  { url: '/fr/publier', priority: '0.5', changefreq: 'monthly' },
  { url: '/fr/conditions', priority: '0.2', changefreq: 'yearly' },
  { url: '/fr/confidentialite', priority: '0.2', changefreq: 'yearly' },
];

// Portal filter for SQL queries
const PORTAL_FILTER = `(portales @> '{"ubikala": true}'::jsonb OR portales @> '{"propiedadenrd": true}'::jsonb OR portales IS NULL OR portales = '{}'::jsonb)`;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function urlEntry(site: string, url: string, lastmod: string, changefreq: string, priority: string): string {
  return `  <url>
    <loc>${escapeXml(site + url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export const GET: APIRoute = async (context) => {
  // Get country from middleware (set by subdomain detection)
  const country = context.locals.country;
  const pais = country?.name || 'República Dominicana';
  const domain = country?.domain || 'ubikala.com';
  const SITE = `https://${domain}`;

  const today = new Date().toISOString().split('T')[0];
  const entries: string[] = [];

  // 1. Static pages
  for (const page of STATIC_PAGES) {
    entries.push(urlEntry(SITE, page.url, today, page.changefreq, page.priority));
  }

  // 2. Spanish property type pages (/comprar/apartamento, /comprar/casa, etc.)
  for (const type of PROPERTY_TYPES_ES) {
    entries.push(urlEntry(SITE, `/comprar/${type}`, today, 'daily', '0.7'));
  }

  // 3. English property type pages (/en/buy/apartments, /en/buy/houses, etc.)
  for (const type of PROPERTY_TYPES_EN) {
    entries.push(urlEntry(SITE, `/en/buy/${type}`, today, 'daily', '0.6'));
  }

  try {
    if (sql) {
      // 4. All CLIC property detail pages — filtered by pais
      const clicProperties = await sql(`
        SELECT slug, updated_at
        FROM propiedades
        WHERE activo = true
        AND slug IS NOT NULL AND slug != ''
        AND ${PORTAL_FILTER}
        AND pais = $1
        ORDER BY updated_at DESC
        LIMIT 10000
      `, [pais]);

      for (const prop of clicProperties) {
        const lastmod = prop.updated_at
          ? new Date(prop.updated_at).toISOString().split('T')[0]
          : today;
        entries.push(urlEntry(SITE, `/propiedad/${prop.slug}`, lastmod, 'weekly', '0.8'));
      }

      // 5. CLIC agent pages — only agents with properties in this country
      const clicAgents = await sql(`
        SELECT DISTINCT pa.slug
        FROM perfiles_asesor pa
        JOIN usuarios u ON pa.usuario_id = u.id
        WHERE pa.activo = true
        AND pa.slug IS NOT NULL AND pa.slug != ''
        AND EXISTS (
          SELECT 1 FROM propiedades p
          WHERE p.captador_id = u.id
          AND p.activo = true
          AND ${PORTAL_FILTER}
          AND p.pais = $1
        )
      `, [pais]);

      for (const agent of clicAgents) {
        entries.push(urlEntry(SITE, `/asesor/${agent.slug}`, today, 'weekly', '0.6'));
      }

      // 6. Location pages from ubicaciones table
      const locations = await sql(`
        SELECT slug, updated_at
        FROM ubicaciones
        WHERE activo = true
        AND slug IS NOT NULL AND slug != ''
        ORDER BY nombre ASC
      `);

      for (const loc of locations) {
        const lastmod = loc.updated_at
          ? new Date(loc.updated_at).toISOString().split('T')[0]
          : today;
        entries.push(urlEntry(SITE, `/propiedades/${loc.slug}`, lastmod, 'weekly', '0.7'));
      }

      // 7. City slugs from actual properties — filtered by pais
      const citySlugs = await sql(`
        SELECT DISTINCT
          LOWER(REPLACE(REPLACE(REPLACE(ciudad, ' ', '-'), '''', ''), '.', '')) as slug
        FROM propiedades
        WHERE activo = true
        AND ciudad IS NOT NULL AND ciudad != ''
        AND ${PORTAL_FILTER}
        AND pais = $1
        ORDER BY slug
      `, [pais]);

      const locationSlugs = new Set<string>();
      for (const loc of locations) locationSlugs.add(loc.slug);
      for (const city of citySlugs) {
        if (city.slug && !locationSlugs.has(city.slug)) {
          entries.push(urlEntry(SITE, `/propiedades/${city.slug}`, today, 'weekly', '0.6'));
          locationSlugs.add(city.slug);
        }
      }

      // 8. Type+Location combos — filtered by pais, generates ES and EN URLs
      const typeLocationCombos = await sql(`
        SELECT
          LOWER(tipo) as tipo,
          LOWER(REPLACE(REPLACE(REPLACE(ciudad, ' ', '-'), '''', ''), '.', '')) as ciudad_slug,
          LOWER(operacion) as operacion,
          COUNT(*) as cnt,
          MAX(updated_at) as last_updated
        FROM propiedades
        WHERE activo = true
        AND tipo IS NOT NULL AND tipo != ''
        AND ciudad IS NOT NULL AND ciudad != ''
        AND ${PORTAL_FILTER}
        AND pais = $1
        GROUP BY LOWER(tipo), LOWER(REPLACE(REPLACE(REPLACE(ciudad, ' ', '-'), '''', ''), '.', '')), LOWER(operacion)
        HAVING COUNT(*) >= 1
        ORDER BY cnt DESC
      `, [pais]);

      // Map DB type values to URL slugs (Spanish)
      const typeToSlugES: Record<string, string> = {
        'apartamento': 'apartamento',
        'casa': 'casa',
        'villa': 'villa',
        'penthouse': 'penthouse',
        'terreno': 'terreno',
        'solar': 'terreno',
        'local comercial': 'local-comercial',
        'local': 'local-comercial',
        'oficina': 'oficina',
        'nave': 'nave',
        'finca': 'finca',
      };

      // Map DB type values to URL slugs (English)
      const typeToSlugEN: Record<string, string> = {
        'apartamento': 'apartments',
        'casa': 'houses',
        'villa': 'villas',
        'penthouse': 'penthouses',
        'terreno': 'land',
        'solar': 'land',
        'local comercial': 'commercial',
        'local': 'commercial',
        'oficina': 'offices',
        'nave': 'warehouses',
        'finca': 'land',
      };

      const addedCombos = new Set<string>();
      for (const combo of typeLocationCombos) {
        const typeSlugES = typeToSlugES[combo.tipo] || combo.tipo;
        const typeSlugEN = typeToSlugEN[combo.tipo];
        const locSlug = combo.ciudad_slug;
        if (!locSlug) continue;

        const lastmod = combo.last_updated
          ? new Date(combo.last_updated).toISOString().split('T')[0]
          : today;

        const isVenta = combo.operacion === 'venta' || combo.operacion === 'sale';
        const isAlquiler = combo.operacion === 'alquiler' || combo.operacion === 'renta' || combo.operacion === 'rent';

        if (isVenta && typeSlugES) {
          const key = `comprar/${typeSlugES}/${locSlug}`;
          if (!addedCombos.has(key)) {
            entries.push(urlEntry(SITE, `/comprar/${typeSlugES}/${locSlug}`, lastmod, 'weekly', '0.6'));
            addedCombos.add(key);
          }
          // English variant
          if (typeSlugEN) {
            const keyEN = `en/buy/${typeSlugEN}/${locSlug}`;
            if (!addedCombos.has(keyEN)) {
              entries.push(urlEntry(SITE, `/en/buy/${typeSlugEN}/${locSlug}`, lastmod, 'weekly', '0.5'));
              addedCombos.add(keyEN);
            }
          }
        }
        if (isAlquiler && typeSlugES) {
          const key = `alquilar/${typeSlugES}/${locSlug}`;
          if (!addedCombos.has(key)) {
            entries.push(urlEntry(SITE, `/alquilar/${typeSlugES}/${locSlug}`, lastmod, 'weekly', '0.5'));
            addedCombos.add(key);
          }
        }
      }
    }

    // 9. Ubikala property slugs
    if (ubikalaDb) {
      const ubikalaProperties = await ubikalaDb`
        SELECT slug, updated_at
        FROM ubikala_properties
        WHERE activo = true
        AND slug IS NOT NULL AND slug != ''
        ORDER BY updated_at DESC
        LIMIT 10000
      `;

      for (const prop of ubikalaProperties) {
        const lastmod = prop.updated_at
          ? new Date(prop.updated_at).toISOString().split('T')[0]
          : today;
        entries.push(urlEntry(SITE, `/propiedad/${prop.slug}`, lastmod, 'weekly', '0.8'));
      }

      // 10. Ubikala user pages
      const ubikalaUsers = await ubikalaDb`
        SELECT slug, updated_at
        FROM ubikala_users
        WHERE is_active = true
        AND slug IS NOT NULL AND slug != ''
      `;

      for (const user of ubikalaUsers) {
        const lastmod = user.updated_at
          ? new Date(user.updated_at).toISOString().split('T')[0]
          : today;
        entries.push(urlEntry(SITE, `/usuario/${user.slug}`, lastmod, 'weekly', '0.6'));
      }
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
