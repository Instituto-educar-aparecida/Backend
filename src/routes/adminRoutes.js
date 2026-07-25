import { Router } from 'express';
// Ajustado para a pasta correta de middlewares
import { authenticateToken } from '../middlewares/MiddlewereRoutes.js';

// NOTA: O arquivo UserDataAcess.js foi deletado pela equipe.
// Os métodos de banco agora devem ser importados de '../repositories/user.repository.js' futuramente.

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
        // Temporário até ajustar o user.repository.js
        return res.status(200).json({ msg: "Funcionalidade em manutenção. Repositório de banco foi alterado." });
    } catch (err) {   
        return res.status(500).json({ error: "Erro ao buscar usuários no banco" });
    }
};

async function vincularProfessorAdm(req, res) {
    if (req.user.role !== "admin") return res.status(403).json({msg: 'Negado'});
    
    const { userId, materia } = req.body;
    if( !userId || !materia) return res.status(400).json({msg: 'Campos obrigatórios faltando'});
    
    try {
        // Temporário até ajustar o user.repository.js
        return res.status(200).json({ message: "Funcionalidade em manutenção. Repositório de banco foi alterado." });
    } catch (err) {
        return res.status(500).json({ error: "Erro ao realizar o vínculo" });
    }
}

export default router;

