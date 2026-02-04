/* empty css                                    */
import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import { c as getAlternateUrls, $ as $$Layout, u as useTranslations } from '../../chunks/Layout_DaFjIure.mjs';
export { renderers } from '../../renderers.mjs';

const $$Confidentialite = createComponent(($$result, $$props, $$slots) => {
  const t = useTranslations("fr");
  const alternateUrls = getAlternateUrls("/fr/confidentialite");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Politique de Confidentialit\xE9 | PropiedadEnRD.com", "description": "Politique de confidentialit\xE9 de PropiedadEnRD.com. D\xE9couvrez comment nous collectons, utilisons et prot\xE9geons vos donn\xE9es personnelles.", "keywords": "politique confidentialit\xE9, protection donn\xE9es, propiedadenrd", "alternateLanguages": alternateUrls }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="bg-gray-100 py-4"> <div class="container-custom"> <nav class="flex text-sm text-gray-600"> <a href="/fr" class="hover:text-primary-600">${t.nav.home}</a> <span class="mx-2">/</span> <span class="text-gray-900 font-medium">${t.footer.privacy}</span> </nav> </div> </div> <section class="section"> <div class="container-custom"> <div class="max-w-4xl mx-auto"> <h1 class="text-4xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1> <div class="prose prose-lg max-w-none"> <p class="lead">
Chez PropiedadEnRD.com, nous nous engageons à protéger la confidentialité et la sécurité des données personnelles de nos utilisateurs.
            Cette politique décrit comment nous collectons, utilisons et protégeons vos informations.
</p> <h2>1. Responsable du Traitement</h2> <p>
PropiedadEnRD.com, domicilié à Saint-Domingue, République Dominicaine, est responsable du traitement
            de vos données personnelles via ce site web.
</p> <h2>2. Informations que Nous Collectons</h2> <p>Nous pouvons collecter les types d'informations suivants:</p> <ul> <li><strong>Données d'identification:</strong> nom, email, numéro de téléphone</li> <li><strong>Données de profil:</strong> photos, descriptions de propriétés, accréditations professionnelles</li> <li><strong>Données d'utilisation:</strong> historique de recherche, propriétés sauvegardées, préférences</li> <li><strong>Données techniques:</strong> adresse IP, type d'appareil, navigateur, localisation géographique</li> </ul> <h2>3. Comment Nous Utilisons Vos Données</h2> <p>Nous utilisons les informations collectées pour:</p> <ul> <li>Fournir et maintenir nos services</li> <li>Faciliter le contact entre chercheurs de propriétés et agents/propriétaires</li> <li>Envoyer des communications et mises à jour pertinentes</li> <li>Améliorer et personnaliser l'expérience utilisateur</li> <li>Respecter les obligations légales et réglementaires</li> </ul> <h2>4. Partage d'Informations</h2> <p>
Nous ne vendons pas vos informations personnelles à des tiers. Nous partageons des informations uniquement dans les
            circonstances suivantes:
</p> <ul> <li>Avec les agents/propriétaires lorsque vous les contactez pour une propriété</li> <li>Avec les prestataires de services qui nous aident à exploiter le portail</li> <li>Lorsque requis par la loi ou une procédure légale</li> </ul> <h2>5. Sécurité des Données</h2> <p>
Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos
            données personnelles contre l'accès non autorisé, l'altération, la divulgation ou la destruction.
</p> <h2>6. Vos Droits</h2> <p>Vous avez le droit de:</p> <ul> <li>Accéder à vos données personnelles</li> <li>Corriger les données inexactes</li> <li>Demander la suppression de vos données</li> <li>Vous opposer à certains types de traitement</li> <li>Porter vos données vers un autre service</li> </ul> <h2>7. Cookies</h2> <p>
Nous utilisons des cookies et technologies similaires pour améliorer l'expérience utilisateur, analyser le trafic du site,
            et personnaliser le contenu. Vous pouvez configurer les préférences de votre navigateur pour gérer les cookies.
</p> <h2>8. Modifications de la Politique</h2> <p>
Nous pouvons mettre à jour cette politique de confidentialité périodiquement. Les changements significatifs seront notifiés
            via le site web ou par email.
</p> <h2>9. Contact</h2> <p>
Pour des questions ou demandes concernant vos données personnelles, contactez-nous à:
</p> <ul> <li>Email: privacy@propiedadenrd.com</li> <li>Adresse: Saint-Domingue, République Dominicaine</li> </ul> <p class="text-sm text-gray-500 mt-12">
Dernière mise à jour: Janvier 2026
</p> </div> </div> </div> </section> ` })}`;
}, "D:/portal PropiedadEnRD.com/src/pages/fr/confidentialite.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/fr/confidentialite.astro";
const $$url = "/fr/confidentialite";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Confidentialite,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
