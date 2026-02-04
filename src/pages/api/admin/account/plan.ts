import type { APIRoute } from 'astro';
import { assignPlanToUser, removePlanFromUser, getPlanById, logActivity } from '../../../../lib/ubikala-db';

// PUT - Change user's plan
export const PUT: APIRoute = async ({ request, locals }) => {
  const user = locals.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { plan_id } = body;

    if (plan_id) {
      // Verify plan exists and is active
      const plan = await getPlanById(plan_id);
      if (!plan) {
        return new Response(JSON.stringify({ error: 'Plan no encontrado' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (!plan.is_active) {
        return new Response(JSON.stringify({ error: 'Este plan no está disponible' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const updatedUser = await assignPlanToUser(user.id, plan_id);

      if (!updatedUser) {
        return new Response(JSON.stringify({ error: 'Error al actualizar plan' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      await logActivity({
        user_id: user.id,
        action: 'plan_changed',
        entity_type: 'plan',
        entity_id: plan_id,
        details: { plan_name: plan.name },
      });

      return new Response(JSON.stringify({ success: true, plan }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // Remove plan (cancel subscription)
      const updatedUser = await removePlanFromUser(user.id);

      if (!updatedUser) {
        return new Response(JSON.stringify({ error: 'Error al cancelar plan' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      await logActivity({
        user_id: user.id,
        action: 'plan_cancelled',
        entity_type: 'plan',
      });

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error: any) {
    console.error('Error changing plan:', error);
    return new Response(JSON.stringify({ error: 'Error al cambiar plan' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
