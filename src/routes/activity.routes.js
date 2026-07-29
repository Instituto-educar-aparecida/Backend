import { Router } from 'express';

import * as activityController
    from '../Controllers/activityController.js';

import {
    authenticateToken,
    authorizeRoles
} from '../middlewares/MiddlewereRoutes.js';

import { validate }
    from '../utils/validate.js';

import { USER_ROLE }
    from '../domain/enums/userRole.enum.js';

import {
    updateActivitySchema,
    objectiveQuestionSchema,
    openQuestionSchema,
    submitActivitySchema,
    gradeSubmissionSchema
} from '../validators/activity.schema.js';

const router = Router();

router.use(authenticateToken);

router.put(
    '/:id',
    authorizeRoles(
        USER_ROLE.INSTRUCTOR,
        USER_ROLE.ADMIN
    ),
    validate(updateActivitySchema),
    activityController.updateActivity
);

router.delete(
    '/:id',
    authorizeRoles(
        USER_ROLE.INSTRUCTOR,
        USER_ROLE.ADMIN
    ),
    activityController.deleteActivity
);

router.post(
    '/:id/objective-questions',
    authorizeRoles(
        USER_ROLE.INSTRUCTOR,
        USER_ROLE.ADMIN
    ),
    validate(objectiveQuestionSchema),
    activityController.addObjectiveQuestion
);

router.post(
    '/:id/open-questions',
    authorizeRoles(
        USER_ROLE.INSTRUCTOR,
        USER_ROLE.ADMIN
    ),
    validate(openQuestionSchema),
    activityController.addOpenQuestion
);

router.post(
    '/:id/submit',
    authorizeRoles(USER_ROLE.STUDENT),
    validate(submitActivitySchema),
    activityController.submit
);

router.patch(
    '/:id/submissions/:studentId/grade',
    authorizeRoles(
        USER_ROLE.INSTRUCTOR,
        USER_ROLE.ADMIN
    ),
    validate(gradeSubmissionSchema),
    activityController.gradeSubmission
);

router.get(
    '/:id/questions',
    authorizeRoles(USER_ROLE.STUDENT),
    activityController.getQuestionsForStudent
);

router.get(
    '/:id/progress',
    authorizeRoles(USER_ROLE.STUDENT),
    activityController.getProgress
);

export default router;