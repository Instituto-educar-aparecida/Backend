// Serviço de certificados: emissão (RF18) e verificação pública.
import crypto from 'crypto';
import * as certificateRepo from '../repositories/certificate.repository.js';
import * as lessonRepo from '../repositories/lesson.repository.js';
import * as progressRepo from '../repositories/lessonProgress.repository.js';
import * as enrollmentRepo from '../repositories/enrollment.repository.js';
import { getCourseOrFail } from './course.service.js';
import { AppError } from '../utils/AppError.js';

// Emite o certificado de um aluno em um curso, se ele concluiu todas as aulas.
export const issueCertificate = async (studentId, courseId) => {
    await getCourseOrFail(courseId);

    const enrollment = await enrollmentRepo.findOne(studentId, courseId);
    if (!enrollment || enrollment.status === 'CANCELLED') {
        throw new AppError('Você não está matriculado neste curso.', 403);
    }

    const existing = await certificateRepo.findByStudentCourse(studentId, courseId);
    if (existing) {
        throw new AppError('Certificado já emitido para este curso.', 400);
    }

    const total = await lessonRepo.countByCourse(courseId);
    const completed = await progressRepo.countCompletedByCourse(studentId, courseId);

    if (total === 0 || completed < total) {
        throw new AppError(
            `Você concluiu ${completed} de ${total} aulas. Conclua todas para emitir o certificado.`,
            400
        );
    }

    const verification_code = crypto.randomUUID();
    // TODO: substituir por URL real quando a geração de PDF for implementada.
    const pdf_url = `/certificates/${verification_code}.pdf`;

    return certificateRepo.createCertificate({
        student_id: studentId,
        course_id: courseId,
        verification_code,
        pdf_url,
    });
};

// Verificação pública de certificado pelo código.
export const verify = async (code) => {
    const certificate = await certificateRepo.findByCode(code);
    if (!certificate) {
        throw new AppError('Certificado não encontrado.', 404);
    }
    return certificate;
};

export default { issueCertificate, verify };
