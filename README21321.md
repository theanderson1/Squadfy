# Multi-Tenant AI Knowledge Agent

Plataforma multi-tenant de gerenciamento de conhecimento corporativo com IA utilizando Node.js, Express, PostgreSQL, Drizzle ORM, JWT, LangGraph e TypeScript strict mode com Clean Architecture.

O sistema permite que organizações cadastrem documentos internos e consultem essas informações através de um agente de IA seguro, auditável e isolado por tenant.

## Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **NestJS** - Framework web progressivo com TypeScript
- **TypeScript 6.0.3** - Linguagem com tipagem estrita
- **PostgreSQL 16** - Banco de dados relacional
- **Drizzle ORM 0.45.2** - ORM seguro e type-safe

### Autenticação & Segurança
- **JWT (jsonwebtoken)** - Token-based authentication
- **Bcrypt** - Hash de senhas

### IA & LLM
- **LangGraph 1.3.0** - Framework para agentic AI
- **LangChain Core 1.1.46** - Utilities para LLM
- **Groq** - LLM gratuito (Llama 3.3 70B)

### Testes
- **Jest** - Framework de testes rápido
- **@nestjs/testing** - Utilitários de teste para NestJS

---

## Arquitetura

O projeto segue **Clean Architecture** com separação clara de responsabilidades:

```
src
│
├── agents/                    # Camada de Agentes IA
│   ├── graphs/               # Grafos do LangGraph
│   │   └── knowledgeAgent.graph.ts
│   ├── nodes/                # Nós do fluxo de decisão
│   │   ├── classifyQuestion.node.ts
│   │   ├── generateResponse.node.ts
│   │   └── retrieveContext.node.ts
│   ├── prompts/              # Templates de prompts
│   │   ├── classify.prompt.ts
│   │   └── response.prompt.ts
│   ├── providers/            # Provedores de LLM
│   │   ├── GroqProvider.ts
│   │   └── interfaces/
│   │       └── ILLMProvider.ts
│   └── state/                # Estados do agente
│       └── agent.state.ts
│
├── application/              # Camada de Aplicação
│   ├── dto/                  # Data Transfer Objects
│   │   ├── agent/
│   │   │   └── queryAgent.dto.ts
│   │   ├── agentLog/
│   │   │   └── createAgentLog.dto.ts
│   │   ├── auth/
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── knowledgeDocument/
│   │   │   └── createKnowledge.dto.ts
│   │   └── organization/
│   │       └── createOrganization.dto.ts
│   └── useCases/             # Lógica de negócio
│       ├── agent/
│       ├── agentLog/
│       ├── auth/
│       ├── knowledgeDocument/
│       └── organization/
│
├── domain/                   # Camada de Domínio
│   ├── entities/             # Entidades de negócio
│   │   ├── agentLog.entity.ts
│   │   ├── knowledgeDocument.entity.ts
│   │   ├── organization.entity.ts
│   │   └── user.entity.ts
│   └── repositories/         # Interfaces de repositório
│       ├── agentLogRepository.interface.ts
│       ├── knowledgeRepository.interface.ts
│       ├── organizationRepository.interface.ts
│       └── userRepository.interface.ts
│
├── infra/                    # Camada de Infraestrutura
│   ├── auth/                 # Autenticação JWT
│   │   ├── currentUser.decorator.ts
│   │   ├── jwt-auth.guard.ts
│   │   └── jwt.strategy.ts
│   ├── database/             # Banco de dados
│   │   ├── connection.ts
│   │   ├── seed.ts
│   │   ├── migrations/
│   │   └── schema/
│   └── repositories/         # Implementações de repositório
│       ├── agentLog.repository.ts
│       ├── knowledge.repository.ts
│       ├── organization.repository.ts
│       └── user.repository.ts
│
├── modules/                  # Módulos NestJS
│   ├── agent/
│   │   ├── agent.controller.ts
│   │   └── agent.module.ts
│   ├── agentLog/
│   │   ├── agentLog.controller.ts
│   │   └── agentLog.module.ts
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   └── auth.module.ts
│   ├── knowledgeDocument/
│   │   ├── knowledge-document.controller.ts
│   │   └── knowledge-document.module.ts
│   └── organization/
│       ├── organization.controller.ts
│       └── organization.module.ts
│
├── tests/                    # Testes automatizados
│   ├── factories/            # Mocks e factories
│   │   └── knowledge-document.factory.ts
│   └── unit/                 # Testes unitários
│       ├── agents/
│       └── use-cases/
│
├── @types/                   # Type definitions customizadas
│   └── express/
│       └── index.d.ts
│
├── app.module.ts             # Módulo raiz
└── main.ts                   # Entry point
```

