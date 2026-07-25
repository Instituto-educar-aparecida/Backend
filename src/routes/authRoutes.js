import { Router } from 'express';
// Ajustado para apontar para o controlador correto no singular (authController.js)
import { login, register, getUsers } from '../Controllers/authController.js';
// Ajustado para voltar um nível e apontar para a pasta middlewares
import { authenticateToken } from '../middlewares/MiddlewereRoutes.js';

// Rotas auths para serem feitas:
// POST /login
// POST /logout
// POST /forgot-password
// POST /reset-password
// GET /me

const router = Router();

router.post("/login", login);
router.post("/register", register);

router.get("/getUsers", authenticateToken, (req, res, next) => {
    if(req.user.role !== 'admin') return res.status(403).json({msg: 'Acesso negado'});
    next();
}, getUsers);

export default router;

