import type { Property, Agent, PropertyType, TransactionType, PropertyImage, UserType } from '../data/types';
import type { UbikalaAgentRow } from './ubikala-db';

// Tipo de la propiedad que viene de la base de datos
export interface DBProperty {
  id: string;
  tenant_id: string;
  titulo: string;
  slug: string;
  codigo: string;
  descripcion: string;
  tipo: string;
  operacion: string;
  precio: string;
  moneda: string;
  // Rental price (for properties that can be both sale and rent)
  precio_alquiler: string | null;
  moneda_alquiler: string | null;
  // Project ranges
  es_proyecto: boolean;
  precio_min: string | null;
  precio_max: string | null;
  m2_min: string | null;
  m2_max: string | null;
  habitaciones_min: number | null;
  habitaciones_max: number | null;
  banos_min: number | null;
  banos_max: number | null;
  parqueos_min: number | null;
  parqueos_max: number | null;
  // Location
  pais: string;
  provincia: string;
  ciudad: string;
  sector: string;
  direccion: string | null;
  latitud: number | null;
  longitud: number | null;
  // Features
  habitaciones: number;
  banos: number;
  medios_banos: number | null;
  estacionamientos: number;
  m2_construccion: string;
  m2_terreno: string | null;
  pisos: number | null;
  amenidades: string[];
  caracteristicas: {
    agents?: Array<{
      id: number | string;
      full_name?: string;
      nombre?: string;
      slug: string;
      email: string;
      phone?: string;
      telefono?: string;
      whatsapp?: string;
      avatar?: string;
      foto?: string;
      bio?: string;
      company?: number | string;
      verified?: boolean;
      role?: string;
      propertiesCount?: number;
      isUbikalaUser?: boolean;
      parentCompany?: string;
      parentUserId?: string;
      parentUserName?: string;
    }>;
    [key: string]: any;
  };
  imagen_principal: string;
  imagenes: string[];
  video_url: string | null;
  tour_virtual_url: string | null;
  estado_propiedad: string;
  destacada: boolean;
  exclusiva: boolean;
  activo: boolean;
  created_at: string;
  updated_at: string;
  precio_anterior: string | null;
  // Agent data from JOINs
  captador_id?: string;
  captador_nombre?: string;
  captador_apellido?: string;
  captador_email?: string;
  captador_telefono?: string;
  captador_avatar?: string;
  captador_slug?: string;
  captador_foto?: string;
  captador_bio?: string;
  captador_whatsapp?: string;
  captador_titulo?: string;
  captador_especialidades?: string[];
  captador_idiomas?: string[];
  captador_experiencia?: number;
  captador_stats?: {
    calificacion_promedio?: number;
    total_resenas?: number;
    propiedades_activas?: number;
  };
  captador_visible?: boolean;
  empresa_nombre?: string;
  empresa_slug?: string;
}

// Mapeo de tipos de propiedad
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

// Mapeo de operación
const transactionMap: Record<string, TransactionType> = {
  'venta': 'sale',
  'alquiler': 'rent',
  'renta': 'rent',
};

