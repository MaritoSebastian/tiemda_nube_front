// src/components/PasswordReset/PasswordReset.jsx
import { useState } from 'react';
import { solicitarReset, verificarCodigo, resetearPassword } from '../../service/authService';
import "./PasswordRest.css"; 
const PasswordReset = () => {
  const [step, setStep] = useState('request');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await solicitarReset(email);
      if (response.ok) {
        setSuccess('✅ Código enviado a tu correo');
        setStep('verify');
      } else {
        setError(response.error || 'Error al enviar el código');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await verificarCodigo(email, code);
      if (response.ok && response.valid) {
        setSuccess('✅ Código verificado');
        setStep('reset');
      } else {
        setError(response.error || 'Código inválido');
      }
    } catch (err) {
      setError('Error al verificar');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('❌ Las contraseñas no coinciden');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('❌ Mínimo 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await resetearPassword(email, code, newPassword);
      if (response.ok) {
        setSuccess('✅ Contraseña actualizada');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError(response.error || 'Error al actualizar');
      }
    } catch (err) {
      setError('Error al resetear');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 'verify') {
      setStep('request');
    } else if (step === 'reset') {
      setStep('verify');
    }
    setError('');
    setSuccess('');
  };

  return (
    <div className="password-reset-container">
      <div className="reset-form">
        <h2>Recuperar Contraseña</h2>
        <p className="reset-subtitle">
          {step === 'request' && 'Ingresá tu email para recibir el código'}
          {step === 'verify' && 'Ingresá el código que recibiste'}
          {step === 'reset' && 'Creá tu nueva contraseña'}
        </p>

        {/* Indicador de pasos */}
        <div className="step-indicator">
          <div className={`step-dot ${step === 'request' ? 'active' : 'completed'}`}></div>
          <div className={`step-dot ${step === 'verify' ? 'active' : step === 'reset' ? 'completed' : ''}`}></div>
          <div className={`step-dot ${step === 'reset' ? 'active' : ''}`}></div>
        </div>
        
        {error && <div className="reset-alert reset-alert-error">{error}</div>}
        {success && <div className="reset-alert reset-alert-success">{success}</div>}

        {step === 'request' && (
          <form onSubmit={handleRequestCode}>
            <div className="reset-input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn-reset" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar código'}
            </button>
            <div className="reset-link">
              <a href="/login">Volver al login</a>
            </div>
          </form>
        )}

        {step === 'verify' && (
          <form onSubmit={handleVerifyCode}>
            <div className="reset-input-group">
              <input
                type="email"
                value={email}
                disabled
                className="readonly"
              />
            </div>
            <div className="reset-input-group">
              <input
                type="text"
                placeholder="Código de 6 dígitos"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                maxLength={6}
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn-reset" disabled={loading}>
              {loading ? 'Verificando...' : 'Verificar código'}
            </button>
            <button type="button" className="btn-secondary" onClick={handleBack} disabled={loading}>
              Volver
            </button>
          </form>
        )}

        {step === 'reset' && (
          <form onSubmit={handleResetPassword}>
            <div className="reset-input-group">
              <input
                type="email"
                value={email}
                disabled
                className="readonly"
              />
            </div>
            <div className="reset-input-group">
              <input
                type="password"
                placeholder="Nueva contraseña (mínimo 6)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="reset-input-group">
              <input
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn-reset" disabled={loading}>
              {loading ? 'Actualizando...' : 'Actualizar contraseña'}
            </button>
            <button type="button" className="btn-secondary" onClick={handleBack} disabled={loading}>
              Volver
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;