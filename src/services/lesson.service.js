import * as lessonRepo from '../repositories/lesson.repository.js';
import * as progressRepo from '../repositories/lessonProgress.repository.js';

import { getModuleOrFail } from './module.service.js';
import {
    getCourseOrFail,
    assertCanManage
} from './course.service.js';

import { AppError } from '../utils/AppError.js';
import { PROGRESS_STATUS }
    from '../domain/enums/progressStatus.enum.js';

export const getLessonOrFail = async (id) => {
    const lesson = await lessonRepo.findById(id);

    if (!lesson) {
        throw new AppError('Aula não encontrada.', 404);
    }

    return lesson;
};

const assertCanManageLesson = async (lesson, user) => {
    const module = await getModuleOrFail(
        lesson.module_id
    );

    const course = await getCourseOrFail(
        module.course_id
    );

    assertCanManage(course, user);

    return course;
};

export const createLesson = async (
    moduleId,
    data,
    user
) => {
    const module = await getModuleOrFail(moduleId);

    const course = await getCourseOrFail(
        module.course_id
    );

    assertCanManage(course, user);

    return lessonRepo.createLesson({
        ...data,
        module_id: moduleId,
        teacher_id: user.id
    });
};

export const updateLesson = async (
    lessonId,
    data,
    user
) => {
    const lesson = await getLessonOrFail(lessonId);

    await assertCanManageLesson(lesson, user);

    return lessonRepo.updateLesson(
        lessonId,
        data
    );
};

export const deleteLesson = async (
    lessonId,
    user
) => {
    const lesson = await getLessonOrFail(lessonId);

    await assertCanManageLesson(lesson, user);

    return lessonRepo.softDelete(lessonId);
};

export const saveProgress = async (
    lessonId,
    data,
    user
) => {
    await getLessonOrFail(lessonId);

    const status =
        data.status ||
        PROGRESS_STATUS.IN_PROGRESS;

    return progressRepo.saveProgress({
        student_id: user.id,
        lesson_id: lessonId,
        watch_seconds: data.watch_seconds ?? 0,
        status
    });
};

export const addSupportText = async (
    lessonId,
    content,
    user
) => {
    const lesson = await getLessonOrFail(lessonId);

    await assertCanManageLesson(lesson, user);

    return lessonRepo.addSupportText(
        lessonId,
        content
    );
};

export const addFile = async (
    lessonId,
    data,
    user
) => {
    const lesson = await getLessonOrFail(lessonId);

    await assertCanManageLesson(lesson, user);

    return lessonRepo.addFile(
        lessonId,
        data
    );
};

export const getLessonContent = async (
    lessonId
) => {
    const lesson = await getLessonOrFail(lessonId);

    const supportTexts =
        await lessonRepo.getSupportTexts(
            lessonId
        );

    const files = await lessonRepo.getFiles(
        lessonId
    );

    return {
        ...lesson,
        supportTexts,
        files
    };
};

export default {
    getLessonOrFail,
    createLesson,
    updateLesson,
    deleteLesson,
    saveProgress,
    addSupportText,
    addFile,
    getLessonContent
};