/* empty css                                    */
import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, l as Fragment } from '../../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_DiPxC4Fd.mjs';
import { g as getActivityLog } from '../../chunks/ubikala-db_C_z4BDxl.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://ubikala.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  Astro2.locals.user;
  const activities = await getActivityLog({ limit: 100 });
  const actionLabels = {
    login_success: "Inicio de sesi\xF3n",
    login_failed: "Intento de login fallido",
    logout: "Cerr\xF3 sesi\xF3n",
    user_created: "Usuario creado",
    user_updated: "Usuario actualizado",
    user_deleted: "Usuario eliminado",
    property_created: "Propiedad creada",
    property_updated: "Propiedad actualizada",
    property_deleted: "Propiedad eliminada"
  };
  const actionIcons = {
    login_success: "login",
    login_failed: "alert",
    logout: "logout",
    user_created: "user-plus",
    user_updated: "user-edit",
    user_deleted: "user-minus",
    property_created: "building-plus",
    property_updated: "building-edit",
    property_deleted: "building-minus"
  };
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Actividad", "data-astro-cid-3ua5isyr": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="activity-page" data-astro-cid-3ua5isyr> <div class="page-header" data-astro-cid-3ua5isyr> <h3 data-astro-cid-3ua5isyr>Registro de Actividad</h3> </div> <div class="activity-container" data-astro-cid-3ua5isyr> ${activities.length === 0 ? renderTemplate`<div class="empty-state" data-astro-cid-3ua5isyr> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-3ua5isyr> <path d="M22 12h-4l-3 9L9 3l-3 9H2" data-astro-cid-3ua5isyr></path> </svg> <h4 data-astro-cid-3ua5isyr>Sin actividad</h4> <p data-astro-cid-3ua5isyr>No hay registros de actividad todavía</p> </div>` : renderTemplate`<div class="activity-timeline" data-astro-cid-3ua5isyr> ${activities.map((activity) => renderTemplate`<div class="activity-item" data-astro-cid-3ua5isyr> <div${addAttribute(["activity-icon", activity.action.includes("failed") || activity.action.includes("deleted") ? "danger" : activity.action.includes("created") ? "success" : "default"], "class:list")} data-astro-cid-3ua5isyr> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-3ua5isyr> ${actionIcons[activity.action] === "login" && renderTemplate`<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4 M10 17l5-5-5-5 M15 12H3" data-astro-cid-3ua5isyr></path>`} ${actionIcons[activity.action] === "logout" && renderTemplate`<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9" data-astro-cid-3ua5isyr></path>`} ${actionIcons[activity.action] === "alert" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-3ua5isyr": true }, { "default": async ($$result3) => renderTemplate`<circle cx="12" cy="12" r="10" data-astro-cid-3ua5isyr></circle><line x1="12" y1="8" x2="12" y2="12" data-astro-cid-3ua5isyr></line><line x1="12" y1="16" x2="12.01" y2="16" data-astro-cid-3ua5isyr></line>` })}`} ${actionIcons[activity.action]?.includes("user") && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-3ua5isyr": true }, { "default": async ($$result3) => renderTemplate`<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" data-astro-cid-3ua5isyr></path><circle cx="12" cy="7" r="4" data-astro-cid-3ua5isyr></circle>` })}`} ${actionIcons[activity.action]?.includes("building") && renderTemplate`<path d="M3 21h18 M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" data-astro-cid-3ua5isyr></path>`} ${!actionIcons[activity.action] && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-3ua5isyr": true }, { "default": async ($$result3) => renderTemplate`<circle cx="12" cy="12" r="10" data-astro-cid-3ua5isyr></circle><polyline points="12 6 12 12 16 14" data-astro-cid-3ua5isyr></polyline>` })}`} </svg> </div> <div class="activity-content" data-astro-cid-3ua5isyr> <div class="activity-header" data-astro-cid-3ua5isyr> <span class="activity-action" data-astro-cid-3ua5isyr>${actionLabels[activity.action] || activity.action}</span> <span class="activity-time" data-astro-cid-3ua5isyr>${new Date(activity.created_at).toLocaleString("es-DO")}</span> </div> <div class="activity-meta" data-astro-cid-3ua5isyr> <span class="activity-user" data-astro-cid-3ua5isyr> ${activity.user_name ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-3ua5isyr": true }, { "default": async ($$result3) => renderTemplate`Por <strong data-astro-cid-3ua5isyr>${activity.user_name}</strong> (${activity.user_email})` })}` : "Sistema"} </span> ${activity.details && Object.keys(activity.details).length > 0 && renderTemplate`<div class="activity-details" data-astro-cid-3ua5isyr> ${activity.details.email && renderTemplate`<span data-astro-cid-3ua5isyr>Email: ${activity.details.email}</span>`} ${activity.details.titulo && renderTemplate`<span data-astro-cid-3ua5isyr>Propiedad: ${activity.details.titulo}</span>`} ${activity.details.slug && renderTemplate`<span data-astro-cid-3ua5isyr>Slug: ${activity.details.slug}</span>`} ${activity.details.role && renderTemplate`<span data-astro-cid-3ua5isyr>Rol: ${activity.details.role}</span>`} ${activity.details.fields && renderTemplate`<span data-astro-cid-3ua5isyr>Campos: ${activity.details.fields.join(", ")}</span>`} ${activity.details.reason && renderTemplate`<span data-astro-cid-3ua5isyr>Razón: ${activity.details.reason}</span>`} </div>`} </div> ${activity.ip_address && renderTemplate`<span class="activity-ip" data-astro-cid-3ua5isyr>IP: ${activity.ip_address}</span>`} </div> </div>`)} </div>`} </div> </div>  ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/admin/activity/index.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/admin/activity/index.astro";
const $$url = "/admin/activity";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
