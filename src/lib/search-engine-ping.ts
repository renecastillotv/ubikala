// Utilidad para notificar a buscadores sobre contenido nuevo/actualizado
// Soporta: Google Ping, Bing/IndexNow, Yandex

const SITE = 'https://ubikala.com';
const INDEXNOW_KEY = import.meta.env.INDEXNOW_KEY || process.env.INDEXNOW_KEY || 'ubikala-indexnow-key';

/**
 * Ping Google para que recrawlee el sitemap
 * Google ya no soporta el endpoint de ping oficialmente desde 2023,
 * pero el lastmod en el sitemap + Search Console API sigue siendo la vía principal.
 * Mantenemos el ping como complemento.
 */
async function pingGoogle(): Promise<boolean> {
  try {
    const sitemapUrl = encodeURIComponent(`${SITE}/sitemap.xml`);
    const response = await fetch(`https://www.google.com/ping?sitemap=${sitemapUrl}`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Ping Bing para que recrawlee el sitemap
 */
async function pingBing(): Promise<boolean> {
  try {
    const sitemapUrl = encodeURIComponent(`${SITE}/sitemap.xml`);
    const response = await fetch(`https://www.bing.com/ping?sitemap=${sitemapUrl}`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * IndexNow - Notifica a Bing, Yandex, Seznam y otros buscadores
 * sobre URLs nuevas o actualizadas para indexación rápida.
 * https://www.indexnow.org/
 */
async function submitIndexNow(urls: string[]): Promise<boolean> {
  if (urls.length === 0) return true;

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: 'ubikala.com',
        key: INDEXNOW_KEY,
        keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
        urlList: urls.map(url => url.startsWith('http') ? url : `${SITE}${url}`),
      }),
      signal: AbortSignal.timeout(10000),
    });
    return response.ok || response.status === 202;
  } catch {
    return false;
  }
}

/**
 * Notifica a todos los buscadores sobre URLs nuevas.
 * Llama a esta función cuando se publica/actualiza una propiedad.
 */
export async function notifySearchEngines(urls: string[]): Promise<{
  google: boolean;
  bing: boolean;
  indexNow: boolean;
}> {
  const [google, bing, indexNow] = await Promise.allSettled([
    pingGoogle(),
    pingBing(),
    submitIndexNow(urls),
  ]);

  return {
    google: google.status === 'fulfilled' && google.value,
    bing: bing.status === 'fulfilled' && bing.value,
    indexNow: indexNow.status === 'fulfilled' && indexNow.value,
  };
}

/**
 * Notifica sobre una propiedad nueva o actualizada.
 * Envía tanto la URL de la propiedad como el sitemap actualizado.
 */
export async function notifyPropertyChange(propertySlug: string): Promise<void> {
  const propertyUrl = `/propiedad/${propertySlug}`;

  try {
    await notifySearchEngines([propertyUrl]);
  } catch (error) {
    // Non-blocking: log but don't throw
    console.error('Error notifying search engines:', error);
  }
}

/**
 * Notifica sobre un nuevo usuario/agente.
 */
export async function notifyUserChange(userSlug: string, isUbikala: boolean): Promise<void> {
  const userUrl = isUbikala ? `/usuario/${userSlug}` : `/asesor/${userSlug}`;

  try {
    await notifySearchEngines([userUrl]);
  } catch (error) {
    console.error('Error notifying search engines:', error);
  }
}
