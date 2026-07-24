import { z } from 'zod';

import { TICKET_STATUS }
    from '../domain/enums/ticketStatus.enum.js';

export const createTicketSchema = z.object({
    body: z.object({
        subject: z
            .string()
            .trim()
            .min(3, 'O assunto deve ter pelo menos 3 caracteres.')
            .max(150, 'O assunto deve ter no máximo 150 caracteres.'),

        message: z
            .string()
            .trim()
            .min(5, 'A mensagem deve ter pelo menos 5 caracteres.')
            .max(5000, 'A mensagem deve ter no máximo 5000 caracteres.')
    })
});

export const addMessageSchema = z.object({
    body: z.object({
        message: z
            .string()
            .trim()
            .min(1, 'A mensagem é obrigatória.')
            .max(5000, 'A mensagem deve ter no máximo 5000 caracteres.')
    })
});

export const updateTicketStatusSchema = z.object({
    body: z.object({
        status: z.enum([
            TICKET_STATUS.OPEN,
            TICKET_STATUS.IN_PROGRESS,
            TICKET_STATUS.CLOSED
        ])
    })
});

export const ticketIdSchema = z.object({
    params: z.object({
        id: z.coerce
            .number()
            .int()
            .positive('O ID do chamado deve ser válido.')
    })
});

export default {
    createTicketSchema,
    addMessageSchema,
    updateTicketStatusSchema,
    ticketIdSchema
};