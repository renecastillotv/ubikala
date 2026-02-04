import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent, l as Fragment, o as renderScript } from './astro/server_CULxlDpc.mjs';
import 'piccolore';
import { g as getLangFromUrl, l as localizedUrl } from './Layout_DaFjIure.mjs';
/* empty css                         */

const $$Astro = createAstro("https://ubikala.com");
const $$PropertyCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PropertyCard;
  const { property, priority = false } = Astro2.props;
  const lang = getLangFromUrl(Astro2.url);
  const carouselImages = property.images.slice(0, 5);
  const hasMultipleImages = carouselImages.length > 1;
  function formatPrice(price, currency) {
    if (currency === "DOP") {
      return `RD$${price.toLocaleString("es-DO")}`;
    }
    return `$${price.toLocaleString("en-US")}`;
  }
  const cardId = `card-${property.slug}`;
  const propertyUrl = localizedUrl(`/propiedad/${property.slug}`, lang);
  const features = [];
  if (property.bedrooms && property.bedrooms > 0) features.push(`${property.bedrooms} hab`);
  if (property.bathrooms && property.bathrooms > 0) features.push(`${property.bathrooms} ${property.bathrooms === 1 ? "ba\xF1o" : "ba\xF1os"}`);
  if (property.area > 0) features.push(`${property.area}m\xB2`);
  if (property.parkingSpaces && property.parkingSpaces > 0) features.push(`${property.parkingSpaces} parq`);
  const featuresText = features.join(" \xB7 ");
  const typeLabels = {
    "house": "Casa",
    "apartment": "Apartamento",
    "penthouse": "Penthouse",
    "villa": "Villa",
    "land": "Terreno",
    "commercial": "Comercial",
    "office": "Oficina",
    "warehouse": "Nave",
    "building": "Edificio"
  };
  const typeLabel = typeLabels[property.type] || "Propiedad";
  return renderTemplate`${maybeRenderHead()}<article class="card-property"${addAttribute(cardId, "data-card-id")} data-astro-cid-s35dwbi7> <a${addAttribute(propertyUrl, "href")} class="block" data-astro-cid-s35dwbi7> <!-- Image Section --> <div class="card-image-wrap" data-astro-cid-s35dwbi7>  ${carouselImages[0] && renderTemplate`<img${addAttribute(carouselImages[0].url, "src")}${addAttribute(carouselImages[0].alt || property.title, "alt")}${addAttribute(priority ? "eager" : "lazy", "loading")} class="card-main-image" data-astro-cid-s35dwbi7>`}  ${hasMultipleImages && renderTemplate`<div class="card-carousel"${addAttribute(cardId, "data-carousel")} data-astro-cid-s35dwbi7> ${carouselImages.map((img, index) => renderTemplate`<img${addAttribute(img.url, "src")}${addAttribute(img.alt || `${property.title} - Imagen ${index + 1}`, "alt")}${addAttribute(index === 0 ? "eager" : "lazy", "loading")}${addAttribute(`card-slide${index === 0 ? " active" : ""}`, "class")}${addAttribute(index, "data-slide-index")} data-astro-cid-s35dwbi7>`)} </div>`} <!-- Minimal carousel indicators - bottom bar style --> ${hasMultipleImages && renderTemplate`<div class="card-progress" data-astro-cid-s35dwbi7> ${carouselImages.map((_, index) => renderTemplate`<span${addAttribute(`progress-segment ${index === 0 ? "active" : ""}`, "class")}${addAttribute(cardId, "data-carousel-dot")}${addAttribute(index, "data-dot-index")} data-astro-cid-s35dwbi7></span>`)} </div>`} <!-- Navigation arrows - only on hover, minimal style --> ${hasMultipleImages && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-s35dwbi7": true }, { "default": ($$result2) => renderTemplate` <button type="button" class="card-nav card-nav-prev"${addAttribute(cardId, "data-carousel-prev")} aria-label="Anterior" data-astro-cid-s35dwbi7> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-s35dwbi7> <path d="M15 18l-6-6 6-6" data-astro-cid-s35dwbi7></path> </svg> </button> <button type="button" class="card-nav card-nav-next"${addAttribute(cardId, "data-carousel-next")} aria-label="Siguiente" data-astro-cid-s35dwbi7> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-s35dwbi7> <path d="M9 18l6-6-6-6" data-astro-cid-s35dwbi7></path> </svg> </button> ` })}`} <!-- Agent info overlay on image --> ${property.agent && renderTemplate`<a${addAttribute(localizedUrl(`/asesor/${property.agent.slug}`, lang), "href")} class="card-agent-overlay" onclick="event.stopPropagation();" data-astro-cid-s35dwbi7> <div class="agent-avatar-wrap" data-astro-cid-s35dwbi7> <img${addAttribute(property.agent.photo || "/images/agent-placeholder.svg", "src")}${addAttribute(property.agent.name, "alt")} class="agent-avatar" loading="lazy" data-astro-cid-s35dwbi7> ${property.agent.verified && renderTemplate`<svg class="agent-badge" viewBox="0 0 20 20" fill="currentColor" data-astro-cid-s35dwbi7> <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-astro-cid-s35dwbi7></path> </svg>`} </div> <span class="agent-name" data-astro-cid-s35dwbi7>${property.agent.name}</span> </a>`} </div> <!-- Content Section - Clean layout --> <div class="card-content" data-astro-cid-s35dwbi7> <!-- Price Row --> <div class="card-price-row" data-astro-cid-s35dwbi7> <span class="card-price" data-astro-cid-s35dwbi7> ${formatPrice(property.price, property.currency)} ${property.transactionType === "rent" && renderTemplate`<span class="price-period" data-astro-cid-s35dwbi7>/mes</span>`} </span> ${property.transactionType === "rent" && renderTemplate`<span class="card-tag rent" data-astro-cid-s35dwbi7>Alquiler</span>`} ${property.isPriceReduced && renderTemplate`<span class="card-tag reduced" data-astro-cid-s35dwbi7>Rebajado</span>`} </div> <!-- Title --> <h3 class="card-title" data-astro-cid-s35dwbi7>${property.title}</h3> <!-- Location - simple text, no icon --> <p class="card-location" data-astro-cid-s35dwbi7>${property.location.sector}, ${property.location.city}</p> <!-- Features - compact text style --> ${featuresText && renderTemplate`<p class="card-features" data-astro-cid-s35dwbi7>${featuresText}</p>`} <!-- Footer with type and save button --> <div class="card-footer" data-astro-cid-s35dwbi7> <span class="card-type" data-astro-cid-s35dwbi7>${typeLabel}</span> <!-- Save button - bookmark style, not heart --> <button type="button" data-favorite-btn${addAttribute(property.slug, "data-property-slug")}${addAttribute(property.title, "data-property-title")}${addAttribute(carouselImages[0]?.url, "data-property-image")}${addAttribute(property.price, "data-property-price")}${addAttribute(property.currency, "data-property-currency")}${addAttribute(`${property.location.sector}, ${property.location.city}`, "data-property-location")} class="card-save" aria-label="Guardar" data-astro-cid-s35dwbi7> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-s35dwbi7> <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" data-astro-cid-s35dwbi7></path> </svg> </button> </div> </div> </a> </article> ${renderScript($$result, "D:/portal PropiedadEnRD.com/src/components/PropertyCard.astro?astro&type=script&index=0&lang.ts")} `;
}, "D:/portal PropiedadEnRD.com/src/components/PropertyCard.astro", void 0);

export { $$PropertyCard as $ };
