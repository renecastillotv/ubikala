import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://propiedadenrd.com',
  output: 'hybrid', // SSG por defecto, SSR para API routes
  adapter: vercel(),
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-DO',
          en: 'en-US',
          fr: 'fr-FR'
        }
      }
    })
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'fr'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
