//deixei essas opções de status por enquanto, vamos refinar isso quando estiver mais adiantado
/** Opções de status para o curso */
export const curso_status = Object.freeze({
  Programado:"Programado",
  InscricoesAbertas:"Inscricoes Abertas",
  AguardandoInicio:"Aguardando inicio",
  EmAndamento:"Em andamento",
  Cancelado:"Cancelado",
  
});

export class Curso{
    id;           
    titulo;        
    materia_id;     
    professor_id;  
    status;        

    /** Cria uma matéria
     * Argumentos: 
     *  - titulo: string
     *  - id da matéria: int
     *  - id do professor: int
     *  - id:int -> já possui valor padrão definido, bd é responsável por preencher o id de cada usuário
    */
    constructor(titulo_,materia_id_,professor_id_,status_,id_=-1){
        this.id             = id_;           
        this.titulo         = titulo_;          
        this.materia_id     = materia_id_;     
        this.professor_id   = professor_id_; 
        this.status         = status_;       
    }
}

export default {Curso,curso_status}