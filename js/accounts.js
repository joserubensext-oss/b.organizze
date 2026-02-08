/**
 * Accounts Manager Module
 * Handles accounts, wallets, and cards (bank accounts, credit cards, cash, investments)
 */

class AccountsManager {
    constructor() {
        this.supabase = null;
        this.accounts = [];
        this.currentAccount = null;
        this.init();
    }

    /**
     * Initialize the accounts manager
     */
    async init() {
        // Wait for Supabase client
        if (window.supabaseClient) {
            this.supabase = window.supabaseClient.getClient();
            await this.loadAccounts();
        } else {
            setTimeout(() => this.init(), 100);
        }
    }

    /**
     * Load all accounts for current user
     */
    async loadAccounts() {
        try {
            const { data: { user } } = await this.supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await this.supabase
                .from('accounts')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            this.accounts = data || [];
            return this.accounts;
        } catch (error) {
            console.error('Erro ao carregar contas:', error);
            return [];
        }
    }

    /**
     * Create a new account
     */
    async createAccount(accountData) {
        try {
            const { data: { user } } = await this.supabase.auth.getUser();
            if (!user) throw new Error('Usuário não autenticado');

            const newAccount = {
                user_id: user.id,
                name: accountData.name,
                type: accountData.type, // 'checking', 'savings', 'credit_card', 'cash', 'investment'
                balance: accountData.balance || 0,
                currency: accountData.currency || 'BRL',
                color: accountData.color || '#3b82f6',
                icon: accountData.icon || '💳',
                is_active: true,
                credit_limit: accountData.credit_limit || null,
                closing_day: accountData.closing_day || null,
                due_day: accountData.due_day || null,
                bank_name: accountData.bank_name || null,
                account_number: accountData.account_number || null
            };

            const { data, error } = await this.supabase
                .from('accounts')
                .insert([newAccount])
                .select()
                .single();

            if (error) throw error;

            this.accounts.unshift(data);
            this.showNotification('✅ Conta criada com sucesso!', 'success');
            return { success: true, data };
        } catch (error) {
            console.error('Erro ao criar conta:', error);
            this.showNotification(`❌ Erro ao criar conta: ${error.message}`, 'error');
            return { success: false, error };
        }
    }

    /**
     * Update an existing account
     */
    async updateAccount(accountId, updates) {
        try {
            const { data, error } = await this.supabase
                .from('accounts')
                .update(updates)
                .eq('id', accountId)
                .select()
                .single();

            if (error) throw error;

            // Update local array
            const index = this.accounts.findIndex(acc => acc.id === accountId);
            if (index !== -1) {
                this.accounts[index] = data;
            }

            this.showNotification('✅ Conta atualizada com sucesso!', 'success');
            return { success: true, data };
        } catch (error) {
            console.error('Erro ao atualizar conta:', error);
            this.showNotification(`❌ Erro ao atualizar conta: ${error.message}`, 'error');
            return { success: false, error };
        }
    }

    /**
     * Delete an account (soft delete - mark as inactive)
     */
    async deleteAccount(accountId) {
        try {
            const { error } = await this.supabase
                .from('accounts')
                .update({ is_active: false })
                .eq('id', accountId);

            if (error) throw error;

            // Remove from local array
            this.accounts = this.accounts.filter(acc => acc.id !== accountId);

            this.showNotification('✅ Conta removida com sucesso!', 'success');
            return { success: true };
        } catch (error) {
            console.error('Erro ao deletar conta:', error);
            this.showNotification(`❌ Erro ao deletar conta: ${error.message}`, 'error');
            return { success: false, error };
        }
    }

    /**
     * Get account by ID
     */
    getAccountById(accountId) {
        return this.accounts.find(acc => acc.id === accountId);
    }

    /**
     * Get accounts by type
     */
    getAccountsByType(type) {
        return this.accounts.filter(acc => acc.type === type);
    }

    /**
     * Calculate total balance
     */
    getTotalBalance() {
        return this.accounts.reduce((total, acc) => {
            if (acc.type === 'credit_card') {
                return total - Math.abs(acc.balance);
            }
            return total + acc.balance;
        }, 0);
    }

    /**
     * Calculate balance by type
     */
    getBalanceByType(type) {
        return this.accounts
            .filter(acc => acc.type === type)
            .reduce((total, acc) => total + acc.balance, 0);
    }

    /**
     * Format currency
     */
    formatCurrency(value, currency = 'BRL') {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: currency
        }).format(value);
    }

    /**
     * Get account type label in Portuguese
     */
    getTypeLabel(type) {
        const labels = {
            'checking': 'Conta Corrente',
            'savings': 'Conta Poupança',
            'credit_card': 'Cartão de Crédito',
            'cash': 'Dinheiro',
            'investment': 'Investimento'
        };
        return labels[type] || type;
    }

    /**
     * Get account type icon
     */
    getTypeIcon(type) {
        const icons = {
            'checking': '🏦',
            'savings': '🐷',
            'credit_card': '💳',
            'cash': '💵',
            'investment': '📈'
        };
        return icons[type] || '💳';
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6',
            warning: '#f59e0b'
        };

        notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInUp 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutDown 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    /**
     * Render accounts list
     */
    renderAccountsList(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (this.accounts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>💳 Nenhuma conta cadastrada</p>
                    <button class="btn btn-primary" id="add-account-btn">Adicionar Conta</button>
                </div>
            `;
            return;
        }

        const accountsHTML = this.accounts.map(account => `
            <div class="account-card" data-account-id="${account.id}" style="border-left: 4px solid ${account.color}">
                <div class="account-header">
                    <span class="account-icon">${account.icon}</span>
                    <div class="account-info">
                        <h3>${account.name}</h3>
                        <span class="account-type">${this.getTypeLabel(account.type)}</span>
                    </div>
                </div>
                <div class="account-balance">
                    <span class="balance-label">Saldo:</span>
                    <span class="balance-value ${account.balance < 0 ? 'negative' : 'positive'}">
                        ${this.formatCurrency(account.balance, account.currency)}
                    </span>
                </div>
                ${account.type === 'credit_card' && account.credit_limit ? `
                    <div class="credit-info">
                        <span>Limite: ${this.formatCurrency(account.credit_limit, account.currency)}</span>
                        <span>Disponível: ${this.formatCurrency(account.credit_limit + account.balance, account.currency)}</span>
                    </div>
                ` : ''}
                <div class="account-actions">
                    <button class="btn-edit" data-action="edit">✏️ Editar</button>
                    <button class="btn-delete" data-action="delete">🗑️ Excluir</button>
                </div>
            </div>
        `).join('');

        container.innerHTML = accountsHTML;

        // Add event listeners
        this.attachEventListeners(container);
    }

    /**
     * Attach event listeners to account cards
     */
    attachEventListeners(container) {
        container.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.account-card');
                const accountId = card.getAttribute('data-account-id');
                this.openEditModal(accountId);
            });
        });

        container.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const card = e.target.closest('.account-card');
                const accountId = card.getAttribute('data-account-id');
                const account = this.getAccountById(accountId);
                
                if (confirm(`Tem certeza que deseja excluir a conta "${account.name}"?`)) {
                    await this.deleteAccount(accountId);
                    this.renderAccountsList('accounts-list');
                }
            });
        });
    }

    /**
     * Open edit modal (placeholder - to be implemented)
     */
    openEditModal(accountId) {
        console.log('Edit account:', accountId);
        // TODO: Implement edit modal
    }
}

// Initialize accounts manager globally
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.accountsManager = new AccountsManager();
    });
} else {
    window.accountsManager = new AccountsManager();
}
