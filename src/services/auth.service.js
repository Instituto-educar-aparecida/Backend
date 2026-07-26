// Serviço de autenticação. Concentra a lógica de negócio de auth.
import bcrypt from 'bcrypt';
import * as userRepo from '../repositories/user.repository.js';
import * as sessionRepo from '../repositories/userSession.repository.js';
import * as resetRepo from '../repositories/passwordReset.repository.js';
import { signAccessToken, generateRandomToken } from '../utils/jwt.js';
import { AppError } from '../utils/AppError.js';
import { USER_ROLE } from '../domain/enums/userRole.enum.js';
import { logger } from '../config/logger.js';

const SALT_ROUNDS = 10;
const REFRESH_DAYS = parseInt(process.env.REFRESH_TOKEN_EXPIRES_DAYS || '7', 10);
const RESET_TOKEN_MINUTES = 30;

export const register = async ({
    name,
    email,
    password,
    role,
    phone,
    bio,
}) => {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await userRepo.findByEmail(normalizedEmail);

    if (existingUser) {
        throw new AppError('E-mail já cadastrado.', 409);
    }

    const finalRole = role || USER_ROLE.STUDENT;

    if (finalRole === USER_ROLE.ADMIN) {
        throw new AppError(
            'Não é permitido cadastrar administradores por esta rota.',
            403,
        );
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    return userRepo.createUser({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: finalRole,
        phone: phone?.trim() || null,
        bio: bio?.trim() || null,
    });
};

export const login = async ({ email, password }) => {
    const user = await userRepo.findByEmail(
        email.trim().toLowerCase(),
    );

    if (!user) {
        throw new AppError('Usuário ou senha inválidos.', 401);
    }

    if (!user.active) {
        throw new AppError(
            'Conta bloqueada. Contate o suporte.',
            403,
        );
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.password_hash,
    );

    if (!passwordMatches) {
        throw new AppError('Usuário ou senha inválidos.', 401);
    }

    const token = signAccessToken({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    });

    const refreshToken = generateRandomToken();
    const expiresAt = new Date(
        Date.now() + REFRESH_DAYS * 24 * 60 * 60 * 1000,
    );

    await sessionRepo.createSession(
        user.id,
        refreshToken,
        expiresAt,
    );

    return {
        token,
        refreshToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};

export const logout = async (userId, refreshToken) => {
    if (refreshToken) {
        await sessionRepo.invalidate(refreshToken);
    } else {
        await sessionRepo.invalidateAllForUser(userId);
    }

    return true;
};

export const forgotPassword = async (email) => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await userRepo.findByEmail(normalizedEmail);

    if (!user) {
        return {
            message:
                'Se o e-mail existir, um link de recuperação será enviado.',
        };
    }

    await resetRepo.invalidateForUser(user.id);

    const token = generateRandomToken(24);
    const expiresAt = new Date(
        Date.now() + RESET_TOKEN_MINUTES * 60 * 1000,
    );

    await resetRepo.createToken(user.id, token, expiresAt);

    const resetLink =
        `${process.env.APP_BASE_URL || ''}/reset-password?token=${token}`;

    logger.info(
        `[RECUPERAÇÃO DE SENHA] Token gerado para ${normalizedEmail}: ${token}`,
    );

    return {
        message:
            'Se o e-mail existir, um link de recuperação será enviado.',
        ...(process.env.NODE_ENV !== 'production'
            ? { token, resetLink }
            : {}),
    };
};

export const resetPassword = async (token, newPassword) => {
    const record = await resetRepo.findValidToken(token);

    if (!record) {
        throw new AppError('Token inválido ou expirado.', 400);
    }

    const passwordHash = await bcrypt.hash(
        newPassword,
        SALT_ROUNDS,
    );

    await userRepo.updatePassword(
        record.user_id,
        passwordHash,
    );

    await resetRepo.markUsed(record.id);
    await sessionRepo.invalidateAllForUser(record.user_id);

    return {
        message: 'Senha redefinida com sucesso.',
    };
};

export const getMe = async (userId) => {
    const user = await userRepo.findById(userId);

    if (!user) {
        throw new AppError('Usuário não encontrado.', 404);
    }

    return user;
};

export default {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    getMe,
};