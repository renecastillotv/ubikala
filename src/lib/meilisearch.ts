/**
 * MeiliSearch client for Ubikala
 * Replaces direct DB queries for read operations (properties, agents).
 * DB is only used for fire-and-forget writes (new properties, registrations).
 */
import type { Property, Agent, PropertyType, TransactionType, PropertyImage, UserType } from '../data/types';

// ============================================================================
// CONFIG
// ============================================================================

const MEILI_HOST = import.meta.env.MEILISEARCH_HOST || process.env.MEILISEARCH_HOST || 'https://search.denlla.com';
const MEILI_KEY = import.meta.env.MEILISEARCH_API_KEY || process.env.MEILISEARCH_API_KEY || 'wLuzP8L5iwszZsNbWRPZjCY3vi92SCCv';

const PROPIEDADES_INDEX = 'propiedades';
const ASESORES_INDEX = 'asesores';

// Portal keys — properties must have one of these to appear on Ubikala
const PORTAL_KEYS = ['ubikala', 'ubika', 'propiedadenrd'] as const;

// ============================================================================
// MEILI PROPERTY DOCUMENT (matches CRM API MeiliPropiedadDocument)
// ============================================================================

export interface MeiliPropertyDoc {
  id: string;
  tenant_id: string;
  slug: string;
  titulo: string;
  descripcion: string | null;
  short_description: string | null;
  tipo: string;
  operacion: string;
  precio: number | null;
  precio_venta: number | null;
  precio_alquiler: number | null;
  precio_alquiler_temporal: number | null;
  moneda: string;
  pais: string | null;
  provincia: string | null;
  ciudad: string | null;
  sector: string | null;
  direccion: string | null;
  ubicacion_completa: string;
  latitud: number | null;
  longitud: number | null;
  _geo: { lat: number; lng: number } | null;
  habitaciones: number | null;
  banos: number | null;
  medios_banos: number | null;
  estacionamientos: number | null;
  m2_construccion: number | null;
  m2_terreno: number | null;
  precio_min: number | null;
  precio_max: number | null;
  m2_min: number | null;
  m2_max: number | null;
  habitaciones_min: number | null;
  habitaciones_max: number | null;
  banos_min: number | null;
  banos_max: number | null;
  parqueos_min: number | null;
  parqueos_max: number | null;
  amenidades: string[];
  amenidades_codigos: string[];
  imagen_principal: string | null;
  imagenes: string[];
  video_url: string | null;
  tour_virtual_url: string | null;
  estado_propiedad: string;
  destacada: boolean;
  exclusiva: boolean;
  etiquetas: string[];
  tags: string[];
  codigo_publico: number | null;
  agente_id: string | null;
  perfil_asesor_id: string | null;
  agente_nombre: string | null;
  agente_slug: string | null;
  agente_foto: string | null;
  agente_email: string | null;
  agente_telefono: string | null;
  agente_whatsapp: string | null;
  agente_titulo: string | null;
  tenant_nombre: string | null;
  tenant_logo: string | null;
  year_built: number | null;
  pisos: number | null;
  operaciones: string[];
  portales: Record<string, boolean> | null;
  vistas: number;
  cocaptores: Array<{ perfil_asesor_id: string; nombre: string; slug: string; foto: string | null }>;
  created_at: number;
  updated_at: number;
}

// ============================================================================
// MEILI ASESOR DOCUMENT (matches CRM API MeiliAsesorDocument)
// ============================================================================

export interface MeiliAgentDoc {
  id: string;
  tenant_id: string;
  usuario_id: string;
  slug: string;
  nombre: string;
  apellido: string;
  nombre_completo: string;
  email: string;
  telefono: string | null;
  avatar_url: string | null;
  foto_url: string | null;
  titulo_profesional: string | null;
  biografia: string | null;
  video_presentacion_url: string | null;
  especialidades: string[];
  idiomas: string[];
  zonas: string[];
  tipos_propiedad: string[];
  experiencia_anos: number | null;
  whatsapp: string | null;
  telefono_directo: string | null;
  redes_sociales: { instagram?: string; facebook?: string; linkedin?: string } | null;
  equipo_id: string | null;
  equipo_nombre: string | null;
  stats: {
    propiedades_activas?: number;
    propiedades_vendidas?: number;
    calificacion_promedio?: number;
    total_resenas?: number;
    volumen_ventas?: number;
  } | null;
  destacado: boolean;
  visible_en_web: boolean;
  updated_at: number;
}

