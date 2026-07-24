// Controller de certificados: verificação pública por código (RF18).
import { asyncHandler } from '../utils/asyncHandler.js';
import * as certificateService from '../services/certificate.service.js';

// GET /api/certificates/verify/:code — validação pública de certificado.
export const verify = asyncHandler(async (req, res) => {
    const data = await certificateService.verify(req.params.code);
    res.status(200).json({ status: 'success', data });
});

export default { verify };
