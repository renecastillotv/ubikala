import { neon } from '@neondatabase/serverless';

const UBIKALA_DATABASE_URL = import.meta.env.UBIKALA_DATABASE_URL || process.env.UBIKALA_DATABASE_URL;

if (!UBIKALA_DATABASE_URL) {
  console.warn('UBIKALA_DATABASE_URL not configured');
}

export const ubikalaDb = UBIKALA_DATABASE_URL ? neon(UBIKALA_DATABASE_URL) : null;

// User role types - 4 roles for the platform
export type UserRole = 'admin' | 'inmobiliaria' | 'asesor_independiente' | 'propietario';

// User types
export interface UbikalaUser {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: UserRole;
  avatar_url: string | null;
  phone: string | null;
  company_name: string | null;  // For inmobiliarias
  company_logo: string | null;  // Company logo URL
  company_description: string | null;  // Company description
  company_website: string | null;  // Company website
  company_address: string | null;  // Company address
  license_number: string | null; // Professional license for asesores
  bio: string | null;  // User biography
  plan_id: string | null;  // Reference to user's subscription plan
  parent_user_id: string | null;  // For sub-users under inmobiliarias
  custom_publication_limit: number | null;  // Custom limit set by parent inmobiliaria
  is_active: boolean;
  is_verified: boolean;
  country_code: string | null;  // Country this user belongs to (e.g. 'DO', 'PA')
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

// Plan types
export interface UbikalaPlan {
  id: string;
  name: string;
  role: UserRole;
  max_publications: number;
  publication_duration_days: number;
  max_team_members: number | null;
  max_leads_per_month: number | null;
  price: number;
  features: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Team stats interface
export interface TeamStats {
  total_members: number;
  total_publications: number;
  total_leads: number;
  leads_by_member: { user_id: string; name: string; leads_count: number }[];
  publications_by_member: { user_id: string; name: string; count: number }[];
}

// Role permissions helpers
export function canViewAllProperties(role: UserRole): boolean {
  return role === 'admin';
}

export function canManageUsers(role: UserRole): boolean {
  return role === 'admin';
}

export function canManageTeam(role: UserRole): boolean {
  return role === 'admin' || role === 'inmobiliaria';
}

export function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    admin: 'Administrador',
    inmobiliaria: 'Inmobiliaria',
    asesor_independiente: 'Asesor Independiente',
    propietario: 'Propietario'
  };
  return labels[role] || role;
}

export function getRoleIcon(role: UserRole): string {
  const icons: Record<UserRole, string> = {
    admin: 'shield',
    inmobiliaria: 'building',
    asesor_independiente: 'user',
    propietario: 'home'
  };
  return icons[role] || 'user';
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
  // Owner info from JOIN
  owner_id?: string;
  owner_name?: string;
  owner_avatar?: string;
  owner_phone?: string;
  owner_email?: string;
  owner_verified?: boolean;
  owner_role?: UserRole;
  owner_company_name?: string;
  owner_bio?: string;
  owner_properties_count?: number;
  // Parent (inmobiliaria) info from second JOIN
  owner_parent_user_id?: string;
  owner_parent_company_name?: string;
  owner_parent_name?: string;
  owner_parent_id?: string;
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

// Get user by slug format: ubk-{name-slug}-{short-id}
// The short-id is the first 8 characters of the user's UUID
export async function getUserBySlug(slug: string): Promise<(UbikalaUser & { properties_count: number }) | null> {
  if (!ubikalaDb) return null;

  // Extract the short-id from the slug (last segment after final dash)
  // Format: ubk-name-slug-12345678
  const parts = slug.split('-');
  if (parts.length < 3 || parts[0] !== 'ubk') return null;

  const shortId = parts[parts.length - 1];
  if (shortId.length !== 8) return null;

  // Find user where ID starts with the short-id
  const rows = await ubikalaDb`
    SELECT u.*,
      (SELECT COUNT(*) FROM ubikala_properties WHERE created_by = u.id AND activo = true) as properties_count
    FROM ubikala_users u
    WHERE u.id::text LIKE ${shortId + '%'} AND u.is_active = true
    LIMIT 1
  `;

  return rows[0] as (UbikalaUser & { properties_count: number }) || null;
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
  role: UserRole;
  phone?: string;
  company_name?: string;
  license_number?: string;
  country_code?: string;
}): Promise<UbikalaUser> {
  if (!ubikalaDb) throw new Error('Database not configured');
  await ensureUsersCountryColumn();
  const rows = await ubikalaDb`
    INSERT INTO ubikala_users (email, password_hash, name, role, phone, company_name, license_number, country_code)
    VALUES (${data.email}, ${data.password_hash}, ${data.name}, ${data.role}, ${data.phone || null}, ${data.company_name || null}, ${data.license_number || null}, ${data.country_code || null})
    RETURNING *
  `;
  return rows[0] as UbikalaUser;
}

export async function updateUser(id: string, data: Partial<{
  email: string;
  password_hash: string;
  name: string;
  role: UserRole;
  phone: string;
  avatar_url: string;
  bio: string;
  company_name: string;
  license_number: string;
  plan_id: string | null;
  parent_user_id: string | null;
  custom_publication_limit: number | null;
  is_active: boolean;
  is_verified: boolean;
  country_code: string | null;
}>): Promise<UbikalaUser | null> {
  if (!ubikalaDb) return null;
  await ensureUsersCountryColumn();

  // Check if there's anything to update
  const hasUpdates = Object.values(data).some(v => v !== undefined);
  if (!hasUpdates) return getUserById(id);

  // Get current user to merge with updates
  const currentUser = await getUserById(id);
  if (!currentUser) return null;

  // Merge current values with provided updates
  const email = data.email !== undefined ? data.email : currentUser.email;
  const password_hash = data.password_hash !== undefined ? data.password_hash : currentUser.password_hash;
  const name = data.name !== undefined ? data.name : currentUser.name;
  const role = data.role !== undefined ? data.role : currentUser.role;
  const phone = data.phone !== undefined ? data.phone : currentUser.phone;
  const avatar_url = data.avatar_url !== undefined ? data.avatar_url : currentUser.avatar_url;
  const bio = data.bio !== undefined ? data.bio : currentUser.bio;
  const plan_id = data.plan_id !== undefined ? data.plan_id : currentUser.plan_id;
  const parent_user_id = data.parent_user_id !== undefined ? data.parent_user_id : currentUser.parent_user_id;
  const custom_publication_limit = data.custom_publication_limit !== undefined ? data.custom_publication_limit : currentUser.custom_publication_limit;
  const is_active = data.is_active !== undefined ? data.is_active : currentUser.is_active;
  const country_code = data.country_code !== undefined ? data.country_code : currentUser.country_code;

  const rows = await ubikalaDb`
    UPDATE ubikala_users
    SET
      email = ${email},
      password_hash = ${password_hash},
      name = ${name},
      role = ${role},
      phone = ${phone},
      avatar_url = ${avatar_url},
      bio = ${bio},
      plan_id = ${plan_id},
      parent_user_id = ${parent_user_id},
      custom_publication_limit = ${custom_publication_limit},
      is_active = ${is_active},
      country_code = ${country_code},
      updated_at = NOW()
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

  const { limit = 20, offset = 0 } = options;
  // When activo is undefined, show all properties (for admin view)
  const filterByActivo = options.activo !== undefined;
  const activoValue = options.activo ?? true;

  const rows = filterByActivo
    ? await ubikalaDb`
        SELECT
          p.*,
          u.id as owner_id,
          u.name as owner_name,
          u.avatar_url as owner_avatar,
          u.phone as owner_phone,
          u.email as owner_email,
          u.is_verified as owner_verified,
          u.role as owner_role,
          u.company_name as owner_company_name,
          u.bio as owner_bio,
          (SELECT COUNT(*) FROM ubikala_properties WHERE created_by = p.created_by AND activo = true) as owner_properties_count,
          u.parent_user_id as owner_parent_user_id,
          parent.company_name as owner_parent_company_name,
          parent.name as owner_parent_name,
          parent.id as owner_parent_id
        FROM ubikala_properties p
        LEFT JOIN ubikala_users u ON p.created_by = u.id
        LEFT JOIN ubikala_users parent ON u.parent_user_id = parent.id
        WHERE p.activo = ${activoValue}
        ORDER BY p.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    : await ubikalaDb`
        SELECT
          p.*,
          u.id as owner_id,
          u.name as owner_name,
          u.avatar_url as owner_avatar,
          u.phone as owner_phone,
          u.email as owner_email,
          u.is_verified as owner_verified,
          u.role as owner_role,
          u.company_name as owner_company_name,
          u.bio as owner_bio,
          (SELECT COUNT(*) FROM ubikala_properties WHERE created_by = p.created_by AND activo = true) as owner_properties_count,
          u.parent_user_id as owner_parent_user_id,
          parent.company_name as owner_parent_company_name,
          parent.name as owner_parent_name,
          parent.id as owner_parent_id
        FROM ubikala_properties p
        LEFT JOIN ubikala_users u ON p.created_by = u.id
        LEFT JOIN ubikala_users parent ON u.parent_user_id = parent.id
        ORDER BY p.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;

  return (rows as UbikalaProperty[]).map(p => ({ ...p, source: 'ubikala' as const }));
}

export async function getUbikalaPropertyBySlug(slug: string): Promise<UbikalaProperty | null> {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`
    SELECT
      p.*,
      u.id as owner_id,
      u.name as owner_name,
      u.avatar_url as owner_avatar,
      u.phone as owner_phone,
      u.email as owner_email,
      u.is_verified as owner_verified,
      u.role as owner_role,
      u.company_name as owner_company_name,
      u.bio as owner_bio,
      (SELECT COUNT(*) FROM ubikala_properties WHERE created_by = p.created_by AND activo = true) as owner_properties_count,
      u.parent_user_id as owner_parent_user_id,
      parent.company_name as owner_parent_company_name,
      parent.name as owner_parent_name,
      parent.id as owner_parent_id
    FROM ubikala_properties p
    LEFT JOIN ubikala_users u ON p.created_by = u.id
    LEFT JOIN ubikala_users parent ON u.parent_user_id = parent.id
    WHERE p.slug = ${slug}
  `;
  return rows[0] ? { ...rows[0], source: 'ubikala' } as UbikalaProperty : null;
}

export async function getUbikalaPropertyById(id: string): Promise<UbikalaProperty | null> {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`
    SELECT
      p.*,
      u.id as owner_id,
      u.name as owner_name,
      u.avatar_url as owner_avatar,
      u.phone as owner_phone,
      u.email as owner_email,
      u.is_verified as owner_verified,
      u.role as owner_role,
      u.company_name as owner_company_name,
      u.bio as owner_bio,
      (SELECT COUNT(*) FROM ubikala_properties WHERE created_by = p.created_by AND activo = true) as owner_properties_count,
      u.parent_user_id as owner_parent_user_id,
      parent.company_name as owner_parent_company_name,
      parent.name as owner_parent_name,
      parent.id as owner_parent_id
    FROM ubikala_properties p
    LEFT JOIN ubikala_users u ON p.created_by = u.id
    LEFT JOIN ubikala_users parent ON u.parent_user_id = parent.id
    WHERE p.id = ${id}
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

  const { limit = 50, offset = 0, user_id } = options;

  // If user_id is provided, filter by that user
  if (user_id) {
    const rows = await ubikalaDb`
      SELECT al.*, u.name as user_name, u.email as user_email
      FROM ubikala_activity_log al
      LEFT JOIN ubikala_users u ON al.user_id = u.id
      WHERE al.user_id = ${user_id}
      ORDER BY al.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
    return rows;
  }

  // Otherwise return all activity (for admin)
  const rows = await ubikalaDb`
    SELECT al.*, u.name as user_name, u.email as user_email
    FROM ubikala_activity_log al
    LEFT JOIN ubikala_users u ON al.user_id = u.id
    ORDER BY al.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  return rows;
}

// Stats for admin dashboard
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

// Stats for user dashboard (filtered by user)
export async function getUserStats(userId: string): Promise<{
  total_properties: number;
  active_properties: number;
  total_views: number;
  total_leads: number;
}> {
  if (!ubikalaDb) return { total_properties: 0, active_properties: 0, total_views: 0, total_leads: 0 };

  const [properties, active] = await Promise.all([
    ubikalaDb`SELECT COUNT(*) as count FROM ubikala_properties WHERE created_by = ${userId}`,
    ubikalaDb`SELECT COUNT(*) as count FROM ubikala_properties WHERE created_by = ${userId} AND activo = true`,
  ]);

  // Leads are counted separately via the leads table (not linked to user directly)
  return {
    total_properties: Number(properties[0]?.count || 0),
    active_properties: Number(active[0]?.count || 0),
    total_views: 0, // TODO: Implement views tracking
    total_leads: 0, // Leads shown in admin/leads page
  };
}

// Get properties by user ID (for non-admin users to see only their own)
export async function getPropertiesByUser(userId: string, options: {
  limit?: number;
  offset?: number;
  activo?: boolean;
}): Promise<UbikalaProperty[]> {
  if (!ubikalaDb) return [];

  const { limit = 20, offset = 0, activo } = options;

  // Build query based on activo filter - include owner info for proper display
  let rows;
  if (activo !== undefined) {
    rows = await ubikalaDb`
      SELECT p.*,
        u.id as owner_id,
        u.name as owner_name,
        u.avatar_url as owner_avatar,
        u.phone as owner_phone,
        u.email as owner_email,
        u.is_verified as owner_verified,
        u.role as owner_role,
        u.company_name as owner_company_name,
        u.bio as owner_bio,
        (SELECT COUNT(*) FROM ubikala_properties WHERE created_by = p.created_by AND activo = true) as owner_properties_count,
        u.parent_user_id as owner_parent_user_id,
        parent.company_name as owner_parent_company_name,
        parent.name as owner_parent_name,
        parent.id as owner_parent_id
      FROM ubikala_properties p
      LEFT JOIN ubikala_users u ON p.created_by = u.id
      LEFT JOIN ubikala_users parent ON u.parent_user_id = parent.id
      WHERE p.created_by = ${userId} AND p.activo = ${activo}
      ORDER BY p.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  } else {
    rows = await ubikalaDb`
      SELECT p.*,
        u.id as owner_id,
        u.name as owner_name,
        u.avatar_url as owner_avatar,
        u.phone as owner_phone,
        u.email as owner_email,
        u.is_verified as owner_verified,
        u.role as owner_role,
        u.company_name as owner_company_name,
        u.bio as owner_bio,
        (SELECT COUNT(*) FROM ubikala_properties WHERE created_by = p.created_by AND activo = true) as owner_properties_count,
        u.parent_user_id as owner_parent_user_id,
        parent.company_name as owner_parent_company_name,
        parent.name as owner_parent_name,
        parent.id as owner_parent_id
      FROM ubikala_properties p
      LEFT JOIN ubikala_users u ON p.created_by = u.id
      LEFT JOIN ubikala_users parent ON u.parent_user_id = parent.id
      WHERE p.created_by = ${userId}
      ORDER BY p.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  }

  return (rows as UbikalaProperty[]).map(p => ({ ...p, source: 'ubikala' as const }));
}

// Count properties by user
export async function countPropertiesByUser(userId: string): Promise<number> {
  if (!ubikalaDb) return 0;

  const rows = await ubikalaDb`
    SELECT COUNT(*) as count FROM ubikala_properties WHERE created_by = ${userId}
  `;

  return Number(rows[0]?.count || 0);
}

// Get users by role
export async function getUsersByRole(role: UserRole): Promise<UbikalaUser[]> {
  if (!ubikalaDb) return [];
  const rows = await ubikalaDb`
    SELECT id, email, name, role, avatar_url, phone, company_name, license_number, is_active, is_verified, last_login_at, created_at, updated_at
    FROM ubikala_users
    WHERE role = ${role} AND is_active = true
    ORDER BY created_at DESC
  `;
  return rows as UbikalaUser[];
}

// Public agent listing - fetch Ubikala users who have active properties (for homepage and asesores page)
export interface UbikalaAgentRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  company_name: string | null;
  bio: string | null;
  is_verified: boolean;
  created_at: string;
  properties_count: number;
  parent_user_id: string | null;
  parent_company_name: string | null;
  parent_name: string | null;
}

