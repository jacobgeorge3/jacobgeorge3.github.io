import React, { useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ClimbingEngine() {
    const { scrollYProgress } = useScroll();

    // The magic "catch-up" easing physics!
    // Instead of snapping immediately to the scroll position, it smoothly animates there.
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 20,
        restDelta: 0.001
    });

    // Transform 0-1 progress into pixel values to move the character down the screen
    // (Assuming a total scrollable height approximation for now)
    const yPos = useTransform(smoothProgress, [0, 1], [0, window.innerHeight * 2]);

    // Clean Up verification
    useEffect(() => {
        console.log("Climbing Engine Mounted: Scroll tracking active.");

        // In complex engines, we would clear intervals or drop Canvas contexts here.
        return () => {
            console.log("Climbing Engine Unmounted: Memory freed. Returning to pristine state.");
        };
    }, []);

    return (
        <div
            className="climbing-sandbox"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none', // Lets user click the links underneath
                zIndex: 50
            }}
        >
            {/* The Central Rope */}
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    backgroundColor: 'var(--text-muted)',
                    opacity: 0.3
                }}
            />

            {/* The Climber Character */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: 'calc(50% - 15px)', // Center the 30px width character on the rope
                    top: 0,
                    width: '30px',
                    height: '40px',
                    backgroundColor: 'var(--accent-color)', // That "climbing rope orange"
                    borderRadius: '4px',
                    y: yPos // Bound to the smooth spring physics
                }}
            />
        </div>
    );
}
