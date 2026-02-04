import type { APIRoute } from 'astro';
import { getAllPlans, createPlan, logActivity, type UserRole } from '../../../../lib/ubikala-db';

// GET - List all plans (admin only)
export const GET: APIRoute = async ({ locals }) => {
  const user = locals.user;

  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const plans = await getAllPlans();
    return new Response(JSON.stringify({ plans }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching plans:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener planes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST - Create new plan (admin only)
export const POST: APIRoute = async ({ request, locals }) => {
  const user = locals.user;

  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { name, role, max_publications, publication_duration_days, max_team_members, max_leads_per_month, price, features } = body;

    if (!name || !role || max_publications === undefined || publication_duration_days === undefined) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const validRoles: UserRole[] = ['admin', 'inmobiliaria', 'asesor_independiente', 'propietario'];
    if (!validRoles.includes(role)) {
      return new Response(JSON.stringify({ error: 'Rol inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newPlan = await createPlan({
      name,
      role,
      max_publications: Number(max_publications),
      publication_duration_days: Number(publication_duration_days),
      max_team_members: max_team_members ? Number(max_team_members) : undefined,
      max_leads_per_month: max_leads_per_month ? Number(max_leads_per_month) : undefined,
      price: price ? Number(price) : 0,
      features: features || {},
    });

    await logActivity({
      user_id: user.id,
      action: 'plan_created',
      entity_type: 'plan',
      entity_id: newPlan.id,
      details: { name: newPlan.name, role: newPlan.role },
    });

    return new Response(JSON.stringify({ plan: newPlan }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error creating plan:', error);
    return new Response(JSON.stringify({ error: 'Error al crear plan' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
