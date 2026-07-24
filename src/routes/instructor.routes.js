import { Router } from 'express';

import * as instructorController
    from '../Controllers/instructorController.js';

import {
    authenticateToken,
    authorizeRoles
} from '../middlewares/MiddlewereRoutes.js';

import { USER_ROLE }
    from '../domain/enums/userRole.enum.js';

const router = Router();

router.use(
    authenticateToken,
    authorizeRoles(
        USER_ROLE.INSTRUCTOR,
        USER_ROLE.ADMIN
    )
);

router.get(
    '/dashboard',
    instructorController.getDashboard
);

router.get(
    '/courses',
    instructorController.getMyCourses
);

export default router;