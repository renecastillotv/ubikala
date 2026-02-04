/* empty css                                    */
import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_DaFjIure.mjs';
import { $ as $$PropertyCard } from '../../chunks/PropertyCard_CtVM9QFK.mjs';
import { $ as $$SearchBox } from '../../chunks/SearchBox_DSNT-g5D.mjs';
import { g as getProperties, a as getPropertiesCount } from '../../chunks/db_DCp7snH9.mjs';
import { t as transformProperties } from '../../chunks/transformers_DypiJEfR.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://ubikala.com");
const prerender = false;
const $$type = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$type;
  const slugToDbType = {
    "casas": "casa",
    "apartamentos": "apartamento",
    "villas": "villa",
    "penthouses": "penthouse",
    "terrenos": "terreno",
    "locales-comerciales": "local",
    "oficinas": "oficina",
    "almacenes": "nave",
    "edificios": "edificio",
    "solares": "solar"
  };
  const typeNames = {
    "casas": "Casas",
    "apartamentos": "Apartamentos",
    "villas": "Villas",
    "penthouses": "Penthouses",
    "terrenos": "Terrenos",
    "locales-comerciales": "Locales Comerciales",
    "oficinas": "Oficinas",
    "almacenes": "Almacenes",
    "edificios": "Edificios",
    "solares": "Solares"
  };
  const typeDescriptions = {
    "casas": "Encuentra casas en venta en Rep\xFAblica Dominicana. Desde residencias familiares hasta propiedades de lujo en las mejores zonas del pa\xEDs.",
    "apartamentos": "Explora apartamentos en venta en Santo Domingo, Punta Cana, Santiago y m\xE1s. Modernos, con amenidades y ubicaciones privilegiadas.",
    "villas": "Descubre villas exclusivas frente al mar, en campos de golf y comunidades cerradas. El m\xE1ximo lujo en el Caribe.",
    "penthouses": "Los penthouses m\xE1s espectaculares de Rep\xFAblica Dominicana. Vistas panor\xE1micas, terrazas privadas y acabados de primera.",
    "terrenos": "Terrenos en venta para construir tu proyecto. Lotes residenciales, comerciales e industriales en ubicaciones estrat\xE9gicas.",
    "locales-comerciales": "Locales comerciales en las mejores zonas. Ideales para restaurantes, tiendas, oficinas y m\xE1s.",
    "oficinas": "Espacios de oficina en torres empresariales y edificios comerciales. Listos para tu negocio.",
    "almacenes": "Naves industriales y almacenes en zonas francas y \xE1reas industriales.",
    "edificios": "Edificios completos en venta para inversi\xF3n o desarrollo.",
    "solares": "Solares en venta para construir tu proyecto ideal."
  };
  const { type: typeSlug } = Astro2.params;
  const dbType = slugToDbType[typeSlug || ""] || typeSlug;
  const typeName = typeNames[typeSlug || ""] || typeSlug?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) || "Propiedades";
  const typeDescription = typeDescriptions[typeSlug || ""] || `Encuentra ${typeName.toLowerCase()} en venta en Rep\xFAblica Dominicana.`;
  let typeProperties = [];
  let totalCount = 0;
  try {
    const [dbProperties, count] = await Promise.all([
      getProperties({ tipo: dbType, operacion: "venta", limit: 24 }),
      getPropertiesCount({ tipo: dbType, operacion: "venta" })
    ]);
    typeProperties = transformProperties(dbProperties);
    totalCount = count;
  } catch (error) {
    console.error("Error fetching properties by type:", error);
  }
  const pageTitle = `${typeName} en Venta en Rep\xFAblica Dominicana | PropiedadEnRD.com`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": typeDescription, "keywords": `${typeName.toLowerCase()} en venta republica dominicana, comprar ${typeName.toLowerCase()} rd, ${typeName.toLowerCase()} santo domingo, ${typeName.toLowerCase()} punta cana` }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="bg-gray-100 py-4"> <div class="container-custom"> <nav class="flex text-sm text-gray-600"> <a href="/" class="hover:text-primary-600">Inicio</a> <span class="mx-2">/</span> <a href="/comprar" class="hover:text-primary-600">Comprar</a> <span class="mx-2">/</span> <span class="text-gray-900 font-medium">${typeName}</span> </nav> </div> </div>  <section class="bg-gradient-to-r from-primary-600 to-primary-700 py-12"> <div class="container-custom"> <h1 class="text-3xl md:text-4xl font-bold text-white mb-4"> ${typeName} en Venta en República Dominicana
</h1> <p class="text-primary-100 text-lg max-w-3xl"> ${typeDescription} </p> </div> </section>  <section class="py-8 bg-white shadow-sm"> <div class="container-custom"> ${renderComponent($$result2, "SearchBox", $$SearchBox, { "variant": "inline" })} </div> </section>  <section class="section"> <div class="container-custom"> <div class="flex items-center justify-between mb-8"> <p class="text-gray-600"> <span class="font-semibold text-gray-900">${totalCount}</span> ${typeName.toLowerCase()} encontradas
</p> <select class="select py-2 text-sm w-auto"> <option value="recent">Más recientes</option> <option value="price-asc">Precio: menor a mayor</option> <option value="price-desc">Precio: mayor a menor</option> </select> </div> ${typeProperties.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${typeProperties.map((property) => renderTemplate`${renderComponent($$result2, "PropertyCard", $$PropertyCard, { "property": property })}`)} </div>` : renderTemplate`<div class="card p-12 text-center"> <p class="text-gray-600 mb-4">No hay ${typeName.toLowerCase()} disponibles en este momento.</p> <a href="/comprar" class="btn-primary">Ver todas las propiedades</a> </div>`} </div> </section>  <section class="py-12 bg-gray-50"> <div class="container-custom"> <div class="prose prose-lg max-w-4xl mx-auto"> <h2>Comprar ${typeName} en República Dominicana</h2> <p> ${typeDescription} En PropiedadEnRD.com, asesores inmobiliarios y propietarios publican
${typeName.toLowerCase()} en todo el país. Contacta directamente al publicador para
          obtener más información y agendar visitas.
</p> <h3>Zonas Populares para ${typeName}</h3> <ul> <li><strong>Santo Domingo:</strong> Piantini, Naco, Bella Vista, Arroyo Hondo, Ensanche Paraíso</li> <li><strong>Punta Cana:</strong> Cap Cana, Bávaro, Cocotal, Punta Cana Village</li> <li><strong>Santiago:</strong> Cerros de Gurabo, Jardines Metropolitanos, Los Jardines</li> <li><strong>Puerto Plata:</strong> Sosúa, Cabarete, Costámbar</li> </ul> </div> </div> </section> ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/comprar/[type].astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/comprar/[type].astro";
const $$url = "/comprar/[type]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$type,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
