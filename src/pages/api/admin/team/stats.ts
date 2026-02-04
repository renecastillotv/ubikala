import type { APIRoute } from 'astro';
import { getTeamStats } from '../../../../lib/ubikala-db';

// GET - Get team statistics (inmobiliaria only)
export const GET: APIRoute = async ({ locals }) => {
  const user = locals.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Only inmobiliarias and admins can view team stats
  if (user.role !== 'inmobiliaria' && user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const stats = await getTeamStats(user.id);
    return new Response(JSON.stringify({ stats }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching team stats:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener estadísticas del equipo' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
