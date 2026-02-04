import type { APIRoute } from 'astro';
import { getUserById, updateUser, updateTeamMemberLimit, deleteUser, logActivity } from '../../../../lib/ubikala-db';
import { hashPassword } from '../../../../lib/auth';

// GET - Get single team member
export const GET: APIRoute = async ({ params, locals }) => {
  const currentUser = locals.user;

  if (!currentUser) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const member = await getUserById(params.id!);

    if (!member) {
      return new Response(JSON.stringify({ error: 'Miembro no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if this member belongs to the current user's team
    if (member.parent_user_id !== currentUser.id && currentUser.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'No autorizado' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { password_hash, ...safeMember } = member;

    return new Response(JSON.stringify({ member: safeMember }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching team member:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener miembro' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// PUT - Update team member
export const PUT: APIRoute = async ({ params, request, locals }) => {
  const currentUser = locals.user;

  if (!currentUser) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const member = await getUserById(params.id!);

    if (!member) {
      return new Response(JSON.stringify({ error: 'Miembro no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if this member belongs to the current user's team
    if (member.parent_user_id !== currentUser.id && currentUser.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'No autorizado' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { email, password, name, phone, is_active, custom_publication_limit } = body;

    const updateData: any = {};

    if (email) updateData.email = email;
    if (name) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (is_active !== undefined) updateData.is_active = is_active;
    if (password) updateData.password_hash = await hashPassword(password);
    if (custom_publication_limit !== undefined) {
      updateData.custom_publication_limit = custom_publication_limit ? Number(custom_publication_limit) : null;
    }

    const updatedMember = await updateUser(params.id!, updateData);

    if (!updatedMember) {
      return new Response(JSON.stringify({ error: 'Miembro no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await logActivity({
      user_id: currentUser.id,
      action: 'team_member_updated',
      entity_type: 'user',
      entity_id: params.id,
      details: { fields: Object.keys(updateData) },
    });

    const { password_hash, ...safeMember } = updatedMember;

    return new Response(JSON.stringify({ member: safeMember }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error updating team member:', error);

    if (error.message?.includes('unique') || error.code === '23505') {
      return new Response(JSON.stringify({ error: 'El email ya está registrado' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Error al actualizar miembro' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// DELETE - Remove team member
export const DELETE: APIRoute = async ({ params, locals }) => {
  const currentUser = locals.user;

  if (!currentUser) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const member = await getUserById(params.id!);

    if (!member) {
      return new Response(JSON.stringify({ error: 'Miembro no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if this member belongs to the current user's team
    if (member.parent_user_id !== currentUser.id && currentUser.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'No autorizado' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await deleteUser(params.id!);

    await logActivity({
      user_id: currentUser.id,
      action: 'team_member_deleted',
      entity_type: 'user',
      entity_id: params.id,
      details: { email: member.email },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return new Response(JSON.stringify({ error: 'Error al eliminar miembro' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
