import type { APIRoute } from 'astro';
import { getPlanById, updatePlan, deletePlan, logActivity, type UserRole } from '../../../../lib/ubikala-db';

// GET - Get single plan (admin only)
export const GET: APIRoute = async ({ params, locals }) => {
  const currentUser = locals.user;

  if (!currentUser || currentUser.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const plan = await getPlanById(params.id!);

    if (!plan) {
      return new Response(JSON.stringify({ error: 'Plan no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ plan }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching plan:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener plan' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// PUT - Update plan (admin only)
export const PUT: APIRoute = async ({ params, request, locals }) => {
  const currentUser = locals.user;

  if (!currentUser || currentUser.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { name, role, max_publications, publication_duration_days, max_team_members, max_leads_per_month, price, features, is_active } = body;

    const updateData: any = {};

    if (name !== undefined) updateData.name = name;
    if (role !== undefined) {
      const validRoles: UserRole[] = ['admin', 'inmobiliaria', 'asesor_independiente', 'propietario'];
      if (validRoles.includes(role)) updateData.role = role;
    }
    if (max_publications !== undefined) updateData.max_publications = Number(max_publications);
    if (publication_duration_days !== undefined) updateData.publication_duration_days = Number(publication_duration_days);
    if (max_team_members !== undefined) updateData.max_team_members = max_team_members ? Number(max_team_members) : null;
    if (max_leads_per_month !== undefined) updateData.max_leads_per_month = max_leads_per_month ? Number(max_leads_per_month) : null;
    if (price !== undefined) updateData.price = Number(price);
    if (features !== undefined) updateData.features = features;
    if (is_active !== undefined) updateData.is_active = is_active;

    const updatedPlan = await updatePlan(params.id!, updateData);

    if (!updatedPlan) {
      return new Response(JSON.stringify({ error: 'Plan no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await logActivity({
      user_id: currentUser.id,
      action: 'plan_updated',
      entity_type: 'plan',
      entity_id: params.id,
      details: { fields: Object.keys(updateData) },
    });

    return new Response(JSON.stringify({ plan: updatedPlan }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error updating plan:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar plan' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// DELETE - Delete plan (admin only)
export const DELETE: APIRoute = async ({ params, locals }) => {
  const currentUser = locals.user;

  if (!currentUser || currentUser.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const plan = await getPlanById(params.id!);

    if (!plan) {
      return new Response(JSON.stringify({ error: 'Plan no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await deletePlan(params.id!);

    await logActivity({
      user_id: currentUser.id,
      action: 'plan_deleted',
      entity_type: 'plan',
      entity_id: params.id,
      details: { name: plan.name },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting plan:', error);
    return new Response(JSON.stringify({ error: 'Error al eliminar plan' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
