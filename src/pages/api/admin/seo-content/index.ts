import type { APIRoute } from 'astro';
import { getAllSeoContentForCountry, upsertSeoContent } from '../../../../lib/ubikala-db';

// GET - List all SEO content for a country + lang
export const GET: APIRoute = async ({ locals, url }) => {
  const user = locals.user;
  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const countryCode = url.searchParams.get('country') || 'DO';
  const lang = url.searchParams.get('lang') || 'es';

  try {
    const rows = await getAllSeoContentForCountry(countryCode, lang);
    return new Response(JSON.stringify({ sections: rows }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching SEO content:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener contenido SEO' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST - Create/update SEO content section
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
    const { country_code, lang, section, page, content } = body;

    if (!country_code || !lang || !section) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos (country_code, lang, section)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const record = await upsertSeoContent(country_code, lang, section, page || null, content);
    return new Response(JSON.stringify({ record }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error upserting SEO content:', error);
    return new Response(JSON.stringify({ error: 'Error al guardar contenido SEO' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