export async function getUbikalaAgents(options: {
  limit?: number;
  offset?: number;
  country_code?: string;
} = {}): Promise<UbikalaAgentRow[]> {
  if (!ubikalaDb) return [];
  await ensureUsersCountryColumn();

  const { limit = 20, offset = 0, country_code } = options;

  const rows = country_code
    ? await ubikalaDb`
        SELECT
          u.id, u.name, u.email, u.phone, u.avatar_url, u.role, u.company_name,
          u.bio, u.is_verified, u.created_at, u.parent_user_id,
          parent.company_name as parent_company_name, parent.name as parent_name,
          (SELECT COUNT(*) FROM ubikala_properties WHERE created_by = u.id AND activo = true) as properties_count
        FROM ubikala_users u
        LEFT JOIN ubikala_users parent ON u.parent_user_id = parent.id
        WHERE u.is_active = true
        AND u.role IN ('inmobiliaria', 'asesor_independiente')
        AND u.country_code = ${country_code}
        AND EXISTS (SELECT 1 FROM ubikala_properties p WHERE p.created_by = u.id AND p.activo = true)
        ORDER BY u.is_verified DESC, (SELECT COUNT(*) FROM ubikala_properties WHERE created_by = u.id AND activo = true) DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    : await ubikalaDb`
        SELECT
          u.id, u.name, u.email, u.phone, u.avatar_url, u.role, u.company_name,
          u.bio, u.is_verified, u.created_at, u.parent_user_id,
          parent.company_name as parent_company_name, parent.name as parent_name,
          (SELECT COUNT(*) FROM ubikala_properties WHERE created_by = u.id AND activo = true) as properties_count
        FROM ubikala_users u
        LEFT JOIN ubikala_users parent ON u.parent_user_id = parent.id
        WHERE u.is_active = true
        AND u.role IN ('inmobiliaria', 'asesor_independiente')
        AND EXISTS (SELECT 1 FROM ubikala_properties p WHERE p.created_by = u.id AND p.activo = true)
        ORDER BY u.is_verified DESC, (SELECT COUNT(*) FROM ubikala_properties WHERE created_by = u.id AND activo = true) DESC
        LIMIT ${limit} OFFSET ${offset}
      `;

  return rows as UbikalaAgentRow[];
}

export async function getUbikalaAgentsCount(country_code?: string): Promise<number> {
  if (!ubikalaDb) return 0;
  await ensureUsersCountryColumn();

  const rows = country_code
    ? await ubikalaDb`
        SELECT COUNT(*) as total FROM ubikala_users u
        WHERE u.is_active = true AND u.role IN ('inmobiliaria', 'asesor_independiente')
        AND u.country_code = ${country_code}
        AND EXISTS (SELECT 1 FROM ubikala_properties p WHERE p.created_by = u.id AND p.activo = true)
      `
    : await ubikalaDb`
        SELECT COUNT(*) as total FROM ubikala_users u
        WHERE u.is_active = true AND u.role IN ('inmobiliaria', 'asesor_independiente')
        AND EXISTS (SELECT 1 FROM ubikala_properties p WHERE p.created_by = u.id AND p.activo = true)
      `;

  return parseInt(rows[0]?.total || '0');
}

// ==================== INMOBILIARIAS ====================

export async function getUbikalaInmobiliarias(options: {
  limit?: number;
  offset?: number;
  country_code?: string;
} = {}): Promise<UbikalaAgentRow[]> {
  if (!ubikalaDb) return [];
  await ensureUsersCountryColumn();

  const { limit = 100, offset = 0, country_code } = options;

  const rows = country_code
    ? await ubikalaDb`
        SELECT
          u.id, u.name, u.email, u.phone, u.avatar_url, u.role, u.company_name,
          u.bio, u.is_verified, u.created_at, u.parent_user_id,
          NULL as parent_company_name, NULL as parent_name,
          (SELECT COUNT(*) FROM ubikala_properties
           WHERE (created_by = u.id OR created_by IN (SELECT id FROM ubikala_users WHERE parent_user_id = u.id))
           AND activo = true) as properties_count
        FROM ubikala_users u
        WHERE u.is_active = true AND u.role = 'inmobiliaria' AND u.country_code = ${country_code}
        ORDER BY u.is_verified DESC, (
          SELECT COUNT(*) FROM ubikala_properties
          WHERE (created_by = u.id OR created_by IN (SELECT id FROM ubikala_users WHERE parent_user_id = u.id))
          AND activo = true) DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    : await ubikalaDb`
        SELECT
          u.id, u.name, u.email, u.phone, u.avatar_url, u.role, u.company_name,
          u.bio, u.is_verified, u.created_at, u.parent_user_id,
          NULL as parent_company_name, NULL as parent_name,
          (SELECT COUNT(*) FROM ubikala_properties
           WHERE (created_by = u.id OR created_by IN (SELECT id FROM ubikala_users WHERE parent_user_id = u.id))
           AND activo = true) as properties_count
        FROM ubikala_users u
        WHERE u.is_active = true AND u.role = 'inmobiliaria'
        ORDER BY u.is_verified DESC, (
          SELECT COUNT(*) FROM ubikala_properties
          WHERE (created_by = u.id OR created_by IN (SELECT id FROM ubikala_users WHERE parent_user_id = u.id))
          AND activo = true) DESC
        LIMIT ${limit} OFFSET ${offset}
      `;

  return rows as UbikalaAgentRow[];
}

export async function getUbikalaInmobiliariasCount(country_code?: string): Promise<number> {
  if (!ubikalaDb) return 0;
  await ensureUsersCountryColumn();

  const rows = country_code
    ? await ubikalaDb`
        SELECT COUNT(*) as total FROM ubikala_users u
        WHERE u.is_active = true AND u.role = 'inmobiliaria' AND u.country_code = ${country_code}
      `
    : await ubikalaDb`
        SELECT COUNT(*) as total FROM ubikala_users u
        WHERE u.is_active = true AND u.role = 'inmobiliaria'
      `;

  return parseInt(rows[0]?.total || '0');
}

// ==================== CONTACT MESSAGES ====================

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

export async function createContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<ContactMessage> {
  if (!ubikalaDb) throw new Error('Database not configured');

  const rows = await ubikalaDb`
    INSERT INTO contact_messages (name, email, phone, subject, message)
    VALUES (${data.name}, ${data.email}, ${data.phone || null}, ${data.subject}, ${data.message})
    RETURNING *
  `;

  return rows[0] as ContactMessage;
}

export async function getAllContactMessages(options: { limit?: number; offset?: number } = {}): Promise<ContactMessage[]> {
  if (!ubikalaDb) return [];
  const { limit = 100, offset = 0 } = options;

  const rows = await ubikalaDb`
    SELECT * FROM contact_messages
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  return rows as ContactMessage[];
}

export async function updateContactMessageStatus(id: number, status: ContactMessage['status']): Promise<ContactMessage | null> {
  if (!ubikalaDb) return null;

  const rows = await ubikalaDb`
    UPDATE contact_messages
    SET status = ${status}
    WHERE id = ${id}
    RETURNING *
  `;

  return (rows[0] as ContactMessage) || null;
}

export async function countNewContactMessages(): Promise<number> {
  if (!ubikalaDb) return 0;

  const rows = await ubikalaDb`
    SELECT COUNT(*) as total FROM contact_messages WHERE status = 'new'
  `;

  return parseInt(rows[0]?.total || '0');
}

// Lead/Contact types - matches existing 'leads' table
export interface Lead {
  id: number;
  property_slug: string | null;
  property_title: string | null;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string;
  session_id: string | null;
  status: 'new' | 'contacted' | 'interested' | 'discarded' | 'closed';
  notes: string | null;
  agent_name: string | null;
  agent_company: string | null;
  created_at: string;
  updated_at: string;
}

// Create a new lead
export async function createLead(data: {
  property_slug?: string;
  property_title?: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source?: string;
  session_id?: string;
  agent_name?: string;
  agent_company?: string;
}): Promise<Lead> {
  if (!ubikalaDb) throw new Error('Database not configured');

  const rows = await ubikalaDb`
    INSERT INTO leads (property_slug, property_title, name, email, phone, message, source, session_id, agent_name, agent_company)
    VALUES (
      ${data.property_slug || null},
      ${data.property_title || null},
      ${data.name},
      ${data.email},
      ${data.phone || null},
      ${data.message || null},
      ${data.source || 'website'},
      ${data.session_id || null},
      ${data.agent_name || null},
      ${data.agent_company || null}
    )
    RETURNING *
  `;

  return rows[0] as Lead;
}

// Get leads filtered by agent name (for non-admin users)
export async function getLeadsByAgent(agentName: string, options: {
  limit?: number;
  offset?: number;
  status?: string;
}): Promise<Lead[]> {
  if (!ubikalaDb) return [];

  const { limit = 50, offset = 0 } = options;

  const rows = await ubikalaDb`
    SELECT * FROM leads
    WHERE agent_name = ${agentName}
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  return rows as Lead[];
}

// Get all leads (for admin)
export async function getAllLeads(options: {
  limit?: number;
  offset?: number;
  status?: string;
}): Promise<Lead[]> {
  if (!ubikalaDb) return [];

  const { limit = 50, offset = 0 } = options;

  const rows = await ubikalaDb`
    SELECT * FROM leads
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  return rows as Lead[];
}

// Update lead status
export async function updateLeadStatus(id: number, status: Lead['status'], notes?: string): Promise<Lead | null> {
  if (!ubikalaDb) return null;

  const rows = await ubikalaDb`
    UPDATE leads
    SET status = ${status}, notes = COALESCE(${notes || null}, notes), updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

  return rows[0] as Lead || null;
}

// Count all leads
export async function countAllLeads(): Promise<number> {
  if (!ubikalaDb) return 0;

  const rows = await ubikalaDb`
    SELECT COUNT(*) as count FROM leads
  `;

  return Number(rows[0]?.count || 0);
}

// Count new leads
export async function countNewLeads(): Promise<number> {
  if (!ubikalaDb) return 0;

  const rows = await ubikalaDb`
    SELECT COUNT(*) as count FROM leads WHERE status = 'new'
  `;

  return Number(rows[0]?.count || 0);
}

// Get lead statistics by time period (for admin dashboard)
export interface LeadStats {
  today: number;
  this_week: number;
  this_month: number;
  this_year: number;
  total: number;
  by_status: { status: string; count: number }[];
  by_source: { source: string; count: number }[];
}

export async function getLeadStats(): Promise<LeadStats> {
  if (!ubikalaDb) return { today: 0, this_week: 0, this_month: 0, this_year: 0, total: 0, by_status: [], by_source: [] };

  const [timeRows, statusRows, sourceRows] = await Promise.all([
    ubikalaDb`
      SELECT
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) as today,
        COUNT(*) FILTER (WHERE created_at >= date_trunc('week', CURRENT_DATE)) as this_week,
        COUNT(*) FILTER (WHERE created_at >= date_trunc('month', CURRENT_DATE)) as this_month,
        COUNT(*) FILTER (WHERE created_at >= date_trunc('year', CURRENT_DATE)) as this_year,
        COUNT(*) as total
      FROM leads
    `,
    ubikalaDb`
      SELECT status, COUNT(*) as count FROM leads GROUP BY status ORDER BY count DESC
    `,
    ubikalaDb`
      SELECT source, COUNT(*) as count FROM leads GROUP BY source ORDER BY count DESC
    `,
  ]);

  const t = timeRows[0] || {};
  return {
    today: Number(t.today || 0),
    this_week: Number(t.this_week || 0),
    this_month: Number(t.this_month || 0),
    this_year: Number(t.this_year || 0),
    total: Number(t.total || 0),
    by_status: statusRows as { status: string; count: number }[],
    by_source: sourceRows as { source: string; count: number }[],
  };
}

// ==================== PLANS ====================

// Get all plans
export async function getAllPlans(): Promise<UbikalaPlan[]> {
  if (!ubikalaDb) return [];
  const rows = await ubikalaDb`
    SELECT * FROM ubikala_plans
    ORDER BY role, price ASC
  `;
  return rows as UbikalaPlan[];
}

// Get plans by role
export async function getPlansByRole(role: UserRole): Promise<UbikalaPlan[]> {
  if (!ubikalaDb) return [];
  const rows = await ubikalaDb`
    SELECT * FROM ubikala_plans
    WHERE role = ${role} AND is_active = true
    ORDER BY price ASC
  `;
  return rows as UbikalaPlan[];
}

// Get plan by ID
export async function getPlanById(id: string): Promise<UbikalaPlan | null> {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`
    SELECT * FROM ubikala_plans WHERE id = ${id}
  `;
  return rows[0] as UbikalaPlan || null;
}

