import type { APIRoute } from 'astro';
import { getAllUsers, createUser, logActivity } from '../../../../lib/ubikala-db';
import { hashPassword } from '../../../../lib/auth';

// GET - List all users (admin only)
export const GET: APIRoute = async ({ locals }) => {
  const user = locals.user;

  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const users = await getAllUsers();
    return new Response(JSON.stringify({ users }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener usuarios' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST - Create new user (admin only)
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
    const { email, password, name, role, phone } = body;

    if (!email || !password || !name || !role) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const validRoles = ['admin', 'inmobiliaria', 'asesor_independiente', 'propietario'];
    if (!validRoles.includes(role)) {
      return new Response(JSON.stringify({ error: 'Rol inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const password_hash = await hashPassword(password);

    const newUser = await createUser({
      email,
      password_hash,
      name,
      role,
      phone,
    });

    await logActivity({
      user_id: user.id,
      action: 'user_created',
      entity_type: 'user',
      entity_id: newUser.id,
      details: { email: newUser.email, role: newUser.role },
    });

    // Remove password_hash from response
    const { password_hash: _, ...safeUser } = newUser;

    return new Response(JSON.stringify({ user: safeUser }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error creating user:', error);

    if (error.message?.includes('unique') || error.code === '23505') {
      return new Response(JSON.stringify({ error: 'El email ya está registrado' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Error al crear usuario' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
