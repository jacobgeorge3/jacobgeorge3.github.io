import React from 'react';
import { useStore } from '@nanostores/react';
import { themeStore } from '../../store/themeStore';
import ClimbingEngine from './ClimbingEngine.jsx';

export default function ThemeRenderer() {
    const theme = useStore(themeStore);

    if (theme === 'classic') return null;
    if (theme === 'climbing') return <ClimbingEngine />;

    return null;
}
