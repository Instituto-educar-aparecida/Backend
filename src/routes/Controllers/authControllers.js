import bcrypt from 'bcrypt'
import { addUser, findUserByEmail, getUsersDb, } from '../../database/UserDataAcess.js';
import { registerSchema, loginSchema } from '../../domain/schemas.js';
import jwt from 'jsonwebtoken'



const SecretKey = process.env.JWT_SECRET
    
    
async function register (req, res){
    const validation = registerSchema.safeParse(req.body);

    
    if(!validation.success){
       return res.status(400).json({
           message: "Dados inválidos", 
           errors: validation.error.flatten().fieldErrors 
       }); 
    }
    const { name, email, senha } = validation.data;
    const role = 'aluno';
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
    const validation = loginSchema.safeParse(req.body);
    
    if(!validation.success){
        return res.status(400).json({
            message: "Dados de login inválidos",
            errors: validation.error.flatten().fieldErrors 
        });
    }
    
    const { email, senha } = validation.data;
    try {
        const user = await findUserByEmail(email);


        if(!user) { 
           return res.status(401).json({message: "Usuário ou senha invalidos. Tente novamente."})
        }
        const senhaHash = await bcrypt.compare(senha, user.hash);
        
        if(!senhaHash) {
           return res.status(401).json({msg: "Usuário ou senha inválidos."});
        }
        const token = jwt.sign(
            {id: user.id, nome: user.name, role: user.role}, 
            SecretKey, 
            {expiresIn: "2h"}
        );
        return res.status(200).json({
            message: "Login realizado com sucesso", 
            token, 
            role: user.role
        });
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
