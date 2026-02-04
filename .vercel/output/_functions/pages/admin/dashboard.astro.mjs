/* empty css                                    */
import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_DiPxC4Fd.mjs';
import { a as getAdminStats, g as getActivityLog } from '../../chunks/ubikala-db_C_z4BDxl.mjs';
/* empty css                                        */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://ubikala.com");
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const user = Astro2.locals.user;
  const stats = await getAdminStats();
  const recentActivity = await getActivityLog({ limit: 10 });
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard", "data-astro-cid-x6qnsptu": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="dashboard" data-astro-cid-x6qnsptu> <!-- Welcome --> <div class="welcome-card" data-astro-cid-x6qnsptu> <h3 data-astro-cid-x6qnsptu>Bienvenido, ${user?.name}</h3> <p data-astro-cid-x6qnsptu>Panel de administración de Ubikala. Desde aquí puedes gestionar propiedades, usuarios y más.</p> </div> <!-- Stats Grid --> <div class="stats-grid" data-astro-cid-x6qnsptu> <div class="stat-card" data-astro-cid-x6qnsptu> <div class="stat-icon blue" data-astro-cid-x6qnsptu> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-x6qnsptu> <path d="M3 21h18 M9 8h1 M9 12h1 M9 16h1 M14 8h1 M14 12h1 M14 16h1 M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" data-astro-cid-x6qnsptu></path> </svg> </div> <div class="stat-info" data-astro-cid-x6qnsptu> <span class="stat-value" data-astro-cid-x6qnsptu>${stats.total_properties}</span> <span class="stat-label" data-astro-cid-x6qnsptu>Total Propiedades</span> </div> </div> <div class="stat-card" data-astro-cid-x6qnsptu> <div class="stat-icon green" data-astro-cid-x6qnsptu> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-x6qnsptu> <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" data-astro-cid-x6qnsptu></path> <polyline points="22 4 12 14.01 9 11.01" data-astro-cid-x6qnsptu></polyline> </svg> </div> <div class="stat-info" data-astro-cid-x6qnsptu> <span class="stat-value" data-astro-cid-x6qnsptu>${stats.active_properties}</span> <span class="stat-label" data-astro-cid-x6qnsptu>Propiedades Activas</span> </div> </div> <div class="stat-card" data-astro-cid-x6qnsptu> <div class="stat-icon yellow" data-astro-cid-x6qnsptu> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-x6qnsptu> <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" data-astro-cid-x6qnsptu></polygon> </svg> </div> <div class="stat-info" data-astro-cid-x6qnsptu> <span class="stat-value" data-astro-cid-x6qnsptu>${stats.featured_properties}</span> <span class="stat-label" data-astro-cid-x6qnsptu>Destacadas</span> </div> </div> <div class="stat-card" data-astro-cid-x6qnsptu> <div class="stat-icon purple" data-astro-cid-x6qnsptu> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-x6qnsptu> <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-astro-cid-x6qnsptu></path> <circle cx="9" cy="7" r="4" data-astro-cid-x6qnsptu></circle> <path d="M23 21v-2a4 4 0 0 0-3-3.87" data-astro-cid-x6qnsptu></path> <path d="M16 3.13a4 4 0 0 1 0 7.75" data-astro-cid-x6qnsptu></path> </svg> </div> <div class="stat-info" data-astro-cid-x6qnsptu> <span class="stat-value" data-astro-cid-x6qnsptu>${stats.total_users}</span> <span class="stat-label" data-astro-cid-x6qnsptu>Usuarios</span> </div> </div> </div> <!-- Quick Actions --> <div class="section" data-astro-cid-x6qnsptu> <h4 data-astro-cid-x6qnsptu>Acciones Rápidas</h4> <div class="quick-actions" data-astro-cid-x6qnsptu> <a href="/admin/properties/create" class="action-btn" data-astro-cid-x6qnsptu> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-x6qnsptu> <line x1="12" y1="5" x2="12" y2="19" data-astro-cid-x6qnsptu></line> <line x1="5" y1="12" x2="19" y2="12" data-astro-cid-x6qnsptu></line> </svg>
Nueva Propiedad
</a> <a href="/admin/properties" class="action-btn secondary" data-astro-cid-x6qnsptu> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-x6qnsptu> <path d="M3 21h18 M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" data-astro-cid-x6qnsptu></path> </svg>
Ver Propiedades
</a> ${user?.role === "admin" && renderTemplate`<a href="/admin/users" class="action-btn secondary" data-astro-cid-x6qnsptu> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-x6qnsptu> <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-astro-cid-x6qnsptu></path> <circle cx="9" cy="7" r="4" data-astro-cid-x6qnsptu></circle> </svg>
Gestionar Usuarios
</a>`} </div> </div> <!-- Recent Activity --> <div class="section" data-astro-cid-x6qnsptu> <h4 data-astro-cid-x6qnsptu>Actividad Reciente</h4> <div class="activity-list" data-astro-cid-x6qnsptu> ${recentActivity.length === 0 ? renderTemplate`<p class="no-activity" data-astro-cid-x6qnsptu>No hay actividad reciente</p>` : recentActivity.map((activity) => renderTemplate`<div class="activity-item" data-astro-cid-x6qnsptu> <div class="activity-icon" data-astro-cid-x6qnsptu> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-x6qnsptu> <circle cx="12" cy="12" r="10" data-astro-cid-x6qnsptu></circle> <polyline points="12 6 12 12 16 14" data-astro-cid-x6qnsptu></polyline> </svg> </div> <div class="activity-content" data-astro-cid-x6qnsptu> <span class="activity-action" data-astro-cid-x6qnsptu>${activity.action}</span> <span class="activity-user" data-astro-cid-x6qnsptu>${activity.user_name || "Sistema"}</span> <span class="activity-time" data-astro-cid-x6qnsptu>${new Date(activity.created_at).toLocaleString("es-DO")}</span> </div> </div>`)} </div> </div> </div>  ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/admin/dashboard.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/admin/dashboard.astro";
const $$url = "/admin/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
