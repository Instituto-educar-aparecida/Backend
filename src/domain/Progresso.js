//deixei essas opções de status por enquanto, vamos refinar isso quando estiver mais adiantado
/** Opções de status para o progresso do aluno */
export const aluno_status_em_curso = Object.freeze({
  Matriculado:"Matriculado",
  Finalizou:"Finalizou",
  AguardandoCertificado:"Aguardando Certificado",  
});

export class ProgressoCurso{
    id;                        
    aluno_id;                   
    curso_id;            
    status;         
    updated_at;           

    /*
     * Argumentos: 
     *  
     *  - id do aluno:int
     *  - id do professor:int
     *  - status:aluno_status_em_curso
     *  - id -> já possui valor padrão definido, bd é responsável por preencher o id de cada usuário
    */
    constructor(aluno_id_,curso_id_,status_,updated_at_,  id_=-1){
        this.id          = id_;          
        this.aluno_id    = aluno_id_;       
        this.curso_id    = curso_id_;      
        this.status      = status_;      
        this.updated_at  = updated_at_;  
    }
}

export default {ProgressoCurso,aluno_status_em_curso}