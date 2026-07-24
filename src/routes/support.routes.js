import { Router } from 'express';

import * as supportController
    from '../Controllers/supportController.js';

import {
    authenticateToken,
    authorizeRoles
} from '../middlewares/MiddlewereRoutes.js';

import { validate }
    from '../utils/validate.js';

import {
    createTicketSchema,
    addMessageSchema,
    updateTicketStatusSchema,
    ticketIdSchema
} from '../validators/support.schema.js';

import { USER_ROLE }
    from '../domain/enums/userRole.enum.js';

const router = Router();

router.use(authenticateToken);

router.post(
    '/tickets',
    validate(createTicketSchema),
    supportController.createTicket
);

router.get(
    '/tickets',
    supportController.listTickets
);

router.get(
    '/tickets/:id',
    validate(ticketIdSchema),
    supportController.getTicket
);

router.post(
    '/tickets/:id/messages',
    validate(ticketIdSchema),
    validate(addMessageSchema),
    supportController.addMessage
);

router.patch(
    '/tickets/:id/status',
    authorizeRoles(
        USER_ROLE.ADMIN,
        USER_ROLE.SECRETARY
    ),
    validate(ticketIdSchema),
    validate(updateTicketStatusSchema),
    supportController.updateStatus
);

export default router;