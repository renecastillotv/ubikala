/* empty css                                 */
import { f as createComponent, k as renderComponent, r as renderTemplate, u as unescapeHTML, m as maybeRenderHead } from '../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { $ as $$Layout, u as useTranslations } from '../chunks/Layout_DaFjIure.mjs';
import { $ as $$Hero, a as $$FeaturedProperties, b as $$LocationsGrid, c as $$CTASection } from '../chunks/CTASection_NvTBkqhT.mjs';
import { $ as $$AgentCard } from '../chunks/AgentCard_C36q57oa.mjs';
import { d as getAgents } from '../chunks/db_DCp7snH9.mjs';
import { b as transformAgents } from '../chunks/transformers_DypiJEfR.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const t = useTranslations("es");
  let featuredAgents = [];
  try {
    const dbAgents = await getAgents({ limit: 4 });
    featuredAgents = transformAgents(dbAgents);
  } catch (error) {
    console.error("Error fetching agents:", error);
  }
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ubikala",
    url: "https://ubikala.com",
    description: t.meta.siteDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://ubikala.com/buscar?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Ubikala",
    url: "https://ubikala.com",
    logo: "https://ubikala.com/logo.png",
    description: "Esa propiedad que buscas, ub\xEDkala aqu\xED. Encuentra casas, apartamentos, villas y terrenos en venta y alquiler en Rep\xFAblica Dominicana.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "DO",
      addressRegion: "Rep\xFAblica Dominicana"
    },
    areaServed: {
      "@type": "Country",
      name: "Rep\xFAblica Dominicana"
    },
    sameAs: [
      "https://www.facebook.com/ubikala",
      "https://www.instagram.com/ubikala",
      "https://linkedin.com/company/ubikala"
    ]
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t.pages.home.title, "description": t.pages.home.description, "keywords": t.meta.keywords }, { "default": async ($$result2) => renderTemplate`    ${renderComponent($$result2, "Hero", $$Hero, {})}  ${renderComponent($$result2, "FeaturedProperties", $$FeaturedProperties, {})}  ${renderComponent($$result2, "LocationsGrid", $$LocationsGrid, {})}  ${maybeRenderHead()}<section class="section bg-gray-50"> <div class="container-custom"> <div class="text-center mb-12"> <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">
Tipos de Propiedad
</span> <h2 class="section-title mt-2">
¿Qué Tipo de Propiedad Buscas?
</h2> <p class="section-subtitle mx-auto">
Tenemos la propiedad perfecta para cada necesidad
</p> </div> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"> <a href="/comprar/casas" class="card p-6 text-center group hover:bg-primary-50 transition-colors"> <div class="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors"> <svg class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path> </svg> </div> <h3 class="font-semibold text-gray-900">${t.propertyTypes.house}</h3> </a> <a href="/comprar/apartamentos" class="card p-6 text-center group hover:bg-primary-50 transition-colors"> <div class="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors"> <svg class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path> </svg> </div> <h3 class="font-semibold text-gray-900">${t.propertyTypes.apartment}</h3> </a> <a href="/comprar/villas" class="card p-6 text-center group hover:bg-primary-50 transition-colors"> <div class="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors"> <svg class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path> </svg> </div> <h3 class="font-semibold text-gray-900">${t.propertyTypes.villa}</h3> </a> <a href="/comprar/penthouses" class="card p-6 text-center group hover:bg-primary-50 transition-colors"> <div class="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors"> <svg class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path> </svg> </div> <h3 class="font-semibold text-gray-900">${t.propertyTypes.penthouse}</h3> </a> <a href="/comprar/terrenos" class="card p-6 text-center group hover:bg-primary-50 transition-colors"> <div class="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors"> <svg class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path> </svg> </div> <h3 class="font-semibold text-gray-900">${t.propertyTypes.land}</h3> </a> <a href="/comprar/locales-comerciales" class="card p-6 text-center group hover:bg-primary-50 transition-colors"> <div class="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors"> <svg class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path> </svg> </div> <h3 class="font-semibold text-gray-900">${t.propertyTypes.commercial}</h3> </a> </div> </div> </section>  <section class="section"> <div class="container-custom"> <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-12"> <div> <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">
Asesores Verificados
</span> <h2 class="section-title mt-2">
Conoce a Nuestros Expertos
</h2> <p class="section-subtitle">
Profesionales comprometidos con encontrar tu propiedad ideal
</p> </div> <a href="/asesores" class="btn-outline mt-6 md:mt-0">
Ver Todos los Asesores
<svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> ${featuredAgents.map((agent) => renderTemplate`${renderComponent($$result2, "AgentCard", $$AgentCard, { "agent": agent })}`)} </div> </div> </section>  <section class="section bg-gray-50"> <div class="container-custom"> <div class="text-center mb-12"> <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">
¿Por Qué Elegirnos?
</span> <h2 class="section-title mt-2">
El Portal Inmobiliario #1 de República Dominicana
</h2> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> <div class="text-center"> <div class="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6"> <svg class="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path> </svg> </div> <h3 class="text-xl font-semibold text-gray-900 mb-3">Búsqueda Inteligente</h3> <p class="text-gray-600">
Encuentra exactamente lo que buscas con nuestros filtros avanzados y búsqueda por ubicación, precio, tipo de propiedad y más.
</p> </div> <div class="text-center"> <div class="w-20 h-20 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6"> <svg class="w-10 h-10 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path> </svg> </div> <h3 class="text-xl font-semibold text-gray-900 mb-3">Propiedades Verificadas</h3> <p class="text-gray-600">
Todas las propiedades son verificadas por nuestro equipo para garantizar información precisa y confiable.
</p> </div> <div class="text-center"> <div class="w-20 h-20 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6"> <svg class="w-10 h-10 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path> </svg> </div> <h3 class="text-xl font-semibold text-gray-900 mb-3">Asesores Expertos</h3> <p class="text-gray-600">
Conecta con asesores inmobiliarios profesionales que conocen el mercado dominicano a la perfección.
</p> </div> </div> </div> </section>  ${renderComponent($$result2, "CTASection", $$CTASection, {})} `, "head": async ($$result2) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', '<\/script><script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(homeSchema)), unescapeHTML(JSON.stringify(organizationSchema))) })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/index.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
