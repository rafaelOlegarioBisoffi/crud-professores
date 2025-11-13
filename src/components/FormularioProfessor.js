import React, { useState } from 'react';
import './FormularioProfessor.css';

const areas = [
  'Matemática',
  'Português',
  'História',
  'Geografia',
  'Ciências',
  'Educação Física',
  'Artes',
  'Inglês',
  'Informática'
];

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

function FormularioProfessor({ professor, onSubmit, isLoading }) {
  const [formData, setFormData] = useState(professor || {
    nomeCompleto: '',
    cpf: '',
    matricula: '',
    areaAtuacao: '',
    emailInstitucional: '',
    telefoneCelular: '',
    logradouro: '',
    numeroEndereco: '',
    complemento: '',
    cidade: '',
    cep: '',
    uf: ''
  });

  const [erros, setErros] = useState({});

  const formatarCPF = (valor) => {
    return valor
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .slice(0, 14);
  };

  const formatarTelefone = (valor) => {
    return valor
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
  };

  const formatarCEP = (valor) => {
    return valor
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 9);
  };

  const validarFormulario = () => {
    const novoserros = {};

    if (!formData.nomeCompleto.trim()) {
      novoserros.nomeCompleto = 'Nome completo é obrigatório';
    }

    if (!formData.cpf.trim()) {
      novoserros.cpf = 'CPF é obrigatório';
    } else if (formData.cpf.replace(/\D/g, '').length !== 11) {
      novoserros.cpf = 'CPF inválido';
    }

    if (!formData.matricula.trim()) {
      novoserros.matricula = 'Matrícula é obrigatória';
    }

    if (!formData.areaAtuacao) {
      novoserros.areaAtuacao = 'Selecione uma área de atuação';
    }

    if (!formData.emailInstitucional.trim()) {
      novoserros.emailInstitucional = 'Email institucional é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailInstitucional)) {
      novoserros.emailInstitucional = 'Email inválido';
    }

    if (!formData.telefoneCelular.trim()) {
      novoserros.telefoneCelular = 'Telefone é obrigatório';
    } else if (formData.telefoneCelular.replace(/\D/g, '').length !== 11) {
      novoserros.telefoneCelular = 'Telefone inválido';
    }

    if (!formData.logradouro.trim()) {
      novoserros.logradouro = 'Logradouro é obrigatório';
    }

    if (!formData.numeroEndereco.trim()) {
      novoserros.numeroEndereco = 'Número é obrigatório';
    }

    if (!formData.cidade.trim()) {
      novoserros.cidade = 'Cidade é obrigatória';
    }

    if (!formData.cep.trim()) {
      novoserros.cep = 'CEP é obrigatório';
    } else if (formData.cep.replace(/\D/g, '').length !== 8) {
      novoserros.cep = 'CEP inválido';
    }

    if (!formData.uf) {
      novoserros.uf = 'Selecione um estado';
    }

    setErros(novoserros);
    return Object.keys(novoserros).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let novoValor = value;

    if (name === 'cpf') {
      novoValor = formatarCPF(value);
    } else if (name === 'telefoneCelular') {
      novoValor = formatarTelefone(value);
    } else if (name === 'cep') {
      novoValor = formatarCEP(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: novoValor
    }));

    if (erros[name]) {
      setErros(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="formulario-professor" onSubmit={handleSubmit}>
      <fieldset className="fieldset">
        <legend>Dados Pessoais/Profissionais</legend>

        <div className="form-group">
          <label htmlFor="nomeCompleto">Nome Completo *</label>
          <input
            type="text"
            id="nomeCompleto"
            name="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={handleChange}
            className={erros.nomeCompleto ? 'input-error' : ''}
          />
          {erros.nomeCompleto && <span className="erro">{erros.nomeCompleto}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cpf">CPF *</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="000.000.000-00"
              className={erros.cpf ? 'input-error' : ''}
            />
            {erros.cpf && <span className="erro">{erros.cpf}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="matricula">Matrícula *</label>
            <input
              type="text"
              id="matricula"
              name="matricula"
              value={formData.matricula}
              onChange={handleChange}
              className={erros.matricula ? 'input-error' : ''}
            />
            {erros.matricula && <span className="erro">{erros.matricula}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="areaAtuacao">Área de Atuação *</label>
            <select
              id="areaAtuacao"
              name="areaAtuacao"
              value={formData.areaAtuacao}
              onChange={handleChange}
              className={erros.areaAtuacao ? 'input-error' : ''}
            >
              <option value="">Selecione uma área</option>
              {areas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            {erros.areaAtuacao && <span className="erro">{erros.areaAtuacao}</span>}
          </div>
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <legend>Contatos</legend>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="emailInstitucional">Email Institucional *</label>
            <input
              type="email"
              id="emailInstitucional"
              name="emailInstitucional"
              value={formData.emailInstitucional}
              onChange={handleChange}
              className={erros.emailInstitucional ? 'input-error' : ''}
            />
            {erros.emailInstitucional && <span className="erro">{erros.emailInstitucional}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="telefoneCelular">Telefone Celular *</label>
            <input
              type="tel"
              id="telefoneCelular"
              name="telefoneCelular"
              value={formData.telefoneCelular}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              className={erros.telefoneCelular ? 'input-error' : ''}
            />
            {erros.telefoneCelular && <span className="erro">{erros.telefoneCelular}</span>}
          </div>
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <legend>Endereço Residencial</legend>

        <div className="form-group">
          <label htmlFor="logradouro">Logradouro *</label>
          <input
            type="text"
            id="logradouro"
            name="logradouro"
            value={formData.logradouro}
            onChange={handleChange}
            className={erros.logradouro ? 'input-error' : ''}
          />
          {erros.logradouro && <span className="erro">{erros.logradouro}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="numeroEndereco">Número *</label>
            <input
              type="text"
              id="numeroEndereco"
              name="numeroEndereco"
              value={formData.numeroEndereco}
              onChange={handleChange}
              className={erros.numeroEndereco ? 'input-error' : ''}
            />
            {erros.numeroEndereco && <span className="erro">{erros.numeroEndereco}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="complemento">Complemento</label>
            <input
              type="text"
              id="complemento"
              name="complemento"
              value={formData.complemento}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cidade">Cidade *</label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              className={erros.cidade ? 'input-error' : ''}
            />
            {erros.cidade && <span className="erro">{erros.cidade}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="cep">CEP *</label>
            <input
              type="text"
              id="cep"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              placeholder="00000-000"
              className={erros.cep ? 'input-error' : ''}
            />
            {erros.cep && <span className="erro">{erros.cep}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="uf">UF *</label>
            <select
              id="uf"
              name="uf"
              value={formData.uf}
              onChange={handleChange}
              className={erros.uf ? 'input-error' : ''}
            >
              <option value="">Selecione</option>
              {estados.map(estado => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
            {erros.uf && <span className="erro">{erros.uf}</span>}
          </div>
        </div>
      </fieldset>

      <div className="form-actions">
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}

export default FormularioProfessor;
