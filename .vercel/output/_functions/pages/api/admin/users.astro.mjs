import { d as getAllUsers, m as createUser, l as logActivity } from '../../../chunks/ubikala-db_C_z4BDxl.mjs';
import { h as hashPassword } from '../../../chunks/auth_Db3PMkBi.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ locals }) => {
  const user = locals.user;
  if (!user || user.role !== "admin") {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 403,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const users = await getAllUsers();
    return new Response(JSON.stringify({ users }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Error al obtener usuarios" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const POST = async ({ request, locals }) => {
  const user = locals.user;
  if (!user || user.role !== "admin") {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 403,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const body = await request.json();
    const { email, password, name, role, phone } = body;
    if (!email || !password || !name || !role) {
      return new Response(JSON.stringify({ error: "Faltan campos requeridos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!["admin", "agent"].includes(role)) {
      return new Response(JSON.stringify({ error: "Rol inválido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const password_hash = await hashPassword(password);
    const newUser = await createUser({
      email,
      password_hash,
      name,
      role,
      phone
    });
    await logActivity({
      user_id: user.id,
      action: "user_created",
      entity_type: "user",
      entity_id: newUser.id,
      details: { email: newUser.email, role: newUser.role }
    });
    const { password_hash: _, ...safeUser } = newUser;
    return new Response(JSON.stringify({ user: safeUser }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.message?.includes("unique") || error.code === "23505") {
      return new Response(JSON.stringify({ error: "El email ya está registrado" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ error: "Error al crear usuario" }), {
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
