import { defineMiddleware } from 'astro:middleware';
import { getCurrentUser, getTokenFromRequest, type AuthUser } from './lib/auth';

// Routes that don't require authentication
const PUBLIC_ROUTES = [
  '/admin/login',
  '/api/admin/auth/login',
];

// Check if route is public
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));
}

// Check if route is admin route
function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Skip non-admin routes
  if (!isAdminRoute(pathname)) {
    return next();
  }

  // Allow public admin routes
  if (isPublicRoute(pathname)) {
    return next();
  }

  // Get token from request
  const token = getTokenFromRequest(context.request);

  if (!token) {
    // Redirect to login for page requests
    if (!pathname.startsWith('/api/')) {
      return context.redirect('/admin/login');
    }
    // Return 401 for API requests
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Verify token and get user
  const user = await getCurrentUser(token);

  if (!user) {
    // Invalid token - redirect to login
    if (!pathname.startsWith('/api/')) {
      return context.redirect('/admin/login');
    }
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Store user in locals for use in pages/endpoints
  context.locals.user = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar_url: user.avatar_url,
    phone: user.phone,
  } as AuthUser;

  return next();
});
