import type { APIRoute } from 'astro';
import { getUserWebhooks, createUserWebhook, ensureUserWebhooksTable } from '../../../../lib/ubikala-db';

// GET - List webhooks for current user
export const GET: APIRoute = async ({ locals }) => {
  const user = locals.user;
  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await ensureUserWebhooksTable();
    const webhooks = await getUserWebhooks(user.id);

    return new Response(JSON.stringify({ webhooks }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching webhooks:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener webhooks' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST - Create a webhook
export const POST: APIRoute = async ({ request, locals }) => {
  const user = locals.user;
  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { nombre, url, secret_key, eventos } = body;

    if (!nombre || !url) {
      return new Response(JSON.stringify({ error: 'Nombre y URL son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return new Response(JSON.stringify({ error: 'URL inválida' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await ensureUserWebhooksTable();
    const webhook = await createUserWebhook({
      user_id: user.id,
      nombre,
      url,
      secret_key: secret_key || undefined,
      eventos: eventos || ['lead.new'],
    });

    return new Response(JSON.stringify({ webhook }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating webhook:', error);
    return new Response(JSON.stringify({ error: 'Error al crear webhook' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
