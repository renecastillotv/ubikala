import { h as getLocationBySlug, i as getPropertiesByLocation } from '../../../chunks/db_DCp7snH9.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GET = async ({ params, request }) => {
  try {
    const { slug } = params;
    const url = new URL(request.url);
    const includeProperties = url.searchParams.get("includeProperties") === "true";
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "20"), 100);
    const offset = parseInt(url.searchParams.get("offset") || "0");
    if (!slug) {
      return new Response(JSON.stringify({
        success: false,
        error: "Slug requerido"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const location = await getLocationBySlug(slug);
    if (!location) {
      return new Response(JSON.stringify({
        success: false,
        error: "Ubicación no encontrada"
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    let properties = null;
    if (includeProperties) {
      properties = await getPropertiesByLocation(slug, limit, offset);
    }
    return new Response(JSON.stringify({
      success: true,
      data: {
        ...location,
        ...properties && { properties }
      }
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
      error: "Error al obtener la ubicación"
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
