import type { APIRoute } from 'astro';
import { getLocations } from '../../lib/db';

// SSR - no prerender
export const prerender = false;

// Solo GET permitido
export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);

    // Parámetros de query
    const nivel = url.searchParams.get('nivel') ? parseInt(url.searchParams.get('nivel')!) : undefined;
    const parentId = url.searchParams.get('parentId') ? parseInt(url.searchParams.get('parentId')!) : undefined;

    const locations = await getLocations({ nivel, parentId });

    return new Response(JSON.stringify({
      success: true,
      data: locations
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, s-maxage=3600'
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Error al obtener ubicaciones'
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
