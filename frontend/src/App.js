import { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mfa, setMfa] = useState(false);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    setMsg("");

    try {
      const res = await axios.post("http://localhost:3001/login", {
        email,
        senha
      });

      if (res.data.mfa) {
        setMfa(true);
        setMsg("Digite o código MFA");
      }
    } catch {
      setMsg("❌ Email ou senha inválidos");
    }

    setLoading(false);
  };

  const validarMFA = async () => {
    setLoading(true);
    setMsg("");

    try {
      await axios.post("http://localhost:3001/mfa", {
        code
      });

      setMsg("✅ Login realizado com sucesso!");
    } catch {
      setMsg("❌ Código MFA inválido");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2> Login Seguro</h2>

        {!mfa ? (
          <>
            <input
              style={styles.input}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Senha"
              onChange={(e) => setSenha(e.target.value)}
            />

            <button
              style={styles.button}
              onClick={login}
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </>
        ) : (
          <>
            <input
              style={styles.input}
              placeholder="Código MFA"
              onChange={(e) => setCode(e.target.value)}
            />

            <button
              style={styles.button}
              onClick={validarMFA}
              disabled={loading}
            >
              {loading ? "Validando..." : "Validar Código"}
            </button>
          </>
        )}

        <p style={styles.msg}>{msg}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #4facfe, #00f2fe)"
  },
  card: {
    padding: 30,
    borderRadius: 15,
    background: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: 300
  },
  input: {
    display: "block",
    margin: "10px auto",
    padding: 10,
    width: "100%",
    borderRadius: 8,
    border: "1px solid #ccc",
    outline: "none"
  },
  button: {
    padding: 10,
    width: "100%",
    background: "#4facfe",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    marginTop: 10
  },
  msg: {
    marginTop: 15,
    fontWeight: "bold"
  }
};

export default App;