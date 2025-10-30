// ConfirmationModal.jsx
import React, { useState } from 'react';
import './ConfirmationModal.css';
import SuccessModal from '../modal(pregunta)/SuccessModal';// Importamos el componente SuccessModal

const ConfirmationModal = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    setShowSuccess(true);
  };

  if (showSuccess) {
    return <SuccessModal />;
  }

  return (
    <div className="modal-container">
      <div className="modal-content">
        {/* Ícono de interrogación */}
        <div className="icon-circle">
          <span className="question-mark">?</span>
        </div>

        {/* Título principal */}
        <h2 className="main-title">¿Estás seguro de realizar la compra?</h2>

        {/* Texto secundario */}
        <p className="secondary-text">
          ¿Estás seguro de que quieres proceder? una vez realizado no podrás deshacer esta opción.
        </p>

        {/* Botones */}
        <div className="button-group">
          <button className="cancel-button">Cancelar</button>
          <button className="confirm-button" onClick={handleConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;