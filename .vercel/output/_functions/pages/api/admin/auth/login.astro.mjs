import { l as loginUser, c as createAuthCookie } from '../../../../chunks/auth_Db3PMkBi.mjs';
import { u as ubikalaDb } from '../../../../chunks/ubikala-db_C_z4BDxl.mjs';
export { renderers } from '../../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    if (!ubikalaDb) {
      console.error("UBIKALA_DATABASE_URL not configured");
      return new Response(JSON.stringify({
        error: "Base de datos no configurada. Verifica UBIKALA_DATABASE_URL en Vercel."
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email y contraseña son requeridos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const ip_address = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || void 0;
    const user_agent = request.headers.get("user-agent") || void 0;
    const result = await loginUser(email, password, ip_address, user_agent);
    if (!result) {
      return new Response(JSON.stringify({ error: "Credenciales inválidas" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ user: result.user }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": createAuthCookie(result.token)
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({
      error: `Error: ${error.message || "Error interno del servidor"}`
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
