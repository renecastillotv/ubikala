// Multi-country configuration via subdomain detection
// Reads from ubikala_paises table, falls back to hardcoded defaults

import type { CountryRecord } from './ubikala-db';

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
  domain?: string;        // Full domain for this country
  isActive: boolean;      // Whether this country is live (false = coming soon)
}

// Hardcoded fallback (only used when DB is unavailable)
const FALLBACK_COUNTRY: CountryConfig = {
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
  domain: 'ubikala.com',
  isActive: true,
};

// Cache for countries from DB (5 minute TTL)
let countriesCache: CountryConfig[] | null = null;
let countriesCacheTimestamp = 0;
const COUNTRIES_CACHE_TTL = 5 * 60 * 1000;

/** Convert a DB CountryRecord to the CountryConfig interface */
function recordToConfig(r: CountryRecord): CountryConfig {
  return {
    code: r.code,
    name: r.name,
    currency: r.currency,
    currencySymbol: r.currency_symbol,
    phonePrefix: r.phone_prefix,
    phonePlaceholder: r.phone_placeholder,
    subdomain: r.subdomain,
    flag: r.flag,
    timezone: r.timezone,
    coordinates: { lat: Number(r.lat), lng: Number(r.lng) },
    domain: r.domain,
    isActive: r.is_active,
  };
}

/** Load countries from DB, cache for 5 min, fallback to hardcoded */
async function loadCountriesFromDb(): Promise<CountryConfig[]> {
  if (countriesCache && Date.now() - countriesCacheTimestamp < COUNTRIES_CACHE_TTL) {
    return countriesCache;
  }

  try {
    // Dynamic import to avoid circular dependency
    const { getAllCountries } = await import('./ubikala-db');
    const dbCountries = await getAllCountries();

    if (dbCountries.length > 0) {
      countriesCache = dbCountries.map(recordToConfig);
      countriesCacheTimestamp = Date.now();
      return countriesCache;
    }
  } catch (error) {
    console.warn('[country-config] Failed to load from DB, using fallback:', error);
  }

  // Return fallback
  return [FALLBACK_COUNTRY];
}

// Default country (Dominican Republic)
export const DEFAULT_COUNTRY = FALLBACK_COUNTRY;

/**
 * Detect country from hostname subdomain.
 * Returns the matched country (active or inactive), DEFAULT_COUNTRY for base domain/www,
 * or null for unknown subdomains (should show 404).
 */
export async function detectCountryFromHostnameAsync(hostname: string): Promise<CountryConfig | null> {
  const host = hostname.split(':')[0];
  const parts = host.split('.');

  if (parts.length >= 3) {
    const subdomain = parts[0].toLowerCase();

    // www is not a country subdomain
    if (subdomain === 'www') return DEFAULT_COUNTRY;

    const countries = await loadCountriesFromDb();
    const match = countries.find(c => c.subdomain === subdomain);
    if (match) return match;

    // Unknown subdomain — not a registered country
    return null;
  }

  return DEFAULT_COUNTRY;
}

/**
 * Synchronous detection (uses cache or fallback).
 * Used in middleware where async is already handled.
 */
export function detectCountryFromHostname(hostname: string): CountryConfig {
  const host = hostname.split(':')[0];
  const parts = host.split('.');

  if (parts.length >= 3 && countriesCache) {
    const subdomain = parts[0].toLowerCase();
    const match = countriesCache.find(c => c.subdomain === subdomain);
    if (match) return match;
  }

  return DEFAULT_COUNTRY;
}

/**
 * Get country config by ISO code
 */
export async function getCountryByCodeConfig(code: string): Promise<CountryConfig | undefined> {
  const countries = await loadCountriesFromDb();
  return countries.find(c => c.code === code.toUpperCase());
}

/**
 * Get all supported countries (active only, from DB)
 */
export async function getSupportedCountries(): Promise<CountryConfig[]> {
  const countries = await loadCountriesFromDb();
  return countries.filter(c => c.isActive);
}

/**
 * Get ALL countries including inactive (for admin pages)
 */
export async function getAllCountriesConfig(): Promise<CountryConfig[]> {
  return loadCountriesFromDb();
}

/**
 * Synchronous version for when cache is already warm
 */
export function getSupportedCountriesSync(): CountryConfig[] {
  return countriesCache || [FALLBACK_COUNTRY];
}

/**
 * Check if a country code is supported
 */
export async function isCountrySupported(code: string): Promise<boolean> {
  const countries = await loadCountriesFromDb();
  return countries.some(c => c.code === code.toUpperCase());
}

/**
 * Invalidate the countries cache (call after updates)
 */
export function invalidateCountriesCache(): void {
  countriesCache = null;
  countriesCacheTimestamp = 0;
}
