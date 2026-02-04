/* empty css                                    */
import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { c as getAlternateUrls, $ as $$Layout, u as useTranslations } from '../../chunks/Layout_DaFjIure.mjs';
import { $ as $$AgentCard } from '../../chunks/AgentCard_C36q57oa.mjs';
import { $ as $$Pagination } from '../../chunks/Pagination_D1WDScHk.mjs';
import { d as getAgents, l as getAgentsCount } from '../../chunks/db_DCp7snH9.mjs';
import { b as transformAgents } from '../../chunks/transformers_DypiJEfR.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://ubikala.com");
const prerender = false;
const $$Agents = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Agents;
  const t = useTranslations("fr");
  const alternateUrls = getAlternateUrls("/fr/agents");
  const ITEMS_PER_PAGE = 24;
  const currentPage = Math.max(1, parseInt(Astro2.url.searchParams.get("page") || "1"));
  let agents = [];
  let totalCount = 0;
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const [dbAgents, count] = await Promise.all([
      getAgents({ limit: ITEMS_PER_PAGE, offset }),
      getAgentsCount()
    ]);
    agents = transformAgents(dbAgents);
    totalCount = count;
  } catch (error) {
    console.error("Error fetching agents:", error);
  }
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  if (currentPage > totalPages && totalPages > 0) {
    return Astro2.redirect("/fr/agents");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t.pages.agents.title, "description": t.pages.agents.description, "keywords": "agents immobiliers r\xE9publique dominicaine, courtiers dominicains, agents propri\xE9t\xE9s rd", "alternateLanguages": alternateUrls }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="bg-gray-100 py-4"> <div class="container-custom"> <nav class="flex text-sm text-gray-600"> <a href="/fr" class="hover:text-primary-600">${t.nav.home}</a> <span class="mx-2">/</span> <span class="text-gray-900 font-medium">${t.nav.agents}</span> </nav> </div> </div>  <section class="bg-gradient-to-r from-primary-600 to-primary-700 py-12"> <div class="container-custom"> <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
Agents Immobiliers en République Dominicaine
</h1> <p class="text-primary-100 text-lg max-w-3xl">
Connectez-vous avec des professionnels vérifiés prêts à vous aider à trouver votre propriété idéale ou à vendre votre bien immobilier.
</p> </div> </section>  <section class="py-8 bg-white shadow-sm"> <div class="container-custom"> <form class="flex flex-wrap gap-4 items-end"> <div class="flex-1 min-w-[200px]"> <label class="block text-sm font-medium text-gray-700 mb-1">Emplacement</label> <select class="select"> <option value="">Tous les Emplacements</option> <option value="santo-domingo">Saint-Domingue</option> <option value="punta-cana">Punta Cana</option> <option value="santiago">Santiago</option> <option value="las-terrenas">Las Terrenas</option> <option value="bavaro">Bávaro</option> </select> </div> <div class="flex-1 min-w-[200px]"> <label class="block text-sm font-medium text-gray-700 mb-1">Spécialisation</label> <select class="select"> <option value="">Toutes les Spécialisations</option> <option value="residential">Résidentiel</option> <option value="commercial">Commercial</option> <option value="luxury">Luxe</option> <option value="investment">Investissement</option> </select> </div> <button type="submit" class="btn-primary">
Rechercher
</button> </form> </div> </section>  <section class="section"> <div class="container-custom"> <div class="flex items-center justify-between mb-8"> <p class="text-gray-600"> <span class="font-semibold text-gray-900">${totalCount}</span> agents trouvés
</p> <select class="select py-2 text-sm w-auto"> <option value="rating">Mieux Notés</option> <option value="properties">Plus de Propriétés</option> <option value="recent">Plus Récents</option> </select> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${agents.map((agent) => renderTemplate`${renderComponent($$result2, "AgentCard", $$AgentCard, { "agent": agent, "lang": "fr" })}`)} </div> <!-- Pagination --> ${agents.length > 0 && renderTemplate`<div class="mt-12"> ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages, "baseUrl": "/fr/agents" })} </div>`} </div> </section>  <section class="py-16 bg-gray-50"> <div class="container-custom text-center"> <h2 class="text-3xl font-bold text-gray-900 mb-4">Vous Êtes Agent Immobilier?</h2> <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
Rejoignez PropiedadEnRD.com et atteignez des milliers de clients potentiels.
        Publiez vos propriétés et développez votre activité.
</p> <a href="/fr/publier" class="btn-primary">
S'inscrire comme Agent
</a> </div> </section> ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/fr/agents.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/fr/agents.astro";
const $$url = "/fr/agents";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Agents,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
