import * as supportRepository
    from '../repositories/support.repository.js';

import { AppError }
    from '../utils/AppError.js';

import { USER_ROLE }
    from '../domain/enums/userRole.enum.js';

const STAFF_ROLES = [
    USER_ROLE.ADMIN,
    USER_ROLE.SECRETARY
].filter(Boolean);

const isStaff = (user) => {
    return STAFF_ROLES.includes(user.role);
};

const ensureTicketAccess = (user, ticket) => {
    const ownsTicket =
        String(ticket.user_id) === String(user.id);

    if (!ownsTicket && !isStaff(user)) {
        throw new AppError(
            'Você não possui permissão para acessar este chamado.',
            403
        );
    }
};

export const createTicket = async (user, payload) => {
    return supportRepository.createTicket({
        user_id: user.id,
        subject: payload.subject,
        message: payload.message
    });
};

export const listTickets = async (user) => {
    if (isStaff(user)) {
        return supportRepository.listTickets();
    }

    return supportRepository.listTickets({
        userId: user.id
    });
};

export const getTicket = async (user, ticketId) => {
    const ticket = await supportRepository.findById(ticketId);

    if (!ticket) {
        throw new AppError('Chamado não encontrado.', 404);
    }

    ensureTicketAccess(user, ticket);

    const messages =
        await supportRepository.getMessages(ticketId);

    return {
        ...ticket,
        messages
    };
};

export const addMessage = async (
    user,
    ticketId,
    message
) => {
    const ticket = await supportRepository.findById(ticketId);

    if (!ticket) {
        throw new AppError('Chamado não encontrado.', 404);
    }

    ensureTicketAccess(user, ticket);

    return supportRepository.addMessage(
        ticketId,
        user.id,
        message
    );
};

export const updateStatus = async (
    user,
    ticketId,
    status
) => {
    if (!isStaff(user)) {
        throw new AppError(
            'Apenas a equipe de suporte pode alterar o status do chamado.',
            403
        );
    }

    const ticket = await supportRepository.findById(ticketId);

    if (!ticket) {
        throw new AppError('Chamado não encontrado.', 404);
    }

    return supportRepository.updateStatus(
        ticketId,
        status
    );
};

export default {
    createTicket,
    listTickets,
    getTicket,
    addMessage,
    updateStatus
};