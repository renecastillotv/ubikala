import { neon } from '@neondatabase/serverless';
import { getUbikalaProperties, getUbikalaPropertyBySlug, type UbikalaProperty } from './ubikala-db';

// Conexión a Neon PostgreSQL (CLIC DB - read only)
const DATABASE_URL = import.meta.env.DATABASE_URL || process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('[DB] DATABASE_URL is not configured!');
}

const sql = DATABASE_URL ? neon(DATABASE_URL) : null;

// Tipos base para las tablas
export interface Property {
  id: number;
  tenant_id: number;
  titulo: string;
  slug: string;
  codigo: string;
  descripcion: string;
  tipo: string;
  operacion: string;
  precio: number;
  moneda: string;
  ubicacion: {
    pais: string;
    provincia: string;
    ciudad: string;
    sector: string;
    direccion: string;
    latitud: number;
    longitud: number;
    slug: string;
  };
  caracteristicas: {
    habitaciones: number;
    banos: number;
    parqueos: number;
    area_construida: number;
    area_terreno: number;
    amenidades: string[];
    agents?: {
      id: number;
      nombre: string;
      telefono: string;
      whatsapp: string;
      email: string;
      foto: string;
      slug: string;
    }[];
  };
  imagenes: string[];
  portales: Record<string, boolean>;
  activo: boolean;
  destacada: boolean;
  created_at: string;
  updated_at: string;
}

export interface Agent {
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
}

export interface Location {
  id: number;
  nombre: string;
  slug: string;
  tipo: string;
  nivel: number;
  parent_id: number | null;
  pais: string;
  provincia: string;
  ciudad: string;
  sector: string;
  seo_title: string;
  seo_description: string;
  imagen: string;
  activo: boolean;
}

// Portal filter - propiedades habilitadas para ubikala
// Try ubikala first, fallback to propiedadenrd, or show all active if portales is empty
const PORTAL_FILTER = `(
  portales @> '{"ubikala": true}'::jsonb
  OR portales @> '{"propiedadenrd": true}'::jsonb
  OR portales IS NULL
  OR portales = '{}'::jsonb
)`;

// Helper function to convert Ubikala property to Property interface
function ubikalaToProperty(up: UbikalaProperty): Property {
  // Build agents array with owner info if available
  const agents = up.owner_name ? [{
    id: 0,
    nombre: up.owner_name,
    telefono: up.owner_phone || up.contacto_telefono || '',
    whatsapp: up.contacto_whatsapp || up.owner_phone || '',
    email: up.owner_email || up.contacto_email || '',
    foto: up.owner_avatar || '/images/agent-placeholder.svg',
    slug: 'propietario',
    verified: up.owner_verified || false,
    company: up.owner_company_name || undefined,
    role: up.owner_role || 'propietario',
  }] : [];

  return {
    id: parseInt(up.id) || 0,
    tenant_id: 0,
    titulo: up.titulo,
    slug: up.slug,
    codigo: up.codigo || '',
    descripcion: up.descripcion || '',
    tipo: up.tipo,
    operacion: up.operacion,
    precio: Number(up.precio),
    moneda: up.moneda || 'USD',
    ubicacion: {
      pais: up.pais || 'República Dominicana',
      provincia: up.provincia || '',
      ciudad: up.ciudad || '',
      sector: up.sector || '',
      direccion: up.direccion || '',
      latitud: Number(up.latitud) || 0,
      longitud: Number(up.longitud) || 0,
      slug: up.ciudad?.toLowerCase().replace(/\s+/g, '-') || '',
    },
    caracteristicas: {
      habitaciones: up.habitaciones || 0,
      banos: up.banos || 0,
      parqueos: up.estacionamientos || 0,
      area_construida: Number(up.m2_construccion) || 0,
      area_terreno: Number(up.m2_terreno) || 0,
      amenidades: up.amenidades || [],
      agents: agents.length > 0 ? agents : undefined,
    },
    imagenes: up.imagenes || [],
    portales: { ubikala: true },
    activo: up.activo,
    destacada: up.destacada,
    created_at: up.created_at,
    updated_at: up.updated_at,
    // Additional fields for display
    imagen_principal: up.imagen_principal,
    source: 'ubikala',
    // Owner verification flag for Ubikala properties
    owner_verified: up.owner_verified || false,
  } as Property;
}

