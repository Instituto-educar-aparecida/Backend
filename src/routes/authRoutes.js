import { Router } from 'express';
import { login, register, getUsers, authenticateToken } from './Controllers/authControllers.js';
const router = Router();

router.post("/login", login);

router.post("/register", register);

router.get("/getUsers", getUsers);

//Resolver bug no middlewere de autenticação do token para autorização
router.get('/painel', authenticateToken, (req, res) => {
    if(req.users.role !== 'admin') {
        return res.status(403).json({msg: 'Acesso negado!'})
    }
    console.log("Acesso ao painel adm");
    return res.status(200).json({
        message: "Bem-vindo ao painel Adm. do instituto educar",
        status: "Online"
    });
});

export default router;
    
    
