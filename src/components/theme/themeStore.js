import { atom } from 'nanostores';

// The global store. Read/Written to by any component in any framework.
export const themeStore = atom('classic');

// Initialize from localStorage if in a browser
if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) {
        themeStore.set(saved);
        document.documentElement.setAttribute('data-theme', saved);
    }

    // Subscribe to changes to update the DOM
    themeStore.subscribe(value => {
        localStorage.setItem('portfolio-theme', value);
        document.documentElement.setAttribute('data-theme', value);
    });
}
