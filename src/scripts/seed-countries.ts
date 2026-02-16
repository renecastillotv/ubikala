/**
 * Seed all countries and their basic site configs.
 * Run with: npx tsx src/scripts/seed-countries.ts
 */
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.UBIKALA_DATABASE_URL || 'postgresql://neondb_owner:npg_QDwB9pWHXm6S@ep-polished-moon-aieg89w2-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require';
const sql = neon(DATABASE_URL);

// All countries with full metadata
const countries = [
  { code: 'DO', name: 'República Dominicana', currency: 'DOP', currency_symbol: 'RD$', phone_prefix: '+1-809', phone_placeholder: '809-555-1234', subdomain: '', flag: '🇩🇴', timezone: 'America/Santo_Domingo', lat: 18.7357, lng: -70.1627, domain: 'ubikala.com' },
  { code: 'PA', name: 'Panamá', currency: 'USD', currency_symbol: '$', phone_prefix: '+507', phone_placeholder: '6000-0000', subdomain: 'pa', flag: '🇵🇦', timezone: 'America/Panama', lat: 8.9824, lng: -79.5199, domain: 'pa.ubikala.com' },
  { code: 'MX', name: 'México', currency: 'MXN', currency_symbol: '$', phone_prefix: '+52', phone_placeholder: '55-1234-5678', subdomain: 'mx', flag: '🇲🇽', timezone: 'America/Mexico_City', lat: 19.4326, lng: -99.1332, domain: 'mx.ubikala.com' },
  { code: 'CO', name: 'Colombia', currency: 'COP', currency_symbol: '$', phone_prefix: '+57', phone_placeholder: '300-123-4567', subdomain: 'co', flag: '🇨🇴', timezone: 'America/Bogota', lat: 4.7110, lng: -74.0721, domain: 'co.ubikala.com' },
  { code: 'AR', name: 'Argentina', currency: 'ARS', currency_symbol: '$', phone_prefix: '+54', phone_placeholder: '11-1234-5678', subdomain: 'ar', flag: '🇦🇷', timezone: 'America/Argentina/Buenos_Aires', lat: -34.6037, lng: -58.3816, domain: 'ar.ubikala.com' },
  { code: 'BR', name: 'Brasil', currency: 'BRL', currency_symbol: 'R$', phone_prefix: '+55', phone_placeholder: '11-91234-5678', subdomain: 'br', flag: '🇧🇷', timezone: 'America/Sao_Paulo', lat: -23.5505, lng: -46.6333, domain: 'br.ubikala.com' },
  { code: 'CL', name: 'Chile', currency: 'CLP', currency_symbol: '$', phone_prefix: '+56', phone_placeholder: '9-1234-5678', subdomain: 'cl', flag: '🇨🇱', timezone: 'America/Santiago', lat: -33.4489, lng: -70.6693, domain: 'cl.ubikala.com' },
  { code: 'PE', name: 'Perú', currency: 'PEN', currency_symbol: 'S/', phone_prefix: '+51', phone_placeholder: '912-345-678', subdomain: 'pe', flag: '🇵🇪', timezone: 'America/Lima', lat: -12.0464, lng: -77.0428, domain: 'pe.ubikala.com' },
  { code: 'EC', name: 'Ecuador', currency: 'USD', currency_symbol: '$', phone_prefix: '+593', phone_placeholder: '99-123-4567', subdomain: 'ec', flag: '🇪🇨', timezone: 'America/Guayaquil', lat: -0.1807, lng: -78.4678, domain: 'ec.ubikala.com' },
  { code: 'UY', name: 'Uruguay', currency: 'UYU', currency_symbol: '$U', phone_prefix: '+598', phone_placeholder: '91-234-567', subdomain: 'uy', flag: '🇺🇾', timezone: 'America/Montevideo', lat: -34.9011, lng: -56.1645, domain: 'uy.ubikala.com' },
  { code: 'CR', name: 'Costa Rica', currency: 'CRC', currency_symbol: '₡', phone_prefix: '+506', phone_placeholder: '8000-0000', subdomain: 'cr', flag: '🇨🇷', timezone: 'America/Costa_Rica', lat: 9.9281, lng: -84.0907, domain: 'cr.ubikala.com' },
  { code: 'GT', name: 'Guatemala', currency: 'GTQ', currency_symbol: 'Q', phone_prefix: '+502', phone_placeholder: '1234-5678', subdomain: 'gt', flag: '🇬🇹', timezone: 'America/Guatemala', lat: 14.6349, lng: -90.5069, domain: 'gt.ubikala.com' },
  { code: 'SV', name: 'El Salvador', currency: 'USD', currency_symbol: '$', phone_prefix: '+503', phone_placeholder: '7000-0000', subdomain: 'sv', flag: '🇸🇻', timezone: 'America/El_Salvador', lat: 13.6929, lng: -89.2182, domain: 'sv.ubikala.com' },
  { code: 'HN', name: 'Honduras', currency: 'HNL', currency_symbol: 'L', phone_prefix: '+504', phone_placeholder: '9123-4567', subdomain: 'hn', flag: '🇭🇳', timezone: 'America/Tegucigalpa', lat: 14.0723, lng: -87.1921, domain: 'hn.ubikala.com' },
  { code: 'NI', name: 'Nicaragua', currency: 'NIO', currency_symbol: 'C$', phone_prefix: '+505', phone_placeholder: '8123-4567', subdomain: 'ni', flag: '🇳🇮', timezone: 'America/Managua', lat: 12.1150, lng: -86.2362, domain: 'ni.ubikala.com' },
];

