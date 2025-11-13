import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="card">
        <h1>Sistema de Gerenciamento de Professores</h1>
        <p className="descricao">
          Bem-vindo ao sistema de cadastro e gerenciamento de professores. 
          Utilize o menu acima para navegar e gerenciar os registros de professores.
        </p>

        <div className="opcoes">
          <div className="opcao">
            <h3>📋 Visualizar Professores</h3>
            <p>Veja a lista completa de todos os professores cadastrados no sistema.</p>
            <Link to="/professores" className="btn-link">
              Acessar Lista
            </Link>
          </div>

          <div className="opcao">
            <h3>➕ Novo Professor</h3>
            <p>Cadastre um novo professor no sistema preenchendo o formulário completo.</p>
            <Link to="/professores/novo" className="btn-link">
              Criar Professor
            </Link>
          </div>

          <div className="opcao">
            <h3>ℹ️ Informações</h3>
            <p>O sistema permite criar, ler, atualizar e deletar registros de professores com segurança.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
