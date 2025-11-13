# CRUD de Professores - Sistema de Gerenciamento

Sistema completo de gerenciamento de professores desenvolvido com React e React Router, seguindo as melhores práticas de SPA (Single Page Application).

## 🎯 Objetivo

Implementar um sistema CRUD funcional para gerenciar dados de professores com interface amigável e roteamento dinâmico.

## ✨ Funcionalidades

### CRUD Completo
- **Create (Criar)**: Formulário para cadastrar novos professores
- **Read (Ler)**: 
  - Listagem de todos os professores
  - Visualização detalhada de cada professor
- **Update (Atualizar)**: Edição dos dados de professores existentes
- **Delete (Deletar)**: Remoção de professores com confirmação

### Recursos Adicionais
- 🔍 Filtro em tempo real na listagem
- ✅ Validação completa de formulários
- 📱 Design responsivo
- 🎨 Interface moderna e intuitiva
- 📋 Máscaras de entrada (CPF, Telefone, CEP)

## 📊 Estrutura de Dados do Professor

### Dados Pessoais/Profissionais
- Nome Completo (obrigatório)
- CPF (obrigatório, com máscara)
- Matrícula/Registro Funcional (obrigatório)
- Área de Atuação (obrigatório, dropdown)

### Contatos
- Email Institucional (obrigatório, validação de email)
- Telefone Celular (obrigatório, com máscara)

### Endereço Residencial
- Logradouro (obrigatório)
- Número (obrigatório)
- Complemento (opcional)
- Cidade (obrigatório)
- CEP (obrigatório, com máscara)
- UF/Estado (obrigatório, dropdown)

## 🏗️ Estrutura do Projeto

```
crud-professores/
├── public/
│   └── index.html
├── src/
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Home.css
│   │   ├── ListaProfessores.js
│   │   ├── ListaProfessores.css
│   │   ├── CriarProfessor.js
│   │   ├── CriarProfessor.css
│   │   ├── EditarProfessor.js
│   │   ├── EditarProfessor.css
│   │   ├── DetalhesProfessor.js
│   │   └── DetalhesProfessor.css
│   ├── components/
│   │   ├── Navegacao.js
│   │   ├── Navegacao.css
│   │   ├── FormularioProfessor.js
│   │   └── FormularioProfessor.css
│   ├── services/
│   │   └── ProfessorService.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🚀 Como Começar

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm start
```
A aplicação abrirá em `http://localhost:3000`

### Build para Produção
```bash
npm run build
```

## 📚 Rotas da Aplicação

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | Home | Página inicial |
| `/professores` | Lista | Listagem de professores |
| `/professores/novo` | Criar | Formulário para novo professor |
| `/professores/:id` | Detalhes | Visualizar detalhes de um professor |
| `/professores/:id/editar` | Editar | Formulário para editar professor |

## 🎨 Tecnologias Utilizadas

- **React 18.2.0**: Biblioteca para construir interfaces
- **React Router DOM 6.8.0**: Roteamento na aplicação
- **CSS3**: Estilos modernos e responsivos
- **JavaScript ES6+**: Lógica da aplicação

## 🔐 Validações Implementadas

- ✅ Validação de campos obrigatórios
- ✅ Validação de CPF (formato)
- ✅ Validação de Email
- ✅ Validação de Telefone (11 dígitos)
- ✅ Validação de CEP (8 dígitos)
- ✅ Máscara automática de entrada

## 💾 Armazenamento de Dados

Atualmente, os dados são armazenados em memória no `ProfessorService.js`. Para integração com um backend real:

1. Substitua as funções em `ProfessorService.js` por chamadas HTTP
2. Use `axios` ou `fetch` para comunicação com a API
3. Configure as endpoints do servidor

Exemplo com axios (já incluído no package.json):
```javascript
import axios from 'axios';

const API_URL = 'http://seu-servidor/api/professores';

export const getProfessores = () => axios.get(API_URL);
export const getProfessorPorId = (id) => axios.get(`${API_URL}/${id}`);
export const criarProfessor = (dados) => axios.post(API_URL, dados);
export const atualizarProfessor = (id, dados) => axios.put(`${API_URL}/${id}`, dados);
export const deletarProfessor = (id) => axios.delete(`${API_URL}/${id}`);
```

## 🎯 Padrões Adotados

- ✅ Componentes funcionais com Hooks
- ✅ Context para estado global (preparado para futuras implementações)
- ✅ Separação de concerns (páginas, componentes, serviços)
- ✅ CSS modularizado por componente
- ✅ Nomes descritivos e código limpo
- ✅ Tratamento de erros e estados de carregamento

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- Desktop (1920px e acima)
- Tablet (768px a 1024px)
- Mobile (até 768px)

## 🤝 Contribuindo

Para contribuir com este projeto:
1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## ✍️ Autor

Rafael Olegário Bisoffi

## 🔗 Referências

- [Documentação React](https://react.dev)
- [React Router](https://reactrouter.com)
- [Documentação JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
