import { Router } from 'express';
import { authenticateToken } from './Controllers/authControllers.js';
import { users } from './Controllers/authControllers.js';
const router = Router();

// router.get('/painel', authenticateToken, (req, res) => {
//     if(req.users.role !== 'admin') {
//         return res.status(403).json({msg: 'Acesso negado!'})
//     }
//     console.log("Acesso ao painel adm");
//     return res.status(200).json({
//         message: "Bem-vindo ao painel Adm. do instituto educar",
//         status: "Online"
//     });
// });

//Arquivo de rota duplicado

// router.post('/usuarios', (req, res) => {
//     const {nome, cargo} = req.body;
//     return res.status(201).json({
//         message: "Simulação: Usuário criado com sucesso",
//         data: { nome, cargo }
//     });
// });

export default router;
