// Dynamic guides system: per-country, per-language guides stored in DB
import { ubikalaDb } from './ubikala-db';

// ── Types ──────────────────────────────────────────────────────────
export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

export interface GuideFull extends GuideMeta {
  keywords: string;
  tag: string;             // Hero badge text
  hero_description: string;
  toc: Array<{ id: string; label: string }>;
  body_html: string;
  faqs: Array<{ question: string; answer: string }>;
  related_guides: Array<{ slug: string; title: string; description: string }>;
  cta_title: string;
  cta_description: string;
  cta_link: string;
  cta_link_text: string;
}

// ── Table ──────────────────────────────────────────────────────────
let tableEnsured = false;

export async function ensureGuidesTable(): Promise<void> {
  if (!ubikalaDb || tableEnsured) return;
  await ubikalaDb`
    CREATE TABLE IF NOT EXISTS ubikala_guias (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      country_code VARCHAR(5) NOT NULL,
      lang VARCHAR(5) NOT NULL DEFAULT 'es',
      slug VARCHAR(255) NOT NULL,
      title VARCHAR(500) NOT NULL,
      description TEXT,
      keywords TEXT,
      category VARCHAR(100),
      icon VARCHAR(50),
      tag VARCHAR(100),
      hero_description TEXT,
      toc JSONB DEFAULT '[]',
      body_html TEXT NOT NULL DEFAULT '',
      faqs JSONB DEFAULT '[]',
      related_guides JSONB DEFAULT '[]',
      cta_title VARCHAR(500),
      cta_description TEXT,
      cta_link VARCHAR(255) DEFAULT '/comprar',
      cta_link_text VARCHAR(255) DEFAULT 'Ver Propiedades Disponibles',
      sort_order INT NOT NULL DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(country_code, lang, slug)
    )
  `;
  tableEnsured = true;
}

// ── Queries ────────────────────────────────────────────────────────
const cache = new Map<string, { data: any; ts: number }>();
const TTL = 10 * 60 * 1000;

function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.ts < TTL) return Promise.resolve(hit.data);
  return fn().then(data => { cache.set(key, { data, ts: Date.now() }); return data; });
}

export async function getGuideBySlug(
  countryCode: string, lang: string, slug: string
): Promise<GuideFull | null> {
  if (!ubikalaDb) return null;
  await ensureSeeded();

  return cached(`guide:${countryCode}:${lang}:${slug}`, async () => {
    const rows = await ubikalaDb!`
      SELECT * FROM ubikala_guias
      WHERE country_code = ${countryCode.toUpperCase()}
        AND lang = ${lang}
        AND slug = ${slug}
        AND is_active = true
    `;
    if (!rows[0]) return null;
    const r = rows[0] as any;
    return {
      slug: r.slug,
      title: r.title,
      description: r.description || '',
      keywords: r.keywords || '',
      category: r.category || '',
      icon: r.icon || 'document',
      tag: r.tag || r.category || '',
      hero_description: r.hero_description || '',
      toc: r.toc || [],
      body_html: r.body_html || '',
      faqs: r.faqs || [],
      related_guides: r.related_guides || [],
      cta_title: r.cta_title || '',
      cta_description: r.cta_description || '',
      cta_link: r.cta_link || '/comprar',
      cta_link_text: r.cta_link_text || 'Ver Propiedades',
    };
  });
}

export async function getGuidesForCountry(
  countryCode: string, lang: string
): Promise<GuideMeta[]> {
  if (!ubikalaDb) return [];
  await ensureSeeded();

  return cached(`guides-list:${countryCode}:${lang}`, async () => {
    const rows = await ubikalaDb!`
      SELECT slug, title, description, category, icon
      FROM ubikala_guias
      WHERE country_code = ${countryCode.toUpperCase()}
        AND lang = ${lang}
        AND is_active = true
      ORDER BY sort_order, title
    `;
    return rows as GuideMeta[];
  });
}

export async function getGuideSlugsForCountry(
  countryCode: string, lang: string
): Promise<string[]> {
  if (!ubikalaDb) return [];
  await ensureSeeded();

  const rows = await ubikalaDb`
    SELECT slug FROM ubikala_guias
    WHERE country_code = ${countryCode.toUpperCase()}
      AND lang = ${lang}
      AND is_active = true
    ORDER BY sort_order
  `;
  return rows.map((r: any) => r.slug);
}

// ── Seeding ────────────────────────────────────────────────────────
let seeded = false;

async function ensureSeeded(): Promise<void> {
  if (seeded) return;
  try {
    await ensureGuidesTable();
    await seedGuides();
  } catch (e) {
    // Ignore seed errors in dev
  }
  seeded = true;
}

export async function seedGuides(): Promise<void> {
  if (!ubikalaDb) return;
  await ensureGuidesTable();

  // Check if already seeded
  const count = await ubikalaDb`SELECT COUNT(*) as c FROM ubikala_guias`;
  if (Number(count[0]?.c) > 0) return;

  // Import seeds
  const { guideSeedsDO } = await import('./guides-seeds-do');
  for (const guide of guideSeedsDO) {
    await ubikalaDb`
      INSERT INTO ubikala_guias (
        country_code, lang, slug, title, description, keywords,
        category, icon, tag, hero_description,
        toc, body_html, faqs, related_guides,
        cta_title, cta_description, cta_link, cta_link_text,
        sort_order
      ) VALUES (
        ${guide.country_code}, ${guide.lang}, ${guide.slug}, ${guide.title}, ${guide.description}, ${guide.keywords},
        ${guide.category}, ${guide.icon}, ${guide.tag}, ${guide.hero_description},
        ${JSON.stringify(guide.toc)}, ${guide.body_html}, ${JSON.stringify(guide.faqs)}, ${JSON.stringify(guide.related_guides)},
        ${guide.cta_title}, ${guide.cta_description}, ${guide.cta_link}, ${guide.cta_link_text},
        ${guide.sort_order}
      )
      ON CONFLICT (country_code, lang, slug) DO NOTHING
    `;
  }
}
