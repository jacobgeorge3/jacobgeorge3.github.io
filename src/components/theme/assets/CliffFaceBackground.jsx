import React from 'react';

export default function CliffFaceBackground({ className = "", color = "var(--text-muted)", ...props }) {
    return (
        <svg
            className={className}
            width="100%"
            height="100%"
            viewBox="0 0 1000 3000"
            preserveAspectRatio="xMinYMin slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ ...props.style }}
        >
            <g stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                {/* Main vertical sheer cliff line on the left edge */}
                <path d="M 0 0 L 80 100 L 40 300 L 90 600 L 50 900 L 100 1200 L 60 1500 L 110 1800 L 80 2100 L 50 2400 L 90 2700 L 60 3000" strokeWidth="2" />
                
                {/* Inner crags for depth */}
                <path d="M 0 50 L 60 150 L 20 350 L 70 650 L 30 950 L 80 1250 L 40 1550 L 90 1850 L 60 2150 L 30 2450 L 70 2750 L 40 3000" strokeWidth="1" opacity="0.6" />

                {/* Hand drawn sketch hatch marks/texture pointing down/inward */}
                <path d="M 80 100 L 50 120 M 40 300 L 20 320 M 90 600 L 60 630 M 100 1200 L 80 1230 M 110 1800 L 90 1840 M 80 2100 L 50 2150" strokeWidth="1" />
                <path d="M 50 900 L 30 920 M 60 1500 L 30 1530 M 90 2700 L 60 2730 M 60 3000 L 40 3020" strokeWidth="1" />
                
                {/* Distant background mist/clouds */}
                <path d="M 100 200 L 300 200 M 150 220 L 400 220" opacity="0.2" />
                <path d="M 120 800 L 350 800 M 90 820 L 250 820" opacity="0.2" />
                <path d="M 140 1400 L 400 1400 M 100 1420 L 500 1420" opacity="0.2" />
                <path d="M 110 2000 L 300 2000 M 80 2020 L 450 2020" opacity="0.2" />
                <path d="M 100 2600 L 350 2600 M 130 2620 L 280 2620" opacity="0.2" />
            </g>
        </svg>
    );
}
