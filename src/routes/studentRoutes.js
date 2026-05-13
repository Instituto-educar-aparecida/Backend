import { Router } from 'express';
import {authenticateToken } from './MiddlewereRoutes.js';

// Rotas students para serem feitas:
// POST /student
// PUT /student/profile
// GET /student/courses
// POST /student/enrollment
// DELETE /student/enrollment
// POST /student/course/review
// GET /student/dashboard
// GET /student/certificates


const router = Router();

router.use(authenticateToken);
router.use((req, res, next) => {
   if (req.user.role !== 'aluno') {
     return res.status(403).json({ msg: 'Acesso negado!' });
   }
   next();
});

export function homeStudent(req, res){
    res.status(200).json({msg: "Área do estudante funcionando."})
}

router.get("/", homeStudent);

export default router;
