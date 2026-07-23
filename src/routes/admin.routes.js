import { Router } from 'express';

import * as adminController
    from '../Controllers/adminController.js';

import {
    authenticateToken,
    authorizeRoles
} from '../middlewares/MiddlewereRoutes.js';

import { USER_ROLE }
    from '../domain/enums/userRole.enum.js';

import { validate }
    from '../utils/validate.js';

import {
    updateUserSchema,
    setUserActiveSchema,
    reviewCourseSchema,
    setCourseFeaturedSchema
} from '../validators/admin.schema.js';

const router = Router();

router.use(
    authenticateToken,
    authorizeRoles(USER_ROLE.ADMIN)
);

// Usuários
router.get(
    '/users',
    adminController.listUsers
);

router.put(
    '/users/:id',
    validate(updateUserSchema),
    adminController.updateUser
);

router.patch(
    '/users/:id/block',
    validate(setUserActiveSchema),
    adminController.setUserActive
);

router.delete(
    '/users/:id',
    adminController.deleteUser
);

// Cursos
router.get(
    '/courses/pending',
    adminController.listPendingCourses
);

router.patch(
    '/courses/:id/status',
    validate(reviewCourseSchema),
    adminController.reviewCourse
);

router.patch(
    '/courses/:id/featured',
    validate(setCourseFeaturedSchema),
    adminController.setCourseFeatured
);

// Painel e auditoria
router.get(
    '/dashboard',
    adminController.getDashboard
);

router.get(
    '/audit-logs',
    adminController.getAuditLogs
);

export default router;