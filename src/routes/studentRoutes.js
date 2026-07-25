import { Router } from 'express';

import * as studentController from '../Controllers/studentController.js';
import {
    authenticateToken
} from '../middlewares/MiddlewereRoutes.js';
import { validate } from '../utils/validate.js';
import {
    updateProfileSchema,
    enrollmentSchema,
    reviewSchema
} from '../validators/student.schema.js';

const router = Router();

// Aplica a autenticação e valida o cargo ('STUDENT' ou 'aluno') de forma nativa
router.use(
    authenticateToken,
    (req, res, next) => {
        const role = req.user?.role?.toUpperCase();
        if (role !== 'STUDENT' && role !== 'ALUNO') {
            return res.status(403).json({ msg: 'Acesso negado! Perfil não autorizado.' });
        }
        next();
    }
);

router.get('/', (req, res) => {
    res.status(200).json({
        msg: 'Área do estudante funcionando.'
    });
});

router.put(
    '/profile',
    validate(updateProfileSchema),
    studentController.updateProfile
);

router.get(
    '/dashboard',
    studentController.getDashboard
);

router.get(
    '/courses',
    studentController.getMyCourses
);

router.get(
    '/courses/:courseId/progress',
    studentController.getCourseProgress
);

router.post(
    '/enrollments',
    validate(enrollmentSchema),
    studentController.enroll
);

router.delete(
    '/enrollments/:courseId',
    studentController.cancelEnrollment
);

router.post(
    '/reviews',
    validate(reviewSchema),
    studentController.reviewCourse
);

export default router;

