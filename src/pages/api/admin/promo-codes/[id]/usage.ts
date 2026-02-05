import type { APIRoute } from 'astro';
import { getPromoCodeUsage } from '../../../../../lib/ubikala-db';

// GET - Get promo code usage details (admin only)
export const GET: APIRoute = async ({ params, locals }) => {
  const user = locals.user;

  if (!user || user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const usage = await getPromoCodeUsage(id);

    return new Response(JSON.stringify({ usage }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching promo code usage:', error);
    return new Response(JSON.stringify({ error: 'Error al obtener uso' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
