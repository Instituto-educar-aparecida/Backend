import { Router } from 'express';

const router = Router();
router.get('/perfil', (req, res) => res.json({msg: "Área do estudante ok"}));
export default router;
