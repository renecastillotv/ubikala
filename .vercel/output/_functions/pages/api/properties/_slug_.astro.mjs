import { k as getPropertyBySlug } from '../../../chunks/db_DCp7snH9.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GET = async ({ params }) => {
  try {
    const { slug } = params;
    if (!slug) {
      return new Response(JSON.stringify({
        success: false,
        error: "Slug requerido"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const property = await getPropertyBySlug(slug);
    if (!property) {
      return new Response(JSON.stringify({
        success: false,
        error: "Propiedad no encontrada"
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({
      success: true,
      data: property
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
      error: "Error al obtener la propiedad"
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
