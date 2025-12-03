import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock } from 'react-icons/fa';
import { useTheme } from '../../../Pages/ThemeProvider';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import './LockScreen.css';

interface LockScreenProps {
    onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
    const darkTheme = useTheme();
    const colors = darkTheme ? dark_colors : light_colors;
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleUnlock = () => {
        setIsUnlocking(true);
        setTimeout(() => {
            onUnlock();
        }, 500);
    };

    return (
        <AnimatePresence>
            {!isUnlocking && (
                <motion.div
                    className="lock-screen"
                    initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    animate={{ opacity: 1, backdropFilter: 'blur(15px)' }}
                    exit={{ opacity: 0, backdropFilter: 'blur(0px)', y: -1000 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        backgroundColor: `${colors.outer}CC`, // High opacity background
                        color: colors.text,
                    }}
                >
                    <div className="lock-content">
                        <div className="lock-time">
                            <h1>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h1>
                            <p>{time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                        </div>

                        <motion.button
                            className="unlock-button"
                            onClick={handleUnlock}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                backgroundColor: colors.button,
                                color: '#fff',
                            }}
                        >
                            <FaLock className="lock-icon" />
                            <span>Click to Unlock</span>
                        </motion.button>
                        
                        <p className="lock-hint">Security Timeout Active</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LockScreen;
