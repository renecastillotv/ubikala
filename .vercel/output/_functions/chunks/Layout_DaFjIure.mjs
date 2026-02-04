import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent, o as renderScript, p as renderSlot, n as renderHead, u as unescapeHTML } from './astro/server_CULxlDpc.mjs';
import 'piccolore';
/* empty css                         */
import 'clsx';
import { m as getFooterLocations } from './db_DCp7snH9.mjs';

const $$Astro$3 = createAstro("https://ubikala.com");
const $$Icons = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Icons;
  const { name, class: className = "", size = 24 } = Astro2.props;
  return renderTemplate`${name === "bedroom" && renderTemplate`<!-- Cama / Habitación -->
  ${maybeRenderHead()}<svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg>`}${name === "bathroom" && renderTemplate`<!-- Ducha / Baño -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16"></path><path d="M4 12v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8"></path><path d="M6 12V5a2 2 0 0 1 2-2h1"></path><circle cx="9" cy="5" r="1"></circle><path d="M18 20v1"></path><path d="M6 20v1"></path></svg>`}${name === "area" && renderTemplate`<!-- Área / Metros cuadrados -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18"></path><path d="M9 3v18"></path></svg>`}${name === "parking" && renderTemplate`<!-- Parqueo / Garage -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M9 17V7h4a3 3 0 0 1 0 6H9"></path></svg>`}${name === "location" && renderTemplate`<!-- Ubicación -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`}${name === "heart" && renderTemplate`<!-- Favorito -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`}${name === "share" && renderTemplate`<!-- Compartir -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line></svg>`}${name === "phone" && renderTemplate`<!-- Teléfono -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`}${name === "email" && renderTemplate`<!-- Email -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>`}${name === "whatsapp" && renderTemplate`<!-- WhatsApp -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>`}${name === "verified" && renderTemplate`<!-- Verificado -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd"></path></svg>`}${name === "star" && renderTemplate`<!-- Estrella -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`}${name === "house" && renderTemplate`<!-- Casa -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`}${name === "building" && renderTemplate`<!-- Edificio / Apartamento -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>`}${name === "land" && renderTemplate`<!-- Terreno -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22 16 8"></path><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"></path><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"></path><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"></path><path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"></path><path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"></path><path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"></path><path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"></path></svg>`}${name === "calendar" && renderTemplate`<!-- Calendario / Año -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>`}${name === "clock" && renderTemplate`<!-- Reloj -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`}${name === "search" && renderTemplate`<!-- Buscar -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>`}${name === "filter" && renderTemplate`<!-- Filtro -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`}${name === "chevron-down" && renderTemplate`<!-- Flecha abajo -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>`}${name === "chevron-right" && renderTemplate`<!-- Flecha derecha -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>`}${name === "arrow-right" && renderTemplate`<!-- Flecha derecha (sólida) -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>`}${name === "menu" && renderTemplate`<!-- Menú hamburguesa -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>`}${name === "close" && renderTemplate`<!-- Cerrar -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`}${name === "check" && renderTemplate`<!-- Check -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`}${name === "camera" && renderTemplate`<!-- Cámara / Fotos -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>`}${name === "map" && renderTemplate`<!-- Mapa -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" x2="9" y1="3" y2="18"></line><line x1="15" x2="15" y1="6" y2="21"></line></svg>`}${name === "globe" && renderTemplate`<!-- Idioma / Mundo -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>`}${name === "user" && renderTemplate`<!-- Usuario -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`}${name === "users" && renderTemplate`<!-- Usuarios -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`}${name === "pool" && renderTemplate`<!-- Piscina -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20"></path><path d="M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0"></path><path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0"></path><path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M9 6v6"></path></svg>`}${name === "gym" && renderTemplate`<!-- Gimnasio -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"></path><path d="M2 12h4.5"></path><path d="m20 8-4 4 4 4"></path><path d="m4 8 4 4-4 4"></path><path d="M17.5 17.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"></path><path d="M17.5 12H22"></path></svg>`}${name === "security" && renderTemplate`<!-- Seguridad -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="m9 12 2 2 4-4"></path></svg>`}${name === "garden" && renderTemplate`<!-- Jardín -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10a6 6 0 0 0 6-6c-3.3 0-6 2.7-6 6"></path><path d="M12 10a6 6 0 0 1-6-6c3.3 0 6 2.7 6 6"></path><path d="M12 10v12"></path><path d="M6 22h12"></path></svg>`}${name === "air-conditioning" && renderTemplate`<!-- Aire Acondicionado -->
  <svg${addAttribute(className, "class")}${addAttribute(size, "width")}${addAttribute(size, "height")} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 16a4 4 0 0 1-4-4V8h12v4a4 4 0 0 1-4 4h-4z"></path><path d="M4 8V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6a4 4 0 0 1-4 4h-2"></path><path d="M8 16v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2"></path><path d="M9 20v2"></path><path d="M15 20v2"></path></svg>`}`;
}, "D:/portal PropiedadEnRD.com/src/components/Icons.astro", void 0);

