import { z } from 'zod';

export const updateProfileSchema = z.object({
    name: z.string().min(3).max(255).optional(),
    bio: z.string().optional(),
    phone: z.string().max(30).optional(),
    avatar_url: z
        .string()
        .url('URL de avatar inválida.')
        .optional()
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: 'Informe ao menos um campo para atualizar.'
    }
);

export const enrollmentSchema = z.object({
    course_id: z.coerce
        .number()
        .int()
        .positive('course_id inválido.')
});

export const reviewSchema = z.object({
    course_id: z.coerce
        .number()
        .int()
        .positive('course_id inválido.'),

    rating: z.coerce
        .number()
        .int()
        .min(1, 'Nota mínima é 1.')
        .max(5, 'Nota máxima é 5.'),

    comment: z.string().optional()
});