# 🤖 Squadfy - AI Knowledge Management API

API REST para gerenciamento de **usuários, organizações, agentes de IA e documentos de conhecimento**, desenvolvida com **Node.js, NestJS, TypeScript e PostgreSQL**, seguindo princípios de **Clean Architecture**.

---

# 📦 Tecnologias Utilizadas

* Node.js
* NestJS
* PostgreSQL
* Drizzle ORM
* TypeScript
* JWT (Json Web Token)
* Bcrypt
* LangChain & LangGraph (Orquestração de Agentes IA)
* Groq API (Inferência de Modelos)
* Docker & Docker Compose
* Clean Architecture
* Jest (Testes)

---

# Executando com Docker

A forma recomendada de executar o projeto é utilizando **Docker**, pois ele cria todo o ambiente necessário automaticamente.

## 1. Instalar Docker

Instale o Docker Desktop:

https://www.docker.com/products/docker-desktop/

Verifique se está instalado:

```bash
docker -v
docker compose version
```

---

## 2. Subir os containers

Execute o comando na raiz do projeto:

```bash
docker compose up --build
```

Esse comando irá:

* Criar a imagem da API
* Subir o container da API
* Subir o container do PostgreSQL
* Conectar automaticamente os serviços
* Executar migrations do banco de dados

---

## 3. Acessar a API

API:

```
http://localhost:3333
```

Testar com Bruno (REST Client):

```
./bruno/squadfy/
```

---

## 4. Parar os containers

```bash
docker compose down
```

---

## 5. Resetar banco de dados

Caso queira apagar todos os dados do PostgreSQL:

```bash
docker compose down -v
```

---

# 🧱 Arquitetura do Projeto

O projeto segue **Clean Architecture**, separando responsabilidades em camadas:

```
src
│
├── domain
│   ├── entities
│   │   ├── user.entity.ts
│   │   ├── organization.entity.ts
│   │   ├── agentLog.entity.ts
│   │   └── knowledgeDocument.entity.ts
│   │
│   └── repositories (interfaces)
│
├── application
│   ├── dto (Data Transfer Objects)
│   │   ├── auth/
│   │   ├── user/
│   │   ├── organization/
│   │   ├── agent/
│   │   └── knowledgeDocument/
│   │
│   └── useCases
│       ├── auth/
│       ├── user/
│       ├── organization/
│       ├── agent/
│       └── knowledgeDocument/
│
├── infra
│   ├── database
│   │   ├── connection.ts
│   │   ├── seed.ts
│   │   ├── migrations/
│   │   └── schema/
│   │
│   ├── repositories (implementações concretas)
│   │   ├── user.repository.ts
│   │   ├── organization.repository.ts
│   │   ├── agentLog.repository.ts
│   │   └── knowledge.repository.ts
│   │
│   └── auth
│       ├── jwt.strategy.ts
│       ├── jwt-auth.guard.ts
│       └── currentUser.decorator.ts
│
├── modules (NestJS Modules)
│   ├── auth/
│   ├── user/
│   ├── organization/
│   ├── agent/
│   └── knowledgeDocument/
│
├── agents (Orquestração de IA)
│   ├── graphs/
│   │   └── knowledgeAgent.graph.ts
│   │
│   ├── nodes/
│   │   ├── classifyQuestion.node.ts
│   │   ├── retrieveContext.node.ts
│   │   └── generateResponse.node.ts
│   │
│   ├── prompts/
│   │   ├── classify.prompt.ts
│   │   └── response.prompt.ts
│   │
│   ├── providers/
│   │   ├── GroqProvider.ts
│   │   └── interfaces/
│   │       └── ILLMProvider.ts
│   │
│   └── state/
│       └── agent.state.ts
│
├── app.module.ts
└── main.ts
```

### 📁 Domain

Contém as entidades e interfaces de repositórios - representa as regras de negócio.

### 📁 Application

Contém os DTOs (Data Transfer Objects) e casos de uso (use cases) da aplicação.

### 📁 Infra

Contém implementações concretas de repositórios, configuração de banco de dados e estratégias de autenticação.

### 📁 Modules

Módulos NestJS que organizam controllers, services e providers.

### 📁 Agents

Lógica de orquestração de agentes de IA usando LangGraph para processar conhecimento e responder consultas.

---

# 📊 Modelos do Banco

## 👤 User

