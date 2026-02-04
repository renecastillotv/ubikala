import { j as getLocations } from '../../chunks/db_DCp7snH9.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const nivel = url.searchParams.get("nivel") ? parseInt(url.searchParams.get("nivel")) : void 0;
    const parentId = url.searchParams.get("parentId") ? parseInt(url.searchParams.get("parentId")) : void 0;
    const locations = await getLocations({ nivel, parentId });
    return new Response(JSON.stringify({
      success: true,
      data: locations
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300, s-maxage=3600"
      }
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Error al obtener ubicaciones"
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
