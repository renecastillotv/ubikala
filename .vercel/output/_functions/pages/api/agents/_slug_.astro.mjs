import { b as getAgentBySlug, c as getAgentProperties } from '../../../chunks/db_DCp7snH9.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GET = async ({ params, request }) => {
  try {
    const { slug } = params;
    const url = new URL(request.url);
    const includeProperties = url.searchParams.get("includeProperties") === "true";
    if (!slug) {
      return new Response(JSON.stringify({
        success: false,
        error: "Slug requerido"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const agent = await getAgentBySlug(slug);
    if (!agent) {
      return new Response(JSON.stringify({
        success: false,
        error: "Agente no encontrado"
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    let properties = null;
    if (includeProperties) {
      properties = await getAgentProperties(agent.id);
    }
    return new Response(JSON.stringify({
      success: true,
      data: {
        ...agent,
        ...properties && { properties }
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
      error: "Error al obtener el agente"
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
