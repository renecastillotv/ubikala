/* empty css                                 */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DaFjIure.mjs';
import { o as getPopularLocationsWithStats } from '../chunks/db_DCp7snH9.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let locations = [];
  try {
    locations = await getPopularLocationsWithStats();
  } catch (error) {
    console.error("Error fetching locations:", error);
  }
  const defaultImage = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800";
  const pageTitle = "Propiedades por Ubicaci\xF3n | PropiedadEnRD.com";
  const pageDescription = "Explora propiedades en venta y alquiler en las principales ciudades y zonas de Rep\xFAblica Dominicana. Punta Cana, Santo Domingo, Santiago y m\xE1s.";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": pageDescription, "keywords": "propiedades republica dominicana, inmuebles por ubicacion, casas santo domingo, apartamentos punta cana, propiedades santiago" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="bg-gray-100 py-4"> <div class="container-custom"> <nav class="flex text-sm text-gray-600"> <a href="/" class="hover:text-primary-600">Inicio</a> <span class="mx-2">/</span> <span class="text-gray-900 font-medium">Propiedades por Ubicación</span> </nav> </div> </div>  <section class="bg-gradient-to-r from-primary-600 to-primary-700 py-12"> <div class="container-custom"> <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
Propiedades por Ubicación
</h1> <p class="text-primary-100 text-lg max-w-3xl">
Explora las principales ciudades y zonas de República Dominicana donde tenemos propiedades disponibles para ti.
</p> </div> </section>  <section class="section"> <div class="container-custom"> <div class="flex items-center justify-between mb-8"> <p class="text-gray-600"> <span class="font-semibold text-gray-900">${locations.length}</span> ubicaciones disponibles
</p> </div> ${locations.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${locations.map((location) => renderTemplate`<a${addAttribute(`/propiedades/${location.slug}`, "href")} class="group relative overflow-hidden rounded-2xl h-[250px]"> <img${addAttribute(location.sampleImage || defaultImage, "src")}${addAttribute(`Propiedades en ${location.name}`, "alt")} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy"> <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div> <div class="absolute bottom-0 left-0 right-0 p-6"> <h3 class="text-white font-bold text-xl mb-1"> ${location.name} </h3> <p class="text-gray-200 text-sm mb-3"> ${location.province} </p> <span class="inline-flex items-center gap-2 text-white text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path> </svg> ${location.propertyCount} ${location.propertyCount === 1 ? "propiedad" : "propiedades"} </span> </div> </a>`)} </div>` : renderTemplate`<div class="card p-12 text-center"> <p class="text-gray-600">No hay ubicaciones disponibles.</p> </div>`} </div> </section>  <section class="py-12 bg-gray-50"> <div class="container-custom"> <div class="prose prose-lg max-w-4xl mx-auto"> <h2>Encuentra Propiedades en Todo el País</h2> <p>
República Dominicana ofrece una amplia variedad de ubicaciones para invertir en bienes raíces.
          Desde las playas paradisíacas de Punta Cana hasta la vibrante capital Santo Domingo,
          cada zona tiene características únicas que se adaptan a diferentes estilos de vida y objetivos de inversión.
</p> <h3>Destinos Más Populares</h3> <ul> <li><strong>Punta Cana:</strong> El destino turístico #1 del Caribe con excelente retorno de inversión.</li> <li><strong>Santo Domingo:</strong> La capital con opciones para todos los presupuestos.</li> <li><strong>Santiago:</strong> La segunda ciudad más grande con precios accesibles.</li> <li><strong>Las Terrenas:</strong> Paraíso bohemio con propiedades frente al mar.</li> <li><strong>Puerto Plata:</strong> Costa norte con playas espectaculares y golf.</li> </ul> </div> </div> </section> ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/propiedades/index.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/propiedades/index.astro";
const $$url = "/propiedades";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
