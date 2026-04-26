export const roles = Object.freeze({
    Admin: 1,
    Aluno: 2,
    Professor: 3
});
export class User {
    constructor(name, email, role, hash) {
        if(!name) throw new Error("name é obrigatório");
        if(!email) throw new Error("email é obrigatório");
        if(!hash) throw new Error("hash é obrigatório");
        if(!Object.values(roles).includes(role)) throw new Error("role inválido");

        this.name = name;
        this.email = email;
        this.role = role;
        this.hash = hash;
    }
}

export default { User, roles };