---

## O que foi Implementado

### Multi-Tenancy
- Isolamento completo de dados por organização
- Todas as queries utilizam `organizationId`
- Nenhuma empresa acessa documentos da outra
- Segurança garantida em nível de aplicação e banco de dados

### Autenticação & Autorização
- Registro de usuários com `organizationId`
- Login com JWT Bearer Token
- Middleware de autenticação
- Bcrypt para hash de senhas
- Role-based access control

### Gerenciamento de Documentos
- Criar documentos com visibilidade (PUBLIC, INTERNAL, RESTRICTED)
- Listar documentos da organização
- Buscar documento por ID
- Isolamento de documentos por tenant

### Agente de IA (LangGraph)
- Fluxo de 3 nós:
  1. **retrieveContextNode** - Recupera documentos relevantes
  2. **classifyQuestionNode** - Classifica respostas e valida visibilidade
  3. **generateResponseNode** - Gera resposta com LLM (Groq)

### Segurança & Anti-Hallucination
- Agente **nunca inventa** respostas
- Agente **nunca usa** conhecimento externo
- Agente **responde apenas** com documentos cadastrados
- Documentos RESTRICTED nunca são expostos ao LLM
- Decisões de segurança: ANSWERED, RESTRICTED, INSUFFICIENT_CONTEXT

### Testes Unitários
- Testes de isolamento multi-tenant
- Testes de restrição de documentos
- Testes de contexto insuficiente
- Testes de visibilidade
- In-Memory Repository para testes sem BD

---

## Estrutura do Banco de Dados

### Organizations
```sql
id (UUID, PK)
name (text)
createdAt (timestamp)
```

### Users
```sql
id (UUID, PK)
organizationId (UUID, FK → organizations)
name (text)
email (text, UNIQUE)
password (text, bcrypt)
role (text)
createdAt (timestamp)
```

### Knowledge Documents
```sql
id (UUID, PK)
organizationId (UUID, FK → organizations)
title (text)
content (text)
visibility (enum: PUBLIC, INTERNAL, RESTRICTED)
createdAt (timestamp)
```

---

## Endpoints da API

### Organizations

#### Criar Organização
```http
POST /api/organizations
Content-Type: application/json

{
  "name": "Acme Corp"
}
```

**Response (201):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Acme Corp",
  "createdAt": "2026-05-13T10:00:00Z"
}
```

---

### Auth

#### Register - Criar Novo Usuário
```http
POST /api/auth/register
Content-Type: application/json

{
  "organizationId": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Anderson Willians",
  "email": "anderson@email.com",
  "password": "123456"
}
```

**Response (201):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "organizationId": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Anderson Willians",
  "email": "anderson@email.com",
  "role": "user",
  "createdAt": "2026-05-13T10:00:00Z"
}
```

#### Login - Obter JWT Token
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "anderson@email.com",
  "password": "123456"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "organizationId": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Anderson Willians",
    "email": "anderson@email.com",
    "role": "user"
  }
}
```

---

### Knowledge Documents

**⚠️ Todas as rotas requerem autenticação com JWT Bearer Token**

#### Criar Documento
```http
POST /api/knowledge
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Política de Férias",
  "content": "O colaborador pode vender até 10 dias de férias por ano.",
  "visibility": "PUBLIC"
}
```

**Response (201):**
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "organizationId": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Política de Férias",
  "content": "O colaborador pode vender até 10 dias de férias por ano.",
  "visibility": "PUBLIC",
  "createdAt": "2026-05-13T10:00:00Z"
}
```

