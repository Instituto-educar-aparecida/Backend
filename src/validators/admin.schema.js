import { z } from 'zod';

import { USER_ROLE }
    from '../domain/enums/userRole.enum.js';

import { COURSE_STATUS }
    from '../domain/enums/courseStatus.enum.js';

const roles = [
    USER_ROLE.STUDENT,
    USER_ROLE.INSTRUCTOR,
    USER_ROLE.SECRETARIA,
    USER_ROLE.ADMIN
];

const reviewStatuses = [
    COURSE_STATUS.APPROVED,
    COURSE_STATUS.REJECTED,
    COURSE_STATUS.ARCHIVED
];

export const updateUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'O nome deve ter pelo menos 2 caracteres.')
        .max(255)
        .optional(),

    email: z
        .string()
        .trim()
        .email('E-mail inválido.')
        .optional(),

    role: z
        .enum(roles)
        .optional(),

    phone: z
        .string()
        .trim()
        .max(30)
        .nullable()
        .optional(),

    bio: z
        .string()
        .trim()
        .max(2000)
        .nullable()
        .optional(),

    avatar_url: z
        .string()
        .url('URL do avatar inválida.')
        .nullable()
        .optional()
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message:
            'Informe pelo menos um campo para atualização.'
    }
);

export const setUserActiveSchema = z.object({
    active: z.boolean()
});

export const reviewCourseSchema = z.object({
    status: z.enum(reviewStatuses)
});

export const setCourseFeaturedSchema = z.object({
    featured: z.boolean()
});

export default {
    updateUserSchema,
    setUserActiveSchema,
    reviewCourseSchema,
    setCourseFeaturedSchema
};