// Create plan
export async function createPlan(data: {
  name: string;
  role: UserRole;
  max_publications: number;
  publication_duration_days: number;
  max_team_members?: number;
  max_leads_per_month?: number;
  price?: number;
  features?: Record<string, any>;
}): Promise<UbikalaPlan> {
  if (!ubikalaDb) throw new Error('Database not configured');
  const rows = await ubikalaDb`
    INSERT INTO ubikala_plans (name, role, max_publications, publication_duration_days, max_team_members, max_leads_per_month, price, features)
    VALUES (
      ${data.name},
      ${data.role},
      ${data.max_publications},
      ${data.publication_duration_days},
      ${data.max_team_members || null},
      ${data.max_leads_per_month || null},
      ${data.price || 0},
      ${JSON.stringify(data.features || {})}
    )
    RETURNING *
  `;
  return rows[0] as UbikalaPlan;
}

// Update plan
export async function updatePlan(id: string, data: Partial<{
  name: string;
  role: UserRole;
  max_publications: number;
  publication_duration_days: number;
  max_team_members: number | null;
  max_leads_per_month: number | null;
  price: number;
  features: Record<string, any>;
  is_active: boolean;
}>): Promise<UbikalaPlan | null> {
  if (!ubikalaDb) return null;

  const currentPlan = await getPlanById(id);
  if (!currentPlan) return null;

  const name = data.name !== undefined ? data.name : currentPlan.name;
  const role = data.role !== undefined ? data.role : currentPlan.role;
  const max_publications = data.max_publications !== undefined ? data.max_publications : currentPlan.max_publications;
  const publication_duration_days = data.publication_duration_days !== undefined ? data.publication_duration_days : currentPlan.publication_duration_days;
  const max_team_members = data.max_team_members !== undefined ? data.max_team_members : currentPlan.max_team_members;
  const max_leads_per_month = data.max_leads_per_month !== undefined ? data.max_leads_per_month : currentPlan.max_leads_per_month;
  const price = data.price !== undefined ? data.price : currentPlan.price;
  const features = data.features !== undefined ? data.features : currentPlan.features;
  const is_active = data.is_active !== undefined ? data.is_active : currentPlan.is_active;

  const rows = await ubikalaDb`
    UPDATE ubikala_plans
    SET
      name = ${name},
      role = ${role},
      max_publications = ${max_publications},
      publication_duration_days = ${publication_duration_days},
      max_team_members = ${max_team_members},
      max_leads_per_month = ${max_leads_per_month},
      price = ${price},
      features = ${JSON.stringify(features)},
      is_active = ${is_active},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as UbikalaPlan || null;
}

// Delete plan
export async function deletePlan(id: string): Promise<boolean> {
  if (!ubikalaDb) return false;
  await ubikalaDb`DELETE FROM ubikala_plans WHERE id = ${id}`;
  return true;
}

// ==================== TEAM / HIERARCHY ====================

// Get team members for an inmobiliaria
export async function getTeamMembers(parentUserId: string): Promise<UbikalaUser[]> {
  if (!ubikalaDb) return [];
  const rows = await ubikalaDb`
    SELECT id, email, name, role, avatar_url, phone, bio, plan_id, parent_user_id, custom_publication_limit, is_active, is_verified, last_login_at, created_at, updated_at
    FROM ubikala_users
    WHERE parent_user_id = ${parentUserId}
    ORDER BY created_at DESC
  `;
  return rows as UbikalaUser[];
}

// Create team member under inmobiliaria
export async function createTeamMember(parentUserId: string, data: {
  email: string;
  password_hash: string;
  name: string;
  role: UserRole;
  phone?: string;
  custom_publication_limit?: number;
}): Promise<UbikalaUser> {
  if (!ubikalaDb) throw new Error('Database not configured');
  const rows = await ubikalaDb`
    INSERT INTO ubikala_users (email, password_hash, name, role, phone, parent_user_id, custom_publication_limit)
    VALUES (
      ${data.email},
      ${data.password_hash},
      ${data.name},
      ${data.role},
      ${data.phone || null},
      ${parentUserId},
      ${data.custom_publication_limit || null}
    )
    RETURNING *
  `;
  return rows[0] as UbikalaUser;
}

// Get team stats for inmobiliaria
export async function getTeamStats(parentUserId: string): Promise<TeamStats> {
  if (!ubikalaDb) return { total_members: 0, total_publications: 0, total_leads: 0, leads_by_member: [], publications_by_member: [] };

  // Get team members
  const members = await getTeamMembers(parentUserId);
  const memberIds = members.map(m => m.id);

  if (memberIds.length === 0) {
    return { total_members: 0, total_publications: 0, total_leads: 0, leads_by_member: [], publications_by_member: [] };
  }

  // Get publications by member
  const publications = await ubikalaDb`
    SELECT created_by as user_id, COUNT(*) as count
    FROM ubikala_properties
    WHERE created_by = ANY(${memberIds})
    GROUP BY created_by
  `;

  // Get leads by member (using agent_name matching user name)
  const memberNames = members.map(m => m.name);
  const leads = await ubikalaDb`
    SELECT agent_name, COUNT(*) as count
    FROM leads
    WHERE agent_name = ANY(${memberNames})
    GROUP BY agent_name
  `;

  // Map publications to members
  const publicationsByMember = members.map(m => {
    const pub = publications.find((p: any) => p.user_id === m.id);
    return { user_id: m.id, name: m.name, count: Number(pub?.count || 0) };
  });

  // Map leads to members
  const leadsByMember = members.map(m => {
    const lead = leads.find((l: any) => l.agent_name === m.name);
    return { user_id: m.id, name: m.name, leads_count: Number(lead?.count || 0) };
  });

  const totalPublications = publicationsByMember.reduce((sum, p) => sum + p.count, 0);
  const totalLeads = leadsByMember.reduce((sum, l) => sum + l.leads_count, 0);

  return {
    total_members: members.length,
    total_publications: totalPublications,
    total_leads: totalLeads,
    leads_by_member: leadsByMember,
    publications_by_member: publicationsByMember
  };
}

// Count team members
export async function countTeamMembers(parentUserId: string): Promise<number> {
  if (!ubikalaDb) return 0;
  const rows = await ubikalaDb`
    SELECT COUNT(*) as count FROM ubikala_users WHERE parent_user_id = ${parentUserId}
  `;
  return Number(rows[0]?.count || 0);
}

// Update team member publication limit
export async function updateTeamMemberLimit(memberId: string, limit: number | null): Promise<UbikalaUser | null> {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`
    UPDATE ubikala_users
    SET custom_publication_limit = ${limit}, updated_at = NOW()
    WHERE id = ${memberId}
    RETURNING *
  `;
  return rows[0] as UbikalaUser || null;
}

// ==================== PROFILE ====================

// Update user profile (bio, avatar, phone)
export async function updateUserProfile(userId: string, data: {
  bio?: string;
  avatar_url?: string;
  phone?: string;
  name?: string;
}): Promise<UbikalaUser | null> {
  if (!ubikalaDb) return null;

  const currentUser = await getUserById(userId);
  if (!currentUser) return null;

  const bio = data.bio !== undefined ? data.bio : currentUser.bio;
  const avatar_url = data.avatar_url !== undefined ? data.avatar_url : currentUser.avatar_url;
  const phone = data.phone !== undefined ? data.phone : currentUser.phone;
  const name = data.name !== undefined ? data.name : currentUser.name;

  const rows = await ubikalaDb`
    UPDATE ubikala_users
    SET bio = ${bio}, avatar_url = ${avatar_url}, phone = ${phone}, name = ${name}, updated_at = NOW()
    WHERE id = ${userId}
    RETURNING *
  `;
  return rows[0] as UbikalaUser || null;
}

// Get user with plan info
export async function getUserWithPlan(userId: string): Promise<(UbikalaUser & { plan?: UbikalaPlan }) | null> {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`
    SELECT u.*, p.name as plan_name, p.price as plan_price, p.max_publications, p.publication_duration_days, p.max_team_members, p.max_leads_per_month
    FROM ubikala_users u
    LEFT JOIN ubikala_plans p ON u.plan_id = p.id
    WHERE u.id = ${userId}
  `;
  if (!rows[0]) return null;
  const user = rows[0] as any;
  if (user.plan_id) {
    user.plan = {
      id: user.plan_id,
      name: user.plan_name,
      price: user.plan_price,
      max_publications: user.max_publications,
      publication_duration_days: user.publication_duration_days,
      max_team_members: user.max_team_members,
      max_leads_per_month: user.max_leads_per_month
    };
  }
  return user as (UbikalaUser & { plan?: UbikalaPlan });
}

// ==================== PARENT COMPANY INFO ====================

// Get parent company info for team members
export async function getParentCompanyInfo(userId: string): Promise<{
  company_name: string | null;
  company_logo: string | null;
  company_description: string | null;
  company_website: string | null;
  company_address: string | null;
  parent_name: string;
  parent_email: string;
  parent_phone: string | null;
} | null> {
  if (!ubikalaDb) return null;

  // First get the user to find their parent_user_id
  const user = await getUserById(userId);
  if (!user || !user.parent_user_id) return null;

  // Get parent user info
  const rows = await ubikalaDb`
    SELECT company_name, company_logo, company_description, company_website, company_address, name, email, phone
    FROM ubikala_users
    WHERE id = ${user.parent_user_id}
  `;

  if (!rows[0]) return null;

  return {
    company_name: rows[0].company_name,
    company_logo: rows[0].company_logo,
    company_description: rows[0].company_description,
    company_website: rows[0].company_website,
    company_address: rows[0].company_address,
    parent_name: rows[0].name,
    parent_email: rows[0].email,
    parent_phone: rows[0].phone
  };
}

// Get user consumption stats (publications used vs limit)
export interface UserConsumption {
  publications_used: number;
  publications_limit: number | null; // null = unlimited (0 in plan) or no limit set
  leads_generated: number;
  leads_limit: number | null;
  team_used: number;
  team_limit: number | null;
  is_team_member: boolean;
  parent_company_name: string | null;
}

export async function getUserConsumption(userId: string): Promise<UserConsumption> {
  const defaultReturn: UserConsumption = {
    publications_used: 0,
    publications_limit: null,
    leads_generated: 0,
    leads_limit: null,
    team_used: 0,
    team_limit: null,
    is_team_member: false,
    parent_company_name: null
  };

  if (!ubikalaDb) return defaultReturn;

  const user = await getUserById(userId);
  if (!user) return defaultReturn;

  // Count publications
  const pubRows = await ubikalaDb`
    SELECT COUNT(*) as count FROM ubikala_properties WHERE created_by = ${userId}
  `;
  const publications_used = Number(pubRows[0]?.count || 0);

  // Count leads (by agent_name matching user name)
  const leadRows = await ubikalaDb`
    SELECT COUNT(*) as count FROM leads WHERE agent_name = ${user.name}
  `;
  const leads_generated = Number(leadRows[0]?.count || 0);

  // Count team members (for inmobiliarias)
  let team_used = 0;
  if (user.role === 'inmobiliaria') {
    const teamRows = await ubikalaDb`
      SELECT COUNT(*) as count FROM ubikala_users WHERE parent_user_id = ${userId}
    `;
    team_used = Number(teamRows[0]?.count || 0);
  }

  // Get limit - either from custom limit (if team member) or from plan
  let publications_limit: number | null = null;
  let leads_limit: number | null = null;
  let team_limit: number | null = null;
  let parent_company_name: string | null = null;

  if (user.parent_user_id) {
    // Team member - get custom limit or parent's plan
    if (user.custom_publication_limit !== null) {
      publications_limit = user.custom_publication_limit === 0 ? null : user.custom_publication_limit;
    } else {
      // Get parent's plan limits
      const parent = await getUserWithPlan(user.parent_user_id);
      if (parent?.plan) {
        // Team members don't have individual publication limits from plan, use custom or unlimited
        publications_limit = null;
      }
      parent_company_name = parent?.company_name || null;
    }

    // Get parent company name if not already set
    if (!parent_company_name) {
      const parentInfo = await getParentCompanyInfo(userId);
      parent_company_name = parentInfo?.company_name || null;
    }
  } else if (user.plan_id) {
    // Has a plan - get limits from plan
    const userWithPlan = await getUserWithPlan(userId);
    if (userWithPlan?.plan) {
      publications_limit = userWithPlan.plan.max_publications === 0 ? null : userWithPlan.plan.max_publications;
      leads_limit = userWithPlan.plan.max_leads_per_month === 0 ? null : userWithPlan.plan.max_leads_per_month;
      team_limit = userWithPlan.plan.max_team_members === 0 ? null : userWithPlan.plan.max_team_members;
    }
  }

  return {
    publications_used,
    publications_limit,
    leads_generated,
    leads_limit,
    team_used,
    team_limit,
    is_team_member: !!user.parent_user_id,
    parent_company_name
  };
}

// Update company profile for inmobiliarias
export async function updateCompanyProfile(userId: string, data: {
  company_name?: string;
  company_logo?: string;
  company_description?: string;
  company_website?: string;
  company_address?: string;
}): Promise<UbikalaUser | null> {
  if (!ubikalaDb) return null;

  const user = await getUserById(userId);
  if (!user) return null;

  const company_name = data.company_name !== undefined ? data.company_name : user.company_name;
  const company_logo = data.company_logo !== undefined ? data.company_logo : user.company_logo;
  const company_description = data.company_description !== undefined ? data.company_description : user.company_description;
  const company_website = data.company_website !== undefined ? data.company_website : user.company_website;
  const company_address = data.company_address !== undefined ? data.company_address : user.company_address;

  const rows = await ubikalaDb`
    UPDATE ubikala_users
    SET
      company_name = ${company_name},
      company_logo = ${company_logo},
      company_description = ${company_description},
      company_website = ${company_website},
      company_address = ${company_address},
      updated_at = NOW()
    WHERE id = ${userId}
    RETURNING *
  `;
  return rows[0] as UbikalaUser || null;
}

// ============================================
// PROMO CODES
// ============================================

export interface PromoCode {
  id: string;
  code: string;
  description: string | null;
  discount_type: 'percentage' | 'fixed' | 'trial_days' | 'free_months';
  discount_value: number;
  max_uses: number | null;
  used_count: number;
  valid_from: string;
  valid_until: string | null;
  applicable_roles: string[] | null;
  applicable_plans: string[] | null;
  is_active: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export async function getAllPromoCodes(): Promise<PromoCode[]> {
  if (!ubikalaDb) return [];
  const rows = await ubikalaDb`SELECT * FROM ubikala_promo_codes ORDER BY created_at DESC`;
  return rows as PromoCode[];
}

export async function getPromoCodeById(id: string): Promise<PromoCode | null> {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`SELECT * FROM ubikala_promo_codes WHERE id = ${id}`;
  return rows[0] as PromoCode || null;
}

export async function getPromoCodeByCode(code: string): Promise<PromoCode | null> {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`SELECT * FROM ubikala_promo_codes WHERE UPPER(code) = UPPER(${code})`;
  return rows[0] as PromoCode || null;
}

export async function validatePromoCode(code: string, userRole: UserRole, planId?: string): Promise<{
  valid: boolean;
  error?: string;
  promoCode?: PromoCode;
}> {
  const promo = await getPromoCodeByCode(code);

  if (!promo) {
    return { valid: false, error: 'Código promocional no encontrado' };
  }

  if (!promo.is_active) {
    return { valid: false, error: 'Este código promocional no está activo' };
  }

  const now = new Date();
  if (promo.valid_from && new Date(promo.valid_from) > now) {
    return { valid: false, error: 'Este código promocional aún no es válido' };
  }

  if (promo.valid_until && new Date(promo.valid_until) < now) {
    return { valid: false, error: 'Este código promocional ha expirado' };
  }

  if (promo.max_uses !== null && promo.used_count >= promo.max_uses) {
    return { valid: false, error: 'Este código promocional ha alcanzado su límite de uso' };
  }

  if (promo.applicable_roles && promo.applicable_roles.length > 0) {
    if (!promo.applicable_roles.includes(userRole)) {
      return { valid: false, error: 'Este código no aplica para tu tipo de cuenta' };
    }
  }

  if (planId && promo.applicable_plans && promo.applicable_plans.length > 0) {
    if (!promo.applicable_plans.includes(planId)) {
      return { valid: false, error: 'Este código no aplica para el plan seleccionado' };
    }
  }

  return { valid: true, promoCode: promo };
}

export async function createPromoCode(data: {
  code: string;
  description?: string;
  discount_type: 'percentage' | 'fixed' | 'trial_days' | 'free_months';
  discount_value: number;
  max_uses?: number;
  valid_from?: string;
  valid_until?: string;
  applicable_roles?: string[];
  applicable_plans?: string[];
  is_active?: boolean;
  created_by?: string;
}): Promise<PromoCode> {
  if (!ubikalaDb) throw new Error('Database not configured');

  const rows = await ubikalaDb`
    INSERT INTO ubikala_promo_codes (
      code, description, discount_type, discount_value, max_uses,
      valid_from, valid_until, applicable_roles, applicable_plans, is_active, created_by
    ) VALUES (
      ${data.code.toUpperCase()},
      ${data.description || null},
      ${data.discount_type},
      ${data.discount_value},
      ${data.max_uses || null},
      ${data.valid_from || new Date().toISOString()},
      ${data.valid_until || null},
      ${data.applicable_roles || null},
      ${data.applicable_plans || null},
      ${data.is_active !== undefined ? data.is_active : true},
      ${data.created_by || null}
    )
    RETURNING *
  `;
  return rows[0] as PromoCode;
}

export async function updatePromoCode(id: string, data: Partial<PromoCode>): Promise<PromoCode | null> {
  if (!ubikalaDb) return null;

  const current = await getPromoCodeById(id);
  if (!current) return null;

  const rows = await ubikalaDb`
    UPDATE ubikala_promo_codes SET
      code = ${data.code?.toUpperCase() || current.code},
      description = ${data.description !== undefined ? data.description : current.description},
      discount_type = ${data.discount_type || current.discount_type},
      discount_value = ${data.discount_value !== undefined ? data.discount_value : current.discount_value},
      max_uses = ${data.max_uses !== undefined ? data.max_uses : current.max_uses},
      valid_from = ${data.valid_from || current.valid_from},
      valid_until = ${data.valid_until !== undefined ? data.valid_until : current.valid_until},
      applicable_roles = ${data.applicable_roles !== undefined ? data.applicable_roles : current.applicable_roles},
      applicable_plans = ${data.applicable_plans !== undefined ? data.applicable_plans : current.applicable_plans},
      is_active = ${data.is_active !== undefined ? data.is_active : current.is_active},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as PromoCode || null;
}

