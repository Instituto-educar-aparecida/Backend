import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import studentRoutes from './src/routes/studentRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import videoRoutes from './src/routes/videoRoutes.js';
import {dbTeste}  from './src/database/config.js';
// import professorRoutes from './src/routes/professorRoutes.js';  //precisa ser criado


const app = express();
const PORT = 5173;


app.use(cors({
  origin: '*', // Libera o Frontend
  // origin: 'http://localhost:5174', // Libera o Frontend
methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rota de teste para a reunião
app.get('/', (req, res) => {
  res.json({ mensagem: "🚀 API do Instituto Educar Online e Integrada!" });
});

app.use('/api/auth', authRoutes);
app.use('/api/aluno', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/video', videoRoutes);
// app.use('/api/professor', professorRoutes); //É preciso criar a rota de professor ainda

app.listen(PORT, '0.0.0.0', async() => {
  console.log(`[BACKEND] Servidor rodando na porta ${PORT}`);
  await dbTeste();
});

// Teste de fluxo