// ============================================================================
// TYPE MAPS (Spanish DB → English frontend)
// ============================================================================

const typeMap: Record<string, PropertyType> = {
  'casa': 'house',
  'apartamento': 'apartment',
  'penthouse': 'penthouse',
  'villa': 'villa',
  'terreno': 'land',
  'local': 'commercial',
  'comercial': 'commercial',
  'oficina': 'office',
  'nave': 'warehouse',
  'edificio': 'building',
  'solar': 'land',
};

const transactionMap: Record<string, TransactionType> = {
  'venta': 'sale',
  'alquiler': 'rent',
  'renta': 'rent',
};

const languageMap: Record<string, string> = {
  'es': 'Español',
  'en': 'English',
  'fr': 'Français',
  'de': 'Deutsch',
  'pt': 'Português',
};

const specMap: Record<string, PropertyType> = {
  'casas': 'house', 'casa': 'house', 'residencial': 'house',
  'apartamentos': 'apartment', 'apartamento': 'apartment',
  'villas': 'villa', 'villa': 'villa', 'lujo': 'villa',
  'terrenos': 'land', 'terreno': 'land',
  'comercial': 'commercial', 'inversión': 'commercial', 'inversion': 'commercial',
};

// ============================================================================
// HTTP CLIENT
// ============================================================================

