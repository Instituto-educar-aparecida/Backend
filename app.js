import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

import apiRoutes from './src/routes/index.js';
import { logger } from './src/config/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(compression());

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        'OPTIONS'
    ],
    allowedHeaders: [
        'Content-Type',
        'Authorization'
    ]
}));

app.use(express.json({
    limit: '2mb'
}));

app.use(express.urlencoded({
    extended: true
}));

app.use(morgan('dev', {
    stream: {
        write: (message) => {
            logger.http(message.trim());
        }
    }
}));

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 'error',
        message:
            'Muitas tentativas. Tente novamente em 15 minutos.'
    }
});

const loginSlowDown = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 5,
    delayMs: () => 500
});

app.use(
    '/api/auth/login',
    loginSlowDown,
    loginLimiter
);

app.use(
    '/certificates',
    express.static(
        path.join(__dirname, 'uploads', 'certificates')
    )
);

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message:
            'API do Instituto Educar online e integrada!'
    });
});

app.use('/api', apiRoutes);

app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Rota não encontrada.'
    });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    logger.error(err);

    const statusCode =
        err.statusCode ||
        err.status ||
        500;

    return res.status(statusCode).json({
        status: 'error',
        message:
            statusCode === 500
                ? 'Erro interno do servidor.'
                : err.message
    });
});

export default app;