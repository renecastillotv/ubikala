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
  const t = useTranslations("en");
  const alternateUrls = getAlternateUrls("/en/agents");
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
    return Astro2.redirect("/en/agents");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t.pages.agents.title, "description": t.pages.agents.description, "keywords": "real estate agents dominican republic, dominican realtors, property agents dr", "alternateLanguages": alternateUrls }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="bg-gray-100 py-4"> <div class="container-custom"> <nav class="flex text-sm text-gray-600"> <a href="/en" class="hover:text-primary-600">${t.nav.home}</a> <span class="mx-2">/</span> <span class="text-gray-900 font-medium">${t.nav.agents}</span> </nav> </div> </div>  <section class="bg-gradient-to-r from-primary-600 to-primary-700 py-12"> <div class="container-custom"> <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
Real Estate Agents in the Dominican Republic
</h1> <p class="text-primary-100 text-lg max-w-3xl">
Connect with verified professionals ready to help you find your ideal property or sell your real estate.
</p> </div> </section>  <section class="py-8 bg-white shadow-sm"> <div class="container-custom"> <form class="flex flex-wrap gap-4 items-end"> <div class="flex-1 min-w-[200px]"> <label class="block text-sm font-medium text-gray-700 mb-1">Location</label> <select class="select"> <option value="">All Locations</option> <option value="santo-domingo">Santo Domingo</option> <option value="punta-cana">Punta Cana</option> <option value="santiago">Santiago</option> <option value="las-terrenas">Las Terrenas</option> <option value="bavaro">Bávaro</option> </select> </div> <div class="flex-1 min-w-[200px]"> <label class="block text-sm font-medium text-gray-700 mb-1">Specialization</label> <select class="select"> <option value="">All Specializations</option> <option value="residential">Residential</option> <option value="commercial">Commercial</option> <option value="luxury">Luxury</option> <option value="investment">Investment</option> </select> </div> <button type="submit" class="btn-primary">
Search
</button> </form> </div> </section>  <section class="section"> <div class="container-custom"> <div class="flex items-center justify-between mb-8"> <p class="text-gray-600"> <span class="font-semibold text-gray-900">${totalCount}</span> agents found
</p> <select class="select py-2 text-sm w-auto"> <option value="rating">Highest Rated</option> <option value="properties">Most Properties</option> <option value="recent">Most Recent</option> </select> </div> ${agents.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${agents.map((agent) => renderTemplate`${renderComponent($$result2, "AgentCard", $$AgentCard, { "agent": agent })}`)} </div>` : renderTemplate`<div class="card p-12 text-center"> <p class="text-gray-600">No agents found.</p> </div>`} <!-- Pagination --> ${agents.length > 0 && renderTemplate`<div class="mt-12"> ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages, "baseUrl": "/en/agents" })} </div>`} </div> </section>  <section class="py-16 bg-gray-50"> <div class="container-custom text-center"> <h2 class="text-3xl font-bold text-gray-900 mb-4">Are You a Real Estate Agent?</h2> <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
Join PropiedadEnRD.com and reach thousands of potential clients.
        List your properties and grow your business.
</p> <a href="/en/list" class="btn-primary">
Register as Agent
</a> </div> </section> ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/en/agents.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/en/agents.astro";
const $$url = "/en/agents";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Agents,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
