import type { APIRoute } from 'astro';
import { createContactMessage } from '../../lib/ubikala-db';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'Todos los campos requeridos deben ser completados' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const contactMessage = await createContactMessage({
      name,
      email,
      phone: phone || undefined,
      subject,
      message,
    });

    return new Response(JSON.stringify({ success: true, id: contactMessage.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return new Response(JSON.stringify({ error: 'Error al enviar mensaje' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
