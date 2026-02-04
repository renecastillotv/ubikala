import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';

export const GET: APIRoute = async ({ request }) => {
  const diagnostics: Record<string, any> = {
    timestamp: new Date().toISOString(),
    environment: {},
    clic_db: { status: 'unknown' },
    ubikala_db: { status: 'unknown' },
  };

  // Check environment variables
  const DATABASE_URL = import.meta.env.DATABASE_URL || process.env.DATABASE_URL;
  const UBIKALA_DATABASE_URL = import.meta.env.UBIKALA_DATABASE_URL || process.env.UBIKALA_DATABASE_URL;

  diagnostics.environment = {
    DATABASE_URL: DATABASE_URL ? 'configured' : 'missing',
    UBIKALA_DATABASE_URL: UBIKALA_DATABASE_URL ? 'configured' : 'missing',
    JWT_SECRET: (import.meta.env.JWT_SECRET || process.env.JWT_SECRET) ? 'configured' : 'missing',
    PUBLIC_SITE_URL: import.meta.env.PUBLIC_SITE_URL || 'not set',
  };

  // Test CLIC DB connection
  if (DATABASE_URL) {
    try {
      const sql = neon(DATABASE_URL);

      // Count total properties
      const totalResult = await sql`SELECT COUNT(*) as count FROM propiedades WHERE activo = true`;
      diagnostics.clic_db.total_properties = parseInt(totalResult[0]?.count || '0');

      // Count properties with ubikala portal enabled
      const ubikalaResult = await sql`
        SELECT COUNT(*) as count FROM propiedades
        WHERE activo = true AND portales @> '{"ubikala": true}'::jsonb
      `;
      diagnostics.clic_db.ubikala_properties = parseInt(ubikalaResult[0]?.count || '0');

      // Count properties with propiedadenrd portal enabled
      const propiedadenrdResult = await sql`
        SELECT COUNT(*) as count FROM propiedades
        WHERE activo = true AND portales @> '{"propiedadenrd": true}'::jsonb
      `;
      diagnostics.clic_db.propiedadenrd_properties = parseInt(propiedadenrdResult[0]?.count || '0');

      // Count properties with flexible filter (what will actually show)
      const flexibleResult = await sql`
        SELECT COUNT(*) as count FROM propiedades
        WHERE activo = true AND (
          portales @> '{"ubikala": true}'::jsonb
          OR portales @> '{"propiedadenrd": true}'::jsonb
          OR portales IS NULL
          OR portales = '{}'::jsonb
        )
      `;
      diagnostics.clic_db.filtered_properties = parseInt(flexibleResult[0]?.count || '0');

      // Count featured with ubikala
      const featuredResult = await sql`
        SELECT COUNT(*) as count FROM propiedades
        WHERE activo = true AND destacada = true AND (
          portales @> '{"ubikala": true}'::jsonb
          OR portales @> '{"propiedadenrd": true}'::jsonb
          OR portales IS NULL
          OR portales = '{}'::jsonb
        )
      `;
      diagnostics.clic_db.featured_properties = parseInt(featuredResult[0]?.count || '0');

      // Get sample of portal values
      const portalSample = await sql`
        SELECT DISTINCT portales FROM propiedades
        WHERE activo = true
        LIMIT 5
      `;
      diagnostics.clic_db.portal_samples = portalSample.map(r => r.portales);

      // Count agents
      const agentsResult = await sql`
        SELECT COUNT(*) as count FROM perfiles_asesor
        WHERE activo = true AND visible_en_web = true
      `;
      diagnostics.clic_db.total_agents = parseInt(agentsResult[0]?.count || '0');

      diagnostics.clic_db.status = 'connected';
    } catch (error: any) {
      diagnostics.clic_db.status = 'error';
      diagnostics.clic_db.error = error.message;
    }
  } else {
    diagnostics.clic_db.status = 'not_configured';
  }

  // Test Ubikala DB connection
  if (UBIKALA_DATABASE_URL) {
    try {
      const ubikalaSql = neon(UBIKALA_DATABASE_URL);

      // Count users
      const usersResult = await ubikalaSql`SELECT COUNT(*) as count FROM ubikala_users WHERE is_active = true`;
      diagnostics.ubikala_db.total_users = parseInt(usersResult[0]?.count || '0');

      // Count properties
      const propsResult = await ubikalaSql`SELECT COUNT(*) as count FROM ubikala_properties WHERE activo = true`;
      diagnostics.ubikala_db.total_properties = parseInt(propsResult[0]?.count || '0');

      diagnostics.ubikala_db.status = 'connected';
    } catch (error: any) {
      diagnostics.ubikala_db.status = 'error';
      diagnostics.ubikala_db.error = error.message;
    }
  } else {
    diagnostics.ubikala_db.status = 'not_configured';
  }

  return new Response(JSON.stringify(diagnostics, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
