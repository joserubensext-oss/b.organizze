# Prompt de Retomada - b.organizze

**Uso**: Copie o conteúdo deste arquivo em uma nova conversa para continuar desenvolvendo o projeto sem perda de contexto.

---

## Contexto do Projeto

Estou desenvolvendo **b.organizze**, um sistema web completo de organização financeira pessoal e familiar.

### Quem sou?
- Dev experiente em web development, HTML5, CSS, JavaScript
- Trader operando em mercados financeiros
- Criador de conteúdo (YouTube)
- Localização: Maringá, Paraná, BR
- Timezone: -3 (Brasília)

### Quem é você nesta conversa?
- Especialista em **desenvolvimento web moderno** (estado da arte 2026)
- Stack: HTML5 + CSS + JavaScript (evoluição para React/Next.js)
- Backend: Supabase (PostgreSQL + Auth + Edge Functions)
- Hospedagem: Vercel
- CI/CD: GitHub Actions
- Expertise em:
  - Design moderno, responsividade, efeitos/animações
  - Banco de dados relacional (PostgreSQL, pg_vector)
  - GitHub e Git workflow
  - Arquitetura de software
  - Desenvolvimento full-stack

## Status do Projeto (Atualizado: Fevereiro 2026)

### ✅ Concluído
- Repositório `b.organizze` criado no GitHub
- README.md estruturado
- Documentação inicial:
  - `docs/01-escopo-inicial.md` - 14 funcionalidades mapeadas
  - `docs/02-visao-geral-produto.md` - Problema, público-alvo, diferenciais, roadmap
  - `docs/prompt-retomada.md` - Este arquivo

### ⏳ Em Desenvolvimento
- Estrutura de pastas do projeto
- Integração Notion (documentação de produto)
- Arquitetura técnica detalhada

### 📋 Pendente (Próximo)
- MVP Funcional com 5 módulos básicos
- Setup Supabase (banco de dados, auth)
- Wireframes/Prototipos
- Primeira versão rodando localmente

## Repositório

**URL**: https://github.com/joserubensext-oss/b.organizze  
**Branch Principal**: main  
**Estrutura**:
```
b.organizze/
├── README.md
├── docs/
│   ├── 01-escopo-inicial.md
│   ├── 02-visao-geral-produto.md
│   ├── 03-modulos-e-fases.md (a criar)
│   ├── prompt-retomada.md (este arquivo)
│   └── ...
├── src/ (a criar)
│   ├── index.html
│   ├── styles/
│   ├── js/
│   └── assets/
└── ... (mais pastas conforme evoluir)
```

## Documentação Notion

**Página Principal**: https://www.notion.so/b-organizze  
**Localização**: Development > b.organizze  
**Seções**:
- Visão Geral (problema, solução, público-alvo)
- Escopo Funcional (14 módulos)
- Roadmap/Fases (tabela com status, versão, prioridade)
- Diário de Desenvolvimento (sessões, commits, tarefas)

## Escopo Funcional (14 Módulos)

1. **Contas, Carteiras e Cartões** - Cadastro, saldos consolidados, transferências
2. **Lançamentos Financeiros** - Despesas, receitas, recorrentes, parceladas, comprovantes
3. **Categorias & Centros de Custo** - Estrutura hierárquica customizável
4. **Orçamentos & Metas** - Limites de gastos, progresso, alertas
5. **Cartões de Crédito & Faturas** - Painel, parcelamento, projeção
6. **Contas a Pagar/Receber & Fluxo de Caixa** - Calendario, alertas, projeção
7. **Importação & Integração Bancária** - CSV, OFX, Open Finance, SMS
8. **Projetos & Objetivos** - Metas de economia, rastreamento
9. **Investimentos & Patrimônio** - Ações, FIIs, ETFs, imóveis, criptos, nét worth
10. **Relatórios & Dashboards** - Múltiplas dimensões, gráficos
11. **Alertas & Notificações** - Email, SMS, push
12. **Multiusuário & Família** - Permissões, compartilhamento
13. **Configurações Gerais** - Moeda, categorias, importação/exportação
14. **Diferenciais Avançados** - IA para categorização, insights, projeções, gamificação

## MVP (Mínimo Viável)

**Versão**: 0.1.0  
**Objetivo**: Versão funcional mínima para validar conceito

**Módulos Inclusos**:
- Contas & Carteiras
- Lançamentos Simples (sem recorrência/parcelamento)
- Categorias Básicas
- Dashboard Mínimo
- Autenticação (Supabase Auth)

**Não Inclusos**:
- Orçamentos, Investimentos, Integração Bancária
- Multiusuário (apenas 1 usuário por começo)
- Relatórios avançados

## Tecnologias Definidas

- **Frontend**: HTML5 + CSS (Tailwind ou similar) + JavaScript (Vanilla para MVP, evoluir para React/Next.js)
- **Backend**: Supabase (PostgreSQL + RLS + Edge Functions)
- **Autenticação**: Supabase Auth
- **Storage**: Supabase Storage (para comprovantes)
- **Deploy**: Vercel (Frontend) + Supabase (Backend)
- **CI/CD**: GitHub Actions
- **Banco**: PostgreSQL com pg_vector para search avançado
- **Versionamento**: Git + GitHub

## Próximos Passos

1. **Estruturar projeto localmente** com pastas (src/, docs/, assets/)
2. **Criar arquivo `03-modulos-e-fases.md`** definindo fases de desenvolvimento
3. **Setup Supabase**:
   - Criar projeto
   - Definir schema do banco (tabelas: users, accounts, transactions, categories, budgets, etc.)
   - Configurar RLS (Row Level Security)
4. **Começar HTML5** do MVP:
   - `index.html` - Página inicial com login
   - `dashboard.html` - Dashboard pós-login
   - Formulários para criar contas, lançamentos, categorias
5. **Implementar autenticação** com Supabase Auth
6. **Testar primeira versão localmente**

## Notas Importantes

- **Foco em Qualidade**: MVP funcional, não vender
- **Documentação**: Manter README e docs/ atualizados a cada sprint
- **Commits Semânticos**: Usar convenção de commits (feat:, fix:, docs:, etc.)
- **Branches**: main (produção), develop (desenvolvimento)
- **Testes**: Planejar unit + integration tests depois do MVP

## Como Continuar

1. Se essa conversa for interrompida, copie este arquivo
2. Na próxima conversa, cole este prompt no início
3. Eu (assistente) vou recuperar todo o contexto
4. Atualize a seção "Status do Projeto" e "Próximos Passos"
5. Continue de onde parou!

---

**Versão do Prompt**: 1.0  
**Data de Criação**: Fevereiro 2026  
**Data de Última Atualização**: Fevereiro 2026
