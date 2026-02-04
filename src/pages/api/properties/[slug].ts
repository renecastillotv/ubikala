import type { APIRoute } from 'astro';
import { getPropertyBySlug } from '../../../lib/db';

// SSR - no prerender
export const prerender = false;

// Solo GET permitido
export const GET: APIRoute = async ({ params }) => {
  try {
    const { slug } = params;

    if (!slug) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Slug requerido'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const property = await getPropertyBySlug(slug);

    if (!property) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Propiedad no encontrada'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      data: property
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
      error: 'Error al obtener la propiedad'
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
