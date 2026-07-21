import { z } from 'zod';

import { ACTIVITY_STATUS }
    from '../domain/enums/activityStatus.enum.js';

const activityFields = {
    title: z
        .string()
        .min(1, 'O título é obrigatório.')
        .max(255),

    minimum_grade: z.coerce
        .number()
        .min(0, 'A nota mínima não pode ser negativa.')
        .max(10, 'A nota mínima não pode passar de 10.')
        .optional(),

    deadline: z.coerce
        .date()
        .optional(),

    status: z
        .enum([
            ACTIVITY_STATUS.DRAFT,
            ACTIVITY_STATUS.PUBLISHED,
            ACTIVITY_STATUS.CLOSED
        ])
        .optional()
};

export const createActivitySchema = z.object({
    ...activityFields
});

export const updateActivitySchema = z
    .object({
        title: activityFields.title.optional(),
        minimum_grade:
            activityFields.minimum_grade,
        deadline: activityFields.deadline,
        status: activityFields.status
    })
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message:
                'Informe ao menos um campo para atualizar.'
        }
    );

export const objectiveQuestionSchema = z.object({
    description: z
        .string()
        .min(1, 'O enunciado é obrigatório.'),

    image_url: z
        .string()
        .url('URL de imagem inválida.')
        .optional(),

    option_1: z
        .string()
        .min(1, 'A alternativa 1 é obrigatória.'),

    option_2: z
        .string()
        .min(1, 'A alternativa 2 é obrigatória.'),

    option_3: z
        .string()
        .min(1, 'A alternativa 3 é obrigatória.'),

    option_4: z
        .string()
        .min(1, 'A alternativa 4 é obrigatória.'),

    option_5: z
        .string()
        .optional(),

    correct_option: z.coerce
        .number()
        .int()
        .min(1)
        .max(5)
});

export const openQuestionSchema = z.object({
    description: z
        .string()
        .min(1, 'O enunciado é obrigatório.'),

    image_url: z
        .string()
        .url('URL de imagem inválida.')
        .optional()
});

export const submitActivitySchema = z.object({
    answers: z
        .array(
            z.object({
                question_id: z.coerce
                    .number()
                    .int()
                    .positive(),

                selected_option: z.coerce
                    .number()
                    .int()
                    .min(1)
                    .max(5)
            })
        )
        .optional(),

    open_answers: z
        .array(
            z.object({
                question_id: z.coerce
                    .number()
                    .int()
                    .positive(),

                answer: z
                    .string()
                    .min(
                        1,
                        'A resposta não pode estar vazia.'
                    )
            })
        )
        .optional()
});

export const gradeSubmissionSchema = z.object({
    grade: z.coerce
        .number()
        .min(0, 'A nota mínima é 0.')
        .max(10, 'A nota máxima é 10.')
});