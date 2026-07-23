import * as userRepo
    from '../repositories/user.repository.js';

import * as courseRepo
    from '../repositories/course.repository.js';

import * as auditRepo
    from '../repositories/audit.repository.js';

import * as reportRepo
    from '../repositories/report.repository.js';

import { AppError }
    from '../utils/AppError.js';

import { COURSE_STATUS }
    from '../domain/enums/courseStatus.enum.js';

const findUserOrFail = async (userId) => {
    const user = await userRepo.findById(userId);

    if (!user) {
        throw new AppError(
            'Usuário não encontrado.',
            404
        );
    }

    return user;
};

const findCourseOrFail = async (courseId) => {
    const course = await courseRepo.findById(
        courseId
    );

    if (!course) {
        throw new AppError(
            'Curso não encontrado.',
            404
        );
    }

    return course;
};

const logAdminAction = async ({
    adminId,
    action,
    entity,
    entityId,
    details = null,
    ipAddress = null
}) => {
    await auditRepo.logAction({
        user_id: adminId,
        action,
        entity,
        entity_id: entityId,
        details,
        ip_address: ipAddress
    });
};

export const listUsers = async (role = null) => {
    return userRepo.listUsers({
        role: role || null
    });
};

export const updateUser = async (
    adminId,
    userId,
    data,
    ipAddress
) => {
    const previousUser = await findUserOrFail(
        userId
    );

    const updatedUser = await userRepo.updateUser(
        userId,
        data
    );

    if (!updatedUser) {
        throw new AppError(
            'Não foi possível atualizar o usuário.',
            400
        );
    }

    await logAdminAction({
        adminId,
        action: 'UPDATE_USER',
        entity: 'users',
        entityId: userId,
        details: {
            before: previousUser,
            after: updatedUser
        },
        ipAddress
    });

    return updatedUser;
};

export const setUserActive = async (
    adminId,
    userId,
    active,
    ipAddress
) => {
    await findUserOrFail(userId);

    if (
        String(adminId) === String(userId) &&
        active === false
    ) {
        throw new AppError(
            'O administrador não pode bloquear a própria conta.',
            400
        );
    }

    const updatedUser = await userRepo.setActive(
        userId,
        active
    );

    if (!updatedUser) {
        throw new AppError(
            'Não foi possível alterar o status do usuário.',
            400
        );
    }

    await logAdminAction({
        adminId,
        action: active
            ? 'UNBLOCK_USER'
            : 'BLOCK_USER',
        entity: 'users',
        entityId: userId,
        details: {
            active
        },
        ipAddress
    });

    return updatedUser;
};

export const deleteUser = async (
    adminId,
    userId,
    ipAddress
) => {
    const user = await findUserOrFail(userId);

    if (String(adminId) === String(userId)) {
        throw new AppError(
            'O administrador não pode excluir a própria conta.',
            400
        );
    }

    const deleted = await userRepo.softDelete(
        userId
    );

    if (!deleted) {
        throw new AppError(
            'Não foi possível excluir o usuário.',
            400
        );
    }

    await logAdminAction({
        adminId,
        action: 'DELETE_USER',
        entity: 'users',
        entityId: userId,
        details: {
            deletedUser: user
        },
        ipAddress
    });

    return {
        message: 'Usuário excluído com sucesso.'
    };
};

export const listPendingCourses = async () => {
    return courseRepo.listCourses({
        status: COURSE_STATUS.PENDING
    });
};

export const reviewCourse = async (
    adminId,
    courseId,
    status,
    ipAddress
) => {
    const previousCourse =
        await findCourseOrFail(courseId);

    const updatedCourse =
        await courseRepo.updateStatus(
            courseId,
            status
        );

    if (!updatedCourse) {
        throw new AppError(
            'Não foi possível atualizar o status do curso.',
            400
        );
    }

    await logAdminAction({
        adminId,
        action: 'REVIEW_COURSE',
        entity: 'courses',
        entityId: courseId,
        details: {
            previousStatus:
                previousCourse.status,
            newStatus: status
        },
        ipAddress
    });

    return updatedCourse;
};

export const setCourseFeatured = async (
    adminId,
    courseId,
    featured,
    ipAddress
) => {
    await findCourseOrFail(courseId);

    const updatedCourse =
        await courseRepo.updateFeatured(
            courseId,
            featured
        );

    if (!updatedCourse) {
        throw new AppError(
            'Não foi possível atualizar o destaque do curso.',
            400
        );
    }

    await logAdminAction({
        adminId,
        action: featured
            ? 'FEATURE_COURSE'
            : 'UNFEATURE_COURSE',
        entity: 'courses',
        entityId: courseId,
        details: {
            featured
        },
        ipAddress
    });

    return updatedCourse;
};

export const getDashboard = async () => {
    const [overview, topCourses] =
        await Promise.all([
            reportRepo.adminOverview(),
            reportRepo.topCourses(5)
        ]);

    return {
        overview,
        topCourses
    };
};

export const getAuditLogs = async ({
    limit = 100,
    offset = 0
} = {}) => {
    return auditRepo.listAudit({
        limit,
        offset
    });
};

export default {
    listUsers,
    updateUser,
    setUserActive,
    deleteUser,
    listPendingCourses,
    reviewCourse,
    setCourseFeatured,
    getDashboard,
    getAuditLogs
};