// Acesso às tabelas "objective_questions" e "open_questions".
import { pool } from '../config/db.js';

// ---- Questões objetivas ----

export const addObjective = async (activityId, { description, image_url = null, option_1, option_2, option_3, option_4, option_5 = null, correct_option }) => {
    const res = await pool.query(
        `INSERT INTO "objective_questions"
         (activity_id, description, image_url, option_1, option_2, option_3, option_4, option_5, correct_option)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
        [activityId, description, image_url, option_1, option_2, option_3, option_4, option_5, correct_option]
    );
    return res.rows[0];
};

export const getObjectiveByActivity = async (activityId) => {
    const res = await pool.query('SELECT * FROM "objective_questions" WHERE activity_id = $1 ORDER BY id ASC', [activityId]);
    return res.rows;
};

// ---- Questões abertas ----

export const addOpen = async (activityId, { description, image_url = null }) => {
    const res = await pool.query(
        `INSERT INTO "open_questions" (activity_id, description, image_url)
         VALUES ($1, $2, $3) RETURNING *`,
        [activityId, description, image_url]
    );
    return res.rows[0];
};

export const getOpenByActivity = async (activityId) => {
    const res = await pool.query('SELECT * FROM "open_questions" WHERE activity_id = $1 ORDER BY id ASC', [activityId]);
    return res.rows;
};

export default { addObjective, getObjectiveByActivity, addOpen, getOpenByActivity };
