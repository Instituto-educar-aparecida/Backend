import bcrypt from 'bcrypt'
import { addUser, findUserByEmail, getUsersDb, } from '../../database/UserDataAcess.js';
import jwt from 'jsonwebtoken'
const SecretKey = '9CF93E9BCE32CCD162D24EE671FFAB8FCCB8C5D6F2CCA74DC1E8953A'


// export const users = [
//     { nome:"Atena", email: "admin@educar.com", senha: "123", role: "admin" },
//     { nome:"Bartolomeu", email: "aluno@educar.com", senha: "123", role: "estudante" },
//     { nome:"Zezin", email: "professor@educar.com", senha: "123", role: "professor", materia: "matematica"},
// ];    

    
    
async function register (req, res){
    const {name, email, senha} = req.body;
    const role = 'aluno';
    
    if(!name || !email || !senha ){
       return res.status(400).json({message:"Campo obrigatório faltando."}); 
    }
    if (role === "admin") {
    return res.status(403).json({ message: "Cadastro de admin não permitido" });
    }
    if(role !== "aluno" && role !== "professor"){
        return res.status(400).json({message:"Valor incorreto. Tente novamente!"})
    }
    const hash = await bcrypt.hash(senha, 8)

    await addUser(name, email, hash, role)
    return res.status(200).json({message:"Registrado com sucesso."})
}

async function login(req, res){
    const {email, senha} = req.body
    
    if(!email||!senha){
        return res.status(400).json({msg: "Campos obrigatórios em branco."});
    }

    const user = await findUserByEmail(email);

    const senhaHash = await bcrypt.compare(senha, user.hash);

    if(!user || !senhaHash){
        return res.status(401).json({msg: "Usuário ou senha invalidos. Tente novamente."})
    }else{
        const token = jwt.sign({id: user.id, nome: user.name, role: user.role}, SecretKey, {expiresIn: "2h"});
        return res.status(200).json({token})
    }
    
    
    
}
    
    

async function getUsers(req, res){
    const users = await getUsersDb();
    return res.status(200).json(users);
}



export {register, login, getUsers};
