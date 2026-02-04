/**
 * Utilidades de formateo para PropiedadEnRD.com
 */

/**
 * Formatea un precio con símbolo de moneda
 */
export function formatPrice(
  price: number,
  currency: 'USD' | 'DOP' = 'USD',
  isRent: boolean = false,
  locale: string = 'en-US'
): string {
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(price);

  return isRent ? `${formatted}/mes` : formatted;
}

/**
 * Formatea el área en metros cuadrados
 */
export function formatArea(area: number, locale: string = 'es-DO'): string {
  return `${new Intl.NumberFormat(locale).format(area)} m²`;
}

/**
 * Genera un slug a partir de un texto
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/-+/g, '-') // Múltiples guiones a uno
    .trim();
}

/**
 * Trunca texto a una longitud específica
 */
export function truncate(text: string, length: number = 150): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

/**
 * Formatea una fecha relativa
 */
export function formatRelativeDate(dateString: string, locale: string = 'es'): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return locale === 'es' ? 'Hoy' : 'Today';
  if (diffDays === 1) return locale === 'es' ? 'Ayer' : 'Yesterday';
  if (diffDays < 7) return locale === 'es' ? `Hace ${diffDays} días` : `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return locale === 'es' ? `Hace ${weeks} semana${weeks > 1 ? 's' : ''}` : `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return locale === 'es' ? `Hace ${months} mes${months > 1 ? 'es' : ''}` : `${months} month${months > 1 ? 's' : ''} ago`;
  }
  const years = Math.floor(diffDays / 365);
  return locale === 'es' ? `Hace ${years} año${years > 1 ? 's' : ''}` : `${years} year${years > 1 ? 's' : ''} ago`;
}

/**
 * Genera un número de WhatsApp formateado
 */
export function formatWhatsAppLink(phone: string, message: string = ''): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}${message ? `?text=${encodedMessage}` : ''}`;
}

/**
 * Valida un email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida un teléfono dominicano
 */
export function isValidDominicanPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, '');
  // Números dominicanos: 809, 829, 849
  return /^(1)?(809|829|849)\d{7}$/.test(cleanPhone);
}
