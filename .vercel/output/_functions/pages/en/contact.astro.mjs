/* empty css                                    */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { c as getAlternateUrls, $ as $$Layout, a as $$Icons, u as useTranslations } from '../../chunks/Layout_DaFjIure.mjs';
export { renderers } from '../../renderers.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const t = useTranslations("en");
  const alternateUrls = getAlternateUrls("/en/contact");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contact | PropiedadEnRD.com", "description": "Contact us for support, inquiries, or information about listing on PropiedadEnRD.com. We're here to help.", "keywords": "contact propiedadenrd, real estate support, portal help", "alternateLanguages": alternateUrls }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="bg-gray-100 py-4"> <div class="container-custom"> <nav class="flex text-sm text-gray-600"> <a href="/en" class="hover:text-primary-600">${t.nav.home}</a> <span class="mx-2">/</span> <span class="text-gray-900 font-medium">${t.nav.contact}</span> </nav> </div> </div> <section class="section"> <div class="container-custom"> <div class="max-w-5xl mx-auto"> <div class="text-center mb-12"> <h1 class="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1> <p class="text-lg text-gray-600">
Have questions about the portal? Need help listing? We're here to help.
</p> </div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- Contact Information --> <div class="lg:col-span-1 space-y-6"> <div class="card p-6"> <div class="flex items-start gap-4"> <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "email", "class": "w-6 h-6 text-primary-600" })} </div> <div> <h3 class="font-semibold text-gray-900 mb-1">Email</h3> <a href="mailto:info@propiedadenrd.com" class="text-primary-600 hover:underline">
info@propiedadenrd.com
</a> <p class="text-sm text-gray-500 mt-1">Response within 24-48 hours</p> </div> </div> </div> <div class="card p-6"> <div class="flex items-start gap-4"> <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "whatsapp", "class": "w-6 h-6 text-green-600" })} </div> <div> <h3 class="font-semibold text-gray-900 mb-1">WhatsApp</h3> <a href="https://wa.me/18095550000" class="text-green-600 hover:underline">
+1 809-555-0000
</a> <p class="text-sm text-gray-500 mt-1">Mon-Fri 9am-6pm</p> </div> </div> </div> <div class="card p-6"> <div class="flex items-start gap-4"> <div class="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "phone", "class": "w-6 h-6 text-accent-600" })} </div> <div> <h3 class="font-semibold text-gray-900 mb-1">Phone</h3> <a href="tel:+18095550000" class="text-gray-900 hover:text-primary-600">
+1 809-555-0000
</a> <p class="text-sm text-gray-500 mt-1">Mon-Fri 9am-6pm</p> </div> </div> </div> <div class="card p-6"> <div class="flex items-start gap-4"> <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0"> ${renderComponent($$result2, "Icon", $$Icons, { "name": "location", "class": "w-6 h-6 text-purple-600" })} </div> <div> <h3 class="font-semibold text-gray-900 mb-1">Location</h3> <p class="text-gray-600">Santo Domingo</p> <p class="text-sm text-gray-500">Dominican Republic</p> </div> </div> </div> </div> <!-- Form --> <div class="lg:col-span-2"> <div class="card p-8"> <h2 class="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h2> <form class="space-y-6"> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div> <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
Full Name *
</label> <input type="text" id="name" name="name" required class="input" placeholder="Your name"> </div> <div> <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
Email Address *
</label> <input type="email" id="email" name="email" required class="input" placeholder="your@email.com"> </div> </div> <div> <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
Phone
</label> <input type="tel" id="phone" name="phone" class="input" placeholder="+1 809-000-0000"> </div> <div> <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
Subject *
</label> <select id="subject" name="subject" required class="select"> <option value="">Select a subject</option> <option value="general">General Inquiry</option> <option value="publicar">I Want to List Properties</option> <option value="soporte">Technical Support</option> <option value="propiedad">Question About a Property</option> <option value="otro">Other</option> </select> </div> <div> <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
Message *
</label> <textarea id="message" name="message" rows="5" required class="input resize-none" placeholder="Write your message here..."></textarea> </div> <div class="flex items-start gap-3"> <input type="checkbox" id="privacy" name="privacy" required class="mt-1"> <label for="privacy" class="text-sm text-gray-600">
I accept the <a href="/en/privacy" class="text-primary-600 hover:underline">privacy policy</a>
and the processing of my data to respond to this inquiry.
</label> </div> <button type="submit" class="btn-primary w-full justify-center">
Send Message
</button> </form> </div> </div> </div> <!-- Quick FAQ --> <div class="mt-16"> <h2 class="text-2xl font-semibold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div class="card p-6"> <h3 class="font-semibold text-gray-900 mb-2">How do I list a property?</h3> <p class="text-gray-600 text-sm">
Register as an agent, independent, or owner, and follow the steps to upload your property with photos and details.
</p> </div> <div class="card p-6"> <h3 class="font-semibold text-gray-900 mb-2">How much does it cost to list?</h3> <p class="text-gray-600 text-sm">
Owners can list their first properties for free. Agents and agencies have affordable monthly plans.
</p> </div> <div class="card p-6"> <h3 class="font-semibold text-gray-900 mb-2">How do I contact an agent?</h3> <p class="text-gray-600 text-sm">
Each property shows the agent or owner's contact details. You can reach them via WhatsApp, phone, or form.
</p> </div> <div class="card p-6"> <h3 class="font-semibold text-gray-900 mb-2">Does the portal charge commission?</h3> <p class="text-gray-600 text-sm">
No. PropiedadEnRD.com only charges for listing. Sale/rental commissions are negotiated directly with the agent.
</p> </div> </div> </div> </div> </div> </section> ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/en/contact.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/en/contact.astro";
const $$url = "/en/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