```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "password": "string (hash)",
  "organization_id": "uuid",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

---

## 🏢 Organization

```json
{
  "id": "uuid",
  "name": "string",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

---

## 📄 Knowledge Document

```json
{
  "id": "uuid",
  "title": "string",
  "content": "text",
  "organization_id": "uuid",
  "created_by": "uuid (user_id)",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

---

## 🤖 Agent Log

```json
{
  "id": "uuid",
  "user_id": "uuid",
  "question": "string",
  "response": "string",
  "model_used": "string",
  "tokens_used": "number",
  "created_at": "timestamp"
}
```

---

# 🔐 Autenticação

A autenticação é feita com **JWT**.

Após o login o usuário recebe um **token** que deve ser enviado no header:

```
Authorization: Bearer TOKEN
```

O token é válido por um período configurável e contém informações do usuário.

---

# 📡 Endpoints da API

---

# 👤 Autenticação

## Registrar usuário

**POST**

```
/api/auth/register
```

### Body

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123456",
  "organization_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

### Resposta

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@email.com"
  }
}
```

---

## Login

**POST**

```
/api/auth/login
```

### Body

```json
{
  "email": "joao@email.com",
  "password": "senha123456"
}
```

### Resposta

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@email.com"
  }
}
```

---

# 🏢 Organizações

## Criar organização

**POST**

```
/api/organizations
```

### Headers

```
Authorization: Bearer TOKEN
```

### Body

```json
{
  "name": "Tech Company",
  "description": "Uma empresa de tecnologia"
}
```

---

## Listar organizações

**GET**

```
/api/organizations
```

### Headers

```
Authorization: Bearer TOKEN
```

---

# 📄 Documentos de Conhecimento

## Criar documento

**POST**

```
/api/knowledge-documents
```

### Headers

```
Authorization: Bearer TOKEN
```

### Body

```json
{
  "title": "Guia de Onboarding",
  "content": "Conteúdo do documento...",
  "organization_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

---

## Listar documentos

**GET**

```
/api/knowledge-documents
```

### Headers

```
Authorization: Bearer TOKEN
```

### Filtros

```
/knowledge-documents?organization_id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

---

## Obter documento por ID

**GET**

```
/api/knowledge-documents/:id
```

### Headers

```
Authorization: Bearer TOKEN
```

---

# 🤖 Agentes de IA

## Consultar agente de conhecimento

**POST**

```
/api/agents/query
```

### Headers

```
Authorization: Bearer TOKEN
```

### Body

```json
{
  "question": "Qual é o processo de onboarding?",
  "organization_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

### Resposta

```json
{
  "response": "O processo de onboarding inclui...",
  "agent_log_id": "uuid",
  "tokens_used": 150,
  "model_used": "groq/mixtral-8x7b"
}
```

---

# 📋 Logs de Agente

## Listar logs

**GET**

```
/api/agent-logs
```

## Obter logs por id

**GET**

```
/api/agent-logs/:id
```

### Headers

```
Authorization: Bearer TOKEN
```

---

# ⚙️ Instalação do Projeto

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/theanderson1/Squadfy
```

---

## 2️⃣ Entrar na pasta

```bash
cd squadfy
```

---

## 3️⃣ Instalar dependências

```bash
npm install
```

ou

```bash
yarn install
```

---

# 🔧 Configuração

Criar um arquivo `.env` na raiz do projeto:

```env
# Base
PORT=3333
NODE_ENV=development

# Database
DATABASE_URL=postgresql://postgres:admin@localhost:5432/knowledge_db

# JWT
JWT_SECRET=sua_chave_secreta_super_segura

# Groq API (para IA)
GROQ_API_KEY=sua_chave_do_groq
```

---

# ▶️ Executar o projeto

## Desenvolvimento

```bash
npm run dev
```

Servidor rodando em:

```
http://localhost:3333
```

## Build

```bash
npm run build
```

## Testes

```bash
npm run test
```

## Migrations do Banco

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

---

# 🧪 Testando a API

Você pode usar:

* Bruno (cliente REST - recomendado para este projeto)
* Postman
* Insomnia
* cURL
* Thunder Client (VSCode)

As requests já estão organizadas em:

```
./bruno/squadfy/
```

---

# 🚀 Recursos Principais

✅ **Autenticação JWT** - Login seguro com tokens

✅ **Orquestração de Agentes IA** - Usa LangGraph para processar fluxos complexos

✅ **Modelo de Linguagem** - Integração com Groq para inferência rápida

✅ **Gestão de Documentos** - CRUD completo para documentos de conhecimento

✅ **Histórico de Consultas** - Log de todas as interações com agentes

✅ **Clean Architecture** - Código bem estruturado e testável

✅ **Containerização** - Docker para ambiente consistente

---

# 📚 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor em modo desenvolvimento |
| `npm run build` | Compila o TypeScript |
| `npm run test` | Executa os testes |
| `npm run db:generate` | Gera migrations do Drizzle |
| `npm run db:migrate` | Aplica migrations ao banco |
| `npm run db:seed` | Popula banco com dados iniciais |

---

# 🐛 Solução de Problemas

### A API não consegue conectar ao banco de dados

Verifique se o PostgreSQL está rodando:

```bash
docker ps
```

Se não estiver, execute:

```bash
docker compose up postgres -d
```

### Erro de migração do banco

Resete o banco:

```bash
docker compose down -v
docker compose up --build
```

### Erro ao rodar testes

Limpe o cache do Jest:

```bash
npm run test -- --clearCache
```

---

# 📖 Documentação Adicional

- [NestJS Docs](https://docs.nestjs.com/)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [LangChain Docs](https://js.langchain.com/)
- [Groq API Docs](https://console.groq.com/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

# 👨‍💻 Autor

Desenvolvido por **Anderson Willians Guedes Oliveira**
