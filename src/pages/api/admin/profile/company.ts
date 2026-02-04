import type { APIRoute } from 'astro';
import { getUserById, updateCompanyProfile, logActivity } from '../../../../lib/ubikala-db';

// PUT - Update company profile (for inmobiliarias only)
export const PUT: APIRoute = async ({ request, locals }) => {
  const user = locals.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Verify user is inmobiliaria
  const fullUser = await getUserById(user.id);
  if (!fullUser || fullUser.role !== 'inmobiliaria') {
    return new Response(JSON.stringify({ error: 'Solo inmobiliarias pueden actualizar el perfil de empresa' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { company_name, company_description, company_website, company_address, company_logo } = body;

    // Validate logo size if provided
    if (company_logo && company_logo.startsWith('data:image/')) {
      const base64Length = company_logo.split(',')[1]?.length || 0;
      const sizeInBytes = (base64Length * 3) / 4;
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (sizeInBytes > maxSize) {
        return new Response(JSON.stringify({ error: 'El logo es muy grande. Máximo 2MB.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    const updatedUser = await updateCompanyProfile(user.id, {
      company_name: company_name || null,
      company_description: company_description || null,
      company_website: company_website || null,
      company_address: company_address || null,
      company_logo: company_logo || undefined,
    });

    if (!updatedUser) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await logActivity({
      user_id: user.id,
      action: 'company_profile_updated',
      entity_type: 'user',
      entity_id: user.id,
      details: { fields: Object.keys(body).filter(k => body[k] !== undefined) },
    });

    const { password_hash, ...safeUser } = updatedUser;

    return new Response(JSON.stringify({ success: true, user: safeUser }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error updating company profile:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar perfil de empresa' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// GET - Get company profile
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

    return new Response(JSON.stringify({
      company_name: fullUser.company_name,
      company_description: fullUser.company_description,
      company_website: fullUser.company_website,
      company_address: fullUser.company_address,
      company_logo: fullUser.company_logo,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching company profile:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener perfil de empresa' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
