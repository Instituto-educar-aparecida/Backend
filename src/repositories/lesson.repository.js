// Acesso à tabela "lessons".
import { pool } from '../config/db.js';

const FIELDS = 'id, title, description, duration_seconds, video_url, module_id, teacher_id, created_at, updated_at';

// Cria uma aula.
export const createLesson = async ({ title, description, duration_seconds, video_url, module_id, teacher_id }) => {
    const query = `
        INSERT INTO "lessons" (title, description, duration_seconds, video_url, module_id, teacher_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING ${FIELDS};
    `;
    const res = await pool.query(query, [title, description, duration_seconds, video_url, module_id, teacher_id]);
    return res.rows[0];
};

// Busca aula por id.
export const findById = async (id) => {
    const res = await pool.query(`SELECT ${FIELDS} FROM "lessons" WHERE id = $1 AND deleted_at IS NULL`, [id]);
    return res.rows[0];
};

// Lista aulas de um módulo.
export const findByModule = async (moduleId) => {
    const res = await pool.query(
        `SELECT ${FIELDS} FROM "lessons" WHERE module_id = $1 AND deleted_at IS NULL ORDER BY created_at ASC`,
        [moduleId]
    );
    return res.rows;
};

// Atualiza uma aula dinamicamente.
export const updateLesson = async (id, fields) => {
    const allowed = ['title', 'description', 'duration_seconds', 'video_url'];
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
    const query = `UPDATE "lessons" SET ${sets.join(', ')} WHERE id = $${values.length} AND deleted_at IS NULL RETURNING ${FIELDS}`;
    const res = await pool.query(query, values);
    return res.rows[0];
};

// Exclusão lógica da aula.
export const softDelete = async (id) => {
    const res = await pool.query(
        'UPDATE "lessons" SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL RETURNING id',
        [id]
    );
    return res.rowCount > 0;
};

// Conta o total de aulas de um curso (usado no cálculo de progresso).
export const countByCourse = async (courseId) => {
    const res = await pool.query(
        `SELECT COUNT(l.id)::int AS total
         FROM "lessons" l
         JOIN "modules" m ON m.id = l.module_id
         WHERE m.course_id = $1 AND l.deleted_at IS NULL AND m.deleted_at IS NULL`,
        [courseId]
    );
    return res.rows[0].total;
};

// ---- Textos de apoio (lesson_support_texts) ----

export const addSupportText = async (lessonId, content) => {
    const res = await pool.query(
        'INSERT INTO "lesson_support_texts" (content, lesson_id) VALUES ($1, $2) RETURNING *',
        [content, lessonId]
    );
    return res.rows[0];
};

export const getSupportTexts = async (lessonId) => {
    const res = await pool.query('SELECT * FROM "lesson_support_texts" WHERE lesson_id = $1 ORDER BY created_at ASC', [lessonId]);
    return res.rows;
};

// ---- Arquivos de aula (lesson_files) ----

export const addFile = async (lessonId, { title, file_url, type = null, size = null }) => {
    const res = await pool.query(
        'INSERT INTO "lesson_files" (title, file_url, type, size, lesson_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [title, file_url, type, size, lessonId]
    );
    return res.rows[0];
};

export const getFiles = async (lessonId) => {
    const res = await pool.query('SELECT * FROM "lesson_files" WHERE lesson_id = $1 ORDER BY created_at ASC', [lessonId]);
    return res.rows;
};

// Lista todas as aulas de um curso com o progresso do aluno, ordenadas por módulo e criação.
export const findByCourseWithProgress = async (courseId, studentId) => {
    const res = await pool.query(
        `SELECT l.id, l.title, l.description, l.video_url, l.duration_seconds, l.module_id,
                m."order" AS module_order,
                lp.status AS progress_status,
                lp.completed_at
         FROM "lessons" l
         JOIN "modules" m ON m.id = l.module_id
         LEFT JOIN "lesson_progress" lp ON lp.lesson_id = l.id AND lp.student_id = $2
         WHERE m.course_id = $1 AND l.deleted_at IS NULL AND m.deleted_at IS NULL
         ORDER BY m."order" ASC, l.created_at ASC`,
        [courseId, studentId]
    );
    return res.rows;
};

export default {
    createLesson, findById, findByModule, updateLesson, softDelete, countByCourse,
    addSupportText, getSupportTexts, addFile, getFiles, findByCourseWithProgress,
};
