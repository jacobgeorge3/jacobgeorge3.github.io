import React from 'react';
import { useStore } from '@nanostores/react';
import { themeStore, setTheme } from '../../store/themeStore';

export default function ThemeToggle() {
    const theme = useStore(themeStore);

    return (
        <div className="theme-toggle" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label htmlFor="theme-select" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Experience:</label>
            <select
                id="theme-select"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                style={{
                    background: 'var(--terminal-bg)',
                    color: 'var(--accent-color)',
                    border: '1px solid var(--border-color)',
                    padding: '0.3rem 0.5rem',
                    borderRadius: '4px',
                    fontFamily: 'var(--code-font)',
                    cursor: 'pointer',
                    outline: 'none'
                }}
            >
                <option value="classic">Terminal (Classic)</option>
                <option value="climbing">Climbing (Alpine)</option>
            </select>
        </div>
    );
}
