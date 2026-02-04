/* empty css                                    */
import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, u as unescapeHTML, h as addAttribute, l as Fragment, m as maybeRenderHead } from '../../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_DaFjIure.mjs';
import { $ as $$PropertyCard } from '../../chunks/PropertyCard_CtVM9QFK.mjs';
import { $ as $$SearchBox } from '../../chunks/SearchBox_DSNT-g5D.mjs';
import { p as getLocationPropertyCount, h as getLocationBySlug, i as getPropertiesByLocation } from '../../chunks/db_DCp7snH9.mjs';
import { t as transformProperties } from '../../chunks/transformers_DypiJEfR.mjs';
import { l as locationFAQs, f as firstTimeBuyerFAQs, a as financingFAQs } from '../../chunks/seo-content_CDe6Mf03.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro("https://ubikala.com");
const prerender = false;
const $$location = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$location;
  const { location: locationSlug } = Astro2.params;
  const lang = "es";
  const PROPERTIES_PER_PAGE = 48;
  const currentPage = Math.max(1, parseInt(Astro2.url.searchParams.get("pagina") || "1"));
  let locationProperties = [];
  let heroImages = [];
  let locationData = {
    slug: locationSlug || "",
    name: locationSlug?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) || "",
    province: "Rep\xFAblica Dominicana",
    title: { es: "", en: "", fr: "" },
    description: { es: "", en: "", fr: "" },
    image: "/images/locations/default.jpg",
    propertyCount: 0
  };
  let totalPropertyCount = 0;
  try {
    totalPropertyCount = await getLocationPropertyCount(locationSlug || "");
  } catch (e) {
    console.error("Error getting property count:", e);
  }
  try {
    const dbLocation = await getLocationBySlug(locationSlug || "");
    if (dbLocation) {
      locationData = {
        slug: dbLocation.slug,
        name: dbLocation.nombre,
        province: dbLocation.provincia || "Rep\xFAblica Dominicana",
        title: {
          es: dbLocation.seo_title || `Propiedades en ${dbLocation.nombre}`,
          en: `Properties in ${dbLocation.nombre}`,
          fr: `Propri\xE9t\xE9s \xE0 ${dbLocation.nombre}`
        },
        description: {
          es: dbLocation.seo_description || `Encuentra las mejores propiedades en ${dbLocation.nombre}, Rep\xFAblica Dominicana.`,
          en: `Find the best properties in ${dbLocation.nombre}, Dominican Republic.`,
          fr: `Trouvez les meilleures propri\xE9t\xE9s \xE0 ${dbLocation.nombre}, R\xE9publique Dominicaine.`
        },
        image: dbLocation.imagen || "/images/locations/default.jpg",
        propertyCount: totalPropertyCount
      };
    }
    const dbProperties = await getPropertiesByLocation(locationSlug || "", 200);
    locationProperties = transformProperties(dbProperties);
    locationData.propertyCount = totalPropertyCount || locationProperties.length;
    heroImages = locationProperties.slice(0, 4).map((p) => p.images[0]?.url).filter(Boolean);
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
  const totalProperties = locationProperties.length;
  const totalPages = Math.ceil(totalProperties / PROPERTIES_PER_PAGE);
  const validCurrentPage = Math.min(currentPage, totalPages || 1);
  const startIndex = (validCurrentPage - 1) * PROPERTIES_PER_PAGE;
  const endIndex = startIndex + PROPERTIES_PER_PAGE;
  const paginatedProperties = locationProperties.slice(startIndex, endIndex);
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (validCurrentPage > 3) pages.push("...");
      const start = Math.max(2, validCurrentPage - 1);
      const end = Math.min(totalPages - 1, validCurrentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (validCurrentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };
  const pageTitle = locationData.title[lang] || `Propiedades en ${locationData.name}`;
  const pageDescription = locationData.description[lang] || `Encuentra propiedades en ${locationData.name}, Rep\xFAblica Dominicana.`;
  const locationContent = {
    "punta-cana": {
      highlights: ["Playas de arena blanca", "Resorts de clase mundial", "Campos de golf de campeonato", "Aeropuerto internacional"],
      investmentReasons: [
        "Es el destino tur\xEDstico #1 del Caribe con millones de visitantes anuales",
        "Alta demanda de alquiler vacacional con excelente retorno de inversi\xF3n",
        "Infraestructura moderna y en constante desarrollo",
        "Zona franca tur\xEDstica con beneficios fiscales"
      ],
      nearbyAttractions: ["Cap Cana", "B\xE1varo", "Playa Macao", "Isla Saona", "Hoyo Azul"],
      lifestyle: "tropical de playa con acceso a resorts, restaurantes gourmet y vida nocturna"
    },
    "santo-domingo": {
      highlights: ["Capital de Rep\xFAblica Dominicana", "Zona Colonial patrimonio UNESCO", "Centro financiero del pa\xEDs", "Cultura e historia"],
      investmentReasons: [
        "Es el centro econ\xF3mico y comercial del pa\xEDs",
        "Mayor demanda de alquiler residencial a largo plazo",
        "Excelente conectividad y servicios",
        "Mercado inmobiliario m\xE1s estable y maduro"
      ],
      nearbyAttractions: ["Zona Colonial", "Malec\xF3n", "Jard\xEDn Bot\xE1nico", "Los Tres Ojos", "Boca Chica"],
      lifestyle: "urbano con todos los servicios, centros comerciales, universidades y hospitales de primer nivel"
    },
    "santiago": {
      highlights: ["Segunda ciudad del pa\xEDs", "Centro industrial del Cibao", "Clima monta\xF1oso agradable", "Rica cultura local"],
      investmentReasons: [
        "Es el motor econ\xF3mico del norte del pa\xEDs",
        "Precios m\xE1s accesibles que Santo Domingo",
        "Crecimiento constante y desarrollo urbano",
        "Excelente calidad de vida"
      ],
      nearbyAttractions: ["Monumento a los H\xE9roes", "Centro Le\xF3n", "Jarabacoa", "Constanza", "La Vega"],
      lifestyle: "urbano con clima fresco, tradiciones culturales y acceso a monta\xF1as"
    },
    "la-romana": {
      highlights: ["Casa de Campo Resort", "Altos de Chav\xF3n", "Puerto de cruceros", "Campos de golf Teeth of the Dog"],
      investmentReasons: [
        "Destino de lujo reconocido mundialmente",
        "Comunidad de expatriados establecida",
        "Marina de clase mundial",
        "Plusval\xEDa constante en propiedades premium"
      ],
      nearbyAttractions: ["Casa de Campo", "Altos de Chav\xF3n", "Isla Catalina", "Bayah\xEDbe", "Dominicus"],
      lifestyle: "exclusivo de resort con acceso a golf, marina y playa"
    },
    "puerto-plata": {
      highlights: ["Costa \xC1mbar", "Telef\xE9rico \xFAnico en el Caribe", "Fortaleza San Felipe", "Playas doradas"],
      investmentReasons: [
        "Precios m\xE1s accesibles que otros destinos tur\xEDsticos",
        "Aeropuerto internacional con vuelos directos",
        "Desarrollo tur\xEDstico en crecimiento",
        "Potencial de valorizaci\xF3n significativo"
      ],
      nearbyAttractions: ["Playa Dorada", "Cabarete", "Sos\xFAa", "Ocean World", "27 Charcos de Damajagua"],
      lifestyle: "costero relajado con deportes acu\xE1ticos, kitesurf y surf"
    },
    "samana": {
      highlights: ["Avistamiento de ballenas", "Playas v\xEDrgenes", "El Lim\xF3n cascada", "Parque Nacional Los Haitises"],
      investmentReasons: [
        "Destino eco-tur\xEDstico en auge",
        "Belleza natural \xFAnica y preservada",
        "Nuevo aeropuerto internacional",
        "Oportunidades de desarrollo sostenible"
      ],
      nearbyAttractions: ["Las Terrenas", "Las Galeras", "Cayo Levantado", "Playa Rinc\xF3n", "Los Haitises"],
      lifestyle: "tranquilo y natural con \xE9nfasis en ecoturismo y bienestar"
    }
  };
  const slugLower = (locationSlug || "").toLowerCase();
  const specificContent = locationContent[slugLower] || {
    highlights: ["Ubicaci\xF3n privilegiada", "Comunidad en crecimiento", "Buena conectividad", "Servicios cercanos"],
    investmentReasons: [
      "Mercado inmobiliario en desarrollo",
      "Precios competitivos",
      "Potencial de valorizaci\xF3n",
      "Demanda creciente"
    ],
    nearbyAttractions: [],
    lifestyle: "\xFAnico con el encanto dominicano"
  };
  const locationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Propiedades en ${locationData.name}`,
    description: pageDescription,
    numberOfItems: locationProperties.length,
    itemListElement: locationProperties.slice(0, 10).map((property, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "RealEstateListing",
        name: property.title,
        url: `https://propiedadenrd.com/propiedad/${property.slug}`
      }
    }))
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": pageDescription, "image": locationData.image, "keywords": `propiedades ${locationData.name}, casas ${locationData.name}, apartamentos ${locationData.name}, inmuebles ${locationData.province} republica dominicana` }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template(["   ", '<div class="bg-gray-100 py-4"> <div class="container-custom"> <nav class="flex text-sm text-gray-600"> <a href="/" class="hover:text-primary-600">Inicio</a> <span class="mx-2">/</span> <a href="/propiedades" class="hover:text-primary-600">Propiedades</a> <span class="mx-2">/</span> <span class="text-gray-900 font-medium">', '</span> </nav> </div> </div>  <section class="relative h-[300px] md:h-[400px] flex items-center overflow-hidden"> <div class="absolute inset-0"> ', ' <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div> </div> <div class="container-custom relative z-10"> <h1 class="text-3xl md:text-5xl font-bold text-white mb-4">\nPropiedades en ', ' </h1> <p class="text-xl text-gray-200 max-w-2xl"> ', ', Rep\xFAblica Dominicana\n</p> <div class="mt-6"> <span class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path> </svg> ', ' propiedades disponibles\n</span> </div> </div> </section>  <section class="py-4 bg-white shadow-sm"> <div class="container-custom"> ', ' </div> </section>  <section class="section"> <div class="container-custom"> ', ' </div> </section>  <section class="py-16 bg-gradient-to-b from-white to-gray-50"> <div class="container-custom"> <!-- Header --> <div class="text-center mb-12"> <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">\nDescubre ', ' </h2> <p class="text-lg text-gray-600 max-w-2xl mx-auto"> ', " propiedades disponibles en ", ' </p> </div> <!-- Location Highlights - Cards with Icons --> <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"> ', ' </div> <!-- Two Column Layout --> <div class="grid md:grid-cols-2 gap-12 mb-16"> <!-- Investment Reasons --> <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"> <div class="flex items-center gap-3 mb-6"> <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center"> <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path> </svg> </div> <h3 class="text-xl font-bold text-gray-900">\xBFPor qu\xE9 invertir aqu\xED?</h3> </div> <p class="text-gray-600 mb-6"> ', " ofrece un estilo de vida ", ', con oportunidades \xFAnicas para residencia e inversi\xF3n.\n</p> <ul class="space-y-3"> ', ' </ul> </div> <!-- Property Types --> <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"> <div class="flex items-center gap-3 mb-6"> <div class="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center"> <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path> </svg> </div> <h3 class="text-xl font-bold text-gray-900">Tipos de Propiedades</h3> </div> <div class="space-y-4"> <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"> <span class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 text-sm font-bold">A</span> <div> <span class="font-medium text-gray-900">Apartamentos</span> <p class="text-sm text-gray-500">Desde estudios hasta penthouses de lujo</p> </div> </div> <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"> <span class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 text-sm font-bold">C</span> <div> <span class="font-medium text-gray-900">Casas</span> <p class="text-sm text-gray-500">Residencias familiares con seguridad 24/7</p> </div> </div> <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"> <span class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-sm font-bold">V</span> <div> <span class="font-medium text-gray-900">Villas</span> <p class="text-sm text-gray-500">Propiedades exclusivas con piscina privada</p> </div> </div> <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"> <span class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 text-sm font-bold">T</span> <div> <span class="font-medium text-gray-900">Terrenos</span> <p class="text-sm text-gray-500">Lotes para tu proyecto residencial o comercial</p> </div> </div> </div> </div> </div> <!-- Nearby Attractions - Horizontal Scroll --> ', ' <!-- CTA --> <div class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-center"> <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">\n\xBFBuscas propiedad en ', '?\n</h3> <p class="text-primary-100 mb-6 max-w-xl mx-auto">\nNuestros asesores especializados conocen el mercado local y te guiar\xE1n en todo el proceso.\n</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/asesores" class="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path> </svg>\nVer Asesores\n</a> <a href="/contacto" class="inline-flex items-center justify-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-400 transition-colors"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path> </svg>\nContactar\n</a> </div> </div> </div> </section>  <section class="py-12 bg-white"> <div class="container-custom"> <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Preguntas Frecuentes sobre ', '</h2> <div class="max-w-3xl mx-auto space-y-4"> ', ' </div> </div> </section>  <section class="py-12 bg-gray-50"> <div class="container-custom"> <div class="grid md:grid-cols-3 gap-8"> <!-- Bono Primera Vivienda --> <div class="bg-white rounded-xl p-6 shadow-sm"> <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4"> <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <h3 class="text-lg font-semibold text-gray-900 mb-2">Bono Primera Vivienda</h3> <p class="text-gray-600 text-sm mb-4">\n\xBFComprando tu primera casa en ', '? Podr\xEDas recibir hasta RD$1,500,000 de subsidio.\n</p> <a href="/guias/bono-primera-vivienda" class="text-primary-600 font-medium text-sm hover:underline">\nConoce los requisitos \u2192\n</a> </div> <!-- Fideicomiso --> <div class="bg-white rounded-xl p-6 shadow-sm"> <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4"> <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path> </svg> </div> <h3 class="text-lg font-semibold text-gray-900 mb-2">Compra en Fideicomiso</h3> <p class="text-gray-600 text-sm mb-4">\nCompra segura en proyectos en construcci\xF3n con tu inversi\xF3n protegida por ley.\n</p> <a href="/guias/fideicomiso-inmobiliario" class="text-primary-600 font-medium text-sm hover:underline">\nAprende c\xF3mo funciona \u2192\n</a> </div> <!-- Para compradores USA --> <div class="bg-white rounded-xl p-6 shadow-sm"> <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4"> <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <h3 class="text-lg font-semibold text-gray-900 mb-2">Compradores desde USA</h3> <p class="text-gray-600 text-sm mb-4">\nGu\xEDa para estadounidenses: impuestos, financiamiento y proceso de compra en RD.\n</p> <a href="/guias/comprar-desde-usa" class="text-primary-600 font-medium text-sm hover:underline">\nVer gu\xEDa completa \u2192\n</a> </div> </div> <!-- Internal Links - Otras Ubicaciones --> <div class="mt-12"> <h3 class="text-xl font-semibold text-gray-900 mb-6 text-center">Explora Otras Ubicaciones</h3> <div class="flex flex-wrap justify-center gap-3"> ', " ", " ", " ", " ", " ", " ", ' </div> </div> </div> </section>  <script type="application/ld+json">', '<\/script>  <script type="application/ld+json">', "<\/script> "])), maybeRenderHead(), locationData.name, heroImages.length > 0 ? renderTemplate`<div class="grid grid-cols-2 md:grid-cols-4 h-full"> ${heroImages.map((img) => renderTemplate`<div class="overflow-hidden h-full"> <img${addAttribute(img, "src")} alt="" class="w-full h-full object-cover"> </div>`)} </div>` : renderTemplate`<img${addAttribute(locationData.image, "src")}${addAttribute(`Propiedades en ${locationData.name}`, "alt")} class="w-full h-full object-cover">`, locationData.name, locationData.province, locationData.propertyCount, renderComponent($$result2, "SearchBox", $$SearchBox, { "variant": "compact" }), locationProperties.length > 0 ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <div class="flex items-center justify-between mb-8"> <div> <p class="text-gray-600"> <span class="font-semibold text-gray-900">${totalProperties}</span> propiedades en ${locationData.name} ${totalPages > 1 && renderTemplate`<span class="text-gray-400 ml-2">• Página ${validCurrentPage} de ${totalPages}</span>`} </p> </div> <div class="flex items-center gap-4"> <label for="sort" class="text-sm text-gray-600">Ordenar por:</label> <select id="sort" class="select py-2 text-sm w-auto"> <option value="recent">Más recientes</option> <option value="price-asc">Precio: menor a mayor</option> <option value="price-desc">Precio: mayor a menor</option> </select> </div> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> ${paginatedProperties.map((property, index) => renderTemplate`${renderComponent($$result3, "PropertyCard", $$PropertyCard, { "property": property, "priority": index < 4 })}`)} </div> ${totalPages > 1 && renderTemplate`<nav class="mt-12 flex justify-center" aria-label="Paginación"> <div class="flex items-center gap-1">  ${validCurrentPage > 1 ? renderTemplate`<a${addAttribute(`?pagina=${validCurrentPage - 1}`, "href")} class="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors" aria-label="Página anterior"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg> </a>` : renderTemplate`<span class="px-3 py-2 rounded-lg border border-gray-200 text-gray-300 cursor-not-allowed"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg> </span>`}  ${getPageNumbers().map((page) => typeof page === "number" ? page === validCurrentPage ? renderTemplate`<span class="px-4 py-2 rounded-lg bg-primary-600 text-white font-medium"> ${page} </span>` : renderTemplate`<a${addAttribute(`?pagina=${page}`, "href")} class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"> ${page} </a>` : renderTemplate`<span class="px-2 py-2 text-gray-400">...</span>`)}  ${validCurrentPage < totalPages ? renderTemplate`<a${addAttribute(`?pagina=${validCurrentPage + 1}`, "href")} class="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors" aria-label="Página siguiente"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </a>` : renderTemplate`<span class="px-3 py-2 rounded-lg border border-gray-200 text-gray-300 cursor-not-allowed"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </span>`} </div> </nav>`}${totalPages > 1 && renderTemplate`<p class="text-center text-sm text-gray-500 mt-4">
Mostrando ${startIndex + 1}-${Math.min(endIndex, totalProperties)} de ${totalProperties} propiedades
</p>`}` })}` : renderTemplate`<div class="text-center py-16"> <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path> </svg> <h2 class="text-2xl font-semibold text-gray-900 mb-2">No hay propiedades disponibles</h2> <p class="text-gray-600 mb-6">Actualmente no tenemos propiedades en ${locationData.name}</p> <a href="/propiedades" class="btn-primary">Ver todas las propiedades</a> </div>`, locationData.name, locationData.propertyCount, locationData.province, specificContent.highlights.map((highlight, index) => {
    const colors = ["bg-primary-500", "bg-emerald-500", "bg-amber-500", "bg-purple-500"];
    const bgColors = ["bg-primary-50", "bg-emerald-50", "bg-amber-50", "bg-purple-50"];
    return renderTemplate`<div${addAttribute(`${bgColors[index % 4]} rounded-xl p-5 text-center border border-gray-100`, "class")}> <div${addAttribute(`w-10 h-10 ${colors[index % 4]} rounded-full mx-auto mb-3 flex items-center justify-center`, "class")}> <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> </div> <span class="text-sm font-medium text-gray-800">${highlight}</span> </div>`;
  }), locationData.name, specificContent.lifestyle, specificContent.investmentReasons.map((reason) => renderTemplate`<li class="flex items-start gap-3"> <svg class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> <span class="text-gray-700">${reason}</span> </li>`), specificContent.nearbyAttractions.length > 0 && renderTemplate`<div class="mb-16"> <h3 class="text-xl font-bold text-gray-900 mb-6 text-center">Zonas y Atracciones Cercanas</h3> <div class="flex flex-wrap justify-center gap-3"> ${specificContent.nearbyAttractions.map((attraction) => renderTemplate`<span class="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 text-sm hover:border-primary-300 hover:bg-primary-50 transition-colors"> ${attraction} </span>`)} </div> </div>`, locationData.name, locationData.name, (() => {
    const locFaqs = locationFAQs[slugLower] || [];
    const allFaqs = [...locFaqs, ...firstTimeBuyerFAQs.slice(0, 2), ...financingFAQs.slice(0, 1)];
    return allFaqs.map((faq) => renderTemplate`<details class="group bg-gray-50 rounded-lg"> <summary class="flex items-center justify-between p-4 cursor-pointer list-none"> <span class="font-medium text-gray-900">${faq.question}</span> <svg class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> </summary> <div class="px-4 pb-4 text-gray-600"> ${faq.answer} </div> </details>`);
  })(), locationData.name, slugLower !== "santo-domingo" && renderTemplate`<a href="/propiedades/santo-domingo" class="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-sm">
Santo Domingo
</a>`, slugLower !== "punta-cana" && renderTemplate`<a href="/propiedades/punta-cana" class="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-sm">
Punta Cana
</a>`, slugLower !== "santiago" && renderTemplate`<a href="/propiedades/santiago" class="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-sm">
Santiago
</a>`, slugLower !== "la-romana" && renderTemplate`<a href="/propiedades/la-romana" class="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-sm">
La Romana
</a>`, slugLower !== "puerto-plata" && renderTemplate`<a href="/propiedades/puerto-plata" class="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-sm">
Puerto Plata
</a>`, slugLower !== "samana" && renderTemplate`<a href="/propiedades/samana" class="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-sm">
Samaná
</a>`, slugLower !== "santo-domingo-este" && renderTemplate`<a href="/propiedades/santo-domingo-este" class="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-sm">
Santo Domingo Este
</a>`, unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://propiedadenrd.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Propiedades",
        "item": "https://propiedadenrd.com/propiedades"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": locationData.name,
        "item": `https://propiedadenrd.com/propiedades/${locationData.slug}`
      }
    ]
  })), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      ...locationFAQs[slugLower] || [],
      ...firstTimeBuyerFAQs.slice(0, 2),
      ...financingFAQs.slice(0, 1)
    ].map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }))), "head": async ($$result2) => renderTemplate(_b || (_b = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(locationSchema))) })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/propiedades/[location].astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/propiedades/[location].astro";
const $$url = "/propiedades/[location]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$location,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
