/** Lista de funções/tipos de acesso
*/
export const roles = Object.freeze({
  Adm: 'Adm', Student: 'Student', Teacher: 'Student'
});


export class user{
    id;
    name;
    email;
    role;
    hash;

    /** Cria um usuário
     * Argumentos: 
     *  - nome
     *  - email
     *  - role
     *  - hash
     *  - id -> já possui valor padrão definido, bd é responsável por preencher o id de cada usuário
    */
    constructor(name_,email_,role_,hash_,id_=-1){
        this.id=id_;
        this.email=email_;
        this.name =name_;
        this.role=role_;
        this.hash=hash_;
    }
}

export default {user,roles}