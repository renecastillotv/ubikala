import { defineMiddleware } from 'astro:middleware';
import { getCurrentUser, getTokenFromRequest, type AuthUser } from './lib/auth';
import { detectCountryFromHostnameAsync } from './lib/country-config';

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

/** Render a "Coming Soon" page for inactive countries */
function renderComingSoon(flag: string, name: string): Response {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ub\u00edkala ${name} - Muy Pronto</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #f5f0e8 0%, #e8e0d0 100%);
      color: #3d3d3d;
      text-align: center;
      padding: 2rem;
    }
    .logo {
      font-size: 2rem;
      font-weight: 800;
      color: #5c6b3c;
      margin-bottom: 2rem;
      letter-spacing: -0.02em;
    }
    .logo span { color: #8b7355; }
    .flag {
      font-size: 5rem;
      margin-bottom: 1rem;
      line-height: 1;
    }
    .country-name {
      font-size: 1.5rem;
      font-weight: 600;
      color: #5c6b3c;
      margin-bottom: 0.5rem;
    }
    .coming-soon {
      font-size: 2.5rem;
      font-weight: 800;
      color: #8b7355;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .message {
      font-size: 1.1rem;
      color: #6b6b6b;
      max-width: 500px;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .cta {
      display: inline-block;
      padding: 0.75rem 2rem;
      background: #5c6b3c;
      color: white;
      text-decoration: none;
      border-radius: 0.5rem;
      font-weight: 600;
      transition: background 0.2s;
    }
    .cta:hover { background: #4a5730; }
  </style>
</head>
<body>
  <div class="logo">Ub<span>i</span>kala</div>
  <div class="flag">${flag}</div>
  <div class="country-name">${name}</div>
  <div class="coming-soon">Muy Pronto</div>
  <p class="message">
    Estamos preparando la mejor experiencia inmobiliaria para ${name}.
    Pronto podr\u00e1s encontrar propiedades en venta y alquiler aqu\u00ed.
  </p>
  <a href="https://ubikala.com" class="cta">Visitar Ub\u00edkala</a>
</body>
</html>`;
  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

/** Render a 404 page for unknown subdomains */
function renderNotFound(): Response {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>P\u00e1gina no encontrada - Ub\u00edkala</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f0e8;
      color: #3d3d3d;
      text-align: center;
      padding: 2rem;
    }
    .code { font-size: 5rem; font-weight: 800; color: #8b7355; }
    .text { font-size: 1.2rem; color: #6b6b6b; margin: 1rem 0 2rem; }
    .cta {
      display: inline-block;
      padding: 0.75rem 2rem;
      background: #5c6b3c;
      color: white;
      text-decoration: none;
      border-radius: 0.5rem;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="code">404</div>
  <p class="text">Esta p\u00e1gina no existe.</p>
  <a href="https://ubikala.com" class="cta">Ir a Ub\u00edkala</a>
</body>
</html>`;
  return new Response(html, {
    status: 404,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Detect country from subdomain (pa.ubikala.com → PA, mx.ubikala.com → MX, etc.)
  const hostname = context.url.hostname;
  const country = await detectCountryFromHostnameAsync(hostname);

  // Unknown subdomain (not a registered country) → 404
  if (!country) {
    return renderNotFound();
  }

  // Registered country but not active yet → Coming Soon
  // (skip for admin routes so admins can still access the site)
  if (!country.isActive && !isAdminRoute(pathname)) {
    return renderComingSoon(country.flag, country.name);
  }

  // Set country in locals for the rest of the app
  context.locals.country = country;

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
          is_verified: user.is_verified,
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
