// Acesso à tabela "user_sessions".
// Usado para controle de logout/refresh token.
import { pool } from '../config/db.js';

// Cria uma sessão (refresh token) para o usuário.
export const createSession = async (userId, refreshToken, expiresAt) => {
    const res = await pool.query(
        `INSERT INTO "user_sessions" (user_id, refresh_token, expires_at)
         VALUES ($1, $2, $3) RETURNING *`,
        [userId, refreshToken, expiresAt]
    );
    return res.rows[0];
};

// Busca uma sessão ativa pelo refresh token.
export const findActive = async (refreshToken) => {
    const res = await pool.query(
        `SELECT * FROM "user_sessions"
         WHERE refresh_token = $1 AND used = FALSE AND expires_at > NOW()`,
        [refreshToken]
    );
    return res.rows[0];
};

// Invalida (encerra) uma sessão específica — usado no logout.
export const invalidate = async (refreshToken) => {
    const res = await pool.query(
        'UPDATE "user_sessions" SET used = TRUE WHERE refresh_token = $1 RETURNING id',
        [refreshToken]
    );
    return res.rowCount > 0;
};

// Invalida todas as sessões de um usuário (logout global).
export const invalidateAllForUser = async (userId) => {
    await pool.query('UPDATE "user_sessions" SET used = TRUE WHERE user_id = $1 AND used = FALSE', [userId]);
};

export default { createSession, findActive, invalidate, invalidateAllForUser };
