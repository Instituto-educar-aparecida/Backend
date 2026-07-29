import * as activityRepo
    from '../repositories/activity.repository.js';

import * as questionRepo
    from '../repositories/question.repository.js';

import * as progressRepo
    from '../repositories/activityProgress.repository.js';

import { getModuleOrFail }
    from './module.service.js';

import {
    getCourseOrFail,
    assertCanManage
} from './course.service.js';

import { AppError }
    from '../utils/AppError.js';

import { ACTIVITY_PROGRESS_STATUS }
    from '../domain/enums/activityProgressStatus.enum.js';

export const getActivityOrFail = async (id) => {
    const activity = await activityRepo.findById(id);

    if (!activity) {
        throw new AppError(
            'Atividade não encontrada.',
            404
        );
    }

    return activity;
};

const assertCanManageActivity = async (
    activity,
    user
) => {
    const module = await getModuleOrFail(
        activity.module_id
    );

    const course = await getCourseOrFail(
        module.course_id
    );

    assertCanManage(course, user);

    return course;
};

export const createActivity = async (
    moduleId,
    data,
    user
) => {
    const module = await getModuleOrFail(moduleId);

    const course = await getCourseOrFail(
        module.course_id
    );

    assertCanManage(course, user);

    return activityRepo.createActivity({
        ...data,
        module_id: moduleId
    });
};

export const updateActivity = async (
    activityId,
    data,
    user
) => {
    const activity =
        await getActivityOrFail(activityId);

    await assertCanManageActivity(
        activity,
        user
    );

    return activityRepo.updateActivity(
        activityId,
        data
    );
};

export const deleteActivity = async (
    activityId,
    user
) => {
    const activity =
        await getActivityOrFail(activityId);

    await assertCanManageActivity(
        activity,
        user
    );

    return activityRepo.softDelete(activityId);
};

export const addObjectiveQuestion = async (
    activityId,
    data,
    user
) => {
    const activity =
        await getActivityOrFail(activityId);

    await assertCanManageActivity(
        activity,
        user
    );

    const question =
        await questionRepo.addObjective(
            activityId,
            data
        );

    await activityRepo.refreshQuestionCount(
        activityId
    );

    return question;
};

export const addOpenQuestion = async (
    activityId,
    data,
    user
) => {
    const activity =
        await getActivityOrFail(activityId);

    await assertCanManageActivity(
        activity,
        user
    );

    const question =
        await questionRepo.addOpen(
            activityId,
            data
        );

    await activityRepo.refreshQuestionCount(
        activityId
    );

    return question;
};

export const submit = async (
    activityId,
    payload,
    user
) => {
    const activity =
        await getActivityOrFail(activityId);

    const objectiveQuestions =
        await questionRepo.getObjectiveByActivity(
            activityId
        );

    const openQuestions =
        await questionRepo.getOpenByActivity(
            activityId
        );

    const answers = payload.answers ?? [];

    const answerMap = new Map(
        answers.map((answer) => [
            String(answer.question_id),
            Number(answer.selected_option)
        ])
    );

    let correctCount = 0;
    let grade = null;
    let status =
        ACTIVITY_PROGRESS_STATUS.SUBMITTED;

    if (objectiveQuestions.length > 0) {
        for (const question of objectiveQuestions) {
            const selectedOption = answerMap.get(
                String(question.id)
            );

            if (
                selectedOption !== undefined &&
                selectedOption ===
                    Number(question.correct_option)
            ) {
                correctCount += 1;
            }
        }

        grade = Number(
            (
                correctCount /
                objectiveQuestions.length *
                10
            ).toFixed(2)
        );
    }

    if (
        objectiveQuestions.length > 0 &&
        openQuestions.length === 0
    ) {
        status =
            ACTIVITY_PROGRESS_STATUS.GRADED;
    }

    const progress = await progressRepo.submit({
        student_id: user.id,
        activity_id: activityId,
        grade,
        status
    });

    const minimumGrade =
        Number(activity.minimum_grade);

    const passed =
        grade === null
            ? null
            : grade >= minimumGrade;

    return {
        progress,
        automatic_correction: {
            total_objective_questions:
                objectiveQuestions.length,

            correct_answers: correctCount,

            grade,

            pending_open_questions:
                openQuestions.length,

            passed,

            minimum_grade: minimumGrade
        }
    };
};

export const gradeSubmission = async (
    activityId,
    studentId,
    grade,
    user
) => {
    const activity =
        await getActivityOrFail(activityId);

    await assertCanManageActivity(
        activity,
        user
    );

    const existingProgress =
        await progressRepo.getProgress(
            studentId,
            activityId
        );

    if (!existingProgress) {
        throw new AppError(
            'Submissão não encontrada para este aluno.',
            404
        );
    }

    return progressRepo.grade(
        studentId,
        activityId,
        grade
    );
};

export const getProgress = async (
    activityId,
    user
) => {
    await getActivityOrFail(activityId);

    const progress =
        await progressRepo.getProgress(
            user.id,
            activityId
        );

    if (!progress) {
        return {
            status:
                ACTIVITY_PROGRESS_STATUS.NOT_STARTED,
            grade: null
        };
    }

    return progress;
};

// Retorna as perguntas de uma atividade para o aluno responder,
// sem expor o gabarito (correct_option) das questões objetivas.
export const getQuestionsForStudent = async (activityId) => {
    await getActivityOrFail(activityId);

    const objectiveQuestions = await questionRepo.getObjectiveByActivity(activityId);
    const openQuestions = await questionRepo.getOpenByActivity(activityId);

    const safeObjective = objectiveQuestions.map((q) => ({
        id: q.id,
        description: q.description,
        image_url: q.image_url,
        option_1: q.option_1,
        option_2: q.option_2,
        option_3: q.option_3,
        option_4: q.option_4,
        option_5: q.option_5,
        type: 'objective'
    }));

    const safeOpen = openQuestions.map((q) => ({
        id: q.id,
        description: q.description,
        image_url: q.image_url,
        type: 'open'
    }));

    return { objective_questions: safeObjective, open_questions: safeOpen };
};

export default {
    getActivityOrFail,
    createActivity,
    updateActivity,
    deleteActivity,
    addObjectiveQuestion,
    addOpenQuestion,
    submit,
    gradeSubmission,
    getProgress,
    getQuestionsForStudent
};