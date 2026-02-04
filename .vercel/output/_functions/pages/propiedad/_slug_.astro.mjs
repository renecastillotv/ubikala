/* empty css                                    */
import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, m as maybeRenderHead, k as renderComponent, u as unescapeHTML } from '../../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Icons, u as useTranslations } from '../../chunks/Layout_DaFjIure.mjs';
import { $ as $$PropertyCard } from '../../chunks/PropertyCard_CtVM9QFK.mjs';
import 'clsx';
/* empty css                                     */
import { k as getPropertyBySlug, b as getAgentBySlug, g as getProperties } from '../../chunks/db_DCp7snH9.mjs';
import { c as transformProperty, a as transformAgent, t as transformProperties } from '../../chunks/transformers_DypiJEfR.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$Astro$2 = createAstro("https://ubikala.com");
const $$ContactForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ContactForm;
  const { propertySlug, propertyTitle, agentName, agentWhatsapp, agentCompany } = Astro2.props;
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", '<div class="card p-6" id="contact-form-card"> <h3 class="text-lg font-semibold text-gray-900 mb-4">Solicitar m\xE1s informaci\xF3n</h3> <form id="contact-form" class="space-y-4"> <input type="hidden" name="property_slug"', '> <input type="hidden" name="property_title"', '> <input type="hidden" name="agent_name"', '> <input type="hidden" name="agent_company"', '> <input type="hidden" name="source" value="propiedadenrd"> <div> <label for="contact-name" class="block text-sm font-medium text-gray-700 mb-1">\nNombre completo *\n</label> <input type="text" id="contact-name" name="name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Tu nombre"> </div> <div> <label for="contact-phone" class="block text-sm font-medium text-gray-700 mb-1">\nTel\xE9fono / WhatsApp *\n</label> <input type="tel" id="contact-phone" name="phone" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="809-555-1234"> </div> <div> <label for="contact-email" class="block text-sm font-medium text-gray-700 mb-1">\nCorreo electr\xF3nico\n</label> <input type="email" id="contact-email" name="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="tu@email.com"> </div> <div> <label for="contact-message" class="block text-sm font-medium text-gray-700 mb-1">\nMensaje\n</label> <textarea id="contact-message" name="message" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none" placeholder="Me interesa esta propiedad. \xBFPodemos coordinar una visita?"></textarea> </div> <button type="submit" class="w-full btn-primary justify-center" id="submit-btn"> <span id="submit-text">Enviar solicitud</span> <span id="submit-loading" class="hidden"> <svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg>\nEnviando...\n</span> </button> </form> <!-- Success message --> <div id="form-success" class="hidden text-center py-8"> <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"> <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> </div> <h4 class="text-lg font-semibold text-gray-900 mb-2">\xA1Solicitud enviada!</h4> <p class="text-gray-600 mb-4">\nEl asesor <strong>', "</strong> te contactar\xE1 pronto.\n</p> ", ` </div> <!-- Error message --> <div id="form-error" class="hidden mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"> <p class="text-red-700 text-sm">
Hubo un error al enviar tu solicitud. Por favor intenta de nuevo o cont\xE1ctanos directamente por WhatsApp.
</p> </div> </div> <script>
  document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contact-form');
    var submitBtn = document.getElementById('submit-btn');
    var submitText = document.getElementById('submit-text');
    var submitLoading = document.getElementById('submit-loading');
    var formSuccess = document.getElementById('form-success');
    var formError = document.getElementById('form-error');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Show loading state
      if (submitText) submitText.classList.add('hidden');
      if (submitLoading) submitLoading.classList.remove('hidden');
      if (submitBtn) submitBtn.setAttribute('disabled', 'true');
      if (formError) formError.classList.add('hidden');

      var formData = new FormData(form);
      var data = {
        property_slug: formData.get('property_slug'),
        property_title: formData.get('property_title'),
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email') || null,
        message: formData.get('message') || 'Interesado en: ' + formData.get('property_title'),
        source: 'propiedadenrd',
        session_id: sessionStorage.getItem('session_id') || Date.now() + '-' + Math.random().toString(36).substr(2, 9),
        agent_name: formData.get('agent_name'),
        agent_company: formData.get('agent_company')
      };

      var apiBase = 'http://5.161.98.140:3002';

      try {
        var response = await fetch(apiBase + '/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          // Track the lead event
          if (typeof window.trackEvent === 'function') {
            window.trackEvent('lead_submitted', {
              slug: data.property_slug,
              agent: data.agent_name,
              source: 'propiedadenrd'
            });
          }

          // Show success
          form.classList.add('hidden');
          if (formSuccess) formSuccess.classList.remove('hidden');
        } else {
          throw new Error('Failed to submit');
        }
      } catch (error) {
        console.error('Error submitting lead:', error);
        if (formError) formError.classList.remove('hidden');
      } finally {
        // Reset button state
        if (submitText) submitText.classList.remove('hidden');
        if (submitLoading) submitLoading.classList.add('hidden');
        if (submitBtn) submitBtn.removeAttribute('disabled');
      }
    });
  });
