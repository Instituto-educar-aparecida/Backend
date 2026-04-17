export class Atividade {
    constructor(titulo, modulo_id, professor_id = -1, qtdquestoes = 0, status = 'nao iniciado', id = null) {
        if(!titulo) throw new Error("titulo é obrigatório");
        if(!modulo_id) throw new Error("modulo_id é obrigatório");

        this.id =id;
        this.titulo = titulo;
        this.modulo_id = modulo_id;
        this.professor_id = professor_id;
        this.qtdquestoes = qtdquestoes;
        this.status = status;
    }
}

export default { Atividade };