async function meiliRequest(path: string, options: RequestInit = {}): Promise<any> {
  const url = `${MEILI_HOST}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${MEILI_KEY}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`MeiliSearch error ${response.status}: ${errorText}`);
  }

  return response.json();
}

// ============================================================================
// TRANSFORMERS: MeiliSearch → Ubikala types
// ============================================================================

/**
 * Transform a MeiliSearch property document into Ubikala's Property interface.
 */
export function meiliToProperty(doc: MeiliPropertyDoc, forceRental: boolean = false): Property {
  const operacionLower = doc.operacion?.toLowerCase() || '';
  const isRentalContext = forceRental || operacionLower === 'renta' || operacionLower === 'alquiler';

  const effectivePrice = (isRentalContext && doc.precio_alquiler)
    ? doc.precio_alquiler
    : (doc.precio || 0);

  const currency = (doc.moneda?.toUpperCase() === 'DOP' ? 'DOP' : 'USD') as 'USD' | 'DOP';
  const transactionType = isRentalContext ? 'rent' : (transactionMap[operacionLower] || 'sale');

  const isProject = (doc.precio_min != null && doc.precio_max != null);

  // Build images
  const images: PropertyImage[] = [];
  if (doc.imagen_principal) {
    images.push({ url: doc.imagen_principal, alt: doc.titulo, isPrimary: true });
  }
  if (doc.imagenes?.length) {
    for (let i = 0; i < doc.imagenes.length; i++) {
      const url = doc.imagenes[i];
      if (url && url !== doc.imagen_principal) {
        images.push({ url, alt: `${doc.titulo} - ${i + 1}`, isPrimary: false });
      }
    }
  }
  if (images.length === 0) {
    images.push({ url: '/images/property-placeholder.svg', alt: doc.titulo, isPrimary: true });
  }

  // Is new (< 30 days)
  const createdDate = new Date(doc.created_at);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const isNew = createdDate > thirtyDaysAgo;

  // Build agent from embedded data
  const agent: Agent = doc.agente_nombre ? {
    id: doc.agente_id || doc.perfil_asesor_id || '0',
    slug: doc.agente_slug || 'agente',
    name: doc.agente_nombre,
    email: doc.agente_email || '',
    phone: doc.agente_telefono || '',
    whatsapp: doc.agente_whatsapp || doc.agente_telefono || '',
    photo: doc.agente_foto || '/images/agent-placeholder.svg',
    company: doc.tenant_nombre || doc.agente_titulo || undefined,
    userType: 'agent' as UserType,
    verified: Boolean(doc.tenant_nombre),
    rating: 5,
    reviewCount: 0,
    experienceYears: 5,
    languages: ['Español'],
    bio: '',
    propertiesCount: 0,
    responseTime: 'menos de 1 hora',
    specializations: [],
    locations: [],
    isClicInmobiliaria: true,
    parentCompany: doc.tenant_nombre || undefined,
  } : {
    id: '0',
    slug: 'ubikala',
    name: 'Ubikala',
    email: 'info@ubikala.com',
    phone: '',
    whatsapp: '',
    photo: '/images/logo.png',
    userType: 'agent' as UserType,
    verified: true,
    rating: 5,
    reviewCount: 0,
    experienceYears: 10,
    languages: ['Español', 'English'],
    bio: '',
    propertiesCount: 0,
    responseTime: 'menos de 1 hora',
    specializations: [],
    locations: [],
  };

  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.titulo,
    description: doc.descripcion || '',
    type: typeMap[doc.tipo?.toLowerCase()] || 'house',
    transactionType,
    status: doc.estado_propiedad === 'disponible' ? 'active'
      : doc.estado_propiedad === 'vendida' ? 'sold'
      : doc.estado_propiedad === 'alquilada' ? 'rented' : 'pending',
    price: effectivePrice,
    currency,
    pricePerSqm: doc.m2_construccion ? Math.round(effectivePrice / doc.m2_construccion) : undefined,
    rentalPrice: doc.precio_alquiler || undefined,
    rentalCurrency: doc.precio_alquiler ? currency : undefined,
    isProject,
    priceMin: doc.precio_min || undefined,
    priceMax: doc.precio_max || undefined,
    areaMin: doc.m2_min || undefined,
    areaMax: doc.m2_max || undefined,
    bedroomsMin: doc.habitaciones_min ?? undefined,
    bedroomsMax: doc.habitaciones_max ?? undefined,
    bathroomsMin: doc.banos_min ?? undefined,
    bathroomsMax: doc.banos_max ?? undefined,
    parkingMin: doc.parqueos_min ?? undefined,
    parkingMax: doc.parqueos_max ?? undefined,
    location: {
      slug: `${doc.ciudad?.toLowerCase().replace(/\s+/g, '-') || ''}-${doc.sector?.toLowerCase().replace(/\s+/g, '-') || ''}`.replace(/^-|-$/g, ''),
      city: doc.ciudad || '',
      sector: doc.sector || '',
      province: doc.provincia || '',
      country: doc.pais || 'República Dominicana',
      latitude: doc.latitud || doc._geo?.lat || 0,
      longitude: doc.longitud || doc._geo?.lng || 0,
      address: doc.direccion || undefined,
    },
    bedrooms: doc.habitaciones || undefined,
    bathrooms: doc.banos || undefined,
    parkingSpaces: doc.estacionamientos || undefined,
    area: doc.m2_construccion || 0,
    landArea: doc.m2_terreno || undefined,
    yearBuilt: doc.year_built || undefined,
    totalFloors: doc.pisos || undefined,
    features: doc.amenidades || [],
    images,
    videoUrl: doc.video_url || undefined,
    virtualTourUrl: doc.tour_virtual_url || undefined,
    agent,
    isFeatured: doc.destacada,
    isExclusive: doc.exclusiva,
    isNew,
    isPriceReduced: false,
    views: doc.vistas || 0,
    createdAt: new Date(doc.created_at).toISOString(),
    updatedAt: new Date(doc.updated_at).toISOString(),
  };
}

/**
 * Transform a MeiliSearch agent document into Ubikala's Agent interface.
 */
export function meiliToAgent(doc: MeiliAgentDoc): Agent {
  return {
    id: doc.id,
    slug: doc.slug,
    name: doc.nombre_completo,
    email: doc.email || '',
    phone: doc.telefono_directo || doc.telefono || '',
    whatsapp: doc.whatsapp || doc.telefono_directo || doc.telefono || '',
    photo: doc.foto_url || doc.avatar_url || '/images/agent-placeholder.svg',
    company: doc.equipo_nombre || doc.titulo_profesional || undefined,
    userType: 'agent' as UserType,
    verified: true,
    rating: doc.stats?.calificacion_promedio || 5,
    reviewCount: doc.stats?.total_resenas || 0,
    experienceYears: doc.experiencia_anos || 5,
    languages: (doc.idiomas || ['es']).map(code => languageMap[code] || code),
    bio: doc.biografia || '',
    propertiesCount: doc.stats?.propiedades_activas || 0,
    responseTime: 'menos de 1 hora',
    specializations: (doc.especialidades || []).map(e => specMap[e.toLowerCase()] || 'house'),
    locations: doc.zonas || [],
    socialMedia: doc.redes_sociales || undefined,
    isClicInmobiliaria: true,
  };
}

// ============================================================================
// SEARCH FUNCTIONS
// ============================================================================

/** Portal filter: matches ubikala OR ubika OR propiedadenrd */
function portalFilter(): string {
  return PORTAL_KEYS.map(k => `portales.${k} = true`).join(' OR ');
}

export interface SearchOptions {
  query?: string;
  tipo?: string;
  operacion?: string;
  pais?: string;
  provincia?: string;
  ciudad?: string;
  sector?: string;
  precioMin?: number;
  precioMax?: number;
  habitacionesMin?: number;
  banosMin?: number;
  destacada?: boolean;
  amenidades?: string[];
  agenteSlug?: string;
  sort?: string[];
  limit?: number;
  offset?: number;
  facets?: string[];
}

/**
 * Search properties via MeiliSearch with portal filter.
 * Returns { hits, estimatedTotalHits, facetDistribution }.
 */
export async function searchProperties(options: SearchOptions = {}): Promise<{
  properties: Property[];
  total: number;
  facetDistribution?: Record<string, Record<string, number>>;
}> {
  const {
    query = '',
    tipo, operacion, pais, provincia, ciudad, sector,
    precioMin, precioMax, habitacionesMin, banosMin,
    destacada, amenidades, agenteSlug,
    sort = ['destacada:desc', 'updated_at:desc'],
    limit = 20, offset = 0, facets,
  } = options;

  const filters: string[] = [];

  // Portal filter (required for Ubikala)
  filters.push(`(${portalFilter()})`);

  // Property filters
  if (tipo) filters.push(`tipo = "${tipo}"`);
  if (operacion) filters.push(`operaciones = "${operacion}"`);

  // Price range (operation-aware)
  if (operacion === 'venta') {
    if (precioMin !== undefined) filters.push(`precio_venta >= ${precioMin}`);
    if (precioMax !== undefined) filters.push(`precio_venta <= ${precioMax}`);
  } else if (operacion === 'renta') {
    if (precioMin !== undefined) filters.push(`precio_alquiler >= ${precioMin}`);
    if (precioMax !== undefined) filters.push(`precio_alquiler <= ${precioMax}`);
  } else {
    if (precioMin !== undefined) filters.push(`precio >= ${precioMin}`);
    if (precioMax !== undefined) filters.push(`precio <= ${precioMax}`);
  }

  // Location
  if (pais) filters.push(`pais = "${pais}"`);
  if (provincia) filters.push(`provincia = "${provincia}"`);
  if (ciudad) filters.push(`ciudad = "${ciudad}"`);
  if (sector) filters.push(`sector = "${sector}"`);

  // Features
  if (destacada !== undefined) filters.push(`destacada = ${destacada}`);
  if (habitacionesMin !== undefined) filters.push(`habitaciones >= ${habitacionesMin}`);
  if (banosMin !== undefined) filters.push(`banos >= ${banosMin}`);
  if (amenidades?.length) {
    amenidades.forEach(a => filters.push(`amenidades_codigos = "${a}"`));
  }

  // Agent
  if (agenteSlug) filters.push(`agente_slug = "${agenteSlug}"`);

  const body: any = {
    q: query,
    limit,
    offset,
    sort,
    filter: filters.join(' AND '),
  };

  if (facets?.length) {
    body.facets = facets;
  }

  const result = await meiliRequest(`/indexes/${PROPIEDADES_INDEX}/search`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  const isRental = operacion === 'renta';

  return {
    properties: (result.hits || []).map((hit: MeiliPropertyDoc) => meiliToProperty(hit, isRental)),
    total: result.estimatedTotalHits || result.totalHits || 0,
    facetDistribution: result.facetDistribution,
  };
}

/**
 * Get a single property by slug via MeiliSearch.
 */
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const result = await meiliRequest(`/indexes/${PROPIEDADES_INDEX}/search`, {
    method: 'POST',
    body: JSON.stringify({
      q: '',
      filter: `slug = "${slug}" AND (${portalFilter()})`,
      limit: 1,
    }),
  });

  const hit = result.hits?.[0];
  return hit ? meiliToProperty(hit) : null;
}

/**
 * Get featured properties.
 */
export async function getFeaturedProperties(limit: number = 12, pais?: string): Promise<Property[]> {
  const filters = [`(${portalFilter()})`, 'destacada = true'];
  if (pais) filters.push(`pais = "${pais}"`);

  const result = await meiliRequest(`/indexes/${PROPIEDADES_INDEX}/search`, {
    method: 'POST',
    body: JSON.stringify({
      q: '',
      filter: filters.join(' AND '),
      sort: ['updated_at:desc'],
      limit,
    }),
  });

  return (result.hits || []).map((hit: MeiliPropertyDoc) => meiliToProperty(hit));
}

/**
 * Get recent properties.
 */
export async function getRecentProperties(limit: number = 12, pais?: string): Promise<Property[]> {
  const filters = [`(${portalFilter()})`];
  if (pais) filters.push(`pais = "${pais}"`);

  const result = await meiliRequest(`/indexes/${PROPIEDADES_INDEX}/search`, {
    method: 'POST',
    body: JSON.stringify({
      q: '',
      filter: filters.join(' AND '),
      sort: ['created_at:desc'],
      limit,
    }),
  });

  return (result.hits || []).map((hit: MeiliPropertyDoc) => meiliToProperty(hit));
}

/**
 * Get properties by agent slug.
 */
export async function getPropertiesByAgent(agentSlug: string, limit: number = 50): Promise<Property[]> {
  const result = await meiliRequest(`/indexes/${PROPIEDADES_INDEX}/search`, {
    method: 'POST',
    body: JSON.stringify({
      q: '',
      filter: `agente_slug = "${agentSlug}" AND (${portalFilter()})`,
      sort: ['destacada:desc', 'created_at:desc'],
      limit,
    }),
  });

  return (result.hits || []).map((hit: MeiliPropertyDoc) => meiliToProperty(hit));
}

/**
 * Get properties by location (city or sector slug).
 */
export async function getPropertiesByLocation(
  locationSlug: string,
  options: { limit?: number; offset?: number; operacion?: string } = {}
): Promise<{ properties: Property[]; total: number }> {
  const { limit = 20, offset = 0, operacion } = options;

  // Normalize slug to match city/sector (replace hyphens with spaces for search)
  const locationName = locationSlug.replace(/-/g, ' ');

  const filters = [`(${portalFilter()})`];
  if (operacion) filters.push(`operaciones = "${operacion}"`);

  // Search by city or sector text
  const result = await meiliRequest(`/indexes/${PROPIEDADES_INDEX}/search`, {
    method: 'POST',
    body: JSON.stringify({
      q: locationName,
      filter: filters.join(' AND '),
      sort: ['destacada:desc', 'updated_at:desc'],
      limit,
      offset,
    }),
  });

  return {
    properties: (result.hits || []).map((hit: MeiliPropertyDoc) => meiliToProperty(hit, operacion === 'renta')),
    total: result.estimatedTotalHits || 0,
  };
}

/**
 * Get similar properties (same city/type, excluding current).
 */
export async function getSimilarProperties(property: Property, limit: number = 6): Promise<Property[]> {
  const filters: string[] = [`(${portalFilter()})`, `id != "${property.id}"`];
  if (property.location.city) {
    filters.push(`ciudad = "${property.location.city}"`);
  }

  const result = await meiliRequest(`/indexes/${PROPIEDADES_INDEX}/search`, {
    method: 'POST',
    body: JSON.stringify({
      q: '',
      filter: filters.join(' AND '),
      sort: ['destacada:desc', 'updated_at:desc'],
      limit,
    }),
  });

  return (result.hits || []).map((hit: MeiliPropertyDoc) => meiliToProperty(hit));
}

/**
 * Get cities with property counts (facet distribution).
 */
export async function getCitiesWithCounts(pais?: string): Promise<Array<{ name: string; slug: string; count: number }>> {
  const filters = [`(${portalFilter()})`];
  if (pais) filters.push(`pais = "${pais}"`);

  const result = await meiliRequest(`/indexes/${PROPIEDADES_INDEX}/search`, {
    method: 'POST',
    body: JSON.stringify({
      q: '',
      filter: filters.join(' AND '),
      facets: ['ciudad'],
      limit: 0,
    }),
  });

  const distribution = result.facetDistribution?.ciudad || {};
  return Object.entries(distribution)
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count: count as number,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get popular locations with property counts and sample images.
 * Compatible with LocationsGrid component.
 */
export async function getLocationsWithStats(pais?: string, maxLocations: number = 12): Promise<
  Array<{ slug: string; name: string; province: string; propertyCount: number; sampleImage: string | null }>
> {
  const filters = [`(${portalFilter()})`];
  if (pais) filters.push(`pais = "${pais}"`);

  // Single query: get facet counts + enough hits to extract sample images per city
  const result = await meiliRequest(`/indexes/${PROPIEDADES_INDEX}/search`, {
    method: 'POST',
    body: JSON.stringify({
      q: '',
      filter: filters.join(' AND '),
      facets: ['ciudad'],
      sort: ['destacada:desc', 'updated_at:desc'],
      limit: 200,
      attributesToRetrieve: ['ciudad', 'provincia', 'imagen_principal'],
    }),
  });

  const distribution = result.facetDistribution?.ciudad || {};
  const hits: Array<{ ciudad: string; provincia: string; imagen_principal: string | null }> = result.hits || [];

  // Build sample image lookup (first image found per city)
  const imageByCity = new Map<string, string>();
  const provinceByCity = new Map<string, string>();
  for (const hit of hits) {
    if (hit.ciudad && !imageByCity.has(hit.ciudad) && hit.imagen_principal) {
      imageByCity.set(hit.ciudad, hit.imagen_principal);
    }
    if (hit.ciudad && !provinceByCity.has(hit.ciudad) && hit.provincia) {
      provinceByCity.set(hit.ciudad, hit.provincia);
    }
  }

  return Object.entries(distribution)
    .map(([name, count]) => ({
      slug: name.toLowerCase().replace(/\s+/g, '-').replace(/'/g, ''),
      name,
      province: provinceByCity.get(name) || '',
      propertyCount: count as number,
      sampleImage: imageByCity.get(name) || null,
    }))
    .sort((a, b) => b.propertyCount - a.propertyCount)
    .slice(0, maxLocations);
}

/**
 * Get total property count for portal.
 */
export async function getTotalPropertyCount(pais?: string): Promise<number> {
  const filters = [`(${portalFilter()})`];
  if (pais) filters.push(`pais = "${pais}"`);

  const result = await meiliRequest(`/indexes/${PROPIEDADES_INDEX}/search`, {
    method: 'POST',
    body: JSON.stringify({
      q: '',
      filter: filters.join(' AND '),
      limit: 0,
    }),
  });

  return result.estimatedTotalHits || result.totalHits || 0;
}

// ============================================================================
// AGENT SEARCH FUNCTIONS
// ============================================================================

/**
 * Search agents that have portal properties.
 * Uses the asesores index — all agents here are from CLIC tenants.
 */
export async function searchAgents(options: {
  query?: string;
  limit?: number;
  offset?: number;
  sort?: string[];
} = {}): Promise<{ agents: Agent[]; total: number }> {
  const { query = '', limit = 50, offset = 0, sort = ['nombre_completo:asc'] } = options;

  const result = await meiliRequest(`/indexes/${ASESORES_INDEX}/search`, {
    method: 'POST',
    body: JSON.stringify({
      q: query,
      filter: 'visible_en_web = true',
      sort,
      limit,
      offset,
    }),
  });

  return {
    agents: (result.hits || []).map((hit: MeiliAgentDoc) => meiliToAgent(hit)),
    total: result.estimatedTotalHits || 0,
  };
}

/**
 * Get a single agent by slug.
 */
export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  const result = await meiliRequest(`/indexes/${ASESORES_INDEX}/search`, {
    method: 'POST',
    body: JSON.stringify({
      q: '',
      filter: `slug = "${slug}" AND visible_en_web = true`,
      limit: 1,
    }),
  });

  const hit = result.hits?.[0];
  return hit ? meiliToAgent(hit) : null;
}

// ============================================================================
// PLATFORM STATS (counts via MeiliSearch)
// ============================================================================

/**
 * Get platform statistics entirely from MeiliSearch.
 */
export async function getPlatformStats(pais?: string): Promise<{
  totalProperties: number;
  totalAgents: number;
  totalCities: number;
}> {
  const propFilters = [`(${portalFilter()})`];
  if (pais) propFilters.push(`pais = "${pais}"`);

  const [propResult, agentResult] = await Promise.all([
    meiliRequest(`/indexes/${PROPIEDADES_INDEX}/search`, {
      method: 'POST',
      body: JSON.stringify({
        q: '',
        filter: propFilters.join(' AND '),
        facets: ['ciudad'],
        limit: 0,
      }),
    }),
    meiliRequest(`/indexes/${ASESORES_INDEX}/search`, {
      method: 'POST',
      body: JSON.stringify({
        q: '',
        filter: 'visible_en_web = true',
        limit: 0,
      }),
    }),
  ]);

  const cities = propResult.facetDistribution?.ciudad || {};

  return {
    totalProperties: propResult.estimatedTotalHits || 0,
    totalAgents: agentResult.estimatedTotalHits || 0,
    totalCities: Object.keys(cities).length,
  };
}
