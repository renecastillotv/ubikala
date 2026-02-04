import { neon } from '@neondatabase/serverless';

const UBIKALA_DATABASE_URL = import.meta.env.UBIKALA_DATABASE_URL || process.env.UBIKALA_DATABASE_URL;

if (!UBIKALA_DATABASE_URL) {
  console.warn('UBIKALA_DATABASE_URL not configured');
}

export const ubikalaDb = UBIKALA_DATABASE_URL ? neon(UBIKALA_DATABASE_URL) : null;

// User types
export interface UbikalaUser {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: 'admin' | 'agent';
  avatar_url: string | null;
  phone: string | null;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UbikalaSession {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: string;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface UbikalaProperty {
  id: string;
  created_by: string | null;
  titulo: string;
  slug: string;
  codigo: string | null;
  descripcion: string | null;
  tipo: string;
  operacion: string;
  estado: string;
  precio: number;
  moneda: string;
  precio_alquiler: number | null;
  moneda_alquiler: string | null;
  pais: string;
  provincia: string | null;
  ciudad: string | null;
  sector: string | null;
  direccion: string | null;
  latitud: number | null;
  longitud: number | null;
  habitaciones: number | null;
  banos: number | null;
  medios_banos: number | null;
  estacionamientos: number | null;
  m2_construccion: number | null;
  m2_terreno: number | null;
  pisos: number | null;
  ano_construccion: number | null;
  amenidades: string[];
  imagen_principal: string | null;
  imagenes: string[];
  video_url: string | null;
  tour_virtual_url: string | null;
  contacto_nombre: string | null;
  contacto_telefono: string | null;
  contacto_email: string | null;
  contacto_whatsapp: string | null;
  activo: boolean;
  destacada: boolean;
  exclusiva: boolean;
  created_at: string;
  updated_at: string;
  source?: 'ubikala' | 'clic';
}

// User queries
export async function getUserByEmail(email: string): Promise<UbikalaUser | null> {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`
    SELECT * FROM ubikala_users WHERE email = ${email} AND is_active = true
  `;
  return rows[0] as UbikalaUser || null;
}

export async function getUserById(id: string): Promise<UbikalaUser | null> {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`
    SELECT * FROM ubikala_users WHERE id = ${id} AND is_active = true
  `;
  return rows[0] as UbikalaUser || null;
}

export async function updateUserLastLogin(userId: string): Promise<void> {
  if (!ubikalaDb) return;
  await ubikalaDb`
    UPDATE ubikala_users SET last_login_at = NOW() WHERE id = ${userId}
  `;
}

export async function getAllUsers(): Promise<UbikalaUser[]> {
  if (!ubikalaDb) return [];
  const rows = await ubikalaDb`
    SELECT id, email, name, role, avatar_url, phone, is_active, last_login_at, created_at, updated_at
    FROM ubikala_users
    ORDER BY created_at DESC
  `;
  return rows as UbikalaUser[];
}

export async function createUser(data: {
  email: string;
  password_hash: string;
  name: string;
  role: 'admin' | 'agent';
  phone?: string;
}): Promise<UbikalaUser> {
  if (!ubikalaDb) throw new Error('Database not configured');
  const rows = await ubikalaDb`
    INSERT INTO ubikala_users (email, password_hash, name, role, phone)
    VALUES (${data.email}, ${data.password_hash}, ${data.name}, ${data.role}, ${data.phone || null})
    RETURNING *
  `;
  return rows[0] as UbikalaUser;
}

export async function updateUser(id: string, data: Partial<{
  email: string;
  password_hash: string;
  name: string;
  role: 'admin' | 'agent';
  phone: string;
  avatar_url: string;
  is_active: boolean;
}>): Promise<UbikalaUser | null> {
  if (!ubikalaDb) return null;

  const updates: string[] = [];
  const values: any[] = [];

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      updates.push(key);
      values.push(value);
    }
  });

  if (updates.length === 0) return getUserById(id);

  const rows = await ubikalaDb`
    UPDATE ubikala_users
    SET ${ubikalaDb(data, ...updates)}
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as UbikalaUser || null;
}

export async function deleteUser(id: string): Promise<boolean> {
  if (!ubikalaDb) return false;
  const result = await ubikalaDb`
    DELETE FROM ubikala_users WHERE id = ${id}
  `;
  return true;
}

// Session queries
export async function createSession(data: {
  user_id: string;
  token_hash: string;
  expires_at: Date;
  ip_address?: string;
  user_agent?: string;
}): Promise<UbikalaSession> {
  if (!ubikalaDb) throw new Error('Database not configured');
  const rows = await ubikalaDb`
    INSERT INTO ubikala_sessions (user_id, token_hash, expires_at, ip_address, user_agent)
    VALUES (${data.user_id}, ${data.token_hash}, ${data.expires_at.toISOString()}, ${data.ip_address || null}, ${data.user_agent || null})
    RETURNING *
  `;
  return rows[0] as UbikalaSession;
}

export async function getSessionByTokenHash(tokenHash: string): Promise<UbikalaSession | null> {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`
    SELECT * FROM ubikala_sessions
    WHERE token_hash = ${tokenHash} AND expires_at > NOW()
  `;
  return rows[0] as UbikalaSession || null;
}

export async function deleteSession(tokenHash: string): Promise<void> {
  if (!ubikalaDb) return;
  await ubikalaDb`DELETE FROM ubikala_sessions WHERE token_hash = ${tokenHash}`;
}

export async function deleteUserSessions(userId: string): Promise<void> {
  if (!ubikalaDb) return;
  await ubikalaDb`DELETE FROM ubikala_sessions WHERE user_id = ${userId}`;
}

export async function cleanExpiredSessions(): Promise<void> {
  if (!ubikalaDb) return;
  await ubikalaDb`DELETE FROM ubikala_sessions WHERE expires_at < NOW()`;
}

// Property queries
export async function getUbikalaProperties(options: {
  limit?: number;
  offset?: number;
  tipo?: string;
  operacion?: string;
  ciudad?: string;
  activo?: boolean;
}): Promise<UbikalaProperty[]> {
  if (!ubikalaDb) return [];

  const { limit = 20, offset = 0, activo = true } = options;

  const rows = await ubikalaDb`
    SELECT * FROM ubikala_properties
    WHERE activo = ${activo}
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  return (rows as UbikalaProperty[]).map(p => ({ ...p, source: 'ubikala' as const }));
}

