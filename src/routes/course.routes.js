import { Router } from 'express';

import * as courseController
    from '../Controllers/courseController.js';

import {
    authenticateToken,
    authorizeRoles
} from '../middlewares/MiddlewereRoutes.js';

import { validate }
    from '../utils/validate.js';

import { USER_ROLE }
    from '../domain/enums/userRole.enum.js';

import {
    createCourseSchema,
    updateCourseSchema,
    courseStatusSchema,
    courseFeaturedSchema
} from '../validators/course.schema.js';

import {
    createModuleSchema
} from '../validators/module.schema.js';

const router = Router();

/*
 * Rotas públicas
 */

router.get(
    '/',
    courseController.listCourses
);

router.get(
    '/:id',
    courseController.getCourse
);

/*
 * A partir daqui exige autenticação
 */

router.use(authenticateToken);

router.post(
    '/',
    authorizeRoles(
        USER_ROLE.INSTRUCTOR,
        USER_ROLE.ADMIN
    ),
    validate(createCourseSchema),
    courseController.createCourse
);

router.put(
    '/:id',
    authorizeRoles(
        USER_ROLE.INSTRUCTOR,
        USER_ROLE.ADMIN
    ),
    validate(updateCourseSchema),
    courseController.updateCourse
);

router.delete(
    '/:id',
    authorizeRoles(
        USER_ROLE.INSTRUCTOR,
        USER_ROLE.ADMIN
    ),
    courseController.deleteCourse
);

router.post(
    '/:id/modules',
    authorizeRoles(
        USER_ROLE.INSTRUCTOR,
        USER_ROLE.ADMIN
    ),
    validate(createModuleSchema),
    courseController.createModule
);

router.patch(
    '/:id/status',
    authorizeRoles(USER_ROLE.ADMIN),
    validate(courseStatusSchema),
    courseController.updateStatus
);

router.patch(
    '/:id/featured',
    authorizeRoles(USER_ROLE.ADMIN),
    validate(courseFeaturedSchema),
    courseController.updateFeatured
);

export default router;