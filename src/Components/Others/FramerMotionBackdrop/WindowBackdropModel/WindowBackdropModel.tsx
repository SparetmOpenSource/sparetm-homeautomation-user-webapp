import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { SpringSuspense } from './../../../../Data/Constant';
import Backdrop from '../Backdrop/Backdrop';
import './WindowBackdropModel.css';

const WindowBackdropModel = ({ handleClose, children, backdropColor }: any) => {
    return (
        <Backdrop onClick={handleClose} backdropColor={backdropColor}>
            <motion.div
                drag
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