export async function deletePromoCode(id: string): Promise<boolean> {
  if (!ubikalaDb) return false;
  await ubikalaDb`DELETE FROM ubikala_promo_codes WHERE id = ${id}`;
  return true;
}

export async function usePromoCode(promoCodeId: string, userId: string, discountApplied: number): Promise<void> {
  if (!ubikalaDb) return;

  await ubikalaDb`
    INSERT INTO ubikala_promo_code_usage (promo_code_id, user_id, discount_applied)
    VALUES (${promoCodeId}, ${userId}, ${discountApplied})
  `;

  await ubikalaDb`
    UPDATE ubikala_promo_codes SET used_count = used_count + 1 WHERE id = ${promoCodeId}
  `;

  await ubikalaDb`
    UPDATE ubikala_users SET promo_code_used = ${promoCodeId} WHERE id = ${userId}
  `;
}

// ============================================
// PROMO CODE USAGE QUERIES
// ============================================

export interface PromoCodeUsage {
  id: string;
  promo_code_id: string;
  user_id: string;
  used_at: string;
  discount_applied: number;
  user_name?: string;
  user_email?: string;
  user_role?: string;
}

export async function getPromoCodeUsage(promoCodeId: string): Promise<PromoCodeUsage[]> {
  if (!ubikalaDb) return [];
  const rows = await ubikalaDb`
    SELECT
      pcu.*,
      u.name as user_name,
      u.email as user_email,
      u.role as user_role
    FROM ubikala_promo_code_usage pcu
    LEFT JOIN ubikala_users u ON pcu.user_id = u.id
    WHERE pcu.promo_code_id = ${promoCodeId}
    ORDER BY pcu.used_at DESC
  `;
  return rows as PromoCodeUsage[];
}

export async function getUserActivePromoCode(userId: string): Promise<(PromoCode & { used_at: string }) | null> {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`
    SELECT pc.*, pcu.used_at
    FROM ubikala_promo_codes pc
    JOIN ubikala_promo_code_usage pcu ON pc.id = pcu.promo_code_id
    WHERE pcu.user_id = ${userId}
    ORDER BY pcu.used_at DESC
    LIMIT 1
  `;
  return rows[0] as (PromoCode & { used_at: string }) || null;
}

// ============================================
// VERIFICATION SYSTEM
// ============================================

