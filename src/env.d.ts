/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly UBIKALA_DATABASE_URL: string;
  readonly JWT_SECRET: string;
  readonly PUBLIC_SITE_URL: string;
  readonly CLOUDINARY_CLOUD_NAME: string;
  readonly CLOUDINARY_API_KEY: string;
  readonly CLOUDINARY_API_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    user?: {
      id: string;
      email: string;
      name: string;
      role: 'admin' | 'inmobiliaria' | 'asesor_independiente' | 'propietario';
      avatar_url: string | null;
      phone: string | null;
      company_name?: string | null;
      license_number?: string | null;
    };
    country: import('./lib/country-config').CountryConfig;
  }
}