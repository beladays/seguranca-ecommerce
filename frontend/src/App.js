import { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mfa, setMfa] = useState(false);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:3001/login", {
        email,
        senha
      });

      if (res.data.mfa) {
        setMfa(true);
        setMsg("Digite o código MFA (123456)");
      }
    } catch (err) {
      setMsg("Erro no login");
    }
  };

  const validarMFA = async () => {
    try {
      const res = await axios.post("http://localhost:3001/mfa", {
        code
      });

      setMsg("Login completo! Token: " + res.data.token);
    } catch {
      setMsg("Código inválido");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>Login Seguro</h2>

      {!mfa ? (
        <>
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          /><br /><br />

          <input
            placeholder="Senha"
            type="password"
            onChange={(e) => setSenha(e.target.value)}
          /><br /><br />

          <button onClick={login}>Entrar</button>
        </>
      ) : (
        <>
          <input
            placeholder="Código MFA"
            onChange={(e) => setCode(e.target.value)}
          /><br /><br />

          <button onClick={validarMFA}>Validar</button>
        </>
      )}

      <p>{msg}</p>
    </div>
  );
}

export default App;