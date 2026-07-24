// Controller de notificações: consulta e marcação de leitura (RF23).
import { asyncHandler } from '../utils/asyncHandler.js';
import * as notificationService from '../services/notification.service.js';

// GET /api/notifications — lista notificações do usuário autenticado.
export const list = asyncHandler(async (req, res) => {
    const data = await notificationService.list(req.user.id);
    res.status(200).json({ status: 'success', data });
});

// PATCH /api/notifications/:id/read — marca uma notificação como lida.
export const markAsRead = asyncHandler(async (req, res) => {
    const data = await notificationService.markAsRead(req.user.id, req.params.id);
    res.status(200).json({ status: 'success', message: 'Notificação marcada como lida.', data });
});

export default { list, markAsRead };
