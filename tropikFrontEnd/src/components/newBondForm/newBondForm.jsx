// NewBondForm.jsx
import React, { useState } from 'react';
import './NewBondForm.css';
import ConfirmationModal from '../Modales/modal/ConfirmationModal'; // Ajusta la ruta si es necesario

const NewBondForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false); // Para controlar el modal

  const [formData, setFormData] = useState({
    codigoUnico: '',
    ubicacion: '',
    cantidadCO2: '',
    periodoVerificacion: '',
    certificador: '',
    fechaEmision: '',
    registro: '',
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Navegar entre pasos
  const handleNext = () => {
    if (validateStep1()) setCurrentStep(2);
  };

  const handlePrevious = () => setCurrentStep(1);

  // Al terminar, abrir modal
  const handleFinish = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      setShowModal(true);
    }
  };

  // Cerrar modal sin confirmar
  const handleCloseModal = () => setShowModal(false);

  // Confirmar acción desde el modal
  const handleConfirmModal = () => {
    setShowModal(false);
    console.log('Formulario enviado:', formData);
    alert('¡Bono creado con éxito!');
    // Aquí podrías limpiar el formulario o redirigir
    setCurrentStep(1);
    setFormData({
      codigoUnico: '',
      ubicacion: '',
      cantidadCO2: '',
      periodoVerificacion: '',
      certificador: '',
      fechaEmision: '',
      registro: '',
    });
  };

  // Validación Paso 1
  const validateStep1 = () => {
    const { codigoUnico, ubicacion, cantidadCO2, periodoVerificacion } = formData;
    if (!codigoUnico || !ubicacion || !cantidadCO2 || !periodoVerificacion) {
      alert('Por favor, completa todos los campos del Paso 1.');
      return false;
    }
    return true;
  };

  // Validación Paso 2
  const validateStep2 = () => {
    const { certificador, fechaEmision, registro } = formData;
    if (!certificador || !fechaEmision || !registro) {
      alert('Por favor, completa todos los campos del Paso 2.');
      return false;
    }
    return true;
  };

  return (
    <div className="form-container">
      {/* Paso 1 */}
      <div className={`form-step ${currentStep === 1 ? 'active' : ''}`}>
        <h2 className="form-title">Nuevo bono</h2>

        <div className="form-group">
          <label htmlFor="codigoUnico">Código Único:</label>
          <input
            type="text"
            id="codigoUnico"
            name="codigoUnico"
            value={formData.codigoUnico}
            onChange={handleChange}
            placeholder="Ingresa el código único"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="ubicacion">Ubicación:</label>
          <input
            type="text"
            id="ubicacion"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            placeholder="Ingresa la ubicación"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cantidadCO2">Cantidad de CO2 reducida:</label>
          <input
            type="text"
            id="cantidadCO2"
            name="cantidadCO2"
            value={formData.cantidadCO2}
            onChange={handleChange}
            placeholder="Solo en toneladas"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="periodoVerificacion">Periodo de verificación:</label>
          <input
            type="text"
            id="periodoVerificacion"
            name="periodoVerificacion"
            value={formData.periodoVerificacion}
            onChange={handleChange}
            placeholder='Ingresa "Día", "Mes" y "Año"'
            className="form-input"
          />
        </div>

        <button className="next-button" onClick={handleNext}>
          Siguiente
        </button>
      </div>

      {/* Paso 2 */}
      <div className={`form-step ${currentStep === 2 ? 'active' : ''}`}>
        <h2 className="form-title">Nuevo bono</h2>

        <div className="form-group">
          <label htmlFor="certificador">Certificador:</label>
          <input
            type="text"
            id="certificador"
            name="certificador"
            value={formData.certificador}
            onChange={handleChange}
            placeholder="Nombre del certificador"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fechaEmision">Fecha de emisión:</label>
          <input
            type="text"
            id="fechaEmision"
            name="fechaEmision"
            value={formData.fechaEmision}
            onChange={handleChange}
            placeholder="Fecha de emisión"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="registro">Registro:</label>
          <input
            type="text"
            id="registro"
            name="registro"
            value={formData.registro}
            onChange={handleChange}
            placeholder="Plataforma que lo certificó"
            className="form-input"
          />
        </div>

        <div className="button-group">
          <button className="prev-button" onClick={handlePrevious}>
            Anterior
          </button>
          <button className="finish-button" onClick={handleFinish}>
            Terminar
          </button>
        </div>
      </div>

      {/* Modal de Confirmación */}
      {showModal && (
        <ConfirmationModal
          onClose={handleCloseModal}
          onConfirm={handleConfirmModal}
        />
      )}
    </div>
  );
};

export default NewBondForm;
