import * as userRepo from '../repositories/user.repository.js';
import * as profileRepo from '../repositories/userProfile.repository.js';
import * as enrollmentRepo from '../repositories/enrollment.repository.js';
import * as reviewRepo from '../repositories/courseReview.repository.js';
import * as certificateRepo from '../repositories/certificate.repository.js';
import * as lessonRepo from '../repositories/lesson.repository.js';
import * as progressRepo from '../repositories/lessonProgress.repository.js';
import * as notificationRepo from '../repositories/notification.repository.js';

import { getCourseOrFail } from './course.service.js';
import { AppError } from '../utils/AppError.js';
import { COURSE_STATUS } from '../domain/enums/courseStatus.enum.js';
import { ENROLLMENT_STATUS } from '../domain/enums/enrollmentStatus.enum.js';

export const updateProfile = async (userId, data) => {
    const updatedUser = await userRepo.updateUser(userId, {
        name: data.name,
        bio: data.bio,
        phone: data.phone,
        avatar_url: data.avatar_url
    });

    if (!updatedUser) {
        throw new AppError('Usuário não encontrado.', 404);
    }

    await profileRepo.upsertProfile(userId, {
        bio: data.bio ?? null,
        phone: data.phone ?? null,
        avatar_url: data.avatar_url ?? null
    });

    return updatedUser;
};

export const getMyCourses = async (userId) => {
    return enrollmentRepo.findByStudent(userId);
};

export const enroll = async (userId, courseId) => {
    const course = await getCourseOrFail(courseId);

    if (course.status !== COURSE_STATUS.APPROVED) {
        throw new AppError(
            'Este curso não está disponível para matrícula.',
            400
        );
    }

    if (!course.enrollment_open) {
        throw new AppError(
            'As matrículas para este curso estão encerradas.',
            400
        );
    }

    const currentEnrollment = await enrollmentRepo.findOne(
        userId,
        courseId
    );

    if (
        currentEnrollment &&
        currentEnrollment.status !== ENROLLMENT_STATUS.CANCELLED
    ) {
        throw new AppError(
            'Você já está matriculado neste curso.',
            409
        );
    }

    const enrollment = await enrollmentRepo.enroll(
        userId,
        courseId
    );

    await notificationRepo.createNotification({
        user_id: userId,
        title: 'Matrícula confirmada',
        message: `Você se matriculou no curso "${course.title}". Bons estudos!`,
        type: 'success'
    });

    return enrollment;
};

export const cancelEnrollment = async (userId, courseId) => {
    const enrollment = await enrollmentRepo.findOne(
        userId,
        courseId
    );

    if (
        !enrollment ||
        enrollment.status === ENROLLMENT_STATUS.CANCELLED
    ) {
        throw new AppError('Matrícula não encontrada.', 404);
    }

    return enrollmentRepo.cancel(userId, courseId);
};

export const reviewCourse = async (
    userId,
    courseId,
    rating,
    comment
) => {
    await getCourseOrFail(courseId);

    const enrollment = await enrollmentRepo.findOne(
        userId,
        courseId
    );

    if (
        !enrollment ||
        enrollment.status === ENROLLMENT_STATUS.CANCELLED
    ) {
        throw new AppError(
            'Você precisa estar matriculado para avaliar este curso.',
            403
        );
    }

    return reviewRepo.upsertReview(
        userId,
        courseId,
        rating,
        comment
    );
};

export const recalcCourseProgress = async (
    userId,
    courseId
) => {
    const totalLessons = await lessonRepo.countByCourse(courseId);

    if (totalLessons === 0) {
        return 0;
    }

    const completedLessons =
        await progressRepo.countCompletedByCourse(
            userId,
            courseId
        );

    const percent = Math.min(
        100,
        Math.round(
            (completedLessons / totalLessons) * 100
        )
    );

    await enrollmentRepo.updateProgress(
        userId,
        courseId,
        percent
    );

    return percent;
};

export const getCourseProgress = async (
    userId,
    courseId
) => {
    const enrollment = await enrollmentRepo.findOne(
        userId,
        courseId
    );

    if (
        !enrollment ||
        enrollment.status === ENROLLMENT_STATUS.CANCELLED
    ) {
        throw new AppError('Matrícula não encontrada.', 404);
    }

    return recalcCourseProgress(userId, courseId);
};

export const getDashboard = async (userId) => {
    const courses = await enrollmentRepo.findByStudent(userId);

    const activeCourses = courses.filter(
        (course) =>
            course.status === ENROLLMENT_STATUS.ACTIVE
    );

    const completedCourses = courses.filter(
        (course) =>
            course.status === ENROLLMENT_STATUS.COMPLETED
    );

    const certificates =
        await certificateRepo.findByStudent(userId);

    const totalHours = courses.reduce(
        (total, course) =>
            total + Number(course.workload_hours || 0),
        0
    );

    return {
        resumo: {
            cursos_matriculados: courses.length,
            cursos_ativos: activeCourses.length,
            cursos_concluidos: completedCourses.length,
            certificados: certificates.length,
            horas_totais: totalHours
        },
        cursos_ativos: activeCourses,
        certificados: certificates
    };
};

export const getCertificates = async (userId) => {
    return certificateRepo.findByStudent(userId);
};

export default {
    updateProfile,
    getMyCourses,
    enroll,
    cancelEnrollment,
    reviewCourse,
    recalcCourseProgress,
    getCourseProgress,
    getDashboard,
    getCertificates
};