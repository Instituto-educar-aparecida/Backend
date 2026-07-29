import { asyncHandler }
    from '../utils/asyncHandler.js';

import * as activityService
    from '../services/activity.service.js';

export const updateActivity = asyncHandler(
    async (req, res) => {
        const data =
            await activityService.updateActivity(
                req.params.id,
                req.body,
                req.user
            );

        return res.status(200).json({
            status: 'success',
            message: 'Atividade atualizada.',
            data
        });
    }
);

export const deleteActivity = asyncHandler(
    async (req, res) => {
        await activityService.deleteActivity(
            req.params.id,
            req.user
        );

        return res.status(200).json({
            status: 'success',
            message: 'Atividade removida.'
        });
    }
);

export const addObjectiveQuestion =
    asyncHandler(async (req, res) => {
        const data =
            await activityService
                .addObjectiveQuestion(
                    req.params.id,
                    req.body,
                    req.user
                );

        return res.status(201).json({
            status: 'success',
            message:
                'Questão objetiva adicionada.',
            data
        });
    });

export const addOpenQuestion =
    asyncHandler(async (req, res) => {
        const data =
            await activityService.addOpenQuestion(
                req.params.id,
                req.body,
                req.user
            );

        return res.status(201).json({
            status: 'success',
            message:
                'Questão aberta adicionada.',
            data
        });
    });

export const submit = asyncHandler(
    async (req, res) => {
        const data =
            await activityService.submit(
                req.params.id,
                req.body,
                req.user
            );

        return res.status(200).json({
            status: 'success',
            message: 'Atividade submetida.',
            data
        });
    }
);

export const gradeSubmission = asyncHandler(
    async (req, res) => {
        const data =
            await activityService.gradeSubmission(
                req.params.id,
                req.params.studentId,
                req.body.grade,
                req.user
            );

        return res.status(200).json({
            status: 'success',
            message: 'Nota atribuída.',
            data
        });
    }
);

export const getProgress = asyncHandler(
    async (req, res) => {
        const data =
            await activityService.getProgress(
                req.params.id,
                req.user
            );

        return res.status(200).json({
            status: 'success',
            data
        });
    }
);

export const getQuestionsForStudent = asyncHandler(
    async (req, res) => {
        const data = await activityService.getQuestionsForStudent(req.params.id);
        return res.status(200).json({
            status: 'success',
            data
        });
    }
);

export default {
    updateActivity,
    deleteActivity,
    addObjectiveQuestion,
    addOpenQuestion,
    submit,
    gradeSubmission,
    getProgress,
    getQuestionsForStudent
};