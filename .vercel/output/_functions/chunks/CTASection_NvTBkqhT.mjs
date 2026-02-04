import { e as createAstro, f as createComponent, m as maybeRenderHead, k as renderComponent, r as renderTemplate, h as addAttribute } from './astro/server_CULxlDpc.mjs';
import 'piccolore';
import { g as getLangFromUrl, u as useTranslations, l as localizedUrl } from './Layout_DaFjIure.mjs';
import { $ as $$SearchBox } from './SearchBox_DSNT-g5D.mjs';
import { n as getPortalStats, f as getFeaturedProperties, o as getPopularLocationsWithStats } from './db_DCp7snH9.mjs';
import { $ as $$PropertyCard } from './PropertyCard_CtVM9QFK.mjs';
import { t as transformProperties } from './transformers_DypiJEfR.mjs';
import 'clsx';

const $$Astro$3 = createAstro("https://ubikala.com");
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Hero;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  let stats = { properties: 0, agents: 0, cities: 0 };
  try {
    stats = await getPortalStats();
  } catch (error) {
    console.error("Error fetching portal stats:", error);
  }
  return renderTemplate`${maybeRenderHead()}<section class="relative min-h-[600px] lg:min-h-[700px] flex items-center"> <!-- Background Image --> <div class="absolute inset-0 z-0"> <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80" alt="Propiedades en República Dominicana" class="w-full h-full object-cover"> <div class="absolute inset-0 hero-gradient"></div> </div> <!-- Content --> <div class="container-custom relative z-10 py-20"> <div class="max-w-4xl mx-auto text-center mb-10"> <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fadeIn"> ${t.hero.title} </h1> <p class="text-xl md:text-2xl text-primary-100 mb-8 animate-slideUp"> ${t.hero.subtitle} </p> </div> <!-- Search Box --> <div class="max-w-5xl mx-auto animate-slideUp"> ${renderComponent($$result, "SearchBox", $$SearchBox, { "variant": "hero" })} </div> <!-- Stats --> <div class="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto"> <div class="text-center"> <div class="text-3xl md:text-4xl font-bold text-white mb-1">${stats.properties.toLocaleString()}</div> <div class="text-primary-200 text-sm">${t.hero.stats.properties}</div> </div> <div class="text-center"> <div class="text-3xl md:text-4xl font-bold text-white mb-1">${stats.agents.toLocaleString()}</div> <div class="text-primary-200 text-sm">${t.hero.stats.agents}</div> </div> <div class="text-center"> <div class="text-3xl md:text-4xl font-bold text-white mb-1">${stats.cities.toLocaleString()}</div> <div class="text-primary-200 text-sm">${t.hero.stats.cities}</div> </div> </div> </div> <!-- Wave decoration --> <div class="absolute bottom-0 left-0 right-0 z-10"> <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto"> <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"></path> </svg> </div> </section>`;
}, "D:/portal PropiedadEnRD.com/src/components/Hero.astro", void 0);

const $$Astro$2 = createAstro("https://ubikala.com");
const $$FeaturedProperties = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$FeaturedProperties;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  let featuredProperties = [];
  try {
    const dbProperties = await getFeaturedProperties(6);
    featuredProperties = transformProperties(dbProperties);
  } catch (error) {
    console.error("Error fetching featured properties:", error);
  }
  return renderTemplate`${maybeRenderHead()}<section class="section bg-gray-50"> <div class="container-custom"> <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-12"> <div> <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider"> ${t.common.featured} </span> <h2 class="section-title mt-2">
Propiedades Destacadas
</h2> <p class="section-subtitle">
Descubre las mejores oportunidades inmobiliarias seleccionadas por nuestros expertos
</p> </div> <a${addAttribute(localizedUrl("/propiedades", lang), "href")} class="btn-outline mt-6 md:mt-0"> ${t.common.viewAll} <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${featuredProperties.map((property) => renderTemplate`${renderComponent($$result, "PropertyCard", $$PropertyCard, { "property": property })}`)} </div> </div> </section>`;
}, "D:/portal PropiedadEnRD.com/src/components/FeaturedProperties.astro", void 0);

