/* empty css                                 */
import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, o as renderScript } from '../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { $ as $$Layout, u as useTranslations } from '../chunks/Layout_DaFjIure.mjs';
import { $ as $$AgentCard } from '../chunks/AgentCard_C36q57oa.mjs';
import { $ as $$Pagination } from '../chunks/Pagination_D1WDScHk.mjs';
import { d as getAgents, l as getAgentsCount } from '../chunks/db_DCp7snH9.mjs';
import { b as transformAgents } from '../chunks/transformers_DypiJEfR.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://ubikala.com");
const prerender = false;
const $$Asesores = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Asesores;
  const t = useTranslations("es");
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
    return Astro2.redirect("/asesores");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t.pages.agents.title, "description": t.pages.agents.description, "keywords": "asesores inmobiliarios republica dominicana, agentes bienes raices rd, inmobiliarias santo domingo, corredores punta cana" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="bg-gray-100 py-4"> <div class="container-custom"> <nav class="flex text-sm text-gray-600"> <a href="/" class="hover:text-primary-600">Inicio</a> <span class="mx-2">/</span> <span class="text-gray-900 font-medium">Asesores</span> </nav> </div> </div>  <section class="bg-gradient-to-r from-primary-600 to-primary-700 py-12"> <div class="container-custom"> <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
Asesores Inmobiliarios en República Dominicana
</h1> <p class="text-primary-100 text-lg max-w-3xl">
Conecta con profesionales verificados que te ayudarán a encontrar la propiedad perfecta o vender tu inmueble al mejor precio.
</p> </div> </section>  <section class="py-6 bg-white shadow-sm sticky top-16 z-40"> <div class="container-custom"> <div class="flex flex-col md:flex-row gap-4"> <!-- Search Box --> <div class="relative flex-1 max-w-md"> <input type="text" id="agent-search" placeholder="Buscar asesor por nombre..." class="input w-full pl-10"> <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path> </svg> </div> <!-- Filters --> <div class="flex flex-wrap gap-4"> <select class="select py-2 w-auto"> <option value="">Todas las ubicaciones</option> <option value="santo-domingo">Santo Domingo</option> <option value="punta-cana">Punta Cana</option> <option value="santiago">Santiago</option> <option value="puerto-plata">Puerto Plata</option> </select> <select class="select py-2 w-auto"> <option value="">Especialización</option> <option value="residential">Residencial</option> <option value="commercial">Comercial</option> <option value="luxury">Lujo</option> <option value="land">Terrenos</option> </select> <select class="select py-2 w-auto"> <option value="">Idiomas</option> <option value="spanish">Español</option> <option value="english">English</option> <option value="french">Français</option> </select> </div> </div> </div> </section> ${renderScript($$result2, "D:/portal PropiedadEnRD.com/src/pages/asesores.astro?astro&type=script&index=0&lang.ts")}  <section class="section"> <div class="container-custom"> <div class="flex items-center justify-between mb-8"> <p class="text-gray-600"> <span class="font-semibold text-gray-900">${totalCount}</span> asesores verificados
</p> <select class="select py-2 w-auto text-sm"> <option value="rating">Mayor calificación</option> <option value="experience">Mayor experiencia</option> <option value="properties">Más propiedades</option> </select> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${agents.map((agent) => renderTemplate`${renderComponent($$result2, "AgentCard", $$AgentCard, { "agent": agent })}`)} </div> <!-- Pagination --> ${agents.length > 0 && renderTemplate`<div class="mt-12"> ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages, "baseUrl": "/asesores" })} </div>`} </div> </section>  <section class="py-16 bg-gray-50"> <div class="container-custom"> <div class="max-w-3xl mx-auto text-center"> <h2 class="text-3xl font-bold text-gray-900 mb-4">
¿Eres Asesor Inmobiliario?
</h2> <p class="text-gray-600 text-lg mb-8">
Únete a la red de asesores de PropiedadEnRD.com y accede a miles de clientes potenciales.
          Publica tus propiedades, recibe contactos calificados y haz crecer tu negocio.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/publicar" class="btn-primary">
Registrarme como Asesor
</a> <a href="/contacto" class="btn-outline">
Más Información
</a> </div> </div> </div> </section>  <section class="py-12"> <div class="container-custom"> <div class="prose prose-lg max-w-4xl mx-auto"> <h2>Encuentra el Mejor Asesor Inmobiliario en República Dominicana</h2> <p>
Nuestros asesores inmobiliarios son profesionales verificados con amplia experiencia en el mercado dominicano.
          Ya sea que busques comprar, vender o alquilar, nuestros expertos te guiarán en cada paso del proceso.
</p> <h3>¿Por qué trabajar con un asesor verificado?</h3> <ul> <li><strong>Conocimiento del mercado:</strong> Precios actuales, tendencias y mejores zonas</li> <li><strong>Red de contactos:</strong> Acceso a propiedades exclusivas</li> <li><strong>Negociación experta:</strong> Consigue el mejor precio</li> <li><strong>Proceso legal:</strong> Acompañamiento en contratos y documentación</li> </ul> </div> </div> </section> ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/asesores.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/asesores.astro";
const $$url = "/asesores";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Asesores,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
