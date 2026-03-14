import bcrypt from 'bcrypt'
import { addUser, getUsersDb } from '../../database/config.js';
import jwt from 'jsonwebtoken'
const SecretKey = '9CF93E9BCE32CCD162D24EE671FFAB8FCCB8C5D6F2CCA74DC1E8953A'



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
    const usersDb = await getUsersDb();
    const usuario = usersDb.find(u => u.email === email);
    
    if(usuario){
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (senhaValida) {
        
           const token = jwt.sign(
               {
                 email: usuario.email, 
                 role: usuario.role, 
                 materia: usuario.materia || null
               },
               SecretKey, 
               {expiresIn: '2h'}
           );
           return res.status(201).json({
               auth: true,
               token: token,
               role: usuario.role
           });   
        }  
    }
    return res.status(400).json({msg:'Usuario ou senha invalido. Tente novamente.'})
}
    
    

async function getUsers(req, res){
    const users = await getUsersDb();
    return res.status(200).json(users);
}

const authenticateToken = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(403).json({msg: 'Token não encontrado'});

    jwt.verify(token, SecretKey,(err, user)=>{
        if(err)return res.status(403).json({msg: 'Token inválido!'})
        req.user = user;
        next();
    })
}

export {register, login, getUsers, authenticateToken};
