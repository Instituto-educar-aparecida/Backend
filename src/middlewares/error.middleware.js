// Middlewares de tratamento de erros.
import { AppError } from '../utils/AppError.js';
import { logger } from '../config/logger.js';

// Middleware para rotas não encontradas (404).
export const notFound = (req, res, next) => {
    next(new AppError(`Rota não encontrada: ${req.method} ${req.originalUrl}`, 404));
};

// Traduz códigos de erro conhecidos do PostgreSQL para respostas amigáveis.
const mapPgError = (err) => {
    switch (err.code) {
        case '23505': // unique_violation
            return new AppError('Registro duplicado. Já existe um recurso com esses dados.', 409);
        case '23503': // foreign_key_violation
            return new AppError('Referência inválida. O recurso relacionado não existe.', 400);
        case '23502': // not_null_violation
            return new AppError(`Campo obrigatório ausente: ${err.column}.`, 400);
        case '23514': // check_violation
            return new AppError('Valor fora do intervalo permitido.', 400);
        case '22P02': // invalid_text_representation (ex.: enum/número inválido)
            return new AppError('Formato de dado inválido.', 400);
        default:
            return null;
    }
};

// Error handler global. Deve ser o último middleware registrado no app.
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
    let error = err;

    // Normaliza erros de banco de dados.
    if (!(error instanceof AppError) && error.code && typeof error.code === 'string') {
        const mapped = mapPgError(error);
        if (mapped) error = mapped;
    }

    const statusCode = error.statusCode || 500;
    const isOperational = error.isOperational === true;

    // Loga erros: operacionais como warn, inesperados como error (com stack).
    if (statusCode >= 500 || !isOperational) {
        logger.error(`${req.method} ${req.originalUrl} - ${error.message}`, { stack: err.stack });
    } else {
        logger.warn(`${req.method} ${req.originalUrl} - ${error.message}`);
    }

    const body = {
        status: 'error',
        message: isOperational || statusCode < 500 ? error.message : 'Erro interno do servidor.',
    };

    if (error.details) body.details = error.details;

    return res.status(statusCode).json(body);
};

export default { notFound, errorHandler };
