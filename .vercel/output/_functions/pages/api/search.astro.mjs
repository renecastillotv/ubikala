import { g as getProperties, a as getPropertiesCount } from '../../chunks/db_DCp7snH9.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") || "";
    const tipo = url.searchParams.get("tipo") || void 0;
    const operacion = url.searchParams.get("operacion") || void 0;
    const ciudad = url.searchParams.get("ciudad") || void 0;
    const minPrice = url.searchParams.get("minPrice") ? parseInt(url.searchParams.get("minPrice")) : void 0;
    const maxPrice = url.searchParams.get("maxPrice") ? parseInt(url.searchParams.get("maxPrice")) : void 0;
    const habitaciones = url.searchParams.get("habitaciones") ? parseInt(url.searchParams.get("habitaciones")) : void 0;
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "20"), 100);
    const offset = parseInt(url.searchParams.get("offset") || "0");
    const searchCity = q || ciudad;
    const [properties, total] = await Promise.all([
      getProperties({
        limit,
        offset,
        tipo,
        operacion,
        ciudad: searchCity,
        minPrice,
        maxPrice,
        habitaciones
      }),
      getPropertiesCount({ tipo, operacion, ciudad: searchCity })
    ]);
    return new Response(JSON.stringify({
      success: true,
      data: properties,
      query: {
        q,
        tipo,
        operacion,
        ciudad,
        minPrice,
        maxPrice,
        habitaciones
      },
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + properties.length < total,
        pages: Math.ceil(total / limit),
        currentPage: Math.floor(offset / limit) + 1
      }
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=30, s-maxage=60"
      }
    });
  } catch (error) {
    console.error("Search API Error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Error en la búsqueda"
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
