import * as userRepo from '../repositories/user.repository.js';
import * as profileRepo from '../repositories/userProfile.repository.js';
import * as enrollmentRepo from '../repositories/enrollment.repository.js';
import * as reviewRepo from '../repositories/courseReview.repository.js';
import * as certificateRepo from '../repositories/certificate.repository.js';
import * as lessonRepo from '../repositories/lesson.repository.js';
import * as moduleRepo from '../repositories/module.repository.js';
import * as activityRepo from '../repositories/activity.repository.js';
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

    // Formata os cursos ativos no formato esperado pelo frontend
    // (id, progress_percentage, total_lessons, completed_lessons).
    const activeCoursesShaped = await Promise.all(
        activeCourses.map(async (course) => {
            const totalLessons = await lessonRepo.countByCourse(course.course_id);
            const completedLessons = await progressRepo.countCompletedByCourse(
                userId,
                course.course_id
            );

            const progressPercentage =
                totalLessons > 0
                    ? Math.round((completedLessons / totalLessons) * 100)
                    : 0;

            return {
                id: course.course_id,
                title: course.title,
                description: course.description,
                thumbnail_url: course.thumbnail_url,
                workload_hours: course.workload_hours,
                progress_percentage: progressPercentage,
                total_lessons: totalLessons,
                completed_lessons: completedLessons
            };
        })
    );

    return {
        resumo: {
            cursos_matriculados: courses.length,
            cursos_ativos: activeCourses.length,
            cursos_concluidos: completedCourses.length,
            certificados: certificates.length,
            horas_totais: totalHours
        },
        cursos_ativos: activeCoursesShaped,
        certificados: certificates
    };
};

export const getCertificates = async (userId) => {
    return certificateRepo.findByStudent(userId);
};


// Monta a estrutura completa do curso (módulos, aulas e atividades) com o
// status de trava calculado para o aluno: cada aula só libera após a anterior
// ser concluída; a atividade do módulo só libera após todas as aulas do
// módulo estarem concluídas; o próximo módulo só libera após a atividade do
// módulo anterior estar aprovada (nota >= mínima).
export const getCourseStructure = async (userId, courseId) => {
    const enrollment = await enrollmentRepo.findOne(userId, courseId);
    if (!enrollment || enrollment.status === ENROLLMENT_STATUS.CANCELLED) {
        throw new AppError('Você não está matriculado neste curso.', 403);
    }

    const course = await getCourseOrFail(courseId);
    const modules = await moduleRepo.findByCourse(courseId);
    const lessonRows = await lessonRepo.findByCourseWithProgress(courseId, userId);
    const activityRows = await activityRepo.findByCourseWithProgress(courseId, userId);

    const lessonsByModule = new Map();
    for (const row of lessonRows) {
        const list = lessonsByModule.get(row.module_id) ?? [];
        list.push(row);
        lessonsByModule.set(row.module_id, list);
    }

    const activityByModule = new Map();
    for (const row of activityRows) {
        if (!activityByModule.has(row.module_id)) {
            activityByModule.set(row.module_id, row);
        }
    }

    let previousModulePassed = true;

    const result = modules.map((module) => {
        const lessons = lessonsByModule.get(module.id) ?? [];
        let previousLessonCompleted = previousModulePassed;

        const lessonsWithStatus = lessons.map((lesson) => {
            const isCompleted = lesson.progress_status === 'COMPLETED';
            const locked = !previousLessonCompleted;
            const status = locked ? 'LOCKED' : isCompleted ? 'COMPLETED' : 'AVAILABLE';

            previousLessonCompleted = isCompleted;

            return {
                id: lesson.id,
                title: lesson.title,
                description: lesson.description,
                video_url: lesson.video_url,
                duration_seconds: lesson.duration_seconds,
                status
            };
        });

        const allLessonsCompleted =
            lessons.length > 0 &&
            lessons.every((lesson) => lesson.progress_status === 'COMPLETED');

        const activity = activityByModule.get(module.id);
        let activityInfo = null;
        let modulePassed = allLessonsCompleted;

        if (activity) {
            const locked = !allLessonsCompleted;
            const graded = activity.progress_status === 'GRADED';
            const passed = graded && Number(activity.grade) >= Number(activity.minimum_grade);

            activityInfo = {
                id: activity.id,
                title: activity.title,
                question_count: activity.question_count,
                minimum_grade: activity.minimum_grade,
                status: locked ? 'LOCKED' : (activity.progress_status ?? 'AVAILABLE'),
                grade: activity.grade,
                passed
            };

            modulePassed = passed;
        }

        previousModulePassed = modulePassed;

        return {
            id: module.id,
            name: module.name,
            order: module.order,
            locked: lessons.length > 0 && lessonsWithStatus[0]?.status === 'LOCKED',
            lessons: lessonsWithStatus,
            activity: activityInfo
        };
    });

    return {
        course_id: course.id,
        course_title: course.title,
        modules: result
    };
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
    getCertificates,
    getCourseStructure
};