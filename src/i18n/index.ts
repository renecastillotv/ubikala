import { es } from './es';
import { en } from './en';
import { fr } from './fr';

export const languages = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
};

export const defaultLang = 'es';

export const translations = {
  es,
  en,
  fr,
} as const;

export type Lang = keyof typeof translations;

/**
 * Obtiene el idioma de la URL actual
 */
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as Lang;
  return defaultLang;
}

/**
 * Obtiene las traducciones para un idioma
 */
export function useTranslations(lang: Lang) {
  return translations[lang];
}

/**
 * Obtiene la ruta sin el prefijo de idioma
 */
export function getRouteFromUrl(url: URL): string {
  const [, lang, ...rest] = url.pathname.split('/');
  if (lang in translations) {
    return '/' + rest.join('/');
  }
  return url.pathname;
}

/**
 * Genera una URL localizada
 * - Para español (idioma por defecto): /ruta
 * - Para otros idiomas: /en/ruta, /fr/ruta
 */
export function localizedUrl(path: string, lang: Lang): string {
  // Asegurar que el path empiece con /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Para el idioma por defecto, no agregar prefijo
  if (lang === defaultLang) {
    return cleanPath;
  }

  // Para otros idiomas, traducir segmentos de ruta y agregar prefijo
  return translateRoute(cleanPath, defaultLang, lang);
}

/**
 * Obtiene los idiomas alternativos (para el selector de idioma)
 */
export function getAlternateLanguages(currentLang: Lang): { lang: Lang; name: string }[] {
  return Object.entries(languages)
    .filter(([lang]) => lang !== currentLang)
    .map(([lang, name]) => ({ lang: lang as Lang, name }));
}

/**
 * Genera URLs alternativas para SEO (hreflang)
 */
export function getAlternateUrls(currentPath: string, siteUrl: string = 'https://ubikala.com'): { lang: Lang; url: string }[] {
  const langUrls = getLanguageUrls(currentPath);

  return (Object.keys(languages) as Lang[]).map((lang) => ({
    lang,
    url: `${siteUrl}${langUrls[lang]}`,
  }));
}

/**
 * Traduce un slug de ruta
 */
export const routeTranslations: Record<string, Record<Lang, string>> = {
  'comprar': { es: 'comprar', en: 'buy', fr: 'acheter' },
  'alquilar': { es: 'alquilar', en: 'rent', fr: 'louer' },
  'publicar': { es: 'publicar', en: 'list', fr: 'publier' },
  'asesores': { es: 'asesores', en: 'agents', fr: 'agents' },
  'inmobiliarias': { es: 'inmobiliarias', en: 'real-estate', fr: 'immobilieres' },
  'nosotros': { es: 'nosotros', en: 'about', fr: 'a-propos' },
  'contacto': { es: 'contacto', en: 'contact', fr: 'contact' },
  'buscar': { es: 'buscar', en: 'search', fr: 'recherche' },
  'propiedad': { es: 'propiedad', en: 'property', fr: 'propriete' },
  'asesor': { es: 'asesor', en: 'agent', fr: 'agent' },
  'propiedades': { es: 'propiedades', en: 'properties', fr: 'proprietes' },
  'privacidad': { es: 'privacidad', en: 'privacy', fr: 'confidentialite' },
  'terminos': { es: 'terminos', en: 'terms', fr: 'conditions' },
  'login': { es: 'login', en: 'login', fr: 'connexion' },
};

/**
 * Traduce una ruta completa de un idioma a otro
 */
export function translateRoute(path: string, fromLang: Lang, toLang: Lang): string {
  // Remover el prefijo de idioma si existe
  let cleanPath = path;
  if (path.startsWith(`/${fromLang}/`)) {
    cleanPath = path.slice(fromLang.length + 1);
  } else if (path === `/${fromLang}`) {
    cleanPath = '/';
  }

  // Si es la raíz
  if (cleanPath === '/' || cleanPath === '') {
    return toLang === defaultLang ? '/' : `/${toLang}`;
  }

  // Dividir la ruta en segmentos
  const segments = cleanPath.split('/').filter(Boolean);

  // Traducir cada segmento si tiene traducción
  const translatedSegments = segments.map(segment => {
    // Buscar si este segmento tiene traducción inversa (del idioma origen al slug base)
    for (const [baseSlug, translations] of Object.entries(routeTranslations)) {
      if (translations[fromLang] === segment) {
        return translations[toLang];
      }
    }
    // Si no tiene traducción, mantener el segmento original (ej: slugs de propiedades)
    return segment;
  });

  const translatedPath = '/' + translatedSegments.join('/');

  // Agregar prefijo de idioma si no es el idioma por defecto
  if (toLang === defaultLang) {
    return translatedPath;
  }
  return `/${toLang}${translatedPath}`;
}

/**
 * Available first-level routes per language (must match actual page files).
 * Spanish has all routes as the default language.
 */
const availableRoutes: Record<Lang, Set<string>> = {
  es: new Set(), // ES is default, all routes exist
  en: new Set(['about', 'agents', 'buy', 'contact', 'list', 'privacy', 'real-estate', 'rent', 'search', 'terms', 'login']),
  fr: new Set(['acheter', 'agents', 'a-propos', 'conditions', 'confidentialite', 'contact', 'immobilieres', 'louer', 'publier', 'recherche']),
};

function isRouteAvailable(path: string, lang: Lang): boolean {
  if (lang === defaultLang) return true;

  const prefix = `/${lang}`;
  if (path === prefix || path === `${prefix}/`) return true;

  const afterPrefix = path.startsWith(`${prefix}/`) ? path.slice(prefix.length + 1) : path;
  const segments = afterPrefix.split('/').filter(Boolean);
  if (segments.length === 0) return true;

  // Only flat (single-segment) routes exist in EN/FR currently
  return segments.length === 1 && availableRoutes[lang].has(segments[0]);
}

/**
 * Obtiene las URLs de todos los idiomas para la ruta actual.
 * Falls back to the language homepage if the translated route doesn't exist.
 */
export function getLanguageUrls(pathname: string): Record<Lang, string> {
  // Detectar el idioma actual de la URL
  const [, firstSegment] = pathname.split('/');
  const currentLang: Lang = (firstSegment in translations) ? firstSegment as Lang : defaultLang;

  const urls: Record<string, string> = {
    es: translateRoute(pathname, currentLang, 'es'),
    en: translateRoute(pathname, currentLang, 'en'),
    fr: translateRoute(pathname, currentLang, 'fr'),
  };

  // Fallback to homepage if target route doesn't have an actual page
  for (const lang of ['en', 'fr'] as Lang[]) {
    if (!isRouteAvailable(urls[lang], lang)) {
      urls[lang] = `/${lang}`;
    }
  }

  return urls as Record<Lang, string>;
}