// Transformar propiedad de DB a frontend
export function transformProperty(dbProp: DBProperty, forceRental: boolean = false): Property {
  // Check if we have agent data from JOINs (new method)
  const hasJoinedAgent = dbProp.captador_nombre || dbProp.captador_slug;
  // Fallback to caracteristicas.agents if no joined data
  const legacyAgent = dbProp.caracteristicas?.agents?.[0];

  // Determine if we should use rental price
  const operacionLower = dbProp.operacion?.toLowerCase() || '';
  const isRentalContext = forceRental || operacionLower === 'alquiler' || operacionLower === 'renta' || operacionLower === 'rent';

  // Use rental price if available and context is rental
  const effectivePrice = (isRentalContext && dbProp.precio_alquiler)
    ? parseFloat(dbProp.precio_alquiler)
    : parseFloat(dbProp.precio);

  const effectiveCurrency = (isRentalContext && dbProp.moneda_alquiler)
    ? dbProp.moneda_alquiler
    : dbProp.moneda;

  // Check if it's a project (has price ranges)
  const isProject = dbProp.es_proyecto || (dbProp.precio_min !== null && dbProp.precio_max !== null);

  // Crear imágenes
  const images: PropertyImage[] = [];

  if (dbProp.imagen_principal) {
    images.push({
      url: dbProp.imagen_principal,
      alt: dbProp.titulo,
      isPrimary: true
    });
  }

  // Handle imagenes - could be array or JSON string
  let imagenesArray: string[] = [];
  if (dbProp.imagenes) {
    if (Array.isArray(dbProp.imagenes)) {
      imagenesArray = dbProp.imagenes;
    } else if (typeof dbProp.imagenes === 'string') {
      try {
        imagenesArray = JSON.parse(dbProp.imagenes);
      } catch (e) {
        // Failed to parse imagenes as JSON - ignored
      }
    }
  }

  imagenesArray.forEach((url, index) => {
    // Evitar duplicar la imagen principal
    if (url && url !== dbProp.imagen_principal) {
      images.push({
        url,
        alt: `${dbProp.titulo} - Imagen ${index + 1}`,
        isPrimary: false
      });
    }
  });

  // Si no hay imágenes, usar placeholder
  if (images.length === 0) {
    images.push({
      url: '/images/property-placeholder.svg',
      alt: dbProp.titulo,
      isPrimary: true
    });
  }

  // Determinar si es nueva (menos de 30 días)
  const createdDate = new Date(dbProp.created_at);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const isNew = createdDate > thirtyDaysAgo;

  // Determinar si tiene precio reducido
  const isPriceReduced = dbProp.precio_anterior !== null &&
    parseFloat(dbProp.precio_anterior) > parseFloat(dbProp.precio);

  // Determine transaction type based on context
  const transactionType = isRentalContext ? 'rent' : (transactionMap[operacionLower] || 'sale');

  return {
    id: dbProp.id,
    slug: dbProp.slug,
    title: dbProp.titulo,
    description: dbProp.descripcion,
    type: typeMap[dbProp.tipo?.toLowerCase()] || 'house',
    transactionType,
    status: dbProp.estado_propiedad === 'disponible' ? 'active' :
            dbProp.estado_propiedad === 'vendida' ? 'sold' :
            dbProp.estado_propiedad === 'alquilada' ? 'rented' : 'pending',
    price: effectivePrice,
    currency: (effectiveCurrency?.toUpperCase() === 'DOP' ? 'DOP' : 'USD') as 'USD' | 'DOP',
    pricePerSqm: dbProp.m2_construccion ?
      Math.round(effectivePrice / parseFloat(dbProp.m2_construccion)) : undefined,
    // Rental price (when property has both sale and rent options)
    rentalPrice: dbProp.precio_alquiler ? parseFloat(dbProp.precio_alquiler) : undefined,
    rentalCurrency: dbProp.moneda_alquiler
      ? (dbProp.moneda_alquiler.toUpperCase() === 'DOP' ? 'DOP' : 'USD') as 'USD' | 'DOP'
      : undefined,
    // Project fields
    isProject,
    priceMin: dbProp.precio_min ? parseFloat(dbProp.precio_min) : undefined,
    priceMax: dbProp.precio_max ? parseFloat(dbProp.precio_max) : undefined,
    areaMin: dbProp.m2_min ? parseFloat(dbProp.m2_min) : undefined,
    areaMax: dbProp.m2_max ? parseFloat(dbProp.m2_max) : undefined,
    bedroomsMin: dbProp.habitaciones_min ?? undefined,
    bedroomsMax: dbProp.habitaciones_max ?? undefined,
    bathroomsMin: dbProp.banos_min ?? undefined,
    bathroomsMax: dbProp.banos_max ?? undefined,
    parkingMin: dbProp.parqueos_min ?? undefined,
    parkingMax: dbProp.parqueos_max ?? undefined,
    location: {
      slug: `${dbProp.ciudad?.toLowerCase().replace(/\s+/g, '-')}-${dbProp.sector?.toLowerCase().replace(/\s+/g, '-')}`,
      city: dbProp.ciudad || '',
      sector: dbProp.sector || '',
      province: dbProp.provincia || '',
      country: dbProp.pais || 'República Dominicana',
      latitude: dbProp.latitud || 0,
      longitude: dbProp.longitud || 0,
      address: dbProp.direccion || undefined
    },
    bedrooms: dbProp.habitaciones,
    bathrooms: dbProp.banos,
    parkingSpaces: dbProp.estacionamientos,
    area: parseFloat(dbProp.m2_construccion) || 0,
    landArea: dbProp.m2_terreno ? parseFloat(dbProp.m2_terreno) : undefined,
    yearBuilt: undefined,
    floor: undefined,
    totalFloors: dbProp.pisos || undefined,
    features: dbProp.amenidades || [],
    images,
    videoUrl: dbProp.video_url || undefined,
    virtualTourUrl: dbProp.tour_virtual_url || undefined,
    agent: hasJoinedAgent ? {
      // Use data from JOINs (new method)
      id: dbProp.captador_id || '0',
      slug: dbProp.captador_slug || 'agente',
      name: [dbProp.captador_nombre, dbProp.captador_apellido].filter(Boolean).join(' ') || 'Agente',
      email: dbProp.captador_email || '',
      phone: dbProp.captador_telefono || '',
      whatsapp: dbProp.captador_whatsapp || dbProp.captador_telefono || '',
      photo: dbProp.captador_foto || dbProp.captador_avatar || '/images/agent-placeholder.svg',
      company: dbProp.empresa_nombre || dbProp.captador_titulo || undefined,
      userType: 'agent' as const,
      // Verified = tiene empresa asociada Y está visible en la web
      verified: Boolean(dbProp.empresa_nombre) && (dbProp.captador_visible !== false),
      rating: dbProp.captador_stats?.calificacion_promedio || 5,
      reviewCount: dbProp.captador_stats?.total_resenas || 0,
      experienceYears: dbProp.captador_experiencia || 5,
      languages: dbProp.captador_idiomas || ['es'],
      bio: dbProp.captador_bio || '',
      propertiesCount: dbProp.captador_stats?.propiedades_activas || 0,
      responseTime: 'Responde en menos de 1 hora',
      specializations: (dbProp.captador_especialidades || []).map(e => {
        const map: Record<string, PropertyType> = {
          'casas': 'house', 'casa': 'house', 'residencial': 'house',
          'apartamentos': 'apartment', 'apartamento': 'apartment',
          'villas': 'villa', 'villa': 'villa', 'lujo': 'villa',
          'terrenos': 'land', 'terreno': 'land',
          'comercial': 'commercial', 'inversión': 'commercial', 'inversion': 'commercial'
        };
        return map[e.toLowerCase()] || 'house';
      }),
      locations: []
    } : legacyAgent ? {
      // Fallback to caracteristicas.agents (legacy method or Ubikala properties)
      id: String(legacyAgent.id),
      slug: legacyAgent.slug || 'agente',
      name: legacyAgent.full_name || legacyAgent.nombre || 'Agente',
      email: legacyAgent.email || '',
      phone: legacyAgent.phone || legacyAgent.telefono || '',
      whatsapp: legacyAgent.phone || legacyAgent.whatsapp || '',
      photo: legacyAgent.avatar || legacyAgent.foto || '/images/agent-placeholder.svg',
      company: legacyAgent.company || undefined,
      userType: (legacyAgent.role as any) || 'agent' as const,
      // For Ubikala properties, use the verified field; for legacy portal properties, default to true
      verified: legacyAgent.verified !== undefined ? legacyAgent.verified : true,
      rating: 5,
      reviewCount: 0,
      experienceYears: 5,
      languages: ['es'],
      bio: legacyAgent.bio || '',
      propertiesCount: legacyAgent.propertiesCount || 0,
      responseTime: 'Responde en menos de 1 hora',
      specializations: [],
      locations: [],
      // Flag for Ubikala users to use different URL pattern
      isUbikalaUser: legacyAgent.isUbikalaUser || false,
      // Parent company info for affiliated agents
      parentCompany: legacyAgent.parentCompany || undefined,
      parentUserId: legacyAgent.parentUserId || undefined,
    } : {
      // Default fallback
      id: '0',
      slug: 'ubikala',
      name: 'Ubikala',
      email: 'info@ubikala.com',
      phone: '',
      whatsapp: '',
      photo: '/images/logo.png',
      userType: 'agent' as const,
      verified: true,
      rating: 5,
      reviewCount: 0,
      experienceYears: 10,
      languages: ['es', 'en'],
      bio: '',
      propertiesCount: 0,
      responseTime: 'Responde en menos de 1 hora',
      specializations: [],
      locations: []
    },
    isFeatured: dbProp.destacada,
    isExclusive: dbProp.exclusiva,
    isNew,
    isPriceReduced,
    previousPrice: dbProp.precio_anterior ? parseFloat(dbProp.precio_anterior) : undefined,
    views: 0,
    createdAt: dbProp.created_at,
    updatedAt: dbProp.updated_at
  };
}

