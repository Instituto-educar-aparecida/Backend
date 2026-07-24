import express from 'express';
//import { authenticateToken } from './MiddlewereRoutes.js';

const router = express.Router();



router.use(authenticateToken);
router.get('/data/:videoId', (req, res) => {
  const { videoId } = req.params;
  
  if(!videoId) return res.status(400).json({ msg: 'VideoId obrigatório'});
  
  res.json({
    videoId,
    embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`,
    servidor: "Youtube Cloud Direct",
    timestamp: new Date().toISOString()
  });
});

export default router;
