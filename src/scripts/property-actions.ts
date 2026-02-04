// Property Actions - Favorites, Share, Analytics
// This script runs on the client side

interface PropertyData {
  slug: string;
  title: string;
  image: string;
  price: number;
  currency: string;
  location: string;
}

// ============ FAVORITES ============
const FAVORITES_KEY = 'propiedadenrd_favorites';

interface FavoriteProperty extends PropertyData {
  addedAt: string;
}

function getFavorites(): FavoriteProperty[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites: FavoriteProperty[]): void {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  // Also save to cookie for SSR on favorites page
  const slugs = favorites.map(f => f.slug);
  document.cookie = `favorites=${JSON.stringify(slugs)};path=/;max-age=31536000`;
  updateFavoritesUI();
  updateFavoritesCount();
  // Dispatch event for favorites page
  window.dispatchEvent(new CustomEvent('favorites-updated'));
}

function toggleFavorite(property: PropertyData): boolean {
  const favorites = getFavorites();
  const index = favorites.findIndex(f => f.slug === property.slug);

  if (index >= 0) {
    // Remove from favorites
    favorites.splice(index, 1);
    saveFavorites(favorites);
    showToast('Eliminado de favoritos');
    return false;
  } else {
    // Add to favorites
    favorites.push({
      ...property,
      addedAt: new Date().toISOString()
    });
    saveFavorites(favorites);
    showToast('Agregado a favoritos');
    trackEvent('favorite_added', { slug: property.slug });
    return true;
  }
}

function isFavorite(slug: string): boolean {
  return getFavorites().some(f => f.slug === slug);
}

function updateFavoritesUI(): void {
  // Update all favorite buttons on the page
  document.querySelectorAll('[data-favorite-btn]').forEach(btn => {
    const slug = btn.getAttribute('data-property-slug');
    if (slug) {
      const isFav = isFavorite(slug);
      btn.classList.toggle('is-favorite', isFav);
      const icon = btn.querySelector('svg');
      if (icon) {
        // Set fill for heart icon when favorited
        icon.setAttribute('fill', isFav ? 'currentColor' : 'none');
      }
    }
  });
}

function updateFavoritesCount(): void {
  const count = getFavorites().length;
  document.querySelectorAll('[data-favorites-count]').forEach(el => {
    el.textContent = count.toString();
    el.classList.toggle('hidden', count === 0);
  });
}

// ============ SHARE ============
interface ShareData {
  title: string;
  text: string;
  url: string;
}

async function shareProperty(data: ShareData): Promise<void> {
  // Track share attempt
  trackEvent('share_initiated', { url: data.url });

  // Try native share API first
  if (navigator.share) {
    try {
      await navigator.share(data);
      trackEvent('share_completed', { method: 'native', url: data.url });
      return;
    } catch (err) {
      // User cancelled or error - fall through to fallback
      if ((err as Error).name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    }
  }

  // Fallback: Show share modal
  showShareModal(data);
}

function showShareModal(data: ShareData): void {
  const modal = document.getElementById('share-modal');
  if (!modal) {
    createShareModal(data);
    return;
  }

  // Update modal content
  const urlInput = modal.querySelector<HTMLInputElement>('[data-share-url]');
  if (urlInput) urlInput.value = data.url;

  // Update share links
  updateShareLinks(modal, data);

  modal.classList.remove('hidden');
}

function createShareModal(data: ShareData): void {
  const modal = document.createElement('div');
  modal.id = 'share-modal';
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50';
  modal.innerHTML = `
    <div class="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Compartir propiedad</h3>
        <button data-close-modal class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="grid grid-cols-4 gap-4 mb-6">
        <a href="#" data-share-whatsapp class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100">
          <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <span class="text-xs text-gray-600">WhatsApp</span>
        </a>

        <a href="#" data-share-facebook class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100">
          <div class="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mb-2">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>
          <span class="text-xs text-gray-600">Facebook</span>
        </a>

        <a href="#" data-share-twitter class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100">
          <div class="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-2">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </div>
          <span class="text-xs text-gray-600">X</span>
        </a>

        <a href="#" data-share-email class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100">
          <div class="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mb-2">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <span class="text-xs text-gray-600">Email</span>
        </a>
      </div>

      <div class="flex items-center gap-2">
        <input type="text" data-share-url readonly value="${data.url}"
          class="flex-1 px-3 py-2 border rounded-lg text-sm bg-gray-50 text-gray-600">
        <button data-copy-url class="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700">
          Copiar
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  updateShareLinks(modal, data);

  // Close button
  modal.querySelector('[data-close-modal]')?.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  // Copy URL button
  modal.querySelector('[data-copy-url]')?.addEventListener('click', () => {
    const input = modal.querySelector<HTMLInputElement>('[data-share-url]');
    if (input) {
      navigator.clipboard.writeText(input.value);
      showToast('Enlace copiado');
      trackEvent('share_completed', { method: 'copy', url: data.url });
    }
  });
}

function updateShareLinks(modal: Element, data: ShareData): void {
  const encodedUrl = encodeURIComponent(data.url);
  const encodedText = encodeURIComponent(data.text);
  const encodedTitle = encodeURIComponent(data.title);

  const whatsapp = modal.querySelector<HTMLAnchorElement>('[data-share-whatsapp]');
  if (whatsapp) {
    whatsapp.href = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
    whatsapp.target = '_blank';
    whatsapp.addEventListener('click', () => {
      trackEvent('share_completed', { method: 'whatsapp', url: data.url });
    });
  }

  const facebook = modal.querySelector<HTMLAnchorElement>('[data-share-facebook]');
  if (facebook) {
    facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    facebook.target = '_blank';
    facebook.addEventListener('click', () => {
      trackEvent('share_completed', { method: 'facebook', url: data.url });
    });
  }

  const twitter = modal.querySelector<HTMLAnchorElement>('[data-share-twitter]');
  if (twitter) {
    twitter.href = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    twitter.target = '_blank';
    twitter.addEventListener('click', () => {
      trackEvent('share_completed', { method: 'twitter', url: data.url });
    });
  }

  const email = modal.querySelector<HTMLAnchorElement>('[data-share-email]');
  if (email) {
    email.href = `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`;
    email.addEventListener('click', () => {
      trackEvent('share_completed', { method: 'email', url: data.url });
    });
  }
}

// ============ ANALYTICS ============
const ANALYTICS_KEY = 'propiedadenrd_analytics';
const ANALYTICS_QUEUE_KEY = 'propiedadenrd_analytics_queue';

interface AnalyticsEvent {
  event: string;
  properties: Record<string, unknown>;
  timestamp: string;
  sessionId: string;
  url: string;
}

function getSessionId(): string {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}

function trackEvent(event: string, properties: Record<string, unknown> = {}): void {
  const eventData: AnalyticsEvent = {
    event,
    properties,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
    url: window.location.href
  };

  // Store in queue for later sync
  const queue = getAnalyticsQueue();
  queue.push(eventData);
  localStorage.setItem(ANALYTICS_QUEUE_KEY, JSON.stringify(queue));

  // Try to sync immediately if API is available
  syncAnalytics();

  // Console log for development
  if (import.meta.env.DEV) {
    console.log('📊 Analytics:', event, properties);
  }
}

function getAnalyticsQueue(): AnalyticsEvent[] {
  try {
    const stored = localStorage.getItem(ANALYTICS_QUEUE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

async function syncAnalytics(): Promise<void> {
  // Use the Analytics API endpoint (deployed to Hetzner VPS)
  const apiBase = import.meta.env.PUBLIC_ANALYTICS_API;
  if (!apiBase) return; // Skip if not configured

  const queue = getAnalyticsQueue();
  if (queue.length === 0) return;

  try {
    // Transform queue to the expected format
    const events = queue.map(e => ({
      event_type: e.event,
      properties: e.properties,
      session_id: e.sessionId,
      url: e.url
    }));

    const response = await fetch(`${apiBase}/api/analytics/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events })
    });

    if (response.ok) {
      localStorage.removeItem(ANALYTICS_QUEUE_KEY);
    }
  } catch {
    // Will retry later
  }
}

