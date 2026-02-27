import React from 'react';

export default function AlpineBackground({ className = "", color = "var(--text-muted)", ...props }) {
    return (
        <svg
            className={className}
            width="100%"
            height="100%"
            viewBox="0 0 1000 400"
            preserveAspectRatio="xMidYMax slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ ...props.style }}
        >
            <g stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
                {/* Background distant mountains */}
                <path d="M -50 400 L 150 200 L 350 350 L 550 150 L 800 300 L 1050 100 L 1100 400" fill="none" />
                <path d="M -40 400 L 140 210 L 360 340 L 560 160 L 790 310 L 1040 110 L 1100 400" fill="none" strokeWidth="0.5" />

                {/* Midground mountains */}
                <path d="M -10 400 L 250 150 L 450 300 L 700 80 L 950 250 L 1100 400" fill="none" strokeWidth="2" style={{ opacity: 0.5 }} />
                <path d="M 0 400 L 245 155 L 455 295 L 695 85 L 945 255 L 1100 400" fill="none" strokeWidth="1" style={{ opacity: 0.4 }} />

                {/* Foreground crags and boulders */}
                <path d="M -20 400 L 50 300 L 100 320 L 150 280 L 200 350 L 350 250 L 450 380 L 600 200 L 750 350 L 900 250 L 1050 380 L 1100 400" fill="none" strokeWidth="3" style={{ opacity: 0.8 }} />
                <path d="M -15 400 L 45 305 L 105 315 L 145 285 L 205 345 L 345 255 L 455 375 L 595 205 L 755 345 L 895 255 L 1045 375 L 1100 400" fill="none" strokeWidth="1" style={{ opacity: 0.6 }} />

                {/* Sketched Mountain Crevasses/Shading Lines */}
                <path d="M 250 150 L 250 200 M 240 160 L 230 190 M 260 160 L 270 200" strokeWidth="1" />
                <path d="M 700 80 L 700 150 M 690 90 L 680 130 M 710 90 L 720 140 M 730 100 L 740 130" strokeWidth="1" />
                <path d="M 550 150 L 550 200 M 540 160 L 530 190 M 560 160 L 570 200" strokeWidth="1" />

                {/* Small abstract sketchy pine trees scattered at the base */}
                <g strokeWidth="2" style={{ opacity: 0.7 }}>
                    {/* Tree 1 */}
                    <path d="M 50 300 L 50 280 M 45 290 L 55 290 M 47 285 L 53 285 M 49 282 L 51 282" />
                    {/* Tree 2 */}
                    <path d="M 70 310 L 70 290 M 65 300 L 75 300 M 67 295 L 73 295 M 69 292 L 71 292" />
                    {/* Tree 3 */}
                    <path d="M 350 250 L 350 220 M 345 240 L 355 240 M 347 230 L 353 230 M 349 225 L 351 225" />
                    {/* Tree 4 */}
                    <path d="M 370 260 L 370 230 M 365 250 L 375 250 M 367 240 L 373 240 M 369 235 L 371 235" />
                    {/* Tree 5 */}
                    <path d="M 850 290 L 850 260 M 845 280 L 855 280 M 847 270 L 853 270 M 849 265 L 851 265" />
                </g>
            </g>
        </svg>
    );
}
