// Multi-country configuration via subdomain detection
// Subdomains: pa.ubikala.com → Panama, mx.ubikala.com → Mexico, etc.
// Default (ubikala.com / no subdomain) → Dominican Republic

export interface CountryConfig {
  code: string;           // ISO 3166-1 alpha-2 (DO, PA, MX, CO, etc.)
  name: string;           // Full name in Spanish
  currency: string;       // Primary currency code (DOP, USD, MXN, etc.)
  currencySymbol: string; // $ or RD$ etc.
  phonePrefix: string;    // +1-809, +507, +52, etc.
  phonePlaceholder: string;
  subdomain: string;      // '' for default (DR), 'pa', 'mx', etc.
  flag: string;           // Emoji flag
  timezone: string;
  coordinates: { lat: number; lng: number }; // Default map center
}

// Supported countries mapped by subdomain
const countries: Record<string, CountryConfig> = {
  '': {
    code: 'DO',
    name: 'República Dominicana',
    currency: 'DOP',
    currencySymbol: 'RD$',
    phonePrefix: '+1-809',
    phonePlaceholder: '809-555-1234',
    subdomain: '',
    flag: '🇩🇴',
    timezone: 'America/Santo_Domingo',
    coordinates: { lat: 18.7357, lng: -70.1627 },
  },
  pa: {
    code: 'PA',
    name: 'Panamá',
    currency: 'USD',
    currencySymbol: '$',
    phonePrefix: '+507',
    phonePlaceholder: '6000-0000',
    subdomain: 'pa',
    flag: '🇵🇦',
    timezone: 'America/Panama',
    coordinates: { lat: 8.9824, lng: -79.5199 },
  },
  mx: {
    code: 'MX',
    name: 'México',
    currency: 'MXN',
    currencySymbol: '$',
    phonePrefix: '+52',
    phonePlaceholder: '55-1234-5678',
    subdomain: 'mx',
    flag: '🇲🇽',
    timezone: 'America/Mexico_City',
    coordinates: { lat: 19.4326, lng: -99.1332 },
  },
  co: {
    code: 'CO',
    name: 'Colombia',
    currency: 'COP',
    currencySymbol: '$',
    phonePrefix: '+57',
    phonePlaceholder: '300-123-4567',
    subdomain: 'co',
    flag: '🇨🇴',
    timezone: 'America/Bogota',
    coordinates: { lat: 4.7110, lng: -74.0721 },
  },
  cr: {
    code: 'CR',
    name: 'Costa Rica',
    currency: 'CRC',
    currencySymbol: '₡',
    phonePrefix: '+506',
    phonePlaceholder: '8000-0000',
    subdomain: 'cr',
    flag: '🇨🇷',
    timezone: 'America/Costa_Rica',
    coordinates: { lat: 9.9281, lng: -84.0907 },
  },
  pr: {
    code: 'PR',
    name: 'Puerto Rico',
    currency: 'USD',
    currencySymbol: '$',
    phonePrefix: '+1-787',
    phonePlaceholder: '787-555-1234',
    subdomain: 'pr',
    flag: '🇵🇷',
    timezone: 'America/Puerto_Rico',
    coordinates: { lat: 18.4655, lng: -66.1057 },
  },
};

// Default country (Dominican Republic)
export const DEFAULT_COUNTRY = countries[''];

/**
 * Detect country from hostname subdomain.
 * Examples:
 *   pa.ubikala.com → PA (Panama)
 *   mx.ubikala.com → MX (Mexico)
 *   ubikala.com    → DO (Dominican Republic)
 *   localhost:4321  → DO (default)
 */
export function detectCountryFromHostname(hostname: string): CountryConfig {
  // Remove port if present
  const host = hostname.split(':')[0];

  // Check for subdomain pattern: {cc}.ubikala.com
  const parts = host.split('.');

  // Need at least 3 parts for a subdomain (e.g., pa.ubikala.com)
  if (parts.length >= 3) {
    const subdomain = parts[0].toLowerCase();
    if (countries[subdomain]) {
      return countries[subdomain];
    }
  }

  // Default to DR
  return DEFAULT_COUNTRY;
}

/**
 * Get country config by ISO code (for DB queries, etc.)
 */
export function getCountryByCode(code: string): CountryConfig | undefined {
  return Object.values(countries).find(c => c.code === code.toUpperCase());
}

/**
 * Get all supported countries
 */
export function getSupportedCountries(): CountryConfig[] {
  return Object.values(countries);
}

/**
 * Check if a country code is supported
 */
export function isCountrySupported(code: string): boolean {
  return Object.values(countries).some(c => c.code === code.toUpperCase());
}
