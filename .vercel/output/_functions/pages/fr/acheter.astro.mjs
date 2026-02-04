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
const $$Acheter = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Acheter;
  const t = useTranslations("fr");
  const alternateUrls = getAlternateUrls("/fr/acheter");
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
    return Astro2.redirect("/fr/acheter");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t.pages.buy.title, "description": t.pages.buy.description, "keywords": t.meta.keywords, "alternateLanguages": alternateUrls }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="bg-gray-100 py-4"> <div class="container-custom"> <nav class="flex text-sm text-gray-600"> <a href="/fr" class="hover:text-primary-600">${t.nav.home}</a> <span class="mx-2">/</span> <span class="text-gray-900 font-medium">${t.nav.buy}</span> </nav> </div> </div>  <section class="bg-gradient-to-r from-primary-600 to-primary-700 py-12"> <div class="container-custom"> <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
Propriétés à Vendre en République Dominicaine
</h1> <p class="text-primary-100 text-lg max-w-3xl">
Explorez notre sélection de maisons, appartements, villas, terrains et propriétés commerciales disponibles à l'achat dans tout le pays.
</p> </div> </section>  <section class="py-8 bg-white shadow-sm sticky top-16 z-40"> <div class="container-custom"> ${renderComponent($$result2, "SearchBox", $$SearchBox, { "variant": "inline" })} </div> </section>  <section class="section"> <div class="container-custom"> <div class="flex items-center justify-between mb-8"> <p class="text-gray-600"> <span class="font-semibold text-gray-900">${totalCount}</span> ${t.filters.results} </p> <select class="select py-2 text-sm w-auto"> <option value="recent">Plus Récents</option> <option value="price-asc">Prix: Croissant</option> <option value="price-desc">Prix: Décroissant</option> </select> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${properties.map((property) => renderTemplate`${renderComponent($$result2, "PropertyCard", $$PropertyCard, { "property": property })}`)} </div> <!-- Pagination --> ${properties.length > 0 && renderTemplate`<div class="mt-12"> ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages, "baseUrl": "/fr/acheter" })} </div>`} </div> </section>  <section class="py-12 bg-gray-50"> <div class="container-custom"> <div class="prose prose-lg max-w-4xl mx-auto"> <h2>Acheter une Propriété en République Dominicaine</h2> <p>
La République Dominicaine offre d'excellentes opportunités d'investissement immobilier dans les Caraïbes.
          Que vous recherchiez une maison familiale à Saint-Domingue, un appartement d'investissement à Punta Cana,
          une villa de luxe face à la mer à Las Terrenas ou un terrain à Santiago,
          notre portail vous connecte avec les meilleures options du marché.
</p> <h3>Zones Populaires pour Acheter</h3> <ul> <li><strong>Saint-Domingue:</strong> La capitale offre des appartements modernes à Piantini et Naco jusqu'aux grandes maisons à Arroyo Hondo.</li> <li><strong>Punta Cana:</strong> La destination touristique #1 des Caraïbes avec d'excellents rendements locatifs.</li> <li><strong>Santiago:</strong> Prix plus abordables et excellente qualité de vie dans la région du Cibao.</li> <li><strong>Las Terrenas:</strong> Paradis bohème avec des propriétés uniques face à la mer.</li> </ul> <h3>Processus d'Achat pour les Étrangers</h3> <p>
Les étrangers peuvent acheter des propriétés en République Dominicaine sans restrictions.
          Le processus est simple et les agents vérifiés sur notre portail peuvent vous guider
          à chaque étape, de la recherche à la conclusion.
</p> </div> </div> </section> ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/fr/acheter.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/fr/acheter.astro";
const $$url = "/fr/acheter";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Acheter,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
