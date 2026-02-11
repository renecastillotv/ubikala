import type { APIRoute } from 'astro';
import { getUbikalaProperties, createProperty, logActivity, canUserPublish } from '../../../../lib/ubikala-db';
import { notifyPropertyChange } from '../../../../lib/search-engine-ping';

function generateSlug(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    + '-' + Date.now().toString(36);
}

// GET - List properties
export const GET: APIRoute = async ({ url }) => {
  try {
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const activo = url.searchParams.get('activo') !== 'false';

    const properties = await getUbikalaProperties({ limit, offset, activo });

    return new Response(JSON.stringify({ properties }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener propiedades' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST - Create property
export const POST: APIRoute = async ({ request, locals }) => {
  const user = locals.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Check publication limits before proceeding
    const publicationCheck = await canUserPublish(user.id);
    if (!publicationCheck.canPublish) {
      return new Response(JSON.stringify({
        error: publicationCheck.reason || 'No puedes publicar más propiedades',
        limit_reached: true,
        current_count: publicationCheck.currentCount,
        limit: publicationCheck.limit
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();

    // Required fields validation
    if (!body.titulo || !body.tipo || !body.operacion || !body.precio) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Generate slug if not provided
    const slug = body.slug || generateSlug(body.titulo);

    const property = await createProperty({
      ...body,
      slug,
      created_by: user.id,
    });

    await logActivity({
      user_id: user.id,
      action: 'property_created',
      entity_type: 'property',
      entity_id: property.id,
      details: { titulo: property.titulo, slug: property.slug },
    });

    // Notify search engines about new property (non-blocking)
    notifyPropertyChange(property.slug).catch(() => {});

    return new Response(JSON.stringify({ property }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error creating property:', error);

    if (error.message?.includes('unique') || error.code === '23505') {
      return new Response(JSON.stringify({ error: 'Ya existe una propiedad con ese slug' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Error al crear propiedad' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
