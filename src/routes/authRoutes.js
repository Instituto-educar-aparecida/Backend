import { Router } from 'express';
import { login, register, getUsers } from './Controllers/authControllers.js';
import { authenticateToken } from './MiddlewereRoutes.js';


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
    
    