const es = {
  // Meta SEO
  meta: {
    siteName: "Ubikala",
    siteDescription: "Esa propiedad que buscas, ubíkala aquí. Encuentra casas, apartamentos, terrenos y locales comerciales en venta y alquiler. Miles de propiedades verificadas en Santo Domingo, Punta Cana, Santiago y todo el país.",
    keywords: "propiedades en republica dominicana, casas en venta rd, apartamentos santo domingo, inmobiliaria dominicana, bienes raices rd, alquiler punta cana, terrenos santiago, locales comerciales republica dominicana"
  },
  // Navegación
  nav: {
    home: "Inicio",
    buy: "Comprar",
    rent: "Alquilar",
    sell: "Vender",
    agents: "Asesores",
    about: "Nosotros",
    contact: "Contacto",
    login: "Iniciar Sesión",
    register: "Registrarse",
    publishProperty: "Publicar Propiedad"
  },
  // Hero Section
  hero: {
    title: "Encuentra tu Propiedad Ideal en República Dominicana",
    subtitle: "Miles de casas, apartamentos, terrenos y locales comerciales esperan por ti",
    searchPlaceholder: "Buscar por ubicación, tipo de propiedad...",
    cta: "Buscar Propiedades",
    stats: {
      properties: "Propiedades Activas",
      agents: "Asesores Verificados",
      cities: "Ciudades",
      transactions: "Transacciones Exitosas"
    }
  },
  // Filtros de búsqueda
  filters: {
    title: "Filtrar Propiedades",
    propertyType: "Tipo de Propiedad",
    transactionType: "Tipo de Transacción",
    location: "Ubicación",
    priceRange: "Rango de Precio",
    minPrice: "Precio Mínimo",
    maxPrice: "Precio Máximo",
    bedrooms: "Habitaciones",
    bathrooms: "Baños",
    area: "Área (m²)",
    minArea: "Área Mínima",
    maxArea: "Área Máxima",
    features: "Características",
    apply: "Aplicar Filtros",
    clear: "Limpiar Filtros",
    results: "resultados encontrados"
  },
  // Tipos de propiedad
  propertyTypes: {
    all: "Todos los Tipos",
    house: "Casa",
    apartment: "Apartamento",
    penthouse: "Penthouse",
    villa: "Villa",
    land: "Terreno",
    commercial: "Local Comercial",
    office: "Oficina",
    warehouse: "Almacén",
    building: "Edificio"
  },
  // Tipos de transacción
  transactionTypes: {
    all: "Comprar o Alquilar",
    sale: "En Venta",
    rent: "En Alquiler"
  },
  // Características
  features: {
    pool: "Piscina",
    garden: "Jardín",
    garage: "Garaje",
    security: "Seguridad 24/7",
    gym: "Gimnasio",
    terrace: "Terraza",
    balcony: "Balcón",
    airConditioning: "Aire Acondicionado",
    furnished: "Amueblado",
    oceanView: "Vista al Mar",
    mountainView: "Vista a la Montaña",
    elevator: "Ascensor",
    parking: "Parqueo",
    petFriendly: "Acepta Mascotas"
  },
  // Página de propiedad
  property: {
    forSale: "En Venta",
    forRent: "En Alquiler",
    price: "Precio",
    pricePerMonth: "/mes",
    bedrooms: "Habitaciones",
    bathrooms: "Baños",
    area: "Área",
    sqm: "m²",
    yearBuilt: "Año de Construcción",
    description: "Descripción",
    features: "Características",
    location: "Ubicación",
    contactAgent: "Contactar Asesor",
    scheduleVisit: "Agendar Visita",
    requestInfo: "Solicitar Información",
    share: "Compartir",
    save: "Guardar",
    similarProperties: "Propiedades Similares",
    viewOnMap: "Ver en Mapa",
    virtualTour: "Tour Virtual",
    photos: "Fotos",
    video: "Video"
  },
  // Asesor
  agent: {
    title: "Asesor Inmobiliario",
    verified: "Verificado",
    properties: "Propiedades",
    experience: "años de experiencia",
    languages: "Idiomas",
    phone: "Teléfono",
    email: "Correo",
    whatsapp: "WhatsApp",
    viewProfile: "Ver Perfil Completo",
    contactNow: "Contactar Ahora",
    responseTime: "Tiempo de respuesta promedio",
    rating: "Calificación"
  },
  // Página de publicar
  publish: {
    title: "Publica tu Propiedad en República Dominicana",
    subtitle: "Llega a miles de compradores e inquilinos potenciales",
    cta: "Comenzar a Publicar",
    benefits: {
      title: "¿Por qué publicar con nosotros?",
      reach: "Alcance Nacional",
      reachDesc: "Tu propiedad visible para miles de compradores en todo el país",
      verified: "Propietarios Verificados",
      verifiedDesc: "Proceso de verificación para mayor confianza",
      support: "Soporte Dedicado",
      supportDesc: "Equipo de expertos para ayudarte en cada paso",
      analytics: "Estadísticas Detalladas",
      analyticsDesc: "Conoce cuántas personas ven tu propiedad"
    },
    userTypes: {
      title: "Elige tu Tipo de Cuenta",
      agent: "Asesor de Inmobiliaria",
      agentDesc: "Representa una empresa inmobiliaria registrada",
      independent: "Asesor Independiente",
      independentDesc: "Trabaja de forma independiente en bienes raíces",
      owner: "Propietario",
      ownerDesc: "Publica tu propia propiedad directamente"
    }
  },
  // Ubicaciones SEO
  locations: {
    santodomingo: {
      name: "Santo Domingo",
      title: "Propiedades en Santo Domingo - Capital de República Dominicana",
      description: "Encuentra las mejores propiedades en Santo Domingo. Apartamentos en Piantini, casas en Naco, locales en la Zona Colonial y más. La mayor oferta inmobiliaria de la capital dominicana."
    },
    puntacana: {
      name: "Punta Cana",
      title: "Propiedades en Punta Cana - Inversión en el Caribe",
      description: "Villas de lujo, apartamentos frente al mar y terrenos en Punta Cana. Invierte en el destino turístico más importante del Caribe."
    },
    santiago: {
      name: "Santiago",
      title: "Propiedades en Santiago de los Caballeros",
      description: "Casas y apartamentos en Santiago de los Caballeros. La segunda ciudad más importante de República Dominicana con excelentes oportunidades inmobiliarias."
    },
    lasterrenas: {
      name: "Las Terrenas",
      title: "Propiedades en Las Terrenas - Samaná",
      description: "Propiedades exclusivas en Las Terrenas, Samaná. Villas frente al mar, apartamentos en la playa y terrenos con vista al océano."
    },
    cabarete: {
      name: "Cabarete",
      title: "Propiedades en Cabarete - Puerto Plata",
      description: "Propiedades en Cabarete, la capital del kitesurf. Apartamentos frente a la playa, condos y villas en Puerto Plata."
    },
    bavaro: {
      name: "Bávaro",
      title: "Propiedades en Bávaro - La Altagracia",
      description: "Inversiones inmobiliarias en Bávaro. Condominios, villas y terrenos cerca de las mejores playas del Caribe."
    },
    sosua: {
      name: "Sosúa",
      title: "Propiedades en Sosúa - Puerto Plata",
      description: "Propiedades en venta y alquiler en Sosúa. Apartamentos y villas con vista al mar en la costa norte."
    },
    jarabacoa: {
      name: "Jarabacoa",
      title: "Propiedades en Jarabacoa - La Vega",
      description: "Casas y fincas en Jarabacoa, la ciudad de la eterna primavera. Propiedades en la montaña con clima fresco todo el año."
    }
  },
  // Footer
  footer: {
    about: "Sobre el Portal",
    aboutText: "Ubikala es el portal donde asesores inmobiliarios, agencias y propietarios publican sus propiedades para conectar con compradores e inquilinos. Esa propiedad que buscas, ubíkala aquí.",
    quickLinks: "Enlaces Rápidos",
    propertyTypes: "Tipos de Propiedad",
    popularLocations: "Ubicaciones Populares",
    contact: "Contacto",
    followUs: "Síguenos",
    rights: "Todos los derechos reservados",
    privacy: "Política de Privacidad",
    terms: "Términos y Condiciones"
  },
  // Mensajes comunes
  common: {
    loading: "Cargando...",
    error: "Ha ocurrido un error",
    noResults: "No se encontraron resultados",
    seeMore: "Ver más",
    seeLess: "Ver menos",
    viewAll: "Ver todos",
    back: "Volver",
    next: "Siguiente",
    previous: "Anterior",
    send: "Enviar",
    cancel: "Cancelar",
    confirm: "Confirmar",
    close: "Cerrar",
    search: "Buscar",
    from: "Desde",
    to: "Hasta",
    new: "Nuevo",
    featured: "Destacado",
    exclusive: "Exclusivo",
    reduced: "Precio Reducido"
  },
  // SEO Páginas
  pages: {
    home: {
      title: "Ubikala - Esa propiedad que buscas, ubíkala aquí",
      description: "Encuentra casas, apartamentos, terrenos y locales comerciales en venta y alquiler. Miles de propiedades verificadas en Santo Domingo, Punta Cana, Santiago y más."
    },
    buy: {
      title: "Propiedades en Venta | Ubikala",
      description: "Explora miles de propiedades en venta. Casas, apartamentos, villas, terrenos y locales comerciales con los mejores precios del mercado."
    },
    rent: {
      title: "Propiedades en Alquiler | Ubikala",
      description: "Alquila tu próximo hogar. Apartamentos amueblados, casas familiares, oficinas y locales comerciales disponibles para alquiler."
    },
    agents: {
      title: "Asesores Inmobiliarios | Ubikala",
      description: "Conecta con los mejores asesores inmobiliarios. Profesionales verificados listos para ayudarte a encontrar tu propiedad ideal."
    },
    publish: {
      title: "Publica tu Propiedad Gratis | Ubikala",
      description: "Publica tu propiedad y alcanza miles de compradores. Registro gratuito para propietarios, asesores independientes e inmobiliarias."
    }
  },
  // Formulario de contacto
  contactForm: {
    title: "Enviar Mensaje",
    name: "Nombre Completo",
    email: "Correo Electrónico",
    phone: "Teléfono",
    message: "Mensaje",
    subject: "Asunto",
    propertyInterest: "Me interesa esta propiedad",
    scheduleVisit: "Deseo agendar una visita",
    moreInfo: "Deseo más información",
    submit: "Enviar Mensaje",
    success: "¡Mensaje enviado con éxito!",
    error: "Error al enviar el mensaje. Intenta nuevamente."
  }
};

