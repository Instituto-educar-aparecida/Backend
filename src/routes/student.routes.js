import { Router } from 'express';
import {
    authenticateToken,
    authorizeRoles
} from '../middlewares/MiddlewereRoutes.js';
import { dashboard, getMateria } from '../Controllers/instructorController.js';

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

