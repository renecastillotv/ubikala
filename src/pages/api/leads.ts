import type { APIRoute } from 'astro';
import { createLead } from '../../lib/ubikala-db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { property_slug, property_title, name, phone, email, message, source, session_id, agent_name, agent_company } = body;

    if (!name && !email && !phone) {
      return new Response(JSON.stringify({ error: 'Se requiere al menos nombre, email o teléfono' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const lead = await createLead({
      property_slug: property_slug || undefined,
      property_title: property_title || undefined,
      name: name || '',
      email: email || '',
      phone: phone || undefined,
      message: message || undefined,
      source: source || 'ubikala',
      session_id: session_id || undefined,
      agent_name: agent_name || undefined,
      agent_company: agent_company || undefined,
    });

    return new Response(JSON.stringify({ success: true, id: lead.id, created_at: lead.created_at }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving lead:', error);
    return new Response(JSON.stringify({ error: 'Error al guardar lead' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
