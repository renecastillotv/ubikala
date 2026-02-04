import type { APIRoute } from 'astro';
import { updateLeadStatus, logActivity, type Lead } from '../../../../../lib/ubikala-db';

// PATCH - Update lead status
export const PATCH: APIRoute = async ({ params, request, locals }) => {
  const currentUser = locals.user;

  if (!currentUser) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { status, notes } = body;

    const validStatuses: Lead['status'][] = ['new', 'contacted', 'interested', 'discarded', 'closed'];
    if (!status || !validStatuses.includes(status)) {
      return new Response(JSON.stringify({ error: 'Estado inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updatedLead = await updateLeadStatus(Number(params.id), status, notes);

    if (!updatedLead) {
      return new Response(JSON.stringify({ error: 'Lead no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await logActivity({
      user_id: currentUser.id,
      action: 'lead_status_updated',
      entity_type: 'lead',
      entity_id: params.id,
      details: { new_status: status },
    });

    return new Response(JSON.stringify({ lead: updatedLead }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating lead status:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar estado' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
