import { z } from 'zod';

export const registerSchema = z.object({
    name: z
        .string({
            required_error: 'O nome é obrigatório.'
        })
        .trim()
        .min(2, 'O nome deve ter pelo menos 2 caracteres.')
        .max(255, 'O nome deve ter no máximo 255 caracteres.'),

    email: z
        .string({
            required_error: 'O e-mail é obrigatório.'
        })
        .trim()
        .email('E-mail inválido.'),

    password: z
        .string({
            required_error: 'A senha é obrigatória.'
        })
        .min(8, 'A senha deve ter pelo menos 8 caracteres.'),

    phone: z
        .string()
        .trim()
        .max(30, 'O telefone deve ter no máximo 30 caracteres.')
        .optional()
        .nullable()
});

export const loginSchema = z.object({
    email: z
        .string({
            required_error: 'O e-mail é obrigatório.'
        })
        .trim()
        .email('E-mail inválido.'),

    password: z
        .string({
            required_error: 'A senha é obrigatória.'
        })
        .min(1, 'A senha é obrigatória.')
});

export default {
    registerSchema,
    loginSchema
};