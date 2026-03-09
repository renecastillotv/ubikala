import { getCitiesWithCounts } from './meilisearch';

/**
 * Normalize any string to a URL-safe slug.
 * "Santo Domingo D.N." → "santo-domingo-d-n"
 * "Punta Cana" → "punta-cana"
 */
export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^a-z0-9]+/g, '-')     // non-alphanumeric → hyphen
    .replace(/^-+|-+$/g, '');         // trim
}

// In-memory cache (per-process, refreshed every 10 min)
let _cache: Map<string, string> | null = null; // slug → name
let _reverseCache: Map<string, string> | null = null; // name → slug
let _cacheTime = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

/**
 * Build or return the slug↔name maps from MeiliSearch facets.
 * Source of truth: actual ciudad values in the propiedades index.
 */
async function ensureCache(pais?: string): Promise<void> {
  if (_cache && Date.now() - _cacheTime < CACHE_TTL) return;

  const cities = await getCitiesWithCounts(pais);
  _cache = new Map();
  _reverseCache = new Map();

  for (const city of cities) {
    const slug = toSlug(city.name);
    _cache.set(slug, city.name);
    _reverseCache.set(city.name, slug);
  }
  _cacheTime = Date.now();
}

/**
 * Resolve a URL slug to the real city name from MeiliSearch.
 * Falls back to title-casing the slug if not found.
 *
 * "santo-domingo-d-n" → "Santo Domingo D.N."
 * "punta-cana" → "Punta Cana"
 */
export async function slugToName(slug: string, pais?: string): Promise<string> {
  await ensureCache(pais);
  return _cache?.get(slug)
    || _cache?.get(slug.replace(/\./g, '-'))  // handle legacy slugs with dots
    || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // fallback
}

/**
 * Convert a city name to its canonical slug.
 * "Santo Domingo D.N." → "santo-domingo-d-n"
 */
export function nameToSlug(name: string): string {
  return toSlug(name);
}

/**
 * Get all cached cities as {slug, name} pairs.
 * Useful for populating dropdowns.
 */
export async function getAllCities(pais?: string): Promise<Array<{ slug: string; name: string }>> {
  await ensureCache(pais);
  const result: Array<{ slug: string; name: string }> = [];
  if (_cache) {
    for (const [slug, name] of _cache) {
      result.push({ slug, name });
    }
  }
  return result;
}
