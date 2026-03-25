export const curso_status = Object.freeze({
  Programado: "Programado",
  InscricoesAbertas: "Inscricoes Abertas",
  AguardandoInicio: "Aguardando inicio",
  EmAndamento: "Em andamento",
  Cancelado: "Cancelado",
});

export class Curso {
    constructor(titulo, materia_id, professor_id, status = curso_status.Programado) {
        if(!titulo) throw new Error("titulo é obrigatório");
        if(!materia_id) throw new Error("materia_id é obrigatório");
        if(!professor_id) throw new Error("professor_id é obrigatório");
        if(!Object.values(curso_status).includes(status)) throw new Error("status inválido");

        this.titulo = titulo;
        this.materia_id = materia_id;
        this.professor_id = professor_id;
        this.status = status;
    }
}

export default { Curso, curso_status };
