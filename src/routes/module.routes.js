import { Router } from 'express';

import * as moduleController
    from '../Controllers/moduleController.js';

import {
    authenticateToken,
    authorizeRoles
} from '../middlewares/MiddlewereRoutes.js';

import { validate } from '../utils/validate.js';
import { USER_ROLE }
    from '../domain/enums/userRole.enum.js';

import {
    updateModuleSchema
} from '../validators/module.schema.js';

import {
    createLessonSchema
} from '../validators/lesson.schema.js';

import {
    createActivitySchema
} from '../validators/activity.schema.js';

const router = Router();

router.use(
    authenticateToken,
    authorizeRoles(
        USER_ROLE.INSTRUCTOR,
        USER_ROLE.ADMIN
    )
);

router.put(
    '/:id',
    validate(updateModuleSchema),
    moduleController.updateModule
);

router.delete(
    '/:id',
    moduleController.deleteModule
);

router.post(
    '/:id/lessons',
    validate(createLessonSchema),
    moduleController.createLesson
);

router.post(
    '/:id/activities',
    validate(createActivitySchema),
    moduleController.createActivity
);

export default router;