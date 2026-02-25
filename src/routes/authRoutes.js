import { Router } from 'express';
import { login, register, getUsers, authenticateToken } from './Controllers/authControllers.js';
import adminRoutes from './adminRoutes.js';
import studentRoutes from './studentRoutes.js';
const router = Router();

router.post("/login", login);

router.post("/register", register);

router.get("/getUsers", getUsers);

router.post("/usuarios", adminRoutes.usuariosAdm );

router.get("/painel", authenticateToken, adminRoutes.painelADM );

router.get("/homeStudent", studentRoutes);


export default router;
    
    
