// Acesso à tabela "activities".
import { pool } from '../config/db.js';

const FIELDS = 'id, title, module_id, status, minimum_grade, deadline, question_count, created_at, updated_at';

// Cria uma atividade.
export const createActivity = async ({ title, module_id, status = 'DRAFT', minimum_grade = 0, deadline = null }) => {
    const res = await pool.query(
        `INSERT INTO "activities" (title, module_id, status, minimum_grade, deadline)
         VALUES ($1, $2, $3, $4, $5) RETURNING ${FIELDS}`,
        [title, module_id, status, minimum_grade, deadline]
    );
    return res.rows[0];
};

// Busca atividade por id.
export const findById = async (id) => {
    const res = await pool.query(`SELECT ${FIELDS} FROM "activities" WHERE id = $1 AND deleted_at IS NULL`, [id]);
    return res.rows[0];
};

// Lista atividades de um módulo.
export const findByModule = async (moduleId) => {
    const res = await pool.query(
        `SELECT ${FIELDS} FROM "activities" WHERE module_id = $1 AND deleted_at IS NULL ORDER BY created_at ASC`,
        [moduleId]
    );
    return res.rows;
};

// Atualiza uma atividade dinamicamente.
export const updateActivity = async (id, fields) => {
    const allowed = ['title', 'status', 'minimum_grade', 'deadline'];
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
    const res = await pool.query(
        `UPDATE "activities" SET ${sets.join(', ')} WHERE id = $${values.length} AND deleted_at IS NULL RETURNING ${FIELDS}`,
        values
    );
    return res.rows[0];
};

// Exclusão lógica.
export const softDelete = async (id) => {
    const res = await pool.query(
        'UPDATE "activities" SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL RETURNING id',
        [id]
    );
    return res.rowCount > 0;
};

// Recalcula e atualiza o contador de questões da atividade.
export const refreshQuestionCount = async (id) => {
    const res = await pool.query(
        `UPDATE "activities" SET question_count = (
            (SELECT COUNT(*) FROM "objective_questions" WHERE activity_id = $1) +
            (SELECT COUNT(*) FROM "open_questions" WHERE activity_id = $1)
         ), updated_at = NOW()
         WHERE id = $1 RETURNING question_count`,
        [id]
    );
    return res.rows[0]?.question_count ?? 0;
};

export default { createActivity, findById, findByModule, updateActivity, softDelete, refreshQuestionCount };
