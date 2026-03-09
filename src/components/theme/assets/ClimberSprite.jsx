import React from 'react';
import { motion } from 'framer-motion';

export default function ClimberSprite({ 
    width = 120, 
    height = 120, 
    color = "var(--text-main)", 
    ropeColor = "var(--accent-color)", 
    legExtension, // MotionValue 0 to 1 (0 = bent/idle, 1 = extended/kicking off)
    bodyLean,     // MotionValue 0 to 1 (0 = sitting back, 1 = leaning out)
    armPull,      // MotionValue 0 to 1
    ...props 
}) {
    // The climber's center of gravity (waist/harness) is precisely at (68, 65).
    // The rope comes straight down at x=60.
    
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible' }}
            {...props}
        >
            {/* The Main Rope (Background part) */}
            <line x1="60" y1="0" x2="60" y2="120" stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />

            <g strokeLinecap="round" strokeLinejoin="round">
                {/* 1. Harness & Carabiner */}
                {/* Carabiner locking onto the rope at (60, 60) */}
                <path d="M 60 45 C 55 45, 50 50, 50 60 C 50 70, 55 75, 60 75 C 65 75, 65 65, 60 65" stroke={ropeColor} strokeWidth="2" fill="none" />
                {/* Harness belay loop connecting carabiner to waist (68, 65) */}
                <line x1="60" y1="60" x2="68" y2="65" stroke={color} strokeWidth="2" />

                {/* 2. Articulated Legs (Back/Left Leg) - darker for depth */}
                <motion.g 
                    style={{ 
                        rotate: legLeftThigh, 
                        transformOrigin: "68px 65px" 
                    }}
                >
                    {/* Thigh: Hips (68,65) up to Knee (45, 55) */}
                    <line x1="68" y1="65" x2="45" y2="55" stroke={color} strokeWidth="6" opacity="0.6"/>
                    
                    {/* Calf attached to knee */}
                    <motion.g style={{ rotate: legLeftCalf, transformOrigin: "45px 55px" }}>
                        {/* Calf: Knee (45, 55) down to Ankle (25, 75) */}
                        <line x1="45" y1="55" x2="25" y2="75" stroke={color} strokeWidth="5" opacity="0.6"/>
                        {/* Shoe planted on cliff */}
                        <path d="M 25 75 L 18 73 L 15 80 L 23 82 Z" fill={ropeColor} opacity="0.8"/>
                    </motion.g>
                </motion.g>

                {/* 3. Articulated Body (Torso & Head) */}
                {/* We put the arms inside the body group so they move WITH the torso when it leans,
                    but we still articulate the arms independently for the pulling motion. */}
                <motion.g 
                    style={{ 
                        rotate: bodyLean, 
                        transformOrigin: "68px 65px" 
                    }}
                >
                    {/* Waist/Harness belt around (68, 65) */}
                    <path d="M 64 63 L 72 67" stroke="var(--bg-color)" strokeWidth="6" />
                    <path d="M 63 62 L 73 68" stroke={color} strokeWidth="4" />

                    {/* Torso leaning back: from Hips (68, 65) to Shoulder (85, 40) */}
                    <path d="M 68 65 L 85 40" stroke={color} strokeWidth="12" />
                    
                    {/* Chalk Bag at hips */}
                    <circle cx="76" cy="70" r="5" fill="var(--bg-color)" stroke={color} strokeWidth="1.5" />

                    {/* Head & Helmet above Shoulder */}
                    <circle cx="92" cy="28" r="6" fill={color} />
                    {/* Helmet */}
                    <path d="M 85 28 C 85 20, 99 20, 99 28 Z" fill={ropeColor} /> 

                    {/* 5. Articulated Arms holding the rope (Inside Torso Group) */}
                    <motion.g 
                        style={{ 
                            transformOrigin: "85px 40px" 
                        }}
                    >
                        {/* Upper Arm: Shoulder (85, 40) branching outwards slightly to Elbow (75, 48) */}
                        <line x1="85" y1="40" x2="75" y2="48" stroke={color} strokeWidth="5" />
                        {/* Forearm: Elbow (75, 48) straight up/forward to Hand gripping rope (60, 40) */}
                        <line x1="75" y1="48" x2="60" y2="40" stroke={color} strokeWidth="4" />
                        {/* Hand gripping */}
                        <circle cx="60" cy="40" r="3" fill="var(--bg-color)" stroke={color} strokeWidth="2" />
                    </motion.g>
                    
                    {/* Detail: Rope coming out of belay device (60, 60) up to hand (60, 40) */}
                    {/* (This stays static relative to the torso for now) */}
                    <path d="M 60 60 Q 65 50 60 40" stroke={ropeColor} strokeWidth="1.5" fill="none" />
                </motion.g>

                {/* 4. Articulated Legs (Front/Right Leg) */}
                <motion.g 
                    style={{ 
                        rotate: legRightThigh, 
                        transformOrigin: "68px 65px" 
                    }}
                >
                    {/* Thigh: Hips (68,65) up to Knee (40, 60) */}
                    <line x1="68" y1="65" x2="40" y2="60" stroke={color} strokeWidth="7" />
                    
                    <motion.g style={{ rotate: legRightCalf, transformOrigin: "40px 60px" }}>
                        {/* Calf: Knee (40, 60) down to Ankle (20, 85) */}
                        <line x1="40" y1="60" x2="20" y2="85" stroke={color} strokeWidth="6" />
                        {/* Shoe planted on cliff */}
                        <path d="M 20 85 L 12 83 L 10 90 L 18 92 Z" fill={ropeColor} />
                    </motion.g>
                </motion.g>
            </g>
        </svg>
    );
}
