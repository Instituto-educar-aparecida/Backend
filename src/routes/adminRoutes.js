import { Router } from 'express';
const router = Router();

router.get('/painel', (req, res) => {
    console.log("Acesso ao painel adm");
    return res.status(200).json({
        message: "Bem-vindo ao painel Adm. do instituto educar",
        status: "Online"
    });
});

router.post('/usuarios', (req, res) => {
    const {nome, cargo} = req.body;
    return res.status(201).json({
        message: "Simulação: Usuário criado com sucesso",
        data: { nome, cargo }
    });
});

export default router;