const en = {
  // Meta SEO
  meta: {
    siteName: "Ubikala",
    siteDescription: "That property you are looking for, find it here. Discover houses, apartments, land and commercial properties for sale and rent. Thousands of verified properties in Santo Domingo, Punta Cana, Santiago and throughout the country.",
    keywords: "real estate dominican republic, houses for sale dr, apartments santo domingo, dominican real estate, properties dr, punta cana rental, santiago land, commercial properties dominican republic"
  },
  // Navigation
  nav: {
    home: "Home",
    buy: "Buy",
    rent: "Rent",
    sell: "Sell",
    agents: "Agents",
    about: "About Us",
    contact: "Contact",
    login: "Sign In",
    register: "Register",
    publishProperty: "List Property"
  },
  // Hero Section
  hero: {
    title: "Find Your Dream Property in the Dominican Republic",
    subtitle: "Thousands of houses, apartments, land and commercial properties await you",
    searchPlaceholder: "Search by location, property type...",
    cta: "Search Properties",
    stats: {
      properties: "Active Properties",
      agents: "Verified Agents",
      cities: "Cities",
      transactions: "Successful Transactions"
    }
  },
  // Search Filters
  filters: {
    title: "Filter Properties",
    propertyType: "Property Type",
    transactionType: "Transaction Type",
    location: "Location",
    priceRange: "Price Range",
    minPrice: "Min Price",
    maxPrice: "Max Price",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    area: "Area (sqm)",
    minArea: "Min Area",
    maxArea: "Max Area",
    features: "Features",
    apply: "Apply Filters",
    clear: "Clear Filters",
    results: "results found"
  },
  // Property Types
  propertyTypes: {
    all: "All Types",
    house: "House",
    apartment: "Apartment",
    penthouse: "Penthouse",
    villa: "Villa",
    land: "Land",
    commercial: "Commercial",
    office: "Office",
    warehouse: "Warehouse",
    building: "Building"
  },
  // Transaction Types
  transactionTypes: {
    all: "Buy or Rent",
    sale: "For Sale",
    rent: "For Rent"
  },
  // Features
  features: {
    pool: "Swimming Pool",
    garden: "Garden",
    garage: "Garage",
    security: "24/7 Security",
    gym: "Gym",
    terrace: "Terrace",
    balcony: "Balcony",
    airConditioning: "Air Conditioning",
    furnished: "Furnished",
    oceanView: "Ocean View",
    mountainView: "Mountain View",
    elevator: "Elevator",
    parking: "Parking",
    petFriendly: "Pet Friendly"
  },
  // Property Page
  property: {
    forSale: "For Sale",
    forRent: "For Rent",
    price: "Price",
    pricePerMonth: "/month",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    area: "Area",
    sqm: "sqm",
    yearBuilt: "Year Built",
    description: "Description",
    features: "Features",
    location: "Location",
    contactAgent: "Contact Agent",
    scheduleVisit: "Schedule Visit",
    requestInfo: "Request Information",
    share: "Share",
    save: "Save",
    similarProperties: "Similar Properties",
    viewOnMap: "View on Map",
    virtualTour: "Virtual Tour",
    photos: "Photos",
    video: "Video"
  },
  // Agent
  agent: {
    title: "Real Estate Agent",
    verified: "Verified",
    properties: "Properties",
    experience: "years of experience",
    languages: "Languages",
    phone: "Phone",
    email: "Email",
    whatsapp: "WhatsApp",
    viewProfile: "View Full Profile",
    contactNow: "Contact Now",
    responseTime: "Average response time",
    rating: "Rating"
  },
  // Publish Page
  publish: {
    title: "List Your Property in the Dominican Republic",
    subtitle: "Reach thousands of potential buyers and tenants",
    cta: "Start Listing",
    benefits: {
      title: "Why list with us?",
      reach: "National Reach",
      reachDesc: "Your property visible to thousands of buyers across the country",
      verified: "Verified Owners",
      verifiedDesc: "Verification process for greater trust",
      support: "Dedicated Support",
      supportDesc: "Expert team to help you every step of the way",
      analytics: "Detailed Analytics",
      analyticsDesc: "Know how many people view your property"
    },
    userTypes: {
      title: "Choose Your Account Type",
      agent: "Real Estate Agency Agent",
      agentDesc: "Represents a registered real estate company",
      independent: "Independent Agent",
      independentDesc: "Works independently in real estate",
      owner: "Property Owner",
      ownerDesc: "List your own property directly"
    }
  },
  // SEO Locations
  locations: {
    santodomingo: {
      name: "Santo Domingo",
      title: "Properties in Santo Domingo - Capital of the Dominican Republic",
      description: "Find the best properties in Santo Domingo. Apartments in Piantini, houses in Naco, commercial spaces in the Colonial Zone and more. The largest real estate offering in the Dominican capital."
    },
    puntacana: {
      name: "Punta Cana",
      title: "Properties in Punta Cana - Caribbean Investment",
      description: "Luxury villas, beachfront apartments and land in Punta Cana. Invest in the most important tourist destination in the Caribbean."
    },
    santiago: {
      name: "Santiago",
      title: "Properties in Santiago de los Caballeros",
      description: "Houses and apartments in Santiago de los Caballeros. The second most important city in the Dominican Republic with excellent real estate opportunities."
    },
    lasterrenas: {
      name: "Las Terrenas",
      title: "Properties in Las Terrenas - Samaná",
      description: "Exclusive properties in Las Terrenas, Samaná. Oceanfront villas, beach apartments and land with ocean views."
    },
    cabarete: {
      name: "Cabarete",
      title: "Properties in Cabarete - Puerto Plata",
      description: "Properties in Cabarete, the kitesurfing capital. Beachfront apartments, condos and villas in Puerto Plata."
    },
    bavaro: {
      name: "Bávaro",
      title: "Properties in Bávaro - La Altagracia",
      description: "Real estate investments in Bávaro. Condominiums, villas and land near the best beaches in the Caribbean."
    },
    sosua: {
      name: "Sosúa",
      title: "Properties in Sosúa - Puerto Plata",
      description: "Properties for sale and rent in Sosúa. Apartments and villas with ocean views on the north coast."
    },
    jarabacoa: {
      name: "Jarabacoa",
      title: "Properties in Jarabacoa - La Vega",
      description: "Houses and farms in Jarabacoa, the city of eternal spring. Mountain properties with cool weather year-round."
    }
  },
  // Footer
  footer: {
    about: "About Us",
    aboutText: "Ubikala is the portal where real estate agents, agencies and property owners connect with buyers and tenants. That property you are looking for, find it here.",
    quickLinks: "Quick Links",
    propertyTypes: "Property Types",
    popularLocations: "Popular Locations",
    contact: "Contact",
    followUs: "Follow Us",
    rights: "All rights reserved",
    privacy: "Privacy Policy",
    terms: "Terms and Conditions"
  },
  // Common Messages
  common: {
    loading: "Loading...",
    error: "An error occurred",
    noResults: "No results found",
    seeMore: "See more",
    seeLess: "See less",
    viewAll: "View all",
    back: "Back",
    next: "Next",
    previous: "Previous",
    send: "Send",
    cancel: "Cancel",
    confirm: "Confirm",
    close: "Close",
    search: "Search",
    from: "From",
    to: "To",
    new: "New",
    featured: "Featured",
    exclusive: "Exclusive",
    reduced: "Price Reduced"
  },
  // SEO Pages
  pages: {
    home: {
      title: "Ubikala - That property you are looking for, find it here",
      description: "Find houses, apartments, land and commercial properties for sale and rent. Thousands of verified properties in Santo Domingo, Punta Cana, Santiago and more."
    },
    buy: {
      title: "Properties for Sale | Ubikala",
      description: "Explore thousands of properties for sale. Houses, apartments, villas, land and commercial properties at the best market prices."
    },
    rent: {
      title: "Properties for Rent | Ubikala",
      description: "Rent your next home. Furnished apartments, family houses, offices and commercial spaces available for rent."
    },
    agents: {
      title: "Real Estate Agents | Ubikala",
      description: "Connect with the best real estate agents. Verified professionals ready to help you find your ideal property."
    },
    publish: {
      title: "List Your Property Free | Ubikala",
      description: "List your property and reach thousands of buyers. Free registration for owners, independent agents and real estate agencies."
    }
  },
  // Contact Form
  contactForm: {
    title: "Send Message",
    name: "Full Name",
    email: "Email Address",
    phone: "Phone",
    message: "Message",
    subject: "Subject",
    propertyInterest: "I am interested in this property",
    scheduleVisit: "I want to schedule a visit",
    moreInfo: "I want more information",
    submit: "Send Message",
    success: "Message sent successfully!",
    error: "Error sending message. Please try again."
  }
};

