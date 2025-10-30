import React from 'react';
import './tropikScreen.css'; // Asumimos que crearemos un archivo CSS separado

const TropikScreen = () => {
  // Datos simulados para las tarjetas (en una aplicación real, esto vendría de una API o estado)
  const cardsData = [
    { id: 1, title: 'TROK', origin: 'proyecto de origen', location: 'ubicacion', typeDate: 'tipo de proyecto fecha' },
    { id: 2, title: 'TROK', origin: 'proyecto de origen', location: 'ubicacion', typeDate: 'tipo de proyecto fecha' },
    { id: 3, title: 'TROK', origin: 'proyecto de origen', location: 'ubicacion', typeDate: 'tipo de proyecto fecha' },
    { id: 4, title: 'TROK', origin: 'proyecto de origen', location: 'ubicacion', typeDate: 'tipo de proyecto fecha' },
  ];

  return (
    <div className="tropik-container">
      {/* Encabezado */}
      <header className="tropik-header">
        <div className="logo-container">
          <div className="logo-circle">
            {/* Aquí iría el SVG o la imagen del logo. Para este ejemplo, usamos un placeholder. */}
            <span className="logo-plant">🌱</span>
          </div>
          <h1 className="app-title">Tropik</h1>
        </div>
        <button className="login-button">Iniciar Sesión</button>
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
              {/* Icono de la planta, similar al logo */}
              <span className="icon-plant">🌱</span>
            </div>
            <div className="card-content">
              <h3>{card.title}</h3>
              <p>{card.origin}</p>
              <p>{card.location}</p>
              <p>{card.typeDate}</p>
            </div>
            <button className="buy-button">Comprar</button>
          </div>
        ))}
      </main>
    </div>
  );
};

export default TropikScreen;