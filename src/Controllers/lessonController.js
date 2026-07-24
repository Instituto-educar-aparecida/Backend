import { asyncHandler }
    from '../utils/asyncHandler.js';

import * as lessonService
    from '../services/lesson.service.js';

export const getLesson = asyncHandler(
    async (req, res) => {
        const data =
            await lessonService.getLessonContent(
                req.params.id
            );

        return res.status(200).json({
            status: 'success',
            data
        });
    }
);

export const updateLesson = asyncHandler(
    async (req, res) => {
        const data =
            await lessonService.updateLesson(
                req.params.id,
                req.body,
                req.user
            );

        return res.status(200).json({
            status: 'success',
            message: 'Aula atualizada.',
            data
        });
    }
);

export const deleteLesson = asyncHandler(
    async (req, res) => {
        await lessonService.deleteLesson(
            req.params.id,
            req.user
        );

        return res.status(200).json({
            status: 'success',
            message: 'Aula removida.'
        });
    }
);

export const saveProgress = asyncHandler(
    async (req, res) => {
        const data =
            await lessonService.saveProgress(
                req.params.id,
                req.body,
                req.user
            );

        return res.status(200).json({
            status: 'success',
            message: 'Progresso registrado.',
            data
        });
    }
);

export const addSupportText = asyncHandler(
    async (req, res) => {
        const data =
            await lessonService.addSupportText(
                req.params.id,
                req.body.content,
                req.user
            );

        return res.status(201).json({
            status: 'success',
            message: 'Texto de apoio adicionado.',
            data
        });
    }
);

export const addFile = asyncHandler(
    async (req, res) => {
        const data =
            await lessonService.addFile(
                req.params.id,
                req.body,
                req.user
            );

        return res.status(201).json({
            status: 'success',
            message: 'Arquivo adicionado.',
            data
        });
    }
);

export default {
    getLesson,
    updateLesson,
    deleteLesson,
    saveProgress,
    addSupportText,
    addFile
};