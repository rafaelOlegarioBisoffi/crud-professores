import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListaProfessores from './pages/ListaProfessores';
import CriarProfessor from './pages/CriarProfessor';
import EditarProfessor from './pages/EditarProfessor';
import DetalhesProfessor from './pages/DetalhesProfessor';
import Navegacao from './components/Navegacao';
import './App.css';

function App() {
  return (
    <Router>
      <Navegacao />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/professores" element={<ListaProfessores />} />
          <Route path="/professores/novo" element={<CriarProfessor />} />
          <Route path="/professores/:id" element={<DetalhesProfessor />} />
          <Route path="/professores/:id/editar" element={<EditarProfessor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
