<h1 align="center">
  <br />
  <img alt="ABC Logo" src="./github/logo.svg" width="200px" />
</h1>

<h4 align="center">A empresa ABC é software de gestão de exames no qual é possivel realizar o cadastro e filtragem dos exames realizados pelos funcionarios da empresa</h4>

<p align="center">
  <img alt="Linguagem mais usada" src="https://img.shields.io/github/languages/top/marcosribeirodacunha/aurora-events?style=flat">

  <img alt="Objetivo: estudo" src="https://img.shields.io/badge/purpose-study-lightgrey?style=flat">

  <img alt="Netlify Status" src="https://api.netlify.com/api/v1/badges/6ba2cfed-7529-469d-ba90-231a97901405/deploy-status">

  <img alt="GitHub" src="https://img.shields.io/github/license/marcosribeirodacunha/abc-gestao-de-exames">

  <img alt="Eslint" src="https://img.shields.io/badge/dynamic/json?label=eslint&query=%24.devDependencies.eslint&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmarcosribeirodacunha%2Fabc-gestao-de-exames%2Fmaster%2Fpackage.json&logo=eslint&color=4b32c3">

  <img alt="Prettier" src="https://img.shields.io/badge/dynamic/json?label=prettier&query=%24.devDependencies.prettier&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmarcosribeirodacunha%2Fabc-gestao-de-exames%2Fmaster%2Fpackage.json&color=f7b93e&logo=prettier">

  <img alt="Code style: Airbnb" src="https://img.shields.io/badge/code%20style-airbnb-ff5a5f" />
</p>

<p align="center">
  <a href="https://abc-gestao-de-exames.netlify.app">
    <img alt="Website" src="https://img.shields.io/badge/website-abc gestão de exames-00c7b7?style=for-the-badge&logo=netlify">
  </a>
</p>

<p align="center">
  <a href="#-recursos">Recursos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p>

<p align="center">
  <img src="./github/exams_list_mockup.png" alt="ABC - exams list page" width="100%">
</p>

## 🗃 Recursos

- [x] Login com matricula ou email
- [x] Listagem dos exames a vencer no periodo de um mês a partir do dia atual
- [x] Criação, listagem, atualização e deleção.
  - [x] Cargos para funcionários
  - [x] Tipos de exames
  - [x] Categorias de exames
  - [x] Funcionários
  - [x] Exames
- [x] Listagem dinâmica de funcionários com diferentes filtros:
  - [x] Nome do funcionário
  - [x] Matrícula
  - [x] Função
- [x] Listagem dinâmica de exames com diferentes filtros:
  - [x] Nome do funcionário
  - [x] Matrícula
  - [x] Função
  - [x] Tipo do exame
  - [x] Categoria do exame
  - [x] Validade

Obs.: Esta aplicação **NÃO** é responsiva.

## ⚙ Instalação

Para clonar e executar esta aplicação é necessário possuir instalado [Git](https://git-scm.com/) e [NodeJS](https://nodejs.org/en/download/) (que instala também o [npm](https://www.npmjs.com/)). Em sua linha de comando:

```bash
# Clone o repositório
$ git clone https://github.com/marcosribeirodacunha/abc-gestao-de-exames.git

# Entre no repositório
$ cd abc-gestao-de-exames

# Instale as dependências
$ yarn
// ou npm install
```

### ❗ Importante

Para que todas as funcionalidades da aplicação funcionem normalmente clone, instale e inicie a API desta aplicação, que está localizada em: [abc-gestao-de-exames-api](https://github.com/marcosribeirodacunha/abc-gestao-de-exames-api).

Após iniciar a API renomeie o arquivo `.env.example` para `.env` e modifique, a variável REACT_APP_API_URL com a url da API. (Caso esteja executando a aplicação localmente, pode não ser necessário realizar esta modificação).

Para iniciar a aplicação execute os seguintes comandos dentro do diretorio raiz:

```bash
$ yarn start
// ou npm start
```

## 👨🏽‍💻 Tecnologias

- [ReactJS](https://pt-br.reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [React-Router](https://reactrouter.com/web/guides/quick-start)
- [Styled Components](https://styled-components.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Axios](https://github.com/axios/axios)
- [Lodash](https://lodash.com/)
- [React Select](https://react-select.com/home)
- [React Datepicker](https://reactdatepicker.com/)
- [ESlint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

## 📜 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
