import { Router } from 'express';
const router = Router();

export function homeStudent(req, res){
    res.status(200).json({msg: "Área do estudante funcionando."})
}

router.get("/", homeStudent);

export default router;
