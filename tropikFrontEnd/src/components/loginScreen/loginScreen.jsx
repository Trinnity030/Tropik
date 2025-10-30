// LoginScreen.jsx (Código JS sin cambios)
import React, { useState } from 'react';
import './LoginForm.css'; // Estilos CSS

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

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
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo */}
        <div className="logo-circle">
          <span className="logo-plant">🌱</span>
        </div>

        {/* Título y subtítulo */}
        <h1 className="welcome-title">Bienvenido de nuevo</h1>
        <p className="welcome-subtitle">Ingresa tus datos para iniciar sesion</p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electronico:</label>
            <div className="input-with-icon">
              <span className="icon-user">👤</span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo Electronico"
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

          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;