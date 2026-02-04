/* empty css                                 */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { b as getSiteConfig, $ as $$Layout, a as $$Icons } from '../chunks/Layout_DaFjIure.mjs';
export { renderers } from '../renderers.mjs';

const $$Contacto = createComponent(async ($$result, $$props, $$slots) => {
  const config = await getSiteConfig();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Contacto | ${config.company_name}`, "description": `Cont\xE1ctanos para soporte, consultas o informaci\xF3n sobre c\xF3mo publicar en ${config.company_name}. Estamos aqu\xED para ayudarte.`, "keywords": "contacto propiedadenrd, soporte inmobiliario, ayuda portal inmobiliario" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="bg-gray-100 py-4"> <div class="container-custom"> <nav class="flex text-sm text-gray-600"> <a href="/" class="hover:text-primary-600">Inicio</a> <span class="mx-2">/</span> <span class="text-gray-900 font-medium">Contacto</span> </nav> </div> </div> <section class="section"> <div class="container-custom"> <div class="max-w-5xl mx-auto"> <div class="text-center mb-12"> <h1 class="text-4xl font-bold text-gray-900 mb-4">Contáctanos</h1> <p class="text-lg text-gray-600">
¿Tienes preguntas sobre el portal? ¿Necesitas ayuda para publicar? Estamos aquí para ayudarte.
</p> </div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- Información de Contacto --> <div class="lg:col-span-1 space-y-6"> <div class="card p-6"> <div class="flex items-start gap-4"> <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "email", "class": "w-6 h-6 text-primary-600" })} </div> <div> <h3 class="font-semibold text-gray-900 mb-1">Email</h3> <a${addAttribute(`mailto:${config.email}`, "href")} class="text-primary-600 hover:underline"> ${config.email} </a> <p class="text-sm text-gray-500 mt-1">Respuesta en 24-48 horas</p> </div> </div> </div> <div class="card p-6"> <div class="flex items-start gap-4"> <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "whatsapp", "class": "w-6 h-6 text-green-600" })} </div> <div> <h3 class="font-semibold text-gray-900 mb-1">WhatsApp</h3> <a${addAttribute(`https://wa.me/${config.whatsapp}`, "href")} class="text-green-600 hover:underline"> ${config.phone_display} </a> <p class="text-sm text-gray-500 mt-1">${config.business_hours}</p> </div> </div> </div> <div class="card p-6"> <div class="flex items-start gap-4"> <div class="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "phone", "class": "w-6 h-6 text-accent-600" })} </div> <div> <h3 class="font-semibold text-gray-900 mb-1">Teléfono</h3> <a${addAttribute(`tel:${config.phone}`, "href")} class="text-gray-900 hover:text-primary-600"> ${config.phone_display} </a> <p class="text-sm text-gray-500 mt-1">${config.business_hours}</p> </div> </div> </div> <div class="card p-6"> <div class="flex items-start gap-4"> <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "location", "class": "w-6 h-6 text-purple-600" })} </div> <div> <h3 class="font-semibold text-gray-900 mb-1">Ubicación</h3> <p class="text-gray-600">${config.address_city}</p> <p class="text-sm text-gray-500">${config.address_country}</p> </div> </div> </div> </div> <!-- Formulario --> <div class="lg:col-span-2"> <div class="card p-8"> <h2 class="text-2xl font-semibold text-gray-900 mb-6">Envíanos un Mensaje</h2> <form class="space-y-6"> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div> <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
Nombre Completo *
</label> <input type="text" id="name" name="name" required class="input" placeholder="Tu nombre"> </div> <div> <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
Correo Electrónico *
</label> <input type="email" id="email" name="email" required class="input" placeholder="tu@email.com"> </div> </div> <div> <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
Teléfono
</label> <input type="tel" id="phone" name="phone" class="input" placeholder="+1 809-000-0000"> </div> <div> <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
Asunto *
</label> <select id="subject" name="subject" required class="select"> <option value="">Selecciona un asunto</option> <option value="general">Consulta General</option> <option value="publicar">Quiero Publicar Propiedades</option> <option value="soporte">Soporte Técnico</option> <option value="propiedad">Pregunta sobre una Propiedad</option> <option value="otro">Otro</option> </select> </div> <div> <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
Mensaje *
</label> <textarea id="message" name="message" rows="5" required class="input resize-none" placeholder="Escribe tu mensaje aquí..."></textarea> </div> <div class="flex items-start gap-3"> <input type="checkbox" id="privacy" name="privacy" required class="mt-1"> <label for="privacy" class="text-sm text-gray-600">
Acepto la <a href="/privacidad" class="text-primary-600 hover:underline">política de privacidad</a>
y el tratamiento de mis datos para responder a esta consulta.
</label> </div> <button type="submit" class="btn-primary w-full justify-center">
Enviar Mensaje
</button> </form> </div> </div> </div> <!-- FAQ Rápido --> <div class="mt-16"> <h2 class="text-2xl font-semibold text-gray-900 mb-8 text-center">Preguntas Frecuentes</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div class="card p-6"> <h3 class="font-semibold text-gray-900 mb-2">¿Cómo publico una propiedad?</h3> <p class="text-gray-600 text-sm">
Regístrate como asesor, independiente o propietario, y sigue los pasos para subir tu propiedad con fotos y detalles.
</p> </div> <div class="card p-6"> <h3 class="font-semibold text-gray-900 mb-2">¿Cuánto cuesta publicar?</h3> <p class="text-gray-600 text-sm">
Propietarios pueden publicar gratis sus primeras propiedades. Asesores y agencias tienen planes mensuales accesibles.
</p> </div> <div class="card p-6"> <h3 class="font-semibold text-gray-900 mb-2">¿Cómo contacto a un asesor?</h3> <p class="text-gray-600 text-sm">
Cada propiedad muestra los datos del asesor o propietario. Puedes contactarlo por WhatsApp, teléfono o formulario.
</p> </div> <div class="card p-6"> <h3 class="font-semibold text-gray-900 mb-2">¿El portal cobra comisión?</h3> <p class="text-gray-600 text-sm">
No. PropiedadEnRD.com solo cobra por publicación. Las comisiones de venta/alquiler se negocian directamente con el asesor.
</p> </div> </div> </div> </div> </div> </section> ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/contacto.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/contacto.astro";
const $$url = "/contacto";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contacto,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
