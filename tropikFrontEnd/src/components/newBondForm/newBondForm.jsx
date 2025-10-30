// NewBondForm.jsx
import React, { useState } from 'react';
import './NewBondForm.css'; // Estilos CSS

const NewBondForm = () => {
  // Estado para controlar qué paso se muestra
  const [currentStep, setCurrentStep] = useState(1);

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    codigoUnico: '',
    ubicacion: '',
    cantidadCO2: '',
    periodoVerificacion: '',
    certificador: '',
    fechaEmision: '',
    registro: '',
  });

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función para ir al siguiente paso
  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  // Función para volver al paso anterior
  const handlePrevious = () => {
    setCurrentStep(1);
  };

  // Función para enviar el formulario (terminar)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    // Aquí iría la lógica para enviar los datos a un backend
    alert('¡Bono creado con éxito!');
  };

  // Validación simple del Paso 1
  const validateStep1 = () => {
    const { codigoUnico, ubicacion, cantidadCO2, periodoVerificacion } = formData;
    if (!codigoUnico || !ubicacion || !cantidadCO2 || !periodoVerificacion) {
      alert('Por favor, completa todos los campos del Paso 1.');
      return false;
    }
    return true;
  };

  return (
    <div className="form-container">
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
            placeholder="Ingresa el codigo unico"
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
            placeholder="Ingresa la ubicación en la que se encuentra"
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
            placeholder="Ingresa la cantidad de CO2 solo en toneladas"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="periodoVerificacion">Perdiodo de verificación:</label>
          <input
            type="text"
            id="periodoVerificacion"
            name="periodoVerificacion"
            value={formData.periodoVerificacion}
            onChange={handleChange}
            placeholder='Ingresa "Dia", "Mes" y "Año"'
            className="form-input"
          />
        </div>

        <button className="next-button" onClick={handleNext}>
          Siguiente
        </button>
      </div>

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
            placeholder="Ingresa el nombre de la persona que lo certifico"
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
            placeholder="Ingresa la fecha en la que bono fue admitido"
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
            placeholder="Plataforma que lacertifico"
            className="form-input"
          />
        </div>

        <div className="button-group">
          <button className="prev-button" onClick={handlePrevious}>
            Anterior
          </button>
          <button className="finish-button" onClick={handleSubmit}>
            Terminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewBondForm;