// Controller de suporte: abertura e acompanhamento de chamados (RF22).
import { asyncHandler } from '../utils/asyncHandler.js';
import * as supportService from '../services/support.service.js';

// POST /api/support/tickets — abre um chamado.
export const createTicket = asyncHandler(async (req, res) => {
    const data = await supportService.createTicket(req.user, req.body);
    res.status(201).json({ status: 'success', message: 'Chamado aberto.', data });
});

// GET /api/support/tickets — lista chamados (próprios ou todos, se staff).
export const listTickets = asyncHandler(async (req, res) => {
    const data = await supportService.listTickets(req.user);
    res.status(200).json({ status: 'success', data });
});

// GET /api/support/tickets/:id — detalha um chamado com mensagens.
export const getTicket = asyncHandler(async (req, res) => {
    const data = await supportService.getTicket(req.user, req.params.id);
    res.status(200).json({ status: 'success', data });
});

// POST /api/support/tickets/:id/messages — adiciona mensagem/resposta.
export const addMessage = asyncHandler(async (req, res) => {
    const data = await supportService.addMessage(req.user, req.params.id, req.body.message);
    res.status(201).json({ status: 'success', message: 'Mensagem enviada.', data });
});

// PATCH /api/support/tickets/:id/status — atualiza o status (staff).
export const updateStatus = asyncHandler(async (req, res) => {
    const data = await supportService.updateStatus(req.params.id, req.body.status);
    res.status(200).json({ status: 'success', message: 'Status atualizado.', data });
});

export default { createTicket, listTickets, getTicket, addMessage, updateStatus };
