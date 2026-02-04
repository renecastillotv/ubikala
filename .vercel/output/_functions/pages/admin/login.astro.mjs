/* empty css                                    */
import { e as createAstro, f as createComponent, n as renderHead, o as renderScript, r as renderTemplate } from '../../chunks/astro/server_CULxlDpc.mjs';
import 'piccolore';
import 'clsx';
import { g as getTokenFromRequest, a as getCurrentUser } from '../../chunks/auth_Db3PMkBi.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://ubikala.com");
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const token = getTokenFromRequest(Astro2.request);
  if (token) {
    const user = await getCurrentUser(token);
    if (user) {
      return Astro2.redirect("/admin/dashboard");
    }
  }
  return renderTemplate`<html lang="es" data-astro-cid-rf56lckb> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="robots" content="noindex, nofollow"><title>Iniciar Sesión | Ubikala Admin</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=block" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-rf56lckb> <div class="login-container" data-astro-cid-rf56lckb> <div class="logo" data-astro-cid-rf56lckb> <h1 data-astro-cid-rf56lckb>Ubikala</h1> <p data-astro-cid-rf56lckb>Panel de Administración</p> </div> <div id="error-message" class="error-message" data-astro-cid-rf56lckb></div> <form id="login-form" data-astro-cid-rf56lckb> <div class="form-group" data-astro-cid-rf56lckb> <label for="email" data-astro-cid-rf56lckb>Correo Electrónico</label> <input type="email" id="email" name="email" required placeholder="admin@ubikala.com" data-astro-cid-rf56lckb> </div> <div class="form-group" data-astro-cid-rf56lckb> <label for="password" data-astro-cid-rf56lckb>Contraseña</label> <input type="password" id="password" name="password" required placeholder="••••••••" data-astro-cid-rf56lckb> </div> <button type="submit" class="btn" id="submit-btn" data-astro-cid-rf56lckb>
Iniciar Sesión
</button> </form> <a href="/" class="back-link" data-astro-cid-rf56lckb>← Volver al portal</a> </div> ${renderScript($$result, "D:/portal PropiedadEnRD.com/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "D:/portal PropiedadEnRD.com/src/pages/admin/login.astro", void 0);

const $$file = "D:/portal PropiedadEnRD.com/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
