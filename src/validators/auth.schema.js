import { z } from 'zod';

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'O nome deve ter pelo menos 2 caracteres.')
        .max(255),

    email: z
        .string()
        .trim()
        .email('E-mail inválido.'),

    password: z
        .string()
        .min(
            8,
            'A senha deve ter pelo menos 8 caracteres.'
        ),

    phone: z
        .string()
        .trim()
        .max(30)
        .optional()
});

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email('E-mail inválido.'),

    password: z
        .string()
        .min(1, 'A senha é obrigatória.')
});