import * as studentService from '../services/student.service.js';

export const updateProfile = async (req, res, next) => {
    try {
        const user = await studentService.updateProfile(
            req.user.id,
            req.body
        );

        return res.status(200).json({
            status: 'success',
            message: 'Perfil atualizado.',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

export const getDashboard = async (req, res, next) => {
    try {
        const dashboard = await studentService.getDashboard(req.user.id);

        return res.status(200).json({
            status: 'success',
            data: dashboard
        });
    } catch (error) {
        next(error);
    }
};

export const getMyCourses = async (req, res, next) => {
    try {
        const courses = await studentService.getMyCourses(req.user.id);

        return res.status(200).json({
            status: 'success',
            data: courses
        });
    } catch (error) {
        next(error);
    }
};

export const enroll = async (req, res, next) => {
    try {
        const enrollment = await studentService.enroll(
            req.user.id,
            req.body.course_id
        );

        return res.status(201).json({
            status: 'success',
            message: 'Matrícula realizada com sucesso.',
            data: enrollment
        });
    } catch (error) {
        next(error);
    }
};

export const cancelEnrollment = async (req, res, next) => {
    try {
        const enrollment = await studentService.cancelEnrollment(
            req.user.id,
            req.params.courseId
        );

        return res.status(200).json({
            status: 'success',
            message: 'Matrícula cancelada.',
            data: enrollment
        });
    } catch (error) {
        next(error);
    }
};

export const getCourseProgress = async (req, res, next) => {
    try {
        const progress = await studentService.getCourseProgress(
            req.user.id,
            req.params.courseId
        );

        return res.status(200).json({
            status: 'success',
            data: {
                progress_percent: progress
            }
        });
    } catch (error) {
        next(error);
    }
};

export const reviewCourse = async (req, res, next) => {
    try {
        const review = await studentService.reviewCourse(
            req.user.id,
            req.body.course_id,
            req.body.rating,
            req.body.comment
        );

        return res.status(201).json({
            status: 'success',
            message: 'Avaliação registrada.',
            data: review
        });
    } catch (error) {
        next(error);
    }
};

export const getCertificates = async (req, res) => {
    const data = await studentService.getCertificates(req.user.id);
    res.status(200).json({ status: 'success', data });
};

// POST /api/student/courses/:courseId/certificate — emite o certificado (RF18).
export const issueCertificate = async (req, res) => {
    const data = await certificateService.issueCertificate(req.user.id, req.params.courseId);
    res.status(201).json({ status: 'success', message: 'Certificado emitido.', data });
};

export default {
    updateProfile, getDashboard, getMyCourses, enroll, cancelEnrollment,
    getCourseProgress, reviewCourse, getCertificates, issueCertificate,
};