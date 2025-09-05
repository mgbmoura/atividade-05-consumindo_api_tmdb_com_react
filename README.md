# 🎬 Busca Filmes +praTi

![Status](https://img.shields.io/badge/status-conclu%C3%ADdo-brightgreen)
![Linguagem](https://img.shields.io/github/languages/top/mgbmoura/atividade-05-consumindo_api_tmdb_com_react?color=blue)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-green)

> Projeto da Atividade 05 do curso Dev. Full Stack Jr. (+praTi & Codifica). Aplicação web em React.js consumindo a API do TMDB para buscar filmes dinamicamente, navegar por resultados com paginação, visualizar detalhes completos e gerenciar uma lista de favoritos salva de forma persistente via localStorage.

---

## ✨ Funcionalidades Principais

-   [x] **Página de Busca:** Campo para pesquisar filmes por título.
-   [x] **Listagem de Resultados:** Exibição dos filmes encontrados em um grid responsivo com pôster, título e ano.
-   [x] **Paginação:** Sistema para navegar entre as múltiplas páginas de resultados.
-   [x] **Página de Detalhes:** Rota dedicada para cada filme, exibindo informações completas como sinopse, avaliação, elenco e gêneros.
-   [x] **Lista de Favoritos:** Sistema para adicionar e remover filmes de uma lista pessoal.
-   [x] **Persistência de Dados:** A lista de favoritos é salva no `localStorage` do navegador, mantendo os dados mesmo após fechar a página.
-   [x] **Tratamento de Erros & Loading:** Indicadores visuais para o usuário durante o carregamento de dados e exibição de mensagens de erro claras.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

| Tecnologia      | Descrição                                         |
| --------------- | --------------------------------------------------- |
| **React.js** | Biblioteca para construção da interface de usuário. |
| **Vite.js** | Ferramenta de build e servidor de desenvolvimento.  |
| **Tailwind CSS**| Framework CSS para estilização rápida e moderna.    |
| **React Router**| Para gerenciamento de rotas na SPA.                 |
| **API do TMDB** | Fonte de todos os dados sobre os filmes.            |
| **Git & GitHub**| Para versionamento e hospedagem do código.          |

## 🚀 Como Executar o Projeto

Para rodar este projeto localmente, siga os passos abaixo:

**1. Pré-requisitos**
* Ter o [Node.js](https://nodejs.org/en/) (versão 20 LTS recomendada) instalado.
* Ter o [Git](https://git-scm.com/) instalado.

**2. Clone o Repositório**
```bash
git clone [https://github.com/mgbmoura/atividade-05-consumindo_api_tmdb_com_react.git](https://github.com/mgbmoura/atividade-05-consumindo_api_tmdb_com_react.git)
cd atividade-05-consumindo_api_tmdb_com_react

3. Instale as Dependências

Bash

npm install
4. Crie o Arquivo de Variáveis de Ambiente
Crie um arquivo chamado .env na raiz do projeto e adicione sua chave da API do TMDB:

VITE_API_KEY="SUA_CHAVE_DA_API_AQUI"
5. Rode o Projeto

Bash

npm run dev
O projeto estará disponível em http://localhost:5173 (ou a porta que seu terminal indicar).



👨‍💻 Autor
Desenvolvido por Marcelo Giulian.