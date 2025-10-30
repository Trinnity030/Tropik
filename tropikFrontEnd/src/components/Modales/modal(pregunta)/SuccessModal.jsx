// SuccessModal.jsx
import React from 'react';
import './SuccessModal.css';

const SuccessModal = () => {
  const handleClose = () => {
    // Simulamos cerrar el modal volviendo a la página anterior o recargando
    window.location.reload(); // O puedes usar navigate('/') si estás usando React Router
  };

  return (
    <div className="modal-container">
      {/* Ícono de Check */}
      <div className="icon-circle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12l5 5L20 7" />
        </svg>
      </div>

      {/* Título */}
      <h2 className="modal-title">Pago Exitoso</h2>

      {/* Subtítulo */}
      <p className="modal-subtitle">Tu pago ha sido procesado exitosamente.</p>

      {/* Botón */}
      <button className="action-button" onClick={handleClose}>
        Hecho
      </button>
    </div>
  );
};

export default SuccessModal;