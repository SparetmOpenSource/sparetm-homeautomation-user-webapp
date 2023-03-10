import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { SpringSuspense } from './../../../../Data/Constant';
import Backdrop from '../Backdrop/Backdrop';
import './InformationBackdropModel.css';

const InformationBackdropModel = ({
    handleClose,
    backdropColor,
    children,
}: any) => {
    return (
        <Backdrop onClick={handleClose} backdropColor={backdropColor}>
            <motion.div
                drag
                onClick={(e) => e.stopPropagation()}
                className="informationBackdropModel"
                variants={SpringSuspense}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <ModalCloseButton onClick={handleClose} />
                {children}
            </motion.div>
        </Backdrop>
    );
};
const ModalCloseButton = ({ onClick }: any) => (
    <motion.div
        className="information_modal_button"
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

export default InformationBackdropModel;
