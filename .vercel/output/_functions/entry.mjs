import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Da5KaSea.mjs';
import { manifest } from './manifest_KkZ_cz4N.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/activity.astro.mjs');
const _page2 = () => import('./pages/admin/dashboard.astro.mjs');
const _page3 = () => import('./pages/admin/login.astro.mjs');
const _page4 = () => import('./pages/admin/properties/create.astro.mjs');
const _page5 = () => import('./pages/admin/properties/_id_.astro.mjs');
const _page6 = () => import('./pages/admin/properties.astro.mjs');
const _page7 = () => import('./pages/admin/users.astro.mjs');
const _page8 = () => import('./pages/admin.astro.mjs');
const _page9 = () => import('./pages/alquilar.astro.mjs');
const _page10 = () => import('./pages/api/admin/auth/login.astro.mjs');
const _page11 = () => import('./pages/api/admin/auth/logout.astro.mjs');
const _page12 = () => import('./pages/api/admin/auth/me.astro.mjs');
const _page13 = () => import('./pages/api/admin/diagnostic.astro.mjs');
const _page14 = () => import('./pages/api/admin/properties/_id_.astro.mjs');
const _page15 = () => import('./pages/api/admin/properties.astro.mjs');
const _page16 = () => import('./pages/api/admin/users/_id_.astro.mjs');
const _page17 = () => import('./pages/api/admin/users.astro.mjs');
const _page18 = () => import('./pages/api/agents/_slug_.astro.mjs');
const _page19 = () => import('./pages/api/agents.astro.mjs');
const _page20 = () => import('./pages/api/featured.astro.mjs');
const _page21 = () => import('./pages/api/locations/_slug_.astro.mjs');
const _page22 = () => import('./pages/api/locations.astro.mjs');
const _page23 = () => import('./pages/api/properties/_slug_.astro.mjs');
const _page24 = () => import('./pages/api/properties.astro.mjs');
const _page25 = () => import('./pages/api/search.astro.mjs');
const _page26 = () => import('./pages/asesor/_slug_.astro.mjs');
const _page27 = () => import('./pages/asesores.astro.mjs');
const _page28 = () => import('./pages/buscar.astro.mjs');
const _page29 = () => import('./pages/comprar/_type_.astro.mjs');
const _page30 = () => import('./pages/comprar.astro.mjs');
const _page31 = () => import('./pages/contacto.astro.mjs');
const _page32 = () => import('./pages/en/about.astro.mjs');
const _page33 = () => import('./pages/en/agents.astro.mjs');
const _page34 = () => import('./pages/en/buy.astro.mjs');
const _page35 = () => import('./pages/en/contact.astro.mjs');
const _page36 = () => import('./pages/en/list.astro.mjs');
const _page37 = () => import('./pages/en/privacy.astro.mjs');
const _page38 = () => import('./pages/en/rent.astro.mjs');
const _page39 = () => import('./pages/en/search.astro.mjs');
const _page40 = () => import('./pages/en/terms.astro.mjs');
const _page41 = () => import('./pages/en.astro.mjs');
const _page42 = () => import('./pages/favoritos.astro.mjs');
const _page43 = () => import('./pages/fr/a-propos.astro.mjs');
const _page44 = () => import('./pages/fr/acheter.astro.mjs');
const _page45 = () => import('./pages/fr/agents.astro.mjs');
const _page46 = () => import('./pages/fr/conditions.astro.mjs');
const _page47 = () => import('./pages/fr/confidentialite.astro.mjs');
const _page48 = () => import('./pages/fr/contact.astro.mjs');
const _page49 = () => import('./pages/fr/louer.astro.mjs');
const _page50 = () => import('./pages/fr/publier.astro.mjs');
const _page51 = () => import('./pages/fr/recherche.astro.mjs');
const _page52 = () => import('./pages/fr.astro.mjs');
const _page53 = () => import('./pages/guias/documentos-compra-venta.astro.mjs');
const _page54 = () => import('./pages/guias/extranjeros-comprando-rd.astro.mjs');
const _page55 = () => import('./pages/guias/fideicomiso-inmobiliario.astro.mjs');
const _page56 = () => import('./pages/guias/impuestos-inmobiliarios.astro.mjs');
const _page57 = () => import('./pages/guias/invertir-punta-cana.astro.mjs');
const _page58 = () => import('./pages/guias/proceso-compra-propiedad.astro.mjs');
const _page59 = () => import('./pages/guias.astro.mjs');
const _page60 = () => import('./pages/login.astro.mjs');
const _page61 = () => import('./pages/nosotros.astro.mjs');
const _page62 = () => import('./pages/privacidad.astro.mjs');
const _page63 = () => import('./pages/propiedad/_slug_.astro.mjs');
const _page64 = () => import('./pages/propiedades/_location_.astro.mjs');
const _page65 = () => import('./pages/propiedades.astro.mjs');
const _page66 = () => import('./pages/publicar.astro.mjs');
const _page67 = () => import('./pages/terminos.astro.mjs');
const _page68 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/activity/index.astro", _page1],
    ["src/pages/admin/dashboard.astro", _page2],
    ["src/pages/admin/login.astro", _page3],
    ["src/pages/admin/properties/create.astro", _page4],
    ["src/pages/admin/properties/[id].astro", _page5],
    ["src/pages/admin/properties/index.astro", _page6],
    ["src/pages/admin/users/index.astro", _page7],
    ["src/pages/admin/index.astro", _page8],
    ["src/pages/alquilar/index.astro", _page9],
    ["src/pages/api/admin/auth/login.ts", _page10],
    ["src/pages/api/admin/auth/logout.ts", _page11],
    ["src/pages/api/admin/auth/me.ts", _page12],
    ["src/pages/api/admin/diagnostic.ts", _page13],
    ["src/pages/api/admin/properties/[id].ts", _page14],
    ["src/pages/api/admin/properties/index.ts", _page15],
    ["src/pages/api/admin/users/[id].ts", _page16],
    ["src/pages/api/admin/users/index.ts", _page17],
    ["src/pages/api/agents/[slug].ts", _page18],
    ["src/pages/api/agents.ts", _page19],
    ["src/pages/api/featured.ts", _page20],
    ["src/pages/api/locations/[slug].ts", _page21],
    ["src/pages/api/locations.ts", _page22],
    ["src/pages/api/properties/[slug].ts", _page23],
    ["src/pages/api/properties.ts", _page24],
    ["src/pages/api/search.ts", _page25],
    ["src/pages/asesor/[slug].astro", _page26],
    ["src/pages/asesores.astro", _page27],
    ["src/pages/buscar.astro", _page28],
    ["src/pages/comprar/[type].astro", _page29],
    ["src/pages/comprar/index.astro", _page30],
    ["src/pages/contacto.astro", _page31],
    ["src/pages/en/about.astro", _page32],
    ["src/pages/en/agents.astro", _page33],
    ["src/pages/en/buy.astro", _page34],
    ["src/pages/en/contact.astro", _page35],
    ["src/pages/en/list.astro", _page36],
    ["src/pages/en/privacy.astro", _page37],
    ["src/pages/en/rent.astro", _page38],
    ["src/pages/en/search.astro", _page39],
    ["src/pages/en/terms.astro", _page40],
    ["src/pages/en/index.astro", _page41],
    ["src/pages/favoritos.astro", _page42],
    ["src/pages/fr/a-propos.astro", _page43],
    ["src/pages/fr/acheter.astro", _page44],
    ["src/pages/fr/agents.astro", _page45],
    ["src/pages/fr/conditions.astro", _page46],
    ["src/pages/fr/confidentialite.astro", _page47],
    ["src/pages/fr/contact.astro", _page48],
    ["src/pages/fr/louer.astro", _page49],
    ["src/pages/fr/publier.astro", _page50],
    ["src/pages/fr/recherche.astro", _page51],
    ["src/pages/fr/index.astro", _page52],
    ["src/pages/guias/documentos-compra-venta.astro", _page53],
    ["src/pages/guias/extranjeros-comprando-rd.astro", _page54],
    ["src/pages/guias/fideicomiso-inmobiliario.astro", _page55],
    ["src/pages/guias/impuestos-inmobiliarios.astro", _page56],
    ["src/pages/guias/invertir-punta-cana.astro", _page57],
    ["src/pages/guias/proceso-compra-propiedad.astro", _page58],
    ["src/pages/guias/index.astro", _page59],
    ["src/pages/login.astro", _page60],
    ["src/pages/nosotros.astro", _page61],
    ["src/pages/privacidad.astro", _page62],
    ["src/pages/propiedad/[slug].astro", _page63],
    ["src/pages/propiedades/[location].astro", _page64],
    ["src/pages/propiedades/index.astro", _page65],
    ["src/pages/publicar.astro", _page66],
    ["src/pages/terminos.astro", _page67],
    ["src/pages/index.astro", _page68]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "3c790749-3f37-4066-9e1b-cb99ab3943a6",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
