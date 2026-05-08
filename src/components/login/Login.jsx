// components/login/Login.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form login-form" onSubmit={handleSubmit}>
        <h2>
          <span className="red-text">Iniciar</span>{" "}
          <span className="blue-text">Sesión</span>
        </h2>
        <p className="subtitle">🇵🇾 Bienvenido de vuelta a Paraguay Shop 🇵🇾</p>

        {error && <div className="error-message">{error}</div>}

        <div className="input-group">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn-login" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        <div className="auth-link">
          ¿No tenés cuenta? <Link to="/register">Registrate</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;