const fr = {
  // Meta SEO
  meta: {
    siteName: "Ubikala",
    siteDescription: "Cette propriété que vous cherchez, trouvez-la ici. Découvrez des maisons, appartements, terrains et locaux commerciaux à vendre et à louer. Des milliers de propriétés vérifiées à Saint-Domingue, Punta Cana, Santiago et dans tout le pays.",
    keywords: "immobilier république dominicaine, maisons à vendre rd, appartements saint domingue, immobilier dominicain, propriétés rd, location punta cana, terrains santiago, locaux commerciaux république dominicaine"
  },
  // Navigation
  nav: {
    home: "Accueil",
    buy: "Acheter",
    rent: "Louer",
    sell: "Vendre",
    agents: "Agents",
    about: "À Propos",
    contact: "Contact",
    login: "Connexion",
    register: "S'inscrire",
    publishProperty: "Publier une Propriété"
  },
  // Hero Section
  hero: {
    title: "Trouvez Votre Propriété Idéale en République Dominicaine",
    subtitle: "Des milliers de maisons, appartements, terrains et locaux commerciaux vous attendent",
    searchPlaceholder: "Rechercher par emplacement, type de propriété...",
    cta: "Rechercher des Propriétés",
    stats: {
      properties: "Propriétés Actives",
      agents: "Agents Vérifiés",
      cities: "Villes",
      transactions: "Transactions Réussies"
    }
  },
  // Filtres de recherche
  filters: {
    title: "Filtrer les Propriétés",
    propertyType: "Type de Propriété",
    transactionType: "Type de Transaction",
    location: "Emplacement",
    priceRange: "Gamme de Prix",
    minPrice: "Prix Minimum",
    maxPrice: "Prix Maximum",
    bedrooms: "Chambres",
    bathrooms: "Salles de Bain",
    area: "Surface (m²)",
    minArea: "Surface Minimum",
    maxArea: "Surface Maximum",
    features: "Caractéristiques",
    apply: "Appliquer les Filtres",
    clear: "Effacer les Filtres",
    results: "résultats trouvés"
  },
  // Types de propriété
  propertyTypes: {
    all: "Tous les Types",
    house: "Maison",
    apartment: "Appartement",
    penthouse: "Penthouse",
    villa: "Villa",
    land: "Terrain",
    commercial: "Local Commercial",
    office: "Bureau",
    warehouse: "Entrepôt",
    building: "Immeuble"
  },
  // Types de transaction
  transactionTypes: {
    all: "Acheter ou Louer",
    sale: "À Vendre",
    rent: "À Louer"
  },
  // Caractéristiques
  features: {
    pool: "Piscine",
    garden: "Jardin",
    garage: "Garage",
    security: "Sécurité 24/7",
    gym: "Salle de Sport",
    terrace: "Terrasse",
    balcony: "Balcon",
    airConditioning: "Climatisation",
    furnished: "Meublé",
    oceanView: "Vue sur Mer",
    mountainView: "Vue sur Montagne",
    elevator: "Ascenseur",
    parking: "Parking",
    petFriendly: "Animaux Acceptés"
  },
  // Page de propriété
  property: {
    forSale: "À Vendre",
    forRent: "À Louer",
    price: "Prix",
    pricePerMonth: "/mois",
    bedrooms: "Chambres",
    bathrooms: "Salles de Bain",
    area: "Surface",
    sqm: "m²",
    yearBuilt: "Année de Construction",
    description: "Description",
    features: "Caractéristiques",
    location: "Emplacement",
    contactAgent: "Contacter l'Agent",
    scheduleVisit: "Planifier une Visite",
    requestInfo: "Demander des Informations",
    share: "Partager",
    save: "Sauvegarder",
    similarProperties: "Propriétés Similaires",
    viewOnMap: "Voir sur la Carte",
    virtualTour: "Visite Virtuelle",
    photos: "Photos",
    video: "Vidéo"
  },
  // Agent
  agent: {
    title: "Agent Immobilier",
    verified: "Vérifié",
    properties: "Propriétés",
    experience: "années d'expérience",
    languages: "Langues",
    phone: "Téléphone",
    email: "Email",
    whatsapp: "WhatsApp",
    viewProfile: "Voir le Profil Complet",
    contactNow: "Contacter Maintenant",
    responseTime: "Temps de réponse moyen",
    rating: "Évaluation"
  },
  // Page de publication
  publish: {
    title: "Publiez Votre Propriété en République Dominicaine",
    subtitle: "Atteignez des milliers d'acheteurs et locataires potentiels",
    cta: "Commencer à Publier",
    benefits: {
      title: "Pourquoi publier avec nous?",
      reach: "Portée Nationale",
      reachDesc: "Votre propriété visible par des milliers d'acheteurs dans tout le pays",
      verified: "Propriétaires Vérifiés",
      verifiedDesc: "Processus de vérification pour plus de confiance",
      support: "Support Dédié",
      supportDesc: "Équipe d'experts pour vous aider à chaque étape",
      analytics: "Statistiques Détaillées",
      analyticsDesc: "Sachez combien de personnes voient votre propriété"
    },
    userTypes: {
      title: "Choisissez Votre Type de Compte",
      agent: "Agent d'Agence Immobilière",
      agentDesc: "Représente une société immobilière enregistrée",
      independent: "Agent Indépendant",
      independentDesc: "Travaille de manière indépendante dans l'immobilier",
      owner: "Propriétaire",
      ownerDesc: "Publiez votre propre propriété directement"
    }
  },
  // Emplacements SEO
  locations: {
    santodomingo: {
      name: "Saint-Domingue",
      title: "Propriétés à Saint-Domingue - Capitale de la République Dominicaine",
      description: "Trouvez les meilleures propriétés à Saint-Domingue. Appartements à Piantini, maisons à Naco, locaux dans la Zone Coloniale et plus. La plus grande offre immobilière de la capitale dominicaine."
    },
    puntacana: {
      name: "Punta Cana",
      title: "Propriétés à Punta Cana - Investissement aux Caraïbes",
      description: "Villas de luxe, appartements en bord de mer et terrains à Punta Cana. Investissez dans la destination touristique la plus importante des Caraïbes."
    },
    santiago: {
      name: "Santiago",
      title: "Propriétés à Santiago de los Caballeros",
      description: "Maisons et appartements à Santiago de los Caballeros. La deuxième ville la plus importante de République Dominicaine avec d'excellentes opportunités immobilières."
    },
    lasterrenas: {
      name: "Las Terrenas",
      title: "Propriétés à Las Terrenas - Samaná",
      description: "Propriétés exclusives à Las Terrenas, Samaná. Villas face à l'océan, appartements sur la plage et terrains avec vue sur l'océan."
    },
    cabarete: {
      name: "Cabarete",
      title: "Propriétés à Cabarete - Puerto Plata",
      description: "Propriétés à Cabarete, la capitale du kitesurf. Appartements en bord de plage, condos et villas à Puerto Plata."
    },
    bavaro: {
      name: "Bávaro",
      title: "Propriétés à Bávaro - La Altagracia",
      description: "Investissements immobiliers à Bávaro. Condominiums, villas et terrains près des plus belles plages des Caraïbes."
    },
    sosua: {
      name: "Sosúa",
      title: "Propriétés à Sosúa - Puerto Plata",
      description: "Propriétés à vendre et à louer à Sosúa. Appartements et villas avec vue sur la mer sur la côte nord."
    },
    jarabacoa: {
      name: "Jarabacoa",
      title: "Propriétés à Jarabacoa - La Vega",
      description: "Maisons et fermes à Jarabacoa, la ville du printemps éternel. Propriétés en montagne avec un climat frais toute l'année."
    }
  },
  // Footer
  footer: {
    about: "À Propos de Nous",
    aboutText: "Ubikala est le portail où agents immobiliers, agences et propriétaires se connectent avec acheteurs et locataires. Cette propriété que vous cherchez, trouvez-la ici.",
    quickLinks: "Liens Rapides",
    propertyTypes: "Types de Propriété",
    popularLocations: "Emplacements Populaires",
    contact: "Contact",
    followUs: "Suivez-nous",
    rights: "Tous droits réservés",
    privacy: "Politique de Confidentialité",
    terms: "Termes et Conditions"
  },
  // Messages communs
  common: {
    loading: "Chargement...",
    error: "Une erreur est survenue",
    noResults: "Aucun résultat trouvé",
    seeMore: "Voir plus",
    seeLess: "Voir moins",
    viewAll: "Voir tout",
    back: "Retour",
    next: "Suivant",
    previous: "Précédent",
    send: "Envoyer",
    cancel: "Annuler",
    confirm: "Confirmer",
    close: "Fermer",
    search: "Rechercher",
    from: "De",
    to: "À",
    new: "Nouveau",
    featured: "En Vedette",
    exclusive: "Exclusif",
    reduced: "Prix Réduit"
  },
  // Pages SEO
  pages: {
    home: {
      title: "Ubikala - Cette propriété que vous cherchez, trouvez-la ici",
      description: "Trouvez des maisons, appartements, terrains et locaux commerciaux à vendre et à louer. Des milliers de propriétés vérifiées à Saint-Domingue, Punta Cana, Santiago et plus."
    },
    buy: {
      title: "Propriétés à Vendre | Ubikala",
      description: "Explorez des milliers de propriétés à vendre. Maisons, appartements, villas, terrains et locaux commerciaux aux meilleurs prix du marché."
    },
    rent: {
      title: "Propriétés à Louer | Ubikala",
      description: "Louez votre prochain logement. Appartements meublés, maisons familiales, bureaux et locaux commerciaux disponibles à la location."
    },
    agents: {
      title: "Agents Immobiliers | Ubikala",
      description: "Connectez-vous avec les meilleurs agents immobiliers. Des professionnels vérifiés prêts à vous aider à trouver votre propriété idéale."
    },
    publish: {
      title: "Publiez Votre Propriété Gratuitement | Ubikala",
      description: "Publiez votre propriété et atteignez des milliers d'acheteurs. Inscription gratuite pour les propriétaires, agents indépendants et agences immobilières."
    }
  },
  // Formulaire de contact
  contactForm: {
    title: "Envoyer un Message",
    name: "Nom Complet",
    email: "Adresse Email",
    phone: "Téléphone",
    message: "Message",
    subject: "Sujet",
    propertyInterest: "Je suis intéressé par cette propriété",
    scheduleVisit: "Je souhaite planifier une visite",
    moreInfo: "Je souhaite plus d'informations",
    submit: "Envoyer le Message",
    success: "Message envoyé avec succès!",
    error: "Erreur lors de l'envoi du message. Veuillez réessayer."
  }
};

