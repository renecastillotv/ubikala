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
const $$Rent = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Rent;
  const t = useTranslations("en");
  const alternateUrls = getAlternateUrls("/en/rent");
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
    return Astro2.redirect("/en/rent");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t.pages.rent.title, "description": t.pages.rent.description, "keywords": t.meta.keywords, "alternateLanguages": alternateUrls }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="bg-gray-100 py-4"> <div class="container-custom"> <nav class="flex text-sm text-gray-600"> <a href="/en" class="hover:text-primary-600">${t.nav.home}</a> <span class="mx-2">/</span> <span class="text-gray-900 font-medium">${t.nav.rent}</span> </nav> </div> </div>  <section class="bg-gradient-to-r from-secondary-600 to-secondary-700 py-12"> <div class="container-custom"> <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
Properties for Rent in the Dominican Republic
</h1> <p class="text-green-100 text-lg max-w-3xl">
Find furnished apartments, family houses, offices and commercial spaces available for rent.
</p> </div> </section>  <section class="py-8 bg-white shadow-sm sticky top-16 z-40"> <div class="container-custom"> ${renderComponent($$result2, "SearchBox", $$SearchBox, { "variant": "inline" })} </div> </section>  <section class="section"> <div class="container-custom"> <div class="flex items-center justify-between mb-8"> <p class="text-gray-600"> <span class="font-semibold text-gray-900">${totalCount}</span> ${t.filters.results} </p> <select class="select py-2 text-sm w-auto"> <option value="recent">Most Recent</option> <option value="price-asc">Price: Low to High</option> <option value="price-desc">Price: High to Low</option> </select> </div> ${properties.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${properties.map((property) => renderTemplate`${renderComponent($$result2, "PropertyCard", $$PropertyCard, { "property": property })}`)} </div>` : renderTemplate`<div class="card p-12 text-center"> <p class="text-gray-600">No rental properties available at the moment.</p> <a href="/en/buy" class="btn-primary mt-4">View properties for sale</a> </div>`} <!-- Pagination --> ${properties.length > 0 && renderTemplate`<div class="mt-12"> ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages, "baseUrl": "/en/rent" })} </div>`} </div> </section>  <section class="py-12 bg-gray-50"> <div class="container-custom"> <div class="prose prose-lg max-w-4xl mx-auto"> <h2>Rent Property in the Dominican Republic</h2> <p>
Whether you're looking for a furnished apartment for a short stay,
          a house for your family, or a commercial space for your business,
          we have the best rental options throughout the country.
</p> <h3>Types of Rentals Available</h3> <ul> <li><strong>Residential Rental:</strong> Apartments and houses for long-term living.</li> <li><strong>Vacation Rental:</strong> Furnished properties for short stays in tourist destinations.</li> <li><strong>Commercial Rental:</strong> Offices, retail spaces and industrial warehouses for your business.</li> </ul> </div> </div> </section> ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/en/rent.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/en/rent.astro";
const $$url = "/en/rent";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Rent,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
