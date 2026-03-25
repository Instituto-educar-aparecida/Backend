import jwt from 'jsonwebtoken';
import { SecretKey } from './Controllers/authControllers.js';

export const authenticateToken = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];    

    if(!token) return res.status(403).json({msg: 'Token não encontrado'});

    jwt.verify(token, SecretKey,(err, user)=>{
        if(err)return res.status(403).json({msg: 'Token inválido!'})
        req.user = user;
        next();
    })
};





