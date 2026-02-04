/* empty css                                 */
import { e as createAstro, f as createComponent, k as renderComponent, o as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DaFjIure.mjs';
import { $ as $$PropertyCard } from '../chunks/PropertyCard_CtVM9QFK.mjs';
import { k as getPropertyBySlug } from '../chunks/db_DCp7snH9.mjs';
import { c as transformProperty } from '../chunks/transformers_DypiJEfR.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://ubikala.com");
const prerender = false;
const $$Favoritos = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Favoritos;
  const favoritesCookie = Astro2.cookies.get("favorites")?.value;
  const favoriteSlugs = favoritesCookie ? JSON.parse(favoritesCookie) : [];
  let favoriteProperties = [];
  if (favoriteSlugs.length > 0) {
    const propertyPromises = favoriteSlugs.map(async (slug) => {
      try {
        const dbProperty = await getPropertyBySlug(slug);
        if (dbProperty) {
          return transformProperty(dbProperty);
        }
        return null;
      } catch (e) {
        console.error(`Error fetching favorite ${slug}:`, e);
        return null;
      }
    });
    const results = await Promise.all(propertyPromises);
    favoriteProperties = results.filter((p) => p !== null);
  }
  const pageTitle = "Guardados | PropiedadEnRD";
  const pageDescription = "Tus propiedades guardadas en PropiedadEnRD.";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": pageDescription }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-gray-50"> <!-- Header --> <div class="bg-white border-b"> <div class="container-custom py-8"> <div class="flex items-center gap-3 mb-2"> <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center"> <svg class="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"> <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path> </svg> </div> <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Guardados</h1> </div> <p class="text-gray-600" id="favorites-count"> ${favoriteProperties.length > 0 ? `${favoriteProperties.length} propiedad${favoriteProperties.length !== 1 ? "es" : ""} guardada${favoriteProperties.length !== 1 ? "s" : ""}` : "No tienes propiedades guardadas"} </p> </div> </div> <!-- Content --> <section class="container-custom py-8"> ${favoriteProperties.length > 0 ? renderTemplate`<div id="favorites-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> ${favoriteProperties.map((property, index) => renderTemplate`<div${addAttribute(property.slug, "data-favorite-card")} class="relative"> ${renderComponent($$result2, "PropertyCard", $$PropertyCard, { "property": property, "priority": index < 4 })} </div>`)} </div>` : renderTemplate`<div id="empty-state" class="text-center py-16"> <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"> <svg class="w-10 h-10 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"> <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path> </svg> </div> <h2 class="text-xl font-semibold text-gray-900 mb-2">No tienes propiedades guardadas</h2> <p class="text-gray-600 mb-6 max-w-md mx-auto">
Explora nuestras propiedades y guarda las que te interesen con el icono de marcador.
</p> <a href="/comprar" class="btn btn-primary">
Explorar Propiedades
</a> </div>`} <!-- Dynamic empty state (shown when all favorites are removed) --> <div id="dynamic-empty-state" class="hidden text-center py-16"> <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"> <svg class="w-10 h-10 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"> <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path> </svg> </div> <h2 class="text-xl font-semibold text-gray-900 mb-2">No tienes propiedades guardadas</h2> <p class="text-gray-600 mb-6 max-w-md mx-auto">
Explora nuestras propiedades y guarda las que te interesen con el icono de marcador.
</p> <a href="/comprar" class="btn btn-primary">
Explorar Propiedades
</a> </div> </section> <!-- Tips Section --> <section class="container-custom pb-12"> <div class="bg-primary-50 rounded-2xl p-6 md:p-8"> <h3 class="font-semibold text-gray-900 mb-4">Consejos para encontrar tu propiedad ideal</h3> <div class="grid md:grid-cols-3 gap-4"> <div class="flex gap-3"> <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0"> <span class="text-primary-600 font-semibold text-sm">1</span> </div> <p class="text-sm text-gray-600">Guarda varias opciones para compararlas fácilmente</p> </div> <div class="flex gap-3"> <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0"> <span class="text-primary-600 font-semibold text-sm">2</span> </div> <p class="text-sm text-gray-600">Contacta a los asesores directamente desde la tarjeta</p> </div> <div class="flex gap-3"> <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0"> <span class="text-primary-600 font-semibold text-sm">3</span> </div> <p class="text-sm text-gray-600">Usa los filtros de búsqueda para refinar tus opciones</p> </div> </div> </div> </section> </main> ` })} ${renderScript($$result, "D:/portal PropiedadEnRD.com/src/pages/favoritos.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/portal PropiedadEnRD.com/src/pages/favoritos.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/favoritos.astro";
const $$url = "/favoritos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Favoritos,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
