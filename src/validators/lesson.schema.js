import { z } from 'zod';

import { PROGRESS_STATUS }
    from '../domain/enums/progressStatus.enum.js';

export const createLessonSchema = z.object({
    title: z
        .string()
        .min(1, 'O título é obrigatório.')
        .max(255),

    description: z
        .string()
        .min(1, 'A descrição é obrigatória.'),

    duration_seconds: z.coerce
        .number()
        .int()
        .nonnegative('Duração inválida.'),

    video_url: z
        .string()
        .url('URL de vídeo inválida.')
});

export const updateLessonSchema = z
    .object({
        title: z
            .string()
            .min(1)
            .max(255)
            .optional(),

        description: z
            .string()
            .min(1)
            .optional(),

        duration_seconds: z.coerce
            .number()
            .int()
            .nonnegative()
            .optional(),

        video_url: z
            .string()
            .url()
            .optional()
    })
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message:
                'Informe ao menos um campo para atualizar.'
        }
    );

export const progressSchema = z.object({
    watch_seconds: z.coerce
        .number()
        .int()
        .nonnegative()
        .optional(),

    status: z
        .enum([
            PROGRESS_STATUS.NOT_STARTED,
            PROGRESS_STATUS.IN_PROGRESS,
            PROGRESS_STATUS.COMPLETED
        ])
        .optional()
});

export const supportTextSchema = z.object({
    content: z
        .string()
        .min(1, 'O conteúdo é obrigatório.')
});

export const lessonFileSchema = z.object({
    title: z
        .string()
        .min(1, 'O título é obrigatório.')
        .max(255),

    file_url: z
        .string()
        .url('URL de arquivo inválida.'),

    type: z
        .string()
        .max(50)
        .optional(),

    size: z.coerce
        .number()
        .int()
        .nonnegative()
        .optional()
});