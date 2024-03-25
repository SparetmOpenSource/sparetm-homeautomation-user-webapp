import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import Backdrop from '../Backdrop/Backdrop';
import './WindowBackdropModel.css';
import { SpringSuspense } from '../../../../Data/Constants';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const WindowBackdropModel = ({
    handleClose,
    children,
    foregroundColor,
    backgroundColor,
}: any) => {
    return (
        <Backdrop onClick={handleClose} backgroundColor={backgroundColor}>
            <motion.div
                // drag
                onClick={(e) => e.stopPropagation()}
                className="windowBackdropModel"
                variants={SpringSuspense}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <ConfirmationModalButton onClick={handleClose} />
                {children}
            </motion.div>
        </Backdrop>
    );
};
const ConfirmationModalButton = ({ onClick }: any) => (
    <motion.div
        className="window_modal_button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
    >
        <IconContext.Provider value={{ size: '2em' }}>
            <span>
                <AiOutlineCloseCircle />
            </span>
        </IconContext.Provider>
    </motion.div>
);
export default WindowBackdropModel;
