// Acesso à tabela "courses".
import { pool } from '../config/db.js';

const FIELDS = `id, title, description, syllabus, program_content, prerequisites,
    target_audience, certification_info, workload_hours, thumbnail_url, status,
    featured, enrollment_open, instructor_id, created_at, updated_at`;

// Cria um novo curso.
export const createCourse = async (data) => {
    const query = `
        INSERT INTO "courses"
        (title, description, syllabus, program_content, prerequisites, target_audience,
         certification_info, workload_hours, thumbnail_url, status, featured, enrollment_open, instructor_id)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
        RETURNING ${FIELDS};
    `;
    const values = [
        data.title, data.description, data.syllabus, data.program_content,
        data.prerequisites ?? null, data.target_audience ?? null, data.certification_info ?? null,
        data.workload_hours, data.thumbnail_url ?? null, data.status ?? 'PENDING',
        data.featured ?? false, data.enrollment_open ?? true, data.instructor_id,
    ];
    const res = await pool.query(query, values);
    return res.rows[0];
};

// Busca curso por id (não excluído).
export const findById = async (id) => {
    const res = await pool.query(
        `SELECT ${FIELDS} FROM "courses" WHERE id = $1 AND deleted_at IS NULL`,
        [id]
    );
    return res.rows[0];
};

// Lista/pesquisa cursos com filtros opcionais (catálogo público).
// filtros: { search, status, featured, instructorId, onlyOpen }
export const listCourses = async (filtros = {}) => {
    const conditions = ['deleted_at IS NULL'];
    const values = [];

    if (filtros.search) {
        values.push(`%${filtros.search}%`);
        conditions.push(`(LOWER(title) LIKE LOWER($${values.length}) OR LOWER(description) LIKE LOWER($${values.length}))`);
    }
    if (filtros.status) {
        values.push(filtros.status);
        conditions.push(`status = $${values.length}`);
    }
    if (filtros.featured !== undefined) {
        values.push(filtros.featured);
        conditions.push(`featured = $${values.length}`);
    }
    if (filtros.instructorId) {
        values.push(filtros.instructorId);
        conditions.push(`instructor_id = $${values.length}`);
    }
    if (filtros.onlyOpen === true) {
        conditions.push('enrollment_open = TRUE');
    }

    const query = `
        SELECT ${FIELDS},
            (SELECT COUNT(*) FROM "enrollments" e WHERE e.course_id = courses.id AND e.status <> 'CANCELLED') AS enrollment_count,
            (SELECT ROUND(AVG(rating), 2) FROM "course_reviews" r WHERE r.course_id = courses.id) AS average_rating
        FROM "courses"
        WHERE ${conditions.join(' AND ')}
        ORDER BY featured DESC, created_at DESC;
    `;
    const res = await pool.query(query, values);
    return res.rows;
};

// Atualiza informações do curso dinamicamente.
export const updateCourse = async (id, fields) => {
    const allowed = ['title', 'description', 'syllabus', 'program_content', 'prerequisites',
        'target_audience', 'certification_info', 'workload_hours', 'thumbnail_url', 'enrollment_open'];
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
        UPDATE "courses" SET ${sets.join(', ')}
        WHERE id = $${values.length} AND deleted_at IS NULL
        RETURNING ${FIELDS};
    `;
    const res = await pool.query(query, values);
    return res.rows[0];
};

// Altera o status do curso (aprovar, arquivar, rejeitar, etc.).
export const updateStatus = async (id, status) => {
    const res = await pool.query(
        `UPDATE "courses" SET status = $1, updated_at = NOW() WHERE id = $2 AND deleted_at IS NULL RETURNING ${FIELDS}`,
        [status, id]
    );
    return res.rows[0];
};

// Define se o curso está em destaque.
export const updateFeatured = async (id, featured) => {
    const res = await pool.query(
        `UPDATE "courses" SET featured = $1, updated_at = NOW() WHERE id = $2 AND deleted_at IS NULL RETURNING ${FIELDS}`,
        [featured, id]
    );
    return res.rows[0];
};

// Exclusão lógica do curso.
export const softDelete = async (id) => {
    const res = await pool.query(
        'UPDATE "courses" SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL RETURNING id',
        [id]
    );
    return res.rowCount > 0;
};

export default {
    createCourse, findById, listCourses, updateCourse, updateStatus, updateFeatured, softDelete,
};
