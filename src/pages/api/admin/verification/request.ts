import type { APIRoute } from 'astro';
import { createVerificationRequest, getVerificationRequestByUserId, logActivity } from '../../../../lib/ubikala-db';

// POST - Create verification request
export const POST: APIRoute = async ({ locals }) => {
  const user = locals.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const request = await createVerificationRequest(user.id);

    await logActivity({
      user_id: user.id,
      action: 'verification_requested',
      entity_type: 'verification_request',
      entity_id: request.id,
    });

    return new Response(JSON.stringify({ request }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error creating verification request:', error);

    if (error.message?.includes('Ya tienes')) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Error al crear solicitud' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// GET - Get current user's verification request
export const GET: APIRoute = async ({ locals }) => {
  const user = locals.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const request = await getVerificationRequestByUserId(user.id);

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
