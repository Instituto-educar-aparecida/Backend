import { Router } from "express"; 
// Caminho corrigido para buscar o middleware na pasta correta
import { authenticateToken } from "../middlewares/MiddlewereRoutes.js";

// NOTA: O arquivo LessonProgressDataAccess.js foi deletado pela equipe.
// Os métodos de banco agora devem ser importados de '../repositories/lessonProgress.repository.js' futuramente.

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
    // Temporário até ajustar o lessonProgress.repository.js
    return res.status(200).json({ msg: "Funcionalidade em manutenção. Repositório de banco foi alterado." });
  } catch(err) {
    return res.status(500).json({ msg: 'Erro interno'});
  }
});

router.get('/progresso/concluidas', async (req, res) => {
  try {
    // Temporário até ajustar o lessonProgress.repository.js
    return res.status(200).json({ msg: "Funcionalidade em manutenção. Repositório de banco foi alterado." });
  } catch(err) {
    return res.status(500).json({ msg: ' Erro interno'});
  }
});

router.get('/progresso/:lesson_id', async (req, res) => {
  const { lesson_id } = req.params;
  try {
    // Temporário até ajustar o lessonProgress.repository.js
    return res.status(200).json({ msg: "Funcionalidade em manutenção. Repositório de banco foi alterado." });
  } catch(err) {
    return res.status(500).json({ msg: ' Erro interno'});
  }
});

export default router;

