import type { APIRoute } from 'astro';
import { getPromoCodeById, updatePromoCode, deletePromoCode, logActivity } from '../../../../lib/ubikala-db';

// GET - Get single promo code
export const GET: APIRoute = async ({ params, locals }) => {
  const user = locals.user;

  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const promoCode = await getPromoCodeById(params.id!);

    if (!promoCode) {
      return new Response(JSON.stringify({ error: 'Código no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ promoCode }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching promo code:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener código' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// PUT - Update promo code
export const PUT: APIRoute = async ({ params, request, locals }) => {
  const user = locals.user;

  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const updatedPromo = await updatePromoCode(params.id!, body);

    if (!updatedPromo) {
      return new Response(JSON.stringify({ error: 'Código no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await logActivity({
      user_id: user.id,
      action: 'promo_code_updated',
      entity_type: 'promo_code',
      entity_id: params.id!,
      details: { code: updatedPromo.code },
    });

    return new Response(JSON.stringify({ promoCode: updatedPromo }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error updating promo code:', error);

    if (error.message?.includes('duplicate') || error.code === '23505') {
      return new Response(JSON.stringify({ error: 'Este código ya existe' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Error al actualizar código' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// DELETE - Delete promo code
export const DELETE: APIRoute = async ({ params, locals }) => {
  const user = locals.user;

  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const promoCode = await getPromoCodeById(params.id!);

    if (!promoCode) {
      return new Response(JSON.stringify({ error: 'Código no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await deletePromoCode(params.id!);

    await logActivity({
      user_id: user.id,
      action: 'promo_code_deleted',
      entity_type: 'promo_code',
      entity_id: params.id!,
      details: { code: promoCode.code },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting promo code:', error);
    return new Response(JSON.stringify({ error: 'Error al eliminar código' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
