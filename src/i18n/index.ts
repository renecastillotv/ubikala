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

  // Para otros idiomas, agregar prefijo
  return `/${lang}${cleanPath}`;
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
  // Remover prefijo de idioma si existe
  let basePath = currentPath;
  for (const lang of Object.keys(languages)) {
    if (currentPath.startsWith(`/${lang}/`) || currentPath === `/${lang}`) {
      basePath = currentPath.slice(lang.length + 1) || '/';
      break;
    }
  }

  return Object.keys(languages).map((lang) => ({
    lang: lang as Lang,
    url: lang === defaultLang
      ? `${siteUrl}${basePath}`
      : `${siteUrl}/${lang}${basePath === '/' ? '' : basePath}`,
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
 * Obtiene las URLs de todos los idiomas para la ruta actual
 */
export function getLanguageUrls(pathname: string): Record<Lang, string> {
  // Detectar el idioma actual de la URL
  const [, firstSegment] = pathname.split('/');
  const currentLang: Lang = (firstSegment in translations) ? firstSegment as Lang : defaultLang;

  return {
    es: translateRoute(pathname, currentLang, 'es'),
    en: translateRoute(pathname, currentLang, 'en'),
    fr: translateRoute(pathname, currentLang, 'fr'),
  };
}
