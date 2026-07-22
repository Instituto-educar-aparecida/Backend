import { z } from 'zod';

import { COURSE_STATUS }
    from '../domain/enums/courseStatus.enum.js';

const optionalText = z
    .string()
    .trim()
    .nullable()
    .optional();

export const createCourseSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, 'O título é obrigatório.')
        .max(255),

    description: z
        .string()
        .trim()
        .min(1, 'A descrição é obrigatória.'),

    syllabus: z
        .string()
        .trim()
        .min(
            1,
            'A ementa do curso é obrigatória.'
        ),

    program_content: z
        .string()
        .trim()
        .min(
            1,
            'O conteúdo programático é obrigatório.'
        ),

    prerequisites: optionalText,

    target_audience: optionalText,

    certification_info: optionalText,

    workload_hours: z.coerce
        .number()
        .positive(
            'A carga horária deve ser maior que zero.'
        ),

    thumbnail_url: z
        .string()
        .url('URL da thumbnail inválida.')
        .nullable()
        .optional(),

    enrollment_open: z.coerce
        .boolean()
        .optional()
});

export const updateCourseSchema = z
    .object({
        title: z
            .string()
            .trim()
            .min(1)
            .max(255)
            .optional(),

        description: z
            .string()
            .trim()
            .min(1)
            .optional(),

        syllabus: z
            .string()
            .trim()
            .min(1)
            .optional(),

        program_content: z
            .string()
            .trim()
            .min(1)
            .optional(),

        prerequisites: optionalText,

        target_audience: optionalText,

        certification_info: optionalText,

        workload_hours: z.coerce
            .number()
            .positive()
            .optional(),

        thumbnail_url: z
            .string()
            .url('URL da thumbnail inválida.')
            .nullable()
            .optional(),

        enrollment_open: z.coerce
            .boolean()
            .optional()
    })
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message:
                'Informe ao menos um campo para atualizar.'
        }
    );

export const courseStatusSchema = z.object({
    status: z.enum([
        COURSE_STATUS.PENDING,
        COURSE_STATUS.APPROVED,
        COURSE_STATUS.REJECTED,
        COURSE_STATUS.ARCHIVED
    ])
});

export const courseFeaturedSchema = z.object({
    featured: z.boolean({
        required_error:
            'O campo featured é obrigatório.'
    })
});

export const listCoursesQuerySchema = z.object({
    search: z
        .string()
        .trim()
        .optional(),

    status: z
        .enum([
            COURSE_STATUS.PENDING,
            COURSE_STATUS.APPROVED,
            COURSE_STATUS.REJECTED,
            COURSE_STATUS.ARCHIVED
        ])
        .optional(),

    featured: z
        .enum(['true', 'false'])
        .optional(),

    instructorId: z.coerce
        .number()
        .int()
        .positive()
        .optional(),

    onlyOpen: z
        .enum(['true', 'false'])
        .optional()
});