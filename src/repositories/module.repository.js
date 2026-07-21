// Acesso à tabela "modules".
import { pool } from '../config/db.js';

const FIELDS = 'id, name, description, course_id, "order", created_at, updated_at';

// Cria um módulo. Se "order" não for informado, usa o próximo da sequência do curso.
export const createModule = async ({ name, description, course_id, order }) => {
    let ordem = order;
    if (ordem === undefined || ordem === null) {
        const r = await pool.query(
            'SELECT COALESCE(MAX("order"), 0) + 1 AS next FROM "modules" WHERE course_id = $1 AND deleted_at IS NULL',
            [course_id]
        );
        ordem = r.rows[0].next;
    }
    const query = `
        INSERT INTO "modules" (name, description, course_id, "order")
        VALUES ($1, $2, $3, $4)
        RETURNING ${FIELDS};
    `;
    const res = await pool.query(query, [name, description, course_id, ordem]);
    return res.rows[0];
};

// Busca módulo por id.
export const findById = async (id) => {
    const res = await pool.query(`SELECT ${FIELDS} FROM "modules" WHERE id = $1 AND deleted_at IS NULL`, [id]);
    return res.rows[0];
};

// Lista os módulos de um curso, ordenados.
export const findByCourse = async (courseId) => {
    const res = await pool.query(
        `SELECT ${FIELDS} FROM "modules" WHERE course_id = $1 AND deleted_at IS NULL ORDER BY "order" ASC`,
        [courseId]
    );
    return res.rows;
};

// Atualiza um módulo dinamicamente.
export const updateModule = async (id, fields) => {
    const allowed = ['name', 'description', 'order'];
    const sets = [];
    const values = [];
    for (const key of allowed) {
        if (fields[key] !== undefined) {
            values.push(fields[key]);
            // "order" é palavra reservada, precisa de aspas
            sets.push(`${key === 'order' ? '"order"' : key} = $${values.length}`);
        }
    }
    if (sets.length === 0) return findById(id);
    sets.push('updated_at = NOW()');
    values.push(id);
    const query = `UPDATE "modules" SET ${sets.join(', ')} WHERE id = $${values.length} AND deleted_at IS NULL RETURNING ${FIELDS}`;
    const res = await pool.query(query, values);
    return res.rows[0];
};

// Exclusão lógica do módulo.
export const softDelete = async (id) => {
    const res = await pool.query(
        'UPDATE "modules" SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL RETURNING id',
        [id]
    );
    return res.rowCount > 0;
};

export default { createModule, findById, findByCourse, updateModule, softDelete };
