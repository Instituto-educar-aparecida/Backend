import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ msg: "Token não encontrado" });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET não está definido no ambiente");
    return res
      .status(500)
      .json({ msg: "Erro interno: segredo JWT não configurado" });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ msg: "Token inválido!" });
    }
    req.user = user;
    next();
  });
};
