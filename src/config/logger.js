// Configuração do logger centralizado usando Winston.
// Substitui os console.log/console.error espalhados pelo código.
import winston from 'winston';

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

// Formato legível para o console durante o desenvolvimento.
const consoleFormat = printf(({ level, message, timestamp: ts, stack }) => {
    return `${ts} [${level}]: ${stack || message}`;
});

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        json()
    ),
    transports: [
        new winston.transports.Console({
            format: combine(
                colorize(),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                errors({ stack: true }),
                consoleFormat
            ),
        }),
    ],
});

export default logger;
