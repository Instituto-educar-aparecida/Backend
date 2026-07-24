// Controller do instrutor: painel e relatórios dos próprios cursos (RF20).
import { asyncHandler } from '../utils/asyncHandler.js';
import * as instructorService from '../services/instructor.service.js';

// GET /api/instructor/dashboard — relatório consolidado do instrutor.
export const getDashboard = asyncHandler(async (req, res) => {
    const data = await instructorService.getDashboard(req.user.id);
    res.status(200).json({ status: 'success', data });
});

// GET /api/instructor/courses — cursos do instrutor autenticado.
export const getMyCourses = asyncHandler(async (req, res) => {
    const data = await instructorService.getMyCourses(req.user.id);
    res.status(200).json({ status: 'success', data });
});

export default { getDashboard, getMyCourses };
