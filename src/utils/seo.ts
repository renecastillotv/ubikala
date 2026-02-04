/**
 * Utilidades SEO para PropiedadEnRD.com
 */

import type { Property, Agent, LocationSEO } from '../data/types';

/**
 * Genera Schema.org JSON-LD para una propiedad
 */
export function generatePropertySchema(property: Property, siteUrl: string = 'https://propiedadenrd.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: `${siteUrl}/propiedad/${property.slug}`,
    image: property.images.map(img => img.url),
    datePosted: property.createdAt,
    dateModified: property.updatedAt,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: property.currency,
      availability: property.status === 'active'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/SoldOut',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.location.address || '',
      addressLocality: property.location.city,
      addressRegion: property.location.province,
      addressCountry: 'DO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: property.location.latitude,
      longitude: property.location.longitude,
    },
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.area,
      unitCode: 'MTK', // metros cuadrados
    },
  };
}

/**
 * Genera Schema.org JSON-LD para un agente
 */
export function generateAgentSchema(agent: Agent, siteUrl: string = 'https://propiedadenrd.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: agent.name,
    url: `${siteUrl}/asesor/${agent.slug}`,
    image: agent.photo,
    description: agent.bio,
    telephone: agent.phone,
    email: agent.email,
    worksFor: agent.company ? {
      '@type': 'Organization',
      name: agent.company,
    } : undefined,
    areaServed: {
      '@type': 'Country',
      name: 'Dominican Republic',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: agent.rating,
      reviewCount: agent.reviewCount,
    },
    knowsLanguage: agent.languages,
  };
}

/**
 * Genera meta tags Open Graph
 */
export function generateOpenGraphTags(data: {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article';
  locale?: string;
}) {
  const { title, description, url, image, type = 'website', locale = 'es_DO' } = data;

  return {
    'og:title': title,
    'og:description': description,
    'og:url': url,
    'og:type': type,
    'og:locale': locale,
    'og:site_name': 'PropiedadEnRD.com',
    ...(image && {
      'og:image': image,
      'og:image:width': '1200',
      'og:image:height': '630',
    }),
  };
}

/**
 * Genera meta tags Twitter Card
 */
export function generateTwitterTags(data: {
  title: string;
  description: string;
  image?: string;
}) {
  const { title, description, image } = data;

  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    ...(image && { 'twitter:image': image }),
  };
}

/**
 * Genera breadcrumb Schema.org
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Genera keywords SEO basadas en la propiedad
 */
export function generatePropertyKeywords(property: Property): string {
  const keywords = [
    property.type,
    property.transactionType === 'sale' ? 'en venta' : 'en alquiler',
    property.location.city,
    property.location.sector,
    property.location.province,
    'republica dominicana',
    'bienes raices',
    'inmobiliaria',
  ];

  if (property.bedrooms) {
    keywords.push(`${property.bedrooms} habitaciones`);
  }

  return keywords.join(', ');
}

/**
 * Genera título SEO optimizado para propiedad
 */
export function generatePropertyTitle(property: Property): string {
  const type = property.type.charAt(0).toUpperCase() + property.type.slice(1);
  const transaction = property.transactionType === 'sale' ? 'en Venta' : 'en Alquiler';

  return `${type} ${transaction} en ${property.location.sector}, ${property.location.city} | PropiedadEnRD.com`;
}

/**
 * Genera descripción SEO optimizada para propiedad
 */
export function generatePropertyDescription(property: Property): string {
  const parts = [
    property.title,
    property.bedrooms && `${property.bedrooms} habitaciones`,
    property.bathrooms && `${property.bathrooms} baños`,
    `${property.area} m²`,
    `en ${property.location.city}`,
  ].filter(Boolean);

  const description = parts.join(', ');
  const truncated = description.substring(0, 155);

  return truncated + (description.length > 155 ? '...' : '');
}
