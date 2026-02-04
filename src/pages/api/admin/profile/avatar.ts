import type { APIRoute } from 'astro';
import { updateUserProfile, logActivity } from '../../../../lib/ubikala-db';

// POST - Upload avatar (accepts base64 image)
export const POST: APIRoute = async ({ request, locals }) => {
  const user = locals.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { avatar_url } = body;

    if (!avatar_url) {
      return new Response(JSON.stringify({ error: 'No se proporcionó imagen' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate that it's a base64 data URL or a valid URL
    if (!avatar_url.startsWith('data:image/') && !avatar_url.startsWith('http')) {
      return new Response(JSON.stringify({ error: 'Formato de imagen inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check size if it's a base64 image (max 2MB)
    if (avatar_url.startsWith('data:image/')) {
      const base64Length = avatar_url.split(',')[1]?.length || 0;
      const sizeInBytes = (base64Length * 3) / 4;
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (sizeInBytes > maxSize) {
        return new Response(JSON.stringify({ error: 'La imagen es muy grande. Máximo 2MB.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    const updatedUser = await updateUserProfile(user.id, { avatar_url });

    if (!updatedUser) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await logActivity({
      user_id: user.id,
      action: 'avatar_updated',
      entity_type: 'user',
      entity_id: user.id,
    });

    return new Response(JSON.stringify({ success: true, avatar_url: updatedUser.avatar_url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error uploading avatar:', error);
    return new Response(JSON.stringify({ error: 'Error al subir avatar' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// DELETE - Remove avatar
export const DELETE: APIRoute = async ({ locals }) => {
  const user = locals.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const updatedUser = await updateUserProfile(user.id, { avatar_url: '' });

    if (!updatedUser) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await logActivity({
      user_id: user.id,
      action: 'avatar_removed',
      entity_type: 'user',
      entity_id: user.id,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error removing avatar:', error);
    return new Response(JSON.stringify({ error: 'Error al eliminar avatar' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
