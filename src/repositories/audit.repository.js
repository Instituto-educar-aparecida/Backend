// Repositório de auditoria e logs de sistema.
// Acesso às tabelas "audit_logs" e "system_logs".
import { pool } from '../config/db.js';

// Registra uma ação administrativa/sensível na auditoria.
export const logAction = async ({ user_id = null, action, entity, entity_id = null, details = null, ip_address = null }) => {
    try {
        const res = await pool.query(
            `INSERT INTO "audit_logs" (user_id, action, entity, entity_id, details, ip_address)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [user_id, action, entity, entity_id, details ? JSON.stringify(details) : null, ip_address]
        );
        return res.rows[0];
    } catch (err) {
        // Auditoria nunca deve quebrar o fluxo principal.
        return null;
    }
};

// Lista os logs de auditoria (mais recentes primeiro), com paginação simples.
export const listAudit = async ({ limit = 100, offset = 0 } = {}) => {
    const res = await pool.query(
        `SELECT a.*, u.name AS user_name
         FROM "audit_logs" a
         LEFT JOIN "users" u ON u.id = a.user_id
         ORDER BY a.created_at DESC
         LIMIT $1 OFFSET $2`,
        [limit, offset]
    );
    return res.rows;
};

// Persiste um log de sistema.
export const logSystem = async (level, message, context = null) => {
    try {
        await pool.query(
            'INSERT INTO "system_logs" (level, message, context) VALUES ($1, $2, $3)',
            [level, message, context ? JSON.stringify(context) : null]
        );
    } catch (err) {
        // Ignora falhas de logging para não interromper a aplicação.
    }
};

export default { logAction, listAudit, logSystem };
