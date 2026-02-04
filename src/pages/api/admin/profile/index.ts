import type { APIRoute } from 'astro';
import { getUserById, updateUserProfile, logActivity } from '../../../../lib/ubikala-db';

// GET - Get current user profile
export const GET: APIRoute = async ({ locals }) => {
  const user = locals.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const fullUser = await getUserById(user.id);

    if (!fullUser) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { password_hash, ...safeUser } = fullUser;

    return new Response(JSON.stringify({ user: safeUser }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener perfil' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// PUT - Update current user profile
export const PUT: APIRoute = async ({ request, locals }) => {
  const user = locals.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { name, bio, phone } = body;

    const updateData: { name?: string; bio?: string; phone?: string } = {};

    if (name !== undefined) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (phone !== undefined) updateData.phone = phone;

    const updatedUser = await updateUserProfile(user.id, updateData);

    if (!updatedUser) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await logActivity({
      user_id: user.id,
      action: 'profile_updated',
      entity_type: 'user',
      entity_id: user.id,
      details: { fields: Object.keys(updateData) },
    });

    const { password_hash, ...safeUser } = updatedUser;

    return new Response(JSON.stringify({ user: safeUser }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error updating profile:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar perfil' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
