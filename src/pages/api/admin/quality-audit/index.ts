import type { APIRoute } from 'astro';
import { runQualityAudit } from '../../../../lib/quality-audit';
import type { AuditSummary } from '../../../../lib/quality-audit';

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
