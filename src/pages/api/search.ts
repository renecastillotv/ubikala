import type { APIRoute } from 'astro';
import { searchProperties } from '../../lib/meilisearch';

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

    // Map 'alquiler' to 'renta' for MeiliSearch
    const meiliOperacion = operacion === 'alquiler' ? 'renta' : operacion;

    const result = await searchProperties({
      query: q || ciudad || '',
      limit,
      offset,
      tipo,
      operacion: meiliOperacion,
      precioMin: minPrice,
      precioMax: maxPrice,
      habitacionesMin: habitaciones
    });

    return new Response(JSON.stringify({
      success: true,
      data: result.properties,
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
        total: result.total,
        limit,
        offset,
        hasMore: offset + result.properties.length < result.total,
        pages: Math.ceil(result.total / limit),
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
