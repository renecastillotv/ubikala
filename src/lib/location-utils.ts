import { getCitiesWithCounts, resolveCityFromText, getSectorsWithCounts, resolveSectorFromText } from './meilisearch';
import { toSlug } from './slug-utils';

// Re-export toSlug for backward compatibility
export { toSlug } from './slug-utils';

// In-memory cache (per-process, refreshed every 10 min)
let _cache: Map<string, string> | null = null; // slug → name
let _reverseCache: Map<string, string> | null = null; // name → slug
let _cachePais: string | undefined;
let _cacheTime = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// Secondary cache for dynamic resolutions (slug → resolved city names)
// Persists alongside main cache to avoid re-querying MeiliSearch
const _resolvedCache = new Map<string, string[]>();

/**
 * Build or return the slug↔name maps from MeiliSearch facets.
 * Source of truth: actual ciudad values in the propiedades index.
 */
async function ensureCache(pais?: string): Promise<void> {
  if (_cache && _cachePais === pais && Date.now() - _cacheTime < CACHE_TTL) return;

  const cities = await getCitiesWithCounts(pais);
  _cache = new Map();
  _reverseCache = new Map();
  _resolvedCache.clear();
  _cachePais = pais;

  for (const city of cities) {
    const slug = toSlug(city.name);
    _cache.set(slug, city.name);
    _reverseCache.set(city.name, slug);
  }
  _cacheTime = Date.now();
}

/**
 * Resolve a URL slug to the real city name from MeiliSearch.
 *
 * Resolution order:
 * 1. Exact match in slug cache (built from MeiliSearch facets)
 * 2. Dynamic fallback: text search MeiliSearch with slug as query,
 *    picks the city with most results. Works for any country automatically
 *    (e.g. "distrito-nacional" → matches provincia "Distrito Nacional" →
 *    top city facet is "Santo Domingo D.N." with 106 properties)
 * 3. Last resort: title-case the slug
 */
export async function slugToName(slug: string, pais?: string): Promise<string> {
  await ensureCache(pais);

  // 1. Direct match
  const direct = _cache?.get(slug);
  if (direct) return direct;

  // 2. Dynamic resolution via MeiliSearch text search
  if (!_resolvedCache.has(slug)) {
    const resolved = await resolveCityFromText(slug, pais);
    _resolvedCache.set(slug, resolved);
  }

  const resolved = _resolvedCache.get(slug);
  if (resolved && resolved.length > 0) {
    return resolved[0]; // Return city with most results
  }

  // 3. Fallback: title-case the slug
  return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Resolve a URL slug to ALL equivalent city names for MeiliSearch filtering.
 *
 * For slugs that match directly (e.g. "santo-domingo-d-n"), returns just that city.
 * For slugs resolved via text search (e.g. "distrito-nacional"), returns ALL cities
 * that MeiliSearch found relevant, enabling OR filtering across equivalent names.
 *
 * This handles multi-country automatically — no static alias maps needed.
 */
export async function slugToCityNames(slug: string, pais?: string): Promise<string[]> {
  await ensureCache(pais);

  // Direct match — single city
  const direct = _cache?.get(slug);
  if (direct) return [direct];

  // Dynamic resolution — may return multiple equivalent cities
  if (!_resolvedCache.has(slug)) {
    const resolved = await resolveCityFromText(slug, pais);
    _resolvedCache.set(slug, resolved);
  }

  const resolved = _resolvedCache.get(slug);
  if (resolved && resolved.length > 0) {
    // The slug text matched these cities. Include the top result always,
    // plus any others whose name contains a word from the slug
    // (filters out noise like "Samaná" matching "distrito nacional")
    const slugWords = slug.split('-').filter(w => w.length > 2);
    const primary = resolved[0];
    const related = resolved.slice(1).filter(name => {
      const nameLower = name.toLowerCase();
      return slugWords.some(w => nameLower.includes(w));
    });
    return [primary, ...related].slice(0, 5);
  }

  // Fallback
  const titleCased = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return [titleCased];
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

// ============================================================================
// SECTOR SLUG RESOLUTION
// ============================================================================

// Sector cache: keyed by "citySlug" → Map<sectorSlug, sectorName>
const _sectorCache = new Map<string, Map<string, string>>();
const _sectorCacheTime = new Map<string, number>();
const _resolvedSectorCache = new Map<string, string[]>();

async function ensureSectorCache(cityNames: string | string[], pais?: string): Promise<Map<string, string>> {
  const cacheKey = Array.isArray(cityNames) ? cityNames.sort().join('|') : cityNames;

  const cached = _sectorCache.get(cacheKey);
  const cacheTime = _sectorCacheTime.get(cacheKey) || 0;
  if (cached && Date.now() - cacheTime < CACHE_TTL) return cached;

  const sectors = await getSectorsWithCounts(cityNames, pais);
  const map = new Map<string, string>();
  for (const s of sectors) {
    map.set(toSlug(s.name), s.name);
  }
  _sectorCache.set(cacheKey, map);
  _sectorCacheTime.set(cacheKey, Date.now());
  return map;
}

/**
 * Resolve a sector URL slug to the real sector name.
 * Requires city context (city names) for accurate resolution.
 */
export async function sectorSlugToName(sectorSlug: string, cityNames: string | string[], pais?: string): Promise<string> {
  const cache = await ensureSectorCache(cityNames, pais);

  // 1. Direct match
  const direct = cache.get(sectorSlug);
  if (direct) return direct;

  // 2. Dynamic resolution via MeiliSearch text search within city
  const resolveKey = `${sectorSlug}|${Array.isArray(cityNames) ? cityNames.join('|') : cityNames}`;
  if (!_resolvedSectorCache.has(resolveKey)) {
    const resolved = await resolveSectorFromText(sectorSlug, cityNames, pais);
    _resolvedSectorCache.set(resolveKey, resolved);
  }

  const resolved = _resolvedSectorCache.get(resolveKey);
  if (resolved && resolved.length > 0) return resolved[0];

  // 3. Fallback: title-case
  return sectorSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Resolve a sector slug to ALL equivalent sector names for MeiliSearch filtering.
 */
export async function sectorSlugToNames(sectorSlug: string, cityNames: string | string[], pais?: string): Promise<string[]> {
  const cache = await ensureSectorCache(cityNames, pais);

  // Direct match
  const direct = cache.get(sectorSlug);
  if (direct) return [direct];

  // Dynamic resolution
  const resolveKey = `${sectorSlug}|${Array.isArray(cityNames) ? cityNames.join('|') : cityNames}`;
  if (!_resolvedSectorCache.has(resolveKey)) {
    const resolved = await resolveSectorFromText(sectorSlug, cityNames, pais);
    _resolvedSectorCache.set(resolveKey, resolved);
  }

  const resolved = _resolvedSectorCache.get(resolveKey);
  if (resolved && resolved.length > 0) {
    const slugWords = sectorSlug.split('-').filter(w => w.length > 2);
    const primary = resolved[0];
    const related = resolved.slice(1).filter(name => {
      const nameLower = name.toLowerCase();
      return slugWords.some(w => nameLower.includes(w));
    });
    return [primary, ...related].slice(0, 5);
  }

  const titleCased = sectorSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return [titleCased];
}
