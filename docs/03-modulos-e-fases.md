# Módulos e Fases de Desenvolvimento - b.organizze

Este documento detalha como os 14 módulos são distribuídos nas fases de desenvolvimento (MVP, V1, V2, V3+).

---

## 📊 Matriz de Módulos por Fase

| # | Módulo | MVP | V1 | V2 | V3+ | Dependências |
|---|--------|-----|----|----|-----|---------------|
| 1 | Contas, Carteiras e Cartões | ✅ | ✅ | ✅ | ✅ | - |
| 2 | Lançamentos Financeiros | ✅ | ✅ | ✅ | ✅ | M1 |
| 3 | Categorias & Centros de Custo | ✅ | ✅ | ✅ | ✅ | M1, M2 |
| 4 | Orçamentos & Metas | ❌ | ✅ | ✅ | ✅ | M1, M3 |
| 5 | Cartões de Crédito & Faturas | ❌ | ✅ | ✅ | ✅ | M1, M2 |
| 6 | Contas a Pagar/Receber & Fluxo | ❌ | ✅ | ✅ | ✅ | M1, M2 |
| 7 | Importação & Integração Bancária | ❌ | ❌ | ✅ | ✅ | M1, M2, M3 |
| 8 | Projetos & Objetivos | ❌ | ❌ | ✅ | ✅ | M1, M2, M3 |
| 9 | Investimentos & Patrimônio | ❌ | ❌ | ✅ | ✅ | M1 |
| 10 | Relatórios & Dashboards | ✅ | ✅ | ✅ | ✅ | M1, M2, M3 |
| 11 | Alertas & Notificações | ❌ | ✅ | ✅ | ✅ | M1, M4, M5, M6 |
| 12 | Multiusuário & Família | ❌ | ❌ | ✅ | ✅ | M1, M2 |
| 13 | Configurações Gerais | ✅ | ✅ | ✅ | ✅ | - |
| 14 | Diferenciais Avançados | ❌ | ❌ | ❌ | ✅ | M2, M3, M7 |

---

## 🎯 MVP (Mínimo Viável) - Versão 0.1.0

**Objetivo**: Validar conceito com funcionalidades básicas de gestão financeira

**Timeline**: 2-3 semanas de desenvolvimento

**Módulos Inclusos**:
- **M1**: Contas, Carteiras e Cartões (CRUD básico, sem complexidade)
- **M2**: Lançamentos Financeiros (despesas e receitas simples, sem recorrência)
- **M3**: Categorias & Centros de Custo (padrão pré-definidas)
- **M10**: Relatórios & Dashboards (dashboard inicial, gráficos básicos)
- **M13**: Configurações Gerais (moeda, preferências básicas)

**Tecnologias**:
- Frontend: HTML5 + CSS + JavaScript (Vanilla)
- Backend: Supabase (PostgreSQL)
- Auth: Supabase Auth (email/password)
- Deploy: Vercel

**Tabelas do Banco de Dados (MVP)**:
```
users
  - id (UUID, PK)
  - email (string, unique)
  - created_at (timestamp)

accounts
  - id (UUID, PK)
  - user_id (UUID, FK)
  - name (string)
  - type (enum: bank, digital, savings, wallet, credit)
  - balance (decimal)
  - currency (string, default: BRL)
  - created_at (timestamp)

categories
  - id (UUID, PK)
  - user_id (UUID, FK)
  - name (string)
  - type (enum: expense, income)
  - created_at (timestamp)

transactions
  - id (UUID, PK)
  - user_id (UUID, FK)
  - account_id (UUID, FK)
  - category_id (UUID, FK)
  - amount (decimal)
  - description (string)
  - date (date)
  - type (enum: expense, income, transfer)
  - status (enum: pending, completed)
  - created_at (timestamp)

cost_centers
  - id (UUID, PK)
  - user_id (UUID, FK)
  - name (string)
  - created_at (timestamp)
```

**Features Por Módulo**:

