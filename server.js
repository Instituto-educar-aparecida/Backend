import app from './app.js';

const PORT = 5173;

app.listen(PORT, '0.0.0.0', () => {
    console.log(
        `[BACKEND] Servidor rodando na porta ${PORT}`
    );
});