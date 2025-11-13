import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarProfessor } from '../services/ProfessorService';
import FormularioProfessor from '../components/FormularioProfessor';
import './CriarProfessor.css';

function CriarProfessor() {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setCarregando(true);
      setErro(null);
      const novoProfessor = await criarProfessor(formData);
      navigate(`/professores/${novoProfessor.id}`);
    } catch (erro) {
      setErro('Erro ao criar professor. Tente novamente.');
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="criar-professor">
      <h1>Novo Professor</h1>

      {erro && <div className="alerta alerta-erro">{erro}</div>}

      <FormularioProfessor
        onSubmit={handleSubmit}
        isLoading={carregando}
      />
    </div>
  );
}

export default CriarProfessor;
