import { Router } from "express"; 
import { authenticateToken } from "./MiddlewereRoutes.js";
import { saveProgress, getProgress, getCompleted } from "../database/LessonProgressDataAccess.js"


const router = Router();

router.use(authenticateToken);

router.use((req, res, next ) => {
    if( req.user.role !== 'aluno' ) return res.status(403).json({ msg: 'Acesso negado! '});
    next();
});


router.post('/progresso', async (req, res) => {
  const { lesson_id, current_time, duration, percentage, completed } = req.body;
  if ( !lesson_id || current_time === undefined ) return res.status(400).json({ msg: 'Campos obrigatórios faltando' });
  try {
    const result = await saveProgress({ user_id: req.user.id, lesson_id, current_time, percentage, completed });
    return res.status(200).json(result);
  } catch(err) {
    return res.status(500).json({ msg: 'Erro interno'});
  }
});

router.get('/progresso/concluidas', async (req, res) => {
  try {
    const result = await getCompleted(req.user.id);
    return res.status(200).json(result);
  } catch(err) {
    return res.status(500).json({ msg: ' Erro interno'});
  }
});

router.get('/progresso/:lesson_id', async (req, res) => {
  const { lesson_id } = req.params;
  try {
    const result = await getProgress(req.user.id, lesson_id);
    return res.status(200).json(result || {});
  } catch(err) {
    return res.status(500).json({ msg: ' Erro interno'});
  }
});



export default router;
