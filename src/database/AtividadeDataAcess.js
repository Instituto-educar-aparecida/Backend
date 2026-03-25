import { pool } from './UserDataAcess.js';

export const addAtividade = async (atividade) => {
  try {
    const query = 'INSERT INTO "atividade" (titulo, materia_id, professor_id, status) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [atividade.titulo, atividade.materia_id, atividade.professor_id, atividade.status];
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch(err) {
    console.error("addAtividade:", err.message);
    throw err;
  }
};

export const removeAtividade = async (id) => {
  try { 
    const query = 'DELETE FROM "atividade" WHERE id = $1';
    const res = await pool.query(query, [id]);
    return res.rowCount > 0;
  } catch(err) {
    console.error("removeAtividade:", err.message);
    throw err;
  }
};
