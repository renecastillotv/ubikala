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
const $$Buy = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Buy;
  const t = useTranslations("en");
  const alternateUrls = getAlternateUrls("/en/buy");
  const ITEMS_PER_PAGE = 24;
  const currentPage = Math.max(1, parseInt(Astro2.url.searchParams.get("page") || "1"));
  let properties = [];
  let totalCount = 0;
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const [dbProperties, count] = await Promise.all([
      getProperties({ operacion: "venta", limit: ITEMS_PER_PAGE, offset }),
      getPropertiesCount({ operacion: "venta" })
    ]);
    properties = transformProperties(dbProperties);
    totalCount = count;
  } catch (error) {
    console.error("Error fetching properties:", error);
  }
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  if (currentPage > totalPages && totalPages > 0) {
    return Astro2.redirect("/en/buy");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t.pages.buy.title, "description": t.pages.buy.description, "keywords": t.meta.keywords, "alternateLanguages": alternateUrls }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="bg-gray-100 py-4"> <div class="container-custom"> <nav class="flex text-sm text-gray-600"> <a href="/en" class="hover:text-primary-600">${t.nav.home}</a> <span class="mx-2">/</span> <span class="text-gray-900 font-medium">${t.nav.buy}</span> </nav> </div> </div>  <section class="bg-gradient-to-r from-primary-600 to-primary-700 py-12"> <div class="container-custom"> <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
Properties for Sale in the Dominican Republic
</h1> <p class="text-primary-100 text-lg max-w-3xl">
Explore our selection of houses, apartments, villas, land and commercial properties available for purchase throughout the country.
</p> </div> </section>  <section class="py-8 bg-white shadow-sm sticky top-16 z-40"> <div class="container-custom"> ${renderComponent($$result2, "SearchBox", $$SearchBox, { "variant": "inline" })} </div> </section>  <section class="section"> <div class="container-custom"> <div class="flex items-center justify-between mb-8"> <p class="text-gray-600"> <span class="font-semibold text-gray-900">${totalCount}</span> ${t.filters.results} </p> <select class="select py-2 text-sm w-auto"> <option value="recent">Most Recent</option> <option value="price-asc">Price: Low to High</option> <option value="price-desc">Price: High to Low</option> </select> </div> ${properties.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${properties.map((property) => renderTemplate`${renderComponent($$result2, "PropertyCard", $$PropertyCard, { "property": property })}`)} </div>` : renderTemplate`<div class="card p-12 text-center"> <p class="text-gray-600">No properties found.</p> </div>`} <!-- Pagination --> ${properties.length > 0 && renderTemplate`<div class="mt-12"> ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages, "baseUrl": "/en/buy" })} </div>`} </div> </section>  <section class="py-12 bg-gray-50"> <div class="container-custom"> <div class="prose prose-lg max-w-4xl mx-auto"> <h2>Buy Property in the Dominican Republic</h2> <p>
The Dominican Republic offers excellent real estate investment opportunities in the Caribbean.
          Whether you're looking for a family home in Santo Domingo, an investment apartment in Punta Cana,
          a luxury beachfront villa in Las Terrenas, or development land in Santiago,
          our portal connects you with the best options on the market.
</p> <h3>Popular Areas for Buying</h3> <ul> <li><strong>Santo Domingo:</strong> The capital offers modern apartments in Piantini and Naco to spacious houses in Arroyo Hondo.</li> <li><strong>Punta Cana:</strong> The Caribbean's #1 tourist destination with excellent vacation rental returns.</li> <li><strong>Santiago:</strong> More affordable prices and excellent quality of life in the Cibao region.</li> <li><strong>Las Terrenas:</strong> Bohemian paradise with unique beachfront properties.</li> </ul> <h3>Buying Process for Foreigners</h3> <p>
Foreigners can buy property in the Dominican Republic without restrictions.
          The process is straightforward and the verified agents on our portal can guide you
          through every step, from search to closing.
</p> </div> </div> </section> ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/en/buy.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/en/buy.astro";
const $$url = "/en/buy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Buy,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