// Queries de solo lectura para propiedades
export async function getProperties(options: {
  limit?: number;
  offset?: number;
  tipo?: string;
  operacion?: string;
  ciudad?: string;
  minPrice?: number;
  maxPrice?: number;
  habitaciones?: number;
  destacado?: boolean;
} = {}) {
  if (!sql) {
    console.error('[getProperties] DATABASE_URL not configured');
    return [];
  }

  const {
    limit = 20,
    offset = 0,
    tipo,
    operacion,
    ciudad,
    minPrice,
    maxPrice,
    habitaciones,
    destacado
  } = options;

  let query = `
    SELECT
      p.*,
      -- Agent info from usuarios
      u.nombre as captador_nombre,
      u.apellido as captador_apellido,
      u.email as captador_email,
      u.telefono as captador_telefono,
      u.avatar_url as captador_avatar,
      -- Agent profile info
      pa.slug as captador_slug,
      pa.foto_url as captador_foto,
      pa.biografia as captador_bio,
      pa.whatsapp as captador_whatsapp,
      pa.titulo_profesional as captador_titulo,
      pa.especialidades as captador_especialidades,
      pa.idiomas as captador_idiomas,
      pa.experiencia_anos as captador_experiencia,
      pa.stats as captador_stats,
      pa.visible_en_web as captador_visible,
      -- Company info from tenants
      t.nombre as empresa_nombre,
      t.slug as empresa_slug
    FROM propiedades p
    LEFT JOIN usuarios u ON p.captador_id = u.id
    LEFT JOIN perfiles_asesor pa ON u.id = pa.usuario_id AND pa.tenant_id = p.tenant_id
    LEFT JOIN tenants t ON pa.tenant_id = t.id
    WHERE p.activo = true
    AND (p.portales @> '{"ubikala": true}'::jsonb OR p.portales @> '{"propiedadenrd": true}'::jsonb OR p.portales IS NULL OR p.portales = '{}'::jsonb)
  `;

  const params: any[] = [];
  let paramIndex = 1;

  if (tipo) {
    query += ` AND p.tipo = $${paramIndex++}`;
    params.push(tipo);
  }

  if (operacion) {
    // Use ILIKE for case-insensitive matching and support aliases
    if (operacion.toLowerCase() === 'alquiler') {
      query += ` AND (LOWER(p.operacion) = 'alquiler' OR LOWER(p.operacion) = 'renta' OR LOWER(p.operacion) = 'rent')`;
    } else if (operacion.toLowerCase() === 'venta') {
      query += ` AND (LOWER(p.operacion) = 'venta' OR LOWER(p.operacion) = 'sale')`;
    } else {
      query += ` AND LOWER(p.operacion) = $${paramIndex++}`;
      params.push(operacion.toLowerCase());
    }
  }

  if (ciudad) {
    query += ` AND p.ciudad ILIKE $${paramIndex++}`;
    params.push(`%${ciudad}%`);
  }

  if (minPrice) {
    query += ` AND p.precio::numeric >= $${paramIndex++}`;
    params.push(minPrice);
  }

  if (maxPrice) {
    query += ` AND p.precio::numeric <= $${paramIndex++}`;
    params.push(maxPrice);
  }

  if (habitaciones) {
    query += ` AND p.habitaciones >= $${paramIndex++}`;
    params.push(habitaciones);
  }

  if (destacado) {
    query += ` AND p.destacada = true`;
  }

  query += ` ORDER BY p.destacada DESC, p.created_at DESC`;
  query += ` LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
  params.push(limit, offset);

  const rows = await sql(query, params);
  return rows as Property[];
}

export async function getPropertyBySlug(slug: string) {
  const rows = await sql`
    SELECT
      p.*,
      u.nombre as captador_nombre,
      u.apellido as captador_apellido,
      u.email as captador_email,
      u.telefono as captador_telefono,
      u.avatar_url as captador_avatar,
      pa.slug as captador_slug,
      pa.foto_url as captador_foto,
      pa.biografia as captador_bio,
      pa.whatsapp as captador_whatsapp,
      pa.titulo_profesional as captador_titulo,
      pa.especialidades as captador_especialidades,
      pa.idiomas as captador_idiomas,
      pa.experiencia_anos as captador_experiencia,
      pa.stats as captador_stats,
      pa.visible_en_web as captador_visible,
      t.nombre as empresa_nombre,
      t.slug as empresa_slug
    FROM propiedades p
    LEFT JOIN usuarios u ON p.captador_id = u.id
    LEFT JOIN perfiles_asesor pa ON u.id = pa.usuario_id AND pa.tenant_id = p.tenant_id
    LEFT JOIN tenants t ON pa.tenant_id = t.id
    WHERE p.slug = ${slug}
    AND p.activo = true
    AND (p.portales @> '{"ubikala": true}'::jsonb OR p.portales @> '{"propiedadenrd": true}'::jsonb OR p.portales IS NULL OR p.portales = '{}'::jsonb)
    LIMIT 1
  `;
  return rows[0] as Property | undefined;
}

export async function getFeaturedProperties(limit = 6) {
  // Dual-read: Get featured from both CLIC and Ubikala with error handling
  const clicPromise = sql ? sql`
    SELECT
      p.*,
      u.nombre as captador_nombre,
      u.apellido as captador_apellido,
      u.email as captador_email,
      u.telefono as captador_telefono,
      u.avatar_url as captador_avatar,
      pa.slug as captador_slug,
      pa.foto_url as captador_foto,
      pa.biografia as captador_bio,
      pa.whatsapp as captador_whatsapp,
      pa.titulo_profesional as captador_titulo,
      pa.stats as captador_stats,
      t.nombre as empresa_nombre,
      t.slug as empresa_slug,
      'clic' as source
    FROM propiedades p
    LEFT JOIN usuarios u ON p.captador_id = u.id
    LEFT JOIN perfiles_asesor pa ON u.id = pa.usuario_id AND pa.tenant_id = p.tenant_id
    LEFT JOIN tenants t ON pa.tenant_id = t.id
    WHERE p.activo = true
    AND p.destacada = true
    AND (p.portales @> '{"ubikala": true}'::jsonb OR p.portales @> '{"propiedadenrd": true}'::jsonb OR p.portales IS NULL OR p.portales = '{}'::jsonb)
    ORDER BY p.created_at DESC
    LIMIT ${limit}
  ` : Promise.resolve([]);

  const [clicResult, ubikalaResult] = await Promise.allSettled([
    clicPromise,
    getUbikalaProperties({ limit, activo: true }).then(props =>
      props.filter(p => p.destacada).map(ubikalaToProperty)
    )
  ]);

  // Extract results with fallback to empty arrays
  const clicRows = clicResult.status === 'fulfilled' ? (clicResult.value as Property[]) : [];
  const ubikalaRows = ubikalaResult.status === 'fulfilled' ? ubikalaResult.value : [];

  // Log for debugging
  console.log(`[getFeaturedProperties] CLIC: ${clicRows.length} rows, Ubikala: ${ubikalaRows.length} rows`);

  // Log errors for debugging
  if (clicResult.status === 'rejected') {
    console.error('[getFeaturedProperties] CLIC DB error:', clicResult.reason);
  }
  if (ubikalaResult.status === 'rejected') {
    console.error('[getFeaturedProperties] Ubikala DB error:', ubikalaResult.reason);
  }

  // Merge and sort by created_at
  const merged = [...clicRows, ...ubikalaRows]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);

  return merged;
}

export async function getRecentProperties(limit = 12) {
  // Dual-read: Get recent from both CLIC and Ubikala with error handling
  const clicPromise = sql ? sql`
    SELECT
      p.*,
      u.nombre as captador_nombre,
      u.apellido as captador_apellido,
      u.email as captador_email,
      u.telefono as captador_telefono,
      u.avatar_url as captador_avatar,
      pa.slug as captador_slug,
      pa.foto_url as captador_foto,
      pa.biografia as captador_bio,
      pa.whatsapp as captador_whatsapp,
      pa.titulo_profesional as captador_titulo,
      pa.stats as captador_stats,
      t.nombre as empresa_nombre,
      t.slug as empresa_slug,
      'clic' as source
    FROM propiedades p
    LEFT JOIN usuarios u ON p.captador_id = u.id
    LEFT JOIN perfiles_asesor pa ON u.id = pa.usuario_id AND pa.tenant_id = p.tenant_id
    LEFT JOIN tenants t ON pa.tenant_id = t.id
    WHERE p.activo = true
    AND (p.portales @> '{"ubikala": true}'::jsonb OR p.portales @> '{"propiedadenrd": true}'::jsonb OR p.portales IS NULL OR p.portales = '{}'::jsonb)
    ORDER BY p.created_at DESC
    LIMIT ${limit}
  ` : Promise.resolve([]);

  const [clicResult, ubikalaResult] = await Promise.allSettled([
    clicPromise,
    getUbikalaProperties({ limit, activo: true }).then(props =>
      props.map(ubikalaToProperty)
    )
  ]);

  // Extract results with fallback to empty arrays
  const clicRows = clicResult.status === 'fulfilled' ? (clicResult.value as Property[]) : [];
  const ubikalaRows = ubikalaResult.status === 'fulfilled' ? ubikalaResult.value : [];

  // Log for debugging
  console.log(`[getRecentProperties] CLIC: ${clicRows.length} rows, Ubikala: ${ubikalaRows.length} rows`);

  // Log errors for debugging
  if (clicResult.status === 'rejected') {
    console.error('[getRecentProperties] CLIC DB error:', clicResult.reason);
  }
  if (ubikalaResult.status === 'rejected') {
    console.error('[getRecentProperties] Ubikala DB error:', ubikalaResult.reason);
  }

  // Merge and sort by created_at
  const merged = [...clicRows, ...ubikalaRows]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);

  return merged;
}

export async function getPropertiesCount(options: {
  tipo?: string;
  operacion?: string;
  ciudad?: string;
} = {}) {
  const { tipo, operacion, ciudad } = options;

  let query = `
    SELECT COUNT(*) as total FROM propiedades
    WHERE activo = true
    AND ${PORTAL_FILTER}
  `;

  const params: any[] = [];
  let paramIndex = 1;

  if (tipo) {
    query += ` AND tipo = $${paramIndex++}`;
    params.push(tipo);
  }

  if (operacion) {
    // Use same case-insensitive matching as getProperties
    if (operacion.toLowerCase() === 'alquiler') {
      query += ` AND (LOWER(operacion) = 'alquiler' OR LOWER(operacion) = 'renta' OR LOWER(operacion) = 'rent')`;
    } else if (operacion.toLowerCase() === 'venta') {
      query += ` AND (LOWER(operacion) = 'venta' OR LOWER(operacion) = 'sale')`;
    } else {
      query += ` AND LOWER(operacion) = $${paramIndex++}`;
      params.push(operacion.toLowerCase());
    }
  }

  if (ciudad) {
    query += ` AND ciudad ILIKE $${paramIndex++}`;
    params.push(`%${ciudad}%`);
  }

  const rows = await sql(query, params);
  return parseInt(rows[0]?.total || '0');
}

// Queries para agentes
export async function getAgents(options: {
  limit?: number;
  offset?: number;
  zona?: string;
  destacado?: boolean;
} = {}) {
  if (!sql) {
    console.error('[getAgents] DATABASE_URL not configured');
    return [];
  }

  const { limit = 20, offset = 0, zona, destacado } = options;

  // Get agents with real property count calculated from actual properties
  let query = `
    SELECT
      pa.id,
      pa.usuario_id,
      pa.tenant_id,
      pa.slug,
      pa.titulo_profesional,
      pa.biografia,
      pa.foto_url,
      pa.whatsapp,
      pa.telefono_directo,
      pa.especialidades,
      pa.idiomas,
      pa.zonas,
      pa.experiencia_anos,
      pa.redes_sociales,
      pa.activo,
      pa.destacado,
      pa.visible_en_web,
      u.nombre,
      u.apellido,
      u.email,
      u.telefono,
      u.avatar_url,
      -- Calculate real property count
      (
        SELECT COUNT(*)
        FROM propiedades p
        WHERE p.activo = true
        AND (p.portales @> '{"ubikala": true}'::jsonb OR p.portales @> '{"propiedadenrd": true}'::jsonb OR p.portales IS NULL OR p.portales = '{}'::jsonb)
        AND EXISTS (
          SELECT 1 FROM jsonb_array_elements(p.caracteristicas->'agents') AS agent
          WHERE agent->>'slug' = pa.slug
        )
      ) as real_property_count,
      -- Build stats with real count
      jsonb_build_object(
        'propiedades_activas', (
          SELECT COUNT(*)
          FROM propiedades p
          WHERE p.activo = true
          AND (p.portales @> '{"ubikala": true}'::jsonb OR p.portales @> '{"propiedadenrd": true}'::jsonb OR p.portales IS NULL OR p.portales = '{}'::jsonb)
          AND EXISTS (
            SELECT 1 FROM jsonb_array_elements(p.caracteristicas->'agents') AS agent
            WHERE agent->>'slug' = pa.slug
          )
        ),
        'propiedades_vendidas', COALESCE((pa.stats->>'propiedades_vendidas')::int, 0),
        'calificacion_promedio', COALESCE((pa.stats->>'calificacion_promedio')::numeric, 5),
        'total_resenas', COALESCE((pa.stats->>'total_resenas')::int, 0)
      ) as stats
    FROM perfiles_asesor pa
    JOIN usuarios u ON pa.usuario_id = u.id
    WHERE pa.activo = true
    AND pa.visible_en_web = true
    AND EXISTS (
      SELECT 1 FROM propiedades p
      WHERE p.activo = true
      AND (p.portales @> '{"ubikala": true}'::jsonb OR p.portales @> '{"propiedadenrd": true}'::jsonb OR p.portales IS NULL OR p.portales = '{}'::jsonb)
      AND EXISTS (
        SELECT 1 FROM jsonb_array_elements(p.caracteristicas->'agents') AS agent
        WHERE agent->>'slug' = pa.slug
      )
    )
  `;

  const params: any[] = [];
  let paramIndex = 1;

  if (zona) {
    query += ` AND pa.zonas @> $${paramIndex++}::jsonb`;
    params.push(JSON.stringify([zona]));
  }

  if (destacado) {
    query += ` AND pa.destacado = true`;
  }

  query += ` ORDER BY pa.destacado DESC, real_property_count DESC NULLS LAST`;
  query += ` LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
  params.push(limit, offset);

  const rows = await sql(query, params);
  return rows as Agent[];
}

