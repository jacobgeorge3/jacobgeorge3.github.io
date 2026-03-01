import React from 'react';

export default function ClimberSprite({ width = 80, height = 120, color = "var(--text-main)", ropeColor = "var(--accent-color)", ...props }) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 100 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible' }}
            {...props}
        >
            <g>
                {/* 1. Rope & Carabiner */}
                {/* The main tie-in loop */}
                <path d="M 50 70 Q 60 70 55 58" stroke={ropeColor} strokeWidth="3" fill="none" />
                {/* Locking Carabiner (with spine and gate) */}
                <rect x="52" y="52" width="6" height="12" rx="3" fill="var(--bg-color)" stroke={ropeColor} strokeWidth="2" />
                <line x1="58" y1="55" x2="58" y2="61" stroke={color} strokeWidth="1" /> {/* Lock sleeve detail */}

                {/* 2. Head & Helmet */}
                {/* Neck/Lower Head layer */}
                <rect x="44" y="25" width="12" height="15" rx="4" fill={color} />
                {/* Helmet Dome */}
                <path d="M 37 28 C 37 10, 63 10, 63 28 Z" fill={ropeColor} /> {/* Use rope color for accent helmet */}
                {/* Helmet Rim/Strap */}
                <line x1="37" y1="28" x2="63" y2="28" stroke="var(--bg-color)" strokeWidth="2" />
                {/* Visor/Goggles Cutout */}
                <rect x="42" y="20" width="18" height="6" rx="2" fill="var(--bg-color)" opacity="0.8" />
                <circle cx="47" cy="23" r="1" fill={color} /> {/* Eye glint */}

                {/* 3. The Torso / Jacket */}
                {/* We use a thick polygon instead of a line. */}
                <path d="M 38 40 L 62 40 L 65 85 L 35 85 Z" fill={color} />
                {/* Jacket Zipper/Seam detail for texture */}
                <line x1="50" y1="40" x2="50" y2="85" stroke="var(--bg-color)" strokeWidth="1.5" strokeDasharray="4 2" />

                {/* 4. Harness & Chalk Bag */}
                {/* Waist belt */}
                <rect x="33" y="80" width="34" height="6" rx="2" fill="var(--terminal-bg)" stroke={color} strokeWidth="1" />
                {/* Leg loops */}
                <path d="M 35 85 L 33 100 M 65 85 L 67 100" stroke="var(--terminal-bg)" strokeWidth="4" />
                {/* Chalk Bag hanging off right hip */}
                <rect x="63" y="85" width="12" height="15" rx="4" fill="var(--bg-color)" stroke={color} strokeWidth="2" />
                <circle cx="69" cy="85" r="5" fill={color} opacity="0.3" /> {/* Chalk dust */}

                {/* 5. Left Arm (Reaching up to grab rope) */}
                {/* Upper Arm */}
                <line x1="42" y1="45" x2="28" y2="30" stroke={color} strokeWidth="6" strokeLinecap="round" />
                {/* Forearm */}
                <line x1="28" y1="30" x2="33" y2="12" stroke={color} strokeWidth="5" strokeLinecap="round" />
                {/* Hand/Fingers gripping */}
                <circle cx="33" cy="12" r="4" fill="var(--bg-color)" stroke={color} strokeWidth="2" />

                {/* 6. Right Arm (Hanging / Resting) */}
                {/* Upper Arm */}
                <line x1="58" y1="45" x2="72" y2="55" stroke={color} strokeWidth="6" strokeLinecap="round" />
                {/* Forearm angled in */}
                <line x1="72" y1="55" x2="65" y2="72" stroke={color} strokeWidth="5" strokeLinecap="round" />
                {/* Hand */}
                <circle cx="65" cy="72" r="3.5" fill={color} />

                {/* 7. Left Leg (Bent, stepping on invisible rock) */}
                {/* Thigh */}
                <line x1="40" y1="85" x2="20" y2="105" stroke={color} strokeWidth="8" strokeLinecap="round" />
                {/* Calf straight down */}
                <line x1="20" y1="105" x2="20" y2="125" stroke={color} strokeWidth="6" strokeLinecap="round" />
                {/* Climbing Shoe */}
                <path d="M 20 125 L 10 130 L 12 135 L 25 130 Z" fill={ropeColor} /> {/* Accent shoe */}

                {/* 8. Right Leg (Straight down/smearing) */}
                {/* Thigh */}
                <line x1="60" y1="85" x2="65" y2="115" stroke={color} strokeWidth="8" strokeLinecap="round" />
                {/* Calf */}
                <line x1="65" y1="115" x2="60" y2="140" stroke={color} strokeWidth="6" strokeLinecap="round" />
                {/* Climbing Shoe */}
                <path d="M 60 140 L 72 143 L 68 148 L 57 145 Z" fill={ropeColor} />
            </g>
        </svg>
    );
}
