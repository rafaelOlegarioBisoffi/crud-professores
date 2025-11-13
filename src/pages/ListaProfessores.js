import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProfessores, deletarProfessor } from '../services/ProfessorService';
import './ListaProfessores.css';

function ListaProfessores() {
  const [professores, setProfessores] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    carregarProfessores();
  }, []);

  const carregarProfessores = async () => {
    try {
      setCarregando(true);
      const dados = await getProfessores();
      setProfessores(dados);
      setErro(null);
    } catch (erro) {
      setErro('Erro ao carregar professores');
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  };

  const handleDeletar = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este professor?')) {
      try {
        await deletarProfessor(id);
        setProfessores(professores.filter(p => p.id !== id));
      } catch (erro) {
        setErro('Erro ao deletar professor');
        console.error(erro);
      }
    }
  };

  const professoreFiltrados = professores.filter(professor =>
    professor.nomeCompleto.toLowerCase().includes(filtro.toLowerCase()) ||
    professor.cpf.includes(filtro) ||
    professor.areaAtuacao.toLowerCase().includes(filtro.toLowerCase())
  );

  if (carregando) {
    return (
      <div className="lista-professores">
        <div className="card">
          <p className="carregando">Carregando professores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lista-professores">
      <div className="header-lista">
        <h1>Lista de Professores</h1>
        <Link to="/professores/novo" className="btn-novo">
          + Novo Professor
        </Link>
      </div>

      {erro && <div className="alerta alerta-erro">{erro}</div>}

      {professores.length === 0 ? (
        <div className="card">
          <p className="vazio">Nenhum professor cadastrado. <Link to="/professores/novo">Criar novo</Link></p>
        </div>
      ) : (
        <>
          <div className="filtro">
            <input
              type="text"
              placeholder="Filtrar por nome, CPF ou área..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="input-filtro"
            />
            <span className="resultado-filtro">
              {professoreFiltrados.length} de {professores.length} professor(es)
            </span>
          </div>

          {professoreFiltrados.length === 0 ? (
            <div className="card">
              <p className="vazio">Nenhum resultado encontrado</p>
            </div>
          ) : (
            <div className="tabela-container">
              <table className="tabela">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Matrícula</th>
                    <th>Área</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {professoreFiltrados.map(professor => (
                    <tr key={professor.id}>
                      <td>{professor.nomeCompleto}</td>
                      <td>{professor.cpf}</td>
                      <td>{professor.matricula}</td>
                      <td>{professor.areaAtuacao}</td>
                      <td>{professor.emailInstitucional}</td>
                      <td>{professor.telefoneCelular}</td>
                      <td className="coluna-acoes">
                        <Link to={`/professores/${professor.id}`} className="btn-detalhes">
                          Detalhes
                        </Link>
                        <Link to={`/professores/${professor.id}/editar`} className="btn-editar">
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDeletar(professor.id)}
                          className="btn-deletar"
                        >
                          Deletar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ListaProfessores;
