import 'dotenv/config';

import app from './app.js';
import { logger } from './src/config/logger.js';
import { pool } from './src/config/db.js';

const PORT = Number(process.env.PORT) || 5173;

const server = app.listen(
    PORT,
    '0.0.0.0',
    () => {
        logger.info(
            `[BACKEND] Servidor rodando na porta ${PORT}`
        );
    }
);

let isShuttingDown = false;

const shutdown = async (signal) => {
    if (isShuttingDown) {
        return;
    }

    isShuttingDown = true;

    logger.info(
        `[BACKEND] Recebido ${signal}. Encerrando...`
    );

    server.close(async (serverError) => {
        if (serverError) {
            logger.error(
                '[BACKEND] Erro ao fechar servidor:',
                serverError
            );
        }

        try {
            await pool.end();

            logger.info(
                '[BACKEND] Pool PostgreSQL encerrado.'
            );
        } catch (error) {
            logger.error(
                '[BACKEND] Erro ao fechar o pool:',
                error
            );
        }

        process.exit(serverError ? 1 : 0);
    });

    setTimeout(() => {
        logger.error(
            '[BACKEND] Encerramento forçado por timeout.'
        );

        process.exit(1);
    }, 10_000).unref();
};

process.on(
    'SIGTERM',
    () => shutdown('SIGTERM')
);

process.on(
    'SIGINT',
    () => shutdown('SIGINT')
);

process.on('unhandledRejection', (reason) => {
    logger.error(
        '[BACKEND] Promise rejeitada sem tratamento:',
        reason
    );
});

process.on('uncaughtException', (error) => {
    logger.error(
        '[BACKEND] Exceção não tratada:',
        error
    );

    shutdown('uncaughtException');
});

export default server;