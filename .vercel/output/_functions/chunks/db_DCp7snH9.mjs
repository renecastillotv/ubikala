import { neon } from '@neondatabase/serverless';
import { c as getUbikalaProperties } from './ubikala-db_C_z4BDxl.mjs';

const DATABASE_URL = "postgresql://neondb_owner:npg_5jRsErZYmJv1@ep-fancy-lab-a4hmvk6f-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL) ;
const PORTAL_FILTER = `(
  portales @> '{"ubikala": true}'::jsonb
  OR portales @> '{"propiedadenrd": true}'::jsonb
  OR portales IS NULL
  OR portales = '{}'::jsonb
)`;
function ubikalaToProperty(up) {
  return {
    id: parseInt(up.id) || 0,
    tenant_id: 0,
    titulo: up.titulo,
    slug: up.slug,
    codigo: up.codigo || "",
    descripcion: up.descripcion || "",
    tipo: up.tipo,
    operacion: up.operacion,
    precio: Number(up.precio),
    moneda: up.moneda || "USD",
    ubicacion: {
      pais: up.pais || "República Dominicana",
      provincia: up.provincia || "",
      ciudad: up.ciudad || "",
      sector: up.sector || "",
      direccion: up.direccion || "",
      latitud: Number(up.latitud) || 0,
      longitud: Number(up.longitud) || 0,
      slug: up.ciudad?.toLowerCase().replace(/\s+/g, "-") || ""
    },
    caracteristicas: {
      habitaciones: up.habitaciones || 0,
      banos: up.banos || 0,
      parqueos: up.estacionamientos || 0,
      area_construida: Number(up.m2_construccion) || 0,
      area_terreno: Number(up.m2_terreno) || 0,
      amenidades: up.amenidades || []
    },
    imagenes: up.imagenes || [],
    portales: { ubikala: true },
    activo: up.activo,
    destacada: up.destacada,
    created_at: up.created_at,
    updated_at: up.updated_at,
    // Additional fields for display
    imagen_principal: up.imagen_principal,
    source: "ubikala"
  };
}
async function getProperties(options = {}) {
  if (!sql) {
    console.error("[getProperties] DATABASE_URL not configured");
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
  const params = [];
  let paramIndex = 1;
  if (tipo) {
    query += ` AND p.tipo = $${paramIndex++}`;
    params.push(tipo);
  }
  if (operacion) {
    if (operacion.toLowerCase() === "alquiler") {
      query += ` AND (LOWER(p.operacion) = 'alquiler' OR LOWER(p.operacion) = 'renta' OR LOWER(p.operacion) = 'rent')`;
    } else if (operacion.toLowerCase() === "venta") {
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
  return rows;
}
async function getPropertyBySlug(slug) {
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
  return rows[0];
}
async function getFeaturedProperties(limit = 6) {
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
    getUbikalaProperties({ limit, activo: true }).then(
      (props) => props.filter((p) => p.destacada).map(ubikalaToProperty)
    )
  ]);
  const clicRows = clicResult.status === "fulfilled" ? clicResult.value : [];
  const ubikalaRows = ubikalaResult.status === "fulfilled" ? ubikalaResult.value : [];
  console.log(`[getFeaturedProperties] CLIC: ${clicRows.length} rows, Ubikala: ${ubikalaRows.length} rows`);
  if (clicResult.status === "rejected") {
    console.error("[getFeaturedProperties] CLIC DB error:", clicResult.reason);
  }
  if (ubikalaResult.status === "rejected") {
    console.error("[getFeaturedProperties] Ubikala DB error:", ubikalaResult.reason);
  }
  const merged = [...clicRows, ...ubikalaRows].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, limit);
  return merged;
}
async function getRecentProperties(limit = 12) {
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
    getUbikalaProperties({ limit, activo: true }).then(
      (props) => props.map(ubikalaToProperty)
    )
  ]);
  const clicRows = clicResult.status === "fulfilled" ? clicResult.value : [];
  const ubikalaRows = ubikalaResult.status === "fulfilled" ? ubikalaResult.value : [];
  console.log(`[getRecentProperties] CLIC: ${clicRows.length} rows, Ubikala: ${ubikalaRows.length} rows`);
  if (clicResult.status === "rejected") {
    console.error("[getRecentProperties] CLIC DB error:", clicResult.reason);
  }
  if (ubikalaResult.status === "rejected") {
    console.error("[getRecentProperties] Ubikala DB error:", ubikalaResult.reason);
  }
  const merged = [...clicRows, ...ubikalaRows].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, limit);
  return merged;
}
async function getPropertiesCount(options = {}) {
  const { tipo, operacion, ciudad } = options;
  let query = `
    SELECT COUNT(*) as total FROM propiedades
    WHERE activo = true
    AND ${PORTAL_FILTER}
  `;
  const params = [];
  let paramIndex = 1;
  if (tipo) {
    query += ` AND tipo = $${paramIndex++}`;
    params.push(tipo);
  }
  if (operacion) {
    if (operacion.toLowerCase() === "alquiler") {
      query += ` AND (LOWER(operacion) = 'alquiler' OR LOWER(operacion) = 'renta' OR LOWER(operacion) = 'rent')`;
    } else if (operacion.toLowerCase() === "venta") {
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
  return parseInt(rows[0]?.total || "0");
}
async function getAgents(options = {}) {
  if (!sql) {
    console.error("[getAgents] DATABASE_URL not configured");
    return [];
  }
  const { limit = 20, offset = 0, zona, destacado } = options;
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
  const params = [];
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
  return rows;
}
async function getAgentBySlug(slug) {
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
  return rows[0];
}
async function getAgentProperties(agentSlug, agentEmail, limit = 12) {
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
    return emailRows;
  }
  return rows;
}
async function getLocations(options = {}) {
  const { nivel, parentId } = options;
  let query = `SELECT * FROM ubicaciones WHERE activo = true`;
  const params = [];
  let paramIndex = 1;
  if (nivel !== void 0) {
    query += ` AND nivel = $${paramIndex++}`;
    params.push(nivel);
  }
  if (parentId !== void 0) {
    query += ` AND parent_id = $${paramIndex++}`;
    params.push(parentId);
  }
  query += ` ORDER BY nombre ASC`;
  const rows = await sql(query, params);
  return rows;
}
async function getLocationBySlug(slug) {
  const rows = await sql`
    SELECT * FROM ubicaciones
    WHERE slug = ${slug}
    AND activo = true
    LIMIT 1
  `;
  return rows[0];
}
async function getPropertiesByLocation(locationSlug, limit = 20, offset = 0) {
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
      OR p.ciudad ILIKE ${`%${locationSlug.replace(/-/g, " ")}%`}
    )
    ORDER BY p.destacada DESC, p.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;
  return rows;
}
async function getPopularLocationsWithStats() {
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
  const locationsWithCounts = await Promise.all(
    rows.map(async (row) => {
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
          OR ciudad ILIKE ${`%${slug.replace(/-/g, " ")}%`}
        )
      `;
      return {
        slug,
        name: row.name,
        province: row.province || "República Dominicana",
        propertyCount: parseInt(countResult[0]?.count || "0"),
        sampleImage: row.sample_image || null
      };
    })
  );
  return locationsWithCounts.sort((a, b) => b.propertyCount - a.propertyCount).slice(0, 12);
}
async function getLocationPropertyCount(locationSlug) {
  const rows = await sql`
    SELECT COUNT(*) as total
    FROM propiedades
    WHERE activo = true
    AND (portales @> '{"ubikala": true}'::jsonb OR portales @> '{"propiedadenrd": true}'::jsonb OR portales IS NULL OR portales = '{}'::jsonb)
    AND (
      LOWER(REPLACE(ciudad, ' ', '-')) = ${locationSlug}
      OR LOWER(REPLACE(sector, ' ', '-')) = ${locationSlug}
      OR LOWER(REPLACE(provincia, ' ', '-')) = ${locationSlug}
      OR ciudad ILIKE ${`%${locationSlug.replace(/-/g, " ")}%`}
    )
  `;
  return parseInt(rows[0]?.total || "0");
}
async function getAgentsCount() {
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
  return parseInt(rows[0]?.total || "0");
}
async function getFooterLocations(limit = 6) {
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
  const locationsWithCounts = await Promise.all(
    rows.slice(0, limit * 2).map(async (row) => {
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
          OR ciudad ILIKE ${`%${slug.replace(/-/g, " ")}%`}
        )
      `;
      return {
        name: row.name,
        slug,
        count: parseInt(countResult[0]?.count || "0")
      };
    })
  );
  return locationsWithCounts.sort((a, b) => b.count - a.count).slice(0, limit);
}
async function getPortalStats() {
  if (!sql) {
    console.error("[getPortalStats] DATABASE_URL not configured");
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
    properties: parseInt(propertiesResult[0]?.total || "0"),
    agents: parseInt(agentsResult[0]?.total || "0"),
    cities: parseInt(citiesResult[0]?.total || "0")
  };
}

export { getPropertiesCount as a, getAgentBySlug as b, getAgentProperties as c, getAgents as d, getRecentProperties as e, getFeaturedProperties as f, getProperties as g, getLocationBySlug as h, getPropertiesByLocation as i, getLocations as j, getPropertyBySlug as k, getAgentsCount as l, getFooterLocations as m, getPortalStats as n, getPopularLocationsWithStats as o, getLocationPropertyCount as p };
