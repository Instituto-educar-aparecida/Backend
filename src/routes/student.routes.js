import { Router } from 'express';
import * as studentController
    from '../Controllers/studentController.js';

import {
    authenticateToken,
    authorizeRoles,
} from '../middlewares/auth.middleware.js';

import { validate }
    from '../utils/validate.js';

import { USER_ROLE }
    from '../domain/enums/userRole.enum.js';

import {
    updateProfileSchema,
    enrollmentSchema,
    reviewSchema,
    courseIdParamSchema,
} from '../validators/student.schema.js';

const router = Router();

router.use(
    authenticateToken,
    authorizeRoles(USER_ROLE.STUDENT),
);

router.put(
    '/profile',
    validate(updateProfileSchema),
    studentController.updateProfile,
);

router.get(
    '/dashboard',
    studentController.getDashboard,
);

router.get(
    '/courses',
    studentController.getMyCourses,
);

router.get(
    '/courses/:courseId/progress',
    validate(courseIdParamSchema, 'params'),
    studentController.getCourseProgress,
);

router.post(
    '/enrollments',
    validate(enrollmentSchema),
    studentController.enroll,
);

router.delete(
    '/enrollments/:courseId',
    validate(courseIdParamSchema, 'params'),
    studentController.cancelEnrollment,
);

router.post(
    '/reviews',
    validate(reviewSchema),
    studentController.reviewCourse,
);

router.get(
    '/certificates',
    studentController.getCertificates,
);

router.post(
    '/courses/:courseId/certificate',
    validate(courseIdParamSchema, 'params'),
    studentController.issueCertificate,
);

export default router;