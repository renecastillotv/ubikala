import type { APIRoute } from 'astro';
import { getVerificationRequestById, updateVerificationRequestStatus, logActivity } from '../../../../lib/ubikala-db';

// GET - Get verification request details
export const GET: APIRoute = async ({ params, locals }) => {
  const user = locals.user;

  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const request = await getVerificationRequestById(params.id!);

    if (!request) {
      return new Response(JSON.stringify({ error: 'Solicitud no encontrada' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ request }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching verification request:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener solicitud' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// PUT - Update verification status
export const PUT: APIRoute = async ({ params, request, locals }) => {
  const user = locals.user;

  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { status, rejection_reason, admin_notes } = body;

    if (!status || !['pending', 'under_review', 'approved', 'rejected'].includes(status)) {
      return new Response(JSON.stringify({ error: 'Estado inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (status === 'rejected' && !rejection_reason) {
      return new Response(JSON.stringify({ error: 'Motivo de rechazo requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updatedRequest = await updateVerificationRequestStatus(
      params.id!,
      status,
      user.id,
      rejection_reason,
      admin_notes
    );

    if (!updatedRequest) {
      return new Response(JSON.stringify({ error: 'Solicitud no encontrada' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await logActivity({
      user_id: user.id,
      action: `verification_${status}`,
      entity_type: 'verification_request',
      entity_id: params.id!,
      details: { status, rejection_reason },
    });

    return new Response(JSON.stringify({ request: updatedRequest }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating verification:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar solicitud' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
