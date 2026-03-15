/**
 * Quality Audit Engine for Ubikala
 * Runs quality checks and duplicate detection on all published properties.
 */
import { meiliRequest, PROPIEDADES_INDEX } from './meilisearch';
import type { MeiliPropertyDoc } from './meilisearch';

// ============================================================================
// TYPES
// ============================================================================

export interface QualityIssue {
  code: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface PropertyAuditResult {
  id: string;
  titulo: string;
  slug: string;
  imagen: string | null;
  tipo: string;
  operacion: string;
  precio: number | null;
  moneda: string;
  ciudad: string | null;
  sector: string | null;
  agente_nombre: string | null;
  agente_slug: string | null;
  score: number;
  issues: QualityIssue[];
  duplicates: { id: string; titulo: string; score: number }[];
}

export interface AuditSummary {
  totalProperties: number;
  passing: number;
  failing: number;
  withWarnings: number;
  issueBreakdown: Record<string, number>;
  results: PropertyAuditResult[];
  executedAt: string;
}

// ============================================================================
// QUALITY RULES
// ============================================================================

const RULES = {
  min_descripcion_chars: 100,
  min_fotos: 3,
  min_titulo_chars: 10,
  precio_venta_min: 5000,
  precio_venta_max: 50_000_000,
  precio_renta_min: 50,
  precio_renta_max: 500_000,
  dedup_precio_tolerancia: 0.10, // 10%
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

// ============================================================================
// QUALITY CHECKS
// ============================================================================

function checkProperty(doc: MeiliPropertyDoc): QualityIssue[] {
  const issues: QualityIssue[] = [];

  // Title
  if (!doc.titulo || doc.titulo.length < RULES.min_titulo_chars) {
    issues.push({ code: 'TITULO_CORTO', message: `Título muy corto (${doc.titulo?.length || 0} chars, mínimo ${RULES.min_titulo_chars})`, severity: 'error' });
  }

  // Description
  const descPlain = doc.descripcion ? stripHtml(doc.descripcion) : '';
  if (descPlain.length < RULES.min_descripcion_chars) {
    issues.push({ code: 'DESCRIPCION_CORTA', message: `Descripción muy corta (${descPlain.length} chars, mínimo ${RULES.min_descripcion_chars})`, severity: 'error' });
  }

  // Photos
  const photoCount = (doc.imagenes?.length || 0) + (doc.imagen_principal && !doc.imagenes?.includes(doc.imagen_principal) ? 1 : 0);
  if (photoCount < RULES.min_fotos) {
    issues.push({ code: 'FOTOS_INSUFICIENTES', message: `Solo ${photoCount} foto(s) (mínimo ${RULES.min_fotos})`, severity: 'error' });
  }

  // Price
  const precio = doc.precio || doc.precio_venta || doc.precio_alquiler || 0;
  if (precio <= 0) {
    issues.push({ code: 'PRECIO_FALTANTE', message: 'Sin precio definido', severity: 'error' });
  } else {
    const isRenta = doc.operacion === 'alquiler' || doc.operacion === 'renta';
    if (isRenta) {
      if (precio < RULES.precio_renta_min) issues.push({ code: 'PRECIO_RENTA_BAJO', message: `Precio de renta muy bajo: ${precio}`, severity: 'warning' });
      if (precio > RULES.precio_renta_max) issues.push({ code: 'PRECIO_RENTA_ALTO', message: `Precio de renta muy alto: ${precio}`, severity: 'warning' });
    } else {
      if (precio < RULES.precio_venta_min) issues.push({ code: 'PRECIO_VENTA_BAJO', message: `Precio de venta muy bajo: ${precio}`, severity: 'warning' });
      if (precio > RULES.precio_venta_max) issues.push({ code: 'PRECIO_VENTA_ALTO', message: `Precio de venta muy alto: ${precio}`, severity: 'warning' });
    }
  }

  // Location
  if (!doc.ciudad && !doc.sector) {
    issues.push({ code: 'UBICACION_INCOMPLETA', message: 'Falta ciudad y sector', severity: 'error' });
  } else if (!doc.ciudad) {
    issues.push({ code: 'UBICACION_INCOMPLETA', message: 'Falta ciudad', severity: 'warning' });
  }

  // Agent
  if (!doc.agente_nombre) {
    issues.push({ code: 'SIN_AGENTE', message: 'Sin nombre de agente/asesor', severity: 'error' });
  }
  if (!doc.agente_whatsapp && !doc.agente_telefono) {
    issues.push({ code: 'AGENTE_SIN_CONTACTO', message: 'Agente sin teléfono ni WhatsApp', severity: 'error' });
  }

  // Main image
  if (!doc.imagen_principal) {
    issues.push({ code: 'SIN_IMAGEN_PRINCIPAL', message: 'Sin imagen principal definida', severity: 'warning' });
  }

  return issues;
}

// ============================================================================
// DUPLICATE DETECTION
// ============================================================================

function detectDuplicates(docs: MeiliPropertyDoc[]): Map<string, { id: string; titulo: string; score: number }[]> {
  const duplicateMap = new Map<string, { id: string; titulo: string; score: number }[]>();

  // Group by tipo + operacion + ciudad for faster comparison
  const groups = new Map<string, MeiliPropertyDoc[]>();
  for (const doc of docs) {
    const key = `${doc.tipo}|${doc.operacion}|${normalize(doc.ciudad || '')}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(doc);
  }

  for (const [, group] of groups) {
    if (group.length < 2) continue;

    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const a = group[i];
        const b = group[j];
        const score = similarityScore(a, b);
        if (score >= 70) {
          // Add b as duplicate of a
          if (!duplicateMap.has(a.id)) duplicateMap.set(a.id, []);
          duplicateMap.get(a.id)!.push({ id: b.id, titulo: b.titulo, score });
          // Add a as duplicate of b
          if (!duplicateMap.has(b.id)) duplicateMap.set(b.id, []);
          duplicateMap.get(b.id)!.push({ id: a.id, titulo: a.titulo, score });
        }
      }
    }
  }

  return duplicateMap;
}

function similarityScore(a: MeiliPropertyDoc, b: MeiliPropertyDoc): number {
  let score = 0;

  // Title similarity (max 35 pts)
  const titleA = normalize(a.titulo || '');
  const titleB = normalize(b.titulo || '');
  if (titleA === titleB) {
    score += 35;
  } else if (titleA.includes(titleB) || titleB.includes(titleA)) {
    score += 25;
  } else {
    // Word overlap
    const wordsA = new Set(titleA.split(/\s+/));
    const wordsB = new Set(titleB.split(/\s+/));
    const intersection = [...wordsA].filter(w => wordsB.has(w) && w.length > 2);
    const overlap = intersection.length / Math.max(wordsA.size, wordsB.size);
    score += Math.round(overlap * 20);
  }

  // Price similarity (max 25 pts)
  const priceA = a.precio || a.precio_venta || a.precio_alquiler || 0;
  const priceB = b.precio || b.precio_venta || b.precio_alquiler || 0;
  if (priceA > 0 && priceB > 0) {
    const diff = Math.abs(priceA - priceB) / Math.max(priceA, priceB);
    if (diff <= 0.02) score += 25;
    else if (diff <= RULES.dedup_precio_tolerancia) score += 15;
  }

  // Sector match (max 15 pts)
  if (a.sector && b.sector && normalize(a.sector) === normalize(b.sector)) {
    score += 15;
  }

  // Characteristics match (max 15 pts)
  if (a.habitaciones && b.habitaciones && a.habitaciones === b.habitaciones) score += 5;
  if (a.banos && b.banos && a.banos === b.banos) score += 5;
  if (a.m2_construccion && b.m2_construccion) {
    const m2Diff = Math.abs(a.m2_construccion - b.m2_construccion) / Math.max(a.m2_construccion, b.m2_construccion);
    if (m2Diff <= 0.05) score += 5;
  }

  // Same tenant bonus (max 10 pts) — cross-tenant duplicates are more suspicious
  if (a.tenant_id !== b.tenant_id) score += 10;

  return Math.min(score, 100);
}

// ============================================================================
// MAIN AUDIT FUNCTION
// ============================================================================

export async function runQualityAudit(): Promise<AuditSummary> {
  // Fetch all properties from MeiliSearch (paginate if needed)
  const allDocs: MeiliPropertyDoc[] = [];
  let offset = 0;
  const limit = 1000;

  while (true) {
    const result = await meiliRequest(`/indexes/${PROPIEDADES_INDEX}/search`, {
      method: 'POST',
      body: JSON.stringify({
        q: '',
        filter: 'estado_propiedad = "disponible"',
        limit,
        offset,
      }),
    });

    const hits = result.hits || [];
    allDocs.push(...hits);

    if (hits.length < limit) break;
    offset += limit;
  }

  // Run duplicate detection
  const duplicateMap = detectDuplicates(allDocs);

  // Run quality checks on each property
  const issueBreakdown: Record<string, number> = {};
  const results: PropertyAuditResult[] = [];

  for (const doc of allDocs) {
    const issues = checkProperty(doc);
    const duplicates = duplicateMap.get(doc.id) || [];

    if (duplicates.length > 0) {
      issues.push({
        code: 'POSIBLE_DUPLICADO',
        message: `${duplicates.length} posible(s) duplicado(s) detectado(s)`,
        severity: 'warning',
      });
    }

    // Calculate score
    let score = 100;
    for (const issue of issues) {
      score -= issue.severity === 'error' ? 20 : 5;
    }
    score = Math.max(0, score);

    // Track breakdown
    for (const issue of issues) {
      issueBreakdown[issue.code] = (issueBreakdown[issue.code] || 0) + 1;
    }

    results.push({
      id: doc.id,
      titulo: doc.titulo,
      slug: doc.slug,
      imagen: doc.imagen_principal,
      tipo: doc.tipo,
      operacion: doc.operacion,
      precio: doc.precio || doc.precio_venta || doc.precio_alquiler || null,
      moneda: doc.moneda,
      ciudad: doc.ciudad,
      sector: doc.sector,
      agente_nombre: doc.agente_nombre,
      agente_slug: doc.agente_slug,
      score,
      issues,
      duplicates,
    });
  }

  // Sort by score ascending (worst first)
  results.sort((a, b) => a.score - b.score);

  const hasErrors = (r: PropertyAuditResult) => r.issues.some(i => i.severity === 'error');
  const hasWarningsOnly = (r: PropertyAuditResult) => r.issues.length > 0 && !hasErrors(r);

  return {
    totalProperties: results.length,
    passing: results.filter(r => r.issues.length === 0).length,
    failing: results.filter(r => hasErrors(r)).length,
    withWarnings: results.filter(r => hasWarningsOnly(r)).length,
    issueBreakdown,
    results,
    executedAt: new Date().toISOString(),
  };
}
