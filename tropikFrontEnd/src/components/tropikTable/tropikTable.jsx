import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import './TropikTable.css'; // Estilos CSS

const TropikTable = () => {
  const navigate = useNavigate(); // Hook para navegación

  // Datos simulados para la tabla
  const tableData = [
    { id: 1, project: 'Xochi', location: 'México', verification: '6 meses', verifier: 'SEMARNAT', emission: '16/10/2025', status: 'Activo' },
    { id: 2, project: 'Xochi', location: 'México', verification: '6 meses', verifier: 'SEMARNAT', emission: '16/10/2025', status: 'Activo' },
    { id: 3, project: 'Xochi', location: 'México', verification: '6 meses', verifier: 'SEMARNAT', emission: '16/10/2025', status: 'Activo' },
    { id: 4, project: 'Xochi', location: 'México', verification: '6 meses', verifier: 'SEMARNAT', emission: '16/10/2025', status: 'Activo' },
  ];

  // Función para redirigir al formulario de nuevo bono
  const handleAddNewBond = () => {
    navigate('/new-bond'); // Redirige a la ruta del formulario
  };

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
          <button className="add-button" onClick={handleAddNewBond}>
            Agregar nuevo bono
          </button>
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
                <th>Ubicación</th>
                <th>Periodo de verificación</th>
                <th>Nombre del verificador</th>
                <th>Fecha de emisión</th>
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
                    <button className="actions-button" onClick={() => navigate(`/new-bond/${row.id}`)}>
                      Editar
                    </button>
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
