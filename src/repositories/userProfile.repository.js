// Acesso à tabela "user_profiles".
import { pool } from '../config/db.js';

// Cria/atualiza o perfil estendido do usuário (upsert por user_id).
export const upsertProfile = async (userId, { bio = null, phone = null, avatar_url = null }) => {
    const res = await pool.query(
        `INSERT INTO "user_profiles" (user_id, bio, phone, avatar_url)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (user_id) DO UPDATE
         SET bio = EXCLUDED.bio, phone = EXCLUDED.phone, avatar_url = EXCLUDED.avatar_url, updated_at = NOW()
         RETURNING *`,
        [userId, bio, phone, avatar_url]
    );
    return res.rows[0];
};

// Busca o perfil de um usuário.
export const findByUser = async (userId) => {
    const res = await pool.query('SELECT * FROM "user_profiles" WHERE user_id = $1', [userId]);
    return res.rows[0];
};

export default { upsertProfile, findByUser };