export async function getUbikalaPropertyBySlug(slug: string): Promise<UbikalaProperty | null> {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`
    SELECT * FROM ubikala_properties WHERE slug = ${slug}
  `;
  return rows[0] ? { ...rows[0], source: 'ubikala' } as UbikalaProperty : null;
}

export async function getUbikalaPropertyById(id: string): Promise<UbikalaProperty | null> {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`
    SELECT * FROM ubikala_properties WHERE id = ${id}
  `;
  return rows[0] ? { ...rows[0], source: 'ubikala' } as UbikalaProperty : null;
}

export async function createProperty(data: Partial<UbikalaProperty>): Promise<UbikalaProperty> {
  if (!ubikalaDb) throw new Error('Database not configured');

  const rows = await ubikalaDb`
    INSERT INTO ubikala_properties (
      created_by, titulo, slug, codigo, descripcion, tipo, operacion, estado,
      precio, moneda, precio_alquiler, moneda_alquiler,
      pais, provincia, ciudad, sector, direccion, latitud, longitud,
      habitaciones, banos, medios_banos, estacionamientos,
      m2_construccion, m2_terreno, pisos, ano_construccion,
      amenidades, imagen_principal, imagenes, video_url, tour_virtual_url,
      contacto_nombre, contacto_telefono, contacto_email, contacto_whatsapp,
      activo, destacada, exclusiva
    ) VALUES (
      ${data.created_by || null},
      ${data.titulo},
      ${data.slug},
      ${data.codigo || null},
      ${data.descripcion || null},
      ${data.tipo},
      ${data.operacion},
      ${data.estado || 'disponible'},
      ${data.precio},
      ${data.moneda || 'USD'},
      ${data.precio_alquiler || null},
      ${data.moneda_alquiler || null},
      ${data.pais || 'República Dominicana'},
      ${data.provincia || null},
      ${data.ciudad || null},
      ${data.sector || null},
      ${data.direccion || null},
      ${data.latitud || null},
      ${data.longitud || null},
      ${data.habitaciones || null},
      ${data.banos || null},
      ${data.medios_banos || null},
      ${data.estacionamientos || null},
      ${data.m2_construccion || null},
      ${data.m2_terreno || null},
      ${data.pisos || null},
      ${data.ano_construccion || null},
      ${data.amenidades || []},
      ${data.imagen_principal || null},
      ${data.imagenes || []},
      ${data.video_url || null},
      ${data.tour_virtual_url || null},
      ${data.contacto_nombre || null},
      ${data.contacto_telefono || null},
      ${data.contacto_email || null},
      ${data.contacto_whatsapp || null},
      ${data.activo !== false},
      ${data.destacada || false},
      ${data.exclusiva || false}
    )
    RETURNING *
  `;

  return { ...rows[0], source: 'ubikala' } as UbikalaProperty;
}

