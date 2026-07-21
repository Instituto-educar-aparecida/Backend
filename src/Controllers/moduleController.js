import { asyncHandler } from '../utils/asyncHandler.js';
import * as moduleService from '../services/module.service.js';
import * as lessonService from '../services/lesson.service.js';
import * as activityService from '../services/activity.service.js';

export const updateModule = asyncHandler(
    async (req, res) => {
        const data = await moduleService.updateModule(
            req.params.id,
            req.body,
            req.user
        );

        return res.status(200).json({
            status: 'success',
            message: 'Módulo atualizado.',
            data
        });
    }
);

export const deleteModule = asyncHandler(
    async (req, res) => {
        await moduleService.deleteModule(
            req.params.id,
            req.user
        );

        return res.status(200).json({
            status: 'success',
            message: 'Módulo removido.'
        });
    }
);

export const createLesson = asyncHandler(
    async (req, res) => {
        const data = await lessonService.createLesson(
            req.params.id,
            req.body,
            req.user
        );

        return res.status(201).json({
            status: 'success',
            message: 'Aula criada.',
            data
        });
    }
);

export const createActivity = asyncHandler(
    async (req, res) => {
        const data = await activityService.createActivity(
            req.params.id,
            req.body,
            req.user
        );

        return res.status(201).json({
            status: 'success',
            message: 'Atividade criada.',
            data
        });
    }
);

export default {
    updateModule,
    deleteModule,
    createLesson,
    createActivity
};