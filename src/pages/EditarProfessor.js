import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfessorPorId, atualizarProfessor } from '../services/ProfessorService';
import FormularioProfessor from '../components/FormularioProfessor';
import './EditarProfessor.css';

function EditarProfessor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [professor, setProfessor] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [carregandoSalvo, setCarregandoSalvo] = useState(false);
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

  const handleSubmit = async (formData) => {
    try {
      setCarregandoSalvo(true);
      setErro(null);
      await atualizarProfessor(id, formData);
      navigate(`/professores/${id}`);
    } catch (erro) {
      setErro('Erro ao atualizar professor. Tente novamente.');
      console.error(erro);
    } finally {
      setCarregandoSalvo(false);
    }
  };

  if (carregando) {
    return (
      <div className="editar-professor">
        <div className="card">
          <p className="carregando">Carregando dados do professor...</p>
        </div>
      </div>
    );
  }

  if (erro && !professor) {
    return (
      <div className="editar-professor">
        <div className="alerta alerta-erro">{erro}</div>
      </div>
    );
  }

  return (
    <div className="editar-professor">
      <h1>Editar Professor</h1>

      {erro && <div className="alerta alerta-erro">{erro}</div>}

      {professor && (
        <FormularioProfessor
          professor={professor}
          onSubmit={handleSubmit}
          isLoading={carregandoSalvo}
        />
      )}
    </div>
  );
}

export default EditarProfessor;
