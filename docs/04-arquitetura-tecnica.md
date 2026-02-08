# Arquitetura Técnica - b.organizze

Este documento descreve a arquitetura técnica, estrutura de pastas e componentes do projeto.

---

## 🌗 Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLIENTE (Browser)                            │
│  HTML5 + CSS (Tailwind) + JavaScript (Vanilla/React/Next.js)  │
│  - index.html (Login)                                           │
│  - dashboard.html (Painel Principal)                           │
│  - accounts.html, transactions.html, etc.                      │
│  - assets/css/, assets/js/                                     │
└────────────────────────────┬──────────────────────────────────┘
                             │ HTTPS/API Calls
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                   VERCEL (Edge Network)                         │
│  - Serve arquivos HTML/CSS/JS                                  │
│  - Proxy para Supabase API                                     │
│  - GitHub Actions Deploy                                       │
└────────────────────────────┬──────────────────────────────────┘
                             │ HTTPS REST API
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                     SUPABASE (Backend)                          │
│  ┌──────────────────┐  ┌──────────────────┐                   │
│  │  Auth Service    │  │  PostgreSQL DB   │                   │
│  │  - JWT Tokens    │  │  - 5+ tabelas    │                   │
│  │  - Users         │  │  - RLS Security  │                   │
│  │  - Passwords     │  │  - pg_vector     │                   │
│  └──────────────────┘  └──────────────────┘                   │
│                                                                │
│  ┌──────────────────┐  ┌──────────────────┐                   │
│  │  Edge Functions  │  │  Storage Service │                   │
│  │  - Node.js APIs  │  │  - Comprovantes  │                   │
│  │  - Automações    │  │  - Documentos    │                   │
│  └──────────────────┘  └──────────────────┘                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Estrutura de Pastas

```
b.organizze/
│
├── README.md                          # Descrição do projeto
├── .gitignore                         # Arquivo Git ignore
├── package.json                       # Dependências (se usar Node)
├── vercel.json                        # Config Vercel
│
├── docs/                              # 📚 Documentação
│   ├── 01-escopo-inicial.md          # Escopo completo (14 módulos)
│   ├── 02-visao-geral-produto.md     # Visão geral, público-alvo
│   ├── 03-modulos-e-fases.md         # Roadmap MVP/V1/V2/V3+
│   ├── 04-arquitetura-tecnica.md     # Este arquivo
│   └── prompt-retomada.md             # Prompt para continuar
│
├── src/                               # 💻 Código Fonte
│   ├── index.html                     # Página de login
│   ├── dashboard.html                 # Dashboard principal
│   ├── accounts.html                  # Gerenciar contas
│   ├── transactions.html              # Lançamentos
│   ├── categories.html                # Categorias
│   ├── settings.html                  # Configurações
│   │
│   ├── css/                           # 🎨 Estilos
│   │   ├── main.css                  # Estilos globais
│   │   ├── components.css             # Componentes reutilizáveis
│   │   ├── layout.css                 # Grid, flexbox
│   │   ├── responsive.css             # Media queries
│   │   └── tailwind.config.js         # Config Tailwind (se usar)
│   │
│   ├── js/                            # 🚀 JavaScript
│   │   ├── app.js                     # Entry point / inicialização
│   │   ├── auth.js                    # Autenticação Supabase
│   │   ├── api.js                     # Chamadas API/Supabase
│   │   ├── db.js                      # Inicialização Supabase client
│   │   ├── utils.js                   # Funções utilitárias
│   │   ├── charts.js                  # Biblioteca gráficos
│   │   │
│   │   ├── modules/                   # Módulos por feature
│   │   │   ├── accounts/
│   │   │   │   └── accounts.js        # Lógica de contas
│   │   │   ├── transactions/
│   │   │   │   └── transactions.js    # Lógica de lançamentos
│   │   │   ├── categories/
│   │   │   │   └── categories.js
│   │   │   └── dashboard/
│   │   │       └── dashboard.js
│   │   │
│   │   └── lib/                       # Bibliotecas/helpers
│   │       ├── supabase.js            # Client Supabase
│   │       ├── validators.js          # Validações
│   │       └── formatters.js          # Formatadores
│   │
│   ├── assets/                        # 🖼️ Assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   └── data/                          # 📊 Dados padrão
│       ├── categories.json            # Categorias padrão
│       ├── cost-centers.json          # Centros de custo padrão
│       └── seed-data.sql              # SQL para popular banco
│
├── supabase/                          # 🔐 Configurações Supabase
│   ├── migrations/                    # Migrações SQL
│   │   ├── 001_initial_schema.sql    # Schema inicial (MVP)
│   │   ├── 002_add_budgets.sql       # Orçamentos (V1)
│   │   └── ...
│   │
│   ├── functions/                     # Edge Functions
│   │   ├── import-csv.ts             # Import CSV
│   │   ├── send-alerts.ts            # Enviar alertas
│   │   └── ...
│   │
│   └── rls/                           # Row Level Security policies
│       └── policies.sql               # Policies de acesso
│
├── tests/                             # ✅ Testes (pós-MVP)
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .github/                           # 🐙 GitHub
│   ├── workflows/
│   │   ├── deploy.yml                # Deploy para Vercel
│   │   ├── test.yml                  # Executar testes
│   │   └── lint.yml                  # Lint/format
│   └── ISSUE_TEMPLATE/
│
└── .env.example                       # Variáveis de ambiente exemplo
```

