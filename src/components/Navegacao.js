import React from 'react';
import { Link } from 'react-router-dom';
import './Navegacao.css';

function Navegacao() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/professores">Professores</Link></li>
        <li><Link to="/professores/novo">Novo Professor</Link></li>
      </ul>
    </nav>
  );
}

export default Navegacao;
