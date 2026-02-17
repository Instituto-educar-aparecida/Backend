import { Router } from 'express';
const router = Router();

const USUARIOS_MOCK = [
    { email: "admin@educar.com", senha: "123", cargo: "admin" },
    { email: "aluno@educar.com", senha: "123", cargo: "estudante" },
    
];

router.post('/login', (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ message: "E-mail e senha são obrigatŕios!" });
    }
    
    const usuario = USUARIOS_MOCK.find(u => u.email === email && u.senha === senha);
    
    if (usuario) {
        console.log(`[AUTH] Login bem-sucedido: ${email}`);
        return res.status(200).json({
            message: "Login realizado com sucesso!",
            user: {
                email: usuario.email,
                cargo: usuario.cargo
            }
        });
    } else {
        console.warn(`[AUTH] Tentativa de login inválida: ${email}`);
        return res.status(401).json({ message: "E-mail ou senha incorretos!" });
    }
});

export default router;
    
    
