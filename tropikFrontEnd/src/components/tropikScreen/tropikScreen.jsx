import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './tropikScreen.css';
import ConfirmationModal from '../Modales/modal/ConfirmationModal';
import SuccessModal from '../Modales/modal(pregunta)/SuccessModal';

const TropikScreen = () => {
  const navigate = useNavigate(); // Hook de React Router
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Datos simulados para las tarjetas
  const cardsData = [
    { id: 1, title: 'TROK', origin: 'proyecto de origen', location: 'ubicacion', typeDate: 'tipo de proyecto fecha' },
    { id: 2, title: 'TROK', origin: 'proyecto de origen', location: 'ubicacion', typeDate: 'tipo de proyecto fecha' },
    { id: 3, title: 'TROK', origin: 'proyecto de origen', location: 'ubicacion', typeDate: 'tipo de proyecto fecha' },
    { id: 4, title: 'TROK', origin: 'proyecto de origen', location: 'ubicacion', typeDate: 'tipo de proyecto fecha' },
  ];

  // Función para abrir modal de confirmación
  const handleBuyClick = () => {
    setShowModal(true);
  };

  // Cerrar modal de confirmación
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Confirmar compra y mostrar SuccessModal
  const handleConfirmPurchase = () => {
    setShowModal(false);
    setShowSuccess(true);
  };

  // Cerrar SuccessModal
  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  // Función para redirigir al login
  const goToLogin = () => {
    navigate('/login'); // Redirige a LoginScreen
  };

  return (
    <div className="tropik-container">
      {/* Encabezado */}
      <header className="tropik-header">
        <div className="logo-container">
          <div className="logo-circle">
            <span className="logo-plant">🌱</span>
          </div>
          <h1 className="app-title">Tropik</h1>
        </div>
        {/* Botón de login */}
        <button className="login-button" onClick={goToLogin}>
          Iniciar Sesión
        </button>
      </header>

      {/* Subtítulo */}
      <div className="subtitle">
        "Tokeniza el futuro, cultiva el cambio"
      </div>

      {/* Cuerpo Principal - Tarjetas */}
      <main className="cards-container">
        {cardsData.map(card => (
          <div key={card.id} className="card">
            <div className="card-icon">
              <span className="icon-plant">🌱</span>
            </div>
            <div className="card-content">
              <h3>{card.title}</h3>
              <p>{card.origin}</p>
              <p>{card.location}</p>
              <p>{card.typeDate}</p>
            </div>
            <button className="buy-button" onClick={handleBuyClick}>
              Comprar
            </button>
          </div>
        ))}
      </main>

      {/* Modal de Confirmación */}
      {showModal && (
        <ConfirmationModal
          onClose={handleCloseModal}
          onConfirm={handleConfirmPurchase}
        />
      )}

      {/* Modal de Éxito */}
      {showSuccess && <SuccessModal onClose={handleCloseSuccess} />}
    </div>
  );
};

export default TropikScreen;
