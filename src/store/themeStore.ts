import { atom } from 'nanostores';

export type Theme = 'classic' | 'climbing' | 'gymrat';

export const themeStore = atom<Theme>('classic');

// Auto-initialize from localStorage and subscribe to changes (browser only)
if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    if (savedTheme && ['classic', 'climbing', 'gymrat'].includes(savedTheme)) {
        themeStore.set(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        document.documentElement.setAttribute('data-theme', 'classic');
    }

    themeStore.subscribe(value => {
        localStorage.setItem('portfolio-theme', value);
        document.documentElement.setAttribute('data-theme', value);
    });
}

export const setTheme = (newTheme: Theme) => {
    themeStore.set(newTheme);
};
