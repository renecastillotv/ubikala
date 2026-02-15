/**
 * CRM API Sync Utility
 *
 * Fire-and-forget webhook calls to the CRM API when properties are
 * created, updated, or deleted in Ubikala. The CRM API handles
 * translation and MeiliSearch sync.
 */

const CRM_API_URL = import.meta.env.CRM_API_URL || process.env.CRM_API_URL || 'https://api.denlla.com';
const UBIKALA_WEBHOOK_SECRET = import.meta.env.UBIKALA_WEBHOOK_SECRET || process.env.UBIKALA_WEBHOOK_SECRET;

export async function syncPropertyToCRM(
  propertyId: string,
  action: 'create' | 'update' | 'delete'
): Promise<void> {
  if (!UBIKALA_WEBHOOK_SECRET) {
    console.warn('[CRM Sync] UBIKALA_WEBHOOK_SECRET not configured, skipping sync');
    return;
  }

  try {
    const response = await fetch(`${CRM_API_URL}/api/webhooks/ubikala/property-sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-ubikala-secret': UBIKALA_WEBHOOK_SECRET,
      },
      body: JSON.stringify({ action, property_id: propertyId }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`[CRM Sync] Error ${response.status} for ${action} ${propertyId}: ${text}`);
    } else {
      console.log(`[CRM Sync] ${action} ${propertyId} → OK`);
    }
  } catch (error: any) {
    console.error(`[CRM Sync] Failed to ${action} property ${propertyId}:`, error.message);
  }
}
