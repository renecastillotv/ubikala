/* empty css                                 */
import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, u as unescapeHTML, l as Fragment, h as addAttribute, m as maybeRenderHead } from '../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Icons, u as useTranslations } from '../chunks/Layout_DaFjIure.mjs';
import { $ as $$PropertyCard } from '../chunks/PropertyCard_CtVM9QFK.mjs';
import { $ as $$Pagination } from '../chunks/Pagination_D1WDScHk.mjs';
import { g as getProperties, a as getPropertiesCount } from '../chunks/db_DCp7snH9.mjs';
import { t as transformProperties } from '../chunks/transformers_DypiJEfR.mjs';
import { f as firstTimeBuyerFAQs, a as financingFAQs, u as usBuyerFAQs } from '../chunks/seo-content_CDe6Mf03.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://ubikala.com");
const prerender = false;
const $$Buscar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Buscar;
  const t = useTranslations("es");
  const ITEMS_PER_PAGE = 24;
  const currentPage = Math.max(1, parseInt(Astro2.url.searchParams.get("page") || "1"));
  const url = Astro2.url;
  const params = url.searchParams;
  const typeToDb = {
    "house": "casa",
    "apartment": "apartamento",
    "villa": "villa",
    "penthouse": "penthouse",
    "land": "terreno",
    "commercial": "local",
    "office": "oficina"
  };
  const filters = {
    query: params.get("q") || void 0,
    transactionType: params.get("transactionType") || "all",
    propertyType: params.get("propertyType") || "all",
    location: params.get("location") || void 0,
    minPrice: params.get("minPrice") ? parseInt(params.get("minPrice")) : void 0,
    maxPrice: params.get("maxPrice") ? parseInt(params.get("maxPrice")) : void 0,
    bedrooms: params.get("bedrooms") ? parseInt(params.get("bedrooms")) : void 0,
    bathrooms: params.get("bathrooms") ? parseInt(params.get("bathrooms")) : void 0
  };
  let results = [];
  let totalCount = 0;
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const dbFilters = {
      limit: ITEMS_PER_PAGE,
      offset
    };
    if (filters.transactionType === "sale") dbFilters.operacion = "venta";
    if (filters.transactionType === "rent") dbFilters.operacion = "alquiler";
    if (filters.propertyType && filters.propertyType !== "all") {
      dbFilters.tipo = typeToDb[filters.propertyType] || filters.propertyType;
    }
    if (filters.location || filters.query) {
      dbFilters.ciudad = filters.location || filters.query;
    }
    if (filters.minPrice) dbFilters.minPrice = filters.minPrice;
    if (filters.maxPrice) dbFilters.maxPrice = filters.maxPrice;
    if (filters.bedrooms) dbFilters.habitaciones = filters.bedrooms;
    const [dbProperties, count] = await Promise.all([
      getProperties(dbFilters),
      getPropertiesCount({
        tipo: dbFilters.tipo,
        operacion: dbFilters.operacion,
        ciudad: dbFilters.ciudad
      })
    ]);
    results = transformProperties(dbProperties);
    totalCount = count;
  } catch (error) {
    console.error("Error searching properties:", error);
  }
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const preserveParams = {};
  if (filters.query) preserveParams.q = filters.query;
  if (filters.transactionType !== "all") preserveParams.transactionType = filters.transactionType;
  if (filters.propertyType !== "all") preserveParams.propertyType = filters.propertyType;
  if (filters.location) preserveParams.location = filters.location;
  if (filters.minPrice) preserveParams.minPrice = String(filters.minPrice);
  if (filters.maxPrice) preserveParams.maxPrice = String(filters.maxPrice);
  if (filters.bedrooms) preserveParams.bedrooms = String(filters.bedrooms);
  let pageTitle = "Buscar Propiedades";
  if (filters.location) {
    pageTitle = `Propiedades en ${filters.location}`;
  }
  if (filters.propertyType !== "all") {
    const typeNames = {
      house: "Casas",
      apartment: "Apartamentos",
      villa: "Villas",
      penthouse: "Penthouses",
      land: "Terrenos",
      commercial: "Locales Comerciales",
      office: "Oficinas"
    };
    pageTitle = typeNames[filters.propertyType] || pageTitle;
    if (filters.location) {
      pageTitle += ` en ${filters.location}`;
    }
  }
  const fullTitle = `${pageTitle} | PropiedadEnRD.com`;
  const description = `Encuentra ${totalCount} propiedades disponibles. Busca casas, apartamentos, villas y m\xE1s en Rep\xFAblica Dominicana.`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": fullTitle, "description": description }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<div class="sticky top-16 z-40 bg-white border-b shadow-sm"> <div class="container-custom py-3"> <div class="flex flex-col sm:flex-row sm:items-center gap-3"> <!-- Breadcrumb inline --> <nav class="text-sm text-gray-500 hidden md:flex items-center"> <a href="/" class="hover:text-primary-600">Inicio</a> <span class="mx-1">/</span> <span class="text-gray-900">', '</span> </nav> <!-- Filters inline --> <form action="/buscar" method="GET" class="flex flex-1 items-center gap-2 sm:justify-end"> <select name="transactionType" class="select py-1.5 px-3 text-sm w-auto" onchange="this.form.submit()"> <option value="all"', '>Operaci\xF3n</option> <option value="sale"', '>Venta</option> <option value="rent"', '>Alquiler</option> </select> <select name="propertyType" class="select py-1.5 px-3 text-sm w-auto" onchange="this.form.submit()"> <option value="all"', '>Tipo</option> <option value="house"', '>Casa</option> <option value="apartment"', '>Apartamento</option> <option value="villa"', '>Villa</option> <option value="land"', '>Terreno</option> </select> <select name="location" class="select py-1.5 px-3 text-sm w-auto hidden sm:block" onchange="this.form.submit()"> <option value="">Ubicaci\xF3n</option> <option value="santo-domingo"', '>Santo Domingo</option> <option value="punta-cana"', '>Punta Cana</option> <option value="santiago"', '>Santiago</option> </select> <noscript><button type="submit" class="btn-primary py-1.5 px-3 text-sm">Filtrar</button></noscript> </form> </div> </div> </div>  <div class="bg-gray-50 py-6"> <div class="container-custom"> <h1 class="text-2xl md:text-3xl font-bold text-gray-900">', '</h1> <p class="text-gray-600 mt-1"> ', " ", ' en Rep\xFAblica Dominicana\n</p> </div> </div>  <section class="py-8"> <div class="container-custom"> <!-- Results Header --> <div class="flex items-center justify-between mb-6"> <!-- Active Filters --> <div class="flex flex-wrap items-center gap-2"> ', " ", " ", ' </div> <select id="sort" class="select py-1.5 px-3 text-sm w-auto"> <option value="recent">M\xE1s recientes</option> <option value="price-asc">Menor precio</option> <option value="price-desc">Mayor precio</option> </select> </div> <!-- Results Grid --> ', " <!-- Pagination --> ", ' </div> </section>  <section class="py-12 bg-white"> <div class="container-custom"> <div class="prose prose-lg max-w-4xl mx-auto"> ', ' <h3>\xBFPor qu\xE9 elegir PropiedadEnRD.com?</h3> <ul> <li><strong>Asesores verificados:</strong> Trabajamos solo con profesionales inmobiliarios certificados.</li> <li><strong>Informaci\xF3n actualizada:</strong> Listados actualizados con precios y disponibilidad real.</li> <li><strong>Contacto directo:</strong> Comun\xEDcate directamente con el asesor de cada propiedad.</li> <li><strong>B\xFAsqueda avanzada:</strong> Filtra por ubicaci\xF3n, precio, caracter\xEDsticas y m\xE1s.</li> </ul> </div> </div> </section>  <section class="py-12 bg-gray-50"> <div class="container-custom"> <div class="grid md:grid-cols-3 gap-8"> <!-- Bono Primera Vivienda --> <div class="bg-white rounded-xl p-6 shadow-sm"> <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4"> <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <h3 class="text-lg font-semibold text-gray-900 mb-2">Bono Primera Vivienda</h3> <p class="text-gray-600 text-sm mb-4">\n\xBFComprando tu primera casa? Podr\xEDas recibir hasta RD$1,500,000 de subsidio del gobierno.\n</p> <a href="/guias/bono-primera-vivienda" class="text-primary-600 font-medium text-sm hover:underline">\nConoce los requisitos \u2192\n</a> </div> <!-- Fideicomiso --> <div class="bg-white rounded-xl p-6 shadow-sm"> <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4"> <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path> </svg> </div> <h3 class="text-lg font-semibold text-gray-900 mb-2">Compra en Fideicomiso</h3> <p class="text-gray-600 text-sm mb-4">\nLa forma m\xE1s segura de comprar en proyectos en construcci\xF3n. Tu inversi\xF3n protegida.\n</p> <a href="/guias/fideicomiso-inmobiliario" class="text-primary-600 font-medium text-sm hover:underline">\nAprende c\xF3mo funciona \u2192\n</a> </div> <!-- Para compradores USA --> <div class="bg-white rounded-xl p-6 shadow-sm"> <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4"> <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <h3 class="text-lg font-semibold text-gray-900 mb-2">Compradores desde USA</h3> <p class="text-gray-600 text-sm mb-4">\nGu\xEDa completa para estadounidenses: impuestos, financiamiento y proceso de compra.\n</p> <a href="/guias/comprar-desde-usa" class="text-primary-600 font-medium text-sm hover:underline">\nVer gu\xEDa completa \u2192\n</a> </div> </div> <!-- Internal Links - Ubicaciones Populares --> <div class="mt-12"> <h3 class="text-xl font-semibold text-gray-900 mb-6 text-center">Explora por Ubicaci\xF3n</h3> <div class="flex flex-wrap justify-center gap-3"> <a href="/propiedades/santo-domingo" class="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-sm">\nSanto Domingo\n</a> <a href="/propiedades/punta-cana" class="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-sm">\nPunta Cana\n</a> <a href="/propiedades/santiago" class="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-sm">\nSantiago\n</a> <a href="/propiedades/la-romana" class="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-sm">\nLa Romana\n</a> <a href="/propiedades/puerto-plata" class="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-sm">\nPuerto Plata\n</a> <a href="/propiedades/samana" class="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-sm">\nSaman\xE1\n</a> <a href="/propiedades/santo-domingo-este" class="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-sm">\nSanto Domingo Este\n</a> <a href="/propiedades/santo-domingo-norte" class="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-sm">\nSanto Domingo Norte\n</a> </div> </div> </div> </section>  <section class="py-12 bg-white"> <div class="container-custom"> <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Preguntas Frecuentes</h2> <div class="max-w-3xl mx-auto space-y-4"> ', ' </div> </div> </section>  <script type="application/ld+json">', '<\/script>  <script type="application/ld+json">', '<\/script>  <script type="application/ld+json">', "<\/script> "])), maybeRenderHead(), pageTitle, addAttribute(filters.transactionType === "all", "selected"), addAttribute(filters.transactionType === "sale", "selected"), addAttribute(filters.transactionType === "rent", "selected"), addAttribute(filters.propertyType === "all", "selected"), addAttribute(filters.propertyType === "house", "selected"), addAttribute(filters.propertyType === "apartment", "selected"), addAttribute(filters.propertyType === "villa", "selected"), addAttribute(filters.propertyType === "land", "selected"), addAttribute(filters.location === "santo-domingo", "selected"), addAttribute(filters.location === "punta-cana", "selected"), addAttribute(filters.location === "santiago", "selected"), pageTitle, totalCount, totalCount === 1 ? "propiedad disponible" : "propiedades disponibles", filters.transactionType !== "all" && renderTemplate`<a${addAttribute(`/buscar?propertyType=${filters.propertyType}&location=${filters.location || ""}`, "href")} class="badge-primary flex items-center gap-1"> ${filters.transactionType === "sale" ? "En Venta" : "En Alquiler"} <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> </a>`, filters.propertyType !== "all" && renderTemplate`<a${addAttribute(`/buscar?transactionType=${filters.transactionType}&location=${filters.location || ""}`, "href")} class="badge-secondary flex items-center gap-1"> ${t.propertyTypes[filters.propertyType] || filters.propertyType} <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> </a>`, filters.location && renderTemplate`<a${addAttribute(`/buscar?transactionType=${filters.transactionType}&propertyType=${filters.propertyType}`, "href")} class="badge bg-gray-200 text-gray-700 flex items-center gap-1"> ${filters.location} <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> </a>`, results.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${results.map((property) => renderTemplate`${renderComponent($$result2, "PropertyCard", $$PropertyCard, { "property": property })}`)} </div>` : renderTemplate`<div class="card p-12 text-center"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "search", "class": "w-16 h-16 text-gray-300 mx-auto mb-4" })} <h2 class="text-2xl font-semibold text-gray-900 mb-2">
