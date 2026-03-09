import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import CliffFaceBackground from './assets/CliffFaceBackground';

export default function ClimbingEngine() {
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 20,
        restDelta: 0.001
    });

    const gutterLeft = '10%';
    const numAnchors = 5;
    const anchors = Array.from({ length: numAnchors }).map((_, i) => (i + 1) / (numAnchors + 1));

    return (
        <div
            className="climbing-sandbox"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 0 // Moved to background so it never blocks clicks
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    left: 0,
                    width: '100vw',
                    height: '120vh',
                    y: useTransform(smoothProgress, [0, 1], [0, -200]),
                    zIndex: -1
                }}
            >
                <CliffFaceBackground style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }} />
            </motion.div>

            <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.4 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    left: gutterLeft,
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    backgroundColor: 'var(--text-muted)',
                    transformOrigin: 'top'
                }}
            >
                {anchors.map((pos, i) => (
                    <div key={i} style={{ 
                        position: 'absolute', 
                        top: `${pos * 100}%`, 
                        left: '-4px', 
                        width: '10px', 
                        height: '4px', 
                        backgroundColor: 'var(--text-main)', 
                        borderRadius: '2px', 
                        opacity: 0.6 
                    }} />
                ))}
            </motion.div>
        </div>
    );
}
