// Acesso à tabela "course_reviews".
import { pool } from '../config/db.js';

// Cria/atualiza a avaliação de um curso por um aluno (upsert - 1 por aluno/curso).
export const upsertReview = async (studentId, courseId, rating, comment = null) => {
    const res = await pool.query(
        `INSERT INTO "course_reviews" (student_id, course_id, rating, comment)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (student_id, course_id) DO UPDATE
         SET rating = EXCLUDED.rating, comment = EXCLUDED.comment, updated_at = NOW()
         RETURNING *`,
        [studentId, courseId, rating, comment]
    );
    return res.rows[0];
};

// Lista avaliações de um curso (com nome do aluno).
export const findByCourse = async (courseId) => {
    const res = await pool.query(
        `SELECT r.id, r.rating, r.comment, r.created_at, u.name AS student_name
         FROM "course_reviews" r
         JOIN "users" u ON u.id = r.student_id
         WHERE r.course_id = $1
         ORDER BY r.created_at DESC`,
        [courseId]
    );
    return res.rows;
};

// Média de avaliações de um curso.
export const averageByCourse = async (courseId) => {
    const res = await pool.query(
        `SELECT ROUND(AVG(rating), 2) AS average, COUNT(*)::int AS total
         FROM "course_reviews" WHERE course_id = $1`,
        [courseId]
    );
    return res.rows[0];
};

export default { upsertReview, findByCourse, averageByCourse };
