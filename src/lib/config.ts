// Site configuration - reads from ubikala_site_config DB table
// Falls back to defaults if no DB record exists

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

// Cache for config per country (5 minute TTL)
const configCache: Record<string, { config: SiteConfig; timestamp: number }> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Get site configuration for a country.
 * Reads from ubikala_site_config DB table, falls back to defaults.
 * @param countryCode - ISO country code (default: 'DO')
 */
export async function getSiteConfig(countryCode: string = 'DO'): Promise<SiteConfig> {
  const cc = countryCode.toUpperCase();

  // Return cached config if still valid
  const cached = configCache[cc];
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.config;
  }

  try {
    const { getSiteConfigByCountry } = await import('./ubikala-db');
    const dbConfig = await getSiteConfigByCountry(cc);

    if (dbConfig) {
      // Merge DB values with defaults (DB values override)
      const merged: SiteConfig = {
        ...defaultConfig,
        company_name: dbConfig.company_name || defaultConfig.company_name,
        company_slogan: dbConfig.company_slogan || defaultConfig.company_slogan,
        logo_url: dbConfig.logo_url || defaultConfig.logo_url,
        favicon_url: dbConfig.favicon_url || defaultConfig.favicon_url,
        email: dbConfig.email || defaultConfig.email,
        phone: dbConfig.phone || defaultConfig.phone,
        phone_display: dbConfig.phone_display || defaultConfig.phone_display,
        whatsapp: dbConfig.whatsapp || defaultConfig.whatsapp,
        business_hours: dbConfig.business_hours || defaultConfig.business_hours,
        address_street: dbConfig.address_street || defaultConfig.address_street,
        address_city: dbConfig.address_city || defaultConfig.address_city,
        address_country: dbConfig.address_country || defaultConfig.address_country,
        address_country_code: cc,
        geo_latitude: dbConfig.geo_latitude || defaultConfig.geo_latitude,
        geo_longitude: dbConfig.geo_longitude || defaultConfig.geo_longitude,
        social_facebook: dbConfig.social_facebook || defaultConfig.social_facebook,
        social_instagram: dbConfig.social_instagram || defaultConfig.social_instagram,
        social_linkedin: dbConfig.social_linkedin || defaultConfig.social_linkedin,
        social_youtube: dbConfig.social_youtube || defaultConfig.social_youtube,
        social_twitter: dbConfig.social_twitter || defaultConfig.social_twitter,
        social_tiktok: dbConfig.social_tiktok || defaultConfig.social_tiktok,
        site_url: dbConfig.domain ? `https://${dbConfig.domain}` : defaultConfig.site_url,
        og_image: dbConfig.og_image || defaultConfig.og_image,
        meta_title: dbConfig.meta_title || defaultConfig.meta_title,
        meta_description: dbConfig.meta_description || defaultConfig.meta_description,
      };

      configCache[cc] = { config: merged, timestamp: Date.now() };
      return merged;
    }
  } catch (error) {
    console.warn('[getSiteConfig] Failed to read from DB, using defaults:', error);
  }

  return defaultConfig;
}

/**
 * Get config synchronously (uses cache or defaults)
 */
export function getSiteConfigSync(countryCode: string = 'DO'): SiteConfig {
  const cached = configCache[countryCode.toUpperCase()];
  return cached?.config || defaultConfig;
}

/**
 * Invalidate the config cache (call after updates)
 */
export function invalidateConfigCache(countryCode?: string): void {
  if (countryCode) {
    delete configCache[countryCode.toUpperCase()];
  } else {
    Object.keys(configCache).forEach(k => delete configCache[k]);
  }
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
