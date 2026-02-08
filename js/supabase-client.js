/**
 * b.organizze - Supabase Client
 * Initializes and manages Supabase connection for authentication and data sync
 */

// ========== Supabase Configuration ==========
const SUPABASE_CONFIG = {
    // Replace with your actual Supabase credentials from environment variables
    URL: process.env.REACT_APP_SUPABASE_URL || 'https://YOUR_SUPABASE_URL.supabase.co',
    ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY',
    SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || 'YOUR_SERVICE_ROLE_KEY'
};

// ========== Supabase Client Module ==========
const SupabaseClient = {
    /**
     * Initialize Supabase client
     * Note: In production, use @supabase/supabase-js library
     */
    init() {
        this.url = SUPABASE_CONFIG.URL;
        this.anonKey = SUPABASE_CONFIG.ANON_KEY;
        console.log('Supabase client initialized');
    },

    /**
     * Build headers for API requests
     */
    buildHeaders(includeAuth = true) {
        const headers = {
            'Content-Type': 'application/json',
            'apikey': this.anonKey
        };

        if (includeAuth) {
            const authToken = localStorage.getItem('authToken');
            if (authToken) {
                headers['Authorization'] = `Bearer ${authToken}`;
            }
        }

        return headers;
    },

    /**
     * Make API request
     */
    async request(endpoint, method = 'GET', data = null) {
        try {
            const options = {
                method,
                headers: this.buildHeaders()
            };

            if (data && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
                options.body = JSON.stringify(data);
            }

            const response = await fetch(`${this.url}/rest/v1${endpoint}`, options);
            
            if (!response.ok) {
                throw new Error(`API request failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Supabase request error:', error);
            throw error;
        }
    }
};

// ========== Authentication Module ==========
const SupabaseAuth = {
    /**
     * Sign up new user
     */
    async signUp(email, password, metadata = {}) {
        try {
            // This should be implemented using Supabase Auth API
            const response = await fetch(`${SupabaseClient.url}/auth/v1/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SupabaseClient.anonKey
                },
                body: JSON.stringify({
                    email,
                    password,
                    data: metadata
                })
            });

            if (!response.ok) {
                throw new Error('Sign up failed');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.session?.access_token);
            localStorage.setItem('userId', data.user?.id);
            return data;
        } catch (error) {
            console.error('Sign up error:', error);
            throw error;
        }
    },

    /**
     * Sign in user
     */
    async signIn(email, password) {
        try {
            const response = await fetch(`${SupabaseClient.url}/auth/v1/token?grant_type=password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SupabaseClient.anonKey
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Sign in failed');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.access_token);
            localStorage.setItem('userId', data.user?.id);
            return data;
        } catch (error) {
            console.error('Sign in error:', error);
            throw error;
        }
    },

    /**
     * Sign out user
     */
    signOut() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        window.location.href = '/';
    },

    /**
     * Get current user
     */
    getCurrentUser() {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');
        return token ? { id: userId, token } : null;
    }
};

// ========== Data Operations Module ==========
const SupabaseData = {
    /**
     * Get transactions for user
     */
    async getTransactions(userId, limit = 50, offset = 0) {
        return SupabaseClient.request(
            `/transactions?user_id=eq.${userId}&limit=${limit}&offset=${offset}&order=created_at.desc`
        );
    },

    /**
     * Create new transaction
     */
    async createTransaction(transaction) {
        return SupabaseClient.request('/transactions', 'POST', transaction);
    },

    /**
     * Update transaction
     */
    async updateTransaction(id, data) {
        return SupabaseClient.request(`/transactions?id=eq.${id}`, 'PATCH', data);
    },

    /**
     * Delete transaction
     */
    async deleteTransaction(id) {
        return SupabaseClient.request(`/transactions?id=eq.${id}`, 'DELETE');
    },

    /**
     * Get accounts for user
     */
    async getAccounts(userId) {
        return SupabaseClient.request(`/accounts?user_id=eq.${userId}`);
    },

    /**
     * Create new account
     */
    async createAccount(account) {
        return SupabaseClient.request('/accounts', 'POST', account);
    },

    /**
     * Get budgets for user
     */
    async getBudgets(userId) {
        return SupabaseClient.request(`/budgets?user_id=eq.${userId}`);
    },

    /**
     * Create new budget
     */
    async createBudget(budget) {
        return SupabaseClient.request('/budgets', 'POST', budget);
    },

    /**
     * Get investments for user
     */
    async getInvestments(userId) {
        return SupabaseClient.request(`/investments?user_id=eq.${userId}`);
    },

    /**
     * Create new investment
     */
    async createInvestment(investment) {
        return SupabaseClient.request('/investments', 'POST', investment);
    }
};

// ========== Real-time Subscriptions Module ==========
const SupabaseSubscriptions = {
    subscriptions: {},

    /**
     * Subscribe to table changes
     * Note: Requires Supabase realtime extension
     */
    subscribe(table, userId, callback) {
        // This would be implemented with actual realtime subscription
        console.log(`Subscribed to ${table} for user ${userId}`);
        return true;
    },

    /**
     * Unsubscribe from table changes
     */
    unsubscribe(subscriptionId) {
        if (this.subscriptions[subscriptionId]) {
            delete this.subscriptions[subscriptionId];
        }
    }
};

// ========== Initialize on Load ==========
document.addEventListener('DOMContentLoaded', () => {
    SupabaseClient.init();
    console.log('Supabase client ready');
});

// ========== Export for use in other modules ==========
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        SupabaseClient, 
        SupabaseAuth, 
        SupabaseData, 
        SupabaseSubscriptions,
        SUPABASE_CONFIG 
    };
}
