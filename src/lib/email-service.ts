/**
 * Email Service
 *
 * Sends lead notification emails via Resend API when no webhooks
 * are configured for a property owner.
 */

import { getUserById } from './ubikala-db';
import type { WebhookPayload } from './webhook-dispatcher';

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
const RESEND_FROM = import.meta.env.RESEND_FROM || process.env.RESEND_FROM || 'Ubikala <noreply@mail.ubikala.com>';

/** Strip everything except digits and leading + for tel: links */
function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '');
  // If it's a Dominican number without country code, add +1
  if (/^\d{10}$/.test(cleaned)) return '+1' + cleaned;
  if (/^1\d{10}$/.test(cleaned)) return '+' + cleaned;
  return cleaned.startsWith('+') ? cleaned : '+' + cleaned;
}

/**
 * Send a lead notification email to the property owner.
 */
export async function sendLeadNotificationEmail(
  ownerId: string,
  payload: WebhookPayload
): Promise<void> {
  if (!RESEND_API_KEY) {
    console.warn('[Email] RESEND_API_KEY not configured, skipping notification');
    return;
  }

  const user = await getUserById(ownerId);
  if (!user?.email) {
    console.warn(`[Email] No email found for user ${ownerId}, skipping notification`);
    return;
  }

  const { contact, property, agent } = payload.data;
  const phoneTel = contact.phone ? normalizePhone(contact.phone) : '';
  const whatsappUrl = phoneTel ? `https://wa.me/${phoneTel.replace('+', '')}?text=${encodeURIComponent(`Hola, te escribo por tu propiedad ${property.title || property.slug} en Ubikala`)}` : '';

  const subject = `Nuevo lead: ${contact.name || 'Contacto'} está interesado en ${property.title || property.slug}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f5f0eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <!-- Header -->
    <div style="background-color:#5a5a32;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600;">Nuevo Lead</h1>
      <p style="margin:8px 0 0;color:#d4c5a9;font-size:14px;">Alguien está interesado en tu propiedad</p>
    </div>

    <!-- Body -->
    <div style="background-color:#ffffff;padding:24px;border-radius:0 0 12px 12px;">
      <!-- Property -->
      <div style="margin-bottom:20px;padding:16px;background-color:#faf8f5;border-radius:8px;border-left:4px solid #c4704b;">
        <h2 style="margin:0 0 4px;font-size:16px;color:#333;">🏠 ${property.title || property.slug}</h2>
        <p style="margin:0;font-size:13px;color:#666;">Slug: ${property.slug}</p>
      </div>

      <!-- Contact info -->
      <h3 style="margin:0 0 12px;font-size:15px;color:#5a5a32;">Datos del contacto</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        ${contact.name ? `<tr><td style="padding:8px 12px;font-size:14px;color:#666;width:100px;">Nombre</td><td style="padding:8px 12px;font-size:14px;color:#333;font-weight:500;">${contact.name}</td></tr>` : ''}
        ${contact.phone ? `<tr><td style="padding:8px 12px;font-size:14px;color:#666;">Teléfono</td><td style="padding:8px 12px;font-size:14px;color:#333;font-weight:500;"><a href="tel:${phoneTel}" style="color:#c4704b;text-decoration:none;">${contact.phone}</a>${whatsappUrl ? ` &nbsp;<a href="${whatsappUrl}" style="color:#25d366;text-decoration:none;font-size:12px;">WhatsApp</a>` : ''}</td></tr>` : ''}
        ${contact.email ? `<tr><td style="padding:8px 12px;font-size:14px;color:#666;">Email</td><td style="padding:8px 12px;font-size:14px;color:#333;font-weight:500;"><a href="mailto:${contact.email}" style="color:#c4704b;text-decoration:none;">${contact.email}</a></td></tr>` : ''}
        ${contact.message ? `<tr><td style="padding:8px 12px;font-size:14px;color:#666;vertical-align:top;">Mensaje</td><td style="padding:8px 12px;font-size:14px;color:#333;">${contact.message}</td></tr>` : ''}
      </table>

      ${agent.name ? `
      <div style="padding:12px;background-color:#f0f0e8;border-radius:8px;font-size:13px;color:#666;">
        <strong>Asesor:</strong> ${agent.name}${agent.company ? ` — ${agent.company}` : ''}
      </div>
      ` : ''}

      <!-- CTA -->
      <div style="margin-top:24px;text-align:center;">
        <a href="https://ubikala.com/admin/leads" style="display:inline-block;padding:12px 32px;background-color:#c4704b;color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">
          Ver en tu panel
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:16px;font-size:12px;color:#999;">
      <p style="margin:0;">Este correo fue enviado porque alguien contactó una de tus propiedades en Ubikala.</p>
      <p style="margin:8px 0 0;">Para dejar de recibir estos correos, configura un <a href="https://ubikala.com/admin/webhooks" style="color:#c4704b;">conector</a> en tu panel.</p>
    </div>
  </div>
</body>
</html>`.trim();

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: user.email,
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`[Email] Resend API error ${response.status}: ${text}`);
    } else {
      console.log(`[Email] Lead notification sent to ${user.email}`);
    }
  } catch (error: any) {
    console.error(`[Email] Failed to send to ${user.email}:`, error.message);
  }
}
