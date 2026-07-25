import { Router } from 'express';
// Caminho corrigido para buscar o middleware na pasta correta
import { authenticateToken } from '../middlewares/MiddlewereRoutes.js';
// Caminho corrigido para buscar o controller na pasta correta voltando um nível
import { dashboard, getMateria } from '../Controllers/professorController.js';

const router = Router();

router.use(authenticateToken);

router.use((req, res, next) => {
   if (req.user.role !== 'professor') {
     return res.status(403).json({ msg: 'Acesso negado !' });
   }
   next();
});

router.get('/dashboard', dashboard);
router.get('/materia/:materia', getMateria);

export default router;

