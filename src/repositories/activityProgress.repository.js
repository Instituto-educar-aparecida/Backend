// Acesso à tabela "activity_progress".
import { pool } from '../config/db.js';

// Registra/atualiza a submissão de uma atividade por um aluno (upsert).
// Ao submeter atividade só com questões objetivas, a correção é automática (status GRADED).
export const submit = async ({ student_id, activity_id, grade = null, status = 'SUBMITTED' }) => {
    const res = await pool.query(
        `INSERT INTO "activity_progress" (student_id, activity_id, status, grade, submitted_at, updated_at)
         VALUES ($1, $2, $3, $4, NOW(), NOW())
         ON CONFLICT (student_id, activity_id) DO UPDATE
         SET status = EXCLUDED.status, grade = EXCLUDED.grade, submitted_at = NOW(), updated_at = NOW()
         RETURNING *`,
        [student_id, activity_id, status, grade]
    );
    return res.rows[0];
};

// Obtém o progresso de uma atividade para um aluno.
export const getProgress = async (studentId, activityId) => {
    const res = await pool.query(
        'SELECT * FROM "activity_progress" WHERE student_id = $1 AND activity_id = $2',
        [studentId, activityId]
    );
    return res.rows[0];
};

// Atribui uma nota manualmente (correção de questões abertas pelo instrutor).
export const grade = async (studentId, activityId, grade) => {
    const res = await pool.query(
        `UPDATE "activity_progress" SET grade = $1, status = 'GRADED', updated_at = NOW()
         WHERE student_id = $2 AND activity_id = $3 RETURNING *`,
        [grade, studentId, activityId]
    );
    return res.rows[0];
};

export default { submit, getProgress, grade };
