// TropikTable.jsx
import React from 'react';
import './TropikTable.css'; // Estilos CSS

const TropikTable = () => {
  // Datos simulados para la tabla
  const tableData = [
    { id: 1, project: 'Xochi', location: 'México', verification: '6 meses', verifier: 'SEMARNAT', emission: '16/10/2025', status: 'Activo' },
    { id: 2, project: 'Xochi', location: 'México', verification: '6 meses', verifier: 'SEMARNAT', emission: '16/10/2025', status: 'Activo' },
    { id: 3, project: 'Xochi', location: 'México', verification: '6 meses', verifier: 'SEMARNAT', emission: '16/10/2025', status: 'Activo' },
    { id: 4, project: 'Xochi', location: 'México', verification: '6 meses', verifier: 'SEMARNAT', emission: '16/10/2025', status: 'Activo' },
  ];

  return (
    <div className="tropik-container">
      {/* Encabezado */}
      <header className="tropik-header">
        <div className="logo-title">
          <div className="logo-circle">
            <span className="logo-plant">🌱</span>
          </div>
          <h1 className="app-title">Tropik</h1>
        </div>
        <div className="user-actions">
          <span className="welcome-text">Bienvenido, Usuario</span>
          <button className="add-button">Agregar nuevo bono</button>
        </div>
      </header>

      {/* Sección Principal */}
      <main className="main-content">
        <h2 className="section-title">TROK's</h2>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Proyecto de origen</th>
                <th>Ubicacion</th>
                <th>Periodo de verificacion</th>
                <th>Nombre del verificador</th>
                <th>Fecha de emicion</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(row => (
                <tr key={row.id}>
                  <td>{row.project}</td>
                  <td>{row.location}</td>
                  <td>{row.verification}</td>
                  <td>{row.verifier}</td>
                  <td>{row.emission}</td>
                  <td>{row.status}</td>
                  <td className="actions-cell">
                    <button className="actions-button">...</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default TropikTable;