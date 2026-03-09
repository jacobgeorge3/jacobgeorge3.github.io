# Experimental Climber Animation Attempt (Tabled)

## Session Summary (March 9, 2026)
We attempted to upgrade the "Climbing" theme on the portfolio website by adding a dynamic, articulated rappelling climber. 
- **What worked:** We successfully implemented a new `CliffFaceBackground` and visual anchor points that look much more professional than the previous background.
- **What we tried:** We redrew the `ClimberSprite` as an articulated puppet with separated SVG groups (torso, arms, individual thighs, individual calves). We attempted to animate these limbs using Framer Motion based on the user's scroll speed and then later a scroll-distance sine wave.
- **What broke:** 
  1. **Framer Motion Origin Bugs:** Passing `originX` and `originY` strings to `<motion.g>` SVG elements caused severe "chattering" where the origin would rapidly shift between the custom coordinates and the top-left of the viewBox. We fixed this by switching to `transformOrigin: "68px 65px"`.
  2. **Body Separation:** Applying independent rotations to limbs without correct hierarchical nesting caused the hips and shoulders to separate from the torso during the animation.
  3. **Velocity vs. Progress:** Mapping the rotation directly to `useVelocity` caused too much jittering. We switched to a sine wave tied to `scrollY` progress, but the visual result still felt disjointed.
  4. **Z-Index and Interactivity:** The overlay `ClimbingEngine` component, despite having `pointerEvents: 'none'`, interfered with button clicks in the Alpine theme due to custom event dispatching in `index.astro` trying to trigger a custom 'swing' navigation.

**Resolution:** We tabled the animation, reverted the broken puppet, removed the custom JavaScript link interception in `index.astro`, and restored standard web navigation for all buttons. The static rope and `CliffFaceBackground` remain.

## Next Session Plan
1. **Polish the Climbing Theme:** Review the static appearance of the rope, anchors, and background. Add a simpler static climber graphic that fits the new aesthetic without breaking functionality.
2. **Review Terminal Theme:** Ensure the Terminal theme requires no further polish.
3. **General UI/UX QA:** Do a final sweep of spacing, responsive design on mobile, and cross-browser compatibility.

---

## Source Code Backups - For Future Reference

### `ClimberSprite.jsx` (Articulated Version)
```jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function ClimberSprite({ 
    width = 120, height = 120, color = "var(--text-main)", ropeColor = "var(--accent-color)", 
    legLeftThigh, legLeftCalf, legRightThigh, legRightCalf, bodyLean, armPull, ...props 
}) {
    // The climber's center of gravity (waist/harness) is precisely at (68, 65).
    // The rope comes straight down at x=60.
    
    return (
        <svg width={width} height={height} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }} {...props}>
            {/* The Main Rope */}
            <line x1="60" y1="0" x2="60" y2="120" stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />

            <g strokeLinecap="round" strokeLinejoin="round">
                {/* 1. Harness & Carabiner */}
                <path d="M 60 45 C 55 45, 50 50, 50 60 C 50 70, 55 75, 60 75 C 65 75, 65 65, 60 65" stroke={ropeColor} strokeWidth="2" fill="none" />
                <line x1="60" y1="60" x2="68" y2="65" stroke={color} strokeWidth="2" />

                {/* 2. Articulated Legs (Back/Left Leg) - darker for depth */}
                <motion.g style={{ rotate: legLeftThigh, transformOrigin: "68px 65px" }}>
                    <line x1="68" y1="65" x2="45" y2="55" stroke={color} strokeWidth="6" opacity="0.6"/>
                    <motion.g style={{ rotate: legLeftCalf, transformOrigin: "45px 55px" }}>
                        <line x1="45" y1="55" x2="25" y2="75" stroke={color} strokeWidth="5" opacity="0.6"/>
                        <path d="M 25 75 L 18 73 L 15 80 L 23 82 Z" fill={ropeColor} opacity="0.8"/>
                    </motion.g>
                </motion.g>

                {/* 3. Articulated Body (Torso & Head) */}
                <motion.g style={{ rotate: bodyLean, transformOrigin: "68px 65px" }}>
                    <path d="M 64 63 L 72 67" stroke="var(--bg-color)" strokeWidth="6" />
                    <path d="M 63 62 L 73 68" stroke={color} strokeWidth="4" />
                    <path d="M 68 65 L 85 40" stroke={color} strokeWidth="12" />
                    <circle cx="76" cy="70" r="5" fill="var(--bg-color)" stroke={color} strokeWidth="1.5" />
                    <circle cx="92" cy="28" r="6" fill={color} />
                    <path d="M 85 28 C 85 20, 99 20, 99 28 Z" fill={ropeColor} /> 

                    {/* 5. Articulated Arms holding the rope */}
                    <motion.g style={{ transformOrigin: "85px 40px" }}>
                        <line x1="85" y1="40" x2="75" y2="48" stroke={color} strokeWidth="5" />
                        <line x1="75" y1="48" x2="60" y2="40" stroke={color} strokeWidth="4" />
                        <circle cx="60" cy="40" r="3" fill="var(--bg-color)" stroke={color} strokeWidth="2" />
                    </motion.g>
                    <path d="M 60 60 Q 65 50 60 40" stroke={ropeColor} strokeWidth="1.5" fill="none" />
                </motion.g>

                {/* 4. Articulated Legs (Front/Right Leg) */}
                <motion.g style={{ rotate: legRightThigh, transformOrigin: "68px 65px" }}>
                    <line x1="68" y1="65" x2="40" y2="60" stroke={color} strokeWidth="7" />
                    <motion.g style={{ rotate: legRightCalf, transformOrigin: "40px 60px" }}>
                        <line x1="40" y1="60" x2="20" y2="85" stroke={color} strokeWidth="6" />
                        <path d="M 20 85 L 12 83 L 10 90 L 18 92 Z" fill={ropeColor} />
                    </motion.g>
                </motion.g>
            </g>
        </svg>
    );
}
```

### `ClimbingEngine.jsx` (Animation Logic Snapshot)
```jsx
// Simplified snapshot of the cycle logic
const rappelCycle = useTransform(scrollY, (y) => {
    const cycleLengthPixels = 400; 
    const phase = (y % cycleLengthPixels) / cycleLengthPixels; // 0 to 1
    return (Math.sin(phase * Math.PI * 2 - Math.PI / 2) + 1) / 2;
});

const legLeftThigh = useTransform(rappelCycle, [0, 1], [25, 5]); 
const legLeftCalf = useTransform(rappelCycle, [0, 1], [-60, -10]); 
// ... passed down to ClimberSprite
```