// Transformar array de propiedades
export function transformProperties(dbProps: DBProperty[], forceRental: boolean = false): Property[] {
  return dbProps.map(prop => transformProperty(prop, forceRental));
}

// Tipo de agente de la base de datos
export interface DBAgent {
  id: string;
  usuario_id: string;
  tenant_id: string;
  // From usuarios table
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  avatar_url: string;
  // From perfiles_asesor table
  slug: string;
  titulo_profesional: string;
  biografia: string;
  foto_url: string;
  whatsapp: string;
  telefono_directo: string;
  especialidades: string[];
  idiomas: string[];
  zonas: string[];
  experiencia_anos: number;
  stats: {
    propiedades_activas: number;
    propiedades_vendidas: number;
    calificacion_promedio: number;
    total_resenas: number;
  };
  redes_sociales: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
  activo: boolean;
  destacado: boolean;
  visible_en_web: boolean;
  // From tenant join
  company_name?: string;
  real_property_count?: number;
}

// Transformar agente de DB a frontend
export function transformAgent(dbAgent: DBAgent): Agent {
  // Construir nombre completo desde nombre y apellido
  const fullName = [dbAgent.nombre, dbAgent.apellido].filter(Boolean).join(' ') || 'Agente';

  // Mapeo de idiomas
  const languageMap: Record<string, string> = {
    'es': 'Español',
    'en': 'English',
    'fr': 'Français',
    'de': 'Deutsch',
    'pt': 'Português'
  };

  // Use real property count if available, otherwise fall back to stats
  const propertyCount = dbAgent.real_property_count !== undefined
    ? Number(dbAgent.real_property_count)
    : (dbAgent.stats?.propiedades_activas || 0);

  // Use company_name from tenant if available, otherwise use titulo_profesional
  const company = dbAgent.company_name || dbAgent.titulo_profesional || undefined;

  return {
    id: String(dbAgent.id),
    slug: dbAgent.slug,
    name: fullName,
    email: dbAgent.email || '',
    phone: dbAgent.telefono_directo || dbAgent.telefono || '',
    whatsapp: dbAgent.whatsapp || dbAgent.telefono_directo || dbAgent.telefono || '',
    photo: dbAgent.foto_url || dbAgent.avatar_url || '/images/agent-placeholder.svg',
    company,
    userType: 'agent',
    verified: true,
    rating: dbAgent.stats?.calificacion_promedio || 5,
    reviewCount: dbAgent.stats?.total_resenas || 0,
    experienceYears: dbAgent.experiencia_anos || 5,
    languages: (dbAgent.idiomas || ['es']).map(code => languageMap[code] || code),
    bio: dbAgent.biografia || '',
    propertiesCount: propertyCount,
    responseTime: 'menos de 1 hora',
    specializations: (dbAgent.especialidades || []).map(e => {
      const map: Record<string, PropertyType> = {
        'casas': 'house',
        'casa': 'house',
        'residencial': 'house',
        'apartamentos': 'apartment',
        'apartamento': 'apartment',
        'villas': 'villa',
        'villa': 'villa',
        'lujo': 'villa',
        'terrenos': 'land',
        'terreno': 'land',
        'comercial': 'commercial',
        'inversión': 'commercial',
        'inversion': 'commercial'
      };
      return map[e.toLowerCase()] || 'house';
    }),
    locations: dbAgent.zonas || [],
    socialMedia: dbAgent.redes_sociales ? {
      instagram: dbAgent.redes_sociales.instagram,
      facebook: dbAgent.redes_sociales.facebook,
      linkedin: dbAgent.redes_sociales.linkedin
    } : undefined
  };
}

