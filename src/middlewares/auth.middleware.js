// Middlewares de autenticação e autorização.
import { verifyAccessToken } from '../utils/jwt.js';
import { AppError } from '../utils/AppError.js';

// Verifica o token JWT enviado no header Authorization: Bearer <token>.
// Popula req.user com os dados decodificados do token.
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next(new AppError('Token não encontrado.', 401));
    }

    try {
        // Correção do bug: usa o segredo do ambiente via verifyAccessToken,
        // no lugar da antiga variável "SecretKey" indefinida.
        const decoded = verifyAccessToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        return next(new AppError('Token inválido ou expirado.', 401));
    }
};

// Autenticação opcional: se houver um token válido, popula req.user;
// caso contrário, segue sem erro (usado em rotas públicas com conteúdo extra para logados).
export const optionalAuthenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return next();
    try {
        req.user = verifyAccessToken(token);
    } catch (err) {
        // Token inválido é ignorado no fluxo opcional.
    }
    next();
};

// Middleware de autorização baseada em papéis (RBAC).
// Uso: authorizeRoles(USER_ROLE.ADMIN, USER_ROLE.INSTRUCTOR)
export const authorizeRoles = (...allowedRoles) => (req, res, next) => {
    if (!req.user) {
        return next(new AppError('Não autenticado.', 401));
    }
    if (!allowedRoles.includes(req.user.role)) {
        return next(new AppError('Acesso negado. Permissão insuficiente.', 403));
    }
    next();
};

export default { authenticateToken, authorizeRoles };
