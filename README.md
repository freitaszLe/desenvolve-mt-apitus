# Desafio Front-end: SPA de Consulta de Pessoas (PJC-MT)

![Badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Badge](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Badge](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Badge](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**Contexto:** Projeto desenvolvido como avaliação técnica para a vaga de Desenvolvedor Júnior.

Esta é uma Single Page Application (SPA) que consome a API da Polícia Judiciária Civil de Mato Grosso para permitir a consulta de registros de pessoas desaparecidas e localizadas, com foco em uma interface moderna, responsiva e uma excelente experiência de usuário.

---

### 🖼️ Tela Principal

![Screenshot da Tela Principal do Projeto - a definir]()

---

### ✨ Funcionalidades e Diferenciais

- [x] **Interface Responsiva:** O layout se adapta perfeitamente a diferentes tamanhos de tela.
- [x] **Estrutura em Componentes:** Aplicação totalmente componentizada (`Navbar`, `Card`, `HeroSection`, `Pagination`, etc.).
- [x] **Busca e Paginação:** Formulário funcional para filtrar os resultados por nome/status e sistema de paginação.
- [x] **Roteamento com Lazy Loading:** As rotas são carregadas sob demanda para otimizar a performance.
- [x] **Ambiente Dockerizado:** Configuração completa para desenvolvimento e entrega via contêineres Docker.
- [x] **UX Avançada (Skeleton Loading):** Implementação de "esqueletos" de interface para uma percepção de carregamento mais rápida e profissional.
- [x] **Animações com Framer Motion:** Animações de entrada para os cards e transições suaves na interface, demonstrando domínio de bibliotecas de animação modernas.

---

### 🛠️ Tecnologias e Configurações

* **Core:** React 19, TypeScript, Vite.
* **Estilização:** Tailwind CSS com um tema customizado (dark/neon).
* **Chamadas de API:** Axios (com implementação de mock service de alta fidelidade).
* **Gerenciamento de Formulários:** React Hook Form com Zod para validação de schema.
* **Roteamento:** React Router DOM.
* **Animações:** Framer Motion.
* **Qualidade de Código:** ESLint e Prettier.

---

### 🚀 Como Executar o Projeto

**Pré-requisitos:** [Node.js](https://nodejs.org/) (v20+), [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/install/).

#### **1. Rodando em Modo de Produção (Recomendado para Avaliação)**

Este método simula o ambiente final de entrega, usando a imagem Docker otimizada com Nginx.

```bash
# Clone o repositório
git clone [https://github.com/freitaszLe/desenvolve-mt-apitus.git](https://github.com/freitaszLe/desenvolve-mt-apitus.git)
cd desenvolve-mt-apitus

# Construa a imagem Docker de produção
docker build -t freitaszLe/desenvolve-mt-apitus .

# Execute o contêiner
docker run -p 8080:80 freitaszLe/desenvolve-mt-apitus
```
A aplicação estará disponível em **`http://localhost:8080`**.

#### **2. Rodando em Modo de Desenvolvimento (com Docker)**

Este método é ideal para desenvolvimento, pois espelha as alterações de código em tempo real.

```bash
# Após clonar e entrar no repositório
docker compose up --build
```
A aplicação estará disponível em **`http://localhost:5173`**.

---

### 📝 Desafios de Ambiente e Soluções Adotadas

Durante o desenvolvimento, a configuração do ambiente apresentou desafios significativos que exigiram um diagnóstico aprofundado e a aplicação de soluções estratégicas.

1.  **Instabilidade da API Externa:** Foi constatado que os endpoints da API de teste, incluindo `/v1/login` e `/v1/pessoas/aberto/filtro`, estavam retornando erros `500 (Internal Server Error)`, validados diretamente via Swagger.
    * **Solução:** Para permitir o desenvolvimento ininterrupto da interface e a entrega de todas as funcionalidades, foi implementado um **serviço de mock** (`api.mock.ts`) de alta fidelidade. O código de consumo da API real (`api.ts`) foi mantido para demonstrar a implementação correta do fluxo de autenticação e consumo de dados.

Esses desafios foram cruciais para demonstrar habilidades de diagnóstico, resiliência e tomada de decisão estratégica focada na entrega de valor.

---
### Dados da Candidata

* **Nome:** Leticia Arruda de Freitas
* **Email:** le.freitas712@gmail.com
* **Telefone:** (65) 99226-6260
