/* empty css                                    */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { c as getAlternateUrls, $ as $$Layout, u as useTranslations } from '../../chunks/Layout_DaFjIure.mjs';
export { renderers } from '../../renderers.mjs';

const $$Terms = createComponent(($$result, $$props, $$slots) => {
  const t = useTranslations("en");
  const alternateUrls = getAlternateUrls("/en/terms");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Terms and Conditions | PropiedadEnRD.com", "description": "PropiedadEnRD.com's terms of use. Read the conditions governing the use of our real estate portal.", "keywords": "terms of use, conditions, propiedadenrd", "alternateLanguages": alternateUrls }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="bg-gray-100 py-4"> <div class="container-custom"> <nav class="flex text-sm text-gray-600"> <a href="/en" class="hover:text-primary-600">${t.nav.home}</a> <span class="mx-2">/</span> <span class="text-gray-900 font-medium">${t.footer.terms}</span> </nav> </div> </div> <section class="section"> <div class="container-custom"> <div class="max-w-4xl mx-auto"> <h1 class="text-4xl font-bold text-gray-900 mb-8">Terms and Conditions</h1> <div class="prose prose-lg max-w-none"> <p class="lead">
Welcome to PropiedadEnRD.com. By using our website, you accept these terms and conditions
            in their entirety. Please read them carefully before using the portal.
</p> <h2>1. Definitions</h2> <ul> <li><strong>"Portal":</strong> refers to the PropiedadEnRD.com website</li> <li><strong>"User":</strong> any person who accesses or uses the Portal</li> <li><strong>"Agent":</strong> real estate professional registered on the Portal</li> <li><strong>"Owner":</strong> property owner who publishes on the Portal</li> <li><strong>"Content":</strong> all information, images, and materials published</li> </ul> <h2>2. Service Description</h2> <p>
PropiedadEnRD.com is a platform that facilitates the connection between property seekers
            and agents/owners who offer them. The Portal does not participate in transactions
            between parties, nor does it guarantee the accuracy of published information.
</p> <h2>3. Account Registration</h2> <p>
To publish properties, you must create an account. You agree to:
</p> <ul> <li>Provide accurate and up-to-date information</li> <li>Maintain the security of your credentials</li> <li>Immediately notify any unauthorized access</li> <li>Be responsible for all activities under your account</li> </ul> <h2>4. Published Content</h2> <p>Users who publish properties agree that:</p> <ul> <li>They have the right to publish the offered property</li> <li>The information and photos are real and current</li> <li>They will not publish misleading, fraudulent, or illegal content</li> <li>Prices and conditions reflect reality</li> </ul> <h2>5. Prohibited Uses</h2> <p>You may not use the Portal to:</p> <ul> <li>Publish false, misleading, or fraudulent properties</li> <li>Send unsolicited spam or advertising</li> <li>Scrape or extract data without authorization</li> <li>Interfere with the Portal's operation</li> <li>Violate the rights of third parties</li> </ul> <h2>6. Fees and Payments</h2> <p>
PropiedadEnRD.com offers free and paid services. Paid plans will be clearly indicated
            with their prices before contracting. We do not charge commissions on transactions
            between users.
</p> <h2>7. Disclaimer</h2> <p>
The Portal acts only as an intermediary facilitating contact. We are not responsible for:
</p> <ul> <li>The quality, legality, or actual availability of properties</li> <li>Transactions or agreements between users</li> <li>Losses arising from the use of the Portal</li> <li>Service interruptions or technical failures</li> </ul> <h2>8. Intellectual Property</h2> <p>
All Portal content, including design, logos, and code, is the property of PropiedadEnRD.com
            or its licensors. Reproduction or use without authorization is prohibited.
</p> <h2>9. Modifications</h2> <p>
We reserve the right to modify these terms at any time. Changes will be posted on the
            Portal and will take effect immediately. Continued use of the Portal constitutes
            acceptance of the changes.
</p> <h2>10. Governing Law</h2> <p>
These terms are governed by the laws of the Dominican Republic. Any dispute will be
            resolved in the courts of Santo Domingo.
</p> <h2>11. Contact</h2> <p>
For questions about these terms:
</p> <ul> <li>Email: legal@propiedadenrd.com</li> <li>Address: Santo Domingo, Dominican Republic</li> </ul> <p class="text-sm text-gray-500 mt-12">
Last updated: January 2026
</p> </div> </div> </div> </section> ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/en/terms.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/en/terms.astro";
const $$url = "/en/terms";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Terms,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
