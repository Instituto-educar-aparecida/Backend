// Carrega variáveis de ambiente e inicia o servidor HTTP Express.
import 'dotenv/config';
import app from './app.js';
//import { logger } from './src/config/logger.js';
//import { pool } from './src/config/db.js';

const PORT = process.env.PORT || 5173;

const server = app.listen(PORT, '0.0.0.0', () => {
    logger.info(`[BACKEND] Servidor rodando na porta ${PORT}`);
});

// Encerramento gracioso: fecha o pool de conexões do PostgreSQL.
const shutdown = async (signal) => {
    logger.info(`[BACKEND] Recebido ${signal}. Encerrando...`);
    server.close(async () => {
        try {
            await pool.end();
        } catch (err) {
            logger.error(`Erro ao fechar o pool: ${err.message}`);
        }
        process.exit(0);
    });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

export default server;
