import { Router } from 'express';
import {authenticateToken} from './Controllers/authControllers.js';

const router = Router();

router.get('/painel', authenticateToken, painelADM);
router.post('/usuarios', usuariosAdm);

function painelADM(req, res){
    if(req.user.role !== "admin") {
        return res.status(403).json({msg: 'Acesso negado!'})
    }
    console.log("Acesso ao painel adm");
    return res.status(200).json({
        message: "Bem-vindo ao painel Adm. do instituto educar",
        status: "Online"
    });
};

function usuariosAdm(req, res){
    const {nome, cargo} = req.body;
    return res.status(201).json({
        message: "Simulação: Usuário criado com sucesso",
        data: { nome, cargo }
    });
}

export default router;
