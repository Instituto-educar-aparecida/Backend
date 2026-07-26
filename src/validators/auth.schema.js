import { z } from 'zod';
import { USER_ROLE } from '../domain/enums/userRole.enum.js';

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, 'O nome deve ter ao menos 3 caracteres.')
        .max(255),

    email: z
        .string()
        .trim()
        .toLowerCase()
        .email('E-mail inválido.')
        .max(255),

    password: z
        .string()
        .min(6, 'A senha deve ter ao menos 6 caracteres.')
        .max(100),

    role: z.enum([
        USER_ROLE.STUDENT,
        USER_ROLE.INSTRUCTOR,
        USER_ROLE.SECRETARIA,
    ]).optional(),

    phone: z.string().trim().max(30).optional(),
    bio: z.string().trim().optional(),
});

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email('E-mail inválido.'),

    password: z
        .string()
        .min(1, 'A senha é obrigatória.'),
});

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email('E-mail inválido.'),
});

export const resetPasswordSchema = z.object({
    token: z
        .string()
        .min(1, 'Token é obrigatório.'),

    password: z
        .string()
        .min(6, 'A senha deve ter ao menos 6 caracteres.')
        .max(100),
});

export const logoutSchema = z.object({
    refreshToken: z.string().optional(),
});