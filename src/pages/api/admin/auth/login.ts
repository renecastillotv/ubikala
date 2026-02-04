import type { APIRoute } from 'astro';
import { loginUser, createAuthCookie } from '../../../../lib/auth';
import { ubikalaDb } from '../../../../lib/ubikala-db';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Check if database is configured
    if (!ubikalaDb) {
      console.error('UBIKALA_DATABASE_URL not configured');
      return new Response(JSON.stringify({
        error: 'Base de datos no configurada. Verifica UBIKALA_DATABASE_URL en Vercel.'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email y contraseña son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ip_address = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined;
    const user_agent = request.headers.get('user-agent') || undefined;

    const result = await loginUser(email, password, ip_address, user_agent);

    if (!result) {
      return new Response(JSON.stringify({ error: 'Credenciales inválidas' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ user: result.user }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': createAuthCookie(result.token),
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({
      error: `Error: ${error.message || 'Error interno del servidor'}`
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