export async function getAgentBySlug(slug: string) {
  const rows = await sql`
    SELECT
      pa.id,
      pa.usuario_id,
      pa.tenant_id,
      pa.slug,
      pa.titulo_profesional,
      pa.biografia,
      pa.foto_url,
      pa.whatsapp,
      pa.telefono_directo,
      pa.especialidades,
      pa.idiomas,
      pa.zonas,
      pa.experiencia_anos,
      pa.redes_sociales,
      pa.activo,
      pa.destacado,
      pa.visible_en_web,
      u.nombre,
      u.apellido,
      u.email,
      u.telefono,
      u.avatar_url,
      -- Get company name from tenant
      t.nombre as company_name,
      -- Calculate real property count (by captador_id OR legacy caracteristicas.agents)
      (
        SELECT COUNT(*)
        FROM propiedades p
        WHERE p.activo = true
        AND (p.portales @> '{"ubikala": true}'::jsonb OR p.portales @> '{"propiedadenrd": true}'::jsonb OR p.portales IS NULL OR p.portales = '{}'::jsonb)
        AND (
          p.captador_id = pa.usuario_id
          OR EXISTS (
            SELECT 1 FROM jsonb_array_elements(p.caracteristicas->'agents') AS agent
            WHERE agent->>'slug' = pa.slug
          )
        )
      ) as real_property_count,
      -- Build stats with real count
      jsonb_build_object(
        'propiedades_activas', (
          SELECT COUNT(*)
          FROM propiedades p
          WHERE p.activo = true
          AND (p.portales @> '{"ubikala": true}'::jsonb OR p.portales @> '{"propiedadenrd": true}'::jsonb OR p.portales IS NULL OR p.portales = '{}'::jsonb)
          AND (
            p.captador_id = pa.usuario_id
            OR EXISTS (
              SELECT 1 FROM jsonb_array_elements(p.caracteristicas->'agents') AS agent
              WHERE agent->>'slug' = pa.slug
            )
          )
        ),
        'propiedades_vendidas', COALESCE((pa.stats->>'propiedades_vendidas')::int, 0),
        'calificacion_promedio', COALESCE((pa.stats->>'calificacion_promedio')::numeric, 5),
        'total_resenas', COALESCE((pa.stats->>'total_resenas')::int, 0)
      ) as stats
    FROM perfiles_asesor pa
    JOIN usuarios u ON pa.usuario_id = u.id
    LEFT JOIN tenants t ON pa.tenant_id = t.id
    WHERE pa.slug = ${slug}
    AND pa.activo = true
    LIMIT 1
  `;
  return rows[0] as Agent | undefined;
}

