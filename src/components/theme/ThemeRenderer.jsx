import React, { lazy, Suspense } from 'react';
import { useStore } from '@nanostores/react';
import { themeStore } from './themeStore';

// Lazy load the heavy engine components
const ClimbingEngine = lazy(() => import('./ClimbingEngine.jsx'));

// This component acts as the sandbox. 
// It safely mounts/unmounts the engines based on the current theme.
export default function ThemeRenderer() {
    const theme = useStore(themeStore);

    if (theme === 'classic') {
        // The Classic theme is just the static HTML, no engine required.
        return null;
    }

    return (
        <Suspense fallback={null}>
            {theme === 'climbing' && <ClimbingEngine />}
        </Suspense>
    );
}