<\/script>`])), maybeRenderHead(), addAttribute(propertySlug, "value"), addAttribute(propertyTitle, "value"), addAttribute(agentName, "value"), addAttribute(agentCompany || "", "value"), agentName, agentWhatsapp && renderTemplate`<a${addAttribute(`https://wa.me/${agentWhatsapp}?text=Hola, envi\xE9 una solicitud sobre: ${propertyTitle}`, "href")} target="_blank" class="btn bg-green-600 text-white hover:bg-green-700 inline-flex items-center"> <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path> </svg>
Contactar por WhatsApp
</a>`);
}, "D:/portal PropiedadEnRD.com/src/components/ContactForm.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$1 = createAstro("https://ubikala.com");
const $$PropertyMap = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PropertyMap;
  const { latitude, longitude, title, address, zoom = 15, isApproximate = false } = Astro2.props;
  const hasValidCoords = latitude && longitude && latitude !== 0 && longitude !== 0;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", `<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""><script>
  document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.getElementById('property-map');
    if (!mapContainer) return;

    const lat = parseFloat(mapContainer.dataset.lat);
    const lng = parseFloat(mapContainer.dataset.lng);
    const zoom = parseInt(mapContainer.dataset.zoom) || 15;
    const title = mapContainer.dataset.title;
    const address = mapContainer.dataset.address || '';

    if (isNaN(lat) || isNaN(lng) || lat === 0 || lng === 0) return;

    // Load Leaflet dynamically
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.onload = function() {
      // Create the map
      const map = L.map('property-map', {
        scrollWheelZoom: false,
        dragging: !L.Browser.mobile
      }).setView([lat, lng], zoom);

      // Add tile layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      // Custom marker icon
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="marker-pin"><svg viewBox="0 0 24 24" fill="#0066CC" width="32" height="32"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      // Add marker
      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      // Add popup with property info
      const popupContent = '<div class="p-2"><strong>' + title + '</strong>' + (address ? '<br><span class="text-gray-600 text-sm">' + address + '</span>' : '') + '</div>';
      marker.bindPopup(popupContent);

      // Open popup on load
      marker.openPopup();

      // Enable scroll zoom on click
      map.on('click', function() {
        map.scrollWheelZoom.enable();
      });
    };
    document.head.appendChild(script);
  });
<\/script>`])), hasValidCoords ? renderTemplate`${maybeRenderHead()}<div class="property-map-container relative">${isApproximate && renderTemplate`<div class="absolute top-3 left-3 z-10 bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
Ubicacion aproximada
</div>`}<div id="property-map" class="w-full h-64 md:h-80 rounded-xl overflow-hidden z-0"${addAttribute(latitude, "data-lat")}${addAttribute(longitude, "data-lng")}${addAttribute(zoom, "data-zoom")}${addAttribute(title, "data-title")}${addAttribute(address, "data-address")}></div></div>` : renderTemplate`<div class="bg-gray-100 rounded-xl h-64 flex items-center justify-center"><div class="text-center text-gray-500"><svg class="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><p>Ubicacion no disponible</p></div></div>`);
}, "D:/portal PropiedadEnRD.com/src/components/PropertyMap.astro", void 0);

