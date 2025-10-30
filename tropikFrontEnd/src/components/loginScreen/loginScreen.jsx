import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user' // Valor por defecto
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de inicio de sesión:', formData);
    alert('¡Inicio de sesión exitoso!');

    // Redirigir según el rol
    if (formData.role === 'admin') {
      navigate('/table'); // Pantalla de admin
    } else {
      navigate('/'); // TropikScreen para usuario normal
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-circle">
          <span className="logo-plant">🌱</span>
        </div>

        <h1 className="welcome-title">Bienvenido de nuevo</h1>
        <p className="welcome-subtitle">Ingresa tus datos para iniciar sesión</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <div className="input-with-icon">
              <span className="icon-user">👤</span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo Electrónico"
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <div className="input-with-icon">
              <span className="icon-lock">🔒</span>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Selector de rol */}
          <div className="form-group">
            <label htmlFor="role">Tipo de Usuario:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