export async function getAgentProperties(agentSlug: string, agentEmail?: string, limit = 12) {
  // Search by captador_id via perfiles_asesor slug
  const rows = await sql`
    SELECT
      p.*,
      u.nombre as captador_nombre,
      u.apellido as captador_apellido,
      u.email as captador_email,
      u.telefono as captador_telefono,
      u.avatar_url as captador_avatar,
      pa.slug as captador_slug,
      pa.foto_url as captador_foto,
      pa.biografia as captador_bio,
      pa.whatsapp as captador_whatsapp,
      pa.titulo_profesional as captador_titulo,
      pa.stats as captador_stats,
      t.nombre as empresa_nombre,
      t.slug as empresa_slug
    FROM propiedades p
    LEFT JOIN usuarios u ON p.captador_id = u.id
    LEFT JOIN perfiles_asesor pa ON u.id = pa.usuario_id AND pa.tenant_id = p.tenant_id
    LEFT JOIN tenants t ON pa.tenant_id = t.id
    WHERE p.activo = true
    AND (p.portales @> '{"ubikala": true}'::jsonb OR p.portales @> '{"propiedadenrd": true}'::jsonb OR p.portales IS NULL OR p.portales = '{}'::jsonb)
    AND pa.slug = ${agentSlug}
    ORDER BY p.destacada DESC, p.created_at DESC
    LIMIT ${limit}
  `;

  // If no properties found by slug and we have an email, try searching by email
  if (rows.length === 0 && agentEmail) {
    const emailRows = await sql`
      SELECT
        p.*,
        u.nombre as captador_nombre,
        u.apellido as captador_apellido,
        u.email as captador_email,
        u.telefono as captador_telefono,
        u.avatar_url as captador_avatar,
        pa.slug as captador_slug,
        pa.foto_url as captador_foto,
        pa.biografia as captador_bio,
        pa.whatsapp as captador_whatsapp,
        pa.titulo_profesional as captador_titulo,
        pa.stats as captador_stats,
        t.nombre as empresa_nombre,
        t.slug as empresa_slug
      FROM propiedades p
      LEFT JOIN usuarios u ON p.captador_id = u.id
      LEFT JOIN perfiles_asesor pa ON u.id = pa.usuario_id AND pa.tenant_id = p.tenant_id
      LEFT JOIN tenants t ON pa.tenant_id = t.id
      WHERE p.activo = true
      AND (p.portales @> '{"ubikala": true}'::jsonb OR p.portales @> '{"propiedadenrd": true}'::jsonb OR p.portales IS NULL OR p.portales = '{}'::jsonb)
      AND u.email = ${agentEmail}
      ORDER BY p.destacada DESC, p.created_at DESC
      LIMIT ${limit}
    `;
    return emailRows as Property[];
  }

  return rows as Property[];
}

