import type { APIRoute } from 'astro';
import { getProperties, getPropertiesCount } from '../../lib/db';

// SSR - no prerender
export const prerender = false;

// Solo GET permitido - Endpoint de búsqueda avanzada
export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);

    // Parámetros de búsqueda
    const q = url.searchParams.get('q') || '';
    const tipo = url.searchParams.get('tipo') || undefined;
    const operacion = url.searchParams.get('operacion') || undefined;
    const ciudad = url.searchParams.get('ciudad') || undefined;
    const minPrice = url.searchParams.get('minPrice') ? parseInt(url.searchParams.get('minPrice')!) : undefined;
    const maxPrice = url.searchParams.get('maxPrice') ? parseInt(url.searchParams.get('maxPrice')!) : undefined;
    const habitaciones = url.searchParams.get('habitaciones') ? parseInt(url.searchParams.get('habitaciones')!) : undefined;
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100);
    const offset = parseInt(url.searchParams.get('offset') || '0');

    // Usar ciudad como término de búsqueda si q está presente
    const searchCity = q || ciudad;

    const [properties, total] = await Promise.all([
      getProperties({
        limit,
        offset,
        tipo,
        operacion,
        ciudad: searchCity,
        minPrice,
        maxPrice,
        habitaciones
      }),
      getPropertiesCount({ tipo, operacion, ciudad: searchCity })
    ]);

    return new Response(JSON.stringify({
      success: true,
      data: properties,
      query: {
        q,
        tipo,
        operacion,
        ciudad,
        minPrice,
        maxPrice,
        habitaciones
      },
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + properties.length < total,
        pages: Math.ceil(total / limit),
        currentPage: Math.floor(offset / limit) + 1
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30, s-maxage=60'
      }
    });
  } catch (error) {
    console.error('Search API Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Error en la búsqueda'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Bloquear otros métodos
export const POST: APIRoute = async () => {
  return new Response(JSON.stringify({
    success: false,
    error: 'Método no permitido'
  }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
};
