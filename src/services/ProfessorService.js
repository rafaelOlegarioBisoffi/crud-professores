// Simulação de um serviço de API
// Em produção, isso se conectaria a um servidor real

let professores = [
  {
    id: 1,
    nomeCompleto: 'Maria Silva Santos',
    cpf: '123.456.789-00',
    matricula: 'MAT001',
    areaAtuacao: 'Matemática',
    emailInstitucional: 'maria.silva@escola.edu.br',
    telefoneCelular: '(11) 98765-4321',
    logradouro: 'Rua das Flores',
    numeroEndereco: '123',
    complemento: 'Apto 456',
    cidade: 'São Paulo',
    cep: '01234-567',
    uf: 'SP'
  },
  {
    id: 2,
    nomeCompleto: 'João Pedro Oliveira',
    cpf: '987.654.321-00',
    matricula: 'MAT002',
    areaAtuacao: 'Português',
    emailInstitucional: 'joao.pedro@escola.edu.br',
    telefoneCelular: '(11) 99876-5432',
    logradouro: 'Avenida Paulista',
    numeroEndereco: '1000',
    complemento: '',
    cidade: 'São Paulo',
    cep: '01311-100',
    uf: 'SP'
  }
];

let proximoId = 3;

export const getProfessores = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...professores]);
    }, 300);
  });
};

export const getProfessorPorId = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const professor = professores.find(p => p.id === parseInt(id));
      if (professor) {
        resolve({ ...professor });
      } else {
        reject(new Error('Professor não encontrado'));
      }
    }, 300);
  });
};

export const criarProfessor = (dados) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const novoProfessor = {
        id: proximoId++,
        ...dados
      };
      professores.push(novoProfessor);
      resolve(novoProfessor);
    }, 500);
  });
};

export const atualizarProfessor = (id, dados) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const indice = professores.findIndex(p => p.id === parseInt(id));
      if (indice !== -1) {
        professores[indice] = {
          ...professores[indice],
          ...dados
        };
        resolve(professores[indice]);
      } else {
        reject(new Error('Professor não encontrado'));
      }
    }, 500);
  });
};

export const deletarProfessor = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const indice = professores.findIndex(p => p.id === parseInt(id));
      if (indice !== -1) {
        const professor = professores[indice];
        professores.splice(indice, 1);
        resolve(professor);
      } else {
        reject(new Error('Professor não encontrado'));
      }
    }, 500);
  });
};
