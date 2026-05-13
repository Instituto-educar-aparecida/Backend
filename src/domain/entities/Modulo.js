export class Modulo {
    constructor({
        nome,
        descricao = null,
        curso_id
    }) {
        if (!nome) throw new Error("nome é obrigatório");
        if (!curso_id) throw new Error("curso_id é obrigatório");

        this.nome = nome;
        this.descricao = descricao;
        this.curso_id = curso_id;
    }
}

export default { Modulo };