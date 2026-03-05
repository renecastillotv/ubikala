import type { APIRoute } from 'astro';
import { createLead, getUbikalaPropertyBySlug } from '../../lib/ubikala-db';
import { getMeiliPropertyDocBySlug } from '../../lib/meilisearch';
import { dispatchLeadWebhooks } from '../../lib/webhook-dispatcher';

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

    // Dispatch webhooks or email notification (fire-and-forget)
    if (property_slug) {
      (async () => {
        try {
          // Try Ubikala-native property first (has created_by → owner)
          const ubikalaProp = await getUbikalaPropertyBySlug(property_slug);
          let ownerId = ubikalaProp?.created_by || null;
          let tenantId: string | null = null;

          if (!ownerId) {
            // Not an Ubikala-native property — check MeiliSearch for CRM property
            const meiliDoc = await getMeiliPropertyDocBySlug(property_slug);
            tenantId = meiliDoc?.tenant_id || null;
            // CRM properties don't have an Ubikala user owner.
            // The CRM tenant must configure a webhook in their Ubikala account.
            if (tenantId && tenantId !== 'ubikala') {
              console.log(`[Lead Dispatch] CRM property (tenant: ${tenantId}), no Ubikala owner found`);
            }
          }

          if (ownerId) {
            await dispatchLeadWebhooks(ownerId, {
              event: 'lead.new',
              timestamp: new Date().toISOString(),
              data: {
                lead_id: lead.id,
                property: {
                  slug: property_slug,
                  title: property_title || ubikalaProp?.titulo || '',
                  tenant_id: tenantId,
                },
                contact: {
                  name: name || '',
                  email: email || '',
                  phone: phone || '',
                  message: message || '',
                },
                source: 'ubikala',
                agent: {
                  name: agent_name || '',
                  company: agent_company || null,
                },
              },
            });
          }
        } catch (err: any) {
          console.error('[Lead Dispatch] Error:', err.message);
        }
      })();
    }

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
