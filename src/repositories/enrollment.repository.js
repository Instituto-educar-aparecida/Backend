// Acesso à tabela "enrollments".
import { pool } from '../config/db.js';

// Cria uma matrícula. Se já existir (mesmo aluno/curso) e estiver cancelada, reativa.
export const enroll = async (studentId, courseId) => {
    const query = `
        INSERT INTO "enrollments" (student_id, course_id, status, started_at)
        VALUES ($1, $2, 'ACTIVE', NOW())
        ON CONFLICT (student_id, course_id) DO UPDATE
        SET status = 'ACTIVE', started_at = COALESCE("enrollments".started_at, NOW()), updated_at = NOW()
        RETURNING *;
    `;
    const res = await pool.query(query, [studentId, courseId]);
    return res.rows[0];
};

// Cancela a matrícula de um aluno em um curso.
export const cancel = async (studentId, courseId) => {
    const res = await pool.query(
        `UPDATE "enrollments" SET status = 'CANCELLED', updated_at = NOW()
         WHERE student_id = $1 AND course_id = $2 RETURNING *`,
        [studentId, courseId]
    );
    return res.rows[0];
};

// Busca uma matrícula específica.
export const findOne = async (studentId, courseId) => {
    const res = await pool.query(
        'SELECT * FROM "enrollments" WHERE student_id = $1 AND course_id = $2',
        [studentId, courseId]
    );
    return res.rows[0];
};

// Lista os cursos matriculados de um aluno (com dados do curso).
export const findByStudent = async (studentId) => {
    const res = await pool.query(
        `SELECT e.id AS enrollment_id, e.status, e.progress_percent, e.started_at, e.completed_at,
                c.id AS course_id, c.title, c.description, c.thumbnail_url, c.workload_hours, c.status AS course_status
         FROM "enrollments" e
         JOIN "courses" c ON c.id = e.course_id
         WHERE e.student_id = $1 AND c.deleted_at IS NULL
         ORDER BY e.created_at DESC`,
        [studentId]
    );
    return res.rows;
};

// Atualiza o percentual de progresso e marca como concluída se atingir 100%.
export const updateProgress = async (studentId, courseId, percent) => {
    const status = percent >= 100 ? 'COMPLETED' : 'ACTIVE';
    const completedAt = percent >= 100 ? 'NOW()' : 'NULL';
    const res = await pool.query(
        `UPDATE "enrollments"
         SET progress_percent = $1, status = $2, completed_at = ${completedAt}, updated_at = NOW()
         WHERE student_id = $3 AND course_id = $4 RETURNING *`,
        [percent, status, studentId, courseId]
    );
    return res.rows[0];
};

// Conta matrículas ativas de um aluno.
export const countActiveByStudent = async (studentId) => {
    const res = await pool.query(
        `SELECT COUNT(*)::int AS total FROM "enrollments" WHERE student_id = $1 AND status = 'ACTIVE'`,
        [studentId]
    );
    return res.rows[0].total;
};

export default { enroll, cancel, findOne, findByStudent, updateProgress, countActiveByStudent };
