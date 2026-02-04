import { d as getAgents } from '../../chunks/db_DCp7snH9.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "20"), 100);
    const offset = parseInt(url.searchParams.get("offset") || "0");
    const zona = url.searchParams.get("zona") || void 0;
    const agents = await getAgents({ limit, offset, zona });
    return new Response(JSON.stringify({
      success: true,
      data: agents,
      pagination: {
        limit,
        offset,
        count: agents.length
      }
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60, s-maxage=300"
      }
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Error al obtener agentes"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const POST = async () => {
  return new Response(JSON.stringify({
    success: false,
    error: "Método no permitido"
  }), {
    status: 405,
    headers: { "Content-Type": "application/json" }
  });
};
const PUT = async () => {
  return new Response(JSON.stringify({
    success: false,
    error: "Método no permitido"
  }), {
    status: 405,
    headers: { "Content-Type": "application/json" }
  });
};
const DELETE = async () => {
  return new Response(JSON.stringify({
    success: false,
    error: "Método no permitido"
  }), {
    status: 405,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST,
  PUT,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
