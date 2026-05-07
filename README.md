# Sistema de Segurança para Plataforma de E-commerce Distribuída

O sistema implementa mecanismos de segurança utilizados em aplicações modernas de e-commerce, incluindo:

- Autenticação Multifator (MFA)
- Criptografia AES
- JWT
- Proteção contra DDoS/Brute Force

---


# 🛠 Tecnologias Utilizadas

## Backend
- Node.js
- Express
- Crypto (AES-256-CBC)
- JSON Web Token (JWT)
- Express Rate Limit
- CORS

## Frontend
- React
- Axios
- React Toastify

---

# 🚀 Funcionalidades

## ✅ Login Seguro
O usuário realiza login utilizando:
- Email
- Senha

---

## ✅ Autenticação Multifator (MFA)
Após o login correto:
- o sistema solicita um código MFA
- o acesso só é liberado após validação do código

---

## ✅ Criptografia AES
As senhas são armazenadas utilizando:
- AES-256-CBC

Objetivo:
- proteger dados sensíveis armazenados

---

## ✅ JWT
Após validação do MFA:
- o sistema gera um token JWT
- utilizado para autenticação segura entre cliente e servidor

---

## ✅ Proteção contra DDoS / Brute Force
O sistema utiliza:
- express-rate-limit

Limite configurado:
- 5 requisições por minuto por IP

Objetivo:
- evitar excesso de tentativas de login
- mitigar ataques de força bruta e mini-DDoS

---

# 🏗 Arquitetura do Sistema

```text
Usuário
   ↓
Frontend React
   ↓
API Node.js + Express
   ↓
MFA + AES + JWT + Rate Limit
```

---

# 📂 Estrutura do Projeto

```text
project/
│
├── backend/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   └── App.js
│   └── package.json
│
└── README.md
```

---

# ⚙ Instalação do Projeto

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/beladays/seguranca-ecommerce.git
```

---

# 🔧 Backend

## 2️⃣ Acessar pasta backend

```bash
cd back
```

## 3️⃣ Instalar dependências

```bash
npm install
```

## 4️⃣ Executar servidor

```bash
node server.js
```

Servidor iniciado em:

```text
http://localhost:3001
```

---

# 💻 Frontend

## 5️⃣ Acessar pasta frontend

```bash
cd frontend
```

## 6️⃣ Instalar dependências

```bash
npm install
```

## 7️⃣ Executar aplicação React

```bash
npm start
```

Aplicação iniciada em:

```text
http://localhost:3000
```

---

# 🔑 Credenciais de Teste

## Login

```text
Email: teste@email.com
Senha: 123456
```

## Código MFA

```text
123456
```

---



# 🛡 Simulação de Ataques

## Brute Force

Após múltiplas tentativas inválidas:
- o sistema retorna HTTP 429
- bloqueando excesso de requisições

Exemplo:

```text
429 Too Many Requests
```

---

# 📚 Conceitos de Segurança Aplicados

| Conceito | Implementação |
|---|---|
| MFA | Código multifator |
| Criptografia | AES-256-CBC |
| Autenticação | JWT |
| Proteção DDoS | Rate Limiting |
| API REST Segura | Express |

---

# 🔮 Melhorias Futuras

- Implementar HTTPS/TLS
- Utilizar bcrypt para senhas
- Gerar MFA aleatório
- Adicionar expiração do MFA
- Persistência em banco de dados
- Logs avançados de segurança
- Proteção real de rotas JWT

---

