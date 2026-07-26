// Funções utilitárias para geração e verificação de tokens JWT.
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Segredo obtido do ambiente. Um fallback é usado apenas para dev/testes.
const JWT_SECRET = process.env.JWT_SECRET || 'educar_dev_super_secret_change_me_in_production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';

// Gera um token de acesso JWT com os dados essenciais do usuário.
export const signAccessToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Verifica e decodifica um token JWT. Lança erro se inválido/expirado.
export const verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

// Gera um token aleatório opaco (usado para refresh token e reset de senha).
export const generateRandomToken = (bytes = 48) => {
    return crypto.randomBytes(bytes).toString('hex');
};

// Gera um código de verificação curto e legível (usado em certificados).
export const generateVerificationCode = () => {
    return crypto.randomBytes(8).toString('hex').toUpperCase();
};

export default { signAccessToken, verifyAccessToken, generateRandomToken, generateVerificationCode };
