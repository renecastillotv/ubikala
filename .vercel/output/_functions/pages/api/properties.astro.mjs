import { g as getProperties, a as getPropertiesCount } from '../../chunks/db_DCp7snH9.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "20"), 100);
    const offset = parseInt(url.searchParams.get("offset") || "0");
    const tipo = url.searchParams.get("tipo") || void 0;
    const operacion = url.searchParams.get("operacion") || void 0;
    const ciudad = url.searchParams.get("ciudad") || void 0;
    const minPrice = url.searchParams.get("minPrice") ? parseInt(url.searchParams.get("minPrice")) : void 0;
    const maxPrice = url.searchParams.get("maxPrice") ? parseInt(url.searchParams.get("maxPrice")) : void 0;
    const habitaciones = url.searchParams.get("habitaciones") ? parseInt(url.searchParams.get("habitaciones")) : void 0;
    const destacado = url.searchParams.get("destacado") === "true";
    const [properties, total] = await Promise.all([
      getProperties({
        limit,
        offset,
        tipo,
        operacion,
        ciudad,
        minPrice,
        maxPrice,
        habitaciones,
        destacado: destacado || void 0
      }),
      getPropertiesCount({ tipo, operacion, ciudad })
    ]);
    return new Response(JSON.stringify({
      success: true,
      data: properties,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + properties.length < total
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
      error: "Error al obtener propiedades"
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
