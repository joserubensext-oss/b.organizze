# Escopo Inicial - b.organizze

## Sistema Web de Organização Financeira Pessoal e Familiar

Este documento descreve o escopo completo do projeto b.organizze, um sistema integrado para organização financeira com 14 módulos principais.

---

### 1. Contas, Carteiras e Cartões

- Cadastro de contas bancárias, contas digitais, poupança, contas em moeda estrangeira e carteiras físicas.
- Cadastro de cartões de crédito (titular e adicionais), com limite, data de fechamento e vencimento da fatura.
- Controle de saldo por conta e visão de saldo consolidado.
- Transferências entre contas e entre carteiras.

### 2. Lançamentos Financeiros

- Registro de despesas, receitas e transferências com: data, valor, conta, categoria, subcategoria, descrição, tags.
- Lançamentos recorrentes (fixos) e lançamentos parcelados com controle de todas as parcelas futuras.
- Lançamentos previstos x realizados (status pago/não pago, recebido/não recebido).
- Anexo de comprovantes (PDF, imagens) em cada lançamento.

### 3. Categorias, Subcategorias, Centros de Custo e Pessoas

- Categorias e subcategorias padrão de despesas/receitas, com possibilidade de criação e edição personalizadas.
- Centros de custo (ex.: filhos, veículos, imóveis, projetos, unidades de negócio).
- Associação de lançamentos a pessoas da família ou responsáveis (ex.: cônjuge, filhos) com visão de gastos por pessoa.

### 4. Orçamentos, Limites e Metas

- Definição de orçamento mensal por categoria e subcategoria (limite de gastos).
- Orçamento por centro de custo e por pessoa (opcional).
- Configuração de metas de despesas, receitas, economia e investimentos.
- Acompanhamento do uso do orçamento com barras de progresso e indicação de excesso de gastos.

### 5. Cartões de Crédito e Faturas

- Painel específ ico para cartões de crédito com: total da fatura atual, próximas faturas, limite utilizado e disponível.
- Controle detalhado de compras parceladas, mostrando parcelas futuras por mês e por cartão.
- Projeção do impacto das parcelas nas faturas dos próximos meses.

### 6. Contas a Pagar, Contas a Receber e Fluxo de Caixa

- Lista de contas a pagar com vencimento, valor, status e alertas de atraso.
- Lista de contas a receber (salário, vendas, recebíveis em geral).
- Calendar io financeiro com visão diária, semanal e mensal de pagamentos e recebimentos.
- Fluxo de caixa por período (entrada, saída, saldo projetado).

### 7. Importação, Integração Bancária e Automações

- Importação de extratos bancários e de cartão via OFX/CSV/planilha.
- Integração automática com bancos e cartões (open finance ou agregador) para registro automático de lançamentos.
- Importação de SMS e notificações push dos bancos (Nubank, Digio, Santander Way etc.) para criar lançamentos automaticamente.
- Tela de conciliação bancária para revisar e confirmar lançamentos importados em lote.

### 8. Projetos, Objetivos e Sonhos

- Cadastro de projetos (ex.: viagem, reforma, eventos) com orçamento próprio.
- Acompanhamento dos gastos por projeto, por categoria e total, comparado ao orçamento do projeto.
- Cadastro de objetivos/sonhos financeiros (ex.: trocar de carro, comprar casa), vinculando metas de economia e/ou contas específicas.

### 9. Investimentos e Patrimônio

- Cadastro de ativos: ações, FIIs, ETFs, CDB, LCI, LCA, Tesouro Direto, fundos, previdncia, imóveis, moedas estrangeiras, criptomoedas etc.
- Registro de operações (compra, venda, aportes, resgates, proventos).
- Acompanhamento da evolução da carteira de investimentos e do patrimônio líquido (ativos x passivos).

### 10. Relatórios, Dashboards e Gráficos

- Dashboard inicial com visão geral: saldo por conta, resumo do mês, principais categorias de gasto, situação do cartão, metas e objetivos.
- Relatórios por período (mensal, anual, customizado) segmentados por: categoria, subcategoria, conta, cartão, centro de custo, pessoa, projeto.
- Gráficos de pizza (distribuição de gastos), barras (evolução mensal de receitas/despesas) e linhas (evolução patrimonial).

### 11. Alertas, Lembretes e Notificações

- Alertas de contas a pagar e a receber próximos do vencimento.
- Notificações de orçamento estourado ou próximo do limite por categoria ou projeto.
- Notificações de metas atingidas ou atrasadas.
- Envio de lembretes por e-mail e, futuramente, push/mobile.

### 12. Multiusério, Família e Acesso

- Possibilidade de mú ltiplos usuários na mesma conta (família ou equipe pequena).
- Perfis com permissões diferenciadas (ex.: só visualizar, lançar, administrar).
- Atribuição de lançamentos a usuários/pessoas específicas para análise individual.

### 13. Configurações Gerais

- Configuração de moeda padrão e suporte a múltiplas moedas.
- Configuração de categorias padrão e personalizadas.
- Importação de dados de outros sistemas/planilhas e exportação de dados (CSV/Excel).

### 14. Diferenciais e Recursos Avançados Desejáveis

- Sugestão automática de categorias com base na descrição do lançamento.
- Insights automáticos: detectar gastos fora do padrão e sugerir economias.
- Projeção de saldo futuro considerando lançamentos previstos, faturas e parcelas.
- Gamificação leve: metas batidas, sequência de dias registrando gastos, badges de disciplina financeira.

---

**Versão**: 1.0  
**Data**: Fevereiro 2026
