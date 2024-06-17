import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Backdrop from '../Backdrop/Backdrop';
import './InformationBackdropModel.css';
import { SpringSuspense } from '../../../../Data/Constants';

const InformationBackdropModel = ({
    handleClose,
    backgroundColor,
    children,
}: any) => {
    return (
        <Backdrop onClick={handleClose} backgroundColor={backgroundColor}>
            <motion.div
                // drag
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
