/* empty css                                    */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from '../../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { b as getSiteConfig, $ as $$Layout } from '../../chunks/Layout_DaFjIure.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$ImpuestosInmobiliarios = createComponent(async ($$result, $$props, $$slots) => {
  const config = await getSiteConfig();
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Impuestos Inmobiliarios en Republica Dominicana",
    "description": "Guia completa sobre impuestos inmobiliarios en Republica Dominicana: IPI, transferencia, plusvalia y mas.",
    "image": `${config.site_url}/images/guias/impuestos.jpg`,
    "author": { "@type": "Organization", "name": config.company_name, "url": config.site_url },
    "publisher": { "@type": "Organization", "name": config.company_name, "logo": { "@type": "ImageObject", "url": `${config.site_url}${config.logo_url}` } },
    "datePublished": "2024-01-15",
    "dateModified": (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${config.site_url}/guias/impuestos-inmobiliarios` }
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "\xBFCuanto es el impuesto de transferencia inmobiliaria en RD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El impuesto de transferencia inmobiliaria es del 3% del valor de venta o tasacion oficial (el mayor). Se paga una sola vez al momento de la compra y es responsabilidad del comprador."
        }
      },
      {
        "@type": "Question",
        "name": "\xBFQue es el IPI y cuanto se paga?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El IPI (Impuesto al Patrimonio Inmobiliario) es un impuesto anual del 1% sobre el valor de las propiedades que exceda el monto exento (RD$9,860,649 en 2024). Se paga en dos cuotas: 11 de marzo y 11 de septiembre."
        }
      },
      {
        "@type": "Question",
        "name": "\xBFHay exenciones del impuesto de transferencia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Si, las propiedades adquiridas mediante fideicomiso bajo la Ley 189-11 pueden estar exentas del 3%. Tambien hay exenciones para primera vivienda de bajo costo y transferencias por herencia."
        }
      },
      {
        "@type": "Question",
        "name": "\xBFLos extranjeros pagan los mismos impuestos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Si, los extranjeros pagan exactamente los mismos impuestos que los dominicanos: 3% de transferencia al comprar, IPI anual si aplica, y 27% sobre ganancia de capital al vender (si aplica)."
        }
      }
    ]
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": config.site_url },
      { "@type": "ListItem", "position": 2, "name": "Guias", "item": `${config.site_url}/guias` },
      { "@type": "ListItem", "position": 3, "name": "Impuestos Inmobiliarios", "item": `${config.site_url}/guias/impuestos-inmobiliarios` }
    ]
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Impuestos Inmobiliarios en RD | ${config.company_name}`, "description": "Guia completa sobre impuestos inmobiliarios en Republica Dominicana: IPI, transferencia, plusvalia y mas.", "keywords": "impuestos inmobiliarios rd, ipi republica dominicana, impuesto transferencia 3%, impuesto propiedad rd" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', '<\/script> <script type="application/ld+json">', '<\/script> <script type="application/ld+json">', "<\/script>  ", '<div class="bg-gray-100 py-4"> <div class="container-custom"> <nav class="flex text-sm text-gray-600"> <a href="/" class="hover:text-primary-600">Inicio</a> <span class="mx-2">/</span> <a href="/guias" class="hover:text-primary-600">Guias</a> <span class="mx-2">/</span> <span class="text-gray-900 font-medium">Impuestos Inmobiliarios</span> </nav> </div> </div>  <section class="bg-gradient-to-r from-primary-600 to-primary-700 py-12"> <div class="container-custom"> <span class="inline-block px-3 py-1 bg-white/20 rounded-full text-white text-sm mb-4">Legal</span> <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">\nImpuestos Inmobiliarios en Republica Dominicana\n</h1> <p class="text-primary-100 text-lg max-w-3xl">\nTodo lo que necesitas saber sobre los impuestos al comprar, poseer y vender propiedades en RD.\n</p> </div> </section>  <article class="section"> <div class="container-custom"> <div class="max-w-4xl mx-auto"> <!-- Impuesto de Transferencia --> <section class="mb-12"> <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3"> <span class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center"> <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </span>\nImpuesto de Transferencia Inmobiliaria\n</h2> <div class="bg-white border rounded-lg p-6 mb-6"> <div class="grid md:grid-cols-2 gap-6"> <div> <h3 class="font-semibold text-gray-900 mb-2">Tasa</h3> <p class="text-3xl font-bold text-primary-600">3%</p> <p class="text-gray-600 text-sm mt-1">del valor de venta o tasacion (el mayor)</p> </div> <div> <h3 class="font-semibold text-gray-900 mb-2">Quien Paga</h3> <p class="text-gray-700">El comprador (generalmente)</p> <p class="text-gray-600 text-sm mt-1">Puede negociarse en el contrato</p> </div> </div> </div> <h3 class="text-lg font-semibold text-gray-900 mb-3">Caracteristicas:</h3> <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6"> <li>Se paga una sola vez al momento de la transferencia</li> <li>Debe pagarse antes de registrar la propiedad</li> <li>Se calcula sobre el valor mayor entre el precio de venta y la tasacion oficial</li> <li>El pago se realiza en la DGII (Direccion General de Impuestos Internos)</li> </ul> <div class="bg-green-50 border-l-4 border-green-500 p-4"> <h4 class="font-semibold text-green-800 mb-2">Exenciones</h4> <ul class="text-green-700 text-sm space-y-1"> <li>\u2022 Propiedades adquiridas mediante fideicomiso (Ley 189-11)</li> <li>\u2022 Primera vivienda de bajo costo (programas especiales)</li> <li>\u2022 Transferencias por herencia (tienen regimen especial)</li> </ul> </div> </section> <!-- IPI --> <section class="mb-12"> <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3"> <span class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center"> <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path> </svg> </span>\nIPI - Impuesto al Patrimonio Inmobiliario\n</h2> <div class="bg-white border rounded-lg p-6 mb-6"> <div class="grid md:grid-cols-2 gap-6"> <div> <h3 class="font-semibold text-gray-900 mb-2">Tasa Anual</h3> <p class="text-3xl font-bold text-primary-600">1%</p> <p class="text-gray-600 text-sm mt-1">del valor que exceda el monto exento</p> </div> <div> <h3 class="font-semibold text-gray-900 mb-2">Monto Exento (2024)</h3> <p class="text-2xl font-bold text-gray-700">RD$9,860,649</p> <p class="text-gray-600 text-sm mt-1">Ajustado anualmente por inflacion</p> </div> </div> </div> <h3 class="text-lg font-semibold text-gray-900 mb-3">\xBFComo Funciona?</h3> <p class="text-gray-700 mb-4">\nEl IPI es un impuesto anual que se aplica al patrimonio inmobiliario total de una persona. Se calcula sumando el valor de todas las propiedades a nombre del contribuyente.\n</p> <div class="bg-gray-50 rounded-lg p-6 mb-6"> <h4 class="font-semibold text-gray-900 mb-3">Ejemplo de Calculo:</h4> <table class="w-full text-sm"> <tbody> <tr> <td class="py-2">Valor total de propiedades:</td> <td class="py-2 text-right font-semibold">RD$15,000,000</td> </tr> <tr> <td class="py-2">Menos: Monto exento:</td> <td class="py-2 text-right font-semibold">- RD$9,860,649</td> </tr> <tr class="border-t"> <td class="py-2">Base imponible:</td> <td class="py-2 text-right font-semibold">RD$5,139,351</td> </tr> <tr class="border-t bg-primary-50"> <td class="py-2 font-semibold">IPI a pagar (1%):</td> <td class="py-2 text-right font-bold text-primary-600">RD$51,394</td> </tr> </tbody> </table> </div> <h3 class="text-lg font-semibold text-gray-900 mb-3">Fechas de Pago:</h3> <div class="grid md:grid-cols-2 gap-4 mb-6"> <div class="bg-white border rounded-lg p-4"> <p class="font-semibold text-gray-900">Primera Cuota</p> <p class="text-gray-600 text-sm">11 de marzo</p> </div> <div class="bg-white border rounded-lg p-4"> <p class="font-semibold text-gray-900">Segunda Cuota</p> <p class="text-gray-600 text-sm">11 de septiembre</p> </div> </div> <div class="bg-primary-50 border-l-4 border-primary-500 p-4"> <h4 class="font-semibold text-primary-800 mb-2">Exentos del IPI</h4> <ul class="text-primary-700 text-sm space-y-1"> <li>\u2022 Vivienda principal con valor menor al monto exento</li> <li>\u2022 Propiedades de uso agricola</li> <li>\u2022 Terrenos de desarrollo de viviendas de bajo costo</li> <li>\u2022 Propiedades de zonas francas</li> </ul> </div> </section> <!-- Ganancia de Capital --> <section class="mb-12"> <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3"> <span class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"> <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path> </svg> </span>\nImpuesto sobre Ganancia de Capital\n</h2> <div class="bg-white border rounded-lg p-6 mb-6"> <div class="grid md:grid-cols-2 gap-6"> <div> <h3 class="font-semibold text-gray-900 mb-2">Tasa</h3> <p class="text-3xl font-bold text-primary-600">27%</p> <p class="text-gray-600 text-sm mt-1">sobre la ganancia obtenida</p> </div> <div> <h3 class="font-semibold text-gray-900 mb-2">Quien Paga</h3> <p class="text-gray-700">El vendedor</p> <p class="text-gray-600 text-sm mt-1">Aplica a personas juridicas y algunos casos de personas fisicas</p> </div> </div> </div> <h3 class="text-lg font-semibold text-gray-900 mb-3">\xBFCuando Aplica?</h3> <ul class="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-6"> <li>Venta de propiedades por empresas o sociedades</li> <li>Venta de propiedades que no son vivienda principal</li> <li>Venta de propiedades dentro de los primeros 5 anos (actividad habitual)</li> </ul> <div class="bg-green-50 border-l-4 border-green-500 p-4"> <h4 class="font-semibold text-green-800 mb-2">Exencion para Personas Fisicas</h4> <p class="text-green-700 text-sm">\nLa venta de la vivienda principal por una persona fisica generalmente esta exenta del impuesto sobre ganancia de capital, siempre que no sea una actividad habitual.\n</p> </div> </section> <!-- Otros Impuestos --> <section class="mb-12"> <h2 class="text-2xl font-bold text-gray-900 mb-6">Otros Costos e Impuestos</h2> <div class="space-y-4"> <div class="bg-white border rounded-lg p-5"> <h3 class="font-semibold text-gray-900 mb-2">Impuestos Municipales</h3> <p class="text-gray-600 text-sm">Algunos ayuntamientos cobran arbitrios por servicios de recogida de basura, ornato publico, etc. Varian segun el municipio.</p> </div> <div class="bg-white border rounded-lg p-5"> <h3 class="font-semibold text-gray-900 mb-2">Gastos de Registro</h3> <p class="text-gray-600 text-sm">Tasas del Registro de Titulos para procesar la transferencia. El monto varia segun la jurisdiccion.</p> </div> <div class="bg-white border rounded-lg p-5"> <h3 class="font-semibold text-gray-900 mb-2">Gastos Notariales</h3> <p class="text-gray-600 text-sm">Honorarios del notario por la legalizacion de firmas y preparacion del acto de venta.</p> </div> <div class="bg-white border rounded-lg p-5"> <h3 class="font-semibold text-gray-900 mb-2">Honorarios Legales</h3> <p class="text-gray-600 text-sm">Generalmente entre 1% y 2% del valor de la propiedad para el abogado que realiza el proceso.</p> </div> </div> </section> <!-- Resumen --> <section class="mb-12"> <h2 class="text-2xl font-bold text-gray-900 mb-6">Resumen de Costos al Comprar</h2> <div class="overflow-x-auto"> <table class="w-full text-left border-collapse"> <thead> <tr class="bg-gray-100"> <th class="border p-3 font-semibold">Concepto</th> <th class="border p-3 font-semibold">Porcentaje/Monto</th> <th class="border p-3 font-semibold">Momento</th> </tr> </thead> <tbody> <tr> <td class="border p-3">Impuesto de Transferencia</td> <td class="border p-3">3%</td> <td class="border p-3">Al comprar</td> </tr> <tr class="bg-gray-50"> <td class="border p-3">Gastos Legales y Notariales</td> <td class="border p-3">1% - 2%</td> <td class="border p-3">Al comprar</td> </tr> <tr> <td class="border p-3">Registro de Titulos</td> <td class="border p-3">Variable</td> <td class="border p-3">Al comprar</td> </tr> <tr class="bg-gray-50"> <td class="border p-3">IPI (si aplica)</td> <td class="border p-3">1% anual</td> <td class="border p-3">Cada ano</td> </tr> </tbody> </table> </div> <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6"> <p class="text-yellow-800"> <strong>Consejo:</strong> Presupuesta entre un 5% y 8% adicional sobre el precio de compra para cubrir todos los gastos e impuestos.\n</p> </div> </section> <!-- CTA --> <div class="bg-gray-50 rounded-lg p-8 text-center"> <h3 class="text-xl font-bold text-gray-900 mb-4">\xBFTienes Dudas sobre Impuestos?</h3> <p class="text-gray-600 mb-6">Consulta con un asesor inmobiliario o contador especializado para tu caso especifico.</p> <a href="/asesores" class="btn-primary">Contactar un Asesor</a> </div> </div> </div> </article>  <section class="py-12 bg-gray-50"> <div class="container-custom"> <h2 class="text-2xl font-bold text-gray-900 mb-6">Guias Relacionadas</h2> <div class="grid md:grid-cols-3 gap-6"> <a href="/guias/fideicomiso-inmobiliario" class="card p-6 hover:shadow-lg transition-shadow"> <h3 class="font-semibold text-gray-900 mb-2">Fideicomiso Inmobiliario</h3> <p class="text-sm text-gray-600">Beneficios fiscales del fideicomiso.</p> </a> <a href="/guias/proceso-compra-propiedad" class="card p-6 hover:shadow-lg transition-shadow"> <h3 class="font-semibold text-gray-900 mb-2">Proceso de Compra</h3> <p class="text-sm text-gray-600">Guia paso a paso para comprar.</p> </a> <a href="/guias/invertir-punta-cana" class="card p-6 hover:shadow-lg transition-shadow"> <h3 class="font-semibold text-gray-900 mb-2">Invertir en Punta Cana</h3> <p class="text-sm text-gray-600">Guia de inversion inmobiliaria.</p> </a> </div> </div> </section> '])), unescapeHTML(JSON.stringify(articleSchema)), unescapeHTML(JSON.stringify(faqSchema)), unescapeHTML(JSON.stringify(breadcrumbSchema)), maybeRenderHead()) })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/guias/impuestos-inmobiliarios.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/guias/impuestos-inmobiliarios.astro";
const $$url = "/guias/impuestos-inmobiliarios";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ImpuestosInmobiliarios,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