// Track page views
function trackPageView(): void {
  trackEvent('page_view', {
    path: window.location.pathname,
    referrer: document.referrer,
    title: document.title
  });
}

// Track property views
function trackPropertyView(slug: string, title: string): void {
  trackEvent('property_view', { slug, title });
}

// Track WhatsApp clicks
function trackWhatsAppClick(slug: string, agentName: string): void {
  trackEvent('whatsapp_click', { slug, agentName });
}

// Track phone calls
function trackPhoneCall(slug: string, agentName: string): void {
  trackEvent('phone_call', { slug, agentName });
}

// Track search
function trackSearch(filters: Record<string, unknown>): void {
  trackEvent('search', filters);
}

// ============ TOAST NOTIFICATIONS ============
function showToast(message: string, duration = 3000): void {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in';
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('animate-fade-out');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ============ INITIALIZATION ============
function init(): void {
  // Initialize favorites UI
  updateFavoritesUI();
  updateFavoritesCount();

  // Track page view
  trackPageView();

  // Add event listeners for favorite buttons
  document.querySelectorAll('[data-favorite-btn]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const slug = btn.getAttribute('data-property-slug');
      const title = btn.getAttribute('data-property-title') || '';
      const image = btn.getAttribute('data-property-image') || '';
      const price = parseFloat(btn.getAttribute('data-property-price') || '0');
      const currency = btn.getAttribute('data-property-currency') || 'USD';
      const location = btn.getAttribute('data-property-location') || '';

      if (slug) {
        toggleFavorite({ slug, title, image, price, currency, location });
      }
    });
  });

  // Add event listeners for share buttons
  document.querySelectorAll('[data-share-btn]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const title = btn.getAttribute('data-share-title') || document.title;
      const text = btn.getAttribute('data-share-text') || '';
      const url = btn.getAttribute('data-share-url') || window.location.href;

      shareProperty({ title, text, url });
    });
  });

  // Add event listeners for WhatsApp buttons
  document.querySelectorAll('[data-whatsapp-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const slug = btn.getAttribute('data-property-slug') || '';
      const agentName = btn.getAttribute('data-agent-name') || '';
      trackWhatsAppClick(slug, agentName);
    });
  });

  // Add event listeners for phone buttons
  document.querySelectorAll('[data-phone-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const slug = btn.getAttribute('data-property-slug') || '';
      const agentName = btn.getAttribute('data-agent-name') || '';
      trackPhoneCall(slug, agentName);
    });
  });

  // Sync analytics periodically
  setInterval(syncAnalytics, 30000);

  // Sync analytics before page unload
  window.addEventListener('beforeunload', syncAnalytics);
}

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for use in other scripts
export {
  toggleFavorite,
  isFavorite,
  getFavorites,
  shareProperty,
  trackEvent,
  trackPropertyView,
  trackWhatsAppClick,
  trackPhoneCall,
  trackSearch,
  showToast
};

// Expose to window for inline scripts
(window as any).trackEvent = trackEvent;
(window as any).trackPropertyView = trackPropertyView;
(window as any).trackWhatsAppClick = trackWhatsAppClick;
(window as any).trackSearch = trackSearch;
(window as any).showToast = showToast;
