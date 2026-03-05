/**
 * Webhook Dispatcher
 *
 * When a lead is created, dispatches webhooks to all active connectors
 * for the property owner. Falls back to email notification if no
 * webhooks are configured.
 *
 * For CRM properties (tenant_id != 'ubikala'), automatically dispatches
 * to the CRM API lead endpoint using the shared webhook secret.
 */

import { getActiveWebhooksForEvent, updateWebhookTriggerStatus, ensureUserWebhooksTable } from './ubikala-db';
import { sendLeadNotificationEmail } from './email-service';

const CRM_API_URL = import.meta.env.CRM_API_URL || process.env.CRM_API_URL || 'https://api.denlla.com';
const UBIKALA_WEBHOOK_SECRET = import.meta.env.UBIKALA_WEBHOOK_SECRET || process.env.UBIKALA_WEBHOOK_SECRET;

export interface WebhookPayload {
  event: 'lead.new';
  timestamp: string;
  data: {
    lead_id: number;
    property: {
      slug: string;
      title: string;
      tenant_id: string | null;
    };
    contact: {
      name: string;
      email: string;
      phone: string;
      message: string;
    };
    source: 'ubikala';
    agent: {
      name: string;
      company: string | null;
    };
  };
}

/**
 * Dispatch lead webhooks to all active connectors for the property owner.
 * Falls back to email if no webhooks are configured.
 */
export async function dispatchLeadWebhooks(
  propertyOwnerId: string,
  payload: WebhookPayload
): Promise<void> {
  // Ensure table exists before querying
  await ensureUserWebhooksTable();

  const webhooks = await getActiveWebhooksForEvent(propertyOwnerId, 'lead.new');

  if (webhooks.length > 0) {
    // Fire all webhooks in parallel (don't let one failure block others)
    const results = await Promise.allSettled(
      webhooks.map(async (wh) => {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 10000);

          const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'X-Ubikala-Event': payload.event,
          };
          if (wh.secret_key) {
            headers['X-Ubikala-Secret'] = wh.secret_key;
          }

          const response = await fetch(wh.url, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
            signal: controller.signal,
          });

          clearTimeout(timeout);

          await updateWebhookTriggerStatus(wh.id, response.status);

          if (!response.ok) {
            console.error(`[Webhook] ${wh.nombre} (${wh.id}) returned ${response.status}`);
          } else {
            console.log(`[Webhook] ${wh.nombre} (${wh.id}) → ${response.status} OK`);
          }
        } catch (error: any) {
          console.error(`[Webhook] ${wh.nombre} (${wh.id}) failed:`, error.message);
          await updateWebhookTriggerStatus(wh.id, 0).catch(() => {});
        }
      })
    );

    const failed = results.filter(r => r.status === 'rejected').length;
    if (failed > 0) {
      console.warn(`[Webhook] ${failed}/${webhooks.length} webhooks failed for user ${propertyOwnerId}`);
    }
  } else {
    // No webhooks configured — send email notification
    console.log(`[Webhook] No active webhooks for user ${propertyOwnerId}, sending email`);
    await sendLeadNotificationEmail(propertyOwnerId, payload);
  }
}

/**
 * Dispatch a lead directly to the CRM API for properties that belong
 * to a CRM tenant. This is a system-level integration, not user-configured.
 */
export async function dispatchLeadToCRM(payload: WebhookPayload): Promise<void> {
  if (!UBIKALA_WEBHOOK_SECRET) {
    console.warn('[CRM Lead] UBIKALA_WEBHOOK_SECRET not configured, skipping CRM dispatch');
    return;
  }

  try {
    const response = await fetch(`${CRM_API_URL}/api/webhooks/ubikala/lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-ubikala-secret': UBIKALA_WEBHOOK_SECRET,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`[CRM Lead] Error ${response.status}: ${text}`);
    } else {
      console.log(`[CRM Lead] Lead ${payload.data.lead_id} dispatched to CRM → OK`);
    }
  } catch (error: any) {
    console.error(`[CRM Lead] Failed to dispatch lead ${payload.data.lead_id}:`, error.message);
  }
}
