import type { APIRoute } from 'astro';
import { getSeoContentById, upsertSeoContent, deleteSeoContent } from '../../../../lib/ubikala-db';

// PUT - Update SEO content by ID
export const PUT: APIRoute = async ({ params, request, locals }) => {
  const user = locals.user;
  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const existing = await getSeoContentById(params.id!);
    if (!existing) {
      return new Response(JSON.stringify({ error: 'Registro no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { content } = body;

    const record = await upsertSeoContent(
      existing.country_code,
      existing.lang,
      existing.section,
      existing.page || null,
      content
    );

    return new Response(JSON.stringify({ record }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating SEO content:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar contenido SEO' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// DELETE - Delete SEO content by ID
export const DELETE: APIRoute = async ({ params, locals }) => {
  const user = locals.user;
  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await deleteSeoContent(params.id!);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting SEO content:', error);
    return new Response(JSON.stringify({ error: 'Error al eliminar contenido SEO' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
