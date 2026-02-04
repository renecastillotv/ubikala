/* empty css                                    */
import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, o as renderScript } from '../../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_DiPxC4Fd.mjs';
import { d as getAllUsers } from '../../chunks/ubikala-db_C_z4BDxl.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://ubikala.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const user = Astro2.locals.user;
  if (user?.role !== "admin") {
    return Astro2.redirect("/admin/dashboard");
  }
  const users = await getAllUsers();
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Usuarios", "data-astro-cid-ofvihdgl": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="users-page" data-astro-cid-ofvihdgl> <div class="page-header" data-astro-cid-ofvihdgl> <h3 data-astro-cid-ofvihdgl>Gestión de Usuarios</h3> <button id="add-user-btn" class="btn-primary" data-astro-cid-ofvihdgl> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-ofvihdgl> <line x1="12" y1="5" x2="12" y2="19" data-astro-cid-ofvihdgl></line> <line x1="5" y1="12" x2="19" y2="12" data-astro-cid-ofvihdgl></line> </svg>
Nuevo Usuario
</button> </div> <div class="users-table-container" data-astro-cid-ofvihdgl> <table class="users-table" data-astro-cid-ofvihdgl> <thead data-astro-cid-ofvihdgl> <tr data-astro-cid-ofvihdgl> <th data-astro-cid-ofvihdgl>Usuario</th> <th data-astro-cid-ofvihdgl>Email</th> <th data-astro-cid-ofvihdgl>Rol</th> <th data-astro-cid-ofvihdgl>Estado</th> <th data-astro-cid-ofvihdgl>Último acceso</th> <th data-astro-cid-ofvihdgl>Acciones</th> </tr> </thead> <tbody data-astro-cid-ofvihdgl> ${users.map((u) => renderTemplate`<tr${addAttribute(u.id, "data-user-id")} data-astro-cid-ofvihdgl> <td data-astro-cid-ofvihdgl> <div class="user-cell" data-astro-cid-ofvihdgl> <div class="avatar" data-astro-cid-ofvihdgl>${u.name.charAt(0).toUpperCase()}</div> <span data-astro-cid-ofvihdgl>${u.name}</span> </div> </td> <td data-astro-cid-ofvihdgl>${u.email}</td> <td data-astro-cid-ofvihdgl> <span${addAttribute(["badge", u.role === "admin" ? "badge-admin" : "badge-agent"], "class:list")} data-astro-cid-ofvihdgl> ${u.role === "admin" ? "Administrador" : "Agente"} </span> </td> <td data-astro-cid-ofvihdgl> <span${addAttribute(["status", u.is_active ? "active" : "inactive"], "class:list")} data-astro-cid-ofvihdgl> ${u.is_active ? "Activo" : "Inactivo"} </span> </td> <td data-astro-cid-ofvihdgl>${u.last_login_at ? new Date(u.last_login_at).toLocaleDateString("es-DO") : "Nunca"}</td> <td data-astro-cid-ofvihdgl> <div class="actions" data-astro-cid-ofvihdgl> <button class="btn-icon edit-btn"${addAttribute(JSON.stringify(u), "data-user")} title="Editar" data-astro-cid-ofvihdgl> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-ofvihdgl> <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" data-astro-cid-ofvihdgl></path> <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" data-astro-cid-ofvihdgl></path> </svg> </button> ${u.id !== user?.id && renderTemplate`<button class="btn-icon delete-btn"${addAttribute(u.id, "data-user-id")}${addAttribute(u.name, "data-user-name")} title="Eliminar" data-astro-cid-ofvihdgl> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-ofvihdgl> <polyline points="3 6 5 6 21 6" data-astro-cid-ofvihdgl></polyline> <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" data-astro-cid-ofvihdgl></path> </svg> </button>`} </div> </td> </tr>`)} </tbody> </table> </div> <!-- Modal for Add/Edit User --> <div id="user-modal" class="modal hidden" data-astro-cid-ofvihdgl> <div class="modal-backdrop" data-astro-cid-ofvihdgl></div> <div class="modal-content" data-astro-cid-ofvihdgl> <div class="modal-header" data-astro-cid-ofvihdgl> <h4 id="modal-title" data-astro-cid-ofvihdgl>Nuevo Usuario</h4> <button class="close-modal" data-astro-cid-ofvihdgl>&times;</button> </div> <form id="user-form" data-astro-cid-ofvihdgl> <input type="hidden" id="user-id" data-astro-cid-ofvihdgl> <div class="form-group" data-astro-cid-ofvihdgl> <label for="user-name" data-astro-cid-ofvihdgl>Nombre</label> <input type="text" id="user-name" required data-astro-cid-ofvihdgl> </div> <div class="form-group" data-astro-cid-ofvihdgl> <label for="user-email" data-astro-cid-ofvihdgl>Email</label> <input type="email" id="user-email" required data-astro-cid-ofvihdgl> </div> <div class="form-group" data-astro-cid-ofvihdgl> <label for="user-password" data-astro-cid-ofvihdgl>Contraseña <span id="password-hint" data-astro-cid-ofvihdgl>(dejar vacío para mantener)</span></label> <input type="password" id="user-password" data-astro-cid-ofvihdgl> </div> <div class="form-group" data-astro-cid-ofvihdgl> <label for="user-role" data-astro-cid-ofvihdgl>Rol</label> <select id="user-role" required data-astro-cid-ofvihdgl> <option value="agent" data-astro-cid-ofvihdgl>Agente</option> <option value="admin" data-astro-cid-ofvihdgl>Administrador</option> </select> </div> <div class="form-group" data-astro-cid-ofvihdgl> <label for="user-phone" data-astro-cid-ofvihdgl>Teléfono</label> <input type="tel" id="user-phone" data-astro-cid-ofvihdgl> </div> <div class="form-group checkbox-group" data-astro-cid-ofvihdgl> <label data-astro-cid-ofvihdgl> <input type="checkbox" id="user-active" checked data-astro-cid-ofvihdgl>
Usuario activo
</label> </div> <div id="form-error" class="form-error hidden" data-astro-cid-ofvihdgl></div> <div class="modal-footer" data-astro-cid-ofvihdgl> <button type="button" class="btn-secondary close-modal" data-astro-cid-ofvihdgl>Cancelar</button> <button type="submit" class="btn-primary" data-astro-cid-ofvihdgl>Guardar</button> </div> </form> </div> </div> </div>  ${renderScript($$result2, "D:/portal PropiedadEnRD.com/src/pages/admin/users/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/admin/users/index.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/admin/users/index.astro";
const $$url = "/admin/users";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