const languages = {
  es: "Español",
  en: "English",
  fr: "Français"
};
const defaultLang = "es";
const translations = {
  es,
  en,
  fr
};
function getLangFromUrl(url) {
  const [, lang] = url.pathname.split("/");
  if (lang in translations) return lang;
  return defaultLang;
}
function useTranslations(lang) {
  return translations[lang];
}
function localizedUrl(path, lang) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (lang === defaultLang) {
    return cleanPath;
  }
  return `/${lang}${cleanPath}`;
}
function getAlternateUrls(currentPath, siteUrl = "https://ubikala.com") {
  let basePath = currentPath;
  for (const lang of Object.keys(languages)) {
    if (currentPath.startsWith(`/${lang}/`) || currentPath === `/${lang}`) {
      basePath = currentPath.slice(lang.length + 1) || "/";
      break;
    }
  }
  return Object.keys(languages).map((lang) => ({
    lang,
    url: lang === defaultLang ? `${siteUrl}${basePath}` : `${siteUrl}/${lang}${basePath === "/" ? "" : basePath}`
  }));
}
const routeTranslations = {
  "comprar": { es: "comprar", en: "buy", fr: "acheter" },
  "alquilar": { es: "alquilar", en: "rent", fr: "louer" },
  "publicar": { es: "publicar", en: "list", fr: "publier" },
  "asesores": { es: "asesores", en: "agents", fr: "agents" },
  "nosotros": { es: "nosotros", en: "about", fr: "a-propos" },
  "contacto": { es: "contacto", en: "contact", fr: "contact" },
  "buscar": { es: "buscar", en: "search", fr: "recherche" },
  "propiedad": { es: "propiedad", en: "property", fr: "propriete" },
  "asesor": { es: "asesor", en: "agent", fr: "agent" },
  "propiedades": { es: "propiedades", en: "properties", fr: "proprietes" },
  "privacidad": { es: "privacidad", en: "privacy", fr: "confidentialite" },
  "terminos": { es: "terminos", en: "terms", fr: "conditions" },
  "login": { es: "login", en: "login", fr: "connexion" }
};
function translateRoute(path, fromLang, toLang) {
  let cleanPath = path;
  if (path.startsWith(`/${fromLang}/`)) {
    cleanPath = path.slice(fromLang.length + 1);
  } else if (path === `/${fromLang}`) {
    cleanPath = "/";
  }
  if (cleanPath === "/" || cleanPath === "") {
    return toLang === defaultLang ? "/" : `/${toLang}`;
  }
  const segments = cleanPath.split("/").filter(Boolean);
  const translatedSegments = segments.map((segment) => {
    for (const [baseSlug, translations2] of Object.entries(routeTranslations)) {
      if (translations2[fromLang] === segment) {
        return translations2[toLang];
      }
    }
    return segment;
  });
  const translatedPath = "/" + translatedSegments.join("/");
  if (toLang === defaultLang) {
    return translatedPath;
  }
  return `/${toLang}${translatedPath}`;
}
function getLanguageUrls(pathname) {
  const [, firstSegment] = pathname.split("/");
  const currentLang = firstSegment in translations ? firstSegment : defaultLang;
  return {
    es: translateRoute(pathname, currentLang, "es"),
    en: translateRoute(pathname, currentLang, "en"),
    fr: translateRoute(pathname, currentLang, "fr")
  };
}

