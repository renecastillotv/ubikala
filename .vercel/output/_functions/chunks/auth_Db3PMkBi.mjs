import bcrypt from 'bcryptjs';
import { jwtVerify, SignJWT } from 'jose';
import { i as getUserById, n as getUserByEmail, l as logActivity, o as deleteUserSessions, p as createSession, q as updateUserLastLogin, r as getSessionByTokenHash, s as deleteSession } from './ubikala-db_C_z4BDxl.mjs';

const JWT_SECRET = "ubikala-super-secret-jwt-key-2024-production-ready";
const TOKEN_EXPIRY_DAYS = 7;
function getSecretKey() {
  return new TextEncoder().encode(JWT_SECRET);
}
async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}
async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
async function generateToken(userId, sessionId) {
  const token = await new SignJWT({ userId, sessionId }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(`${TOKEN_EXPIRY_DAYS}d`).sign(getSecretKey());
  return token;
}
async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return {
      userId: payload.userId,
      sessionId: payload.sessionId
    };
  } catch {
    return null;
  }
}
async function hashToken(token) {
  return bcrypt.hash(token, 10);
}
async function loginUser(email, password, ip_address, user_agent) {
  const user = await getUserByEmail(email);
  if (!user) {
    return null;
  }
  const isValid = await verifyPassword(password, user.password_hash);
  if (!isValid) {
    await logActivity({
      user_id: user.id,
      action: "login_failed",
      details: { reason: "invalid_password" },
      ip_address
    });
    return null;
  }
  const expiresAt = /* @__PURE__ */ new Date();
  expiresAt.setDate(expiresAt.getDate() + TOKEN_EXPIRY_DAYS);
  await deleteUserSessions(user.id);
  const tempHash = `temp_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  const session = await createSession({
    user_id: user.id,
    token_hash: tempHash,
    expires_at: expiresAt,
    ip_address,
    user_agent
  });
  const token = await generateToken(user.id, session.id);
  await updateUserLastLogin(user.id);
  await logActivity({
    user_id: user.id,
    action: "login_success",
    ip_address
  });
  const { password_hash, ...safeUser } = user;
  return { user: safeUser, token };
}
async function logoutUser(token, ip_address) {
  const tokenHash = await hashToken(token);
  const session = await getSessionByTokenHash(tokenHash);
  if (session) {
    await deleteSession(tokenHash);
    await logActivity({
      user_id: session.user_id,
      action: "logout",
      ip_address
    });
  }
}
async function getCurrentUser(token) {
  const payload = await verifyToken(token);
  if (!payload) {
    return null;
  }
  const user = await getUserById(payload.userId);
  if (!user) {
    return null;
  }
  const { password_hash, ...safeUser } = user;
  return safeUser;
}
function getTokenFromRequest(request) {
  const authHeader = request.headers.get("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  const cookieHeader = request.headers.get("Cookie");
  if (cookieHeader) {
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((c) => {
        const [key, ...val] = c.trim().split("=");
        return [key, val.join("=")];
      })
    );
    return cookies["ubikala_token"] || null;
  }
  return null;
}
function createAuthCookie(token, maxAge = TOKEN_EXPIRY_DAYS * 24 * 60 * 60) {
  return `ubikala_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`;
}
function createLogoutCookie() {
  return "ubikala_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0";
}

export { getCurrentUser as a, logoutUser as b, createAuthCookie as c, createLogoutCookie as d, getTokenFromRequest as g, hashPassword as h, loginUser as l };
