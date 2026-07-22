import { asyncHandler }
    from '../utils/asyncHandler.js';

import * as authService
    from '../services/auth.service.js';

export const register = asyncHandler(
    async (req, res) => {
        const data = await authService.register(
            req.body
        );

        return res.status(201).json({
            status: 'success',
            message:
                'Usuário registrado com sucesso.',
            data
        });
    }
);

export const login = asyncHandler(
    async (req, res) => {
        const data = await authService.login(
            req.body
        );

        return res.status(200).json({
            status: 'success',
            message:
                'Login realizado com sucesso.',
            data
        });
    }
);

export const getMe = asyncHandler(
    async (req, res) => {
        const data = await authService.getMe(
            req.user.id
        );

        return res.status(200).json({
            status: 'success',
            data
        });
    }
);

export const getUsers = asyncHandler(
    async (req, res) => {
        const data =
            await authService.listUsers(
                req.query
            );

        return res.status(200).json({
            status: 'success',
            data
        });
    }
);

export default {
    register,
    login,
    getMe,
    getUsers
};