const defaultConfig = {
  company_name: "Ubikala",
  company_slogan: "Esa propiedad que buscas, ubíkala aquí",
  logo_url: "/logo.png",
  favicon_url: "/favicon.ico",
  email: "info@ubikala.com",
  phone: "+18095550000",
  phone_display: "+1 809-555-0000",
  whatsapp: "18095550000",
  business_hours: "Lun-Vie 9am-6pm",
  address_street: "",
  address_city: "Santo Domingo",
  address_country: "República Dominicana",
  address_country_code: "DO",
  geo_latitude: "18.7357",
  geo_longitude: "-70.1627",
  social_facebook: "https://facebook.com/ubikala",
  social_instagram: "https://instagram.com/ubikala",
  social_linkedin: "https://linkedin.com/company/ubikala",
  social_youtube: "",
  social_twitter: "",
  social_tiktok: "",
  site_url: "https://ubikala.com",
  og_image: "https://ubikala.com/og-image.jpg",
  meta_title: "Ubikala - Esa propiedad que buscas, ubíkala aquí",
  meta_description: "Encuentra casas, apartamentos y terrenos en venta y alquiler. Esa propiedad que buscas, ubíkala aquí.",
  stat_properties: "2,500+",
  stat_agents: "150+",
  stat_cities: "25+",
  stat_monthly_visitors: "50K+",
  stat_satisfaction: "95%",
  analytics_api: "http://5.161.98.140:3002",
  lead_source: "ubikala"
};
async function getSiteConfig() {
  return defaultConfig;
}

const $$Astro$2 = createAstro("https://ubikala.com");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const config = await getSiteConfig();
  const languageUrls = getLanguageUrls(Astro2.url.pathname);
  const user = Astro2.locals.user;
  const isLoggedIn = !!user;
  return renderTemplate`${maybeRenderHead()}<header class="bg-white shadow-sm sticky top-0 z-50"> <!-- Top bar - Olive green --> <div class="bg-primary-700 text-white text-sm py-2"> <div class="container-custom flex justify-between items-center"> <div class="flex items-center gap-4"> <a${addAttribute(`tel:${config.phone}`, "href")} class="flex items-center gap-1 hover:text-primary-200"> ${renderComponent($$result, "Icon", $$Icons, { "name": "phone", "class": "w-4 h-4" })} <span class="hidden sm:inline">${config.phone_display}</span> </a> <a${addAttribute(`mailto:${config.email}`, "href")} class="hidden md:flex items-center gap-1 hover:text-primary-200"> ${renderComponent($$result, "Icon", $$Icons, { "name": "email", "class": "w-4 h-4" })} <span>${config.email}</span> </a> </div> <div class="flex items-center gap-3"> <!-- Claim --> <span class="hidden md:inline text-primary-100 text-xs">Esa propiedad que buscas, ubíkala aquí</span> <!-- Language Switcher --> <div class="flex items-center gap-1 border-l border-primary-500 pl-3"> ${Object.entries(languages).map(([langCode, langName]) => renderTemplate`<a${addAttribute(languageUrls[langCode], "href")}${addAttribute(`px-2 py-1 rounded text-xs font-medium transition-colors ${lang === langCode ? "bg-primary-600 text-white" : "hover:bg-primary-600 text-primary-200"}`, "class")}${addAttribute(langName, "title")}> ${langCode.toUpperCase()} </a>`)} </div> </div> </div> </div> <!-- Main Navigation --> <nav class="container-custom"> <div class="flex items-center justify-between h-16 lg:h-20"> <!-- Logo - Ubikala --> <a${addAttribute(localizedUrl("/", lang), "href")} class="flex items-center gap-2"> <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center"> <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path> <circle cx="12" cy="10" r="3"></circle> </svg> </div> <div class="hidden sm:block"> <span class="text-2xl font-bold text-primary-700 tracking-tight">Ubikala</span> <span class="text-xs text-gray-500 block -mt-1">.com</span> </div> </a> <!-- Desktop Navigation --> <div class="hidden lg:flex items-center gap-8"> <a${addAttribute(localizedUrl("/comprar", lang), "href")} class="text-gray-700 hover:text-primary-600 font-medium"> ${t.nav.buy} </a> <a${addAttribute(localizedUrl("/alquilar", lang), "href")} class="text-gray-700 hover:text-primary-600 font-medium"> ${t.nav.rent} </a> <a${addAttribute(localizedUrl("/asesores", lang), "href")} class="text-gray-700 hover:text-primary-600 font-medium"> ${t.nav.agents} </a> <a${addAttribute(localizedUrl("/nosotros", lang), "href")} class="text-gray-700 hover:text-primary-600 font-medium"> ${t.nav.about} </a> <a${addAttribute(localizedUrl("/contacto", lang), "href")} class="text-gray-700 hover:text-primary-600 font-medium"> ${t.nav.contact} </a> </div> <!-- CTA Buttons --> <div class="flex items-center gap-3"> <!-- Favorites Button --> <a${addAttribute(localizedUrl("/favoritos", lang), "href")} class="relative p-2 text-gray-400 hover:text-primary-600 transition-colors" title="Guardados"> <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"> <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path> </svg> <span data-favorites-count class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center hidden">0</span> </a> ${isLoggedIn ? renderTemplate`<!-- Logged in: Show publish and profile -->
          <a href="/admin/properties/create" class="hidden sm:inline-flex btn-primary text-sm"> ${t.nav.publishProperty} </a>
          <a href="/admin/dashboard" class="hidden md:flex items-center gap-2 text-gray-700 hover:text-primary-600 font-medium"> <span class="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold"> ${user?.name?.charAt(0).toUpperCase()} </span> <span class="hidden lg:inline">${user?.name?.split(" ")[0]}</span> </a>` : renderTemplate`<!-- Not logged in: Show publish and login -->
          <a href="/publicar" class="hidden sm:inline-flex btn-primary text-sm"> ${t.nav.publishProperty} </a>
          <a href="/admin/login" class="text-gray-700 hover:text-primary-600 font-medium hidden md:block"> ${t.nav.login} </a>`} <!-- Mobile Menu Button --> <button id="mobile-menu-button" class="lg:hidden p-2 text-gray-700 hover:text-primary-600" aria-label="Menu"> ${renderComponent($$result, "Icon", $$Icons, { "name": "menu", "class": "w-6 h-6" })} </button> </div> </div> <!-- Mobile Navigation --> <div id="mobile-menu" class="lg:hidden hidden pb-4"> <div class="flex flex-col gap-2"> <a${addAttribute(localizedUrl("/comprar", lang), "href")} class="px-4 py-2 text-gray-700 hover:bg-secondary-200 rounded-lg"> ${t.nav.buy} </a> <a${addAttribute(localizedUrl("/alquilar", lang), "href")} class="px-4 py-2 text-gray-700 hover:bg-secondary-200 rounded-lg"> ${t.nav.rent} </a> <a${addAttribute(localizedUrl("/asesores", lang), "href")} class="px-4 py-2 text-gray-700 hover:bg-secondary-200 rounded-lg"> ${t.nav.agents} </a> <a${addAttribute(localizedUrl("/nosotros", lang), "href")} class="px-4 py-2 text-gray-700 hover:bg-secondary-200 rounded-lg"> ${t.nav.about} </a> <a${addAttribute(localizedUrl("/contacto", lang), "href")} class="px-4 py-2 text-gray-700 hover:bg-secondary-200 rounded-lg"> ${t.nav.contact} </a> <a${addAttribute(localizedUrl("/favoritos", lang), "href")} class="px-4 py-2 text-gray-700 hover:bg-secondary-200 rounded-lg flex items-center gap-2"> <svg class="w-4 h-4 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"> <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path> </svg>
Guardados
<span data-favorites-count class="ml-auto bg-primary-100 text-primary-700 text-xs font-medium px-2 py-0.5 rounded-full hidden">0</span> </a> <hr class="my-2 border-secondary-400"> ${isLoggedIn ? renderTemplate`<a href="/admin/properties/create" class="btn-primary text-center"> ${t.nav.publishProperty} </a>
          <a href="/admin/dashboard" class="btn-outline text-center flex items-center justify-center gap-2"> <span class="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-semibold"> ${user?.name?.charAt(0).toUpperCase()} </span>
