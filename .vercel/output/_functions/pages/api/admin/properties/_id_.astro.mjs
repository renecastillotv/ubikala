import { b as getUbikalaPropertyById, e as deleteProperty, l as logActivity, f as updateProperty } from '../../../../chunks/ubikala-db_C_z4BDxl.mjs';
export { renderers } from '../../../../renderers.mjs';

const GET = async ({ params }) => {
  try {
    const property = await getUbikalaPropertyById(params.id);
    if (!property) {
      return new Response(JSON.stringify({ error: "Propiedad no encontrada" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ property }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching property:", error);
    return new Response(JSON.stringify({ error: "Error al obtener propiedad" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const PUT = async ({ params, request, locals }) => {
  const user = locals.user;
  if (!user) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const body = await request.json();
    const property = await getUbikalaPropertyById(params.id);
    if (!property) {
      return new Response(JSON.stringify({ error: "Propiedad no encontrada" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (user.role !== "admin" && property.created_by !== user.id) {
      return new Response(JSON.stringify({ error: "No tienes permiso para editar esta propiedad" }), {
        status: 403,
        headers: { "Content-Type": "application/json" }
      });
    }
    const updatedProperty = await updateProperty(params.id, body);
    await logActivity({
      user_id: user.id,
      action: "property_updated",
      entity_type: "property",
      entity_id: params.id,
      details: { fields: Object.keys(body) }
    });
    return new Response(JSON.stringify({ property: updatedProperty }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error updating property:", error);
    if (error.message?.includes("unique") || error.code === "23505") {
      return new Response(JSON.stringify({ error: "Ya existe una propiedad con ese slug" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ error: "Error al actualizar propiedad" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const DELETE = async ({ params, locals }) => {
  const user = locals.user;
  if (!user) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const property = await getUbikalaPropertyById(params.id);
    if (!property) {
      return new Response(JSON.stringify({ error: "Propiedad no encontrada" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (user.role !== "admin" && property.created_by !== user.id) {
      return new Response(JSON.stringify({ error: "No tienes permiso para eliminar esta propiedad" }), {
        status: 403,
        headers: { "Content-Type": "application/json" }
      });
    }
    await deleteProperty(params.id);
    await logActivity({
      user_id: user.id,
      action: "property_deleted",
      entity_type: "property",
      entity_id: params.id,
      details: { titulo: property.titulo }
    });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error deleting property:", error);
    return new Response(JSON.stringify({ error: "Error al eliminar propiedad" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
