// Acesso à tabela "password_resets".
import { pool } from '../config/db.js';

// Cria um token de reset de senha com expiração.
export const createToken = async (userId, token, expiresAt) => {
    const res = await pool.query(
        `INSERT INTO "password_resets" (user_id, token, expires_at)
         VALUES ($1, $2, $3) RETURNING *`,
        [userId, token, expiresAt]
    );
    return res.rows[0];
};

// Busca um token válido (não usado e não expirado).
export const findValidToken = async (token) => {
    const res = await pool.query(
        `SELECT * FROM "password_resets"
         WHERE token = $1 AND used = FALSE AND expires_at > NOW()`,
        [token]
    );
    return res.rows[0];
};

// Marca o token como usado.
export const markUsed = async (id) => {
    await pool.query('UPDATE "password_resets" SET used = TRUE WHERE id = $1', [id]);
};

// Invalida tokens anteriores de um usuário (opcional, boa prática).
export const invalidateForUser = async (userId) => {
    await pool.query('UPDATE "password_resets" SET used = TRUE WHERE user_id = $1 AND used = FALSE', [userId]);
};

export default { createToken, findValidToken, markUsed, invalidateForUser };
