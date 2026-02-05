import type { APIRoute } from 'astro';
import { getSiteConfigByCountry, upsertSiteConfig } from '../../../../lib/ubikala-db';
import { invalidateConfigCache } from '../../../../lib/config';

// GET - Get site config for a specific country
export const GET: APIRoute = async ({ params, locals }) => {
  const user = locals.user;

  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const config = await getSiteConfigByCountry(params.countryCode || 'DO');
    return new Response(JSON.stringify({ config }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching site config:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener configuración' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// PUT - Update site config for a specific country
export const PUT: APIRoute = async ({ params, request, locals }) => {
  const user = locals.user;

  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const countryCode = params.countryCode || 'DO';

    const config = await upsertSiteConfig({
      ...body,
      country_code: countryCode,
    });

    // Invalidate the config cache so changes are reflected immediately
    invalidateConfigCache(countryCode);

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
