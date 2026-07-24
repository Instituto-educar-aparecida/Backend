import { Router } from 'express';

import * as lessonController
    from '../Controllers/lessonController.js';

import {
    authenticateToken,
    authorizeRoles
} from '../middlewares/MiddlewereRoutes.js';

import { validate }
    from '../utils/validate.js';

import { USER_ROLE }
    from '../domain/enums/userRole.enum.js';

import {
    updateLessonSchema,
    progressSchema,
    supportTextSchema,
    lessonFileSchema
} from '../validators/lesson.schema.js';

const router = Router();

router.use(authenticateToken);

router.get(
    '/:id',
    lessonController.getLesson
);

router.post(
    '/:id/progress',
    authorizeRoles(USER_ROLE.STUDENT),
    validate(progressSchema),
    lessonController.saveProgress
);

router.put(
    '/:id',
    authorizeRoles(
        USER_ROLE.INSTRUCTOR,
        USER_ROLE.ADMIN
    ),
    validate(updateLessonSchema),
    lessonController.updateLesson
);

router.delete(
    '/:id',
    authorizeRoles(
        USER_ROLE.INSTRUCTOR,
        USER_ROLE.ADMIN
    ),
    lessonController.deleteLesson
);

router.post(
    '/:id/support-texts',
    authorizeRoles(
        USER_ROLE.INSTRUCTOR,
        USER_ROLE.ADMIN
    ),
    validate(supportTextSchema),
    lessonController.addSupportText
);

router.post(
    '/:id/files',
    authorizeRoles(
        USER_ROLE.INSTRUCTOR,
        USER_ROLE.ADMIN
    ),
    validate(lessonFileSchema),
    lessonController.addFile
);

export default router;