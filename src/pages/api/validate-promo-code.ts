import type { APIRoute } from 'astro';
import { validatePromoCode, getUserById } from '../../lib/ubikala-db';

// POST - Validate a promo code
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { code, plan_id } = body;

    if (!code) {
      return new Response(JSON.stringify({ error: 'Código requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get user role if logged in
    let userRole = 'propietario'; // Default role for non-logged in users
    if (locals.user) {
      const user = await getUserById(locals.user.id);
      if (user) {
        userRole = user.role;
      }
    }

    const result = await validatePromoCode(code, userRole as any, plan_id);

    if (!result.valid) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      valid: true,
      promoCode: {
        id: result.promoCode!.id,
        code: result.promoCode!.code,
        discount_type: result.promoCode!.discount_type,
        discount_value: result.promoCode!.discount_value,
        description: result.promoCode!.description,
      },
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error validating promo code:', error);
    return new Response(JSON.stringify({ error: 'Error al validar código' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
