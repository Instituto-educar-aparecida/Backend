import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import studentRoutes from './src/routes/studentRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';



const app = express();
const PORT = 5173;


app.use(cors({
  origin: 'http://localhost:5174', // Libera o Frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

// Rota de teste para a reunião
app.get('/', (req, res) => {
  res.json({ mensagem: "🚀 API do Instituto Educar Online e Integrada!" });
});

app.use('/api/auth', authRoutes);
app.use('/api/aluno', studentRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[BACKEND] Servidor rodando na porta ${PORT}`);
});

// Teste de fluxo
