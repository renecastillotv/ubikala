/* empty css                                    */
import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, o as renderScript } from '../../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_DiPxC4Fd.mjs';
import { c as getUbikalaProperties } from '../../chunks/ubikala-db_C_z4BDxl.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://ubikala.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  Astro2.locals.user;
  const properties = await getUbikalaProperties({ limit: 50, activo: void 0 });
  const tipoLabels = {
    casa: "Casa",
    apartamento: "Apartamento",
    villa: "Villa",
    terreno: "Terreno",
    local: "Local Comercial",
    oficina: "Oficina"
  };
  const operacionLabels = {
    venta: "Venta",
    alquiler: "Alquiler"
  };
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Propiedades", "data-astro-cid-5izzfx7u": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="properties-page" data-astro-cid-5izzfx7u> <div class="page-header" data-astro-cid-5izzfx7u> <h3 data-astro-cid-5izzfx7u>Gestión de Propiedades</h3> <a href="/admin/properties/create" class="btn-primary" data-astro-cid-5izzfx7u> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-5izzfx7u> <line x1="12" y1="5" x2="12" y2="19" data-astro-cid-5izzfx7u></line> <line x1="5" y1="12" x2="19" y2="12" data-astro-cid-5izzfx7u></line> </svg>
Nueva Propiedad
</a> </div> <div class="properties-grid" data-astro-cid-5izzfx7u> ${properties.length === 0 ? renderTemplate`<div class="empty-state" data-astro-cid-5izzfx7u> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-5izzfx7u> <path d="M3 21h18 M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" data-astro-cid-5izzfx7u></path> <path d="M9 7h1 M9 11h1 M9 15h1 M14 7h1 M14 11h1 M14 15h1" data-astro-cid-5izzfx7u></path> </svg> <h4 data-astro-cid-5izzfx7u>No hay propiedades</h4> <p data-astro-cid-5izzfx7u>Crea tu primera propiedad para comenzar</p> <a href="/admin/properties/create" class="btn-primary" data-astro-cid-5izzfx7u>Crear Propiedad</a> </div>` : properties.map((property) => renderTemplate`<div class="property-card" data-astro-cid-5izzfx7u> <div class="property-image" data-astro-cid-5izzfx7u> ${property.imagen_principal ? renderTemplate`<img${addAttribute(property.imagen_principal, "src")}${addAttribute(property.titulo, "alt")} data-astro-cid-5izzfx7u>` : renderTemplate`<div class="no-image" data-astro-cid-5izzfx7u> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-5izzfx7u> <rect x="3" y="3" width="18" height="18" rx="2" ry="2" data-astro-cid-5izzfx7u></rect> <circle cx="8.5" cy="8.5" r="1.5" data-astro-cid-5izzfx7u></circle> <polyline points="21 15 16 10 5 21" data-astro-cid-5izzfx7u></polyline> </svg> </div>`} <div class="property-badges" data-astro-cid-5izzfx7u> <span${addAttribute(["badge", property.operacion === "venta" ? "badge-sale" : "badge-rent"], "class:list")} data-astro-cid-5izzfx7u> ${operacionLabels[property.operacion] || property.operacion} </span> ${property.destacada && renderTemplate`<span class="badge badge-featured" data-astro-cid-5izzfx7u>Destacada</span>`} ${!property.activo && renderTemplate`<span class="badge badge-inactive" data-astro-cid-5izzfx7u>Inactiva</span>`} </div> </div> <div class="property-info" data-astro-cid-5izzfx7u> <h4 data-astro-cid-5izzfx7u>${property.titulo}</h4> <p class="property-location" data-astro-cid-5izzfx7u> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-5izzfx7u> <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" data-astro-cid-5izzfx7u></path> <circle cx="12" cy="10" r="3" data-astro-cid-5izzfx7u></circle> </svg> ${[property.sector, property.ciudad, property.provincia].filter(Boolean).join(", ") || "Sin ubicaci\xF3n"} </p> <div class="property-details" data-astro-cid-5izzfx7u> <span class="property-type" data-astro-cid-5izzfx7u>${tipoLabels[property.tipo] || property.tipo}</span> <span class="property-price" data-astro-cid-5izzfx7u> ${property.moneda} ${property.precio.toLocaleString()} </span> </div> <div class="property-features" data-astro-cid-5izzfx7u> ${property.habitaciones && renderTemplate`<span data-astro-cid-5izzfx7u> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-5izzfx7u> <path d="M2 4v16 M2 8h18a2 2 0 0 1 2 2v10 M2 17h20 M6 8v9" data-astro-cid-5izzfx7u></path> </svg> ${property.habitaciones} hab
</span>`} ${property.banos && renderTemplate`<span data-astro-cid-5izzfx7u> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-5izzfx7u> <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z M6 12V5a2 2 0 0 1 2-2h3v2.25" data-astro-cid-5izzfx7u></path> </svg> ${property.banos} baños
</span>`} ${property.m2_construccion && renderTemplate`<span data-astro-cid-5izzfx7u> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-5izzfx7u> <rect x="3" y="3" width="18" height="18" rx="2" data-astro-cid-5izzfx7u></rect> </svg> ${property.m2_construccion} m²
</span>`} </div> <div class="property-actions" data-astro-cid-5izzfx7u> <a${addAttribute(`/admin/properties/${property.id}`, "href")} class="btn-edit" data-astro-cid-5izzfx7u> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-5izzfx7u> <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" data-astro-cid-5izzfx7u></path> <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" data-astro-cid-5izzfx7u></path> </svg>
Editar
</a> <button class="btn-delete"${addAttribute(property.id, "data-property-id")}${addAttribute(property.titulo, "data-property-title")} data-astro-cid-5izzfx7u> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-5izzfx7u> <polyline points="3 6 5 6 21 6" data-astro-cid-5izzfx7u></polyline> <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" data-astro-cid-5izzfx7u></path> </svg>
Eliminar
</button> </div> </div> </div>`)} </div> </div>  ${renderScript($$result2, "D:/portal PropiedadEnRD.com/src/pages/admin/properties/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/admin/properties/index.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/admin/properties/index.astro";
const $$url = "/admin/properties";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
