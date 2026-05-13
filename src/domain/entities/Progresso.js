export const aluno_status_em_curso = Object.freeze({
  Matriculado: "Matriculado",
  Finalizou: "Finalizou",
  AguardandoCertificado: "Aguardando Certificado",  
});

export class ProgressoCurso {
    constructor(aluno_id, curso_id, status = aluno_status_em_curso.Matriculado, updated_at = new Date().toISOString()) {
        if(!aluno_id) throw new Error("aluno_id é obrigatório");
        if(!curso_id) throw new Error("curso_id é obrigatório");
        if(!Object.values(aluno_status_em_curso).includes(status)) throw new Error("status inválido");

        this.aluno_id = aluno_id;
        this.curso_id = curso_id;
        this.status = status;
        this.updated_at = updated_at;
    }
}

export default { ProgressoCurso, aluno_status_em_curso };
