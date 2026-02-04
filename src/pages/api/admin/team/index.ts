import type { APIRoute } from 'astro';
import { getTeamMembers, createTeamMember, canAddTeamMember, logActivity, type UserRole } from '../../../../lib/ubikala-db';
import { hashPassword } from '../../../../lib/auth';

// GET - List team members (inmobiliaria only)
export const GET: APIRoute = async ({ locals }) => {
  const user = locals.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Only inmobiliarias and admins can view team
  if (user.role !== 'inmobiliaria' && user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const members = await getTeamMembers(user.id);
    return new Response(JSON.stringify({ members }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener miembros del equipo' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST - Create new team member (inmobiliaria only)
export const POST: APIRoute = async ({ request, locals }) => {
  const user = locals.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Only inmobiliarias can create team members
  if (user.role !== 'inmobiliaria') {
    return new Response(JSON.stringify({ error: 'Solo las inmobiliarias pueden crear miembros de equipo' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Check team member limit based on plan
    const teamCheck = await canAddTeamMember(user.id);
    if (!teamCheck.canAdd) {
      return new Response(JSON.stringify({
        error: teamCheck.reason || 'No puedes agregar más miembros al equipo',
        limit_reached: true,
        current_count: teamCheck.currentCount,
        limit: teamCheck.limit
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { email, password, name, role, phone, custom_publication_limit } = body;

    if (!email || !password || !name) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Team members can only be asesor_independiente
    const memberRole: UserRole = 'asesor_independiente';

    const password_hash = await hashPassword(password);

    const newMember = await createTeamMember(user.id, {
      email,
      password_hash,
      name,
      role: memberRole,
      phone,
      custom_publication_limit: custom_publication_limit ? Number(custom_publication_limit) : undefined,
    });

    await logActivity({
      user_id: user.id,
      action: 'team_member_created',
      entity_type: 'user',
      entity_id: newMember.id,
      details: { email: newMember.email, name: newMember.name },
    });

    // Remove password_hash from response
    const { password_hash: _, ...safeMember } = newMember;

    return new Response(JSON.stringify({ member: safeMember }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error creating team member:', error);

    if (error.message?.includes('unique') || error.code === '23505') {
      return new Response(JSON.stringify({ error: 'El email ya está registrado' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Error al crear miembro del equipo' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
