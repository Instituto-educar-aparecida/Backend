import express from 'express';
const router = express.Router();

console.log("--> Rota de vídeo carregada");

router.get('/data/:videoId', (req, res) => {
  const { videoId } = req.params;
  
  res.json({
    videoId,
    embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`,
    servidor: "Youtube Cloud Direct",
    timestamp: new Date().toISOString()
  });
});

export default router;
