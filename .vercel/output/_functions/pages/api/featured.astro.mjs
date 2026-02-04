import { e as getRecentProperties, f as getFeaturedProperties } from '../../chunks/db_DCp7snH9.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || "featured";
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "6"), 24);
    let properties;
    if (type === "recent") {
      properties = await getRecentProperties(limit);
    } else {
      properties = await getFeaturedProperties(limit);
    }
    return new Response(JSON.stringify({
      success: true,
      data: properties,
      type
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60, s-maxage=300"
      }
    });
  } catch (error) {
    console.error("Featured API Error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Error al obtener propiedades destacadas"
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