const provinces = {
  "distrito nacional": { lat: 18.4861, lng: -69.9312, zoom: 12 },
  "santo domingo": { lat: 18.4801, lng: -69.8923, zoom: 11 },
  "santiago": { lat: 19.4517, lng: -70.697, zoom: 12 },
  "la altagracia": { lat: 18.6167, lng: -68.7, zoom: 10 },
  "puerto plata": { lat: 19.7934, lng: -70.6884, zoom: 11 },
  "la romana": { lat: 18.4273, lng: -68.9728, zoom: 12 },
  "san pedro de macoris": { lat: 18.4539, lng: -69.3086, zoom: 12 },
  "la vega": { lat: 19.222, lng: -70.5296, zoom: 12 },
  "samana": { lat: 19.2056, lng: -69.3364, zoom: 11 },
  "espaillat": { lat: 19.6333, lng: -70.2667, zoom: 11 },
  "duarte": { lat: 19.3833, lng: -70.0333, zoom: 11 },
  "monte plata": { lat: 18.8167, lng: -69.7833, zoom: 11 },
  "san cristobal": { lat: 18.4167, lng: -70.1, zoom: 11 },
  "peravia": { lat: 18.2833, lng: -70.3333, zoom: 11 },
  "azua": { lat: 18.4533, lng: -70.7289, zoom: 11 },
  "barahona": { lat: 18.2, lng: -71.1, zoom: 11 },
  "monsenor nouel": { lat: 18.8167, lng: -70.4, zoom: 11 },
  "maria trinidad sanchez": { lat: 19.3833, lng: -69.85, zoom: 11 },
  "hato mayor": { lat: 18.7667, lng: -69.25, zoom: 11 },
  "el seibo": { lat: 18.7667, lng: -69.0333, zoom: 11 },
  "monte cristi": { lat: 19.85, lng: -71.65, zoom: 11 },
  "valverde": { lat: 19.5833, lng: -70.9833, zoom: 11 },
  "sanchez ramirez": { lat: 19.05, lng: -70.15, zoom: 11 },
  "hermanas mirabal": { lat: 19.3833, lng: -70.3667, zoom: 11 }
};
const cities = {
  // Distrito Nacional y Gran Santo Domingo
  "santo domingo": { lat: 18.4861, lng: -69.9312, zoom: 13 },
  "santo domingo este": { lat: 18.4879, lng: -69.8568, zoom: 13 },
  "santo domingo norte": { lat: 18.55, lng: -69.9167, zoom: 13 },
  "santo domingo oeste": { lat: 18.5, lng: -70, zoom: 13 },
  "los alcarrizos": { lat: 18.5167, lng: -70.0167, zoom: 13 },
  "boca chica": { lat: 18.45, lng: -69.6167, zoom: 14 },
  // Santiago
  "santiago de los caballeros": { lat: 19.4517, lng: -70.697, zoom: 13 },
  "santiago": { lat: 19.4517, lng: -70.697, zoom: 13 },
  // Punta Cana / La Altagracia
  "punta cana": { lat: 18.5601, lng: -68.3725, zoom: 13 },
  "bavaro": { lat: 18.6896, lng: -68.4545, zoom: 14 },
  "higuey": { lat: 18.6167, lng: -68.7, zoom: 13 },
  "cap cana": { lat: 18.4667, lng: -68.4, zoom: 14 },
  "uvero alto": { lat: 18.75, lng: -68.55, zoom: 14 },
  // Puerto Plata
  "puerto plata": { lat: 19.7934, lng: -70.6884, zoom: 13 },
  "sosua": { lat: 19.75, lng: -70.5167, zoom: 14 },
  "cabarete": { lat: 19.75, lng: -70.4167, zoom: 14 },
  // Samaná
  "samana": { lat: 19.2056, lng: -69.3364, zoom: 14 },
  "las terrenas": { lat: 19.3167, lng: -69.5333, zoom: 14 },
  "las galeras": { lat: 19.2833, lng: -69.25, zoom: 14 },
  // La Romana
  "la romana": { lat: 18.4273, lng: -68.9728, zoom: 13 },
  "casa de campo": { lat: 18.4167, lng: -68.9333, zoom: 14 },
  "bayahibe": { lat: 18.3667, lng: -68.8333, zoom: 14 },
  // San Pedro de Macorís
  "san pedro de macoris": { lat: 18.4539, lng: -69.3086, zoom: 13 },
  "juan dolio": { lat: 18.4333, lng: -69.4333, zoom: 14 },
  "guayacanes": { lat: 18.45, lng: -69.4833, zoom: 14 },
  // La Vega
  "la vega": { lat: 19.222, lng: -70.5296, zoom: 13 },
  "jarabacoa": { lat: 19.1167, lng: -70.6333, zoom: 14 },
  "constanza": { lat: 18.9167, lng: -70.75, zoom: 14 },
  // Otras ciudades importantes
  "san francisco de macoris": { lat: 19.3, lng: -70.25, zoom: 13 },
  "moca": { lat: 19.3833, lng: -70.5167, zoom: 13 },
  "bonao": { lat: 18.9333, lng: -70.4, zoom: 13 },
  "nagua": { lat: 19.3833, lng: -69.85, zoom: 13 },
  "san cristobal": { lat: 18.4167, lng: -70.1, zoom: 13 },
  "bani": { lat: 18.2833, lng: -70.3333, zoom: 13 },
  "azua": { lat: 18.4533, lng: -70.7289, zoom: 13 },
  "barahona": { lat: 18.2, lng: -71.1, zoom: 13 },
  "hato mayor": { lat: 18.7667, lng: -69.25, zoom: 13 },
  "el seibo": { lat: 18.7667, lng: -69.0333, zoom: 13 },
  "cotui": { lat: 19.05, lng: -70.15, zoom: 13 },
  "salcedo": { lat: 19.3833, lng: -70.4167, zoom: 13 }
};
const sectors = {
  // Santo Domingo - Distrito Nacional
  "piantini": { lat: 18.47, lng: -69.935, zoom: 16 },
  "naco": { lat: 18.465, lng: -69.928, zoom: 16 },
  "evaristo morales": { lat: 18.475, lng: -69.92, zoom: 16 },
  "serralles": { lat: 18.46, lng: -69.94, zoom: 16 },
  "bella vista": { lat: 18.455, lng: -69.93, zoom: 16 },
  "gazcue": { lat: 18.465, lng: -69.91, zoom: 16 },
  "zona colonial": { lat: 18.4722, lng: -69.885, zoom: 16 },
  "ciudad colonial": { lat: 18.4722, lng: -69.885, zoom: 16 },
  "la esperilla": { lat: 18.47, lng: -69.925, zoom: 16 },
  "paraiso": { lat: 18.46, lng: -69.945, zoom: 16 },
  "el vergel": { lat: 18.46, lng: -69.95, zoom: 16 },
  "los cacicazgos": { lat: 18.465, lng: -69.95, zoom: 16 },
  "mirador norte": { lat: 18.49, lng: -69.945, zoom: 16 },
  "mirador sur": { lat: 18.455, lng: -69.96, zoom: 16 },
  "arroyo hondo": { lat: 18.495, lng: -69.96, zoom: 16 },
  "viejo arroyo hondo": { lat: 18.495, lng: -69.955, zoom: 16 },
  "arroyo hondo viejo": { lat: 18.495, lng: -69.955, zoom: 16 },
  "los prados": { lat: 18.475, lng: -69.94, zoom: 16 },
  "julieta morales": { lat: 18.48, lng: -69.92, zoom: 16 },
  "renacimiento": { lat: 18.48, lng: -69.93, zoom: 16 },
  "la julia": { lat: 18.465, lng: -69.935, zoom: 16 },
  "ensanche naco": { lat: 18.465, lng: -69.928, zoom: 16 },
  "ensanche piantini": { lat: 18.47, lng: -69.935, zoom: 16 },
  "miraflores": { lat: 18.45, lng: -69.92, zoom: 16 },
  "san geronimo": { lat: 18.46, lng: -69.915, zoom: 16 },
  "los restauradores": { lat: 18.475, lng: -69.91, zoom: 16 },
  "ensanche ozama": { lat: 18.48, lng: -69.87, zoom: 16 },
  "villa consuelo": { lat: 18.49, lng: -69.885, zoom: 16 },
  "los mina": { lat: 18.485, lng: -69.855, zoom: 16 },
  "alma rosa": { lat: 18.5, lng: -69.84, zoom: 16 },
  "los tres ojos": { lat: 18.47, lng: -69.86, zoom: 16 },
  // Santiago sectores
  "cerros de gurabo": { lat: 19.46, lng: -70.68, zoom: 16 },
  "los jardines": { lat: 19.445, lng: -70.685, zoom: 16 },
  "jardines metropolitanos": { lat: 19.455, lng: -70.69, zoom: 16 },
  "reparto del este": { lat: 19.44, lng: -70.675, zoom: 16 },
  "los cerros de gurabo": { lat: 19.46, lng: -70.68, zoom: 16 },
  "la trinitaria": { lat: 19.45, lng: -70.7, zoom: 16 },
  "bella terra": { lat: 19.43, lng: -70.665, zoom: 16 },
  "pontezuela": { lat: 19.475, lng: -70.685, zoom: 16 },
  "ciudad satelite": { lat: 19.435, lng: -70.655, zoom: 16 },
  // Punta Cana sectores
  "punta cana village": { lat: 18.5601, lng: -68.3725, zoom: 15 },
  "downtown punta cana": { lat: 18.565, lng: -68.368, zoom: 15 },
  "bavaro beach": { lat: 18.685, lng: -68.445, zoom: 15 },
  "el cortecito": { lat: 18.675, lng: -68.43, zoom: 16 },
  "los corales": { lat: 18.67, lng: -68.435, zoom: 16 },
  "cocotal": { lat: 18.66, lng: -68.41, zoom: 15 },
  "hard rock": { lat: 18.655, lng: -68.39, zoom: 15 },
  "vista cana": { lat: 18.595, lng: -68.405, zoom: 15 },
  "punta palmera": { lat: 18.575, lng: -68.36, zoom: 15 },
  "marina cap cana": { lat: 18.455, lng: -68.39, zoom: 15 },
  "juanillo": { lat: 18.46, lng: -68.375, zoom: 15 },
  // Puerto Plata sectores
  "playa dorada": { lat: 19.77, lng: -70.62, zoom: 15 },
  "costa dorada": { lat: 19.765, lng: -70.61, zoom: 15 },
  "centro historico": { lat: 19.79, lng: -70.69, zoom: 16 },
  "long beach": { lat: 19.755, lng: -70.6, zoom: 15 },
  // Las Terrenas sectores
  "playa bonita": { lat: 19.31, lng: -69.52, zoom: 15 },
  "el portillo": { lat: 19.33, lng: -69.48, zoom: 15 },
  "coson": { lat: 19.295, lng: -69.56, zoom: 15 },
  "punta popy": { lat: 19.315, lng: -69.54, zoom: 15 },
  // La Romana / Casa de Campo
  "la estancia": { lat: 18.42, lng: -68.94, zoom: 15 },
  "altos de chavon": { lat: 18.41, lng: -68.955, zoom: 15 },
  "teeth of the dog": { lat: 18.405, lng: -68.925, zoom: 15 },
  "minitas": { lat: 18.415, lng: -68.92, zoom: 15 }
};
const defaultCoordinates = {
  lat: 18.7357,
  lng: -70.1627,
  zoom: 8
};
function getLocationCoordinates(sector, city, province) {
  const normalize = (str) => (str || "").toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/['']/g, "");
  if (sector) {
    const normalizedSector = normalize(sector);
    if (sectors[normalizedSector]) {
      return sectors[normalizedSector];
    }
    const sectorMatch = Object.keys(sectors).find(
      (key) => normalizedSector.includes(key) || key.includes(normalizedSector)
    );
    if (sectorMatch) {
      return sectors[sectorMatch];
    }
  }
  if (city) {
    const normalizedCity = normalize(city);
    if (cities[normalizedCity]) {
      return cities[normalizedCity];
    }
    const cityMatch = Object.keys(cities).find(
      (key) => normalizedCity.includes(key) || key.includes(normalizedCity)
    );
    if (cityMatch) {
      return cities[cityMatch];
    }
  }
  if (province) {
    const normalizedProvince = normalize(province);
    if (provinces[normalizedProvince]) {
      return provinces[normalizedProvince];
    }
    const provinceMatch = Object.keys(provinces).find(
      (key) => normalizedProvince.includes(key) || key.includes(normalizedProvince)
    );
    if (provinceMatch) {
      return provinces[provinceMatch];
    }
  }
  return defaultCoordinates;
}
function hasValidCoordinates(lat, lng) {
  if (lat === null || lat === void 0 || lng === null || lng === void 0) {
    return false;
  }
  if (lat === 0 && lng === 0) {
    return false;
  }
  return lat >= 17.5 && lat <= 20 && lng >= -72.5 && lng <= -68;
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro("https://ubikala.com");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const t = useTranslations("es");
  let property = null;
  let similarProperties = [];
  let fullAgent = null;
  try {
    const dbProperty = await getPropertyBySlug(slug || "");
    if (dbProperty) {
      property = transformProperty(dbProperty);
      if (property.agent.slug && property.agent.slug !== "propiedadenrd") {
        const dbAgent = await getAgentBySlug(property.agent.slug);
        if (dbAgent) {
          fullAgent = transformAgent(dbAgent);
        }
      }
      const dbSimilar = await getProperties({
        ciudad: property.location.city,
        tipo: property.type === "house" ? "casa" : property.type === "apartment" ? "apartamento" : property.type,
        limit: 4
      });
      similarProperties = transformProperties(dbSimilar).filter((p) => p.slug !== property?.slug).slice(0, 3);
    }
  } catch (error) {
    console.error("Error fetching property:", error);
  }
  const agent = fullAgent || property?.agent;
  if (!property) {
    return Astro2.redirect("/404");
  }
  const propertyHasCoords = hasValidCoordinates(property.location.latitude, property.location.longitude);
  const mapCoordinates = propertyHasCoords ? { lat: property.location.latitude, lng: property.location.longitude, zoom: 15 } : getLocationCoordinates(property.location.sector, property.location.city, property.location.province);
  const primaryImage = property.images.find((img) => img.isPrimary) || property.images[0];
  function formatPrice(price, currency, isRent) {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0
    }).format(price);
    return isRent ? `${formatted}${t.property.pricePerMonth}` : formatted;
  }
  const propertySchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `https://propiedadenrd.com/propiedad/${property.slug}`,
    image: property.images.map((img) => img.url),
    datePosted: property.createdAt,
    dateModified: property.updatedAt,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: property.currency,
      availability: property.status === "active" ? "https://schema.org/InStock" : "https://schema.org/SoldOut"
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location.city,
      addressRegion: property.location.province,
      addressCountry: "DO"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.location.latitude,
      longitude: property.location.longitude
    },
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.area,
      unitCode: "MTK"
    }
  };
  const stripHtml = (html) => html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  const cleanDescription = stripHtml(property.description);
  const pageTitle = `${property.title} | ${property.transactionType === "sale" ? "En Venta" : "En Alquiler"} - PropiedadEnRD.com`;
  const pageDescription = `${cleanDescription.substring(0, 155)}... ${property.bedrooms ? property.bedrooms + " habitaciones, " : ""}${property.bathrooms ? property.bathrooms + " ba\xF1os, " : ""}${property.area} m\xB2 en ${property.location.city}.`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": pageDescription, "image": primaryImage.url, "type": "article" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template(['   <script type="application/ld+json">', "<\/script>  ", '<div class="bg-gray-100 py-4"> <div class="container-custom"> <nav class="flex text-sm text-gray-600 flex-wrap"> <a href="/" class="hover:text-primary-600">Inicio</a> <span class="mx-2">/</span> <a', ' class="hover:text-primary-600"> ', ' </a> <span class="mx-2">/</span> <a', ' class="hover:text-primary-600"> ', ' </a> <span class="mx-2">/</span> <span class="text-gray-900 font-medium truncate max-w-xs">', '</span> </nav> </div> </div> <article class="py-8"> <div class="container-custom"> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- Main Content --> <div class="lg:col-span-2"> <!-- Gallery --> <div class="mb-8"> <div class="relative rounded-2xl overflow-hidden mb-4"> <img', "", ' class="w-full h-[400px] md:h-[500px] object-cover"> <!-- Badges --> <div class="absolute top-4 left-4 flex gap-2"> ', " ", ' </div> <!-- Photo count --> <div class="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> ', ' fotos\n</div> </div> <!-- Thumbnail gallery --> <div class="grid grid-cols-4 gap-2"> ', ' </div> </div> <!-- Title & Location --> <div class="mb-8"> <h1 class="text-3xl font-bold text-gray-900 mb-3">', '</h1> <p class="flex items-center gap-2 text-gray-600"> <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> </svg> ', ", ", ", ", ' </p> </div> <!-- Key Features --> <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"> ', " ", ' <div class="bg-gray-50 rounded-xl p-4 text-center"> ', ' <div class="text-2xl font-bold text-gray-900">', '</div> <div class="text-sm text-gray-600">', "</div> </div> ", ' </div> <!-- Description --> <div class="mb-8"> <h2 class="text-xl font-semibold text-gray-900 mb-4">', '</h2> <div class="prose prose-lg text-gray-700">', '</div> </div> <!-- Features --> <div class="mb-8"> <h2 class="text-xl font-semibold text-gray-900 mb-4">', '</h2> <div class="grid grid-cols-2 md:grid-cols-3 gap-3"> ', ' </div> </div> <!-- Location Map --> <div class="mb-8"> <h2 class="text-xl font-semibold text-gray-900 mb-4">', "</h2> ", ' </div> </div> <!-- Sidebar --> <div class="lg:col-span-1"> <div class="sticky top-24"> <!-- Price Card --> <div class="card p-6 mb-6"> <div class="mb-4"> <span class="text-sm text-gray-500">', '</span> <div class="text-3xl font-bold text-primary-600"> ', " </div> ", " ", ' </div> <div class="flex gap-2 mb-4"> <button class="btn-primary flex-1 justify-center"> ', ' </button> </div> <div class="flex gap-2"> <a', ' target="_blank" class="flex-1 btn bg-green-600 text-white hover:bg-green-700 justify-center" data-whatsapp-btn', "", '> <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path> </svg>\nWhatsApp\n</a> <button class="btn-outline px-4" data-favorite-btn', "", "", "", "", "", ' aria-label="Guardar en favoritos"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path> </svg> </button> <button class="btn-outline px-4" data-share-btn', "", "", ' aria-label="Compartir propiedad"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path> </svg> </button> </div> </div> <!-- Agent Card --> <div class="card p-6"> <div class="flex items-center gap-4 mb-4"> ', ' <div> <h3 class="font-semibold text-gray-900">', '</h3> <p class="text-sm text-gray-500">', "</p> ", ' </div> </div> <div class="space-y-2 text-sm text-gray-600 mb-4"> <div class="flex items-center gap-2"> <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path> </svg> ', " ", ' </div> <div class="flex items-center gap-2"> <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> ', ": ", " </div> </div> <a", ' class="btn-outline w-full justify-center text-sm"> ', ' </a> </div> <!-- Contact Form --> <div class="mt-6"> ', " </div> </div> </div> </div> </div> </article>  ", ""])), unescapeHTML(JSON.stringify({
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
        "name": property.transactionType === "sale" ? "Comprar" : "Alquilar",
        "item": `https://propiedadenrd.com/${property.transactionType === "sale" ? "comprar" : "alquilar"}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": property.location.city,
        "item": `https://propiedadenrd.com/propiedades/${property.location.city.toLowerCase().replace(/\s+/g, "-")}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": property.title,
        "item": `https://propiedadenrd.com/propiedad/${property.slug}`
      }
    ]
  })), maybeRenderHead(), addAttribute(property.transactionType === "sale" ? "/comprar" : "/alquilar", "href"), property.transactionType === "sale" ? "Comprar" : "Alquilar", addAttribute(`/propiedades/${property.location.city.toLowerCase().replace(/\s+/g, "-")}`, "href"), property.location.city, property.title, addAttribute(primaryImage.url, "src"), addAttribute(primaryImage.alt || property.title, "alt"), property.transactionType === "sale" ? renderTemplate`<span class="badge bg-primary-600 text-white text-sm px-3 py-1">${t.property.forSale}</span>` : renderTemplate`<span class="badge bg-secondary-600 text-white text-sm px-3 py-1">${t.property.forRent}</span>`, property.isExclusive && renderTemplate`<span class="badge bg-purple-600 text-white text-sm px-3 py-1">${t.common.exclusive}</span>`, property.images.length, property.images.slice(0, 4).map((image, index) => renderTemplate`<button class="rounded-lg overflow-hidden relative"> <img${addAttribute(image.url, "src")}${addAttribute(image.alt, "alt")} class="w-full h-20 object-cover hover:opacity-80 transition-opacity" loading="lazy"> ${index === 3 && property.images.length > 4 && renderTemplate`<div class="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
+${property.images.length - 4} </div>`} </button>`), property.title, property.location.sector, property.location.city, property.location.province, property.bedrooms !== void 0 && renderTemplate`<div class="bg-gray-50 rounded-xl p-4 text-center"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "bedroom", "class": "w-8 h-8 text-primary-600 mx-auto mb-2" })} <div class="text-2xl font-bold text-gray-900">${property.bedrooms}</div> <div class="text-sm text-gray-600">${t.property.bedrooms}</div> </div>`, property.bathrooms !== void 0 && renderTemplate`<div class="bg-gray-50 rounded-xl p-4 text-center"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "bathroom", "class": "w-8 h-8 text-primary-600 mx-auto mb-2" })} <div class="text-2xl font-bold text-gray-900">${property.bathrooms}</div> <div class="text-sm text-gray-600">${t.property.bathrooms}</div> </div>`, renderComponent($$result2, "Icon", $$Icons, { "name": "area", "class": "w-8 h-8 text-primary-600 mx-auto mb-2" }), property.area, t.property.sqm, property.parkingSpaces !== void 0 && renderTemplate`<div class="bg-gray-50 rounded-xl p-4 text-center"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "parking", "class": "w-8 h-8 text-primary-600 mx-auto mb-2" })} <div class="text-2xl font-bold text-gray-900">${property.parkingSpaces}</div> <div class="text-sm text-gray-600">Parqueos</div> </div>`, t.property.description, unescapeHTML(property.description), t.property.features, property.features.map((feature) => renderTemplate`<div class="flex items-center gap-2 text-gray-700"> <svg class="w-5 h-5 text-secondary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg> <span>${t.features[feature] || feature}</span> </div>`), t.property.location, renderComponent($$result2, "PropertyMap", $$PropertyMap, { "latitude": mapCoordinates.lat, "longitude": mapCoordinates.lng, "zoom": mapCoordinates.zoom, "title": property.title, "address": `${property.location.sector}, ${property.location.city}`, "isApproximate": !propertyHasCoords }), t.property.price, formatPrice(property.price, property.currency, property.transactionType === "rent"), property.isPriceReduced && property.previousPrice && renderTemplate`<div class="text-sm text-gray-500 line-through"> ${formatPrice(property.previousPrice, property.currency, property.transactionType === "rent")} </div>`, property.pricePerSqm && renderTemplate`<div class="text-sm text-gray-500">
$${property.pricePerSqm.toLocaleString()} / m²
</div>`, t.property.contactAgent, addAttribute(`https://wa.me/${agent?.whatsapp}?text=Hola, me interesa la propiedad: ${property.title}`, "href"), addAttribute(property.slug, "data-property-slug"), addAttribute(agent?.name, "data-agent-name"), addAttribute(property.slug, "data-property-slug"), addAttribute(property.title, "data-property-title"), addAttribute(primaryImage?.url, "data-property-image"), addAttribute(property.price, "data-property-price"), addAttribute(property.currency, "data-property-currency"), addAttribute(`${property.location.sector}, ${property.location.city}`, "data-property-location"), addAttribute(property.title, "data-share-title"), addAttribute(`Mira esta propiedad: ${property.title} en ${property.location.city}`, "data-share-text"), addAttribute(`https://propiedadenrd.com/propiedad/${property.slug}`, "data-share-url"), agent?.photo && !agent.photo.includes("placeholder") ? renderTemplate`<img${addAttribute(agent.photo, "src")}${addAttribute(agent.name, "alt")} class="w-16 h-16 rounded-full object-cover">` : renderTemplate`<div class="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center"> <span class="text-white text-xl font-bold">${agent?.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</span> </div>`, agent?.name, agent?.company || t.agent.title, agent?.verified && renderTemplate`<span class="inline-flex items-center gap-1 text-xs text-primary-600"> <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> ${t.agent.verified} </span>`, agent?.propertiesCount || 0, t.agent.properties, t.agent.responseTime, agent?.responseTime || "menos de 1 hora", addAttribute(`/asesor/${agent?.slug}`, "href"), t.agent.viewProfile, renderComponent($$result2, "ContactForm", $$ContactForm, { "propertySlug": property.slug, "propertyTitle": property.title, "agentName": agent?.name || "", "agentWhatsapp": agent?.whatsapp || "", "agentCompany": agent?.company || "" }), similarProperties.length > 0 && renderTemplate`<section class="py-12 bg-gray-50"> <div class="container-custom"> <h2 class="text-2xl font-bold text-gray-900 mb-8">${t.property.similarProperties}</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> ${similarProperties.map((prop) => renderTemplate`${renderComponent($$result2, "PropertyCard", $$PropertyCard, { "property": prop })}`)} </div> </div> </section>`), "head": async ($$result2) => renderTemplate(_b || (_b = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(propertySchema))) })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/propiedad/[slug].astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/propiedad/[slug].astro";
const $$url = "/propiedad/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
