import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mfa, setMfa] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3001/login", {
        email,
        senha
      });

      if (res.data.mfa) {
        setMfa(true);

        toast.success("Código MFA enviado: " + res.data.code);
      }
    } catch {
      toast.error("❌ Email ou senha inválidos");
    }

    setLoading(false);
  };

  const validarMFA = async () => {
    setLoading(true);

    try {
      await axios.post("http://localhost:3001/mfa", {
        code: code.trim()
      });

      toast.success("✅ Login realizado com sucesso!");
    } catch {
      toast.error("❌ Código inválido");
    }

    setLoading(false);
  };

  const reenviarCodigo = async () => {
    try {
      const res = await axios.get("http://localhost:3001/resend-mfa");
      toast.info("Novo código: " + res.data.code);
    } catch {
      toast.error("Erro ao reenviar código");
    }
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

            <button
              style={{ ...styles.button, background: "#6c757d" }}
              onClick={reenviarCodigo}
            >
              Reenviar código
            </button>
          </>
        )}
      </div>

      <ToastContainer />
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
    border: "1px solid #ccc"
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
  }
};

export default App;