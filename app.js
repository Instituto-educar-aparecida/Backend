import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

// ROTAS CORRIGIDAS DIRECIONADAS PARA A PASTA SRC
import authRoutes from './src/routes/authRoutes.js';
import studentRoutes from './src/routes/studentRoutes.js';
import adminRoutes from './src/routes/admin.routes.js';
import videoRoutes from './src/routes/videoRoutes.js';
import professorRoutes from './src/routes/professorRoutes.js';
import aulasRoutes from './src/routes/aulasRoutes.js';

const app = express();

// RATE LIMIT LOGIN
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        msg: 'Muitas tentativas. Tente novamente em 15 minutos.'
    }
});

const loginSlowDown = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 5,
    delayMs: () => 500
});

// MIDDLEWARES GLOBAIS
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// ROTA PRINCIPAL
app.get('/', (req, res) => {
    res.json({
        mensagem: '🚀 API do Instituto Educar Online e Integrada!'
    });
});

// MAPEAMENTO DE ROTAS
app.use(
    '/api/auth/login',
    loginSlowDown,
    loginLimiter
);

app.use('/api/auth', authRoutes);
app.use('/api/aluno', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/professor', professorRoutes);
app.use('/api/aula', aulasRoutes);

// EXPORT APP
export default app;