export interface VerificationDocument {
  id: string;
  name: string;
  description: string | null;
  required_for_roles: string[];
  is_required: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface VerificationRequest {
  id: string;
  user_id: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  submitted_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  rejection_reason: string | null;
  admin_notes: string | null;
  // Joined fields
  user_name?: string;
  user_email?: string;
  user_role?: string;
}

export interface UserDocument {
  id: string;
  user_id: string;
  verification_request_id: string;
  document_type_id: string;
  file_url: string;
  file_name: string | null;
  uploaded_at: string;
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason: string | null;
  // Joined fields
  document_name?: string;
}

// Verification Documents Management
export async function getVerificationDocuments(role?: UserRole): Promise<VerificationDocument[]> {
  if (!ubikalaDb) return [];

  if (role) {
    const rows = await ubikalaDb`
      SELECT * FROM ubikala_verification_documents
      WHERE is_active = true AND ${role} = ANY(required_for_roles)
      ORDER BY sort_order, name
    `;
    return rows as VerificationDocument[];
  }

  const rows = await ubikalaDb`
    SELECT * FROM ubikala_verification_documents
    ORDER BY sort_order, name
  `;
  return rows as VerificationDocument[];
}

export async function getVerificationDocumentById(id: string): Promise<VerificationDocument | null> {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`SELECT * FROM ubikala_verification_documents WHERE id = ${id}`;
  return rows[0] as VerificationDocument || null;
}

export async function createVerificationDocument(data: {
  name: string;
  description?: string;
  required_for_roles: string[];
  is_required?: boolean;
  sort_order?: number;
}): Promise<VerificationDocument> {
  if (!ubikalaDb) throw new Error('Database not configured');

  const rows = await ubikalaDb`
    INSERT INTO ubikala_verification_documents (name, description, required_for_roles, is_required, sort_order)
    VALUES (${data.name}, ${data.description || null}, ${data.required_for_roles}, ${data.is_required !== false}, ${data.sort_order || 0})
    RETURNING *
  `;
  return rows[0] as VerificationDocument;
}

export async function updateVerificationDocument(id: string, data: Partial<VerificationDocument>): Promise<VerificationDocument | null> {
  if (!ubikalaDb) return null;

  const current = await getVerificationDocumentById(id);
  if (!current) return null;

  const rows = await ubikalaDb`
    UPDATE ubikala_verification_documents SET
      name = ${data.name || current.name},
      description = ${data.description !== undefined ? data.description : current.description},
      required_for_roles = ${data.required_for_roles || current.required_for_roles},
      is_required = ${data.is_required !== undefined ? data.is_required : current.is_required},
      is_active = ${data.is_active !== undefined ? data.is_active : current.is_active},
      sort_order = ${data.sort_order !== undefined ? data.sort_order : current.sort_order},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as VerificationDocument || null;
}

export async function deleteVerificationDocument(id: string): Promise<boolean> {
  if (!ubikalaDb) return false;
  await ubikalaDb`DELETE FROM ubikala_verification_documents WHERE id = ${id}`;
  return true;
}

// Verification Requests
export async function getVerificationRequests(status?: string): Promise<VerificationRequest[]> {
  if (!ubikalaDb) return [];

  if (status) {
    const rows = await ubikalaDb`
      SELECT vr.*, u.name as user_name, u.email as user_email, u.role as user_role
      FROM ubikala_verification_requests vr
      JOIN ubikala_users u ON vr.user_id = u.id
      WHERE vr.status = ${status}
      ORDER BY vr.submitted_at DESC
    `;
    return rows as VerificationRequest[];
  }

  const rows = await ubikalaDb`
    SELECT vr.*, u.name as user_name, u.email as user_email, u.role as user_role
    FROM ubikala_verification_requests vr
    JOIN ubikala_users u ON vr.user_id = u.id
    ORDER BY vr.submitted_at DESC
  `;
  return rows as VerificationRequest[];
}

export async function getVerificationRequestById(id: string): Promise<VerificationRequest | null> {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`
    SELECT vr.*, u.name as user_name, u.email as user_email, u.role as user_role
    FROM ubikala_verification_requests vr
    JOIN ubikala_users u ON vr.user_id = u.id
    WHERE vr.id = ${id}
  `;
  return rows[0] as VerificationRequest || null;
}

export async function getVerificationRequestByUserId(userId: string): Promise<VerificationRequest | null> {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`
    SELECT * FROM ubikala_verification_requests WHERE user_id = ${userId}
  `;
  return rows[0] as VerificationRequest || null;
}

export async function createVerificationRequest(userId: string): Promise<VerificationRequest> {
  if (!ubikalaDb) throw new Error('Database not configured');

  // Check if user already has a request
  const existing = await getVerificationRequestByUserId(userId);
  if (existing) {
    // If rejected, allow re-submission
    if (existing.status === 'rejected') {
      await ubikalaDb`DELETE FROM ubikala_verification_requests WHERE id = ${existing.id}`;
    } else {
      throw new Error('Ya tienes una solicitud de verificación en proceso');
    }
  }

  const rows = await ubikalaDb`
    INSERT INTO ubikala_verification_requests (user_id, status)
    VALUES (${userId}, 'pending')
    RETURNING *
  `;
  return rows[0] as VerificationRequest;
}

export async function updateVerificationRequestStatus(
  requestId: string,
  status: 'pending' | 'under_review' | 'approved' | 'rejected',
  reviewedBy: string,
  rejectionReason?: string,
  adminNotes?: string
): Promise<VerificationRequest | null> {
  if (!ubikalaDb) return null;

  const rows = await ubikalaDb`
    UPDATE ubikala_verification_requests SET
      status = ${status},
      reviewed_at = NOW(),
      reviewed_by = ${reviewedBy},
      rejection_reason = ${rejectionReason || null},
      admin_notes = ${adminNotes || null}
    WHERE id = ${requestId}
    RETURNING *
  `;

  // If approved, update user's verified status
  if (status === 'approved' && rows[0]) {
    const request = rows[0] as VerificationRequest;
    await ubikalaDb`
      UPDATE ubikala_users SET
        is_verified = true,
        verified_at = NOW(),
        verified_by = ${reviewedBy}
      WHERE id = ${request.user_id}
    `;

    // If user is an inmobiliaria, verify all their team members
    const user = await getUserById(request.user_id);
    if (user?.role === 'inmobiliaria') {
      await ubikalaDb`
        UPDATE ubikala_users SET
          is_verified = true,
          verified_at = NOW(),
          verified_by = ${reviewedBy}
        WHERE parent_user_id = ${request.user_id}
      `;
    }
  }

  return rows[0] as VerificationRequest || null;
}

// User Documents
export async function getUserDocuments(userId: string): Promise<UserDocument[]> {
  if (!ubikalaDb) return [];

  const rows = await ubikalaDb`
    SELECT ud.*, vd.name as document_name
    FROM ubikala_user_documents ud
    JOIN ubikala_verification_documents vd ON ud.document_type_id = vd.id
    WHERE ud.user_id = ${userId}
    ORDER BY ud.uploaded_at DESC
  `;
  return rows as UserDocument[];
}

export async function getDocumentsByRequest(requestId: string): Promise<UserDocument[]> {
  if (!ubikalaDb) return [];

  const rows = await ubikalaDb`
    SELECT ud.*, vd.name as document_name
    FROM ubikala_user_documents ud
    JOIN ubikala_verification_documents vd ON ud.document_type_id = vd.id
    WHERE ud.verification_request_id = ${requestId}
    ORDER BY ud.uploaded_at DESC
  `;
  return rows as UserDocument[];
}

export async function uploadUserDocument(data: {
  user_id: string;
  verification_request_id: string;
  document_type_id: string;
  file_url: string;
  file_name?: string;
}): Promise<UserDocument> {
  if (!ubikalaDb) throw new Error('Database not configured');

  // Delete existing document of same type if exists
  await ubikalaDb`
    DELETE FROM ubikala_user_documents
    WHERE user_id = ${data.user_id} AND document_type_id = ${data.document_type_id}
  `;

  const rows = await ubikalaDb`
    INSERT INTO ubikala_user_documents (user_id, verification_request_id, document_type_id, file_url, file_name)
    VALUES (${data.user_id}, ${data.verification_request_id}, ${data.document_type_id}, ${data.file_url}, ${data.file_name || null})
    RETURNING *
  `;
  return rows[0] as UserDocument;
}

export async function updateDocumentStatus(
  documentId: string,
  status: 'pending' | 'approved' | 'rejected',
  rejectionReason?: string
): Promise<UserDocument | null> {
  if (!ubikalaDb) return null;

  const rows = await ubikalaDb`
    UPDATE ubikala_user_documents SET
      status = ${status},
      rejection_reason = ${rejectionReason || null}
    WHERE id = ${documentId}
    RETURNING *
  `;
  return rows[0] as UserDocument || null;
}

// User plan assignment
export async function assignPlanToUser(userId: string, planId: string): Promise<UbikalaUser | null> {
  if (!ubikalaDb) return null;

  const rows = await ubikalaDb`
    UPDATE ubikala_users SET
      plan_id = ${planId},
      updated_at = NOW()
    WHERE id = ${userId}
    RETURNING *
  `;
  return rows[0] as UbikalaUser || null;
}

export async function removePlanFromUser(userId: string): Promise<UbikalaUser | null> {
  if (!ubikalaDb) return null;

  const rows = await ubikalaDb`
    UPDATE ubikala_users SET
      plan_id = NULL,
      updated_at = NOW()
    WHERE id = ${userId}
    RETURNING *
  `;
  return rows[0] as UbikalaUser || null;
}

// ==================== PUBLICATION LIMITS ====================

// Default free plan limits for users without a plan
export const DEFAULT_FREE_LIMITS = {
  max_publications: 3,
  publication_duration_days: 30,
  max_team_members: 0,
  max_leads_per_month: 10
};

// Check if user can publish a new property
export interface PublicationCheckResult {
  canPublish: boolean;
  reason?: string;
  currentCount: number;
  limit: number | null;
  isUnlimited: boolean;
}

export async function canUserPublish(userId: string): Promise<PublicationCheckResult> {
  if (!ubikalaDb) {
    return { canPublish: false, reason: 'Base de datos no configurada', currentCount: 0, limit: 0, isUnlimited: false };
  }

  const user = await getUserById(userId);
  if (!user) {
    return { canPublish: false, reason: 'Usuario no encontrado', currentCount: 0, limit: 0, isUnlimited: false };
  }

  // Admin can always publish
  if (user.role === 'admin') {
    return { canPublish: true, currentCount: 0, limit: null, isUnlimited: true };
  }

  // Get current publication count
  const currentCount = await countPropertiesByUser(userId);

  // Determine the publication limit
  let limit: number | null = null;

  if (user.parent_user_id) {
    // Team member - check custom limit first
    if (user.custom_publication_limit !== null) {
      limit = user.custom_publication_limit === 0 ? null : user.custom_publication_limit;
    } else {
      // Team members without custom limit use a reasonable default
      limit = DEFAULT_FREE_LIMITS.max_publications;
    }
  } else if (user.plan_id) {
    // Has a plan - get limits from plan
    const userWithPlan = await getUserWithPlan(userId);
    if (userWithPlan?.plan) {
      limit = userWithPlan.plan.max_publications === 0 ? null : userWithPlan.plan.max_publications;
    }
  } else {
    // No plan - use default free limits
    limit = DEFAULT_FREE_LIMITS.max_publications;
  }

  // null means unlimited
  if (limit === null) {
    return { canPublish: true, currentCount, limit: null, isUnlimited: true };
  }

  // Check if at or over limit
  if (currentCount >= limit) {
    return {
      canPublish: false,
      reason: `Has alcanzado el límite de ${limit} publicaciones. Actualiza tu plan para publicar más propiedades.`,
      currentCount,
      limit,
      isUnlimited: false
    };
  }

  return { canPublish: true, currentCount, limit, isUnlimited: false };
}

// Check if inmobiliaria can add a new team member
export interface TeamMemberCheckResult {
  canAdd: boolean;
  reason?: string;
  currentCount: number;
  limit: number | null;
  isUnlimited: boolean;
}

export async function canAddTeamMember(userId: string): Promise<TeamMemberCheckResult> {
  if (!ubikalaDb) {
    return { canAdd: false, reason: 'Base de datos no configurada', currentCount: 0, limit: 0, isUnlimited: false };
  }

  const user = await getUserById(userId);
  if (!user) {
    return { canAdd: false, reason: 'Usuario no encontrado', currentCount: 0, limit: 0, isUnlimited: false };
  }

  // Only inmobiliarias and admins can have team members
  if (user.role !== 'inmobiliaria' && user.role !== 'admin') {
    return { canAdd: false, reason: 'Solo las inmobiliarias pueden tener miembros de equipo', currentCount: 0, limit: 0, isUnlimited: false };
  }

  // Admin can always add team members
  if (user.role === 'admin') {
    return { canAdd: true, currentCount: 0, limit: null, isUnlimited: true };
  }

  // Get current team member count
  const currentCount = await countTeamMembers(userId);

  // Determine the team member limit
  let limit: number | null = null;

  if (user.plan_id) {
    const userWithPlan = await getUserWithPlan(userId);
    if (userWithPlan?.plan) {
      limit = userWithPlan.plan.max_team_members === 0 || userWithPlan.plan.max_team_members === null
        ? null
        : userWithPlan.plan.max_team_members;
    }
  } else {
    // No plan - use default (0 means no team members allowed)
    limit = DEFAULT_FREE_LIMITS.max_team_members;
  }

  // null means unlimited
  if (limit === null) {
    return { canAdd: true, currentCount, limit: null, isUnlimited: true };
  }

  // Check if at or over limit
  if (currentCount >= limit) {
    return {
      canAdd: false,
      reason: limit === 0
        ? 'Tu plan actual no incluye miembros de equipo. Actualiza tu plan para agregar colaboradores.'
        : `Has alcanzado el límite de ${limit} miembros de equipo. Actualiza tu plan para agregar más.`,
      currentCount,
      limit,
      isUnlimited: false
    };
  }

  return { canAdd: true, currentCount, limit, isUnlimited: false };
}

// ============================================
// SITE CONFIG (Ubikala.com Settings per country)
// ============================================

export interface SiteConfigRecord {
  id?: string;
  country_code: string;
  domain: string;
  company_name: string;
  company_slogan: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  email: string | null;
  phone: string | null;
  phone_display: string | null;
  whatsapp: string | null;
  business_hours: string | null;
  address_street: string | null;
  address_city: string | null;
  address_country: string | null;
  geo_latitude: string | null;
  geo_longitude: string | null;
  social_facebook: string | null;
  social_instagram: string | null;
  social_linkedin: string | null;
  social_youtube: string | null;
  social_twitter: string | null;
  social_tiktok: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  smtp_host: string | null;
  smtp_port: number | null;
  smtp_user: string | null;
  smtp_password: string | null;
  smtp_from_email: string | null;
  smtp_from_name: string | null;
  smtp_encryption: string | null;
  created_at?: string;
  updated_at?: string;
}

let siteConfigTableEnsured = false;

export async function ensureSiteConfigTable(): Promise<void> {
  if (!ubikalaDb || siteConfigTableEnsured) return;

  await ubikalaDb`
    CREATE TABLE IF NOT EXISTS ubikala_site_config (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      country_code VARCHAR(5) NOT NULL DEFAULT 'DO',
      domain VARCHAR(255) NOT NULL DEFAULT 'ubikala.com',
      company_name VARCHAR(255) DEFAULT 'Ubikala',
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
      geo_latitude VARCHAR(20),
      geo_longitude VARCHAR(20),
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
      smtp_password VARCHAR(255),
      smtp_from_email VARCHAR(255),
      smtp_from_name VARCHAR(255),
      smtp_encryption VARCHAR(10) DEFAULT 'tls',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(country_code)
    )
  `;
  siteConfigTableEnsured = true;
}

export async function getSiteConfigByCountry(countryCode: string): Promise<SiteConfigRecord | null> {
  if (!ubikalaDb) return null;
  await ensureSiteConfigTable();

  const rows = await ubikalaDb`
    SELECT * FROM ubikala_site_config WHERE country_code = ${countryCode.toUpperCase()}
  `;
  return rows[0] as SiteConfigRecord || null;
}

export async function getAllSiteConfigs(): Promise<SiteConfigRecord[]> {
  if (!ubikalaDb) return [];
  await ensureSiteConfigTable();

  const rows = await ubikalaDb`
    SELECT * FROM ubikala_site_config ORDER BY country_code
  `;
  return rows as SiteConfigRecord[];
}

export async function upsertSiteConfig(config: Partial<SiteConfigRecord> & { country_code: string }): Promise<SiteConfigRecord> {
  if (!ubikalaDb) throw new Error('Database not configured');
  await ensureSiteConfigTable();

  const rows = await ubikalaDb`
    INSERT INTO ubikala_site_config (
      country_code, domain, company_name, company_slogan,
      logo_url, favicon_url, email, phone, phone_display,
      whatsapp, business_hours, address_street, address_city,
      address_country, geo_latitude, geo_longitude,
      social_facebook, social_instagram, social_linkedin,
      social_youtube, social_twitter, social_tiktok,
      meta_title, meta_description, og_image,
      smtp_host, smtp_port, smtp_user, smtp_password,
      smtp_from_email, smtp_from_name, smtp_encryption
    ) VALUES (
      ${config.country_code.toUpperCase()},
      ${config.domain || 'ubikala.com'},
      ${config.company_name || 'Ubikala'},
      ${config.company_slogan || null},
      ${config.logo_url || null},
      ${config.favicon_url || null},
      ${config.email || null},
      ${config.phone || null},
      ${config.phone_display || null},
      ${config.whatsapp || null},
      ${config.business_hours || null},
      ${config.address_street || null},
      ${config.address_city || null},
      ${config.address_country || null},
      ${config.geo_latitude || null},
      ${config.geo_longitude || null},
      ${config.social_facebook || null},
      ${config.social_instagram || null},
      ${config.social_linkedin || null},
      ${config.social_youtube || null},
      ${config.social_twitter || null},
      ${config.social_tiktok || null},
      ${config.meta_title || null},
      ${config.meta_description || null},
      ${config.og_image || null},
      ${config.smtp_host || null},
      ${config.smtp_port || 587},
      ${config.smtp_user || null},
      ${config.smtp_password || null},
      ${config.smtp_from_email || null},
      ${config.smtp_from_name || null},
      ${config.smtp_encryption || 'tls'}
    )
    ON CONFLICT (country_code) DO UPDATE SET
      domain = EXCLUDED.domain,
      company_name = EXCLUDED.company_name,
      company_slogan = EXCLUDED.company_slogan,
      logo_url = EXCLUDED.logo_url,
      favicon_url = EXCLUDED.favicon_url,
      email = EXCLUDED.email,
      phone = EXCLUDED.phone,
      phone_display = EXCLUDED.phone_display,
      whatsapp = EXCLUDED.whatsapp,
      business_hours = EXCLUDED.business_hours,
      address_street = EXCLUDED.address_street,
      address_city = EXCLUDED.address_city,
      address_country = EXCLUDED.address_country,
      geo_latitude = EXCLUDED.geo_latitude,
      geo_longitude = EXCLUDED.geo_longitude,
      social_facebook = EXCLUDED.social_facebook,
      social_instagram = EXCLUDED.social_instagram,
      social_linkedin = EXCLUDED.social_linkedin,
      social_youtube = EXCLUDED.social_youtube,
      social_twitter = EXCLUDED.social_twitter,
      social_tiktok = EXCLUDED.social_tiktok,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      og_image = EXCLUDED.og_image,
      smtp_host = EXCLUDED.smtp_host,
      smtp_port = EXCLUDED.smtp_port,
      smtp_user = EXCLUDED.smtp_user,
      smtp_password = EXCLUDED.smtp_password,
      smtp_from_email = EXCLUDED.smtp_from_email,
      smtp_from_name = EXCLUDED.smtp_from_name,
      smtp_encryption = EXCLUDED.smtp_encryption,
      updated_at = NOW()
    RETURNING *
  `;
  return rows[0] as SiteConfigRecord;
}

// ============================================
// MIGRATION: country_code on ubikala_users
// ============================================

let usersCountryColumnEnsured = false;

export async function ensureUsersCountryColumn(): Promise<void> {
  if (!ubikalaDb || usersCountryColumnEnsured) return;

  await ubikalaDb`
    ALTER TABLE ubikala_users ADD COLUMN IF NOT EXISTS country_code VARCHAR(5)
  `;
  usersCountryColumnEnsured = true;
}

// ============================================
// COUNTRIES (ubikala_paises)
// ============================================

export interface CountryRecord {
  id?: string;
  code: string;           // ISO 3166-1 alpha-2 (DO, PA, MX, etc.)
  name: string;           // Full name in Spanish
  currency: string;       // Currency code (DOP, USD, etc.)
  currency_symbol: string; // RD$, $, etc.
  phone_prefix: string;   // +1-809, +507, etc.
  phone_placeholder: string;
  subdomain: string;      // '' for default, 'pa', 'mx', etc.
  flag: string;           // Emoji flag
  timezone: string;
  lat: number;
  lng: number;
  domain: string;         // ubikala.com, pa.ubikala.com, etc.
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

let countriesTableEnsured = false;

export async function ensureCountriesTable(): Promise<void> {
  if (!ubikalaDb || countriesTableEnsured) return;

  await ubikalaDb`
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
  countriesTableEnsured = true;
}

// Seed default countries if table is empty
export async function seedDefaultCountries(): Promise<void> {
  if (!ubikalaDb) return;
  await ensureCountriesTable();

  const existing = await ubikalaDb`SELECT COUNT(*) as count FROM ubikala_paises`;
  if (Number(existing[0]?.count) > 0) return;

  const defaults = [
    { code: 'DO', name: 'República Dominicana', currency: 'DOP', currency_symbol: 'RD$', phone_prefix: '+1-809', phone_placeholder: '809-555-1234', subdomain: '', flag: '🇩🇴', timezone: 'America/Santo_Domingo', lat: 18.7357, lng: -70.1627, domain: 'ubikala.com' },
    { code: 'PA', name: 'Panamá', currency: 'USD', currency_symbol: '$', phone_prefix: '+507', phone_placeholder: '6000-0000', subdomain: 'pa', flag: '🇵🇦', timezone: 'America/Panama', lat: 8.9824, lng: -79.5199, domain: 'pa.ubikala.com' },
    { code: 'MX', name: 'México', currency: 'MXN', currency_symbol: '$', phone_prefix: '+52', phone_placeholder: '55-1234-5678', subdomain: 'mx', flag: '🇲🇽', timezone: 'America/Mexico_City', lat: 19.4326, lng: -99.1332, domain: 'mx.ubikala.com' },
    { code: 'CO', name: 'Colombia', currency: 'COP', currency_symbol: '$', phone_prefix: '+57', phone_placeholder: '300-123-4567', subdomain: 'co', flag: '🇨🇴', timezone: 'America/Bogota', lat: 4.7110, lng: -74.0721, domain: 'co.ubikala.com' },
    { code: 'CR', name: 'Costa Rica', currency: 'CRC', currency_symbol: '₡', phone_prefix: '+506', phone_placeholder: '8000-0000', subdomain: 'cr', flag: '🇨🇷', timezone: 'America/Costa_Rica', lat: 9.9281, lng: -84.0907, domain: 'cr.ubikala.com' },
    { code: 'PR', name: 'Puerto Rico', currency: 'USD', currency_symbol: '$', phone_prefix: '+1-787', phone_placeholder: '787-555-1234', subdomain: 'pr', flag: '🇵🇷', timezone: 'America/Puerto_Rico', lat: 18.4655, lng: -66.1057, domain: 'pr.ubikala.com' },
  ];

  for (const c of defaults) {
    await ubikalaDb`
      INSERT INTO ubikala_paises (code, name, currency, currency_symbol, phone_prefix, phone_placeholder, subdomain, flag, timezone, lat, lng, domain)
      VALUES (${c.code}, ${c.name}, ${c.currency}, ${c.currency_symbol}, ${c.phone_prefix}, ${c.phone_placeholder}, ${c.subdomain}, ${c.flag}, ${c.timezone}, ${c.lat}, ${c.lng}, ${c.domain})
      ON CONFLICT (code) DO NOTHING
    `;
  }
}

export async function getAllCountries(): Promise<CountryRecord[]> {
  if (!ubikalaDb) return [];
  await ensureCountriesTable();
  await seedDefaultCountries();

  const rows = await ubikalaDb`
    SELECT * FROM ubikala_paises ORDER BY name
  `;
  return rows as CountryRecord[];
}

export async function getCountryByCode(code: string): Promise<CountryRecord | null> {
  if (!ubikalaDb) return null;
  await ensureCountriesTable();

  const rows = await ubikalaDb`
    SELECT * FROM ubikala_paises WHERE code = ${code.toUpperCase()}
  `;
  return rows[0] as CountryRecord || null;
}

export async function getCountryBySubdomain(subdomain: string): Promise<CountryRecord | null> {
  if (!ubikalaDb) return null;
  await ensureCountriesTable();

  const rows = await ubikalaDb`
    SELECT * FROM ubikala_paises WHERE subdomain = ${subdomain.toLowerCase()} AND is_active = true
  `;
  return rows[0] as CountryRecord || null;
}

export async function upsertCountry(country: Partial<CountryRecord> & { code: string; name: string }): Promise<CountryRecord> {
  if (!ubikalaDb) throw new Error('Database not configured');
  await ensureCountriesTable();

  const rows = await ubikalaDb`
    INSERT INTO ubikala_paises (
      code, name, currency, currency_symbol, phone_prefix, phone_placeholder,
      subdomain, flag, timezone, lat, lng, domain, is_active
    ) VALUES (
      ${country.code.toUpperCase()},
      ${country.name},
      ${country.currency || 'USD'},
      ${country.currency_symbol || '$'},
      ${country.phone_prefix || '+1'},
      ${country.phone_placeholder || '000-000-0000'},
      ${country.subdomain || country.code.toLowerCase()},
      ${country.flag || ''},
      ${country.timezone || 'UTC'},
      ${country.lat || 0},
      ${country.lng || 0},
      ${country.domain || country.code.toLowerCase() + '.ubikala.com'},
      ${country.is_active !== false}
    )
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
      is_active = EXCLUDED.is_active,
      updated_at = NOW()
    RETURNING *
  `;
  return rows[0] as CountryRecord;
}

export async function deleteCountry(code: string): Promise<boolean> {
  if (!ubikalaDb) return false;
  await ensureCountriesTable();
  await ubikalaDb`UPDATE ubikala_paises SET is_active = false, updated_at = NOW() WHERE code = ${code.toUpperCase()}`;
  return true;
}

// ============================================
// SEO CONTENT (ubikala_seo_content)
// ============================================

export interface SeoContentRecord {
  id?: string;
  country_code: string;
  lang: string;
  section: string;
  page: string | null;
  content: any;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

let seoContentTableEnsured = false;

export async function ensureSeoContentTable(): Promise<void> {
  if (!ubikalaDb || seoContentTableEnsured) return;

  await ubikalaDb`
    CREATE TABLE IF NOT EXISTS ubikala_seo_content (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      country_code VARCHAR(5) NOT NULL,
      lang VARCHAR(5) NOT NULL,
      section VARCHAR(100) NOT NULL,
      page VARCHAR(100),
      content JSONB NOT NULL DEFAULT '[]',
      sort_order INT NOT NULL DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(country_code, lang, section, page)
    )
  `;
  seoContentTableEnsured = true;
}

export async function getSeoContentRow(
  countryCode: string,
  lang: string,
  section: string,
  page?: string | null
): Promise<any | null> {
  if (!ubikalaDb) return null;
  await ensureSeoContentTable();

  const rows = page
    ? await ubikalaDb`
        SELECT content FROM ubikala_seo_content
        WHERE country_code = ${countryCode.toUpperCase()}
          AND lang = ${lang}
          AND section = ${section}
          AND page = ${page}
          AND is_active = true
      `
    : await ubikalaDb`
        SELECT content FROM ubikala_seo_content
        WHERE country_code = ${countryCode.toUpperCase()}
          AND lang = ${lang}
          AND section = ${section}
          AND page IS NULL
          AND is_active = true
      `;

  return rows[0]?.content || null;
}

export async function upsertSeoContent(
  countryCode: string,
  lang: string,
  section: string,
  page: string | null,
  content: any
): Promise<SeoContentRecord> {
  if (!ubikalaDb) throw new Error('Database not configured');
  await ensureSeoContentTable();

  const rows = await ubikalaDb`
    INSERT INTO ubikala_seo_content (country_code, lang, section, page, content)
    VALUES (${countryCode.toUpperCase()}, ${lang}, ${section}, ${page}, ${JSON.stringify(content)})
    ON CONFLICT (country_code, lang, section, page) DO UPDATE SET
      content = ${JSON.stringify(content)},
      updated_at = NOW()
    RETURNING *
  `;
  return rows[0] as SeoContentRecord;
}

export async function getAllSeoContentForCountry(
  countryCode: string,
  lang: string
): Promise<SeoContentRecord[]> {
  if (!ubikalaDb) return [];
  await ensureSeoContentTable();

  const rows = await ubikalaDb`
    SELECT * FROM ubikala_seo_content
    WHERE country_code = ${countryCode.toUpperCase()}
      AND lang = ${lang}
      AND is_active = true
    ORDER BY section, page, sort_order
  `;
  return rows as SeoContentRecord[];
}

export async function deleteSeoContent(id: string): Promise<boolean> {
  if (!ubikalaDb) return false;
  await ensureSeoContentTable();

  await ubikalaDb`DELETE FROM ubikala_seo_content WHERE id = ${id}`;
  return true;
}

export async function getSeoContentById(id: string): Promise<SeoContentRecord | null> {
  if (!ubikalaDb) return null;
  await ensureSeoContentTable();

  const rows = await ubikalaDb`SELECT * FROM ubikala_seo_content WHERE id = ${id}`;
  return rows[0] as SeoContentRecord || null;
}

export async function seedSeoContent(): Promise<void> {
  if (!ubikalaDb) return;
  await ensureSeoContentTable();

  const insert = async (cc: string, lang: string, section: string, page: string | null, content: any) => {
    await ubikalaDb!`
      INSERT INTO ubikala_seo_content (country_code, lang, section, page, content)
      VALUES (${cc}, ${lang}, ${section}, ${page}, ${JSON.stringify(content)})
      ON CONFLICT (country_code, lang, section, page) DO NOTHING
    `;
  };

  // Helper: check if a country already has seed data
  const hasCountryData = async (cc: string): Promise<boolean> => {
    const rows = await ubikalaDb!`SELECT COUNT(*) as count FROM ubikala_seo_content WHERE country_code = ${cc}`;
    return Number(rows[0]?.count) > 0;
  };

  // Seed additional countries from external seed files
  try {
    const { countrySeedData } = await import('./seo-country-seeds');
    const { countrySeedData2 } = await import('./seo-country-seeds-2');
    const { countrySeedData3 } = await import('./seo-country-seeds-3');
    const allSeeds = { ...countrySeedData, ...countrySeedData2, ...countrySeedData3 };
    for (const [cc, items] of Object.entries(allSeeds)) {
      if (await hasCountryData(cc)) continue;
      for (const item of items) {
        await insert(cc, item.lang, item.section, item.page, item.content);
      }
    }
  } catch (e) {
    // Seed files may not exist in all environments
  }

  // Skip DO seed if already has data
  if (await hasCountryData('DO')) return;

  // === SPANISH (DO + es) ===

  // Buy page
  await insert('DO', 'es', 'hero', 'buy', { title: 'Propiedades en Venta en {pais}', description: 'Explora nuestra selección de casas, apartamentos, villas, terrenos y locales comerciales disponibles para compra en todo el país.' });
  await insert('DO', 'es', 'guide_header', 'buy', { title: 'Tu Guía para Comprar en {pais}', subtitle: 'Todo lo que necesitas saber para invertir en bienes raíces' });
  await insert('DO', 'es', 'popular_zones', 'buy', [
    { name: 'Santo Domingo', description: 'Apartamentos en Piantini, Naco, Bella Vista', link: '/propiedades/santo-domingo', emoji: '🏙️', color: 'primary' },
    { name: 'Punta Cana', description: 'Villas y condos con alto retorno', link: '/propiedades/punta-cana', emoji: '🏖️', color: 'emerald' },
    { name: 'Santiago', description: 'Precios accesibles, excelente calidad de vida', link: '/propiedades/santiago', emoji: '🏔️', color: 'amber' },
    { name: 'Las Terrenas', description: 'Paraíso bohemio frente al mar', link: '/propiedades/samana', emoji: '🌴', color: 'purple' }
  ]);
  await insert('DO', 'es', 'property_types', 'buy', [
    { name: 'Apartamentos', description: 'Desde estudios hasta penthouses de lujo', link: '/comprar/apartamentos', letter: 'A', color: 'primary' },
    { name: 'Casas', description: 'Residencias familiares con seguridad 24/7', link: '/comprar/casas', letter: 'C', color: 'emerald' },
    { name: 'Villas', description: 'Propiedades exclusivas con piscina privada', link: '/comprar/villas', letter: 'V', color: 'purple' },
    { name: 'Terrenos', description: 'Lotes para tu proyecto residencial o comercial', link: '/comprar/terrenos', letter: 'T', color: 'amber' }
  ]);
  await insert('DO', 'es', 'info_box', 'buy', { title: 'Compra Sin Restricciones para Extranjeros', text: 'Los extranjeros pueden comprar propiedades en {pais} con los mismos derechos que los nacionales. No necesitas residencia ni visa especial. Solo tu pasaporte y nuestros asesores verificados te guiarán en cada paso.' });
  await insert('DO', 'es', 'faqs', 'buy', [
    { question: '¿Qué es el Bono Primera Vivienda en República Dominicana?', answer: 'El Bono Primera Vivienda es un subsidio del gobierno dominicano que otorga hasta RD$1,500,000 (aproximadamente US$25,000) a compradores de primera vivienda. Este beneficio está disponible para ciudadanos dominicanos que nunca han sido propietarios y aplica para viviendas de bajo costo.' },
    { question: '¿Cuáles son los requisitos para obtener el Bono Primera Vivienda?', answer: 'Los requisitos incluyen: ser dominicano o residente legal, mayor de 18 años, no haber sido propietario de vivienda anteriormente, tener ingresos familiares que no excedan RD$75,000 mensuales, y la vivienda debe estar valorada por debajo de cierto monto establecido por el programa.' },
    { question: '¿Cuáles son los costos de cierre al comprar una propiedad?', answer: 'Los costos de cierre incluyen: Impuesto de Transferencia Inmobiliaria (3% del valor), gastos legales (1-2%), gastos de registro (0.5%), tasación (variable), y gastos bancarios si hay financiamiento. En total, debes presupuestar entre 5-7% adicional al precio de compra.' },
    { question: '¿Qué es un Fideicomiso Inmobiliario?', answer: 'Un Fideicomiso Inmobiliario es un mecanismo legal donde un desarrollador transfiere la propiedad a una entidad fiduciaria (generalmente un banco) que administra los fondos y garantiza la construcción del proyecto. Esto protege tu inversión ya que el dinero solo se libera al constructor cuando cumple con los hitos de construcción.' },
    { question: '¿Cuáles son las ventajas de comprar mediante Fideicomiso?', answer: 'Las ventajas incluyen: protección legal de tu inversión, supervisión bancaria del proyecto, liberación de fondos por avance de obra, posibilidad de financiamiento directo con el fideicomiso, precios más bajos que proyectos terminados, y mayor seguridad jurídica.' },
    { question: '¿Pueden los extranjeros comprar propiedades?', answer: 'Sí, los extranjeros pueden comprar propiedades en {pais} con los mismos derechos que los nacionales. No hay restricciones para la compra de bienes raíces. Solo necesitas tu pasaporte vigente.' }
  ]);
  await insert('DO', 'es', 'educational_cards', 'buy', [
    { title: 'Bono Primera Vivienda', description: '¿Comprando tu primera casa? Podrías recibir hasta RD$1,500,000 de subsidio del gobierno.', link: '/guias/bono-primera-vivienda', icon: 'money' },
    { title: 'Compra en Fideicomiso', description: 'Compra segura en proyectos en construcción con tu inversión protegida por ley.', link: '/guias/fideicomiso-inmobiliario', icon: 'shield' },
    { title: 'Compradores desde USA', description: 'Guía completa: impuestos, financiamiento y proceso de compra para estadounidenses.', link: '/guias/extranjeros-comprando-rd', icon: 'globe' }
  ]);
  await insert('DO', 'es', 'cta', 'buy', { title: '¿Listo para encontrar tu propiedad ideal?', description: 'Nuestros asesores verificados te ayudarán a encontrar la propiedad perfecta en {pais}.' });

  // Rent page
  await insert('DO', 'es', 'hero', 'rent', { title: 'Propiedades en Alquiler en {pais}', description: 'Encuentra apartamentos amueblados, casas familiares, oficinas y locales comerciales disponibles para alquiler.' });
  await insert('DO', 'es', 'guide_header', 'rent', { title: 'Guía para Alquilar en {pais}', subtitle: 'Encuentra el espacio perfecto para vivir o trabajar' });
  await insert('DO', 'es', 'popular_zones', 'rent', [
    { name: 'Santo Domingo', description: 'Piantini, Naco, Bella Vista, Serralles', link: '/propiedades/santo-domingo', emoji: '🏙️', color: 'secondary' },
    { name: 'Punta Cana', description: 'Cap Cana, Bávaro, Punta Cana Village', link: '/propiedades/punta-cana', emoji: '🏖️', color: 'emerald' },
    { name: 'Santiago', description: 'Cerros de Gurabo, Jardines Metropolitanos', link: '/propiedades/santiago', emoji: '🏔️', color: 'amber' },
    { name: 'Puerto Plata', description: 'Sosúa, Cabarete', link: '/propiedades/puerto-plata', emoji: '🌊', color: 'purple' }
  ]);
  await insert('DO', 'es', 'rental_requirements', 'rent', [
    { title: 'Identificación', description: 'Cédula dominicana o pasaporte vigente' },
    { title: 'Comprobante de ingresos', description: 'Carta de trabajo o estados financieros' },
    { title: 'Depósito de seguridad', description: 'Generalmente 1-2 meses de alquiler' },
    { title: 'Referencias', description: 'Personales o de empleador' }
  ]);
  await insert('DO', 'es', 'info_box', 'rent', { title: 'Extranjeros Pueden Alquilar Sin Restricciones', text: 'No necesitas residencia ni visa especial para alquilar en {pais}. Solo tu pasaporte vigente y cumplir con los requisitos del propietario. Nuestros asesores te ayudarán a encontrar la propiedad ideal.' });
  await insert('DO', 'es', 'faqs', 'rent', [
    { question: '¿Qué documentos necesito para alquilar una propiedad?', answer: 'Generalmente necesitas: cédula o pasaporte vigente, carta de trabajo o comprobante de ingresos, referencias personales o laborales, y depósito de seguridad (usualmente 1-2 meses de alquiler).' },
    { question: '¿Cuánto es el depósito típico para alquilar?', answer: 'El depósito estándar es de 1 a 2 meses de alquiler, más el primer mes adelantado. En propiedades de lujo o amuebladas, puede ser de 2-3 meses.' },
    { question: '¿Los alquileres incluyen servicios básicos?', answer: 'Depende del acuerdo. En apartamentos amueblados, a veces incluyen agua, internet y mantenimiento. La electricidad generalmente la paga el inquilino.' },
    { question: '¿Puedo alquilar como extranjero?', answer: 'Sí, los extranjeros pueden alquilar sin restricciones. Solo necesitas pasaporte vigente y cumplir con los requisitos del propietario.' }
  ]);
  await insert('DO', 'es', 'cta', 'rent', { title: '¿Buscas un lugar para alquilar?', description: 'Nuestros asesores te ayudarán a encontrar el espacio perfecto para ti y tu familia.' });

  // Home page
  await insert('DO', 'es', 'hero', 'home', { title: 'Bienes Raíces en {pais}', description: 'Bienvenido a Ubíkala — tu puerta de entrada. Desde villas frente al mar hasta apartamentos en el corazón de la ciudad, descubre miles de propiedades verificadas en los destinos más codiciados de {pais}.' });
  await insert('DO', 'es', 'benefits', null, [
    { title: 'Abierto a Todos', description: 'Sin restricciones para extranjeros. Compra con los mismos derechos que los nacionales.', icon: 'globe' },
    { title: 'Retorno Sólido', description: 'El mercado turístico en auge genera excelentes ingresos por alquiler.', icon: 'chart' },
    { title: 'Precios Accesibles', description: 'Obtén más por tu inversión comparado con otros destinos de la región.', icon: 'money' },
    { title: 'Paraíso Todo el Año', description: 'Disfruta del clima perfecto para tu casa vacacional o residencia permanente.', icon: 'sun' }
  ]);
  await insert('DO', 'es', 'destinations_header', null, { title: '¿Dónde Será tu Próximo Hogar?', subtitle: 'Cada rincón de {pais} cuenta una historia diferente. Encuentra la que va contigo.' });
  await insert('DO', 'es', 'destinations', null, [
    { name: 'Punta Cana', description: 'El destino turístico #1 del Caribe. Condominios frente a la playa, villas de lujo y alquileres vacacionales con ROI excepcional.', link: '/propiedades/punta-cana', emoji: '🏖️' },
    { name: 'Santo Domingo', description: 'La capital vibrante. Apartamentos modernos en Piantini y Naco, casas familiares en Arroyo Hondo, opciones para todos los presupuestos.', link: '/propiedades/santo-domingo', emoji: '🏙️' },
    { name: 'Santiago', description: 'El corazón cultural del Cibao. Precios accesibles, infraestructura en crecimiento y un estilo de vida comunitario cálido.', link: '/propiedades/santiago', emoji: '🏔️' },
    { name: 'Las Terrenas', description: 'Paraíso bohemio en la península de Samaná. Propiedades a pasos de la playa y una comunidad internacional próspera.', link: '/propiedades/las-terrenas', emoji: '🌴' }
  ]);

  // Location FAQs ES
  const locationFaqsES: Record<string, Array<{question: string; answer: string}>> = {
    'santo-domingo': [
      { question: '¿Cuáles son los mejores sectores para vivir en Santo Domingo?', answer: 'Los sectores más cotizados incluyen: Piantini y Naco (alta gama), Bella Vista y Evaristo Morales (excelente relación precio-calidad), Los Cacicazgos y Arroyo Hondo (familiares, tranquilos).' },
      { question: '¿Cuánto cuesta un apartamento en Santo Domingo?', answer: 'En Piantini, desde US$2,500/m² hasta US$4,000/m². En Bella Vista, entre US$1,500-2,500/m². Un apartamento de 2 habitaciones puede costar desde US$80,000 hasta US$400,000+.' }
    ],
    'punta-cana': [
      { question: '¿Es rentable comprar para alquiler vacacional en Punta Cana?', answer: 'Sí, retornos del 8-12% anual. Ocupación promedio 65-75%. Propiedades en Cap Cana, Bávaro y Cocotal tienen mayor demanda.' },
      { question: '¿Cuáles son las mejores zonas de Punta Cana?', answer: 'Cap Cana (ultra lujo), Punta Cana Village (cerca del aeropuerto), Bávaro (mayor oferta). Presupuestos medios: Cocotal, Vista Cana, Los Corales.' }
    ],
    'santiago': [
      { question: '¿Cómo es el mercado inmobiliario en Santiago?', answer: 'Segunda ciudad, precios 30-40% menores que Santo Domingo. Los Jardines, Cerros de Gurabo y Reparto Universitario tienen alta demanda.' },
      { question: '¿Cuáles son los mejores sectores de Santiago?', answer: 'Los Jardines Metropolitanos (exclusivo), Cerros de Gurabo (vistas), Reparto Universitario (cerca de PUCMM), Jardines del Norte.' }
    ],
    'samana': [
      { question: '¿Es buen momento para invertir en Samaná?', answer: 'Sí, desarrollo con aeropuerto El Catey. Las Terrenas tiene comunidad de expatriados establecida. Precios accesibles pero en alza.' },
      { question: '¿Cuáles son las mejores zonas de Samaná?', answer: 'Las Terrenas (más desarrollado), Las Galeras (virgen, eco-turismo), pueblo de Samaná (Cayo Levantado, ballenas).' }
    ],
    'puerto-plata': [
      { question: '¿Por qué considerar Puerto Plata?', answer: 'Precios hasta 50% menores que Punta Cana. Desarrollo turístico creciente, vuelos directos, proyectos en Playa Dorada y Cabarete.' },
      { question: '¿Cómo es Cabarete y Sosúa?', answer: 'Cabarete: capital del kitesurf, comunidad internacional. Sosúa: expatriados establecidos, precios accesibles. Ambas con playa y servicios.' }
    ],
    'la-romana': [
      { question: '¿Qué hace especial a Casa de Campo?', answer: 'Resort residencial más exclusivo del Caribe. Golf de clase mundial, marina, Altos de Chavón, playa privada y comunidad internacional.' },
      { question: '¿Cuánto cuesta una propiedad en La Romana?', answer: 'Casa de Campo: villas desde US$500,000. Ciudad: apartamentos desde US$60,000, casas desde US$100,000. Bayahíbe: desde US$80,000.' }
    ]
  };
  for (const [slug, faqs] of Object.entries(locationFaqsES)) {
    await insert('DO', 'es', 'faqs', `location:${slug}`, faqs);
  }

  // === ENGLISH (DO + en) ===

  await insert('DO', 'en', 'hero', 'buy', { title: 'Properties for Sale in {pais}', description: 'Explore our selection of houses, apartments, villas, land and commercial properties available for purchase throughout the country.' });
  await insert('DO', 'en', 'guide_header', 'buy', { title: 'Your Guide to Buying in {pais}', subtitle: 'Everything you need to know about real estate investment' });
  await insert('DO', 'en', 'popular_zones', 'buy', [
    { name: 'Santo Domingo', description: 'Modern apartments in Piantini, Naco, Bella Vista', link: '/en/properties/santo-domingo', emoji: '🏙️', color: 'primary' },
    { name: 'Punta Cana', description: 'Villas and condos with high rental returns', link: '/en/properties/punta-cana', emoji: '🏖️', color: 'emerald' },
    { name: 'Santiago', description: 'Affordable prices, excellent quality of life', link: '/en/properties/santiago', emoji: '🏔️', color: 'amber' },
    { name: 'Las Terrenas', description: 'Bohemian paradise with beachfront living', link: '/en/properties/samana', emoji: '🌴', color: 'purple' }
  ]);
  await insert('DO', 'en', 'property_types', 'buy', [
    { name: 'Apartments', description: 'From studios to luxury penthouses', link: '/en/buy/apartments', letter: 'A', color: 'primary' },
    { name: 'Houses', description: 'Family homes with 24/7 gated security', link: '/en/buy/houses', letter: 'H', color: 'emerald' },
    { name: 'Villas', description: 'Exclusive properties with private pools', link: '/en/buy/villas', letter: 'V', color: 'purple' },
    { name: 'Land', description: 'Lots for residential or commercial development', link: '/en/buy/land', letter: 'L', color: 'amber' }
  ]);
  await insert('DO', 'en', 'info_box', 'buy', { title: 'No Restrictions for Foreign Buyers', text: 'Foreigners can purchase property in {pais} with the exact same rights as nationals. You do not need residency or a special visa. Our verified agents will guide you through every step.' });
  await insert('DO', 'en', 'faqs', 'buy', [
    { question: 'What is the First-Time Buyer Subsidy?', answer: 'The Bono Primera Vivienda is a government subsidy of up to RD$1,500,000 (approx. US$25,000) for first-time homebuyers who have never owned property.' },
    { question: 'What are the closing costs?', answer: 'Property Transfer Tax (3%), legal fees (1-2%), registration (0.5%), appraisal, and bank charges. Budget 5-7% extra.' },
    { question: 'What is a Fideicomiso (Real Estate Trust)?', answer: 'A legal mechanism where a bank manages funds and oversees construction. The safest way to buy pre-construction property.' },
    { question: 'Can foreigners buy property?', answer: 'Yes, with the same rights as nationals. No restrictions. A valid passport is all you need.' },
    { question: 'Can I get a mortgage as a foreigner?', answer: 'Yes, several banks offer mortgages to foreigners with a valid visa, local bank account, apostilled financials, and 30-40% down payment.' },
    { question: 'How long does the transfer process take?', answer: 'Typically 30-90 days depending on financing and document readiness.' }
  ]);
  await insert('DO', 'en', 'educational_cards', 'buy', [
    { title: 'First-Time Buyer Subsidy', description: 'Buying your first home? You may qualify for up to RD$1,500,000 (US$25,000) in government subsidies.', link: '/en/guides/first-time-buyer', icon: 'money' },
    { title: 'Trust Purchases (Fideicomiso)', description: 'Buy safely in pre-construction projects with your investment protected by law.', link: '/en/guides/fideicomiso', icon: 'shield' },
    { title: 'US Buyers Guide', description: 'Complete guide: taxes, financing and buying process for Americans.', link: '/en/guides/us-buyers', icon: 'globe' }
  ]);
  await insert('DO', 'en', 'cta', 'buy', { title: 'Ready to find your ideal property?', description: 'Our verified agents will help you navigate the {pais} real estate market and find the perfect property.' });

  await insert('DO', 'en', 'hero', 'rent', { title: 'Properties for Rent in {pais}', description: 'Find furnished apartments, family houses, offices and commercial spaces available for rent.' });
  await insert('DO', 'en', 'guide_header', 'rent', { title: 'Your Guide to Renting in {pais}', subtitle: 'Find the perfect space to live or work' });
  await insert('DO', 'en', 'popular_zones', 'rent', [
    { name: 'Santo Domingo', description: 'Piantini, Naco, Bella Vista, Serralles', link: '/en/properties/santo-domingo', emoji: '🏙️', color: 'secondary' },
    { name: 'Punta Cana', description: 'Cap Cana, Bavaro, Punta Cana Village', link: '/en/properties/punta-cana', emoji: '🏖️', color: 'emerald' },
    { name: 'Santiago', description: 'Cerros de Gurabo, Jardines Metropolitanos', link: '/en/properties/santiago', emoji: '🏔️', color: 'amber' },
    { name: 'Puerto Plata', description: 'Sosua, Cabarete', link: '/en/properties/puerto-plata', emoji: '🌊', color: 'purple' }
  ]);
  await insert('DO', 'en', 'rental_requirements', 'rent', [
    { title: 'Identification', description: 'Valid ID or passport' },
    { title: 'Proof of income', description: 'Employment letter or financial statements' },
    { title: 'Security deposit', description: 'Usually 1-2 months rent' },
    { title: 'References', description: 'Personal or employer references' }
  ]);
  await insert('DO', 'en', 'info_box', 'rent', { title: 'Foreigners Can Rent Without Restrictions', text: 'You do not need residency or a special visa to rent in {pais}. Just a valid passport and meeting the landlord\'s requirements.' });
  await insert('DO', 'en', 'faqs', 'rent', [
    { question: 'What documents do I need to rent?', answer: 'Valid ID or passport, proof of income (3x monthly rent), security deposit (1-2 months), and sometimes a co-signer.' },
    { question: 'What is the typical security deposit?', answer: 'One to two months rent, paid upfront. Refundable at lease end minus damages.' },
    { question: 'Are utilities included?', answer: 'Usually not. Tenants pay electricity, water, internet, gas. Some furnished units may include basics.' },
    { question: 'Can foreigners rent?', answer: 'Yes, without restrictions. Valid passport and proof of income needed.' }
  ]);
  await insert('DO', 'en', 'cta', 'rent', { title: 'Looking for a place to rent?', description: 'Our agents will help you find the perfect space for you and your family.' });

  await insert('DO', 'en', 'hero', 'home', { title: 'Real Estate in {pais}', description: 'Welcome to Ubíkala — your gateway to {pais}. From beachfront villas to city apartments, discover thousands of verified properties.' });
  await insert('DO', 'en', 'benefits', null, [
    { title: 'Open to Everyone', description: 'No restrictions for foreign buyers. Purchase with the same rights as nationals.', icon: 'globe' },
    { title: 'Strong Returns', description: 'The booming tourism market drives excellent rental income.', icon: 'chart' },
    { title: 'Affordable Prices', description: 'Get more for your investment compared to other destinations.', icon: 'money' },
    { title: 'Year-Round Paradise', description: 'Enjoy the perfect climate for your vacation home or permanent residence.', icon: 'sun' }
  ]);
  await insert('DO', 'en', 'destinations_header', null, { title: 'Where Will You Call Home?', subtitle: 'Each corner of {pais} tells a different story. Find the one that matches yours.' });
  await insert('DO', 'en', 'destinations', null, [
    { name: 'Punta Cana', description: 'The #1 tourist destination. Beachfront condos, luxury villas and vacation rentals with exceptional ROI.', link: '/en/properties/punta-cana', emoji: '🏖️' },
    { name: 'Santo Domingo', description: 'The vibrant capital. Modern apartments in Piantini and Naco, family homes, options for every budget.', link: '/en/properties/santo-domingo', emoji: '🏙️' },
    { name: 'Santiago', description: 'The cultural heart. Affordable prices, growing infrastructure and a warm community lifestyle.', link: '/en/properties/santiago', emoji: '🏔️' },
    { name: 'Las Terrenas', description: 'Bohemian paradise on Samana peninsula. Properties steps from the beach and a thriving international community.', link: '/en/properties/las-terrenas', emoji: '🌴' }
  ]);

  // EN Location FAQs
  const locationFaqsEN: Record<string, Array<{question: string; answer: string}>> = {
    'santo-domingo': [
      { question: 'What are the best neighborhoods in Santo Domingo?', answer: 'Piantini and Naco (upscale), Bella Vista (great value), Los Cacicazgos (family-friendly), Gazcue (bohemian, historic).' },
      { question: 'How much does an apartment cost?', answer: 'Piantini: US$2,500-4,000/m². Bella Vista: US$1,500-2,500/m². 2BR from US$80,000 to US$400,000+.' }
    ],
    'punta-cana': [
      { question: 'Is rental property profitable in Punta Cana?', answer: 'Yes, 8-12% annual returns. 65-75% occupancy. Cap Cana, Bavaro and Cocotal have strongest demand.' },
      { question: 'What are the best investment areas?', answer: 'Cap Cana (ultra-luxury), Punta Cana Village (near airport), Bavaro (most inventory). Mid-range: Cocotal, Vista Cana.' }
    ],
    'santiago': [
      { question: 'What is the Santiago real estate market like?', answer: 'Second city, 30-40% cheaper than Santo Domingo. Los Jardines, Cerros de Gurabo, Reparto Universitario in high demand.' },
      { question: 'Best neighborhoods in Santiago?', answer: 'Los Jardines Metropolitanos (exclusive), Cerros de Gurabo (scenic), Reparto Universitario (near PUCMM).' }
    ],
    'samana': [
      { question: 'Is now a good time to invest in Samana?', answer: 'Yes, development with El Catey airport. Las Terrenas has established expat community. Prices rising but still accessible.' },
      { question: 'Best areas in Samana?', answer: 'Las Terrenas (most developed), Las Galeras (eco-tourism), Samana town (whale watching).' }
    ],
    'puerto-plata': [
      { question: 'Why consider Puerto Plata?', answer: 'Prices 50% lower than Punta Cana. Growing tourism, direct flights, projects in Playa Dorada and Cabarete.' },
      { question: 'What about Cabarete and Sosua?', answer: 'Cabarete: kitesurfing capital, vibrant community. Sosua: established expats, affordable. Both with beaches and foreign services.' }
    ],
    'la-romana': [
      { question: 'What makes Casa de Campo special?', answer: 'Most exclusive Caribbean resort. World-class golf, marina, Altos de Chavon, private beach, international community.' },
      { question: 'Property costs in La Romana?', answer: 'Casa de Campo: villas from US$500K+. City: apartments from US$60K, houses from US$100K. Bayahibe: from US$80K.' }
    ]
  };
  for (const [slug, faqs] of Object.entries(locationFaqsEN)) {
    await insert('DO', 'en', 'faqs', `location:${slug}`, faqs);
  }

  // === FRENCH (DO + fr) ===

  await insert('DO', 'fr', 'hero', 'buy', { title: 'Propriétés à Vendre en {pais}', description: 'Explorez notre sélection de maisons, appartements, villas, terrains et propriétés commerciales disponibles à l\'achat.' });
  await insert('DO', 'fr', 'guide_header', 'buy', { title: 'Acheter une Propriété en {pais}', subtitle: 'Tout ce que vous devez savoir sur l\'investissement immobilier' });
  await insert('DO', 'fr', 'popular_zones', 'buy', [
    { name: 'Saint-Domingue', description: 'Appartements modernes à Piantini, Naco, Bella Vista', link: '/fr/proprietes/santo-domingo', emoji: '🏙️', color: 'primary' },
    { name: 'Punta Cana', description: 'Villas et condos avec rendements locatifs élevés', link: '/fr/proprietes/punta-cana', emoji: '🏖️', color: 'emerald' },
    { name: 'Santiago', description: 'Prix abordables et excellente qualité de vie', link: '/fr/proprietes/santiago', emoji: '🏔️', color: 'amber' },
    { name: 'Las Terrenas', description: 'Paradis bohème face à la mer', link: '/fr/proprietes/samana', emoji: '🌴', color: 'purple' }
  ]);
  await insert('DO', 'fr', 'property_types', 'buy', [
    { name: 'Appartements', description: 'Des studios aux penthouses de luxe', link: '/fr/acheter/appartements', letter: 'A', color: 'primary' },
    { name: 'Maisons', description: 'Résidences familiales avec sécurité 24/7', link: '/fr/acheter/maisons', letter: 'M', color: 'emerald' },
    { name: 'Villas', description: 'Propriétés exclusives avec piscine privée', link: '/fr/acheter/villas', letter: 'V', color: 'purple' },
    { name: 'Terrains', description: 'Lots pour projets résidentiels ou commerciaux', link: '/fr/acheter/terrains', letter: 'T', color: 'amber' }
  ]);
  await insert('DO', 'fr', 'info_box', 'buy', { title: 'Aucune Restriction pour les Acheteurs Étrangers', text: 'Les étrangers peuvent acheter des propriétés en {pais} avec les mêmes droits que les nationaux. Aucune résidence ou visa spécial requis.' });
  await insert('DO', 'fr', 'faqs', 'buy', [
    { question: 'Quels sont les frais de clôture ?', answer: 'Taxe de transfert (3%), frais juridiques (1-2%), enregistrement (0,5%), évaluation, frais bancaires. Prévoyez 5-7% supplémentaires.' },
    { question: 'Qu\'est-ce qu\'un Fidéicommis ?', answer: 'Un mécanisme légal où une banque gère les fonds et supervise la construction. La façon la plus sûre d\'acheter en pré-construction.' },
    { question: 'Les étrangers peuvent-ils acheter ?', answer: 'Oui, avec les mêmes droits que les nationaux. Un passeport valide suffit.' },
    { question: 'Combien de temps dure le transfert ?', answer: 'Généralement 30-90 jours selon le financement et les documents.' }
  ]);
  await insert('DO', 'fr', 'educational_cards', 'buy', [
    { title: 'Subvention Premier Achat', description: 'Première maison ? Jusqu\'à RD$1,500,000 de subvention gouvernementale.', link: '/fr/guides/premier-achat', icon: 'money' },
    { title: 'Achat en Fidéicommis', description: 'Achat sécurisé en pré-construction, investissement protégé par la loi.', link: '/fr/guides/fidecommis', icon: 'shield' },
    { title: 'Guide Acheteurs Internationaux', description: 'Taxes, financement et processus d\'achat complet.', link: '/fr/guides/acheteurs-internationaux', icon: 'globe' }
  ]);
  await insert('DO', 'fr', 'cta', 'buy', { title: 'Prêt à trouver votre propriété idéale ?', description: 'Nos agents vérifiés vous aideront à trouver la propriété parfaite en {pais}.' });

  await insert('DO', 'fr', 'hero', 'rent', { title: 'Propriétés à Louer en {pais}', description: 'Trouvez des appartements meublés, maisons familiales, bureaux et locaux commerciaux disponibles à la location.' });
  await insert('DO', 'fr', 'guide_header', 'rent', { title: 'Louer une Propriété en {pais}', subtitle: 'Trouvez l\'espace parfait pour vivre ou travailler' });
  await insert('DO', 'fr', 'popular_zones', 'rent', [
    { name: 'Saint-Domingue', description: 'Piantini, Naco, Bella Vista, Serralles', link: '/fr/proprietes/santo-domingo', emoji: '🏙️', color: 'secondary' },
    { name: 'Punta Cana', description: 'Cap Cana, Bávaro, Punta Cana Village', link: '/fr/proprietes/punta-cana', emoji: '🏖️', color: 'emerald' },
    { name: 'Santiago', description: 'Cerros de Gurabo, Jardines Metropolitanos', link: '/fr/proprietes/santiago', emoji: '🏔️', color: 'amber' },
    { name: 'Puerto Plata', description: 'Sosúa, Cabarete', link: '/fr/proprietes/puerto-plata', emoji: '🌊', color: 'purple' }
  ]);
  await insert('DO', 'fr', 'rental_requirements', 'rent', [
    { title: 'Identification', description: 'Pièce d\'identité ou passeport valide' },
    { title: 'Justificatif de revenus', description: 'Lettre d\'emploi ou états financiers' },
    { title: 'Dépôt de garantie', description: 'Généralement 1-2 mois de loyer' },
    { title: 'Références', description: 'Personnelles ou professionnelles' }
  ]);
  await insert('DO', 'fr', 'info_box', 'rent', { title: 'Les Étrangers Peuvent Louer Sans Restrictions', text: 'Aucune résidence ou visa spécial requis pour louer en {pais}. Un passeport valide suffit.' });
  await insert('DO', 'fr', 'faqs', 'rent', [
    { question: 'Quels documents pour louer ?', answer: 'Pièce d\'identité, justificatif de revenus, dépôt de garantie (1-2 mois), parfois un garant.' },
    { question: 'Quel est le dépôt type ?', answer: '1-2 mois de loyer, payé d\'avance. Remboursable en fin de bail.' },
    { question: 'Les charges sont-elles incluses ?', answer: 'En général non. Le locataire paie électricité, eau, internet. Certains meublés incluent les charges de base.' },
    { question: 'Les étrangers peuvent-ils louer ?', answer: 'Oui, sans restriction. Passeport valide et justificatifs de revenus suffisent.' }
  ]);
  await insert('DO', 'fr', 'cta', 'rent', { title: 'Vous cherchez un logement à louer ?', description: 'Nos agents vous aideront à trouver l\'espace parfait pour vous et votre famille.' });

  await insert('DO', 'fr', 'hero', 'home', { title: 'Immobilier en {pais}', description: 'Bienvenue sur Ubíkala — votre porte d\'entrée vers {pais}. Des villas en bord de mer aux appartements en centre-ville, découvrez des milliers de propriétés vérifiées.' });
  await insert('DO', 'fr', 'benefits', null, [
    { title: 'Ouvert à Tous', description: 'Aucune restriction pour les acheteurs étrangers. Mêmes droits que les nationaux.', icon: 'globe' },
    { title: 'Rendement Solide', description: 'Le marché touristique génère d\'excellents revenus locatifs.', icon: 'chart' },
    { title: 'Prix Accessibles', description: 'Plus pour votre investissement par rapport aux autres destinations.', icon: 'money' },
    { title: 'Paradis Toute l\'Année', description: 'Climat parfait pour maison de vacances ou résidence permanente.', icon: 'sun' }
  ]);
  await insert('DO', 'fr', 'destinations_header', null, { title: 'Où Poserez-Vous Vos Valises ?', subtitle: 'Chaque coin de {pais} raconte une histoire différente. Trouvez celle qui vous correspond.' });
  await insert('DO', 'fr', 'destinations', null, [
    { name: 'Punta Cana', description: 'Destination #1 des Caraïbes. Condos face à la plage, villas de luxe et locations vacances avec ROI exceptionnel.', link: '/fr/proprietes/punta-cana', emoji: '🏖️' },
    { name: 'Saint-Domingue', description: 'La capitale vibrante. Appartements modernes à Piantini et Naco, maisons familiales, tous les budgets.', link: '/fr/proprietes/santo-domingo', emoji: '🏙️' },
    { name: 'Santiago', description: 'Le cœur culturel du Cibao. Prix abordables, infrastructure en croissance, style de vie communautaire.', link: '/fr/proprietes/santiago', emoji: '🏔️' },
    { name: 'Las Terrenas', description: 'Paradis bohème sur la péninsule de Samaná. Propriétés à deux pas de la plage.', link: '/fr/proprietes/las-terrenas', emoji: '🌴' }
  ]);
}
