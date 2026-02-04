/* empty css                                    */
import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { c as getAlternateUrls, $ as $$Layout, u as useTranslations } from '../../chunks/Layout_DaFjIure.mjs';
import { $ as $$PropertyCard } from '../../chunks/PropertyCard_CtVM9QFK.mjs';
import { $ as $$SearchBox } from '../../chunks/SearchBox_DSNT-g5D.mjs';
import { $ as $$Pagination } from '../../chunks/Pagination_D1WDScHk.mjs';
import { g as getProperties, a as getPropertiesCount } from '../../chunks/db_DCp7snH9.mjs';
import { t as transformProperties } from '../../chunks/transformers_DypiJEfR.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://ubikala.com");
const prerender = false;
const $$Louer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Louer;
  const t = useTranslations("fr");
  const alternateUrls = getAlternateUrls("/fr/louer");
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
    properties = transformProperties(dbProperties);
    totalCount = count;
  } catch (error) {
    console.error("Error fetching rental properties:", error);
  }
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  if (currentPage > totalPages && totalPages > 0) {
    return Astro2.redirect("/fr/louer");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t.pages.rent.title, "description": t.pages.rent.description, "keywords": t.meta.keywords, "alternateLanguages": alternateUrls }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="bg-gray-100 py-4"> <div class="container-custom"> <nav class="flex text-sm text-gray-600"> <a href="/fr" class="hover:text-primary-600">${t.nav.home}</a> <span class="mx-2">/</span> <span class="text-gray-900 font-medium">${t.nav.rent}</span> </nav> </div> </div>  <section class="bg-gradient-to-r from-secondary-600 to-secondary-700 py-12"> <div class="container-custom"> <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
Propriétés à Louer en République Dominicaine
</h1> <p class="text-green-100 text-lg max-w-3xl">
Trouvez des appartements meublés, maisons familiales, bureaux et locaux commerciaux disponibles à la location.
</p> </div> </section>  <section class="py-8 bg-white shadow-sm sticky top-16 z-40"> <div class="container-custom"> ${renderComponent($$result2, "SearchBox", $$SearchBox, { "variant": "inline" })} </div> </section>  <section class="section"> <div class="container-custom"> <div class="flex items-center justify-between mb-8"> <p class="text-gray-600"> <span class="font-semibold text-gray-900">${totalCount}</span> ${t.filters.results} </p> <select class="select py-2 text-sm w-auto"> <option value="recent">Plus Récents</option> <option value="price-asc">Prix: Croissant</option> <option value="price-desc">Prix: Décroissant</option> </select> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${properties.map((property) => renderTemplate`${renderComponent($$result2, "PropertyCard", $$PropertyCard, { "property": property })}`)} </div> <!-- Pagination --> ${properties.length > 0 && renderTemplate`<div class="mt-12"> ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages, "baseUrl": "/fr/louer" })} </div>`} </div> </section>  <section class="py-12 bg-gray-50"> <div class="container-custom"> <div class="prose prose-lg max-w-4xl mx-auto"> <h2>Louer une Propriété en République Dominicaine</h2> <p>
Que vous cherchiez un appartement meublé pour un court séjour,
          une maison pour votre famille, ou un local commercial pour votre entreprise,
          nous avons les meilleures options de location dans tout le pays.
</p> <h3>Types de Locations Disponibles</h3> <ul> <li><strong>Location Résidentielle:</strong> Appartements et maisons pour des séjours de longue durée.</li> <li><strong>Location Vacances:</strong> Propriétés meublées pour des courts séjours dans les destinations touristiques.</li> <li><strong>Location Commerciale:</strong> Bureaux, locaux et entrepôts industriels pour votre entreprise.</li> </ul> </div> </div> </section> ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/fr/louer.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/fr/louer.astro";
const $$url = "/fr/louer";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Louer,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
