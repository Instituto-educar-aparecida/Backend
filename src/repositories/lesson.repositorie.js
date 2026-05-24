import { pool } from "./user.repositorie.js";

export const addQuestaoAberta = async (id_atividade, imagem, numero, descricao) => {
  try {
    const query = `
      INSERT INTO "questao_aberta" (id_atividade, imagem, numero, descricao)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;

    const values = [id_atividade, imagem, numero, descricao];
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error("addQuestaoAberta:", err.message);
    throw err;
  }
};

export const updateQuestaoAberta = async (id, dados) => {
  try {
    const query = `
      UPDATE "questao_aberta"
      SET imagem = $1,
          numero = $2,
          descricao = $3
      WHERE id = $4
      RETURNING * `;
    const values = [dados.imagem, dados.numero, dados.descricao, id];
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error("updateQuestaoAberta:", err.message);
    throw err;
  }
};

export const removeQuestaoAberta = async (id) => {
  try {
    const query = 'DELETE FROM "questao_aberta" WHERE id = $1';
    const res = await pool.query(query, [id]);
    return res.rowCount > 0;
  } catch (err) {
    console.error("removeQuestaoAberta:", err.message);
    throw err;
  }
};

export const addQuestaoObjetiva = async (id_atividade, imagem, numero, descricao, alternativa, alternativa_correta) => {
  try {
    const query = `
      INSERT INTO "questao_objetiva" (id_atividade, imagem, numero, descricao, alternativa, alternativa_correta)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`;

    const values = [id_atividade, imagem, numero, descricao, JSON.stringify(alternativa), alternativa_correta];
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error("addQuestaoObjetiva:", err.message);
    throw err;
  }
};

export const updateQuestaoObjetiva = async (id, dados) => {
  try {
    const query = `
      UPDATE "questao_objetiva"
      SET imagem = $1,
          numero = $2,
          descricao = $3,
          alternativa = $4,
          alternativa_correta = $5
      WHERE id = $6
      RETURNING * `;
    const values = [dados.imagem, dados.numero, dados.descricao, JSON.stringify(dados.alternativa), dados.alternativa_correta, id];
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    console.error("updateQuestaoObjetiva:", err.message);
    throw err;
  }
};

export const removeQuestaoObjetiva = async (id) => {
  try {
    const query = 'DELETE FROM "questao_objetiva" WHERE id = $1';
    const res = await pool.query(query, [id]);
    return res.rowCount > 0;
  } catch (err) {
    console.error("removeQuestaoObjetiva:", err.message);
    throw err;
  }
};