// Queries para ubicaciones
export async function getLocations(options: {
  nivel?: number;
  parentId?: number;
} = {}) {
  const { nivel, parentId } = options;

  let query = `SELECT * FROM ubicaciones WHERE activo = true`;
  const params: any[] = [];
  let paramIndex = 1;

  if (nivel !== undefined) {
    query += ` AND nivel = $${paramIndex++}`;
    params.push(nivel);
  }

  if (parentId !== undefined) {
    query += ` AND parent_id = $${paramIndex++}`;
    params.push(parentId);
  }

  query += ` ORDER BY nombre ASC`;

  const rows = await sql(query, params);
  return rows as Location[];
}

export async function getLocationBySlug(slug: string) {
  const rows = await sql`
    SELECT * FROM ubicaciones
    WHERE slug = ${slug}
    AND activo = true
    LIMIT 1
  `;
  return rows[0] as Location | undefined;
}

export async function getPropertiesByLocation(locationSlug: string, limit = 20, offset = 0) {
  const rows = await sql`
    SELECT
      p.*,
      u.nombre as captador_nombre,
      u.apellido as captador_apellido,
      u.email as captador_email,
      u.telefono as captador_telefono,
      u.avatar_url as captador_avatar,
      pa.slug as captador_slug,
      pa.foto_url as captador_foto,
      pa.biografia as captador_bio,
      pa.whatsapp as captador_whatsapp,
      pa.titulo_profesional as captador_titulo,
      pa.stats as captador_stats,
      t.nombre as empresa_nombre,
      t.slug as empresa_slug
    FROM propiedades p
    LEFT JOIN usuarios u ON p.captador_id = u.id
    LEFT JOIN perfiles_asesor pa ON u.id = pa.usuario_id AND pa.tenant_id = p.tenant_id
    LEFT JOIN tenants t ON pa.tenant_id = t.id
    WHERE p.activo = true
    AND (p.portales @> '{"ubikala": true}'::jsonb OR p.portales @> '{"propiedadenrd": true}'::jsonb OR p.portales IS NULL OR p.portales = '{}'::jsonb)
    AND (
      LOWER(REPLACE(p.ciudad, ' ', '-')) = ${locationSlug}
      OR LOWER(REPLACE(p.sector, ' ', '-')) = ${locationSlug}
      OR LOWER(REPLACE(p.provincia, ' ', '-')) = ${locationSlug}
      OR p.ciudad ILIKE ${`%${locationSlug.replace(/-/g, ' ')}%`}
    )
    ORDER BY p.destacada DESC, p.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;
  return rows as Property[];
}

// Stats cache
export async function getLocationStats(locationSlug: string, tenantId?: number) {
  let query = `
    SELECT * FROM stats_cache
    WHERE ubicacion_slug = $1
  `;
  const params: any[] = [locationSlug];

  if (tenantId) {
    query += ` AND tenant_id = $2`;
    params.push(tenantId);
  }

  query += ` LIMIT 1`;

  const rows = await sql(query, params);
  return rows[0];
}

// ============================================
// FUNCIONES CONSISTENTES PARA CONTEOS Y PAGINACIÓN
// ============================================

export interface LocationWithStats {
  slug: string;
  name: string;
  province: string;
  propertyCount: number;
  sampleImage: string | null;
}

/**
 * Obtiene las ubicaciones populares con conteo que coincide con la página de listado
 * y una imagen de muestra de las propiedades reales
 */
export async function getPopularLocationsWithStats(): Promise<LocationWithStats[]> {
  // First get unique cities with sample images
  const rows = await sql`
    SELECT DISTINCT ON (ciudad)
      ciudad as name,
      provincia as province,
      LOWER(REPLACE(REPLACE(ciudad, ' ', '-'), '''', '')) as slug,
      (
        SELECT imagen_principal
        FROM propiedades p2
        WHERE p2.ciudad = p.ciudad
        AND p2.activo = true
        AND (p2.portales @> '{"ubikala": true}'::jsonb OR p2.portales @> '{"propiedadenrd": true}'::jsonb OR p2.portales IS NULL OR p2.portales = '{}'::jsonb)
        AND p2.imagen_principal IS NOT NULL
        AND p2.imagen_principal != ''
        ORDER BY p2.destacada DESC, p2.created_at DESC
        LIMIT 1
      ) as sample_image
    FROM propiedades p
    WHERE activo = true
    AND (portales @> '{"ubikala": true}'::jsonb OR portales @> '{"propiedadenrd": true}'::jsonb OR portales IS NULL OR portales = '{}'::jsonb)
    AND ciudad IS NOT NULL
    AND ciudad != ''
    GROUP BY ciudad, provincia
  `;

  // For each city, get the count using the same criteria as getPropertiesByLocation
  const locationsWithCounts = await Promise.all(
    rows.map(async (row: any) => {
      const slug = row.slug;
      const countResult = await sql`
        SELECT COUNT(*) as count
        FROM propiedades
        WHERE activo = true
        AND (portales @> '{"ubikala": true}'::jsonb OR portales @> '{"propiedadenrd": true}'::jsonb OR portales IS NULL OR portales = '{}'::jsonb)
        AND (
          LOWER(REPLACE(ciudad, ' ', '-')) = ${slug}
          OR LOWER(REPLACE(sector, ' ', '-')) = ${slug}
          OR LOWER(REPLACE(provincia, ' ', '-')) = ${slug}
          OR ciudad ILIKE ${`%${slug.replace(/-/g, ' ')}%`}
        )
      `;
      return {
        slug: slug,
        name: row.name,
        province: row.province || 'República Dominicana',
        propertyCount: parseInt(countResult[0]?.count || '0'),
        sampleImage: row.sample_image || null
      };
    })
  );

  // Sort by count and return top 12
  return locationsWithCounts
    .sort((a, b) => b.propertyCount - a.propertyCount)
    .slice(0, 12);
}

/**
 * Obtiene conteo de propiedades por ubicación de forma consistente
 * Usa el mismo criterio de matching que getPropertiesByLocation
 */
export async function getLocationPropertyCount(locationSlug: string): Promise<number> {
  const rows = await sql`
    SELECT COUNT(*) as total
    FROM propiedades
    WHERE activo = true
    AND (portales @> '{"ubikala": true}'::jsonb OR portales @> '{"propiedadenrd": true}'::jsonb OR portales IS NULL OR portales = '{}'::jsonb)
    AND (
      LOWER(REPLACE(ciudad, ' ', '-')) = ${locationSlug}
      OR LOWER(REPLACE(sector, ' ', '-')) = ${locationSlug}
      OR LOWER(REPLACE(provincia, ' ', '-')) = ${locationSlug}
      OR ciudad ILIKE ${`%${locationSlug.replace(/-/g, ' ')}%`}
    )
  `;
  return parseInt(rows[0]?.total || '0');
}

/**
 * Obtiene conteo total de agentes activos que tienen propiedades publicadas
 */
export async function getAgentsCount(): Promise<number> {
  const rows = await sql`
    SELECT COUNT(*) as total
    FROM perfiles_asesor pa
    JOIN usuarios u ON pa.usuario_id = u.id
    WHERE pa.activo = true
    AND pa.visible_en_web = true
    AND EXISTS (
      SELECT 1 FROM propiedades p
      WHERE p.activo = true
      AND (p.portales @> '{"ubikala": true}'::jsonb OR p.portales @> '{"propiedadenrd": true}'::jsonb OR p.portales IS NULL OR p.portales = '{}'::jsonb)
      AND EXISTS (
        SELECT 1 FROM jsonb_array_elements(p.caracteristicas->'agents') AS agent
        WHERE agent->>'slug' = pa.slug
        OR agent->>'email' = u.email
      )
    )
  `;
  return parseInt(rows[0]?.total || '0');
}

/**
 * Obtiene conteo de propiedades por ubicación para el listado
 */
export async function getPropertiesCountByLocation(locationSlug: string): Promise<number> {
  const rows = await sql`
    SELECT COUNT(*) as total
    FROM propiedades
    WHERE activo = true
    AND (portales @> '{"ubikala": true}'::jsonb OR portales @> '{"propiedadenrd": true}'::jsonb OR portales IS NULL OR portales = '{}'::jsonb)
    AND (
      LOWER(REPLACE(ciudad, ' ', '-')) = ${locationSlug}
      OR LOWER(REPLACE(sector, ' ', '-')) = ${locationSlug}
      OR LOWER(REPLACE(provincia, ' ', '-')) = ${locationSlug}
      OR ciudad ILIKE ${`%${locationSlug.replace(/-/g, ' ')}%`}
    )
  `;
  return parseInt(rows[0]?.total || '0');
}

/**
 * Datos para el footer - ubicaciones populares con conteos que coinciden con la página de listado
 * El conteo usa la misma lógica que getPropertiesByLocation para consistencia
 */
export async function getFooterLocations(limit = 6): Promise<{ name: string; slug: string; count: number }[]> {
  // First get unique cities with basic counts to determine most popular
  const rows = await sql`
    SELECT DISTINCT ON (ciudad)
      ciudad as name,
      LOWER(REPLACE(REPLACE(ciudad, ' ', '-'), '''', '')) as slug
    FROM propiedades
    WHERE activo = true
    AND (portales @> '{"ubikala": true}'::jsonb OR portales @> '{"propiedadenrd": true}'::jsonb OR portales IS NULL OR portales = '{}'::jsonb)
    AND ciudad IS NOT NULL
    AND ciudad != ''
    GROUP BY ciudad
    ORDER BY ciudad, COUNT(*) DESC
  `;

  // For each city, get the count using the same criteria as getPropertiesByLocation
  const locationsWithCounts = await Promise.all(
    rows.slice(0, limit * 2).map(async (row: any) => {
      const slug = row.slug;
      const countResult = await sql`
        SELECT COUNT(*) as count
        FROM propiedades
        WHERE activo = true
        AND (portales @> '{"ubikala": true}'::jsonb OR portales @> '{"propiedadenrd": true}'::jsonb OR portales IS NULL OR portales = '{}'::jsonb)
        AND (
          LOWER(REPLACE(ciudad, ' ', '-')) = ${slug}
          OR LOWER(REPLACE(sector, ' ', '-')) = ${slug}
          OR LOWER(REPLACE(provincia, ' ', '-')) = ${slug}
          OR ciudad ILIKE ${`%${slug.replace(/-/g, ' ')}%`}
        )
      `;
      return {
        name: row.name,
        slug: slug,
        count: parseInt(countResult[0]?.count || '0')
      };
    })
  );

  // Sort by count and return top locations
  return locationsWithCounts
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * Obtiene estadísticas reales del portal para mostrar en el hero
 */
export async function getPortalStats(): Promise<{
  properties: number;
  agents: number;
  cities: number;
}> {
  if (!sql) {
    console.error('[getPortalStats] DATABASE_URL not configured');
    return { properties: 0, agents: 0, cities: 0 };
  }

  const [propertiesResult, agentsResult, citiesResult] = await Promise.all([
    // Total de propiedades activas en propiedadenrd
    sql`
      SELECT COUNT(*) as total
      FROM propiedades
      WHERE activo = true
      AND (portales @> '{"ubikala": true}'::jsonb OR portales @> '{"propiedadenrd": true}'::jsonb OR portales IS NULL OR portales = '{}'::jsonb)
    `,
    // Total de agentes con propiedades
    sql`
      SELECT COUNT(DISTINCT pa.id) as total
      FROM perfiles_asesor pa
      JOIN usuarios u ON pa.usuario_id = u.id
      WHERE pa.activo = true
      AND pa.visible_en_web = true
      AND EXISTS (
        SELECT 1 FROM propiedades p
        WHERE p.activo = true
        AND (p.portales @> '{"ubikala": true}'::jsonb OR p.portales @> '{"propiedadenrd": true}'::jsonb OR p.portales IS NULL OR p.portales = '{}'::jsonb)
        AND EXISTS (
          SELECT 1 FROM jsonb_array_elements(p.caracteristicas->'agents') AS agent
          WHERE agent->>'slug' = pa.slug
          OR agent->>'email' = u.email
        )
      )
    `,
    // Total de ciudades con propiedades
    sql`
      SELECT COUNT(DISTINCT ciudad) as total
      FROM propiedades
      WHERE activo = true
      AND (portales @> '{"ubikala": true}'::jsonb OR portales @> '{"propiedadenrd": true}'::jsonb OR portales IS NULL OR portales = '{}'::jsonb)
      AND ciudad IS NOT NULL
      AND ciudad != ''
    `
  ]);

  return {
    properties: parseInt(propertiesResult[0]?.total || '0'),
    agents: parseInt(agentsResult[0]?.total || '0'),
    cities: parseInt(citiesResult[0]?.total || '0')
  };
}

export { sql };
