import type { APIRoute } from 'astro';
import { getAllCountries, upsertCountry } from '../../../../lib/ubikala-db';
import { invalidateCountriesCache } from '../../../../lib/country-config';

// GET - List all countries
export const GET: APIRoute = async ({ locals }) => {
  const user = locals.user;

  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const countries = await getAllCountries();
    return new Response(JSON.stringify({ countries }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching countries:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener países' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST - Create or update a country
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

    if (!body.code || !body.name) {
      return new Response(JSON.stringify({ error: 'Código y nombre son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const country = await upsertCountry(body);
    invalidateCountriesCache();

    return new Response(JSON.stringify({ country }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving country:', error);
    return new Response(JSON.stringify({ error: 'Error al guardar país' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
