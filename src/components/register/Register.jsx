import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Limpiar errores mientras escribe
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    // Validaciones
    if (!formData.name || !formData.email || !formData.password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Enviar datos (sin confirmPassword)
    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);

    if (result.success) {
      setSuccessMsg("¡Registro exitoso! Redirigiendo...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form register-form" onSubmit={handleSubmit}>
        <div className="flag-top"></div>
        
        <h2>
          <span className="red-text">Crear</span>{" "}
          <span className="blue-text">Cuenta</span>
        </h2>
        <p className="subtitle">🇵🇾 Unite a Compras Paraguay 🇵🇾</p>

        {error && <div className="error-message">{error}</div>}
        {successMsg && <div className="success-message">{successMsg}</div>}

        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            autoComplete="name"
          />
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            autoComplete="email"
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            autoComplete="new-password"
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            autoComplete="new-password"
          />
        </div>

        <button 
          type="submit" 
          className="btn-register" 
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <div className="auth-link">
          ¿Ya tenés cuenta? <Link to="/login">Iniciar Sesión</Link>
        </div>

        <div className="flag-bottom"></div>
      </form>
    </div>
  );
};

export default Register;