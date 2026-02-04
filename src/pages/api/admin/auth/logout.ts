import type { APIRoute } from 'astro';
import { getTokenFromRequest, logoutUser, createLogoutCookie } from '../../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    const token = getTokenFromRequest(request);
    const ip_address = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined;

    if (token) {
      await logoutUser(token, ip_address);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': createLogoutCookie(),
      },
    });
  } catch (error) {
    console.error('Logout error:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
