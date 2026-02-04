/* empty css                                 */
import { e as createAstro, f as createComponent } from '../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://ubikala.com");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const user = Astro2.locals.user;
  if (user) {
    return Astro2.redirect("/admin/dashboard");
  } else {
    return Astro2.redirect("/admin/login");
  }
}, "D:/portal PropiedadEnRD.com/src/pages/admin/index.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
