
export class Atividade{
    id;
    name;
    descricao;
    professor_id;
    data_entrega;
    /** Cria uma matéria
     * Argumentos: 
     *  - nome: string         
     *  - descrição: string
     *  - professor_id: int
     *  - data_entrega: Date
     *  - id: int -> já possui valor padrão definido, bd é responsável por preencher o id de cada usuário
    */
    constructor(name_,email_,descricao_,professor_id_=-1){
        this.id          = id_;
        this.name        =name_        ;    
        this.descricao   =descricao_   ;   
        this.professor_id=professor_id_; 
    }
}

export default {Atividade}