import { Router } from 'express';
import { login, register, getUsers, authenticateToken } from './Controllers/authControllers.js';

const router = Router();

router.post("/login", login);

router.post("/register", register);

router.get("/getUsers", getUsers);




export default router;
    
    
