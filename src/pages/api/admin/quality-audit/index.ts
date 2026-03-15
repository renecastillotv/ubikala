import type { APIRoute } from 'astro';
import { runQualityAudit } from '../../../../lib/quality-audit';
import type { AuditSummary } from '../../../../lib/quality-audit';


const CRM_API_URL = import.meta.env.CRM_API_URL || 'https://api.denlla.com';
const UBIKALA_WEBHOOK_SECRET = import.meta.env.UBIKALA_WEBHOOK_SECRET;

// Simple in-memory cache (5 min TTL)
let cache: { data: AuditSummary; ts: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

export const GET: APIRoute = async ({ locals, url }) => {
  const user = locals.user;
  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const refresh = url.searchParams.get('refresh') === 'true';

    if (!refresh && cache && Date.now() - cache.ts < CACHE_TTL) {
      return new Response(JSON.stringify(cache.data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await runQualityAudit();
    cache = { data: result, ts: Date.now() };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error running quality audit:', error);
    return new Response(JSON.stringify({ error: 'Error al ejecutar auditoría' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  const user = locals.user;
  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { propertyId, action } = body;

    if (!propertyId || !action) {
      return new Response(JSON.stringify({ error: 'propertyId y action requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'remove') {
      // Call crm-api webhook to persistently block the property
      const reason = body.reason || 'Bloqueada por auditoría de calidad Ubikala';
      const webhookRes = await fetch(`${CRM_API_URL}/api/webhooks/ubikala/property-block`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-ubikala-secret': UBIKALA_WEBHOOK_SECRET || '',
        },
        body: JSON.stringify({
          property_id: propertyId,
          action: 'block',
          reason,
        }),
      });

      if (!webhookRes.ok) {
        const err = await webhookRes.json().catch(() => ({}));
        return new Response(JSON.stringify({ error: 'Error al bloquear propiedad', detail: err }), {
          status: webhookRes.status,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Invalidate cache
      cache = null;
      return new Response(JSON.stringify({ ok: true, message: 'Propiedad bloqueada permanentemente' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'keep') {
      return new Response(JSON.stringify({ ok: true, message: 'Propiedad marcada como revisada' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Acción no válida' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing audit action:', error);
    return new Response(JSON.stringify({ error: 'Error al procesar acción' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
