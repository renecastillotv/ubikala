/**
 * Smart URL segment classifier for property routes.
 *
 * Classifies each segment in a URL like /comprar/apartamento/boca-chica/naco
 * into one of: type, city, or sector — regardless of order.
 *
 * Priority: type (static map) > city (MeiliSearch facets) > sector (MeiliSearch within city)
 */

import { slugToCityNames, slugToName } from './location-utils';
import { sectorSlugToName, sectorSlugToNames } from './location-utils';
import { getCitiesWithCounts } from './meilisearch';
import { toSlug } from './slug-utils';

// ============================================================================
// PROPERTY TYPE MAP (static, known at compile time)
// ============================================================================

export const PROPERTY_TYPE_MAP: Record<string, { dbValue: string; singular: string; plural: string; icon: string }> = {
  'apartamento': { dbValue: 'apartamento', singular: 'Apartamento', plural: 'Apartamentos', icon: '🏢' },
  'apartamentos': { dbValue: 'apartamento', singular: 'Apartamento', plural: 'Apartamentos', icon: '🏢' },
  'casa': { dbValue: 'casa', singular: 'Casa', plural: 'Casas', icon: '🏠' },
  'casas': { dbValue: 'casa', singular: 'Casa', plural: 'Casas', icon: '🏠' },
  'villa': { dbValue: 'villa', singular: 'Villa', plural: 'Villas', icon: '🏡' },
  'villas': { dbValue: 'villa', singular: 'Villa', plural: 'Villas', icon: '🏡' },
  'penthouse': { dbValue: 'penthouse', singular: 'Penthouse', plural: 'Penthouses', icon: '🌆' },
  'penthouses': { dbValue: 'penthouse', singular: 'Penthouse', plural: 'Penthouses', icon: '🌆' },
  'terreno': { dbValue: 'terreno', singular: 'Terreno', plural: 'Terrenos', icon: '🌳' },
  'terrenos': { dbValue: 'terreno', singular: 'Terreno', plural: 'Terrenos', icon: '🌳' },
  'solar': { dbValue: 'terreno', singular: 'Solar', plural: 'Solares', icon: '🌳' },
  'solares': { dbValue: 'terreno', singular: 'Solar', plural: 'Solares', icon: '🌳' },
  'local': { dbValue: 'local comercial', singular: 'Local Comercial', plural: 'Locales Comerciales', icon: '🏪' },
  'local-comercial': { dbValue: 'local comercial', singular: 'Local Comercial', plural: 'Locales Comerciales', icon: '🏪' },
  'locales': { dbValue: 'local comercial', singular: 'Local Comercial', plural: 'Locales Comerciales', icon: '🏪' },
  'locales-comerciales': { dbValue: 'local comercial', singular: 'Local Comercial', plural: 'Locales Comerciales', icon: '🏪' },
  'oficina': { dbValue: 'oficina', singular: 'Oficina', plural: 'Oficinas', icon: '🏛️' },
  'oficinas': { dbValue: 'oficina', singular: 'Oficina', plural: 'Oficinas', icon: '🏛️' },
  'nave': { dbValue: 'nave', singular: 'Nave Industrial', plural: 'Naves Industriales', icon: '🏭' },
  'naves': { dbValue: 'nave', singular: 'Nave Industrial', plural: 'Naves Industriales', icon: '🏭' },
  'almacenes': { dbValue: 'nave', singular: 'Nave Industrial', plural: 'Naves Industriales', icon: '🏭' },
  'finca': { dbValue: 'finca', singular: 'Finca', plural: 'Fincas', icon: '🌾' },
  'fincas': { dbValue: 'finca', singular: 'Finca', plural: 'Fincas', icon: '🌾' },
  'edificio': { dbValue: 'edificio', singular: 'Edificio', plural: 'Edificios', icon: '🏗️' },
  'edificios': { dbValue: 'edificio', singular: 'Edificio', plural: 'Edificios', icon: '🏗️' },
  'estudio': { dbValue: 'estudio', singular: 'Estudio', plural: 'Estudios', icon: '🛏️' },
  'estudios': { dbValue: 'estudio', singular: 'Estudio', plural: 'Estudios', icon: '🛏️' },
};

// ============================================================================
// CLASSIFIED RESULT
// ============================================================================

