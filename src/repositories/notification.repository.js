// Acesso à tabela "notifications".
import { pool } from '../config/db.js';

// Cria uma notificação para um usuário.
export const createNotification = async ({ user_id, title, message, type = 'info' }) => {
    const res = await pool.query(
        `INSERT INTO "notifications" (user_id, title, message, type)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [user_id, title, message, type]
    );
    return res.rows[0];
};

// Lista notificações de um usuário.
export const findByUser = async (userId) => {
    const res = await pool.query(
        'SELECT * FROM "notifications" WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
    );
    return res.rows;
};

// Marca uma notificação como lida (garantindo que pertence ao usuário).
export const markAsRead = async (id, userId) => {
    const res = await pool.query(
        'UPDATE "notifications" SET read = TRUE WHERE id = $1 AND user_id = $2 RETURNING *',
        [id, userId]
    );
    return res.rows[0];
};

// Conta notificações não lidas.
export const countUnread = async (userId) => {
    const res = await pool.query(
        'SELECT COUNT(*)::int AS total FROM "notifications" WHERE user_id = $1 AND read = FALSE',
        [userId]
    );
    return res.rows[0].total;
};

export default { createNotification, findByUser, markAsRead, countUnread };
