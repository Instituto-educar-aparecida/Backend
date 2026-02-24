import { Router } from 'express';
import { login, register, getUsers, authenticateToken } from './Controllers/authControllers.js';
import { painelADM, usuariosAdm } from './adminRoutes.js';
import { homeStudent } from './studentRoutes.js';
const router = Router();

router.post("/login", login);

router.post("/register", register);

router.get("/getUsers", getUsers);

router.post("/usuarios", usuariosAdm );

router.get("/painel", authenticateToken, painelADM );

router.get("/homeStudent", homeStudent);


export default router;
    
    
