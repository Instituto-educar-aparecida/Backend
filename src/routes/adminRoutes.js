import { Router } from 'express';
import {authenticateToken} from './Controllers/authControllers.js';
import { getUsersDb } from '../database/config.js';
import { VincProf } from '../database/config.js';

const router = Router();

router.get('/painel', authenticateToken, painelADM);
router.get('/usuarios', authenticateToken, usuariosAdm);
router.post('/vincular', authenticateToken, vincularProfessorAdm);

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

async function usuariosAdm(req, res){
    if (req.user.role !== "admin") return res.status(403).json({ msg: 'Negado' });
    
    try {
        const usuarios = await getUsersDb();
        return res.status(200).json(usuarios);
    } catch (err) {   
        return res.status(500).json({ error: "Erro ao buscar usários no banco" });
    }
    
};

async function vincularProfessorAdm(req, res) {
    if (req.user.role !== "admin") return res.status(403).json({msg: 'Negado'});
    
    const { userId, materia } = req.body;
    if( !userId || !materia) return res.status(400).json({msg: 'Campos obrigatórios faltando'});
    
    try {
        await VincProf(userId, materia);
        return res.status(200).json({ message: "Professor vinculado com sucesso!" });
    } catch (err) {
        return res.status(500).json({ error: "Erro ao realizar o vínculo" });
    }
}


export default router;
