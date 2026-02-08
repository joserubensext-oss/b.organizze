/**
 * b.organizze - Dashboard JavaScript
 * Handles dashboard interactivity, navigation, and data management
 */

// ========== Dashboard State ==========
const DashboardState = {
    user: {
        name: localStorage.getItem('userName') || 'Usuário',
        email: localStorage.getItem('userEmail') || 'user@organizze.app'
    },
    accounts: [],
    transactions: [],
    budgets: []
};

// ========== Dashboard Module ==========
const Dashboard = {
    /**
     * Initialize dashboard
     */
    init() {
        this.setupEventListeners();
        this.loadUserData();
        this.loadTransactions();
        this.updateCards();
        this.setupMobileMenu();
        console.log('Dashboard initialized');
    },

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        const logoutBtn = document.getElementById('logout-btn');
        const menuToggle = document.getElementById('menu-toggle');

        if (logoutBtn) {
            logoutBtn.addEventListener('click', this.handleLogout.bind(this));
        }

        if (menuToggle) {
            menuToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        }

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
                this.closeMobileMenu();
            });
        });
    },

    /**
     * Load user data from localStorage
     */
    loadUserData() {
        const userName = document.getElementById('user-name');
        const userEmail = document.getElementById('user-email');

        if (userName) userName.textContent = DashboardState.user.name;
        if (userEmail) userEmail.textContent = DashboardState.user.email;
    },

    /**
     * Load transactions from localStorage or API
     */
    loadTransactions() {
        // Mock data - Replace with Supabase fetch
        DashboardState.transactions = [
            {
                date: '01/02/2026',
                description: 'Supermercado',
                category: 'Alimentação',
                value: -150.00,
                status: 'Completa'
            },
            {
                date: '31/01/2026',
                description: 'Salário',
                category: 'Renda',
                value: 3000.00,
                status: 'Completa'
            }
        ];
    },

    /**
     * Update overview cards
     */
    updateCards() {
        // Calculate totals from transactions
        let totalBalance = 0;
        let monthSpending = 0;

        DashboardState.transactions.forEach(transaction => {
            if (transaction.value > 0) {
                totalBalance += transaction.value;
            } else {
                monthSpending += Math.abs(transaction.value);
            }
        });

        const totalBalanceEl = document.getElementById('total-balance');
        const monthSpendingEl = document.getElementById('month-spending');

        if (totalBalanceEl) {
            totalBalanceEl.textContent = this.formatCurrency(totalBalance);
        }
        if (monthSpendingEl) {
            monthSpendingEl.textContent = this.formatCurrency(monthSpending);
        }
    },

    /**
     * Format currency
     */
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    },

    /**
     * Handle logout
     */
    handleLogout() {
        if (confirm('Tem certeza que deseja sair?')) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            window.location.href = '/';
        }
    },

    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        const sidebarNav = document.querySelector('.sidebar-nav');
        if (sidebarNav) {
            sidebarNav.classList.toggle('open');
        }
    },

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        const sidebarNav = document.querySelector('.sidebar-nav');
        if (sidebarNav) {
            sidebarNav.classList.remove('open');
        }
    }
};

// ========== Data Module ==========
const DataManager = {
    /**
     * Add new transaction
     */
    addTransaction(transaction) {
        DashboardState.transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(DashboardState.transactions));
        return transaction;
    },

    /**
     * Delete transaction
     */
    deleteTransaction(index) {
        DashboardState.transactions.splice(index, 1);
        localStorage.setItem('transactions', JSON.stringify(DashboardState.transactions));
    },

    /**
     * Get transactions by category
     */
    getTransactionsByCategory(category) {
        return DashboardState.transactions.filter(t => t.category === category);
    },

    /**
     * Get balance
     */
    getBalance() {
        return DashboardState.transactions.reduce((sum, t) => sum + t.value, 0);
    },

    /**
     * Get monthly spending
     */
    getMonthlySpending() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        return DashboardState.transactions
            .filter(t => {
                const tDate = new Date(t.date);
                return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear && t.value < 0;
            })
            .reduce((sum, t) => sum + Math.abs(t.value), 0);
    }
};

// ========== UI Module ==========
const DashboardUI = {
    /**
     * Render transactions list
     */
    renderTransactions() {
        const transactionsList = document.getElementById('transactions-list');
        if (!transactionsList) return;

        transactionsList.innerHTML = DashboardState.transactions.map((transaction, index) => `
            <tr data-index="${index}">
                <td>${transaction.date}</td>
                <td>${transaction.description}</td>
                <td>${transaction.category}</td>
                <td class="${transaction.value >= 0 ? 'text-success' : 'text-danger'}">
                    ${transaction.value >= 0 ? '+' : ''}${Dashboard.formatCurrency(transaction.value)}
                </td>
                <td><span class="badge badge-${this.getStatusBadgeClass(transaction.status)}">${transaction.status}</span></td>
            </tr>
        `).join('');
    },

    /**
     * Get status badge class
     */
    getStatusBadgeClass(status) {
        const classes = {
            'Completa': 'success',
            'Pendente': 'warning',
            'Cancelada': 'danger'
        };
        return classes[status] || 'warning';
    },

    /**
     * Show notification
     */
    notify(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background-color: ${type === 'error' ? '#dc2626' : type === 'success' ? '#16a34a' : '#2563eb'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// ========== Initialize on Page Load ==========
document.addEventListener('DOMContentLoaded', () => {
    Dashboard.init();
    DashboardUI.renderTransactions();
    console.log('b.organizze Dashboard loaded');
});

// ========== Export for testing ==========
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Dashboard, DataManager, DashboardUI, DashboardState };
}
