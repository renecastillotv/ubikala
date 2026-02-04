/* empty css                                    */
import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { c as getAlternateUrls, $ as $$Layout, u as useTranslations } from '../../chunks/Layout_DaFjIure.mjs';
import { $ as $$PropertyCard } from '../../chunks/PropertyCard_CtVM9QFK.mjs';
import { $ as $$SearchBox } from '../../chunks/SearchBox_DSNT-g5D.mjs';
import { p as properties } from '../../chunks/properties_CQHR7wBe.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://ubikala.com");
const $$Recherche = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Recherche;
  const t = useTranslations("fr");
  const alternateUrls = getAlternateUrls("/fr/recherche");
  const query = Astro2.url.searchParams.get("q") || "";
  const type = Astro2.url.searchParams.get("type") || "";
  const transaction = Astro2.url.searchParams.get("transaction") || "";
  const location = Astro2.url.searchParams.get("location") || "";
  const minPrice = Astro2.url.searchParams.get("minPrice") || "";
  const maxPrice = Astro2.url.searchParams.get("maxPrice") || "";
  let filteredProperties = [...properties];
  if (query) {
    const q = query.toLowerCase();
    filteredProperties = filteredProperties.filter(
      (p) => p.title.toLowerCase().includes(q) || p.location.city.toLowerCase().includes(q) || p.location.sector.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }
  if (type) {
    filteredProperties = filteredProperties.filter((p) => p.type === type);
  }
  if (transaction) {
    filteredProperties = filteredProperties.filter((p) => p.transaction === transaction);
  }
  if (location) {
    filteredProperties = filteredProperties.filter(
      (p) => p.location.city.toLowerCase().includes(location.toLowerCase()) || p.location.sector.toLowerCase().includes(location.toLowerCase())
    );
  }
  if (minPrice) {
    filteredProperties = filteredProperties.filter((p) => p.price >= parseInt(minPrice));
  }
  if (maxPrice) {
    filteredProperties = filteredProperties.filter((p) => p.price <= parseInt(maxPrice));
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `R\xE9sultats de Recherche${query ? ` pour "${query}"` : ""} | PropiedadEnRD.com`, "description": "Recherchez des propri\xE9t\xE9s en R\xE9publique Dominicaine. Maisons, appartements, villas et terrains \xE0 vendre et \xE0 louer.", "keywords": "recherche propri\xE9t\xE9s rd, trouver immobilier r\xE9publique dominicaine", "alternateLanguages": alternateUrls }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="py-8 bg-white shadow-sm sticky top-16 z-40"> <div class="container-custom"> ${renderComponent($$result2, "SearchBox", $$SearchBox, { "variant": "inline" })} </div> </section>  <section class="section"> <div class="container-custom"> <div class="flex items-center justify-between mb-8"> <div> <h1 class="text-2xl font-bold text-gray-900"> ${query ? `R\xE9sultats pour "${query}"` : "Toutes les Propri\xE9t\xE9s"} </h1> <p class="text-gray-600 mt-1"> <span class="font-semibold text-gray-900">${filteredProperties.length}</span> ${t.filters.results} </p> </div> <select class="select py-2 text-sm w-auto"> <option value="recent">Plus Récents</option> <option value="price-asc">Prix: Croissant</option> <option value="price-desc">Prix: Décroissant</option> <option value="area">Plus Grande Surface</option> </select> </div> ${filteredProperties.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${filteredProperties.map((property) => renderTemplate`${renderComponent($$result2, "PropertyCard", $$PropertyCard, { "property": property })}`)} </div>` : renderTemplate`<div class="text-center py-16"> <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"> <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path> </svg> </div> <h2 class="text-xl font-semibold text-gray-900 mb-2">${t.common.noResults}</h2> <p class="text-gray-600 mb-6">
Essayez d'ajuster vos filtres de recherche ou explorez nos propriétés en vedette.
</p> <a href="/fr/acheter" class="btn-primary">
Voir Toutes les Propriétés
</a> </div>`} ${filteredProperties.length > 12 && renderTemplate`<div class="mt-12 flex justify-center"> <nav class="flex items-center gap-2"> <button class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"> ${t.common.previous} </button> <button class="px-4 py-2 bg-primary-600 text-white rounded-lg">1</button> <button class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">2</button> <button class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">3</button> <button class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"> ${t.common.next} </button> </nav> </div>`} </div> </section> ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/fr/recherche.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/fr/recherche.astro";
const $$url = "/fr/recherche";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Recherche,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
