import type { APIRoute } from 'astro';
import { getAllSiteConfigs, upsertSiteConfig } from '../../../../lib/ubikala-db';

// GET - List all site configs (admin only)
export const GET: APIRoute = async ({ locals }) => {
  const user = locals.user;

  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const configs = await getAllSiteConfigs();
    return new Response(JSON.stringify({ configs }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching site configs:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener configuraciones' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST - Create or update site config (admin only)
export const POST: APIRoute = async ({ request, locals }) => {
  const user = locals.user;

  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();

    if (!body.country_code) {
      return new Response(JSON.stringify({ error: 'El código de país es requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const config = await upsertSiteConfig(body);
    return new Response(JSON.stringify({ config }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving site config:', error);
    return new Response(JSON.stringify({ error: 'Error al guardar configuración' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
