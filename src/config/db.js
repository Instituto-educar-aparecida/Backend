// Configuração central do pool de conexões do PostgreSQL.
// Todos os repositories importam o pool a partir deste arquivo,
// garantindo uma única fonte de verdade para a conexão com o banco.
import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'EducarDev',
    password: process.env.DB_PASSWORD || '271627',
    database: process.env.DB_NAME || 'EducarDev',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

// Loga erros inesperados de clientes ociosos para evitar que derrubem o processo.
pool.on('error', (err) => {
    console.error('Erro inesperado no pool do PostgreSQL:', err.message);
});

// Função utilitária para executar queries de forma centralizada.
export const query = (text, params) => pool.query(text, params);

export default pool;
