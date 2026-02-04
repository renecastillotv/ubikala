import { neon } from '@neondatabase/serverless';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ request }) => {
  const diagnostics = {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    environment: {},
    clic_db: { status: "unknown" },
    ubikala_db: { status: "unknown" }
  };
  const DATABASE_URL = "postgresql://neondb_owner:npg_5jRsErZYmJv1@ep-fancy-lab-a4hmvk6f-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require";
  const UBIKALA_DATABASE_URL = "postgresql://neondb_owner:npg_QDwB9pWHXm6S@ep-polished-moon-aieg89w2-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require";
  diagnostics.environment = {
    DATABASE_URL: "configured" ,
    UBIKALA_DATABASE_URL: "configured" ,
    JWT_SECRET: "configured" ,
    PUBLIC_SITE_URL: "https://ubikala.com"
  };
  {
    try {
      const sql = neon(DATABASE_URL);
      const totalResult = await sql`SELECT COUNT(*) as count FROM propiedades WHERE activo = true`;
      diagnostics.clic_db.total_properties = parseInt(totalResult[0]?.count || "0");
      const ubikalaResult = await sql`
        SELECT COUNT(*) as count FROM propiedades
        WHERE activo = true AND portales @> '{"ubikala": true}'::jsonb
      `;
      diagnostics.clic_db.ubikala_properties = parseInt(ubikalaResult[0]?.count || "0");
      const propiedadenrdResult = await sql`
        SELECT COUNT(*) as count FROM propiedades
        WHERE activo = true AND portales @> '{"propiedadenrd": true}'::jsonb
      `;
      diagnostics.clic_db.propiedadenrd_properties = parseInt(propiedadenrdResult[0]?.count || "0");
      const flexibleResult = await sql`
        SELECT COUNT(*) as count FROM propiedades
        WHERE activo = true AND (
          portales @> '{"ubikala": true}'::jsonb
          OR portales @> '{"propiedadenrd": true}'::jsonb
          OR portales IS NULL
          OR portales = '{}'::jsonb
        )
      `;
      diagnostics.clic_db.filtered_properties = parseInt(flexibleResult[0]?.count || "0");
      const featuredResult = await sql`
        SELECT COUNT(*) as count FROM propiedades
        WHERE activo = true AND destacada = true AND (
          portales @> '{"ubikala": true}'::jsonb
          OR portales @> '{"propiedadenrd": true}'::jsonb
          OR portales IS NULL
          OR portales = '{}'::jsonb
        )
      `;
      diagnostics.clic_db.featured_properties = parseInt(featuredResult[0]?.count || "0");
      const portalSample = await sql`
        SELECT DISTINCT portales FROM propiedades
        WHERE activo = true
        LIMIT 5
      `;
      diagnostics.clic_db.portal_samples = portalSample.map((r) => r.portales);
      const agentsResult = await sql`
        SELECT COUNT(*) as count FROM perfiles_asesor
        WHERE activo = true AND visible_en_web = true
      `;
      diagnostics.clic_db.total_agents = parseInt(agentsResult[0]?.count || "0");
      diagnostics.clic_db.status = "connected";
    } catch (error) {
      diagnostics.clic_db.status = "error";
      diagnostics.clic_db.error = error.message;
    }
  }
  {
    try {
      const ubikalaSql = neon(UBIKALA_DATABASE_URL);
      const usersResult = await ubikalaSql`SELECT COUNT(*) as count FROM ubikala_users WHERE is_active = true`;
      diagnostics.ubikala_db.total_users = parseInt(usersResult[0]?.count || "0");
      const propsResult = await ubikalaSql`SELECT COUNT(*) as count FROM ubikala_properties WHERE activo = true`;
      diagnostics.ubikala_db.total_properties = parseInt(propsResult[0]?.count || "0");
      diagnostics.ubikala_db.status = "connected";
    } catch (error) {
      diagnostics.ubikala_db.status = "error";
      diagnostics.ubikala_db.error = error.message;
    }
  }
  return new Response(JSON.stringify(diagnostics, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
