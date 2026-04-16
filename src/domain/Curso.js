export const curso_status = Object.freeze({
    Programado: "Programado",
    InscricoesAbertas: "Inscricoes Abertas",
    AguardandoInicio: "Aguardando inicio",
    Arquivado: "Arquivado",
    EmAndamento: "Em andamento",
    Cancelado: "Cancelado",
});

export class Curso {
    constructor({
        titulo,
        descricao = null,
        carga_horaria = 0,
        nota = 0,
        imagem_capa = null,
        status = curso_status.Programado,
        matriculas_abertas = false,
        em_destaque = false
    }) {
        if (!titulo) throw new Error("titulo é obrigatório");

        if (carga_horaria < 0) throw new Error("carga horaria inválida");
        if (nota < 0) throw new Error("nota inválida");

        if (!Object.values(curso_status).includes(status)) {
            throw new Error("status inválido");
        }

        this.titulo = titulo;
        this.descricao = descricao;
        this.carga_horaria = carga_horaria;
        this.nota = nota;
        this.imagem_capa = imagem_capa;
        this.status = status;
        this.matriculas_abertas = matriculas_abertas;
        this.em_destaque = em_destaque;
    }
}

export default { Curso, curso_status };
