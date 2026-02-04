import { i as getUserById, j as deleteUser, l as logActivity, k as updateUser } from '../../../../chunks/ubikala-db_C_z4BDxl.mjs';
import { h as hashPassword } from '../../../../chunks/auth_Db3PMkBi.mjs';
export { renderers } from '../../../../renderers.mjs';

const GET = async ({ params, locals }) => {
  const currentUser = locals.user;
  if (!currentUser || currentUser.role !== "admin") {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 403,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const user = await getUserById(params.id);
    if (!user) {
      return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { password_hash, ...safeUser } = user;
    return new Response(JSON.stringify({ user: safeUser }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(JSON.stringify({ error: "Error al obtener usuario" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const PUT = async ({ params, request, locals }) => {
  const currentUser = locals.user;
  if (!currentUser || currentUser.role !== "admin") {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 403,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const body = await request.json();
    const { email, password, name, role, phone, is_active } = body;
    const updateData = {};
    if (email) updateData.email = email;
    if (name) updateData.name = name;
    if (role && ["admin", "agent"].includes(role)) updateData.role = role;
    if (phone !== void 0) updateData.phone = phone;
    if (is_active !== void 0) updateData.is_active = is_active;
    if (password) updateData.password_hash = await hashPassword(password);
    const updatedUser = await updateUser(params.id, updateData);
    if (!updatedUser) {
      return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    await logActivity({
      user_id: currentUser.id,
      action: "user_updated",
      entity_type: "user",
      entity_id: params.id,
      details: { fields: Object.keys(updateData) }
    });
    const { password_hash, ...safeUser } = updatedUser;
    return new Response(JSON.stringify({ user: safeUser }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error updating user:", error);
    if (error.message?.includes("unique") || error.code === "23505") {
      return new Response(JSON.stringify({ error: "El email ya está registrado" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ error: "Error al actualizar usuario" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const DELETE = async ({ params, locals }) => {
  const currentUser = locals.user;
  if (!currentUser || currentUser.role !== "admin") {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 403,
      headers: { "Content-Type": "application/json" }
    });
  }
  if (params.id === currentUser.id) {
    return new Response(JSON.stringify({ error: "No puedes eliminar tu propia cuenta" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const user = await getUserById(params.id);
    if (!user) {
      return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    await deleteUser(params.id);
    await logActivity({
      user_id: currentUser.id,
      action: "user_deleted",
      entity_type: "user",
      entity_id: params.id,
      details: { email: user.email }
    });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(JSON.stringify({ error: "Error al eliminar usuario" }), {
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
