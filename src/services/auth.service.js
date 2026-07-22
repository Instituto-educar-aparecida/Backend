import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as userRepo
    from '../repositories/user.repository.js';

import { AppError }
    from '../utils/AppError.js';

import { USER_ROLE }
    from '../domain/enums/userRole.enum.js';

const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new AppError(
            'JWT_SECRET não configurado.',
            500
        );
    }

    return secret;
};

export const register = async (data) => {
    const email = data.email.trim().toLowerCase();

    const existingUser =
        await userRepo.findByEmail(email);

    if (existingUser) {
        throw new AppError(
            'E-mail já cadastrado.',
            409
        );
    }

    const passwordHash = await bcrypt.hash(
        data.password,
        10
    );

    return userRepo.createUser({
        name: data.name,
        email,
        passwordHash,
        role: USER_ROLE.STUDENT,
        phone: data.phone ?? null
    });
};

export const login = async ({
    email,
    password
}) => {
    const user = await userRepo.findByEmail(
        email.trim().toLowerCase()
    );

    if (!user) {
        throw new AppError(
            'Usuário ou senha inválidos.',
            401
        );
    }

    if (!user.active) {
        throw new AppError(
            'Usuário inativo.',
            403
        );
    }

    const passwordMatches =
        await bcrypt.compare(
            password,
            user.password_hash
        );

    if (!passwordMatches) {
        throw new AppError(
            'Usuário ou senha inválidos.',
            401
        );
    }

    const token = jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        getJwtSecret(),
        {
            expiresIn:
                process.env.JWT_EXPIRES_IN ?? '2h'
        }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

export const getMe = async (userId) => {
    const user = await userRepo.findById(userId);

    if (!user) {
        throw new AppError(
            'Usuário não encontrado.',
            404
        );
    }

    return user;
};

export const listUsers = async (
    filters = {}
) => {
    return userRepo.listUsers(filters);
};

export default {
    register,
    login,
    getMe,
    listUsers
};