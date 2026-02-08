/**
 * Authentication Module
 * Handles user registration, login, logout, and session management
 * Integrates with Supabase Auth
 */

class AuthManager {
    constructor() {
        this.supabase = null;
        this.currentUser = null;
        this.init();
    }

    /**
     * Initialize the authentication manager
     */
    async init() {
        // Wait for Supabase client to be available
        if (window.supabaseClient) {
            this.supabase = window.supabaseClient.getClient();
            await this.checkSession();
        } else {
            // Retry after a short delay
            setTimeout(() => this.init(), 100);
        }
    }

    /**
     * Check if user has an active session
     */
    async checkSession() {
        try {
            const { data: { session } } = await this.supabase.auth.getSession();
            
            if (session) {
                this.currentUser = session.user;
                this.onAuthStateChange(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Erro ao verificar sessão:', error);
            return false;
        }
    }

    /**
     * Register a new user
     */
    async register(email, password, fullName) {
        try {
            const { data, error } = await this.supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: fullName
                    }
                }
            });

            if (error) throw error;

            // Show success message
            this.showNotification('✅ Conta criada com sucesso! Verifique seu e-mail para confirmar.', 'success');
            
            return { success: true, data };
        } catch (error) {
            console.error('Erro no registro:', error);
            this.showNotification(`❌ Erro ao criar conta: ${error.message}`, 'error');
            return { success: false, error };
        }
    }

    /**
     * Login user
     */
    async login(email, password) {
        try {
            const { data, error } = await this.supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;

            this.currentUser = data.user;
            this.showNotification('✅ Login realizado com sucesso!', 'success');
            
            // Redirect to dashboard after successful login
            setTimeout(() => {
                window.location.href = './dashboard.html';
            }, 1000);

            return { success: true, data };
        } catch (error) {
            console.error('Erro no login:', error);
            this.showNotification(`❌ Erro ao fazer login: ${error.message}`, 'error');
            return { success: false, error };
        }
    }

    /**
     * Logout user
     */
    async logout() {
        try {
            const { error } = await this.supabase.auth.signOut();
            
            if (error) throw error;

            this.currentUser = null;
            this.showNotification('👋 Logout realizado com sucesso!', 'success');
            
            // Redirect to login page
            setTimeout(() => {
                window.location.href = './index.html';
            }, 1000);

            return { success: true };
        } catch (error) {
            console.error('Erro no logout:', error);
            this.showNotification(`❌ Erro ao fazer logout: ${error.message}`, 'error');
            return { success: false, error };
        }
    }

    /**
     * Reset password
     */
    async resetPassword(email) {
        try {
            const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password.html`
            });

            if (error) throw error;

            this.showNotification('✅ E-mail de recuperação enviado! Verifique sua caixa de entrada.', 'success');
            return { success: true };
        } catch (error) {
            console.error('Erro ao resetar senha:', error);
            this.showNotification(`❌ Erro ao enviar e-mail: ${error.message}`, 'error');
            return { success: false, error };
        }
    }

    /**
     * Update password
     */
    async updatePassword(newPassword) {
        try {
            const { error } = await this.supabase.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;

            this.showNotification('✅ Senha atualizada com sucesso!', 'success');
            return { success: true };
        } catch (error) {
            console.error('Erro ao atualizar senha:', error);
            this.showNotification(`❌ Erro ao atualizar senha: ${error.message}`, 'error');
            return { success: false, error };
        }
    }

    /**
     * Get current user
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return this.currentUser !== null;
    }

    /**
     * Protect page - redirect to login if not authenticated
     */
    async protectPage() {
        const isAuth = await this.checkSession();
        if (!isAuth) {
            window.location.href = './index.html';
        }
    }

    /**
     * Handle authentication state changes
     */
    onAuthStateChange(isAuthenticated) {
        // Listen for auth state changes
        this.supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                this.currentUser = session?.user || null;
                console.log('Usuário autenticado:', this.currentUser?.email);
            } else if (event === 'SIGNED_OUT') {
                this.currentUser = null;
                console.log('Usuário desconectado');
            }
        });
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

        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutDown 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
}

// Initialize auth manager globally
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.authManager = new AuthManager();
    });
} else {
    window.authManager = new AuthManager();
}

// Add animations
if (!document.getElementById('auth-animations')) {
    const style = document.createElement('style');
    style.id = 'auth-animations';
    style.textContent = `
        @keyframes slideInUp {
            from {
                transform: translateY(100px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        @keyframes slideOutDown {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}
