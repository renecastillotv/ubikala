import type { APIRoute } from 'astro';
import { registerUser, createAuthCookie } from '../../../../lib/auth';
import { ubikalaDb, type UserRole } from '../../../../lib/ubikala-db';

const VALID_ROLES: UserRole[] = ['inmobiliaria', 'asesor_independiente', 'propietario'];

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
    const { email, password, name, role, phone, company_name, license_number, country_code } = body;

    // Validate required fields
    if (!email || !password || !name || !role) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Formato de correo electrónico inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate password length
    if (password.length < 8) {
      return new Response(JSON.stringify({ error: 'La contraseña debe tener al menos 8 caracteres' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate role - don't allow admin registration
    if (!VALID_ROLES.includes(role as UserRole)) {
      return new Response(JSON.stringify({ error: 'Tipo de cuenta inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ip_address = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined;
    const user_agent = request.headers.get('user-agent') || undefined;

    const result = await registerUser({
      email: email.toLowerCase().trim(),
      password,
      name: name.trim(),
      role: role as UserRole,
      phone: phone?.trim() || undefined,
      company_name: company_name?.trim() || undefined,
      license_number: license_number?.trim() || undefined,
      country_code: country_code?.trim()?.toUpperCase() || undefined,
    }, ip_address, user_agent);

    return new Response(JSON.stringify({ user: result.user }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': createAuthCookie(result.token),
      },
    });
  } catch (error: any) {
    console.error('Register error:', error);

    // Check for specific error messages
    if (error.message?.includes('ya está registrado')) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      error: error.message || 'Error interno del servidor'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
