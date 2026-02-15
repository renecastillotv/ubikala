import type { APIRoute } from 'astro';
import { getPropertiesByLocation } from '../../../lib/meilisearch';

// SSR - no prerender
export const prerender = false;

// Solo GET permitido
export const GET: APIRoute = async ({ params, request }) => {
  try {
    const { slug } = params;
    const url = new URL(request.url);
    const includeProperties = url.searchParams.get('includeProperties') === 'true';
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100);
    const offset = parseInt(url.searchParams.get('offset') || '0');

    if (!slug) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Slug requerido'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get properties for this location to determine if it exists
    const result = await getPropertiesByLocation(slug, { limit, offset });

    if (result.total === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Ubicación no encontrada'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Derive location info from the first property
    const firstProp = result.properties[0];
    const locationData = {
      slug,
      name: firstProp?.location.city || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      province: firstProp?.location.province || '',
      propertyCount: result.total,
      ...(includeProperties && { properties: result.properties })
    };

    return new Response(JSON.stringify({
      success: true,
      data: locationData
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
      error: 'Error al obtener la ubicación'
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
