import { g as getTokenFromRequest, b as logoutUser, d as createLogoutCookie } from '../../../../chunks/auth_Db3PMkBi.mjs';
export { renderers } from '../../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const token = getTokenFromRequest(request);
    const ip_address = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || void 0;
    if (token) {
      await logoutUser(token, ip_address);
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": createLogoutCookie()
      }
    });
  } catch (error) {
    console.error("Logout error:", error);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
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
