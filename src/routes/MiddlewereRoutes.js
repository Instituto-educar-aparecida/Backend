const authenticateToken = (req, res, next)=>{
    const token = req.headers['authorization'];

    if(!token) return res.status(403).json({msg: 'Token não encontrado'});

    jwt.verify(token, SecretKey,(err, user)=>{
        if(err)return res.status(403).json({msg: 'Token inválido!'})
        req.user = user;
        next();
    })
}

export default {authenticateToken}