// Email mapping: country name lowercased without accents
const emailMap: Record<string, string> = {
  DO: 'dominicana@ubikala.com',
  PA: 'panama@ubikala.com',
  MX: 'mexico@ubikala.com',
  CO: 'colombia@ubikala.com',
  AR: 'argentina@ubikala.com',
  BR: 'brasil@ubikala.com',
  CL: 'chile@ubikala.com',
  PE: 'peru@ubikala.com',
  EC: 'ecuador@ubikala.com',
  UY: 'uruguay@ubikala.com',
  CR: 'costarica@ubikala.com',
  GT: 'guatemala@ubikala.com',
  SV: 'elsalvador@ubikala.com',
  HN: 'honduras@ubikala.com',
  NI: 'nicaragua@ubikala.com',
};

// Capital cities
const capitals: Record<string, string> = {
  DO: 'Santo Domingo',
  PA: 'Ciudad de Panamá',
  MX: 'Ciudad de México',
  CO: 'Bogotá',
  AR: 'Buenos Aires',
  BR: 'São Paulo',
  CL: 'Santiago',
  PE: 'Lima',
  EC: 'Quito',
  UY: 'Montevideo',
  CR: 'San José',
  GT: 'Ciudad de Guatemala',
  SV: 'San Salvador',
  HN: 'Tegucigalpa',
  NI: 'Managua',
};

