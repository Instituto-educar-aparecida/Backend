// Acesso à tabela "lesson_progress".
// Corrigido para usar os campos reais do schema: student_id, watch_seconds,
// status (enum progress_status) e completed_at.
import { pool } from '../config/db.js';

// Salva/atualiza o progresso de uma aula para um aluno (upsert).
export const saveProgress = async ({ student_id, lesson_id, watch_seconds = 0, status = 'IN_PROGRESS' }) => {
    const completedAt = status === 'COMPLETED' ? 'NOW()' : 'NULL';
    const query = `
        INSERT INTO "lesson_progress" (student_id, lesson_id, watch_seconds, status, completed_at, updated_at)
        VALUES ($1, $2, $3, $4, ${completedAt}, NOW())
        ON CONFLICT (student_id, lesson_id) DO UPDATE
        SET watch_seconds = EXCLUDED.watch_seconds,
            status = EXCLUDED.status,
            completed_at = ${completedAt},
            updated_at = NOW()
        RETURNING *;
    `;
    const res = await pool.query(query, [student_id, lesson_id, watch_seconds, status]);
    return res.rows[0];
};

// Obtém o progresso de uma aula específica para um aluno.
export const getProgress = async (studentId, lessonId) => {
    const res = await pool.query(
        'SELECT * FROM "lesson_progress" WHERE student_id = $1 AND lesson_id = $2',
        [studentId, lessonId]
    );
    return res.rows[0];
};

// Lista as aulas concluídas por um aluno.
export const getCompleted = async (studentId) => {
    const res = await pool.query(
        `SELECT * FROM "lesson_progress" WHERE student_id = $1 AND status = 'COMPLETED'`,
        [studentId]
    );
    return res.rows;
};

// Conta quantas aulas de um curso o aluno concluiu (para cálculo de progresso).
export const countCompletedByCourse = async (studentId, courseId) => {
    const res = await pool.query(
        `SELECT COUNT(lp.id)::int AS total
         FROM "lesson_progress" lp
         JOIN "lessons" l ON l.id = lp.lesson_id
         JOIN "modules" m ON m.id = l.module_id
         WHERE lp.student_id = $1 AND m.course_id = $2 AND lp.status = 'COMPLETED'`,
        [studentId, courseId]
    );
    return res.rows[0].total;
};

export default { saveProgress, getProgress, getCompleted, countCompletedByCourse };
