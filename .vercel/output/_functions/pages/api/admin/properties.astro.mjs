import { c as getUbikalaProperties, h as createProperty, l as logActivity } from '../../../chunks/ubikala-db_C_z4BDxl.mjs';
export { renderers } from '../../../renderers.mjs';

function generateSlug(titulo) {
  return titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-") + "-" + Date.now().toString(36);
}
const GET = async ({ url }) => {
  try {
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const offset = parseInt(url.searchParams.get("offset") || "0");
    const activo = url.searchParams.get("activo") !== "false";
    const properties = await getUbikalaProperties({ limit, offset, activo });
    return new Response(JSON.stringify({ properties }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return new Response(JSON.stringify({ error: "Error al obtener propiedades" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const POST = async ({ request, locals }) => {
  const user = locals.user;
  if (!user) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const body = await request.json();
    if (!body.titulo || !body.tipo || !body.operacion || !body.precio) {
      return new Response(JSON.stringify({ error: "Faltan campos requeridos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const slug = body.slug || generateSlug(body.titulo);
    const property = await createProperty({
      ...body,
      slug,
      created_by: user.id
    });
    await logActivity({
      user_id: user.id,
      action: "property_created",
      entity_type: "property",
      entity_id: property.id,
      details: { titulo: property.titulo, slug: property.slug }
    });
    return new Response(JSON.stringify({ property }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error creating property:", error);
    if (error.message?.includes("unique") || error.code === "23505") {
      return new Response(JSON.stringify({ error: "Ya existe una propiedad con ese slug" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ error: "Error al crear propiedad" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