Mi Panel
</a>` : renderTemplate`<a href="/publicar" class="btn-primary text-center"> ${t.nav.publishProperty} </a>
          <a href="/admin/login" class="btn-outline text-center"> ${t.nav.login} </a>`} </div> </div> </nav> </header> ${renderScript($$result, "D:/portal PropiedadEnRD.com/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/portal PropiedadEnRD.com/src/components/Header.astro", void 0);

const $$Astro$1 = createAstro("https://ubikala.com");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const config = await getSiteConfig();
  let popularLocations = [];
  try {
    popularLocations = await getFooterLocations(6);
  } catch (error) {
    console.error("Error fetching footer locations:", error);
  }
  function getTranslatedUrl(baseRoute, currentLang) {
    const route = routeTranslations[baseRoute];
    if (!route) return currentLang === defaultLang ? `/${baseRoute}` : `/${currentLang}/${baseRoute}`;
    const translatedSlug = route[currentLang];
    return currentLang === defaultLang ? `/${translatedSlug}` : `/${currentLang}/${translatedSlug}`;
  }
  const urls = {
    buy: getTranslatedUrl("comprar", lang),
    rent: getTranslatedUrl("alquilar", lang),
    publish: getTranslatedUrl("publicar", lang),
    agents: getTranslatedUrl("asesores", lang),
    about: getTranslatedUrl("nosotros", lang),
    contact: getTranslatedUrl("contacto", lang),
    privacy: getTranslatedUrl("privacidad", lang),
    terms: getTranslatedUrl("terminos", lang)
  };
  return renderTemplate`${maybeRenderHead()}<footer class="bg-primary-900 text-gray-300"> <!-- Main Footer --> <div class="container-custom py-16"> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"> <!-- About --> <div> <div class="flex items-center gap-2 mb-6"> <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center"> <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path> <circle cx="12" cy="10" r="3"></circle> </svg> </div> <div> <span class="text-2xl font-bold text-white tracking-tight">Ubikala</span> </div> </div> <p class="text-sm leading-relaxed mb-4 text-primary-200">
