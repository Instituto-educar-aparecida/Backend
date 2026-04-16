import { pool } from "../UserDataAcess.js";

export const addCurso = async (curso) => {
    const query = `
        INSERT INTO "curso"
        (titulo, descricao, carga_horaria, nota, imagem_capa, status, matriculas_abertas, em_destaque)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING *;
    `;

    const values = [
        curso.titulo,
        curso.descricao,
        curso.carga_horaria,
        curso.nota,
        curso.imagem_capa,
        curso.status,
        curso.matriculas_abertas,
        curso.em_destaque
    ];

    const res = await pool.query(query, values);
    return res.rows[0];
};

export const removeCurso = async (id) => {
    const res = await pool.query(
        'DELETE FROM "curso" WHERE id = $1',
        [id]
    );
    return res.rowCount > 0;
};

export const getCursoById = async (id) => {
    const res = await pool.query(
        'SELECT * FROM "curso" WHERE id = $1',
        [id]
    );
    return res.rows[0];
};

export const getCursos = async () => {
    const res = await pool.query('SELECT * FROM "curso"');
    return res.rows;
};

export const alterarStatus = async (id, status) => {
    const res = await pool.query(
        'UPDATE "curso" SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
    );
    return res.rows[0];
};

export const arquivarCurso = async (id) => {
    return await alterarStatus(id, "Arquivado");
};

export const atualizarCurso = async (curso) => {
    const query = `
        UPDATE "curso"
        SET titulo=$1,
            descricao=$2,
            carga_horaria=$3
        WHERE id=$4
        RETURNING *;
    `;

    const values = [
        curso.titulo,
        curso.descricao,
        curso.carga_horaria,
        curso.id
    ];

    const res = await pool.query(query, values);
    return res.rows[0];
};

export const avaliarCurso = async (id, nota) => {
    const res = await pool.query(
        'UPDATE "curso" SET nota = $1 WHERE id = $2 RETURNING *',
        [nota, id]
    );
    return res.rows[0];
};

export const destacarCurso = async (id) => {
    const res = await pool.query(
        'UPDATE "curso" SET em_destaque = true WHERE id = $1 RETURNING *',
        [id]
    );
    return res.rows[0];
};

export const buscarCursos = async (termo) => {
    const query = `
        SELECT * FROM "curso"
        WHERE LOWER(titulo) LIKE LOWER($1)
        OR LOWER(descricao) LIKE LOWER($1)
    `;

    const res = await pool.query(query, [`%${termo}%`]);
    return res.rows;
};

export const getCursoDetalhes = async (id) => {
    const query = `
        SELECT c.*, m.id as modulo_id, m.nome, m.descricao
        FROM "curso" c
        LEFT JOIN "modulo" m ON m.curso_id = c.id
        WHERE c.id = $1
    `;

    const res = await pool.query(query, [id]);
    return res.rows;
};

export const getRelatorioCurso = async (id) => {
    const query = `
        SELECT 
            c.titulo,
            c.status,
            c.nota,
            COUNT(m.id) as total_modulos
        FROM "curso" c
        LEFT JOIN "modulo" m ON m.curso_id = c.id
        WHERE c.id = $1
        GROUP BY c.id
    `;

    const res = await pool.query(query, [id]);
    return res.rows[0];
};