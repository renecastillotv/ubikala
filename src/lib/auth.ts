import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import {
  getUserByEmail,
  getUserById,
  createSession,
  getSessionByTokenHash,
  deleteSession,
  deleteUserSessions,
  updateUserLastLogin,
  logActivity,
  type UbikalaUser
} from './ubikala-db';

const JWT_SECRET = import.meta.env.JWT_SECRET || process.env.JWT_SECRET || 'fallback-secret-change-me';
const TOKEN_EXPIRY_DAYS = 7;

// Create a secret key for JWT
function getSecretKey() {
  return new TextEncoder().encode(JWT_SECRET);
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Generate JWT token
export async function generateToken(userId: string, sessionId: string): Promise<string> {
  const token = await new SignJWT({ userId, sessionId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_EXPIRY_DAYS}d`)
    .sign(getSecretKey());

  return token;
}

// Verify JWT token
export async function verifyToken(token: string): Promise<{ userId: string; sessionId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return {
      userId: payload.userId as string,
      sessionId: payload.sessionId as string,
    };
  } catch {
    return null;
  }
}

// Hash token for storage
export async function hashToken(token: string): Promise<string> {
  return bcrypt.hash(token, 10);
}

// Login user
export async function loginUser(
  email: string,
  password: string,
  ip_address?: string,
  user_agent?: string
): Promise<{ user: Omit<UbikalaUser, 'password_hash'>; token: string } | null> {
  const user = await getUserByEmail(email);

  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.password_hash);

  if (!isValid) {
    await logActivity({
      user_id: user.id,
      action: 'login_failed',
      details: { reason: 'invalid_password' },
      ip_address,
    });
    return null;
  }

  // Generate token
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + TOKEN_EXPIRY_DAYS);

  // Clean up any existing sessions for this user
  await deleteUserSessions(user.id);

  // Generate a unique temporary hash using timestamp and random string
  const tempHash = `temp_${Date.now()}_${Math.random().toString(36).substring(2)}`;

  // Create session with unique temp hash
  const session = await createSession({
    user_id: user.id,
    token_hash: tempHash,
    expires_at: expiresAt,
    ip_address,
    user_agent,
  });

  const token = await generateToken(user.id, session.id);

  await updateUserLastLogin(user.id);

  await logActivity({
    user_id: user.id,
    action: 'login_success',
    ip_address,
  });

  // Remove password_hash from user object
  const { password_hash, ...safeUser } = user;

  return { user: safeUser, token };
}

// Logout user
export async function logoutUser(token: string, ip_address?: string): Promise<void> {
  const tokenHash = await hashToken(token);
  const session = await getSessionByTokenHash(tokenHash);

  if (session) {
    await deleteSession(tokenHash);
    await logActivity({
      user_id: session.user_id,
      action: 'logout',
      ip_address,
    });
  }
}

// Get current user from token
export async function getCurrentUser(token: string): Promise<Omit<UbikalaUser, 'password_hash'> | null> {
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

// Parse auth token from request
export function getTokenFromRequest(request: Request): string | null {
  // Check Authorization header
  const authHeader = request.headers.get('Authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  // Check cookies
  const cookieHeader = request.headers.get('Cookie');
  if (cookieHeader) {
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map(c => {
        const [key, ...val] = c.trim().split('=');
        return [key, val.join('=')];
      })
    );
    return cookies['ubikala_token'] || null;
  }

  return null;
}

// Create auth cookie string
export function createAuthCookie(token: string, maxAge = TOKEN_EXPIRY_DAYS * 24 * 60 * 60): string {
  return `ubikala_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`;
}

// Create logout cookie string
export function createLogoutCookie(): string {
  return 'ubikala_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0';
}

// Type for authenticated user in Astro context
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'agent';
  avatar_url: string | null;
  phone: string | null;
}
