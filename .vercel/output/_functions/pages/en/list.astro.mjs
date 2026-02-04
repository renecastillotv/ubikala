/* empty css                                    */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { c as getAlternateUrls, $ as $$Layout, u as useTranslations, a as $$Icons } from '../../chunks/Layout_DaFjIure.mjs';
export { renderers } from '../../renderers.mjs';

const $$List = createComponent(($$result, $$props, $$slots) => {
  const t = useTranslations("en");
  const alternateUrls = getAlternateUrls("/en/list");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t.pages.publish.title, "description": t.pages.publish.description, "keywords": "list property dominican republic, sell home dr, real estate listing", "alternateLanguages": alternateUrls }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-20"> <div class="container-custom"> <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"> <div> <h1 class="text-4xl md:text-5xl font-bold text-white mb-6"> ${t.publish.title} </h1> <p class="text-xl text-primary-100 mb-8"> ${t.publish.subtitle} </p> <div class="flex flex-wrap gap-4"> <a href="#account-types" class="btn-secondary"> ${t.publish.cta} </a> </div> </div> <div class="hidden lg:block"> <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop" alt="List your property" class="rounded-2xl shadow-2xl"> </div> </div> </div> </section>  <section class="section"> <div class="container-custom"> <div class="text-center mb-12"> <h2 class="section-title">${t.publish.benefits.title}</h2> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> <div class="text-center"> <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "globe", "class": "w-8 h-8 text-primary-600" })} </div> <h3 class="font-semibold text-gray-900 mb-2">${t.publish.benefits.reach}</h3> <p class="text-gray-600 text-sm">${t.publish.benefits.reachDesc}</p> </div> <div class="text-center"> <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "verified", "class": "w-8 h-8 text-secondary-600" })} </div> <h3 class="font-semibold text-gray-900 mb-2">${t.publish.benefits.verified}</h3> <p class="text-gray-600 text-sm">${t.publish.benefits.verifiedDesc}</p> </div> <div class="text-center"> <div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "phone", "class": "w-8 h-8 text-accent-600" })} </div> <h3 class="font-semibold text-gray-900 mb-2">${t.publish.benefits.support}</h3> <p class="text-gray-600 text-sm">${t.publish.benefits.supportDesc}</p> </div> <div class="text-center"> <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "search", "class": "w-8 h-8 text-purple-600" })} </div> <h3 class="font-semibold text-gray-900 mb-2">${t.publish.benefits.analytics}</h3> <p class="text-gray-600 text-sm">${t.publish.benefits.analyticsDesc}</p> </div> </div> </div> </section>  <section id="account-types" class="section bg-gray-50"> <div class="container-custom"> <div class="text-center mb-12"> <h2 class="section-title">${t.publish.userTypes.title}</h2> <p class="section-subtitle mx-auto">
Select the option that best describes you
</p> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"> <!-- Agency Agent --> <div class="card p-8 text-center hover:shadow-xl transition-shadow border-2 border-transparent hover:border-primary-500"> <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "building", "class": "w-10 h-10 text-primary-600" })} </div> <h3 class="text-xl font-bold text-gray-900 mb-3">${t.publish.userTypes.agent}</h3> <p class="text-gray-600 mb-6">${t.publish.userTypes.agentDesc}</p> <ul class="text-sm text-gray-600 text-left mb-6 space-y-2"> <li class="flex items-center gap-2"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "check", "class": "w-4 h-4 text-green-500" })}
Unlimited listings
</li> <li class="flex items-center gap-2"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "check", "class": "w-4 h-4 text-green-500" })}
Agency branding
</li> <li class="flex items-center gap-2"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "check", "class": "w-4 h-4 text-green-500" })}
Premium support
</li> </ul> <a href="/en/register?type=agent" class="btn-primary w-full justify-center">
Register as Agent
</a> </div> <!-- Independent --> <div class="card p-8 text-center hover:shadow-xl transition-shadow border-2 border-transparent hover:border-secondary-500"> <div class="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "user", "class": "w-10 h-10 text-secondary-600" })} </div> <h3 class="text-xl font-bold text-gray-900 mb-3">${t.publish.userTypes.independent}</h3> <p class="text-gray-600 mb-6">${t.publish.userTypes.independentDesc}</p> <ul class="text-sm text-gray-600 text-left mb-6 space-y-2"> <li class="flex items-center gap-2"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "check", "class": "w-4 h-4 text-green-500" })}
Up to 50 listings
</li> <li class="flex items-center gap-2"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "check", "class": "w-4 h-4 text-green-500" })}
Personal profile
</li> <li class="flex items-center gap-2"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "check", "class": "w-4 h-4 text-green-500" })}
Standard support
</li> </ul> <a href="/en/register?type=independent" class="btn-secondary w-full justify-center">
Register as Independent
</a> </div> <!-- Owner --> <div class="card p-8 text-center hover:shadow-xl transition-shadow border-2 border-transparent hover:border-accent-500"> <div class="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "house", "class": "w-10 h-10 text-accent-600" })} </div> <h3 class="text-xl font-bold text-gray-900 mb-3">${t.publish.userTypes.owner}</h3> <p class="text-gray-600 mb-6">${t.publish.userTypes.ownerDesc}</p> <ul class="text-sm text-gray-600 text-left mb-6 space-y-2"> <li class="flex items-center gap-2"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "check", "class": "w-4 h-4 text-green-500" })}
Up to 3 free listings
</li> <li class="flex items-center gap-2"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "check", "class": "w-4 h-4 text-green-500" })}
Quick verification
</li> <li class="flex items-center gap-2"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "check", "class": "w-4 h-4 text-green-500" })}
Email support
</li> </ul> <a href="/en/register?type=owner" class="btn-outline w-full justify-center">
Register as Owner
</a> </div> </div> </div> </section>  <section class="section"> <div class="container-custom"> <div class="max-w-3xl mx-auto"> <h2 class="section-title text-center mb-12">Frequently Asked Questions</h2> <div class="space-y-6"> <div class="card p-6"> <h3 class="font-semibold text-gray-900 mb-2">How much does it cost to list?</h3> <p class="text-gray-600">
Owners can list up to 3 properties for free. Agents and agencies have monthly plans starting at $29/month.
</p> </div> <div class="card p-6"> <h3 class="font-semibold text-gray-900 mb-2">How long does verification take?</h3> <p class="text-gray-600">
Account verification usually takes 24-48 hours. You'll receive an email once verified.
</p> </div> <div class="card p-6"> <h3 class="font-semibold text-gray-900 mb-2">Can I edit my listings after publishing?</h3> <p class="text-gray-600">
Yes, you can edit photos, descriptions, and prices at any time from your dashboard.
</p> </div> </div> </div> </div> </section> ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/en/list.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/en/list.astro";
const $$url = "/en/list";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$List,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
