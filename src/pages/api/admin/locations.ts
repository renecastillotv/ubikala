/**
 * Dynamic locations API — queries CRM `ubicaciones` table.
 *
 * GET /api/admin/locations?tipo=pais               → all countries
 * GET /api/admin/locations?parent_id=123            → children of a location
 * GET /api/admin/locations?tipo=provincia&parent_id=1  → provinces of country 1
 */
import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = import.meta.env.DATABASE_URL || process.env.DATABASE_URL;

export const GET: APIRoute = async ({ url, locals }) => {
  const user = locals.user;
  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!DATABASE_URL) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const tipo = url.searchParams.get('tipo');
  const parentId = url.searchParams.get('parent_id');

  try {
    const sql = neon(DATABASE_URL);

    let rows;
    if (parentId) {
      rows = await sql`
        SELECT id, nombre, slug, tipo, nivel
        FROM ubicaciones
        WHERE parent_id = ${parseInt(parentId)}
          AND activo = true
        ORDER BY orden ASC, nombre ASC
      `;
    } else if (tipo) {
      rows = await sql`
        SELECT id, nombre, slug, tipo, nivel
        FROM ubicaciones
        WHERE tipo = ${tipo}
          AND activo = true
        ORDER BY orden ASC, nombre ASC
      `;
    } else {
      return new Response(JSON.stringify({ error: 'Provide tipo or parent_id' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ locations: rows }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[Locations API] Error:', error.message);
    return new Response(JSON.stringify({ error: 'Error fetching locations' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
