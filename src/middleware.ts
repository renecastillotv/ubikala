import { defineMiddleware } from 'astro:middleware';
import { getCurrentUser, getTokenFromRequest, type AuthUser } from './lib/auth';

// Routes that don't require authentication
const PUBLIC_ROUTES = [
  '/admin/login',
  '/api/admin/auth/login',
  '/api/admin/auth/register',
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

  // Try to get user from token for ALL routes (so public pages can show user info)
  try {
    const token = getTokenFromRequest(context.request);

    if (token) {
      const user = await getCurrentUser(token);

      if (user) {
        // Store user in locals for use in pages/endpoints
        context.locals.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar_url: user.avatar_url,
          phone: user.phone,
        } as AuthUser;
      }
    }
  } catch (error) {
    // Silently ignore auth errors for public routes
    console.error('Auth check error:', error);
  }

  // For non-admin routes, continue (user info already set if logged in)
  if (!isAdminRoute(pathname)) {
    return next();
  }

  // Allow public admin routes (login, register)
  if (isPublicRoute(pathname)) {
    return next();
  }

  // For protected admin routes, require authentication
  if (!context.locals.user) {
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

  return next();
});
