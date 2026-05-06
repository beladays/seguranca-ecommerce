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

// 🛡️ proteção DDoS
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5
});
app.use(limiter);

// 🔒 AES config
const algorithm = "aes-256-cbc";
const key = crypto.createHash("sha256").update("chave123").digest();
const iv = Buffer.alloc(16, 0);

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decrypt(text) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// 👤 usuário fake
let user = {
  email: "teste@email.com",
  senha: encrypt("123456"),
  mfaCode: "123456"
};

// 📌 LOGIN
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (email === user.email && senha === decrypt(user.senha)) {
    console.log("Login correto - enviando MFA");

    return res.json({
      mfa: true,
      code: user.mfaCode
    });
  }

  console.log("Tentativa de login falhou");
  res.status(401).json({ error: "Credenciais inválidas" });
});

// 📌 VALIDAR MFA
app.post("/mfa", (req, res) => {
  const { code } = req.body;

  if (code.trim() === user.mfaCode) {
    const token = jwt.sign({ email: user.email }, SECRET);

    console.log("MFA correto - acesso liberado");
    return res.json({ token });
  }

  console.log("MFA incorreto");
  res.status(401).json({ error: "Código inválido" });
});

// 📌 REENVIAR MFA
app.get("/resend-mfa", (req, res) => {
  console.log("Reenviando código MFA");

  return res.json({
    code: user.mfaCode
  });
});

// 📌 rota protegida
app.get("/dados", (req, res) => {
  res.json({ mensagem: "Dados protegidos com segurança!" });
});

app.listen(3001, () =>
  console.log("Servidor rodando na porta 3001")
);