export async function updateProperty(id: string, data: Partial<UbikalaProperty>): Promise<UbikalaProperty | null> {
  if (!ubikalaDb) return null;

  // Remove fields that shouldn't be updated
  const { id: _, created_at, source, ...updateData } = data;

  const rows = await ubikalaDb`
    UPDATE ubikala_properties
    SET
      titulo = COALESCE(${updateData.titulo}, titulo),
      descripcion = COALESCE(${updateData.descripcion}, descripcion),
      tipo = COALESCE(${updateData.tipo}, tipo),
      operacion = COALESCE(${updateData.operacion}, operacion),
      estado = COALESCE(${updateData.estado}, estado),
      precio = COALESCE(${updateData.precio}, precio),
      moneda = COALESCE(${updateData.moneda}, moneda),
      provincia = COALESCE(${updateData.provincia}, provincia),
      ciudad = COALESCE(${updateData.ciudad}, ciudad),
      sector = COALESCE(${updateData.sector}, sector),
      direccion = COALESCE(${updateData.direccion}, direccion),
      latitud = COALESCE(${updateData.latitud}, latitud),
      longitud = COALESCE(${updateData.longitud}, longitud),
      habitaciones = COALESCE(${updateData.habitaciones}, habitaciones),
      banos = COALESCE(${updateData.banos}, banos),
      estacionamientos = COALESCE(${updateData.estacionamientos}, estacionamientos),
      m2_construccion = COALESCE(${updateData.m2_construccion}, m2_construccion),
      m2_terreno = COALESCE(${updateData.m2_terreno}, m2_terreno),
      amenidades = COALESCE(${updateData.amenidades}, amenidades),
      imagen_principal = COALESCE(${updateData.imagen_principal}, imagen_principal),
      imagenes = COALESCE(${updateData.imagenes}, imagenes),
      activo = COALESCE(${updateData.activo}, activo),
      destacada = COALESCE(${updateData.destacada}, destacada),
      exclusiva = COALESCE(${updateData.exclusiva}, exclusiva),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

  return rows[0] ? { ...rows[0], source: 'ubikala' } as UbikalaProperty : null;
}

export async function deleteProperty(id: string): Promise<boolean> {
  if (!ubikalaDb) return false;
  await ubikalaDb`DELETE FROM ubikala_properties WHERE id = ${id}`;
  return true;
}

// Activity log
export async function logActivity(data: {
  user_id?: string;
  action: string;
  entity_type?: string;
  entity_id?: string;
  details?: Record<string, any>;
  ip_address?: string;
}): Promise<void> {
  if (!ubikalaDb) return;
  await ubikalaDb`
    INSERT INTO ubikala_activity_log (user_id, action, entity_type, entity_id, details, ip_address)
    VALUES (
      ${data.user_id || null},
      ${data.action},
      ${data.entity_type || null},
      ${data.entity_id || null},
      ${JSON.stringify(data.details || {})},
      ${data.ip_address || null}
    )
  `;
}

export async function getActivityLog(options: {
  limit?: number;
  offset?: number;
  user_id?: string;
  action?: string;
}): Promise<any[]> {
  if (!ubikalaDb) return [];

  const { limit = 50, offset = 0 } = options;

  const rows = await ubikalaDb`
    SELECT al.*, u.name as user_name, u.email as user_email
    FROM ubikala_activity_log al
    LEFT JOIN ubikala_users u ON al.user_id = u.id
    ORDER BY al.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  return rows;
}

// Stats
export async function getAdminStats(): Promise<{
  total_users: number;
  total_properties: number;
  active_properties: number;
  featured_properties: number;
}> {
  if (!ubikalaDb) return { total_users: 0, total_properties: 0, active_properties: 0, featured_properties: 0 };

  const [users, properties, active, featured] = await Promise.all([
    ubikalaDb`SELECT COUNT(*) as count FROM ubikala_users WHERE is_active = true`,
    ubikalaDb`SELECT COUNT(*) as count FROM ubikala_properties`,
    ubikalaDb`SELECT COUNT(*) as count FROM ubikala_properties WHERE activo = true`,
    ubikalaDb`SELECT COUNT(*) as count FROM ubikala_properties WHERE destacada = true`,
  ]);

  return {
    total_users: Number(users[0]?.count || 0),
    total_properties: Number(properties[0]?.count || 0),
    active_properties: Number(active[0]?.count || 0),
    featured_properties: Number(featured[0]?.count || 0),
  };
}