// Transformar array de agentes
export function transformAgents(dbAgents: DBAgent[]): Agent[] {
  return dbAgents.map(transformAgent);
}

// Helper to generate Ubikala user slug
function generateUbikalaSlug(name: string, id: string): string {
  const slugName = name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `ubk-${slugName}-${id.substring(0, 8)}`;
}

// Transformar usuario Ubikala a Agent (para listados públicos)
export function transformUbikalaAgent(row: UbikalaAgentRow): Agent {
  const roleToUserType: Record<string, UserType> = {
    'inmobiliaria': 'agent',
    'asesor_independiente': 'independent',
    'propietario': 'owner',
  };

  const userType = roleToUserType[row.role] || 'owner';

  // Company label: for inmobiliarias use company_name, for affiliated agents use parent company
  let company: string | undefined;
  if (row.role === 'inmobiliaria') {
    company = row.company_name || undefined;
  } else if (row.parent_company_name) {
    company = row.parent_company_name;
  }

  return {
    id: row.id,
    slug: generateUbikalaSlug(row.name, row.id),
    name: row.name,
    email: row.email || '',
    phone: row.phone || '',
    whatsapp: row.phone || '',
    photo: row.avatar_url || '/images/agent-placeholder.svg',
    company,
    userType,
    verified: row.is_verified,
    rating: 5,
    reviewCount: 0,
    experienceYears: Math.max(1, Math.floor((Date.now() - new Date(row.created_at).getTime()) / (365.25 * 24 * 60 * 60 * 1000))),
    languages: ['Español'],
    bio: row.bio || '',
    propertiesCount: Number(row.properties_count) || 0,
    responseTime: 'menos de 1 hora',
    specializations: [],
    locations: [],
    isUbikalaUser: true,
    parentCompany: row.parent_company_name || undefined,
    parentUserId: row.parent_user_id || undefined,
  };
}

// Transformar array de usuarios Ubikala a Agent
export function transformUbikalaAgents(rows: UbikalaAgentRow[]): Agent[] {
  return rows.map(transformUbikalaAgent);
}