### M1 - Contas, Carteiras e Cartões
- ✅ Cadastro de contas (nome, tipo, saldo inicial, moeda)
- ✅ Edição de contas
- ✅ Exclusão de contas
- ✅ Listagem de contas com saldos
- ✅ Transferências simples entre contas
- ❌ Cartões de crédito (adiar para V1)

### M2 - Lançamentos Financeiros
- ✅ Registrar despesa
- ✅ Registrar receita
- ✅ Editar lançamento
- ✅ Deletar lançamento
- ✅ Listar lançamentos
- ✅ Filtrar por data, conta, categoria
- ❌ Recorrências (adiar para V1)
- ❌ Parcelamento (adiar para V1)
- ❌ Comprovantes (adiar para V1)

### M3 - Categorias
- ✅ Categorias padrão pré-carregadas
- ✅ Criar categoria personalizada
- ✅ Editar categoria
- ✅ Deletar categoria
- ✅ Listar categorias
- ❌ Subcategorias (adiar para V1)

### M10 - Dashboard
- ✅ Saldo total consolidado
- ✅ Saldo por conta
- ✅ Últimos 10 lançamentos
- ✅ Resumo de despesas/receitas do mês
- ✅ Gráfico de pizza (distribuição de gastos por categoria)
- ❌ Gráficos avançados (adiar para V1)

### M13 - Configurações
- ✅ Selecionar moeda padrão
- ✅ Perfil do usuário (nome, email)
- ✅ Logout

---

## 📈 V1 (Versão 1.0) - Mínimo Produto Viável Completo

**Objetivo**: Produto completo para uso pessoal, pronto para compartilhar

**Timeline**: 4-5 semanas (após MVP)

**Módulos Novos**:
- **M4**: Orçamentos & Metas
- **M5**: Cartões de Crédito & Faturas
- **M6**: Contas a Pagar/Receber & Fluxo de Caixa
- **M11**: Alertas & Notificações (básico, email)

**Melhorias em Módulos Existentes**:
- M1: Suporte a cartões de crédito
- M2: Lançamentos recorrentes, parcelamento básico
- M10: Relatórios por período, mais gráficos

**Tabelas Novas**:
```
budgets
  - id (UUID, PK)
  - user_id (UUID, FK)
  - category_id (UUID, FK)
  - month (date)
  - limit (decimal)
  - created_at (timestamp)

credit_cards
  - id (UUID, PK)
  - user_id (UUID, FK)
  - name (string)
  - limit (decimal)
  - closing_day (int)
  - due_day (int)
  - created_at (timestamp)

recurring_transactions
  - id (UUID, PK)
  - user_id (UUID, FK)
  - template (JSON)
  - frequency (enum: daily, weekly, monthly, yearly)
  - next_date (date)
  - active (boolean)
  - created_at (timestamp)
```

---

## 🚀 V2 (Versão 2.0) - Expansão Inteligente

**Objetivo**: Adicionar automação, multiusuário e investimentos

**Timeline**: 6-8 semanas (após V1)

**Módulos Novos**:
- **M7**: Importação & Integração Bancária
- **M8**: Projetos & Objetivos
- **M9**: Investimentos & Patrimônio
- **M12**: Multiusuário & Família

**Novas Funcionalidades**:
- Sugestão automática de categorias (IA)
- Insights de gastos
- Projeção de saldo futuro
- CSV/OFX import

---

## 🌟 V3+ (Versão 3.0+) - Premium & Advanced

**Objetivo**: Funcionalidades avançadas e d iferenciais

**Módulo Novo**:
- **M14**: Diferenciais Avançados (IA, gamificação, predições)

**Novas Funcionalidades**:
- Mobile app (React Native ou Flutter)
- Integração com Open Finance
- Análises preditivas (ML)
- Método de pagamento integrado
- API pública

---

## 📝 Nota de Implementação

Para cada fase:
1. **Criar branch** `feature/fase-X`
2. **Implementar módulos** na ordem listada
3. **Testar** cada módulo
4. **Merge** para `develop` quando completo
5. **Release** para `main` quando fase está estável

---

**Versão do Documento**: 1.0  
**Data**: Fevereiro 2026