No encontramos propiedades
</h2> <p class="text-gray-600 mb-6 max-w-md mx-auto">
Intenta ajustar tus filtros de búsqueda o explora otras ubicaciones.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"> <a href="/comprar" class="btn-primary">
Ver todas en venta
</a> <a href="/alquilar" class="btn-outline">
Ver todas en alquiler
</a> </div> </div>`, results.length > 0 && renderTemplate`<div class="mt-12"> ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages, "baseUrl": "/buscar", "preserveParams": preserveParams })} </div>`, filters.location ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <h2>Propiedades en ${filters.location}, República Dominicana</h2> <p>
Explora nuestra selección de ${totalCount} propiedades disponibles en ${filters.location}.
              Ya sea que busques una casa familiar, un apartamento moderno, una villa de lujo o un terreno
              para construir, en PropiedadEnRD.com encontrarás opciones verificadas por asesores inmobiliarios profesionales.
</p> <p> ${filters.location} es una de las zonas más buscadas de República Dominicana,
              conocida por su ${filters.location.toLowerCase().includes("punta") ? "cercan\xEDa a las playas y atractivo tur\xEDstico" : filters.location.toLowerCase().includes("santiago") ? "desarrollo comercial y calidad de vida" : "excelente ubicaci\xF3n y conectividad"}.
              Cada listado incluye fotos, descripción detallada y contacto directo con el asesor.
</p> ` })}` : filters.propertyType !== "all" ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <h2>${pageTitle} en República Dominicana</h2> <p>
Descubre ${totalCount} ${pageTitle.toLowerCase()} disponibles en las mejores ubicaciones de República Dominicana.
              Nuestros asesores inmobiliarios verificados te ofrecen propiedades con información detallada,
              fotografías profesionales y asesoría personalizada.
</p> <p> ${filters.propertyType === "house" ? "Las casas en Rep\xFAblica Dominicana ofrecen espacios amplios, jardines y privacidad para tu familia." : filters.propertyType === "apartment" ? "Los apartamentos son ideales para quienes buscan comodidad, seguridad y amenidades modernas." : filters.propertyType === "villa" ? "Las villas de lujo combinan exclusividad, dise\xF1o arquitect\xF3nico y las mejores vistas del Caribe." : filters.propertyType === "land" ? "Los terrenos representan una excelente oportunidad de inversi\xF3n para construir tu proyecto ideal." : "Encuentra la propiedad perfecta que se adapte a tus necesidades y presupuesto."} </p> ` })}` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <h2>Buscar Propiedades en República Dominicana</h2> <p>
En PropiedadEnRD.com, asesores inmobiliarios verificados y agencias publican sus propiedades
              para que puedas encontrar exactamente lo que buscas. Actualmente tenemos ${totalCount} propiedades
              disponibles en todo el país.
</p> <p>
Usa los filtros de búsqueda para refinar los resultados por ubicación, precio, tipo de propiedad
              y características. Cada propiedad incluye información detallada, fotos de alta calidad y datos
              de contacto del asesor para que puedas comunicarte directamente y agendar una visita.
</p> ` })}`, [...firstTimeBuyerFAQs.slice(0, 2), ...financingFAQs.slice(0, 2), ...usBuyerFAQs.slice(0, 2)].map((faq) => renderTemplate`<details class="group bg-gray-50 rounded-lg"> <summary class="flex items-center justify-between p-4 cursor-pointer list-none"> <span class="font-medium text-gray-900">${faq.question}</span> <svg class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> </summary> <div class="px-4 pb-4 text-gray-600"> ${faq.answer} </div> </details>`), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": pageTitle,
    "description": description,
    "numberOfItems": totalCount,
    "itemListElement": results.slice(0, 10).map((property, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "RealEstateListing",
        "name": property.title,
        "url": `https://propiedadenrd.com/propiedad/${property.slug}`,
        "description": property.description?.substring(0, 200),
        "image": property.images[0]?.url,
        "offers": {
          "@type": "Offer",
          "price": property.price,
          "priceCurrency": property.currency,
          "availability": "https://schema.org/InStock"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": property.location.city,
          "addressRegion": property.location.sector,
          "addressCountry": "DO"
        }
      }
    }))
  })), unescapeHTML(JSON.stringify({
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
        "name": pageTitle,
        "item": `https://propiedadenrd.com/buscar${Object.keys(preserveParams).length > 0 ? "?" + new URLSearchParams(preserveParams).toString() : ""}`
      }
    ]
  })), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      ...firstTimeBuyerFAQs.slice(0, 2),
      ...financingFAQs.slice(0, 2),
      ...usBuyerFAQs.slice(0, 2)
    ].map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }))) })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/buscar.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/buscar.astro";
const $$url = "/buscar";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Buscar,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
