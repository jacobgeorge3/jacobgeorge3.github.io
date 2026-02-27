import { atom } from 'nanostores';

export type Theme = 'classic' | 'climbing' | 'gymrat';

// Create a persistent store for the theme
export const themeStore = atom<Theme>('classic');

// Helper to set theme and update the body attribute for CSS styles
export const setTheme = (newTheme: Theme) => {
    themeStore.set(newTheme);
    
    // Allow CSS to respond instantly to the theme change
    if (typeof window !== 'undefined') {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    }
};

// Initialize theme from localStorage if available
export const initTheme = () => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
        if (savedTheme && ['classic', 'climbing', 'gymrat'].includes(savedTheme)) {
            setTheme(savedTheme);
        } else {
            setTheme('classic');
        }
    }
};