async function seed() {
  console.log('🌎 Seeding countries and site configs...\n');

  // 1. Ensure tables exist
  await sql`
    CREATE TABLE IF NOT EXISTS ubikala_paises (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      code VARCHAR(5) NOT NULL,
      name VARCHAR(255) NOT NULL,
      currency VARCHAR(10) NOT NULL DEFAULT 'USD',
      currency_symbol VARCHAR(10) NOT NULL DEFAULT '$',
      phone_prefix VARCHAR(20) NOT NULL DEFAULT '+1',
      phone_placeholder VARCHAR(30) NOT NULL DEFAULT '000-000-0000',
      subdomain VARCHAR(20) NOT NULL DEFAULT '',
      flag VARCHAR(10) NOT NULL DEFAULT '',
      timezone VARCHAR(50) NOT NULL DEFAULT 'America/Santo_Domingo',
      lat DECIMAL(10,6) NOT NULL DEFAULT 0,
      lng DECIMAL(10,6) NOT NULL DEFAULT 0,
      domain VARCHAR(255) NOT NULL DEFAULT 'ubikala.com',
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(code)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS ubikala_site_config (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      country_code VARCHAR(5) NOT NULL,
      domain VARCHAR(255) NOT NULL DEFAULT 'ubikala.com',
      company_name VARCHAR(255) NOT NULL DEFAULT 'Ubikala',
      company_slogan TEXT,
      logo_url TEXT,
      favicon_url TEXT,
      email VARCHAR(255),
      phone VARCHAR(50),
      phone_display VARCHAR(50),
      whatsapp VARCHAR(50),
      business_hours VARCHAR(255),
      address_street TEXT,
      address_city VARCHAR(255),
      address_country VARCHAR(255),
      geo_latitude VARCHAR(50),
      geo_longitude VARCHAR(50),
      social_facebook TEXT,
      social_instagram TEXT,
      social_linkedin TEXT,
      social_youtube TEXT,
      social_twitter TEXT,
      social_tiktok TEXT,
      meta_title TEXT,
      meta_description TEXT,
      og_image TEXT,
      smtp_host VARCHAR(255),
      smtp_port INTEGER DEFAULT 587,
      smtp_user VARCHAR(255),
      smtp_password TEXT,
      smtp_from_email VARCHAR(255),
      smtp_from_name VARCHAR(255),
      smtp_encryption VARCHAR(10) DEFAULT 'tls',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(country_code)
    )
  `;

  // 2. Upsert countries
  for (const c of countries) {
    await sql`
      INSERT INTO ubikala_paises (code, name, currency, currency_symbol, phone_prefix, phone_placeholder, subdomain, flag, timezone, lat, lng, domain, is_active)
      VALUES (${c.code}, ${c.name}, ${c.currency}, ${c.currency_symbol}, ${c.phone_prefix}, ${c.phone_placeholder}, ${c.subdomain}, ${c.flag}, ${c.timezone}, ${c.lat}, ${c.lng}, ${c.domain}, true)
      ON CONFLICT (code) DO UPDATE SET
        name = EXCLUDED.name,
        currency = EXCLUDED.currency,
        currency_symbol = EXCLUDED.currency_symbol,
        phone_prefix = EXCLUDED.phone_prefix,
        phone_placeholder = EXCLUDED.phone_placeholder,
        subdomain = EXCLUDED.subdomain,
        flag = EXCLUDED.flag,
        timezone = EXCLUDED.timezone,
        lat = EXCLUDED.lat,
        lng = EXCLUDED.lng,
        domain = EXCLUDED.domain,
        is_active = true,
        updated_at = NOW()
    `;
    console.log(`  ✅ Country: ${c.flag} ${c.name} (${c.code})`);
  }

  console.log('');

  // 3. Check existing configs (don't overwrite Panama or DR if they have data)
  const existingConfigs = await sql`SELECT country_code, email FROM ubikala_site_config`;
  const existingMap = new Map(existingConfigs.map(r => [r.country_code, r]));

  // 4. Upsert site configs for countries that don't have one yet
  for (const c of countries) {
    const existing = existingMap.get(c.code);
    if (existing?.email) {
      console.log(`  ⏭️  Config exists for ${c.code} (${existing.email}) — skipping`);
      continue;
    }

    const email = emailMap[c.code];
    const capital = capitals[c.code];

    await sql`
      INSERT INTO ubikala_site_config (
        country_code, domain, company_name, company_slogan,
        email, phone, phone_display, whatsapp, business_hours,
        address_city, address_country,
        geo_latitude, geo_longitude,
        social_facebook, social_instagram, social_linkedin,
        meta_title, meta_description
      ) VALUES (
        ${c.code},
        ${c.domain},
        'Ubíkala',
        ${'Esa propiedad que buscas, ubíkala aquí'},
        ${email},
        ${c.phone_prefix.replace(/-/g, '') + '0000000'},
        ${c.phone_prefix + '-000-0000'},
        ${null},
        ${'Lun-Vie 9am-6pm'},
        ${capital},
        ${c.name},
        ${String(c.lat)},
        ${String(c.lng)},
        ${'https://facebook.com/ubikala'},
        ${'https://instagram.com/ubikala'},
        ${'https://linkedin.com/company/ubikala'},
        ${'Ubíkala ' + c.name + ' - Esa propiedad que buscas, ubíkala aquí'},
        ${'Encuentra casas, apartamentos, terrenos y locales comerciales en venta y alquiler en ' + c.name + '. Miles de propiedades verificadas.'}
      )
      ON CONFLICT (country_code) DO UPDATE SET
        domain = EXCLUDED.domain,
        company_name = EXCLUDED.company_name,
        company_slogan = EXCLUDED.company_slogan,
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        phone_display = EXCLUDED.phone_display,
        business_hours = EXCLUDED.business_hours,
        address_city = EXCLUDED.address_city,
        address_country = EXCLUDED.address_country,
        geo_latitude = EXCLUDED.geo_latitude,
        geo_longitude = EXCLUDED.geo_longitude,
        social_facebook = EXCLUDED.social_facebook,
        social_instagram = EXCLUDED.social_instagram,
        social_linkedin = EXCLUDED.social_linkedin,
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description,
        updated_at = NOW()
    `;
    console.log(`  ✅ Config: ${c.flag} ${c.name} → ${email}`);
  }

  // 5. Remove PR (Puerto Rico) if it shouldn't be in the list
  // (it was in the defaults but not in the user's list)
  // Leave it for now, just deactivate if needed

  console.log('\n🎉 Done! All countries and configs seeded.');

  // Print summary
  const allCountries = await sql`SELECT code, name, flag, subdomain, domain FROM ubikala_paises WHERE is_active = true ORDER BY name`;
  const allConfigs = await sql`SELECT country_code, email, address_city, address_country FROM ubikala_site_config ORDER BY country_code`;

  console.log('\n📋 Countries in DB:');
  for (const c of allCountries) {
    console.log(`  ${c.flag} ${c.code} — ${c.name} (${c.domain})`);
  }

  console.log('\n📋 Site Configs in DB:');
  for (const c of allConfigs) {
    console.log(`  ${c.country_code} — ${c.email} | ${c.address_city}, ${c.address_country}`);
  }
}

seed().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
