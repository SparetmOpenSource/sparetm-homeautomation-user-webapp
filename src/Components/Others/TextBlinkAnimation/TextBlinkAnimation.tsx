import { motion, useAnimationControls } from 'framer-motion';
import { useState } from 'react';
import './TextBlinkAnimation.css';

const TextBlinkAnimation = ({
    children,
    color,
    size,
    height,
    weight,
    opacity,
    customClass,
    customStyle
}: any) => {
    const controls = useAnimationControls();
    const [isPlaying, setIsPlaying] = useState(false);
    const rubberBand = () => {
        controls.start({
            transform: [
                'scale3d(1,1,1)',
                'scale3d(1.4,0.55,1)',
                'scale3d(0.75,1.25,1)',
                'scale3d(1.25,0.85,1)',
                'scale3d(0.9,1.05,1)',
                'scale3d(1,1,1)',
            ],
            transition: { times: [0, 0.4, 0.6, 0.7, 0.8, 0.9] },
        });
        setIsPlaying(true);
    };
    return (
        <motion.div
            animate={controls}
            onMouseOver={() => {
                if (!isPlaying) {
                    rubberBand();
                }
            }}
            onAnimationComplete={() => setIsPlaying(false)}
            className={`textBlinkAnimation ${customClass || ''}`}
            style={{
                color: color,
                fontSize: size,
                lineHeight: height,
                fontWeight: weight,
                opacity: opacity,
                ...customStyle
            }}
        >
            {children}
        </motion.div>
    );
};

export default TextBlinkAnimation;
