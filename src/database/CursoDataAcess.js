import * as cursoDb from "./CursoDataAccess.js";

export const cadastrar = async (curso) => {
    curso.status = curso.status ?? "ativo";
    return await cursoDb.addCurso(curso);
};

export const inserirModulo = async (moduloDb, modulo) => {
    return await moduloDb.addModulo(modulo);
};

export const removerModulo = async (moduloDb, idModulo) => {
    return await moduloDb.removeModulo(idModulo);
};

export const arquivarCurso = async (id) => {
    const curso = await cursoDb.getCursoById(id);
    if (!curso) throw new Error("Curso não encontrado");

    curso.status = "arquivado";
    return await cursoDb.updateCurso(curso);
};

export const alterarStatus = async (id, novoStatus) => {
    const curso = await cursoDb.getCursoById(id);
    if (!curso) throw new Error("Curso não encontrado");

    curso.status = novoStatus;
    return await cursoDb.updateCurso(curso);
};

export const atualizarInformacoes = async (id, dados) => {
    const curso = await cursoDb.getCursoById(id);
    if (!curso) throw new Error("Curso não encontrado");

    curso.titulo = dados.titulo ?? curso.titulo;
    curso.descricao = dados.descricao ?? curso.descricao;
    curso.carga_horaria = dados.carga_horaria ?? curso.carga_horaria;

    return await cursoDb.updateCurso(curso);
};

export const atualizarModulo = async (moduloDb, modulo) => {
    return await moduloDb.updateModulo(modulo);
};

export const buscar = async (termo) => {
    const cursos = await cursoDb.getCursos();

    return cursos.filter(c =>
        c.titulo.toLowerCase().includes(termo.toLowerCase()) ||
        (c.descricao && c.descricao.toLowerCase().includes(termo.toLowerCase()))
    );
};

export const detalhes = async (id, moduloDb) => {
    const curso = await cursoDb.getCursoById(id);
    if (!curso) throw new Error("Curso não encontrado");

    const modulos = await moduloDb.getModulosByCurso(id);

    return {
        ...curso,
        modulos
    };
};

export const avaliarCurso = async (id, nota) => {
    const curso = await cursoDb.getCursoById(id);
    if (!curso) throw new Error("Curso não encontrado");

    curso.nota = nota;
    return await cursoDb.updateCurso(curso);
};

export const getRelatorio = async (id, moduloDb) => {
    const curso = await detalhes(id, moduloDb);

    return {
        titulo: curso.titulo,
        status: curso.status,
        nota: curso.nota,
        totalModulos: curso.modulos.length
    };
};

export const destacarCurso = async (id) => {
    const curso = await cursoDb.getCursoById(id);
    if (!curso) throw new Error("Curso não encontrado");

    curso.em_destaque = true;
    return await cursoDb.updateCurso(curso);
};