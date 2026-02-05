import type { APIRoute } from 'astro';
import { getCountryByCode, upsertCountry, deleteCountry } from '../../../../lib/ubikala-db';
import { invalidateCountriesCache } from '../../../../lib/country-config';

// GET - Get a country by code
export const GET: APIRoute = async ({ params, locals }) => {
  const user = locals.user;

  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const country = await getCountryByCode(params.code || '');
    if (!country) {
      return new Response(JSON.stringify({ error: 'País no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ country }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching country:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener país' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// PUT - Update a country
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
    const code = params.code || '';

    const country = await upsertCountry({
      ...body,
      code,
    });
    invalidateCountriesCache();

    return new Response(JSON.stringify({ country }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating country:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar país' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// DELETE - Delete a country
export const DELETE: APIRoute = async ({ params, locals }) => {
  const user = locals.user;

  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const code = params.code || '';
    const deleted = await deleteCountry(code);

    if (!deleted) {
      return new Response(JSON.stringify({ error: 'País no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    invalidateCountriesCache();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting country:', error);
    return new Response(JSON.stringify({ error: 'Error al eliminar país' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
