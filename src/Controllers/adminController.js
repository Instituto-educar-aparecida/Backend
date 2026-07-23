// Controller administrativo: usuários, aprovação de cursos, relatórios e auditoria.
import { asyncHandler } from '../utils/asyncHandler.js';
import * as adminService from '../services/admin.service.js';

// GET /api/admin/users — lista usuários, com filtro opcional por papel (RF06).
export const listUsers = asyncHandler(async (req, res) => {
    const data = await adminService.listUsers(req.query.role);
    res.status(200).json({ status: 'success', data });
});

// PUT /api/admin/users/:id — atualiza um usuário (RF06).
export const updateUser = asyncHandler(async (req, res) => {
    const data = await adminService.updateUser(req.user.id, req.params.id, req.body, req.ip);
    res.status(200).json({ status: 'success', message: 'Usuário atualizado.', data });
});

// PATCH /api/admin/users/:id/block — bloqueia/desbloqueia um usuário (RF07).
export const setUserActive = asyncHandler(async (req, res) => {
    const data = await adminService.setUserActive(req.user.id, req.params.id, req.body.active, req.ip);
    const msg = req.body.active ? 'Usuário desbloqueado.' : 'Usuário bloqueado.';
    res.status(200).json({ status: 'success', message: msg, data });
});

// DELETE /api/admin/users/:id — exclui logicamente um usuário (RF06).
export const deleteUser = asyncHandler(async (req, res) => {
    const data = await adminService.deleteUser(req.user.id, req.params.id, req.ip);
    res.status(200).json({ status: 'success', ...data });
});

// GET /api/admin/courses/pending — cursos pendentes de aprovação (RF08).
export const listPendingCourses = asyncHandler(async (req, res) => {
    const data = await adminService.listPendingCourses();
    res.status(200).json({ status: 'success', data });
});

// PATCH /api/admin/courses/:id/status — aprova/rejeita um curso (RF08).
export const reviewCourse = asyncHandler(async (req, res) => {
    const data = await adminService.reviewCourse(req.user.id, req.params.id, req.body.status, req.ip);
    res.status(200).json({ status: 'success', message: 'Status do curso atualizado.', data });
});

// PATCH /api/admin/courses/:id/featured — destaca/remove destaque de um curso (RF09).
export const setCourseFeatured = asyncHandler(async (req, res) => {
    const data = await adminService.setCourseFeatured(req.user.id, req.params.id, req.body.featured, req.ip);
    res.status(200).json({ status: 'success', message: 'Destaque atualizado.', data });
});

// GET /api/admin/dashboard — painel administrativo (RF20).
export const getDashboard = asyncHandler(async (req, res) => {
    const data = await adminService.getDashboard();
    res.status(200).json({ status: 'success', data });
});

// GET /api/admin/audit-logs — logs de auditoria (RF21).
export const getAuditLogs = asyncHandler(async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 100;
    const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0;
    const data = await adminService.getAuditLogs({ limit, offset });
    res.status(200).json({ status: 'success', data });
});

export default {
    listUsers, updateUser, setUserActive, deleteUser,
    listPendingCourses, reviewCourse, setCourseFeatured, getDashboard, getAuditLogs,
};
