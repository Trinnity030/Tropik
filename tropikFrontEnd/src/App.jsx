import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TropikScreen from './components/tropikScreen/tropikScreen.jsx';
import TropikTable from './components/tropikTable/tropikTable.jsx';
import NewBondForm from './components/newBondForm/newBondForm.jsx';
import LoginScreen from './components/loginScreen/loginScreen.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página inicial: TropikScreen */}
        <Route path="/" element={<TropikScreen />} />

        {/* Ruta de login */}
        <Route path="/login" element={<LoginScreen />} />

        {/* Otras rutas */}
        <Route path="/table" element={<TropikTable />} />
        <Route path="/new-bond" element={<NewBondForm />} />
      </Routes>
    </Router>
  );
}

export default App;
