import type { APIRoute } from 'astro';
import { getProperties, getPropertiesCount } from '../../lib/db';

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

    // Obtener propiedades y count en paralelo
    const [properties, total] = await Promise.all([
      getProperties({
        limit,
        offset,
        tipo,
        operacion,
        ciudad,
        minPrice,
        maxPrice,
        habitaciones,
        destacado: destacado || undefined
      }),
      getPropertiesCount({ tipo, operacion, ciudad })
    ]);

    return new Response(JSON.stringify({
      success: true,
      data: properties,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + properties.length < total
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
