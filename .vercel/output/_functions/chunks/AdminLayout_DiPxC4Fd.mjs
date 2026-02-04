import { e as createAstro, f as createComponent, n as renderHead, h as addAttribute, r as renderTemplate, p as renderSlot, o as renderScript } from './astro/server_CULxlDpc.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro("https://ubikala.com");
const $$AdminLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title } = Astro2.props;
  const user = Astro2.locals.user;
  const currentPath = Astro2.url.pathname;
  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: "home" },
    { href: "/admin/properties", label: "Propiedades", icon: "building" },
    ...user?.role === "admin" ? [{ href: "/admin/users", label: "Usuarios", icon: "users" }] : [],
    { href: "/admin/activity", label: "Actividad", icon: "activity" }
  ];
  return renderTemplate`<html lang="es" data-astro-cid-2kanml4j> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="robots" content="noindex, nofollow"><title>${title} | Ubikala Admin</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=block" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-2kanml4j> <aside class="sidebar" data-astro-cid-2kanml4j> <div class="sidebar-content" data-astro-cid-2kanml4j> <div class="logo" data-astro-cid-2kanml4j> <h1 data-astro-cid-2kanml4j>Ubikala</h1> <span data-astro-cid-2kanml4j>Panel de Administración</span> </div> <nav data-astro-cid-2kanml4j> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(["nav-item", { active: currentPath.startsWith(item.href) }], "class:list")} data-astro-cid-2kanml4j> <svg class="nav-icon" viewBox="0 0 24 24" data-astro-cid-2kanml4j> ${item.icon === "home" && renderTemplate`<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" data-astro-cid-2kanml4j></path>`} ${item.icon === "building" && renderTemplate`<path d="M3 21h18 M9 8h1 M9 12h1 M9 16h1 M14 8h1 M14 12h1 M14 16h1 M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" data-astro-cid-2kanml4j></path>`} ${item.icon === "users" && renderTemplate`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75 M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" data-astro-cid-2kanml4j></path>`} ${item.icon === "activity" && renderTemplate`<path d="M22 12h-4l-3 9L9 3l-3 9H2" data-astro-cid-2kanml4j></path>`} </svg> ${item.label} </a>`)} </nav> <a href="/" class="back-to-site" data-astro-cid-2kanml4j> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-2kanml4j> <path d="M19 12H5M12 19l-7-7 7-7" data-astro-cid-2kanml4j></path> </svg>
Volver al sitio
</a> </div> </aside> <main class="main-content" data-astro-cid-2kanml4j> <header class="topbar" data-astro-cid-2kanml4j> <h2 class="page-title" data-astro-cid-2kanml4j>${title}</h2> <div class="user-menu" data-astro-cid-2kanml4j> <div class="user-info" data-astro-cid-2kanml4j> <div class="user-name" data-astro-cid-2kanml4j>${user?.name}</div> <div class="user-role" data-astro-cid-2kanml4j>${user?.role}</div> </div> <div class="avatar" data-astro-cid-2kanml4j> ${user?.name?.charAt(0).toUpperCase()} </div> <button id="logout-btn" class="logout-btn" data-astro-cid-2kanml4j>Cerrar Sesión</button> </div> </header> <div class="content" data-astro-cid-2kanml4j> ${renderSlot($$result, $$slots["default"])} </div> </main> ${renderScript($$result, "D:/portal PropiedadEnRD.com/src/layouts/AdminLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "D:/portal PropiedadEnRD.com/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
