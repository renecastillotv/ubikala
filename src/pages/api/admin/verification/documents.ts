import type { APIRoute } from 'astro';
import { uploadUserDocument, getUserDocuments, getVerificationRequestByUserId, logActivity } from '../../../../lib/ubikala-db';

// POST - Upload verification document
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
    const { verification_request_id, document_type_id, file_url, file_name } = body;

    if (!verification_request_id || !document_type_id || !file_url) {
      return new Response(JSON.stringify({ error: 'Datos incompletos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate file size if base64
    if (file_url.startsWith('data:')) {
      const base64Length = file_url.split(',')[1]?.length || 0;
      const sizeInBytes = (base64Length * 3) / 4;
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (sizeInBytes > maxSize) {
        return new Response(JSON.stringify({ error: 'El archivo es muy grande. Máximo 5MB.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    const document = await uploadUserDocument({
      user_id: user.id,
      verification_request_id,
      document_type_id,
      file_url,
      file_name,
    });

    await logActivity({
      user_id: user.id,
      action: 'document_uploaded',
      entity_type: 'user_document',
      entity_id: document.id,
    });

    return new Response(JSON.stringify({ document }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    return new Response(JSON.stringify({ error: 'Error al subir documento' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// GET - Get user's uploaded documents
export const GET: APIRoute = async ({ locals }) => {
  const user = locals.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const documents = await getUserDocuments(user.id);

    return new Response(JSON.stringify({ documents }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener documentos' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
