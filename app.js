// Configuração da aplicação Express do Instituto Educar.
// Registra middlewares globais, rotas da API e o tratamento de erros.
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
//import { notFound, errorHandler } from './src/middlewares/error.middleware.js';
//import { logger } from './src/config/logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Confia no proxy (necessário para obter o IP real atrás de proxies/preview).
app.set('trust proxy', 1);

//  Middlewares globais de segurança e utilidade 
app.use(helmet());
app.use(compression());
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Encaminha os logs de acesso (morgan) para o Winston.
app.use(morgan('dev', {
    stream: { write: (message) => logger.http ? logger.http(message.trim()) : logger.info(message.trim()) },
}));

//  Limitação de taxa nas rotas sensíveis de autenticação 
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { status: 'error', message: 'Muitas tentativas. Tente novamente em 15 minutos.' },
});
const loginSlowDown = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 5,
    delayMs: () => 500,
});
app.use('/api/auth/login', loginSlowDown, loginLimiter);

//  Arquivos estáticos: PDFs de certificados emitidos 
app.use('/certificates', express.static(path.join(__dirname, 'uploads', 'certificates')));

//  Rota raiz (informativa) 
app.get('/', (req, res) => {
    res.json({ status: 'success', message: '🚀 API do Instituto Educar online e integrada!' });
});

//  Rotas da API 
app.use('/api', apiRoutes);

// Tratamento de erros 
// app.use(notFound);
// app.use(errorHandler);

app.use((err, req, res, next) => {
    console.error(err);

    return res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message || 'Erro interno do servidor.'
    });
});

export default app;
