const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 segredo JWT
const SECRET = "segredo_super";

// 🛡️ proteção DDoS (rate limit)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 5 // 5 requisições por minuto
});
app.use(limiter);

// 👤 usuário fake
let user = {
  email: "teste@email.com",
  senha: encrypt("123456"),
  mfaCode: "123456"
};

// 🔒 função AES
function encrypt(text) {
  const cipher = crypto.createCipher("aes-256-cbc", "chave123");
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decrypt(text) {
  const decipher = crypto.createDecipher("aes-256-cbc", "chave123");
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// 📌 LOGIN
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (email === user.email && senha === decrypt(user.senha)) {
    console.log("Login correto - pedindo MFA");
    return res.json({ mfa: true });
  }

  console.log("Tentativa de login falhou");
  res.status(401).json({ error: "Credenciais inválidas" });
});

// 📌 MFA
app.post("/mfa", (req, res) => {
  const { code } = req.body;

  if (code === user.mfaCode) {
    const token = jwt.sign({ email: user.email }, SECRET);
    console.log("MFA correto - acesso liberado");
    return res.json({ token });
  }

  console.log("MFA incorreto");
  res.status(401).json({ error: "Código inválido" });
});

// 📌 rota protegida
app.get("/dados", (req, res) => {
  res.json({ mensagem: "Dados protegidos com segurança!" });
});

app.listen(3001, () => console.log("Servidor rodando na porta 3001"));