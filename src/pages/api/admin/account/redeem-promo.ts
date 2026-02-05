import type { APIRoute } from 'astro';
import { validatePromoCode, usePromoCode, getUserById, logActivity, type UserRole } from '../../../../lib/ubikala-db';

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
    const { code } = body;

    if (!code) {
      return new Response(JSON.stringify({ error: 'Código requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const fullUser = await getUserById(user.id);
    if (!fullUser) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (fullUser.promo_code_used) {
      return new Response(JSON.stringify({ error: 'Ya has canjeado un código promocional anteriormente' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const validation = await validatePromoCode(code, fullUser.role as UserRole);
    if (!validation.valid || !validation.promoCode) {
      return new Response(JSON.stringify({ error: validation.error || 'Código inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const promo = validation.promoCode;

    let discountApplied = promo.discount_value;

    await usePromoCode(promo.id, user.id, discountApplied);

    await logActivity({
      user_id: user.id,
      action: 'promo_code_redeemed',
      entity_type: 'promo_code',
      entity_id: promo.id,
      details: {
        code: promo.code,
        discount_type: promo.discount_type,
        discount_value: promo.discount_value,
      },
    });

    return new Response(JSON.stringify({
      success: true,
      promoCode: {
        code: promo.code,
        discount_type: promo.discount_type,
        discount_value: promo.discount_value,
        description: promo.description,
      },
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error redeeming promo code:', error);

    if (error.message?.includes('duplicate') || error.code === '23505') {
      return new Response(JSON.stringify({ error: 'Ya has canjeado este código anteriormente' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Error al canjear código' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
