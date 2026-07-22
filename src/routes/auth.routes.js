import { Router } from 'express';

import * as authController
    from '../Controllers/authController.js';

import {
    authenticateToken,
    authorizeRoles
} from '../middlewares/MiddlewereRoutes.js';

import { validate }
    from '../utils/validate.js';

import { USER_ROLE }
    from '../domain/enums/userRole.enum.js';

import {
    registerSchema,
    loginSchema
} from '../validators/auth.schema.js';

const router = Router();

router.post(
    '/register',
    validate(registerSchema),
    authController.register
);

router.post(
    '/login',
    validate(loginSchema),
    authController.login
);

router.get(
    '/me',
    authenticateToken,
    authController.getMe
);

router.get(
    '/users',
    authenticateToken,
    authorizeRoles(USER_ROLE.ADMIN),
    authController.getUsers
);

export default router;