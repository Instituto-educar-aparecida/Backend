import bcrypt from 'bcrypt'
import { addUser, getUsersDb } from '../../database/config.js';
import jwt from 'jsonwebtoken'
const SecretKey = '9CF93E9BCE32CCD162D24EE671FFAB8FCCB8C5D6F2CCA74DC1E8953A'


//Criar enum para roles
// export const users = [
//     { nome:"Atena", email: "admin@educar.com", senha: "123", role: "admin" },
//     { nome:"Bartolomeu", email: "aluno@educar.com", senha: "123", role: "estudante" },
// ];

async function register (req, res){
    const {name, email, senha, role} = req.body;
    
    if(!name || !email || !senha || !role){
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
    return res.status(201).json({message:"Registrado com sucesso."})
}

function login(req, res){
    const {email, senha} = req.body
    const usuario = users.find(u => u.email === email && u.senha === senha);
    
    if(usuario){
        const token = jwt.sign({email: usuario.email, senha: usuario.senha, role: usuario.role}, SecretKey, {expiresIn: '2h'})
        return res.status(201).json({msg: token})
    }else{
        res.status(400).json({msg:'Usuario ou senha invalido. Tente novamente.'})
    }
    
    
}

function getUsers(req, res){
    
    res.send(getUsersDb)
}

const authenticateToken = (req, res, next)=>{
    const token = req.headers['authorization'];

    if(!token) return res.status(403).json({msg: 'Token não encontrado'});

    jwt.verify(token, SecretKey,(err, user)=>{
        if(err)return res.status(403).json({msg: 'Token inválido!'})
        req.user = user;
        next();
    })
}

export {register, login, getUsers, authenticateToken};
