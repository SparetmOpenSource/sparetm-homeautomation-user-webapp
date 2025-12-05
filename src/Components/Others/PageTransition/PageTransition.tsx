import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import useLocalStorage from '../../../Hooks/UseLocalStorage';

interface PageTransitionProps {
    children: ReactNode;
}

// macOS-style animation (scale + fade)
const animations = {
    initial: { 
        opacity: 0,
        scale: 0.95,
    },
    animate: { 
        opacity: 1,
        scale: 1,
    },
    exit: { 
        opacity: 0,
        scale: 1.05,
    },
};

// No animation (instant)
const noAnimations = {
    initial: { opacity: 1, scale: 1 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 1, scale: 1 },
};

const PageTransition = ({ children }: PageTransitionProps) => {
    const [animationsEnabled] = useLocalStorage('pageTransitionsEnabled', true);

    return (
        <motion.div
            variants={animationsEnabled ? animations : noAnimations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ 
                duration: animationsEnabled ? 0.35 : 0,
                ease: [0.4, 0.0, 0.2, 1],
            }}
            style={{ 
                width: '100%', 
                height: '100%',
            }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
