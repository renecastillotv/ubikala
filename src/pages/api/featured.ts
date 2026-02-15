import type { APIRoute } from 'astro';
import { getFeaturedProperties, getRecentProperties } from '../../lib/meilisearch';

// SSR - no prerender
export const prerender = false;

// Solo GET permitido - Propiedades destacadas y recientes
export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type') || 'featured'; // 'featured' | 'recent'
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '6'), 24);

    let properties;

    if (type === 'recent') {
      properties = await getRecentProperties(limit);
    } else {
      properties = await getFeaturedProperties(limit);
    }

    return new Response(JSON.stringify({
      success: true,
      data: properties,
      type
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60, s-maxage=300'
      }
    });
  } catch (error) {
    console.error('Featured API Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Error al obtener propiedades destacadas'
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