const $$Astro$1 = createAstro("https://ubikala.com");
const $$LocationsGrid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$LocationsGrid;
  const lang = getLangFromUrl(Astro2.url);
  let locations = [];
  try {
    locations = await getPopularLocationsWithStats();
  } catch (error) {
    console.error("Error fetching location stats:", error);
  }
  const defaultImage = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800";
  const displayLocations = locations.slice(0, 6);
  return renderTemplate`${maybeRenderHead()}<section class="section"> <div class="container-custom"> <div class="text-center mb-12"> <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">
Explora por Ubicación
</span> <h2 class="section-title mt-2">
Destinos Populares en República Dominicana
</h2> <p class="section-subtitle mx-auto">
Encuentra propiedades en las ciudades y zonas más buscadas del país
</p> </div> ${displayLocations.length > 0 ? renderTemplate`<div class="grid grid-cols-2 md:grid-cols-3 gap-4"> ${displayLocations.map((location) => renderTemplate`<a${addAttribute(localizedUrl(`/propiedades/${location.slug}`, lang), "href")} class="group relative overflow-hidden rounded-xl aspect-[4/3]"> <img${addAttribute(location.sampleImage || defaultImage, "src")}${addAttribute(`Propiedades en ${location.name}`, "alt")} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy"> <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div> <div class="absolute bottom-0 left-0 right-0 p-4"> <h3 class="text-white font-bold text-lg mb-1"> ${location.name} </h3> <span class="inline-flex items-center gap-1 text-white text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full"> <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path> </svg> ${location.propertyCount} propiedades
</span> </div> </a>`)} </div>` : renderTemplate`<div class="text-center py-12"> <p class="text-gray-600">Cargando ubicaciones...</p> </div>`} <!-- Ver todas las ubicaciones --> ${locations.length > 6 && renderTemplate`<div class="text-center mt-8"> <a${addAttribute(localizedUrl("/propiedades", lang), "href")} class="btn-outline">
Ver todas las ubicaciones
<svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> </div>`} </div> </section>`;
}, "D:/portal PropiedadEnRD.com/src/components/LocationsGrid.astro", void 0);

const $$Astro = createAstro("https://ubikala.com");
const $$CTASection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CTASection;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  return renderTemplate`${maybeRenderHead()}<section class="py-20 bg-primary-600 relative overflow-hidden"> <!-- Background Pattern --> <div class="absolute inset-0 opacity-10"> <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none"> <defs> <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"> <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5"></path> </pattern> </defs> <rect width="100" height="100" fill="url(#grid)"></rect> </svg> </div> <div class="container-custom relative z-10"> <div class="max-w-4xl mx-auto text-center"> <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"> ${t.publish.title} </h2> <p class="text-xl text-primary-100 mb-10"> ${t.publish.subtitle} </p> <!-- Benefits --> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"> <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6"> <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"> <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <h3 class="text-white font-semibold mb-2">${t.publish.benefits.reach}</h3> <p class="text-primary-200 text-sm">${t.publish.benefits.reachDesc}</p> </div> <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6"> <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"> <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path> </svg> </div> <h3 class="text-white font-semibold mb-2">${t.publish.benefits.verified}</h3> <p class="text-primary-200 text-sm">${t.publish.benefits.verifiedDesc}</p> </div> <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6"> <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"> <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path> </svg> </div> <h3 class="text-white font-semibold mb-2">${t.publish.benefits.support}</h3> <p class="text-primary-200 text-sm">${t.publish.benefits.supportDesc}</p> </div> <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6"> <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"> <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path> </svg> </div> <h3 class="text-white font-semibold mb-2">${t.publish.benefits.analytics}</h3> <p class="text-primary-200 text-sm">${t.publish.benefits.analyticsDesc}</p> </div> </div> <a${addAttribute(localizedUrl("/publicar", lang), "href")} class="btn-white text-lg px-10 py-4"> ${t.publish.cta} <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> </div> </div> </section>`;
}, "D:/portal PropiedadEnRD.com/src/components/CTASection.astro", void 0);

export { $$Hero as $, $$FeaturedProperties as a, $$LocationsGrid as b, $$CTASection as c };
