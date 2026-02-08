/**
 * b.organizze - Main JavaScript File
 * Handles form validation, authentication, and interactivity
 */

// ========== Configuration ==========
const CONFIG = {
    API_URL: process.env.REACT_APP_SUPABASE_URL || 'https://api.organizze.app',
    AUTH_PROVIDER: 'supabase',
    DEBUG: false
};

// ========== DOM Elements ==========
const loginForm = document.getElementById('loginForm');
const getStartedBtn = document.getElementById('get-started');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// ========== Authentication Module ==========
const Auth = {
    /**
     * Initialize authentication
     */
    init() {
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin.bind(this));
        }
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', this.handleGetStarted.bind(this));
        }
        console.log('Auth module initialized');
    },

    /**
     * Handle login submission
     */
    handleLogin(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validate inputs
        if (!this.validateEmail(email)) {
            this.showError('Por favor, insira um email válido');
            return;
        }

        if (!this.validatePassword(password)) {
            this.showError('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        // Show loading state
        this.setLoading(true);

        // Simulate API call (replace with actual Supabase auth)
        setTimeout(() => {
            this.setLoading(false);
            this.showSuccess('Login realizado com sucesso!');
            // Redirect to dashboard after 1 second
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1000);
        }, 1500);
    },

    /**
     * Handle get started button
     */
    handleGetStarted() {
        const loginSection = document.getElementById('login');
        if (loginSection) {
            loginSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    /**
     * Validate email format
     */
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    /**
     * Validate password strength
     */
    validatePassword(password) {
        return password.length >= 6;
    },

    /**
     * Show error message
     */
    showError(message) {
        this.showNotification(message, 'error');
    },

    /**
     * Show success message
     */
    showSuccess(message) {
        this.showNotification(message, 'success');
    },

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
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

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    /**
     * Set loading state on form
     */
    setLoading(isLoading) {
        const button = loginForm?.querySelector('button[type="submit"]');
        if (button) {
            button.disabled = isLoading;
            button.textContent = isLoading ? 'Carregando...' : 'Entrar';
            button.style.opacity = isLoading ? '0.7' : '1';
        }
    }
};

// ========== UI Module ==========
const UI = {
    /**
     * Initialize UI interactions
     */
    init() {
        this.setupScrollBehavior();
        this.setupResponsiveMenu();
        console.log('UI module initialized');
    },

    /**
     * Setup smooth scroll behavior
     */
    setupScrollBehavior() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    },

    /**
     * Setup responsive menu
     */
    setupResponsiveMenu() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        // Add mobile menu toggle if needed
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                // Reset menu on desktop
            }
        });
    }
};

// ========== Utilities Module ==========
const Utils = {
    /**
     * Format date
     */
    formatDate(date) {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
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
     * Debounce function
     */
    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    },

    /**
     * Store data in localStorage
     */
    setStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('LocalStorage error:', e);
        }
    },

    /**
     * Get data from localStorage
     */
    getStorage(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('LocalStorage error:', e);
            return null;
        }
    }
};

// ========== Initialize Application ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('b.organizze application initialized');
    
    // Initialize modules
    Auth.init();
    UI.init();

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// ========== Export modules for testing ==========
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Auth, UI, Utils, CONFIG };
}
