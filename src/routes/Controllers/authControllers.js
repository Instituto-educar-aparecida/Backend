import bcrypt from 'bcrypt'
import { User } from '../dataUsers/Users.js';

const users = [];

async function register (req, res){
    const {nome, email, senha, role} = req.body;
    
    if(!nome || !email || !senha || !role){
       return res.status(400).json({message:"Campo obrigatório faltando."}); 
    }
    if (role === "admin") {
    return res.status(403).json({ message: "Cadastro de admin não permitido" });
    }
    if(role !== "aluno" && role !== "professor"){
        return res.status(400).json({message:"Valor incorreto. Tente novamente!"})
    }
    const hashPassword = await bcrypt.hash(senha, 8)

    const newuser= new User(nome, email, hashPassword, role)
    users.push(newuser)
    return res.status(201).json({message:"Registrado com sucesso."})
}

function login(req, res){
    const {email, senha} = req.body
    if(!email || !senha){
        return res.status(400).json({message:'Campos obrgatórios em branco.'})
    }
    return res.status(200).json({message:'Login bem sucedido.'})
}

function getUsers(req, res){
    res.send(users)
}

export {register, login, getUsers};