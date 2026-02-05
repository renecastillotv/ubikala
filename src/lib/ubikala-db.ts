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
}): Promise<UbikalaUser> {
  if (!ubikalaDb) throw new Error('Database not configured');
  const rows = await ubikalaDb`
    INSERT INTO ubikala_users (email, password_hash, name, role, phone, company_name, license_number)
    VALUES (${data.email}, ${data.password_hash}, ${data.name}, ${data.role}, ${data.phone || null}, ${data.company_name || null}, ${data.license_number || null})
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
}>): Promise<UbikalaUser | null> {
  if (!ubikalaDb) return null;

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

// Stats for publish page (public stats)
export async function getPublishPageStats(): Promise<{
  monthly_visits: number;
  active_properties: number;
  total_agents: number;
  total_owners: number;
  satisfaction_rate: number;
}> {
  if (!ubikalaDb) return { monthly_visits: 50000, active_properties: 0, total_agents: 0, total_owners: 0, satisfaction_rate: 95 };

  const [properties, agents, owners] = await Promise.all([
    ubikalaDb`SELECT COUNT(*) as count FROM ubikala_properties WHERE activo = true`,
    ubikalaDb`SELECT COUNT(*) as count FROM ubikala_users WHERE is_active = true AND (role = 'asesor_independiente' OR role = 'inmobiliaria')`,
    ubikalaDb`SELECT COUNT(*) as count FROM ubikala_users WHERE is_active = true AND role = 'propietario'`,
  ]);

  return {
    monthly_visits: 50000, // This would come from analytics in a real implementation
    active_properties: Number(properties[0]?.count || 0),
    total_agents: Number(agents[0]?.count || 0),
    total_owners: Number(owners[0]?.count || 0),
    satisfaction_rate: 95,
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
} = {}): Promise<UbikalaAgentRow[]> {
  if (!ubikalaDb) return [];

  const { limit = 20, offset = 0 } = options;

  const rows = await ubikalaDb`
    SELECT
      u.id,
      u.name,
      u.email,
      u.phone,
      u.avatar_url,
      u.role,
      u.company_name,
      u.bio,
      u.is_verified,
      u.created_at,
      u.parent_user_id,
      parent.company_name as parent_company_name,
      parent.name as parent_name,
      (SELECT COUNT(*) FROM ubikala_properties WHERE created_by = u.id AND activo = true) as properties_count
    FROM ubikala_users u
    LEFT JOIN ubikala_users parent ON u.parent_user_id = parent.id
    WHERE u.is_active = true
    AND u.role IN ('inmobiliaria', 'asesor_independiente')
    AND EXISTS (
      SELECT 1 FROM ubikala_properties p WHERE p.created_by = u.id AND p.activo = true
    )
    ORDER BY u.is_verified DESC, (SELECT COUNT(*) FROM ubikala_properties WHERE created_by = u.id AND activo = true) DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  return rows as UbikalaAgentRow[];
}

export async function getUbikalaAgentsCount(): Promise<number> {
  if (!ubikalaDb) return 0;

  const rows = await ubikalaDb`
    SELECT COUNT(*) as total
    FROM ubikala_users u
    WHERE u.is_active = true
    AND u.role IN ('inmobiliaria', 'asesor_independiente')
    AND EXISTS (
      SELECT 1 FROM ubikala_properties p WHERE p.created_by = u.id AND p.activo = true
    )
  `;

  return parseInt(rows[0]?.total || '0');
}

// ==================== INMOBILIARIAS ====================

export async function getUbikalaInmobiliarias(options: {
  limit?: number;
  offset?: number;
} = {}): Promise<UbikalaAgentRow[]> {
  if (!ubikalaDb) return [];

  const { limit = 100, offset = 0 } = options;

  const rows = await ubikalaDb`
    SELECT
      u.id,
      u.name,
      u.email,
      u.phone,
      u.avatar_url,
      u.role,
      u.company_name,
      u.bio,
      u.is_verified,
      u.created_at,
      u.parent_user_id,
      NULL as parent_company_name,
      NULL as parent_name,
      (
        SELECT COUNT(*) FROM ubikala_properties
        WHERE (created_by = u.id OR created_by IN (SELECT id FROM ubikala_users WHERE parent_user_id = u.id))
        AND activo = true
      ) as properties_count
    FROM ubikala_users u
    WHERE u.is_active = true
    AND u.role = 'inmobiliaria'
    ORDER BY u.is_verified DESC, (
      SELECT COUNT(*) FROM ubikala_properties
      WHERE (created_by = u.id OR created_by IN (SELECT id FROM ubikala_users WHERE parent_user_id = u.id))
      AND activo = true
    ) DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  return rows as UbikalaAgentRow[];
}

export async function getUbikalaInmobiliariasCount(): Promise<number> {
  if (!ubikalaDb) return 0;

  const rows = await ubikalaDb`
    SELECT COUNT(*) as total
    FROM ubikala_users u
    WHERE u.is_active = true
    AND u.role = 'inmobiliaria'
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