---

## 🔌 Tecnologias & Dependências (MVP)

### Frontend
- **HTML5**: Semântica moderna
- **CSS3 + Tailwind**: Styling responsivo
- **JavaScript Vanilla**: Sem framework (MVP)
- **Chart.js**: Gráficos (linhas, pizza, barras)

### Backend
- **Supabase**: PostgreSQL + Auth + Storage
- **PostgreSQL**: Banco de dados relacional
- **Row Level Security (RLS)**: Segurança de dados
- **pg_vector** (V2+): Search semântico

### DevOps
- **Vercel**: Deploy frontend
- **GitHub Actions**: CI/CD
- **Git**: Versionamento

### Opcional (V1+)
- **React/Next.js**: Para V1+, reutilizar lógica
- **TypeScript**: Type safety
- **Jest**: Testes unitários
- **Playwright**: E2E testing

---

## 🛢️ Schema do Banco de Dados (MVP)

### Tabela: `users` (Supabase Auth)
```sql
id UUID (gerado automaticamente)
email STRING (unique)
password_hash STRING
created_at TIMESTAMP
```

### Tabela: `accounts`
```sql
id UUID (PK)
user_id UUID (FK -> users)
name STRING
type ENUM (bank, digital, savings, wallet, credit)
balance DECIMAL(12,2)
currency STRING (default: 'BRL')
created_at TIMESTAMP
```

### Tabela: `categories`
```sql
id UUID (PK)
user_id UUID (FK)
name STRING
type ENUM (expense, income)
is_default BOOLEAN
created_at TIMESTAMP
```

### Tabela: `transactions`
```sql
id UUID (PK)
user_id UUID (FK)
account_id UUID (FK)
category_id UUID (FK)
amount DECIMAL(12,2)
description STRING
date DATE
type ENUM (expense, income, transfer)
status ENUM (pending, completed)
created_at TIMESTAMP
```

### Tabela: `cost_centers`
```sql
id UUID (PK)
user_id UUID (FK)
name STRING
created_at TIMESTAMP
```

---

## 🔐 Segurança & RLS Policies

- **Authentication**: Supabase Auth (JWT)
- **Row Level Security**: Usuários só veem seus próprios dados
- **HTTPS**: Todas as comunicações criptografadas
- **Env Vars**: Chaves do Supabase em `.env` (nunca versionadas)

---

## 📡 Fluxo de Dados (MVP)

```
1. Usuário acessa index.html (Vercel)
   ↓
2. HTML carrega JS (app.js, auth.js)
   ↓
3. app.js inicializa cliente Supabase
   ↓
4. auth.js valida se há JWT armazenado
   ↓
5. Se não há JWT:
      → Mostra formulário de login
      → Envia email/password para Supabase Auth
      → Recebe JWT
      → Armazena em localStorage (seguro com secure flag)
   ↓
6. Se há JWT válido:
      → Redireciona para dashboard.html
      ↓
7. dashboard.js carrega:
      → Saldos das contas (SELECT * FROM accounts WHERE user_id = $1)
      → Últimos lançamentos (SELECT * FROM transactions ...)
      ↓
8. JavaScript renderiza DOM com dados
   ↓
9. CSS (Tailwind) estiliza componentes
   ↓
10. Usuário interage (criar conta, lançamento, etc)
    ↓
11. Event listeners disparam funções em api.js
    ↓
12. api.js faz INSERT/UPDATE/DELETE no Supabase
    ↓
13. RLS valida permissões (user_id deve ser igual)
    ↓
14. Supabase atualiza banco
    ↓
15. Response volta para JS
    ↓
16. JS atualiza DOM (recarreg dados ou UI otimista)
```

---

## 🚀 Deploy & Ambiente

### Local (Desenvolvimento)
```bash
1. npm install (se necessário)
2. Configurar .env com credenciais Supabase
3. Abrir http://localhost:3000 (Python SimpleHTTPServer ou similar)
4. Browser abre arquivos HTML
```

### Produção (Vercel)
```bash
1. Push para main no GitHub
2. GitHub Actions dispara (deploy.yml)
3. Vercel detecta mudanças
4. Vercel build (se necessário: npm build)
5. Vercel deploy para https://b-organizze.vercel.app
6. Frontend servido em edge locations globais
```

---

## 📋 Checklist de Setup Inicial

- [ ] Estruturar pastas (`src/`, `docs/`, `supabase/`)
- [ ] Criar `index.html` com formulário de login
- [ ] Setup Supabase (criar projeto, DB, tabelas)
- [ ] Criar `js/db.js` (cliente Supabase)
- [ ] Criar `js/auth.js` (autenticação)
- [ ] Criar `css/main.css` (estilos base com Tailwind)
- [ ] Criar `dashboard.html` + `js/dashboard.js`
- [ ] Testar fluxo: Login → Dashboard → Criar conta
- [ ] Deploy em Vercel
- [ ] Documentar no Notion

---

**Versão do Documento**: 1.0  
**Data**: Fevereiro 2026
