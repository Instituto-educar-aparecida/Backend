import { asyncHandler }
    from '../utils/asyncHandler.js';

import * as courseService
    from '../services/course.service.js';

import * as moduleService
    from '../services/module.service.js';

export const createCourse = asyncHandler(
    async (req, res) => {
        const data =
            await courseService.createCourse(
                req.body,
                req.user
            );

        return res.status(201).json({
            status: 'success',
            message: 'Curso criado com sucesso.',
            data
        });
    }
);

export const listCourses = asyncHandler(
    async (req, res) => {
        const data =
            await courseService.listCourses(
                req.query,
                req.user
            );

        return res.status(200).json({
            status: 'success',
            data
        });
    }
);

export const getCourse = asyncHandler(
    async (req, res) => {
        const data =
            await courseService.getCourseDetails(
                req.params.id
            );

        return res.status(200).json({
            status: 'success',
            data
        });
    }
);

export const updateCourse = asyncHandler(
    async (req, res) => {
        const data =
            await courseService.updateCourse(
                req.params.id,
                req.body,
                req.user
            );

        return res.status(200).json({
            status: 'success',
            message: 'Curso atualizado.',
            data
        });
    }
);

export const deleteCourse = asyncHandler(
    async (req, res) => {
        await courseService.deleteCourse(
            req.params.id,
            req.user
        );

        return res.status(200).json({
            status: 'success',
            message: 'Curso removido.'
        });
    }
);

export const createModule = asyncHandler(
    async (req, res) => {
        const data =
            await moduleService.createModule(
                req.params.id,
                req.body,
                req.user
            );

        return res.status(201).json({
            status: 'success',
            message: 'Módulo criado.',
            data
        });
    }
);

export const updateStatus = asyncHandler(
    async (req, res) => {
        const data =
            await courseService.updateStatus(
                req.params.id,
                req.body.status
            );

        return res.status(200).json({
            status: 'success',
            message: 'Status do curso atualizado.',
            data
        });
    }
);

export const updateFeatured = asyncHandler(
    async (req, res) => {
        const data =
            await courseService.updateFeatured(
                req.params.id,
                req.body.featured
            );

        return res.status(200).json({
            status: 'success',
            message:
                'Destaque do curso atualizado.',
            data
        });
    }
);

export default {
    createCourse,
    listCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    createModule,
    updateStatus,
    updateFeatured
};