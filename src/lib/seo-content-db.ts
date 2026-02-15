// DB-driven SEO content service with caching
// Reads from ubikala_seo_content table, caches per country+lang+section+page

import { getSeoContentRow, seedSeoContent, ensureSeoContentTable } from './ubikala-db';

// Types for each section
export interface FAQ {
  question: string;
  answer: string;
}

export interface Zone {
  name: string;
  description: string;
  link: string;
  emoji: string;
  color: string;
}

export interface PropertyType {
  name: string;
  description: string;
  link: string;
  letter: string;
  color: string;
}

export interface InfoBox {
  title: string;
  text: string;
}

export interface EduCard {
  title: string;
  description: string;
  link: string;
  icon: string; // 'money' | 'shield' | 'globe'
}

export interface Requirement {
  title: string;
  description: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string; // 'globe' | 'chart' | 'money' | 'sun'
}

export interface Destination {
  name: string;
  description: string;
  link: string;
  emoji: string;
}

export interface TextBlock {
  title: string;
  description?: string;
  subtitle?: string;
}

// Cache: Map<cacheKey, {data, timestamp}>
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

let seeded = false;

async function ensureSeeded(): Promise<void> {
  if (seeded) return;
  try {
    await seedSeoContent();
  } catch (e) {
    // Ignore seed errors (table might not exist yet in dev)
  }
  seeded = true;
}

async function getContent(cc: string, lang: string, section: string, page?: string | null): Promise<any | null> {
  await ensureSeeded();

  const cacheKey = `${cc}:${lang}:${section}:${page || '__null'}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const data = await getSeoContentRow(cc, lang, section, page);
  cache.set(cacheKey, { data, timestamp: Date.now() });
  return data;
}

/** Replace {pais} placeholders in text */
function replacePais(text: string, pais: string): string {
  return text.replace(/\{pais\}/g, pais);
}

/** Process content: replace {pais} in all string values */
function processContent<T>(content: T, pais: string): T {
  if (content === null || content === undefined) return content;
  if (typeof content === 'string') return replacePais(content, pais) as any;
  if (Array.isArray(content)) {
    return content.map(item => processContent(item, pais)) as any;
  }
  if (typeof content === 'object') {
    const result: any = {};
    for (const [key, value] of Object.entries(content)) {
      result[key] = processContent(value, pais);
    }
    return result;
  }
  return content;
}

// === Convenience functions ===

export async function getPageFAQs(cc: string, lang: string, page: string, pais?: string): Promise<FAQ[]> {
  const data = await getContent(cc, lang, 'faqs', page);
  if (!data || !Array.isArray(data)) return [];
  return pais ? processContent(data, pais) : data;
}

export async function getPopularZones(cc: string, lang: string, page: string, pais?: string): Promise<Zone[]> {
  const data = await getContent(cc, lang, 'popular_zones', page);
  if (!data || !Array.isArray(data)) return [];
  return pais ? processContent(data, pais) : data;
}

export async function getPropertyTypes(cc: string, lang: string, pais?: string): Promise<PropertyType[]> {
  const data = await getContent(cc, lang, 'property_types', 'buy');
  if (!data || !Array.isArray(data)) return [];
  return pais ? processContent(data, pais) : data;
}

export async function getInfoBox(cc: string, lang: string, page: string, pais?: string): Promise<InfoBox | null> {
  const data = await getContent(cc, lang, 'info_box', page);
  if (!data) return null;
  return pais ? processContent(data, pais) : data;
}

export async function getEducationalCards(cc: string, lang: string, pais?: string): Promise<EduCard[]> {
  const data = await getContent(cc, lang, 'educational_cards', 'buy');
  if (!data || !Array.isArray(data)) return [];
  return pais ? processContent(data, pais) : data;
}

export async function getRentalRequirements(cc: string, lang: string, pais?: string): Promise<Requirement[]> {
  const data = await getContent(cc, lang, 'rental_requirements', 'rent');
  if (!data || !Array.isArray(data)) return [];
  return pais ? processContent(data, pais) : data;
}

export async function getHeroContent(cc: string, lang: string, page: string, pais?: string): Promise<TextBlock | null> {
  const data = await getContent(cc, lang, 'hero', page);
  if (!data) return null;
  return pais ? processContent(data, pais) : data;
}

export async function getGuideHeader(cc: string, lang: string, page: string, pais?: string): Promise<TextBlock | null> {
  const data = await getContent(cc, lang, 'guide_header', page);
  if (!data) return null;
  return pais ? processContent(data, pais) : data;
}

export async function getCTAContent(cc: string, lang: string, page: string, pais?: string): Promise<TextBlock | null> {
  const data = await getContent(cc, lang, 'cta', page);
  if (!data) return null;
  return pais ? processContent(data, pais) : data;
}

export async function getBenefitsContent(cc: string, lang: string, pais?: string): Promise<Benefit[]> {
  const data = await getContent(cc, lang, 'benefits', null);
  if (!data || !Array.isArray(data)) return [];
  return pais ? processContent(data, pais) : data;
}

export async function getDestinations(cc: string, lang: string, pais?: string): Promise<Destination[]> {
  const data = await getContent(cc, lang, 'destinations', null);
  if (!data || !Array.isArray(data)) return [];
  return pais ? processContent(data, pais) : data;
}

export async function getDestinationsHeader(cc: string, lang: string, pais?: string): Promise<TextBlock | null> {
  const data = await getContent(cc, lang, 'destinations_header', null);
  if (!data) return null;
  return pais ? processContent(data, pais) : data;
}

/** Generate Schema.org FAQPage from FAQ array */
export function getFAQSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/** Invalidate cache for a specific key or all */
export function invalidateSeoCache(cc?: string, lang?: string): void {
  if (cc && lang) {
    for (const key of cache.keys()) {
      if (key.startsWith(`${cc}:${lang}:`)) {
        cache.delete(key);
      }
    }
  } else {
    cache.clear();
  }
}