export interface ClassifiedSegments {
  /** Property type info if detected */
  type: { slug: string; dbValue: string; singular: string; plural: string; icon: string } | null;
  /** City info if detected */
  city: { slug: string; name: string; names: string[] } | null;
  /** Sector info if detected */
  sector: { slug: string; name: string } | null;
  /** Segments that couldn't be classified */
  unmatched: string[];
}

// ============================================================================
// CITY SLUG CACHE (fast lookup without async calls)
// ============================================================================

let _citySlugSet: Set<string> | null = null;
let _citySlugSetPais: string | undefined;
let _citySlugSetTime = 0;
const CITY_CACHE_TTL = 10 * 60 * 1000;

async function getCitySlugSet(pais?: string): Promise<Set<string>> {
  if (_citySlugSet && _citySlugSetPais === pais && Date.now() - _citySlugSetTime < CITY_CACHE_TTL) {
    return _citySlugSet;
  }
  const cities = await getCitiesWithCounts(pais);
  _citySlugSet = new Set(cities.map(c => toSlug(c.name)));
  _citySlugSetPais = pais;
  _citySlugSetTime = Date.now();
  return _citySlugSet;
}

// ============================================================================
// MAIN CLASSIFIER
// ============================================================================

/**
 * Classify URL segments into type, city, and sector.
 *
 * Algorithm:
 * 1. Check each segment against PROPERTY_TYPE_MAP (instant, static)
 * 2. Check remaining segments against city slugs from MeiliSearch facets
 * 3. If we have a city, check remaining segments as potential sectors
 * 4. If no city match from cache, try dynamic resolution (text search)
 *
 * @param segments - URL path segments (e.g. ['apartamento', 'boca-chica', 'naco'])
 * @param pais - Country name for MeiliSearch filtering
 */
export async function classifySegments(segments: string[], pais?: string): Promise<ClassifiedSegments> {
  const result: ClassifiedSegments = {
    type: null,
    city: null,
    sector: null,
    unmatched: [],
  };

  if (segments.length === 0) return result;

  const remaining: string[] = [];

  // Pass 1: Extract property type (static, instant)
  for (const seg of segments) {
    const typeInfo = PROPERTY_TYPE_MAP[seg.toLowerCase()];
    if (typeInfo && !result.type) {
      result.type = { slug: seg.toLowerCase(), ...typeInfo };
    } else {
      remaining.push(seg);
    }
  }

  if (remaining.length === 0) return result;

  // Pass 2: Check against known city slugs
  const citySlugSet = await getCitySlugSet(pais);
  const locationCandidates: string[] = [];

  for (const seg of remaining) {
    if (citySlugSet.has(seg)) {
      if (!result.city) {
        const cityNames = await slugToCityNames(seg, pais);
        const cityName = await slugToName(seg, pais);
        result.city = { slug: seg, name: cityName, names: cityNames };
      } else {
        locationCandidates.push(seg);
      }
    } else {
      locationCandidates.push(seg);
    }
  }

  // Pass 3: If no city found from direct match, try dynamic resolution on first remaining
  if (!result.city && locationCandidates.length > 0) {
    const candidate = locationCandidates[0];
    const cityNames = await slugToCityNames(candidate, pais);
    const cityName = await slugToName(candidate, pais);

    // Check if the resolution actually found a real city (not just title-cased fallback)
    const titleCaseFallback = candidate.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const isRealCity = cityNames.length > 0 && cityNames[0] !== titleCaseFallback;
    // Also accept if the slug exists in MeiliSearch facets after dynamic resolution
    const hasResults = cityNames.length > 0;

    if (isRealCity || hasResults) {
      result.city = { slug: candidate, name: cityName, names: cityNames };
      locationCandidates.shift();
    }
  }

  // Pass 4: If we have a city, try to resolve remaining as sector
  if (result.city && locationCandidates.length > 0) {
    const sectorCandidate = locationCandidates[0];
    const sectorName = await sectorSlugToName(sectorCandidate, result.city.names, pais);

    // Check it's not just the title-case fallback
    const titleCaseFallback = sectorCandidate.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    if (sectorName !== titleCaseFallback || sectorCandidate === toSlug(sectorName)) {
      result.sector = { slug: sectorCandidate, name: sectorName };
      locationCandidates.shift();
    }
  }

  // Whatever remains is unmatched
  result.unmatched = locationCandidates;

  return result;
}
