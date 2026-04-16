import { pool } from "../UserDataAcess.js";

export const addModulo = async (modulo) => {
    try {
        const query = `
            INSERT INTO "modulo"
            (nome, descricao, curso_id)
            VALUES ($1,$2,$3)
            RETURNING *`;

        const values = [
            modulo.nome,
            modulo.descricao ?? null,
            modulo.curso_id
        ];

        const res = await pool.query(query, values);
        return res.rows[0];

    } catch (err) {
        console.error("Erro ao inserir módulo:", err.message);
        throw err;
    }
};

export const removeModulo = async (id) => {
    try {
        const query = 'DELETE FROM "modulo" WHERE id = $1';
        const res = await pool.query(query, [id]);
        return res.rowCount > 0;

    } catch (err) {
        console.error("Erro ao remover módulo:", err.message);
        throw err;
    }
};

export const updateModulo = async (modulo) => {
    try {
        const query = `
            UPDATE "modulo"
            SET nome = $1,
                descricao = $2
            WHERE id = $3
            RETURNING *`;

        const values = [
            modulo.nome,
            modulo.descricao ?? null,
            modulo.id
        ];

        const res = await pool.query(query, values);
        return res.rows[0];

    } catch (err) {
        console.error("Erro ao atualizar módulo:", err.message);
        throw err;
    }
};

export const getModuloById = async (id) => {
    try {
        const query = 'SELECT * FROM "modulo" WHERE id = $1';
        const res = await pool.query(query, [id]);
        return res.rows[0];

    } catch (err) {
        console.error("Erro ao buscar módulo:", err.message);
        throw err;
    }
};

export const getModulosByCurso = async (curso_id) => {
    try {
        const query = 'SELECT * FROM "modulo" WHERE curso_id = $1';
        const res = await pool.query(query, [curso_id]);
        return res.rows;

    } catch (err) {
        console.error("Erro ao listar módulos:", err.message);
        throw err;
    }
};