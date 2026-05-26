import { pool } from './UserDataAcess.js';

export const saveProgress = async (progresso) => {
  try {
    const query = ` 
      INSERT INTO "lesson_progress" (user_id, lesson_id, current_time, duration, percentage, completed, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      ON CONFLICT (user_id, lesson_id) DO UPDATE 
      SET current_time = $3, duration = $4, percentage = $5, completed = $6, updated_at = NOW()
      RETURNING *;
    `;
    const values = [progresso.user_id, progresso.lesson_id, progresso.current_time, progresso.duration, progresso.percentage, progresso.completed];
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch(err) {
    console.error("saveProgress:", err.message);
    throw err;
  }
};

export const getProgress = async (user_id, lesson_id) => {
  try {
    const query = 'SELECT * FROM "lesson_progress" WHERE user_id = $1 AND lesson_id = $2';
    const res = await pool.query(query, [user_id, lesson_id]);
    return res.rows[0];
  } catch(err) {
    console.error("getProgress:", err.message);
    throw err;
  }
};

export const getCompleted = async (user_id) => {
  try {
    const query = 'SELECT * FROM "lesson_progress" WHERE user_id = $1 AND completed = true';
    const res = await pool.query(query, [user_id]);
    return res.rows;
  } catch(err) {
    console.error("getCompleted:", err.message);
    throw err;
  }
};

