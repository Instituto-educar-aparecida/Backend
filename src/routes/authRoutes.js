import { Router } from 'express';
const router = Router();

router.post('/login', (req, res) => {
    const { email, senha } = req.body;
    console.log("Chegou aqui ! Email: ", email);
    return res.status(200).json({
        message: "Rota de login recebida !",
        email: email || "Email não recebido"
    });
});

export default router;

