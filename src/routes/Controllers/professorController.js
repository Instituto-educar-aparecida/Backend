const MATERIAS_VALIDAS = [
   'matematica', 'portugues', 'ciencias', 'historia', 'geografia'
];

export function dashboard(req, res) {
  return res.status(200).json({
    message: "Bem-vindo ao painel do professor",
    professor: req.user.email,
    materia: req.user.materia
  });
}

export function getMateria(req, res) {
  const { materia } = req.params;
  
  if (!MATERIAS_VALIDAS.includes(materia)) {
    return res.status(404).json({ msg: 'Matéria não encontrada' });
  }
  
  if (req.user.materia !== materia) {
    return res.status(403).json({msg: 'Acesso negado a esta matéria' });
  }
  
  return res.status(200).json({
    materia,
    professor: req.user.email,
    conteudo: []
  });
}
     
