// Repositório de usuários. Acesso à tabela "users".
import { pool } from '../config/db.js';

// Campos públicos padrão (sem o hash da senha).
const PUBLIC_FIELDS = 'id, name, email, role, avatar_url, bio, phone, active, created_at, updated_at';

// Cria um novo usuário e retorna seus dados públicos.
export const createUser = async ({ name, email, passwordHash, role, phone = null, bio = null, avatarUrl = null }) => {
    const query = `
        INSERT INTO "users" (name, email, password_hash, role, phone, bio, avatar_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING ${PUBLIC_FIELDS};
    `;
    const values = [name, email, passwordHash, role, phone, bio, avatarUrl];
    const res = await pool.query(query, values);
    return res.rows[0];
};

// Busca usuário por e-mail incluindo o hash (usado no login).
export const findByEmail = async (email) => {
    const query = 'SELECT id, name, email, password_hash, role, active FROM "users" WHERE email = $1 AND deleted_at IS NULL';
    const res = await pool.query(query, [email]);
    return res.rows[0];
};

// Busca usuário por id (dados públicos).
export const findById = async (id) => {
    const query = `SELECT ${PUBLIC_FIELDS} FROM "users" WHERE id = $1 AND deleted_at IS NULL`;
    const res = await pool.query(query, [id]);
    return res.rows[0];
};

// Lista todos os usuários ativos (não excluídos), com filtro opcional por papel.
export const listUsers = async ({ role = null } = {}) => {
    let query = `SELECT ${PUBLIC_FIELDS} FROM "users" WHERE deleted_at IS NULL`;
    const values = [];
    if (role) {
        values.push(role);
        query += ` AND role = $${values.length}`;
    }
    query += ' ORDER BY created_at DESC';
    const res = await pool.query(query, values);
    return res.rows;
};

// Atualiza dinamicamente os campos permitidos do usuário.
export const updateUser = async (id, fields) => {
    const allowed = ['name', 'email', 'role', 'avatar_url', 'bio', 'phone', 'active'];
    const sets = [];
    const values = [];

    for (const key of allowed) {
        if (fields[key] !== undefined) {
            values.push(fields[key]);
            sets.push(`${key} = $${values.length}`);
        }
    }

    if (sets.length === 0) return findById(id);

    sets.push('updated_at = NOW()');
    values.push(id);

    const query = `
        UPDATE "users" SET ${sets.join(', ')}
        WHERE id = $${values.length} AND deleted_at IS NULL
        RETURNING ${PUBLIC_FIELDS};
    `;
    const res = await pool.query(query, values);
    return res.rows[0];
};

// Atualiza o hash de senha de um usuário.
export const updatePassword = async (id, passwordHash) => {
    const query = 'UPDATE "users" SET password_hash = $1, updated_at = NOW() WHERE id = $2 RETURNING id';
    const res = await pool.query(query, [passwordHash, id]);
    return res.rows[0];
};

// Ativa/desativa (bloqueia) um usuário.
export const setActive = async (id, active) => {
    const query = `UPDATE "users" SET active = $1, updated_at = NOW() WHERE id = $2 AND deleted_at IS NULL RETURNING ${PUBLIC_FIELDS}`;
    const res = await pool.query(query, [active, id]);
    return res.rows[0];
};

// Exclusão lógica (soft delete) do usuário.
export const softDelete = async (id) => {
    const query = 'UPDATE "users" SET deleted_at = NOW(), active = FALSE WHERE id = $1 AND deleted_at IS NULL RETURNING id';
    const res = await pool.query(query, [id]);
    return res.rowCount > 0;
};

export default {
    createUser, findByEmail, findById, listUsers, updateUser, updatePassword, setActive, softDelete,
};
