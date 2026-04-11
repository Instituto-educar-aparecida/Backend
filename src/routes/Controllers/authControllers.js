import bcrypt from 'bcrypt'
import { addUser, findUserByEmail, getUsersDb, } from '../../database/UserDataAcess.js';
import jwt from 'jsonwebtoken'



const SecretKey = process.env.JWT_SECRET
    
    
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
    try {
        const hash = await bcrypt.hash(senha, 8)
        await addUser(name, email, hash, role)
        return res.status(200).json({message:"Registrado com sucesso."})
    } catch(err) {
        if(err.code === '23505') return res.status(400).json({message: "Email já cadastrado !"})
        return res.status(500).json({message:"Erro interno."})
    }
    
}

async function login(req, res){
    const {email, senha} = req.body
    
    if(!email||!senha){
        return res.status(400).json({msg: "Campos obrigatórios em branco."});
    }
    try {
        const user = await findUserByEmail(email);


        if(!user) return res.status(401).json({msg: "Usuário ou senha invalidos. Tente novamente."})
        
        const senhaHash = await bcrypt.compare(senha, user.hash);
        
        if(!senhaHash) return res.status(401).json({msg: "Usuário ou senha inválidos."});

        const token = jwt.sign(
            {id: user.id, nome: user.name, role: user.role}, 
            SecretKey, 
            {expiresIn: "2h"}
        );
        return res.status(200).json({token, role: user.role});
    } catch(err) {
        return res.status(500).json({message: "Erro interno"});
    }
    
}



async function getUsers(req, res){
  try {
    const users = await getUsersDb();
    return res.status(200).json(users);
  } catch(err) {
    return res.status(500).json({ message: "Erro interno." });
  }
};



export {register, login, getUsers};
