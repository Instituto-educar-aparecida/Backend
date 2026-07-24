import { Router } from 'express';

import * as studentController from '../Controllers/studentController.js';
import {
    authenticateToken,
    authorizeRoles
} from '../middlewares/MiddlewereRoutes.js';
import { validate } from '../utils/validate.js';
import {
    updateProfileSchema,
    enrollmentSchema,
    reviewSchema
} from '../validators/student.schema.js';

const router = Router();

router.use(
    authenticateToken,
    authorizeRoles('STUDENT', 'aluno')
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