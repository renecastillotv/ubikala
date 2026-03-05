import type { APIRoute } from 'astro';
import { updateUserWebhook, deleteUserWebhook } from '../../../../lib/ubikala-db';

// PUT - Update a webhook
export const PUT: APIRoute = async ({ params, request, locals }) => {
  const user = locals.user;
  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const id = Number(params.id);
  if (!id) {
    return new Response(JSON.stringify({ error: 'ID inválido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { nombre, url, secret_key, eventos, activo } = body;

    // Validate URL if provided
    if (url) {
      try {
        new URL(url);
      } catch {
        return new Response(JSON.stringify({ error: 'URL inválida' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    const webhook = await updateUserWebhook(id, user.id, {
      nombre,
      url,
      secret_key,
      eventos,
      activo,
    });

    if (!webhook) {
      return new Response(JSON.stringify({ error: 'Webhook no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ webhook }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating webhook:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar webhook' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// DELETE - Delete a webhook
export const DELETE: APIRoute = async ({ params, locals }) => {
  const user = locals.user;
  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const id = Number(params.id);
  if (!id) {
    return new Response(JSON.stringify({ error: 'ID inválido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const deleted = await deleteUserWebhook(id, user.id);
    if (!deleted) {
      return new Response(JSON.stringify({ error: 'Webhook no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting webhook:', error);
    return new Response(JSON.stringify({ error: 'Error al eliminar webhook' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