#### Listar Documentos da Organização
```http
GET /api/knowledge
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
```json
[
  {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "organizationId": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Política de Férias",
    "content": "O colaborador pode vender até 10 dias de férias por ano.",
    "visibility": "PUBLIC",
    "createdAt": "2026-05-13T10:00:00Z"
  }
]
```

#### Buscar Documento por ID
```http
GET /api/knowledge/770e8400-e29b-41d4-a716-446655440002
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "organizationId": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Política de Férias",
  "content": "O colaborador pode vender até 10 dias de férias por ano.",
  "visibility": "PUBLIC",
  "createdAt": "2026-05-13T10:00:00Z"
}
```

---

### AI Agent

** Requer autenticação com JWT Bearer Token**

#### Consultar Agente
```http
POST /api/agent/query
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "question": "Quantos dias de férias posso vender?"
}
```

**Response (200) - ANSWERED:**
```json
{
  "decision": "ANSWERED",
  "answer": "O colaborador pode vender até 10 dias de férias por ano.",
  "context": [
    {
      "id": "770e8400-e29b-41d4-a716-446655440002",
      "title": "Política de Férias",
      "relevance": 0.95
    }
  ]
}
```

**Response (200) - RESTRICTED:**
```json
{
  "decision": "RESTRICTED",
  "answer": "Essa informação possui acesso restrito.",
  "reason": "Document visibility is RESTRICTED"
}
```

**Response (200) - INSUFFICIENT_CONTEXT:**
```json
{
  "decision": "INSUFFICIENT_CONTEXT",
  "answer": "Não encontrei informações suficientes para responder sua pergunta.",
  "reason": "No relevant documents found"
}
```

---

## Instruções de Execução Local

### Pré-requisitos

- Node.js 18+
- Docker & Docker Compose
- Git

### 1️⃣ Clonar Projeto

```bash
git clone https://github.com/theanderson1/squadfy.git
cd Squadfy
```

### 2️⃣ Instalar Dependências

```bash
npm install
```

### 3️⃣ Configurar Variáveis de Ambiente

Criar arquivo `.env` na raiz do projeto:

```bash
# Server
PORT=3333
NODE_ENV=development

# Database
DATABASE_URL=postgresql://postgres:admin@localhost:5432/knowledge_db

# JWT
JWT_SECRET=your_super_secret_key_here_change_in_production
JWT_EXPIRES_IN=1d

# Groq API (obtenha em https://console.groq.com/)
GROQ_API_KEY=your_groq_api_key_here
```

### 4️⃣ Iniciar Banco de Dados com Docker

```bash
docker compose up -d
```

Isso vai:
- Criar container do PostgreSQL
- Criar banco `knowledge_db`
- Iniciar API em porta 3333

### 5️⃣ Executar Migrations Dentro do Container

```bash
npm run db:migrate
```

### 6️⃣ (Opcional) Seedar Banco com Dados de Teste

```bash
npm run db:seed
```

### 7️⃣ Iniciar Aplicação em Modo Desenvolvimento

```bash
npm run dev
```

A API estará disponível em: **http://localhost:3333**

---

## Testes

### Estrutura de Testes

```
tests/
├── factories/                # Factories para criar dados de teste
│   └── knowledge-document.factory.ts
└── unit/                     # Testes unitários
    ├── agents/               # Testes dos agentes IA
    └── use-cases/            # Testes dos casos de uso
```

### Executar Testes (Jest + NestJS)

```bash
# Rodar testes uma vez
npm run test

# Rodar testes em modo watch
npm run test:watch

# Cobertura de testes
npm run test:cov

# Rodar teste específico
npm run test -- [nome-do-arquivo]
```

### Casos de Teste Implementados

#### ✅ Multi-Tenant Isolation
- Verifica que documentos de uma organização **nunca** são acessíveis por outra
- Garante isolamento de dados em nível de aplicação
- Testa validação de `organizationId` em todas as operações

#### ✅ Document Visibility (RESTRICTED)
- Verifica que documentos com visibilidade `RESTRICTED` nunca são expostos ao LLM
- Agente retorna decisão `RESTRICTED` automaticamente
- Testa filtragem de documentos sensíveis no nó de classificação

#### ✅ Anti-Hallucination (INSUFFICIENT_CONTEXT)
- Verifica que agente **nunca inventa** respostas
- Quando não há documentos relevantes, retorna `INSUFFICIENT_CONTEXT`
- Garante que respostas só são geradas com contexto suficiente

#### ✅ Query Agent Use Case
- Testa fluxo completo de query do agente
- Valida retorno de respostas seguras
- Verifica integração com LangGraph

#### ✅ Restricted Node
- Testa validação de visibilidade no nó de classificação
- Garante que documentos restritos são filtrados corretamente
- Valida regras de acesso por nível de visibilidade

#### ✅ Knowledge Document Management
- Testes de criação de documentos
- Testes de listagem isolada por tenant
- Testes de busca por ID com validação de acesso

#### ✅ User Authentication
- Testes de registro de usuários
- Testes de login com JWT
- Testes de validação de credenciais

---

##  Desenvolvido com

- TypeScript strict mode
- NestJS com módulos isolados
- LangGraph para IA
- Jest + @nestjs/testing para testes
- Segurança multi-tenant
- Clean Architecture
- Testes automatizados

---

# 👨‍💻 Autor

Desenvolvido por **Anderson Willians Guedes Oliveira**
