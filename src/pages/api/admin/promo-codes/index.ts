import type { APIRoute } from 'astro';
import { getAllPromoCodes, createPromoCode, logActivity } from '../../../../lib/ubikala-db';

// GET - List all promo codes (admin only)
export const GET: APIRoute = async ({ locals }) => {
  const user = locals.user;

  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const promoCodes = await getAllPromoCodes();
    return new Response(JSON.stringify({ promoCodes }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching promo codes:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener códigos' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// POST - Create new promo code (admin only)
export const POST: APIRoute = async ({ request, locals }) => {
  const user = locals.user;

  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const {
      code,
      description,
      discount_type,
      discount_value,
      max_uses,
      valid_from,
      valid_until,
      applicable_roles,
      applicable_plans,
      is_active,
    } = body;

    if (!code || !discount_type || discount_value === undefined) {
      return new Response(JSON.stringify({ error: 'Código, tipo y valor son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const promoCode = await createPromoCode({
      code,
      description,
      discount_type,
      discount_value,
      max_uses,
      valid_from,
      valid_until,
      applicable_roles,
      applicable_plans,
      is_active,
      created_by: user.id,
    });

    await logActivity({
      user_id: user.id,
      action: 'promo_code_created',
      entity_type: 'promo_code',
      entity_id: promoCode.id,
      details: { code: promoCode.code },
    });

    return new Response(JSON.stringify({ promoCode }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error creating promo code:', error);

    // Check for unique constraint violation
    if (error.message?.includes('duplicate') || error.code === '23505') {
      return new Response(JSON.stringify({ error: 'Este código ya existe' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Error al crear código' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
