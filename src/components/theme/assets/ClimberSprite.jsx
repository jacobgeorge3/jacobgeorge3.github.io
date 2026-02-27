import React from 'react';

export default function ClimberSprite({ width = 40, height = 60, color = "var(--text-main)", ropeColor = "var(--accent-color)", ...props }) {
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
            <g stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9 }}>
                {/* Rope Attachment / Harness Loop */}
                <path d="M 50 75 Q 60 70 55 60" stroke={ropeColor} strokeWidth="3" />
                <circle cx="55" cy="60" r="3" fill="none" stroke={ropeColor} strokeWidth="2" />

                {/* Helmet / Head - double drawn for sketch effect */}
                <path d="M 40 25 C 40 15, 60 15, 60 25 C 60 35, 40 35, 40 25 Z" fill="none" />
                <path d="M 38 27 C 39 12, 62 14, 58 28 C 55 36, 42 36, 38 27" fill="none" strokeWidth="2" />

                {/* Torso / Shirt */}
                <path d="M 45 40 L 55 40 L 65 75 L 35 75 Z" fill="none" />
                <path d="M 43 42 L 57 38 L 67 77 L 33 73 Z" fill="none" strokeWidth="2" />

                {/* Left Arm reaching up */}
                <path d="M 40 45 Q 25 35 30 15" fill="none" />
                <path d="M 42 47 Q 27 33 28 17" fill="none" strokeWidth="2" />
                {/* Hand/Fingers */}
                <path d="M 30 15 L 25 10 M 30 15 L 28 8 M 30 15 L 34 10" strokeWidth="2" />

                {/* Right Arm hanging / chalking */}
                <path d="M 60 45 Q 75 55 70 75" fill="none" />
                <path d="M 58 47 Q 77 53 72 73" fill="none" strokeWidth="2" />

                {/* Harness lines */}
                <path d="M 35 75 Q 50 85 65 75" fill="none" strokeWidth="3" />
                <path d="M 35 75 L 30 90 M 65 75 L 70 90" fill="none" strokeWidth="3" />
                <path d="M 30 90 Q 50 95 70 90" fill="none" strokeWidth="2" />

                {/* Left Leg bent */}
                <path d="M 38 85 Q 20 100 25 125" fill="none" />
                <path d="M 40 83 Q 18 102 23 123" fill="none" strokeWidth="2" />
                {/* Left Foot */}
                <path d="M 25 125 L 15 130 L 18 135 L 28 130 Z" fill="none" />

                {/* Right Leg planted down */}
                <path d="M 62 85 Q 75 110 65 140" fill="none" />
                <path d="M 60 87 Q 77 108 67 138" fill="none" strokeWidth="2" />
                {/* Right Foot */}
                <path d="M 65 140 L 75 142 L 72 147 L 62 145 Z" fill="none" />

                {/* Little motion lines for sketchiness */}
                <path d="M 15 45 L 20 50 M 80 80 L 85 85 M 20 145 L 25 145" strokeWidth="1" opacity="0.5" />
            </g>
        </svg>
    );
}
