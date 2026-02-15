import type { APIRoute } from 'astro';
import { getAgentBySlug, getPropertiesByAgent } from '../../../lib/meilisearch';

// SSR - no prerender
export const prerender = false;

// Solo GET permitido
export const GET: APIRoute = async ({ params, request }) => {
  try {
    const { slug } = params;
    const url = new URL(request.url);
    const includeProperties = url.searchParams.get('includeProperties') === 'true';

    if (!slug) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Slug requerido'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const agent = await getAgentBySlug(slug);

    if (!agent) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Agente no encontrado'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let properties = null;
    if (includeProperties) {
      properties = await getPropertiesByAgent(agent.slug);
    }

    return new Response(JSON.stringify({
      success: true,
      data: {
        ...agent,
        ...(properties && { properties })
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
      error: 'Error al obtener el agente'
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
