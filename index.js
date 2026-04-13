import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import authRoutes from "./src/routes/authRoutes.js";
import studentRoutes from "./src/routes/studentRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import videoRoutes from "./src/routes/videoRoutes.js";
import professorRoutes from "./src/routes/professorRoutes.js";
import aulasRoutes from "./src/routes/aulasRoutes.js";

const app = express();
const PORT = 5173;

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { msg: "Muitas tentativas. Tente de novo em 15 min." },
});

const loginSlowDown = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 5,
  delayMs: () => 500,
});

app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "🚀 API do Instituto Educar Online e Integrada!" });
});

app.use("/api/auth/login", loginSlowDown, loginLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/aluno", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/professor", professorRoutes);
app.use("/api/aula", aulasRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[BACKEND] Servidor rodando na porta ${PORT}`);
});
