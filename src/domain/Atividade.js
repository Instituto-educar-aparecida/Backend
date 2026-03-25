export class Atividade {
    constructor(titulo, materia_id, professor_id = -1, status = 'pendente') {
        if(!titulo) throw new Error("titulo é obrigatório");
        if(!materia_id) throw new Error("materia_id é obrigatório");

        this.titulo = titulo;
        this.materia_id = materia_id;
        this.professor_id = professor_id;
        this.status = status;
    }
}

export default { Atividade };
