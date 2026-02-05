// Site configuration fetched from API
// Cached for performance during SSR

export interface SiteConfig {
  // Company
  company_name: string;
  company_slogan: string;
  logo_url: string;
  favicon_url: string;

  // Contact
  email: string;
  phone: string;
  phone_display: string;
  whatsapp: string;
  business_hours: string;

  // Location
  address_street: string;
  address_city: string;
  address_country: string;
  address_country_code: string;
  geo_latitude: string;
  geo_longitude: string;

  // Social Media
  social_facebook: string;
  social_instagram: string;
  social_linkedin: string;
  social_youtube: string;
  social_twitter: string;
  social_tiktok: string;

  // SEO
  site_url: string;
  og_image: string;
  meta_title: string;
  meta_description: string;

  // API Config
  analytics_api: string;
  lead_source: string;
}

// Default values (fallback if API is unavailable)
const defaultConfig: SiteConfig = {
  company_name: 'Ubikala',
  company_slogan: 'Esa propiedad que buscas, ubíkala aquí',
  logo_url: '/logo.png',
  favicon_url: '/favicon.ico',

  email: 'info@ubikala.com',
  phone: '+18095550000',
  phone_display: '+1 809-555-0000',
  whatsapp: '18095550000',
  business_hours: 'Lun-Vie 9am-6pm',

  address_street: '',
  address_city: 'Santo Domingo',
  address_country: 'República Dominicana',
  address_country_code: 'DO',
  geo_latitude: '18.7357',
  geo_longitude: '-70.1627',

  social_facebook: 'https://facebook.com/ubikala',
  social_instagram: 'https://instagram.com/ubikala',
  social_linkedin: 'https://linkedin.com/company/ubikala',
  social_youtube: '',
  social_twitter: '',
  social_tiktok: '',

  site_url: 'https://ubikala.com',
  og_image: 'https://ubikala.com/og-image.jpg',
  meta_title: 'Ubikala - Esa propiedad que buscas, ubíkala aquí',
  meta_description: 'Encuentra casas, apartamentos y terrenos en venta y alquiler. Esa propiedad que buscas, ubíkala aquí.',

  analytics_api: 'http://5.161.98.140:3002',
  lead_source: 'ubikala'
};

// Cache for config (5 minute TTL)
let cachedConfig: SiteConfig | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const API_BASE = import.meta.env.PUBLIC_ANALYTICS_API || 'http://5.161.98.140:3002';

/**
 * Fetch site configuration from API with caching
 * TEMPORARILY: Using local defaults for Ubikala rebranding
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  // TEMPORARY: Always use local Ubikala config until API is updated
  return defaultConfig;

  /*
  const now = Date.now();

  // Return cached config if still valid
  if (cachedConfig && (now - cacheTimestamp) < CACHE_TTL) {
    return cachedConfig;
  }

  try {
    const response = await fetch(`${API_BASE}/api/config`, {
      headers: { 'Accept': 'application/json' },
      // Short timeout to not slow down SSR
      signal: AbortSignal.timeout(3000)
    });

    if (!response.ok) {
      throw new Error(`Config API returned ${response.status}`);
    }

    const data = await response.json();

    // Merge with defaults to ensure all keys exist
    cachedConfig = { ...defaultConfig, ...data.config };
    cacheTimestamp = now;

    return cachedConfig;
  } catch (error) {
    console.warn('Failed to fetch site config, using defaults:', error);
    // Return defaults if API fails
    return defaultConfig;
  }
  */
}

/**
 * Get config synchronously (uses cache or defaults)
 * Use this when you need config immediately without async
 */
export function getSiteConfigSync(): SiteConfig {
  return cachedConfig || defaultConfig;
}

/**
 * Invalidate the config cache (call after updates)
 */
export function invalidateConfigCache(): void {
  cachedConfig = null;
  cacheTimestamp = 0;
}

/**
 * Get specific config value
 */
export async function getConfigValue<K extends keyof SiteConfig>(key: K): Promise<SiteConfig[K]> {
  const config = await getSiteConfig();
  return config[key];
}

/**
 * Get social media links that are configured (non-empty)
 */
export async function getSocialLinks(): Promise<Array<{ platform: string; url: string; icon: string }>> {
  const config = await getSiteConfig();

  const socialPlatforms = [
    { key: 'social_facebook', platform: 'Facebook', icon: 'facebook' },
    { key: 'social_instagram', platform: 'Instagram', icon: 'instagram' },
    { key: 'social_linkedin', platform: 'LinkedIn', icon: 'linkedin' },
    { key: 'social_youtube', platform: 'YouTube', icon: 'youtube' },
    { key: 'social_twitter', platform: 'Twitter', icon: 'twitter' },
    { key: 'social_tiktok', platform: 'TikTok', icon: 'tiktok' }
  ] as const;

  return socialPlatforms
    .filter(s => config[s.key as keyof SiteConfig])
    .map(s => ({
      platform: s.platform,
      url: config[s.key as keyof SiteConfig] as string,
      icon: s.icon
    }));
}

/**
 * Get WhatsApp URL with optional message
 */
export async function getWhatsAppUrl(message?: string): Promise<string> {
  const config = await getSiteConfig();
  const baseUrl = `https://wa.me/${config.whatsapp}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
}

/**
 * Get formatted contact info
 */
export async function getContactInfo(): Promise<{
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappUrl: string;
  businessHours: string;
  address: string;
}> {
  const config = await getSiteConfig();

  const addressParts = [
    config.address_street,
    config.address_city,
    config.address_country
  ].filter(Boolean);

  return {
    email: config.email,
    phone: config.phone,
    phoneDisplay: config.phone_display,
    whatsapp: config.whatsapp,
    whatsappUrl: `https://wa.me/${config.whatsapp}`,
    businessHours: config.business_hours,
    address: addressParts.join(', ')
  };
}

export { defaultConfig };
