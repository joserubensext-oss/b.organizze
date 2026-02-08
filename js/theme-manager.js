/**
 * b.organizze - Theme Manager
 * Manages theme switching and custom wallpaper with transparency control
 */

const ThemeManager = {
    // Theme state
    currentTheme: localStorage.getItem('theme') || 'warm',
    wallpaperImage: localStorage.getItem('wallpaperImage') || null,
    wallpaperOpacity: parseFloat(localStorage.getItem('wallpaperOpacity')) || 0.3,

    // Available themes
    themes: {
        warm: {
            name: 'Warm/Golden Mode',
            description: 'Suave design with warm tones',
            icon: '☀️',
            colors: {
                primary: '#F97316',
                accent: '#F59E0B',
                dark: '#EA580C'
            }
        },
        dark: {
            name: 'Dark Cyan Mode',
            description: 'Modern dark theme with cyan accents',
            icon: '🌙',
            colors: {
                primary: '#06B6D4',
                accent: '#14B8A6',
                dark: '#0891B2'
            }
        }
    },

    /**
     * Initialize theme manager
     */
    init() {
        this.applyTheme(this.currentTheme);
        this.applyWallpaper();
        console.log('ThemeManager initialized with theme:', this.currentTheme);
    },

    /**
     * Get all available themes
     */
    getThemes() {
        return this.themes;
    },

    /**
     * Get current theme
     */
    getCurrentTheme() {
        return {
            key: this.currentTheme,
            ...this.themes[this.currentTheme]
        };
    },

    /**
     * Switch to a different theme
     */
    setTheme(themeName) {
        if (!this.themes[themeName]) {
            console.error('Theme not found:', themeName);
            return false;
        }

        this.currentTheme = themeName;
        this.applyTheme(themeName);
        localStorage.setItem('theme', themeName);
        
        // Dispatch custom event for other components to listen
        document.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: themeName } 
        }));
        
        return true;
    },

    /**
     * Apply theme to the page
     */
    applyTheme(themeName) {
        const root = document.documentElement;
        
        if (themeName === 'dark') {
            root.setAttribute('data-theme', 'dark');
            document.body.classList.add('dark-theme');
            document.body.classList.remove('warm-theme');
        } else {
            root.removeAttribute('data-theme');
            document.body.classList.add('warm-theme');
            document.body.classList.remove('dark-theme');
        }
    },

    /**
     * Handle wallpaper upload
     */
    uploadWallpaper(file) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject('No file provided');
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                reject('Please upload an image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                reject('File size must be less than 5MB');
                return;
            }

            const reader = new FileReader();

            reader.onload = (e) => {
                this.wallpaperImage = e.target.result;
                this.applyWallpaper();
                localStorage.setItem('wallpaperImage', this.wallpaperImage);
                resolve({
                    message: 'Wallpaper uploaded successfully',
                    preview: this.wallpaperImage
                });
            };

            reader.onerror = () => {
                reject('Error reading file');
            };

            reader.readAsDataURL(file);
        });
    },

    /**
     * Set wallpaper transparency/opacity
     */
    setWallpaperOpacity(opacity) {
        // Ensure opacity is between 0 and 1
        opacity = Math.max(0, Math.min(1, opacity));
        
        this.wallpaperOpacity = opacity;
        document.documentElement.style.setProperty('--wallpaper-opacity', opacity);
        localStorage.setItem('wallpaperOpacity', opacity);
        
        return opacity;
    },

    /**
     * Apply wallpaper to background
     */
    applyWallpaper() {
        if (this.wallpaperImage) {
            document.body.style.backgroundImage = `url('${this.wallpaperImage}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundAttachment = 'fixed';
        } else {
            document.body.style.backgroundImage = 'none';
        }
        
        // Apply opacity
        this.setWallpaperOpacity(this.wallpaperOpacity);
    },

    /**
     * Remove wallpaper and restore default background
     */
    removeWallpaper() {
        this.wallpaperImage = null;
        document.body.style.backgroundImage = 'none';
        localStorage.removeItem('wallpaperImage');
        this.applyTheme(this.currentTheme);
        return true;
    },

    /**
     * Get wallpaper settings
     */
    getWallpaperSettings() {
        return {
            hasWallpaper: !!this.wallpaperImage,
            opacity: this.wallpaperOpacity,
            preview: this.wallpaperImage
        };
    },

    /**
     * Export all theme settings
     */
    exportSettings() {
        return {
            theme: this.currentTheme,
            wallpaper: this.wallpaperImage,
            opacity: this.wallpaperOpacity
        };
    },

    /**
     * Import theme settings
     */
    importSettings(settings) {
        if (settings.theme) {
            this.setTheme(settings.theme);
        }
        if (settings.wallpaper) {
            this.wallpaperImage = settings.wallpaper;
            this.applyWallpaper();
        }
        if (settings.opacity !== undefined) {
            this.setWallpaperOpacity(settings.opacity);
        }
        return true;
    },

    /**
     * Reset to default settings
     */
    resetToDefaults() {
        this.setTheme('warm');
        this.removeWallpaper();
        this.setWallpaperOpacity(0.3);
        localStorage.removeItem('theme');
        localStorage.removeItem('wallpaperImage');
        localStorage.removeItem('wallpaperOpacity');
        return true;
    }
};

/**
 * Initialize on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    
    // Log current configuration
    console.log('Current Theme:', ThemeManager.getCurrentTheme());
    console.log('Wallpaper Settings:', ThemeManager.getWallpaperSettings());
});

/**
 * Listen for system theme changes (if supported)
 */
if (window.matchMedia) {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeQuery.addEventListener('change', (e) => {
        // Optional: Auto-switch theme based on system preference
        // ThemeManager.setTheme(e.matches ? 'dark' : 'warm');
    });
}

/**
 * Export for use in other modules
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}
