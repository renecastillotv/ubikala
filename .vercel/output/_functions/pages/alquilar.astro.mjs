/* empty css                                 */
import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, u as unescapeHTML, m as maybeRenderHead } from '../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { $ as $$Layout, u as useTranslations } from '../chunks/Layout_DaFjIure.mjs';
import { $ as $$PropertyCard } from '../chunks/PropertyCard_CtVM9QFK.mjs';
import { $ as $$SearchBox } from '../chunks/SearchBox_DSNT-g5D.mjs';
import { $ as $$Pagination } from '../chunks/Pagination_D1WDScHk.mjs';
import { g as getProperties, a as getPropertiesCount } from '../chunks/db_DCp7snH9.mjs';
import { t as transformProperties } from '../chunks/transformers_DypiJEfR.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://ubikala.com");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const t = useTranslations("es");
  const ITEMS_PER_PAGE = 24;
  const currentPage = Math.max(1, parseInt(Astro2.url.searchParams.get("page") || "1"));
  let properties = [];
  let totalCount = 0;
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const [dbProperties, count] = await Promise.all([
      getProperties({ operacion: "alquiler", limit: ITEMS_PER_PAGE, offset }),
      getPropertiesCount({ operacion: "alquiler" })
    ]);
    properties = transformProperties(dbProperties, true);
    totalCount = count;
  } catch (error) {
    console.error("Error fetching rental properties:", error);
  }
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  if (currentPage > totalPages && totalPages > 0) {
    return Astro2.redirect("/alquilar");
  }
  const pageTitle = t.pages.rent.title;
  const pageDescription = t.pages.rent.description;
  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Propiedades en Alquiler en Rep\xFAblica Dominicana",
    description: pageDescription,
    numberOfItems: totalCount,
    itemListElement: properties.slice(0, 10).map((property, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "RealEstateListing",
        name: property.title,
        description: property.description.substring(0, 160),
        url: `https://propiedadenrd.com/propiedad/${property.slug}`,
        image: property.images[0]?.url,
        offers: {
          "@type": "Offer",
          price: property.price,
          priceCurrency: property.currency
        }
      }
    }))
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": pageDescription, "keywords": "alquilar apartamento republica dominicana, renta casa santo domingo, alquiler punta cana, apartamentos amueblados rd" }, { "default": async ($$result2) => renderTemplate`   ${maybeRenderHead()}<div class="bg-gray-100 py-4"> <div class="container-custom"> <nav class="flex text-sm text-gray-600"> <a href="/" class="hover:text-primary-600">Inicio</a> <span class="mx-2">/</span> <span class="text-gray-900 font-medium">Alquilar</span> </nav> </div> </div>  <section class="bg-gradient-to-r from-secondary-600 to-secondary-700 py-12"> <div class="container-custom"> <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
Propiedades en Alquiler en República Dominicana
</h1> <p class="text-green-100 text-lg max-w-3xl">
Encuentra apartamentos amueblados, casas familiares, oficinas y locales comerciales disponibles para alquiler.
</p> </div> </section>  <section class="py-6 bg-white border-b"> <div class="container-custom"> ${renderComponent($$result2, "SearchBox", $$SearchBox, { "variant": "inline" })} </div> </section>  <section class="section"> <div class="container-custom"> <div class="flex items-center justify-between mb-8"> <div> <p class="text-gray-600"> <span class="font-semibold text-gray-900">${totalCount}</span> propiedades encontradas
</p> </div> <div class="flex items-center gap-4"> <label for="sort" class="text-sm text-gray-600">Ordenar por:</label> <select id="sort" class="select py-2 text-sm w-auto"> <option value="recent">Más recientes</option> <option value="price-asc">Precio: menor a mayor</option> <option value="price-desc">Precio: mayor a menor</option> <option value="area-asc">Área: menor a mayor</option> </select> </div> </div> ${properties.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${properties.map((property) => renderTemplate`${renderComponent($$result2, "PropertyCard", $$PropertyCard, { "property": property })}`)} </div>` : renderTemplate`<div class="card p-12 text-center"> <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path> </svg> <h2 class="text-2xl font-semibold text-gray-900 mb-2">
No hay propiedades en alquiler
</h2> <p class="text-gray-600 mb-6 max-w-md mx-auto">
Actualmente no hay propiedades disponibles para alquiler. Visita las propiedades en venta.
</p> <a href="/comprar" class="btn-primary">
Ver propiedades en venta
</a> </div>`} <!-- Pagination --> ${properties.length > 0 && renderTemplate`<div class="mt-12"> ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages, "baseUrl": "/alquilar" })} </div>`} </div> </section>  <section class="py-12 bg-gray-50"> <div class="container-custom"> <div class="prose prose-lg max-w-4xl mx-auto"> <h2>Alquilar Propiedades en República Dominicana</h2> <p>
En PropiedadEnRD.com encontrarás una amplia variedad de propiedades disponibles para alquiler
          en las mejores zonas de República Dominicana. Desde apartamentos amueblados en Santo Domingo
          hasta villas frente al mar en Punta Cana.
</p> <h3>Zonas Populares para Alquilar</h3> <ul> <li><strong>Santo Domingo:</strong> Piantini, Naco, Bella Vista, Serralles</li> <li><strong>Punta Cana:</strong> Cap Cana, Bávaro, Punta Cana Village</li> <li><strong>Santiago:</strong> Cerros de Gurabo, Jardines Metropolitanos</li> <li><strong>Puerto Plata:</strong> Sosúa, Cabarete</li> </ul> </div> </div> </section> `, "head": async ($$result2) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(listingSchema))) })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/alquilar/index.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/alquilar/index.astro";
const $$url = "/alquilar";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
