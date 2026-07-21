import { z } from 'zod';

export const createModuleSchema = z.object({
    name: z
        .string()
        .min(1, 'O nome é obrigatório.')
        .max(255),

    description: z
        .string()
        .min(1, 'A descrição é obrigatória.'),

    order: z.coerce
        .number()
        .int()
        .positive()
        .optional()
});

export const updateModuleSchema = z
    .object({
        name: z
            .string()
            .min(1)
            .max(255)
            .optional(),

        description: z
            .string()
            .min(1)
            .optional(),

        order: z.coerce
            .number()
            .int()
            .positive()
            .optional()
    })
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message:
                'Informe ao menos um campo para atualizar.'
        }
    );