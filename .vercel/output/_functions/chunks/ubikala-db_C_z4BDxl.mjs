import { neon } from '@neondatabase/serverless';

const UBIKALA_DATABASE_URL = "postgresql://neondb_owner:npg_QDwB9pWHXm6S@ep-polished-moon-aieg89w2-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require";
const ubikalaDb = neon(UBIKALA_DATABASE_URL) ;
async function getUserByEmail(email) {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`
    SELECT * FROM ubikala_users WHERE email = ${email} AND is_active = true
  `;
  return rows[0] || null;
}
async function getUserById(id) {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`
    SELECT * FROM ubikala_users WHERE id = ${id} AND is_active = true
  `;
  return rows[0] || null;
}
async function updateUserLastLogin(userId) {
  if (!ubikalaDb) return;
  await ubikalaDb`
    UPDATE ubikala_users SET last_login_at = NOW() WHERE id = ${userId}
  `;
}
async function getAllUsers() {
  if (!ubikalaDb) return [];
  const rows = await ubikalaDb`
    SELECT id, email, name, role, avatar_url, phone, is_active, last_login_at, created_at, updated_at
    FROM ubikala_users
    ORDER BY created_at DESC
  `;
  return rows;
}
async function createUser(data) {
  if (!ubikalaDb) throw new Error("Database not configured");
  const rows = await ubikalaDb`
    INSERT INTO ubikala_users (email, password_hash, name, role, phone)
    VALUES (${data.email}, ${data.password_hash}, ${data.name}, ${data.role}, ${data.phone || null})
    RETURNING *
  `;
  return rows[0];
}
async function updateUser(id, data) {
  if (!ubikalaDb) return null;
  const hasUpdates = Object.values(data).some((v) => v !== void 0);
  if (!hasUpdates) return getUserById(id);
  const currentUser = await getUserById(id);
  if (!currentUser) return null;
  const email = data.email !== void 0 ? data.email : currentUser.email;
  const password_hash = data.password_hash !== void 0 ? data.password_hash : currentUser.password_hash;
  const name = data.name !== void 0 ? data.name : currentUser.name;
  const role = data.role !== void 0 ? data.role : currentUser.role;
  const phone = data.phone !== void 0 ? data.phone : currentUser.phone;
  const avatar_url = data.avatar_url !== void 0 ? data.avatar_url : currentUser.avatar_url;
  const is_active = data.is_active !== void 0 ? data.is_active : currentUser.is_active;
  const rows = await ubikalaDb`
    UPDATE ubikala_users
    SET
      email = ${email},
      password_hash = ${password_hash},
      name = ${name},
      role = ${role},
      phone = ${phone},
      avatar_url = ${avatar_url},
      is_active = ${is_active},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] || null;
}
async function deleteUser(id) {
  if (!ubikalaDb) return false;
  await ubikalaDb`
    DELETE FROM ubikala_users WHERE id = ${id}
  `;
  return true;
}
async function createSession(data) {
  if (!ubikalaDb) throw new Error("Database not configured");
  const rows = await ubikalaDb`
    INSERT INTO ubikala_sessions (user_id, token_hash, expires_at, ip_address, user_agent)
    VALUES (${data.user_id}, ${data.token_hash}, ${data.expires_at.toISOString()}, ${data.ip_address || null}, ${data.user_agent || null})
    RETURNING *
  `;
  return rows[0];
}
async function getSessionByTokenHash(tokenHash) {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`
    SELECT * FROM ubikala_sessions
    WHERE token_hash = ${tokenHash} AND expires_at > NOW()
  `;
  return rows[0] || null;
}
async function deleteSession(tokenHash) {
  if (!ubikalaDb) return;
  await ubikalaDb`DELETE FROM ubikala_sessions WHERE token_hash = ${tokenHash}`;
}
async function deleteUserSessions(userId) {
  if (!ubikalaDb) return;
  await ubikalaDb`DELETE FROM ubikala_sessions WHERE user_id = ${userId}`;
}
async function getUbikalaProperties(options) {
  if (!ubikalaDb) return [];
  const { limit = 20, offset = 0, activo = true } = options;
  const rows = await ubikalaDb`
    SELECT * FROM ubikala_properties
    WHERE activo = ${activo}
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;
  return rows.map((p) => ({ ...p, source: "ubikala" }));
}
async function getUbikalaPropertyById(id) {
  if (!ubikalaDb) return null;
  const rows = await ubikalaDb`
    SELECT * FROM ubikala_properties WHERE id = ${id}
  `;
  return rows[0] ? { ...rows[0], source: "ubikala" } : null;
}
async function createProperty(data) {
  if (!ubikalaDb) throw new Error("Database not configured");
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
      ${data.estado || "disponible"},
      ${data.precio},
      ${data.moneda || "USD"},
      ${data.precio_alquiler || null},
      ${data.moneda_alquiler || null},
      ${data.pais || "República Dominicana"},
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
  return { ...rows[0], source: "ubikala" };
}
async function updateProperty(id, data) {
  if (!ubikalaDb) return null;
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
  return rows[0] ? { ...rows[0], source: "ubikala" } : null;
}
async function deleteProperty(id) {
  if (!ubikalaDb) return false;
  await ubikalaDb`DELETE FROM ubikala_properties WHERE id = ${id}`;
  return true;
}
async function logActivity(data) {
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
async function getActivityLog(options) {
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
async function getAdminStats() {
  if (!ubikalaDb) return { total_users: 0, total_properties: 0, active_properties: 0, featured_properties: 0 };
  const [users, properties, active, featured] = await Promise.all([
    ubikalaDb`SELECT COUNT(*) as count FROM ubikala_users WHERE is_active = true`,
    ubikalaDb`SELECT COUNT(*) as count FROM ubikala_properties`,
    ubikalaDb`SELECT COUNT(*) as count FROM ubikala_properties WHERE activo = true`,
    ubikalaDb`SELECT COUNT(*) as count FROM ubikala_properties WHERE destacada = true`
  ]);
  return {
    total_users: Number(users[0]?.count || 0),
    total_properties: Number(properties[0]?.count || 0),
    active_properties: Number(active[0]?.count || 0),
    featured_properties: Number(featured[0]?.count || 0)
  };
}

export { getAdminStats as a, getUbikalaPropertyById as b, getUbikalaProperties as c, getAllUsers as d, deleteProperty as e, updateProperty as f, getActivityLog as g, createProperty as h, getUserById as i, deleteUser as j, updateUser as k, logActivity as l, createUser as m, getUserByEmail as n, deleteUserSessions as o, createSession as p, updateUserLastLogin as q, getSessionByTokenHash as r, deleteSession as s, ubikalaDb as u };
