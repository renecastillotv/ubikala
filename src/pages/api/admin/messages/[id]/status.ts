import type { APIRoute } from 'astro';
import { updateContactMessageStatus, logActivity, type ContactMessage } from '../../../../../lib/ubikala-db';

export const PATCH: APIRoute = async ({ params, request, locals }) => {
  const currentUser = locals.user;

  if (!currentUser || currentUser.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { status } = body;

    const validStatuses: ContactMessage['status'][] = ['new', 'read', 'replied'];
    if (!status || !validStatuses.includes(status)) {
      return new Response(JSON.stringify({ error: 'Estado inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updatedMsg = await updateContactMessageStatus(Number(params.id), status);

    if (!updatedMsg) {
      return new Response(JSON.stringify({ error: 'Mensaje no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await logActivity({
      user_id: currentUser.id,
      action: 'message_status_updated',
      entity_type: 'contact_message',
      entity_id: params.id,
      details: { new_status: status },
    });

    return new Response(JSON.stringify({ message: updatedMsg }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating message status:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar estado' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
