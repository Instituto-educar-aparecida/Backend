import { Router } from 'express';
import * as certificateController from '../Controllers/certificateController.js';

const router = Router();

// GET /api/certificates/verify/:code — validação pública de certificado (RF18).
router.get('/verify/:code', certificateController.verify);

export default router;
