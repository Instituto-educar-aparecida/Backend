export class Materia {
    constructor(nome, descricao, professor_id = -1) {
        if(!nome) throw new Error("nome é obrigatório");
        if(!professor_id || professor_id === -1) throw new Error("professor_id é obrigatório");

        this.nome = nome;
        this.descricao = descricao;
        this.professor_id = professor_id;
    }
}

export default { Materia };
