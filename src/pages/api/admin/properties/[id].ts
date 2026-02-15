import type { APIRoute } from 'astro';
import { getUbikalaPropertyById, updateProperty, deleteProperty, logActivity } from '../../../../lib/ubikala-db';
import { notifyPropertyChange } from '../../../../lib/search-engine-ping';
import { syncPropertyToCRM } from '../../../../lib/crm-sync';

// GET - Get single property
export const GET: APIRoute = async ({ params }) => {
  try {
    const property = await getUbikalaPropertyById(params.id!);

    if (!property) {
      return new Response(JSON.stringify({ error: 'Propiedad no encontrada' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ property }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching property:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener propiedad' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// PUT - Update property
export const PUT: APIRoute = async ({ params, request, locals }) => {
  const user = locals.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();

    const property = await getUbikalaPropertyById(params.id!);

    if (!property) {
      return new Response(JSON.stringify({ error: 'Propiedad no encontrada' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Agents can only edit their own properties (unless admin)
    if (user.role !== 'admin' && property.created_by !== user.id) {
      return new Response(JSON.stringify({ error: 'No tienes permiso para editar esta propiedad' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updatedProperty = await updateProperty(params.id!, body);

    await logActivity({
      user_id: user.id,
      action: 'property_updated',
      entity_type: 'property',
      entity_id: params.id,
      details: { fields: Object.keys(body) },
    });

    // Notify search engines about updated property (non-blocking)
    if (updatedProperty.slug) {
      notifyPropertyChange(updatedProperty.slug).catch(() => {});
    }

    // Sync to MeiliSearch via CRM API (non-blocking)
    syncPropertyToCRM(params.id!, 'update').catch(() => {});

    return new Response(JSON.stringify({ property: updatedProperty }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error updating property:', error);

    if (error.message?.includes('unique') || error.code === '23505') {
      return new Response(JSON.stringify({ error: 'Ya existe una propiedad con ese slug' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Error al actualizar propiedad' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// DELETE - Delete property
export const DELETE: APIRoute = async ({ params, locals }) => {
  const user = locals.user;

  if (!user) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const property = await getUbikalaPropertyById(params.id!);

    if (!property) {
      return new Response(JSON.stringify({ error: 'Propiedad no encontrada' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Agents can only delete their own properties (unless admin)
    if (user.role !== 'admin' && property.created_by !== user.id) {
      return new Response(JSON.stringify({ error: 'No tienes permiso para eliminar esta propiedad' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await deleteProperty(params.id!);

    // Remove from MeiliSearch via CRM API (non-blocking)
    syncPropertyToCRM(params.id!, 'delete').catch(() => {});

    await logActivity({
      user_id: user.id,
      action: 'property_deleted',
      entity_type: 'property',
      entity_id: params.id,
      details: { titulo: property.titulo },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting property:', error);
    return new Response(JSON.stringify({ error: 'Error al eliminar propiedad' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
