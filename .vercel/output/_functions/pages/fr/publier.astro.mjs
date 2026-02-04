/* empty css                                    */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { c as getAlternateUrls, $ as $$Layout, u as useTranslations, a as $$Icons } from '../../chunks/Layout_DaFjIure.mjs';
export { renderers } from '../../renderers.mjs';

const $$Publier = createComponent(($$result, $$props, $$slots) => {
  const t = useTranslations("fr");
  const alternateUrls = getAlternateUrls("/fr/publier");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t.pages.publish.title, "description": t.pages.publish.description, "keywords": "publier propri\xE9t\xE9 r\xE9publique dominicaine, vendre maison rd, annonce immobili\xE8re", "alternateLanguages": alternateUrls }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-20"> <div class="container-custom"> <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"> <div> <h1 class="text-4xl md:text-5xl font-bold text-white mb-6"> ${t.publish.title} </h1> <p class="text-xl text-primary-100 mb-8"> ${t.publish.subtitle} </p> <div class="flex flex-wrap gap-4"> <a href="#account-types" class="btn-secondary"> ${t.publish.cta} </a> </div> </div> <div class="hidden lg:block"> <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop" alt="Publiez votre propriété" class="rounded-2xl shadow-2xl"> </div> </div> </div> </section>  <section class="section"> <div class="container-custom"> <div class="text-center mb-12"> <h2 class="section-title">${t.publish.benefits.title}</h2> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> <div class="text-center"> <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "globe", "class": "w-8 h-8 text-primary-600" })} </div> <h3 class="font-semibold text-gray-900 mb-2">${t.publish.benefits.reach}</h3> <p class="text-gray-600 text-sm">${t.publish.benefits.reachDesc}</p> </div> <div class="text-center"> <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "verified", "class": "w-8 h-8 text-secondary-600" })} </div> <h3 class="font-semibold text-gray-900 mb-2">${t.publish.benefits.verified}</h3> <p class="text-gray-600 text-sm">${t.publish.benefits.verifiedDesc}</p> </div> <div class="text-center"> <div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "phone", "class": "w-8 h-8 text-accent-600" })} </div> <h3 class="font-semibold text-gray-900 mb-2">${t.publish.benefits.support}</h3> <p class="text-gray-600 text-sm">${t.publish.benefits.supportDesc}</p> </div> <div class="text-center"> <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "search", "class": "w-8 h-8 text-purple-600" })} </div> <h3 class="font-semibold text-gray-900 mb-2">${t.publish.benefits.analytics}</h3> <p class="text-gray-600 text-sm">${t.publish.benefits.analyticsDesc}</p> </div> </div> </div> </section>  <section id="account-types" class="section bg-gray-50"> <div class="container-custom"> <div class="text-center mb-12"> <h2 class="section-title">${t.publish.userTypes.title}</h2> <p class="section-subtitle mx-auto">
Sélectionnez l'option qui vous décrit le mieux
</p> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"> <!-- Agent d'Agence --> <div class="card p-8 text-center hover:shadow-xl transition-shadow border-2 border-transparent hover:border-primary-500"> <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "building", "class": "w-10 h-10 text-primary-600" })} </div> <h3 class="text-xl font-bold text-gray-900 mb-3">${t.publish.userTypes.agent}</h3> <p class="text-gray-600 mb-6">${t.publish.userTypes.agentDesc}</p> <ul class="text-sm text-gray-600 text-left mb-6 space-y-2"> <li class="flex items-center gap-2"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "check", "class": "w-4 h-4 text-green-500" })}
Publications illimitées
</li> <li class="flex items-center gap-2"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "check", "class": "w-4 h-4 text-green-500" })}
Marque de l'agence
</li> <li class="flex items-center gap-2"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "check", "class": "w-4 h-4 text-green-500" })}
Support premium
</li> </ul> <a href="/fr/inscription?type=agent" class="btn-primary w-full justify-center">
S'inscrire comme Agent
</a> </div> <!-- Indépendant --> <div class="card p-8 text-center hover:shadow-xl transition-shadow border-2 border-transparent hover:border-secondary-500"> <div class="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "user", "class": "w-10 h-10 text-secondary-600" })} </div> <h3 class="text-xl font-bold text-gray-900 mb-3">${t.publish.userTypes.independent}</h3> <p class="text-gray-600 mb-6">${t.publish.userTypes.independentDesc}</p> <ul class="text-sm text-gray-600 text-left mb-6 space-y-2"> <li class="flex items-center gap-2"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "check", "class": "w-4 h-4 text-green-500" })}
Jusqu'à 50 publications
</li> <li class="flex items-center gap-2"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "check", "class": "w-4 h-4 text-green-500" })}
Profil personnel
</li> <li class="flex items-center gap-2"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "check", "class": "w-4 h-4 text-green-500" })}
Support standard
</li> </ul> <a href="/fr/inscription?type=independent" class="btn-secondary w-full justify-center">
S'inscrire comme Indépendant
</a> </div> <!-- Propriétaire --> <div class="card p-8 text-center hover:shadow-xl transition-shadow border-2 border-transparent hover:border-accent-500"> <div class="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "house", "class": "w-10 h-10 text-accent-600" })} </div> <h3 class="text-xl font-bold text-gray-900 mb-3">${t.publish.userTypes.owner}</h3> <p class="text-gray-600 mb-6">${t.publish.userTypes.ownerDesc}</p> <ul class="text-sm text-gray-600 text-left mb-6 space-y-2"> <li class="flex items-center gap-2"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "check", "class": "w-4 h-4 text-green-500" })}
Jusqu'à 3 publications gratuites
</li> <li class="flex items-center gap-2"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "check", "class": "w-4 h-4 text-green-500" })}
Vérification rapide
</li> <li class="flex items-center gap-2"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "check", "class": "w-4 h-4 text-green-500" })}
Support par email
</li> </ul> <a href="/fr/inscription?type=owner" class="btn-outline w-full justify-center">
S'inscrire comme Propriétaire
</a> </div> </div> </div> </section>  <section class="section"> <div class="container-custom"> <div class="max-w-3xl mx-auto"> <h2 class="section-title text-center mb-12">Questions Fréquentes</h2> <div class="space-y-6"> <div class="card p-6"> <h3 class="font-semibold text-gray-900 mb-2">Combien coûte la publication?</h3> <p class="text-gray-600">
Les propriétaires peuvent publier jusqu'à 3 propriétés gratuitement. Les agents et agences ont des plans mensuels à partir de 29$/mois.
</p> </div> <div class="card p-6"> <h3 class="font-semibold text-gray-900 mb-2">Combien de temps prend la vérification?</h3> <p class="text-gray-600">
La vérification du compte prend généralement 24-48 heures. Vous recevrez un email une fois vérifié.
</p> </div> <div class="card p-6"> <h3 class="font-semibold text-gray-900 mb-2">Puis-je modifier mes annonces après publication?</h3> <p class="text-gray-600">
Oui, vous pouvez modifier les photos, descriptions et prix à tout moment depuis votre tableau de bord.
</p> </div> </div> </div> </div> </section> ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/fr/publier.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/fr/publier.astro";
const $$url = "/fr/publier";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Publier,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
