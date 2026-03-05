import type { APIRoute } from 'astro';
import { getUserWebhooks } from '../../../../../lib/ubikala-db';
import type { WebhookPayload } from '../../../../../lib/webhook-dispatcher';

// POST - Send a test event to a webhook
export const POST: APIRoute = async ({ params, locals }) => {
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
    // Find the webhook and verify ownership
    const webhooks = await getUserWebhooks(user.id);
    const webhook = webhooks.find(w => w.id === id);

    if (!webhook) {
      return new Response(JSON.stringify({ error: 'Webhook no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Build test payload
    const testPayload: WebhookPayload = {
      event: 'lead.new',
      timestamp: new Date().toISOString(),
      data: {
        lead_id: 0,
        property: {
          slug: 'test-propiedad',
          title: 'Propiedad de prueba',
          tenant_id: null,
        },
        contact: {
          name: 'Test Contact',
          email: 'test@example.com',
          phone: '809-555-0000',
          message: 'Este es un evento de prueba desde Ubikala.',
        },
        source: 'ubikala',
        agent: {
          name: user.name || 'Test Agent',
          company: null,
        },
      },
    };

    // Fire the test webhook
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Ubikala-Event': 'lead.new',
      'X-Ubikala-Test': 'true',
    };
    if (webhook.secret_key) {
      headers['X-Ubikala-Secret'] = webhook.secret_key;
    }

    const response = await fetch(webhook.url, {
      method: 'POST',
      headers,
      body: JSON.stringify(testPayload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    return new Response(JSON.stringify({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    const isTimeout = error.name === 'AbortError';
    return new Response(JSON.stringify({
      success: false,
      error: isTimeout ? 'Timeout (10s)' : error.message,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
