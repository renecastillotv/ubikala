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
