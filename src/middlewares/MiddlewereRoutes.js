import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            msg: 'Token não encontrado.'
        });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        return res.status(500).json({
            msg: 'JWT_SECRET não configurado no servidor.'
        });
    }

    try {
        req.user = jwt.verify(token, secret);
        next();
    } catch {
        return res.status(401).json({
            msg: 'Token inválido ou expirado.'
        });
    }
};

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                msg: 'Usuário não autenticado.'
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                msg: 'Acesso negado.'
            });
        }

        next();
    };
};