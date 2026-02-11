import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';

const SITE = 'https://ubikala.com';

const DATABASE_URL = import.meta.env.DATABASE_URL || process.env.DATABASE_URL;
const UBIKALA_DATABASE_URL = import.meta.env.UBIKALA_DATABASE_URL || process.env.UBIKALA_DATABASE_URL;

const sql = DATABASE_URL ? neon(DATABASE_URL) : null;
const ubikalaDb = UBIKALA_DATABASE_URL ? neon(UBIKALA_DATABASE_URL) : null;

// Property types for /comprar/[type] routes
const PROPERTY_TYPES = [
  'apartamento', 'casa', 'villa', 'penthouse', 'terreno',
  'local-comercial', 'oficina', 'nave', 'finca'
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

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function urlEntry(url: string, lastmod: string, changefreq: string, priority: string): string {
  return `  <url>
    <loc>${escapeXml(SITE + url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];
  const entries: string[] = [];

  // 1. Static pages
  for (const page of STATIC_PAGES) {
    entries.push(urlEntry(page.url, today, page.changefreq, page.priority));
  }

  // 2. Property type pages (/comprar/apartamento, /comprar/casa, etc.)
  for (const type of PROPERTY_TYPES) {
    entries.push(urlEntry(`/comprar/${type}`, today, 'daily', '0.7'));
  }

  try {
    // 3. CLIC property slugs
    if (sql) {
      const clicProperties = await sql`
        SELECT slug, updated_at
        FROM propiedades
        WHERE activo = true
        AND slug IS NOT NULL AND slug != ''
        AND (portales @> '{"ubikala": true}'::jsonb OR portales @> '{"propiedadenrd": true}'::jsonb OR portales IS NULL OR portales = '{}'::jsonb)
        ORDER BY updated_at DESC
        LIMIT 10000
      `;

      for (const prop of clicProperties) {
        const lastmod = prop.updated_at
          ? new Date(prop.updated_at).toISOString().split('T')[0]
          : today;
        entries.push(urlEntry(`/propiedad/${prop.slug}`, lastmod, 'weekly', '0.8'));
      }

      // 4. CLIC agent slugs
      const clicAgents = await sql`
        SELECT DISTINCT pa.slug
        FROM perfiles_asesor pa
        JOIN usuarios u ON pa.usuario_id = u.id
        WHERE pa.activo = true
        AND pa.slug IS NOT NULL AND pa.slug != ''
        AND EXISTS (
          SELECT 1 FROM propiedades p
          WHERE p.captador_id = u.id
          AND p.activo = true
          AND (p.portales @> '{"ubikala": true}'::jsonb OR p.portales @> '{"propiedadenrd": true}'::jsonb OR p.portales IS NULL OR p.portales = '{}'::jsonb)
        )
      `;

      for (const agent of clicAgents) {
        entries.push(urlEntry(`/asesor/${agent.slug}`, today, 'weekly', '0.6'));
      }

      // 5. Location pages from ubicaciones table
      const locations = await sql`
        SELECT slug, updated_at
        FROM ubicaciones
        WHERE activo = true
        AND slug IS NOT NULL AND slug != ''
        ORDER BY nombre ASC
      `;

      for (const loc of locations) {
        const lastmod = loc.updated_at
          ? new Date(loc.updated_at).toISOString().split('T')[0]
          : today;
        entries.push(urlEntry(`/propiedades/${loc.slug}`, lastmod, 'weekly', '0.7'));
      }

      // 6. Dynamic city slugs from properties (for cities not in ubicaciones)
      const citySlugs = await sql`
        SELECT DISTINCT
          LOWER(REPLACE(REPLACE(REPLACE(ciudad, ' ', '-'), '''', ''), '.', '')) as slug
        FROM propiedades
        WHERE activo = true
        AND ciudad IS NOT NULL AND ciudad != ''
        AND (portales @> '{"ubikala": true}'::jsonb OR portales @> '{"propiedadenrd": true}'::jsonb OR portales IS NULL OR portales = '{}'::jsonb)
        ORDER BY slug
      `;

      // Generate type+location combinations for popular cities
      const locationSlugs = new Set<string>();
      for (const loc of locations) {
        locationSlugs.add(loc.slug);
      }
      for (const city of citySlugs) {
        if (city.slug && !locationSlugs.has(city.slug)) {
          entries.push(urlEntry(`/propiedades/${city.slug}`, today, 'weekly', '0.6'));
          locationSlugs.add(city.slug);
        }
      }

      // 7. Type+Location combinations for main types and locations
      const mainTypes = ['apartamento', 'casa', 'villa', 'penthouse', 'terreno'];
      for (const type of mainTypes) {
        for (const locSlug of locationSlugs) {
          entries.push(urlEntry(`/comprar/${type}/${locSlug}`, today, 'weekly', '0.6'));
          entries.push(urlEntry(`/alquilar/${type}/${locSlug}`, today, 'weekly', '0.5'));
        }
      }
    }

    // 8. Ubikala property slugs
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
        entries.push(urlEntry(`/propiedad/${prop.slug}`, lastmod, 'weekly', '0.8'));
      }

      // 9. Ubikala user slugs
      const ubikalaUsers = await ubikalaDb`
        SELECT id, name, slug, updated_at
        FROM ubikala_users
        WHERE is_active = true
        AND slug IS NOT NULL AND slug != ''
      `;

      for (const user of ubikalaUsers) {
        const lastmod = user.updated_at
          ? new Date(user.updated_at).toISOString().split('T')[0]
          : today;
        entries.push(urlEntry(`/usuario/${user.slug}`, lastmod, 'weekly', '0.6'));
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
