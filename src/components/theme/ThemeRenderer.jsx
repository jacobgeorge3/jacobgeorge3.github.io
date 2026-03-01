import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { themeStore } from '../../store/themeStore';
import ClimbingEngine from './ClimbingEngine.jsx';

export default function ThemeRenderer() {
    const theme = useStore(themeStore);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = mounted ? theme : 'classic';

    if (currentTheme === 'classic') return null;
    if (currentTheme === 'climbing') return <ClimbingEngine />;

    return null;
}
