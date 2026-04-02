import jwt from 'jsonwebtoken';
import { tokenPayloadSchema } from '../domain/schemas.js';

const SecretKey = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(/\s+/)[1];    

    if(!token) return res.status(403).json({msg: 'Token não encontrado'});
    

    jwt.verify(token, SecretKey,(err, user) => {    
        if(err) return res.status(403).json({msg: 'Token inválido!'});
        
        const validation = tokenPayloadSchema.safeParse(user);
        
        
        if(!validation.success){
           return res.status(403).json({
               message: "Token inválido ou corrompido", 
               errors: validation.error.flatten().fieldErrors 
           });
        }   
        req.user = validation.data;   
        next();
    });
};





