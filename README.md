# Desafio Front-end: SPA de Consulta de Pessoas (PJC-MT)

![Badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Badge](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Badge](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Badge](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**Contexto:** Projeto desenvolvido como avaliação técnica para a vaga de Desenvolvedor Júnior.

Esta é uma Single Page Application (SPA) que consome a API da Polícia Judiciária Civil de Mato Grosso para permitir a consulta de registros de pessoas desaparecidas e localizadas.

---

### 🖼️ Tela Principal

![Screenshot da Tela Principal do Projeto](IMAGEM)

---

### ✨ Funcionalidades Implementadas

- [x] **Interface Responsiva:** O layout se adapta a diferentes tamanhos de tela, de celulares a desktops.
- [x] **Estrutura em Componentes:** A aplicação foi estruturada em componentes reutilizáveis (`Navbar`, `Card`, `SearchForm`, `Pagination`).
- [x] **Consumo de API (via Mock):** Implementado um serviço de mock de alta fidelidade para simular a API, que se mostrou instável durante o desenvolvimento.
- [x] **Busca por Parâmetros:** Formulário funcional para filtrar os resultados por nome e status.
- [x] **Paginação:** Sistema de navegação entre as páginas de resultados.
- [x] **Roteamento com Lazy Loading:** As rotas são carregadas sob demanda para otimizar a performance inicial.
- [x] **Ambiente Dockerizado:** Configuração completa para desenvolvimento e entrega via contêineres Docker, garantindo consistência e portabilidade.

---

### 🛠️ Tecnologias e Configurações

* **Core:** React 19, TypeScript, Vite.
* **Estilização:** Tailwind CSS, configurado para um tema escuro e tipografia customizada com a fonte 'Inter'.
* **Chamadas de API:** Axios.
* **Roteamento:** React Router DOM.
* **Qualidade de Código:** ESLint e Prettier para padronização e formatação automática.

---

### 🚀 Como Executar o Projeto

**Pré-requisitos:** [Node.js](https://nodejs.org/) (v20+), [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/install/).

#### **1. Desenvolvimento com Docker (Recomendado)**

Este método utiliza um contêiner Docker para criar um ambiente de desenvolvimento limpo e isolado, garantindo que o projeto funcione independentemente do sistema operacional local.

```bash
# Clone o repositório
git clone https://github.com/freitaszLe/desenvolve-mt-apitus.git(https://github.com/freitaszLe/desenvolve-mt-apitus.git)

# Construa a imagem e inicie o contêiner
docker compose up --build
```
A aplicação estará disponível em `http://localhost:5173`.

#### **2. Desenvolvimento Local**

Caso prefira rodar localmente, certifique-se de ter um ambiente Node.js funcional.

```bash
# Clone o repositório
git clone https://github.com/freitaszLe/desenvolve-mt-apitus.git(https://github.com/freitaszLe/desenvolve-mt-apitus.git)

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```
A aplicação estará disponível em `http://localhost:5173` (ou outra porta, se a 5173 estiver em uso).

---

### 📝 Desafios de Ambiente e Soluções Adotadas

Durante o desenvolvimento, a configuração do ambiente apresentou desafios significativos que exigiram um diagnóstico aprofundado e a aplicação de soluções estratégicas.

1.  **Instabilidade da API Externa:** Foi constatado que os endpoints da API de teste, incluindo `/v1/login` e `/v1/pessoas/aberto/filtro`, estavam retornando erros `500 (Internal Server Error)`, o que foi validado diretamente na interface do Swagger fornecida.

    * **Solução:** Para permitir o desenvolvimento ininterrupto da interface e a entrega de todas as funcionalidades visuais requeridas, foi implementado um **serviço de mock** (`api.mock.ts`) de alta fidelidade. Este serviço simula as respostas da API, incluindo paginação e filtros, permitindo o desenvolvimento completo da UI. O código original que consome a API real (`api.ts`) foi mantido no projeto para demonstrar a implementação correta.

Esses desafios foram cruciais para demonstrar habilidades de diagnóstico de problemas, resiliência e tomada de decisão estratégica focada na entrega de valor.

---
### Dados do Candidato

* **Nome:** Leticia Arruda de Freitas
* **Email:** le.freitas712@exemplo.com
* **Telefone:** (65) 99226-6260
