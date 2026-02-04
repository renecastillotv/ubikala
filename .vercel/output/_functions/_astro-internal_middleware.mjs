import { d as defineMiddleware, s as sequence } from './chunks/index_DwxSEI_Q.mjs';
import { g as getTokenFromRequest, a as getCurrentUser } from './chunks/auth_Db3PMkBi.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_BD3BkmNA.mjs';
import 'piccolore';
import './chunks/astro/server_CULxlDpc.mjs';
import 'clsx';

const PUBLIC_ROUTES = [
  "/admin/login",
  "/api/admin/auth/login"
];
function isPublicRoute(pathname) {
  return PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));
}
function isAdminRoute(pathname) {
  return pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
}
const onRequest$1 = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  if (!isAdminRoute(pathname)) {
    return next();
  }
  if (isPublicRoute(pathname)) {
    return next();
  }
  try {
    const token = getTokenFromRequest(context.request);
    if (!token) {
      if (!pathname.startsWith("/api/")) {
        return context.redirect("/admin/login");
      }
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const user = await getCurrentUser(token);
    if (!user) {
      if (!pathname.startsWith("/api/")) {
        return context.redirect("/admin/login");
      }
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    context.locals.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar_url: user.avatar_url,
      phone: user.phone
    };
    return next();
  } catch (error) {
    console.error("Middleware error:", error);
    if (!pathname.startsWith("/api/")) {
      return context.redirect("/admin/login");
    }
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
