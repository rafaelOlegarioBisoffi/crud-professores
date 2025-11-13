import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProfessorPorId, deletarProfessor } from '../services/ProfessorService';
import './DetalhesProfessor.css';

function DetalhesProfessor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [professor, setProfessor] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarProfessor = async () => {
      try {
        setCarregando(true);
        const dados = await getProfessorPorId(id);
        setProfessor(dados);
        setErro(null);
      } catch (erro) {
        setErro('Erro ao carregar professor');
        console.error(erro);
      } finally {
        setCarregando(false);
      }
    };

    carregarProfessor();
  }, [id]);

  const handleDeletar = async () => {
    if (window.confirm('Tem certeza que deseja deletar este professor?')) {
      try {
        await deletarProfessor(id);
        navigate('/professores');
      } catch (erro) {
        setErro('Erro ao deletar professor');
        console.error(erro);
      }
    }
  };

  if (carregando) {
    return (
      <div className="detalhes-professor">
        <div className="card">
          <p className="carregando">Carregando detalhes do professor...</p>
        </div>
      </div>
    );
  }

  if (erro || !professor) {
    return (
      <div className="detalhes-professor">
        <div className="alerta alerta-erro">{erro || 'Professor não encontrado'}</div>
        <Link to="/professores" className="btn-voltar">Voltar para lista</Link>
      </div>
    );
  }

  return (
    <div className="detalhes-professor">
      <div className="header-detalhes">
        <h1>{professor.nomeCompleto}</h1>
        <div className="botoes-detalhes">
          <Link to={`/professores/${professor.id}/editar`} className="btn-editar-det">
            ✏️ Editar
          </Link>
          <button onClick={handleDeletar} className="btn-deletar-det">
            🗑️ Deletar
          </button>
          <Link to="/professores" className="btn-voltar-det">
            ← Voltar
          </Link>
        </div>
      </div>

      <div className="detalhes-container">
        <fieldset className="fieldset-detalhe">
          <legend>Dados Pessoais/Profissionais</legend>
          <div className="detalhe-grid">
            <div className="detalhe-item">
              <label>Nome Completo</label>
              <p>{professor.nomeCompleto}</p>
            </div>
            <div className="detalhe-item">
              <label>CPF</label>
              <p>{professor.cpf}</p>
            </div>
            <div className="detalhe-item">
              <label>Matrícula</label>
              <p>{professor.matricula}</p>
            </div>
            <div className="detalhe-item">
              <label>Área de Atuação</label>
              <p>{professor.areaAtuacao}</p>
            </div>
          </div>
        </fieldset>

        <fieldset className="fieldset-detalhe">
          <legend>Contatos</legend>
          <div className="detalhe-grid">
            <div className="detalhe-item">
              <label>Email Institucional</label>
              <p><a href={`mailto:${professor.emailInstitucional}`}>{professor.emailInstitucional}</a></p>
            </div>
            <div className="detalhe-item">
              <label>Telefone Celular</label>
              <p><a href={`tel:${professor.telefoneCelular}`}>{professor.telefoneCelular}</a></p>
            </div>
          </div>
        </fieldset>

        <fieldset className="fieldset-detalhe">
          <legend>Endereço Residencial</legend>
          <div className="detalhe-grid">
            <div className="detalhe-item">
              <label>Logradouro</label>
              <p>{professor.logradouro}</p>
            </div>
            <div className="detalhe-item">
              <label>Número</label>
              <p>{professor.numeroEndereco}</p>
            </div>
            {professor.complemento && (
              <div className="detalhe-item">
                <label>Complemento</label>
                <p>{professor.complemento}</p>
              </div>
            )}
            <div className="detalhe-item">
              <label>Cidade</label>
              <p>{professor.cidade}</p>
            </div>
            <div className="detalhe-item">
              <label>CEP</label>
              <p>{professor.cep}</p>
            </div>
            <div className="detalhe-item">
              <label>UF (Estado)</label>
              <p>{professor.uf}</p>
            </div>
          </div>

          <div className="endereco-completo">
            <strong>Endereço Completo:</strong>
            <p>
              {professor.logradouro}, {professor.numeroEndereco}
              {professor.complemento && ` - ${professor.complemento}`}
              <br />
              {professor.cidade} - {professor.uf}, {professor.cep}
            </p>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default DetalhesProfessor;
