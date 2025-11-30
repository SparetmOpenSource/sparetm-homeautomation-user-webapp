import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import './WindowDrop.css';
import { SpringSuspense } from '../../../../Data/Constants';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import BackDrop from '../BackDrop';
import { useEffect, useRef, useState } from 'react';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';

const WindowDrop = ({
    children,
    background,
    handleClose,
    darkTheme,
    showButton,
    enableBackdropClose,
    size,
    drag,
}: any) => {
    const constraintsRef = useRef(null);
    const [color, setColor] = useState<any>(light_colors);
    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <BackDrop
            onClick={enableBackdropClose ? handleClose : undefined}
            background={background}
        >
            <motion.div
                drag={drag}
                ref={constraintsRef}
                dragConstraints={constraintsRef}
                onClick={(e) => e.stopPropagation()}
                className="window"
                variants={SpringSuspense}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ height: size[0], width: size[1] }}
            >
                {showButton && (
                    <CloseButton onClick={handleClose} color={color?.button} />
                )}
                {children}
            </motion.div>
        </BackDrop>
    );
};

const CloseButton = ({ onClick, color }: any) => (
    <motion.div
        className="window_close_button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
    >
        <IconContext.Provider value={{ size: '2em', color: color }}>
            <span>
                <AiOutlineCloseCircle />
            </span>
        </IconContext.Provider>
    </motion.div>
);
export default WindowDrop;
