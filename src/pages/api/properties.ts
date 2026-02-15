import type { APIRoute } from 'astro';
import { searchProperties } from '../../lib/meilisearch';

// SSR - no prerender
export const prerender = false;

// Solo GET permitido
export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);

    // Parámetros de query
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100);
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const tipo = url.searchParams.get('tipo') || undefined;
    const operacion = url.searchParams.get('operacion') || undefined;
    const ciudad = url.searchParams.get('ciudad') || undefined;
    const minPrice = url.searchParams.get('minPrice') ? parseInt(url.searchParams.get('minPrice')!) : undefined;
    const maxPrice = url.searchParams.get('maxPrice') ? parseInt(url.searchParams.get('maxPrice')!) : undefined;
    const habitaciones = url.searchParams.get('habitaciones') ? parseInt(url.searchParams.get('habitaciones')!) : undefined;
    const destacado = url.searchParams.get('destacado') === 'true';

    // Map 'alquiler' to 'renta' for MeiliSearch
    const meiliOperacion = operacion === 'alquiler' ? 'renta' : operacion;

    const result = await searchProperties({
      limit,
      offset,
      tipo,
      operacion: meiliOperacion,
      query: ciudad || '',
      precioMin: minPrice,
      precioMax: maxPrice,
      habitacionesMin: habitaciones,
      destacada: destacado || undefined
    });

    return new Response(JSON.stringify({
      success: true,
      data: result.properties,
      pagination: {
        total: result.total,
        limit,
        offset,
        hasMore: offset + result.properties.length < result.total
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60, s-maxage=300'
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Error al obtener propiedades'
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

export const PUT: APIRoute = async () => {
  return new Response(JSON.stringify({
    success: false,
    error: 'Método no permitido'
  }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const DELETE: APIRoute = async () => {
  return new Response(JSON.stringify({
    success: false,
    error: 'Método no permitido'
  }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
};
