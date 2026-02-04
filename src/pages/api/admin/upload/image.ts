import type { APIRoute } from 'astro';
import { logActivity } from '../../../../lib/ubikala-db';

// POST - Upload image and return URL (base64 data URL for now)
export const POST: APIRoute = async ({ request, locals }) => {
  const user = locals.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No se proporcionó imagen' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return new Response(JSON.stringify({ error: 'El archivo debe ser una imagen' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return new Response(JSON.stringify({ error: 'La imagen es muy grande. Máximo 5MB.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Convert to base64 data URL
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    const mimeType = file.type;
    const dataUrl = `data:${mimeType};base64,${base64}`;

    await logActivity({
      user_id: user.id,
      action: 'image_uploaded',
      details: { file_name: file.name, file_size: file.size },
    });

    return new Response(JSON.stringify({
      success: true,
      url: dataUrl,
      name: file.name,
      size: file.size,
      type: file.type,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return new Response(JSON.stringify({ error: 'Error al subir imagen' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
