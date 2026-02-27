import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import ClimberSprite from './assets/ClimberSprite';
import AlpineBackground from './assets/AlpineBackground';

export default function ClimbingEngine() {
    const { scrollYProgress, scrollY } = useScroll();
    const [swingingTo, setSwingingTo] = useState(null);

    // The magic "catch-up" easing physics!
    // Instead of snapping immediately to the scroll position, it smoothly animates there.
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 20,
        restDelta: 0.001
    });

    // Transform 0-1 progress into pixel values to move the character down the screen
    // We use document.documentElement.scrollHeight to get the full page height,
    // subtracting window height so 1.0 progress means the climber is at the bottom of the viewport at the bottom of the page.
    const [pageHeight, setPageHeight] = useState(2000); // Fallback
    const [windowHeight, setWindowHeight] = useState(800);

    useEffect(() => {
        const updateHeights = () => {
            setPageHeight(document.documentElement.scrollHeight);
            setWindowHeight(window.innerHeight);
        };

        updateHeights();
        window.addEventListener('resize', updateHeights);

        // Listen for custom trigger to start swing animation before navigation
        const handleSwingEvent = (e) => {
            const { targetX, targetY, href } = e.detail;
            setSwingingTo({ x: targetX, y: targetY });

            // Wait for duration of swing (0.5s) then navigate
            setTimeout(() => {
                window.location.href = href;
            }, 600);
        };
        window.addEventListener('climber-swing', handleSwingEvent);

        return () => {
            window.removeEventListener('resize', updateHeights);
            window.removeEventListener('climber-swing', handleSwingEvent);
        };
    }, []);

    const yPos = useTransform(smoothProgress, [0, 1], [0, pageHeight - windowHeight]);



    // The horizontal position of the rope/climber (the "Gutter")
    // On desktop, we put it in the left margin. On mobile, we might keep it further left or hide it.
    const gutterLeft = '10%';

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
            {/* The Alpine Background Parallax */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 1.05 }}
                animate={{ opacity: 0.5, y: 0, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    y: useTransform(smoothProgress, [0, 1], [0, -300]), // Slight parallax scrolling
                    zIndex: -1
                }}
            >
                <AlpineBackground style={{ position: 'absolute', bottom: 0, width: '100%', height: 'auto' }} />
            </motion.div>

            {/* The Central Rope -> Moved to Gutter */}
            <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.3 }}
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
            />

            {/* The Climber Character Container (Handles Scroll) */}
            <motion.div
                style={{
                    position: 'absolute',
                    left: `calc(${gutterLeft} - 20px)`, // Center the 40px width sprite on the rope
                    top: 0,
                    y: yPos // Bound strictly to scroll physics
                }}
            >
                {/* The Climber Sprite (Handles Entrance Animation & Swing overrides) */}
                <motion.div
                    // If swingingTo is set, override the normal X layout to swing to the card!
                    animate={swingingTo ? {
                        x: swingingTo.x,
                        // Note: we can't easily animate Y here without fighting the scroll tracker.
                        // But since the project card is already exactly where the cursor clicked it, 
                        // scrolling over horizontally works fine as a "swing"
                        rotate: 35 // lean into the jump
                    } : {
                        y: 0,
                        x: 0,
                        opacity: 1
                    }}
                    initial={{ y: -150, opacity: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: swingingTo ? 90 : 70,
                        damping: swingingTo ? 15 : 12,
                        delay: swingingTo ? 0 : 0.6
                    }}
                >
                    <ClimberSprite width={40} height={60} />
                </motion.div>
            </motion.div>
        </div>
    );
}
