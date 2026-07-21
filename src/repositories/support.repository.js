// Acesso às tabelas "support_tickets" e "support_ticket_messages".
import { pool } from '../config/db.js';

// Abre um chamado de suporte.
export const createTicket = async ({ user_id, subject, message }) => {
    const res = await pool.query(
        `INSERT INTO "support_tickets" (user_id, subject, message, status)
         VALUES ($1, $2, $3, 'OPEN') RETURNING *`,
        [user_id, subject, message]
    );
    return res.rows[0];
};

// Lista chamados. Se userId for informado, filtra pelos chamados do usuário;
// caso contrário (staff), retorna todos.
export const listTickets = async ({ userId = null } = {}) => {
    if (userId) {
        const res = await pool.query(
            'SELECT * FROM "support_tickets" WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );
        return res.rows;
    }
    const res = await pool.query(
        `SELECT t.*, u.name AS user_name, u.email AS user_email
         FROM "support_tickets" t JOIN "users" u ON u.id = t.user_id
         ORDER BY t.created_at DESC`
    );
    return res.rows;
};

// Busca um chamado por id.
export const findById = async (id) => {
    const res = await pool.query('SELECT * FROM "support_tickets" WHERE id = $1', [id]);
    return res.rows[0];
};

// Atualiza o status de um chamado.
export const updateStatus = async (id, status) => {
    const res = await pool.query(
        'UPDATE "support_tickets" SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
        [status, id]
    );
    return res.rows[0];
};

// Adiciona uma mensagem a um chamado.
export const addMessage = async (ticketId, userId, message) => {
    const res = await pool.query(
        'INSERT INTO "support_ticket_messages" (ticket_id, user_id, message) VALUES ($1, $2, $3) RETURNING *',
        [ticketId, userId, message]
    );
    return res.rows[0];
};

// Lista as mensagens de um chamado.
export const getMessages = async (ticketId) => {
    const res = await pool.query(
        'SELECT * FROM "support_ticket_messages" WHERE ticket_id = $1 ORDER BY created_at ASC',
        [ticketId]
    );
    return res.rows;
};

export default { createTicket, listTickets, findById, updateStatus, addMessage, getMessages };
