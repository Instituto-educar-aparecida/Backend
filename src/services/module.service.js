import * as moduleRepo from '../repositories/module.repository.js';
import {
    getCourseOrFail,
    assertCanManage
} from './course.service.js';
import { AppError } from '../utils/AppError.js';

export const getModuleOrFail = async (id) => {
    const module = await moduleRepo.findById(id);

    if (!module) {
        throw new AppError('Módulo não encontrado.', 404);
    }

    return module;
};

export const createModule = async (
    courseId,
    data,
    user
) => {
    const course = await getCourseOrFail(courseId);

    assertCanManage(course, user);

    return moduleRepo.createModule({
        ...data,
        course_id: courseId
    });
};

export const updateModule = async (
    moduleId,
    data,
    user
) => {
    const module = await getModuleOrFail(moduleId);
    const course = await getCourseOrFail(module.course_id);

    assertCanManage(course, user);

    return moduleRepo.updateModule(moduleId, data);
};

export const deleteModule = async (
    moduleId,
    user
) => {
    const module = await getModuleOrFail(moduleId);
    const course = await getCourseOrFail(module.course_id);

    assertCanManage(course, user);

    return moduleRepo.softDelete(moduleId);
};

export default {
    getModuleOrFail,
    createModule,
    updateModule,
    deleteModule
};