Esa propiedad que buscas, ubíkala aquí
</p> <p class="text-sm leading-relaxed mb-6 text-gray-400"> ${t.footer.aboutText} </p> <div class="flex gap-4"> ${config.social_facebook && renderTemplate`<a${addAttribute(config.social_facebook, "href")} target="_blank" rel="noopener" class="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path> </svg> </a>`} ${config.social_instagram && renderTemplate`<a${addAttribute(config.social_instagram, "href")} target="_blank" rel="noopener" class="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path> </svg> </a>`} ${config.social_linkedin && renderTemplate`<a${addAttribute(config.social_linkedin, "href")} target="_blank" rel="noopener" class="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path> </svg> </a>`} <a${addAttribute(`https://wa.me/${config.whatsapp}`, "href")} target="_blank" rel="noopener" class="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center hover:bg-accent-600 transition-colors"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path> </svg> </a> </div> </div> <!-- Quick Links --> <div> <h4 class="text-white font-semibold mb-6">${t.footer.quickLinks}</h4> <ul class="space-y-3"> <li> <a${addAttribute(urls.buy, "href")} class="hover:text-primary-300 transition-colors">${t.nav.buy}</a> </li> <li> <a${addAttribute(urls.rent, "href")} class="hover:text-primary-300 transition-colors">${t.nav.rent}</a> </li> <li> <a${addAttribute(urls.publish, "href")} class="hover:text-primary-300 transition-colors">${t.nav.publishProperty}</a> </li> <li> <a${addAttribute(urls.agents, "href")} class="hover:text-primary-300 transition-colors">${t.nav.agents}</a> </li> <li> <a${addAttribute(urls.about, "href")} class="hover:text-primary-300 transition-colors">${t.nav.about}</a> </li> <li> <a${addAttribute(urls.contact, "href")} class="hover:text-primary-300 transition-colors">${t.nav.contact}</a> </li> </ul> </div> <!-- Property Types --> <div> <h4 class="text-white font-semibold mb-6">${t.footer.propertyTypes}</h4> <ul class="space-y-3"> <li> <a${addAttribute(`${urls.buy}/casas`, "href")} class="hover:text-primary-300 transition-colors">${t.propertyTypes.house}</a> </li> <li> <a${addAttribute(`${urls.buy}/apartamentos`, "href")} class="hover:text-primary-300 transition-colors">${t.propertyTypes.apartment}</a> </li> <li> <a${addAttribute(`${urls.buy}/villas`, "href")} class="hover:text-primary-300 transition-colors">${t.propertyTypes.villa}</a> </li> <li> <a${addAttribute(`${urls.buy}/terrenos`, "href")} class="hover:text-primary-300 transition-colors">${t.propertyTypes.land}</a> </li> <li> <a${addAttribute(`${urls.buy}/locales-comerciales`, "href")} class="hover:text-primary-300 transition-colors">${t.propertyTypes.commercial}</a> </li> <li> <a${addAttribute(`${urls.buy}/penthouses`, "href")} class="hover:text-primary-300 transition-colors">${t.propertyTypes.penthouse}</a> </li> </ul> </div> <!-- Popular Locations --> <div> <h4 class="text-white font-semibold mb-6">${t.footer.popularLocations}</h4> <ul class="space-y-3"> ${popularLocations.map((location) => renderTemplate`<li> <a${addAttribute(getTranslatedUrl("propiedades", lang) + `/${location.slug}`, "href")} class="hover:text-primary-300 transition-colors"> ${location.name} <span class="text-primary-700 text-sm ml-1">(${location.count})</span> </a> </li>`)} </ul> </div> </div> </div> <!-- Bottom Bar --> <div class="border-t border-primary-800"> <div class="container-custom py-6"> <div class="flex flex-col md:flex-row justify-between items-center gap-4"> <p class="text-sm text-primary-400">
&copy; ${currentYear} Ubikala. ${t.footer.rights}.
</p> <div class="flex gap-6 text-sm"> <a${addAttribute(urls.privacy, "href")} class="text-primary-400 hover:text-white transition-colors"> ${t.footer.privacy} </a> <a${addAttribute(urls.terms, "href")} class="text-primary-400 hover:text-white transition-colors"> ${t.footer.terms} </a> </div> </div> </div> </div> </footer>`;
}, "D:/portal PropiedadEnRD.com/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://ubikala.com");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const config = await getSiteConfig();
  const {
    title,
    description,
    keywords,
    image = config.og_image,
    type = "website",
    canonicalUrl,
    noindex = false,
    alternateLanguages = []
  } = Astro2.props;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const siteUrl = config.site_url;
  const fullCanonicalUrl = canonicalUrl || Astro2.url.href;
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;
  const socialLinks = [
    config.social_facebook,
    config.social_instagram,
    config.social_linkedin,
    config.social_youtube,
    config.social_twitter,
    config.social_tiktok
  ].filter(Boolean);
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: config.company_name,
    description: t.meta.siteDescription,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}${config.logo_url}`,
      width: 200,
      height: 60
    },
    image: `${siteUrl}${config.og_image}`,
    telephone: config.phone,
    email: config.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.address_street || "",
      addressLocality: config.address_city,
      addressCountry: config.address_country_code
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: config.geo_latitude,
      longitude: config.geo_longitude
    },
    areaServed: [
      { "@type": "Country", name: config.address_country },
      { "@type": "City", name: "Santo Domingo" },
      { "@type": "City", name: "Punta Cana" },
      { "@type": "City", name: "Santiago" },
      { "@type": "City", name: "La Romana" }
    ],
    priceRange: "$$$",
    currenciesAccepted: "USD, DOP",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00"
      }
    ],
    sameAs: socialLinks,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Propiedades en Republica Dominicana",
      itemListElement: [
        { "@type": "OfferCatalog", name: "Casas en Venta" },
        { "@type": "OfferCatalog", name: "Apartamentos en Venta" },
        { "@type": "OfferCatalog", name: "Terrenos en Venta" },
        { "@type": "OfferCatalog", name: "Propiedades en Alquiler" }
      ]
    }
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: config.company_name,
    description: t.meta.siteDescription,
    publisher: { "@id": `${siteUrl}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/buscar?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    inLanguage: ["es-DO", "en-US", "fr-FR"]
  };
  return renderTemplate(_a || (_a = __template(["<html", ' class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- SEO Meta Tags --><title>', '</title><meta name="description"', ">", "", '<!-- Canonical URL --><link rel="canonical"', "><!-- Alternate Languages -->", '<link rel="alternate" hreflang="x-default"', '><!-- Open Graph / Facebook --><meta property="og:type"', '><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:site_name"', '><meta property="og:locale"', '><!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"', '><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Favicon --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><!-- DNS Prefetch & Preconnect for Performance --><link rel="dns-prefetch" href="https://fonts.googleapis.com"><link rel="dns-prefetch" href="https://fonts.gstatic.com"><link rel="dns-prefetch" href="https://www.googletagmanager.com"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><!-- Fonts - loaded synchronously to prevent layout shift --><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=block" rel="stylesheet"><!-- Schema.org - Organization --><script type="application/ld+json">', '<\/script><!-- Schema.org - Website with SearchAction --><script type="application/ld+json">', '<\/script><!-- Additional meta for Dominican Republic focus --><meta name="geo.region"', '><meta name="geo.placename"', '><meta name="geo.position"', '><meta name="ICBM"', '><meta name="generator"', ">", '</head> <body class="min-h-screen flex flex-col"> ', ' <main class="flex-grow"> ', " </main> ", " <!-- Property Actions (Favorites, Share, Analytics) --> ", " <!-- Toast Styles -->  </body> </html>"])), addAttribute(lang, "lang"), title, addAttribute(description, "content"), keywords && renderTemplate`<meta name="keywords"${addAttribute(keywords, "content")}>`, noindex && renderTemplate`<meta name="robots" content="noindex, nofollow">`, addAttribute(fullCanonicalUrl, "href"), alternateLanguages.map(({ lang: lang2, url }) => renderTemplate`<link rel="alternate"${addAttribute(lang2, "hreflang")}${addAttribute(url, "href")}>`), addAttribute(siteUrl, "href"), addAttribute(type, "content"), addAttribute(fullCanonicalUrl, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(fullImageUrl, "content"), addAttribute(config.company_name, "content"), addAttribute(lang === "es" ? "es_DO" : lang === "en" ? "en_US" : "fr_FR", "content"), addAttribute(fullCanonicalUrl, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(fullImageUrl, "content"), unescapeHTML(JSON.stringify(schemaOrg)), unescapeHTML(JSON.stringify(websiteSchema)), addAttribute(config.address_country_code, "content"), addAttribute(config.address_country, "content"), addAttribute(`${config.geo_latitude};${config.geo_longitude}`, "content"), addAttribute(`${config.geo_latitude}, ${config.geo_longitude}`, "content"), addAttribute(Astro2.generator, "content"), renderHead(), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}), renderScript($$result, "D:/portal PropiedadEnRD.com/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"));
}, "D:/portal PropiedadEnRD.com/src/layouts/Layout.astro", void 0);

export { $$Layout as $, $$Icons as a, getSiteConfig as b, getAlternateUrls as c, getLangFromUrl as g, localizedUrl as l, useTranslations as u };
