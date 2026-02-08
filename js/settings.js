/**
 * Settings Manager
 * Handles theme switching, wallpaper uploads, and transparency controls
 */

class SettingsManager {
    constructor() {
        this.themeOptions = document.querySelectorAll('.theme-option');
        this.wallpaperInput = document.getElementById('wallpaperInput');
        this.wallpaperPreview = document.getElementById('wallpaperPreview');
        this.transparencySlider = document.getElementById('transparencySlider');
        this.transparencyValue = document.getElementById('transparencyValue');
        this.removeWallpaperBtn = document.getElementById('removeWallpaper');
        this.saveSettingsBtn = document.getElementById('saveSettings');

        this.init();
    }

    init() {
        this.setupThemeListeners();
        this.setupWallpaperListeners();
        this.loadSettings();
        this.updateWallpaperPreview();
    }

    /**
     * Setup theme selection event listeners
     */
    setupThemeListeners() {
        this.themeOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const theme = option.getAttribute('data-theme');
                this.selectTheme(theme);
            });
        });
    }

    /**
     * Select a theme and update UI
     */
    selectTheme(theme) {
        // Remove active class from all options
        this.themeOptions.forEach(option => {
            option.classList.remove('active');
        });

        // Add active class to selected theme
        const selectedOption = document.querySelector(`.theme-option[data-theme="${theme}"]`);
        if (selectedOption) {
            selectedOption.classList.add('active');
        }

        // Save to localStorage (will be applied on page load)
        localStorage.setItem('selectedTheme', theme);

        // Apply theme immediately using theme-manager
        if (window.themeManager) {
            window.themeManager.setTheme(theme);
        }
    }

    /**
     * Setup wallpaper-related event listeners
     */
    setupWallpaperListeners() {
        this.wallpaperInput.addEventListener('change', (e) => {
            this.handleWallpaperUpload(e);
        });

        this.transparencySlider.addEventListener('input', (e) => {
            this.updateTransparency(e.target.value);
        });

        this.removeWallpaperBtn.addEventListener('click', () => {
            this.removeWallpaper();
        });

        if (this.saveSettingsBtn) {
            this.saveSettingsBtn.addEventListener('click', () => {
                this.saveAllSettings();
            });
        }
    }

    /**
     * Handle wallpaper file upload
     */
    handleWallpaperUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Check file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('Arquivo muito grande! Máximo de 5MB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const imageData = event.target.result;
            localStorage.setItem('wallpaperImage', imageData);
            this.updateWallpaperPreview();
            this.showNotification('Papel de parede atualizado com sucesso!');
        };
        reader.readAsDataURL(file);
    }

    /**
     * Update wallpaper preview
     */
    updateWallpaperPreview() {
        const wallpaperImage = localStorage.getItem('wallpaperImage');
        const transparency = localStorage.getItem('wallpaperTransparency') || 70;
        const currentTheme = localStorage.getItem('selectedTheme') || 'warm';

        if (wallpaperImage) {
            // Calculate opacity
            const opacity = transparency / 100;
            this.wallpaperPreview.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, ${1 - opacity}), rgba(255, 255, 255, ${1 - opacity})), url('${wallpaperImage}')`;
        } else {
            // Show theme default colors as fallback
            this.wallpaperPreview.style.backgroundImage = 'none';
            if (currentTheme === 'warm') {
                this.wallpaperPreview.style.backgroundColor = '#f5e6d3';
            } else {
                this.wallpaperPreview.style.backgroundColor = '#1a1f3a';
            }
        }
    }

    /**
     * Update transparency value
     */
    updateTransparency(value) {
        this.transparencyValue.textContent = value;
        localStorage.setItem('wallpaperTransparency', value);

        // Update preview immediately
        this.updateWallpaperPreview();

        // Apply to document background
        if (window.themeManager) {
            window.themeManager.updateWallpaperTransparency(value);
        }
    }

    /**
     * Remove wallpaper
     */
    removeWallpaper() {
        if (confirm('Tem certeza que deseja remover o papel de parede?')) {
            localStorage.removeItem('wallpaperImage');
            this.wallpaperInput.value = '';
            this.updateWallpaperPreview();
            this.showNotification('Papel de parede removido!');
        }
    }

    /**
     * Save all settings and show confirmation
     */
    saveAllSettings() {
        this.showNotification('✅ Configurações salvas com sucesso!');
        setTimeout(() => {
            window.location.href = './dashboard.html';
        }, 1500);
    }

    /**
     * Load settings from localStorage
     */
    loadSettings() {
        const selectedTheme = localStorage.getItem('selectedTheme') || 'warm';
        const transparency = localStorage.getItem('wallpaperTransparency') || 70;

        // Update theme selection UI
        this.selectTheme(selectedTheme);

        // Update transparency slider
        this.transparencySlider.value = transparency;
        this.transparencyValue.textContent = transparency;
    }

    /**
     * Show notification message
     */
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: var(--color-primary, #d4af37);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideInUp 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutDown 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.settingsManager = new SettingsManager();
    });
} else {
    window.settingsManager = new SettingsManager();
}

// Add notification animations
const style = document.createElement('style');
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
