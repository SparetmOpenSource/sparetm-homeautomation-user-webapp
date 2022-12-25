import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { SpringSuspense } from './../../../../Data/Constant';
import CustomButton from '../../Button/CustomButton';
import Backdrop from '../Backdrop/Backdrop';
import './ConfirmationBackdropModel.css';

const ConfirmationBackdropModel = ({
    handleClose,
    setConfirmation,
    text,
    btn_text,
    backdropColor,
}: any) => {
    return (
        <Backdrop onClick={handleClose} backdropColor={backdropColor}>
            <motion.div
                drag
                onClick={(e) => e.stopPropagation()}
                className="confirmationBackdropModel"
                variants={SpringSuspense}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <ConfirmationModalButton onClick={handleClose} />
                {text}
                <span className="backdropModel_btn_container">
                    <CustomButton
                        label={btn_text}
                        textCol="black"
                        backCol="#e2ff00"
                        width="250px"
                        fn={setConfirmation}
                    />
                    <CustomButton
                        label="Naah, Just Kidding"
                        textCol="black"
                        backCol="#e2ff00"
                        width="250px"
                        fn={handleClose}
                    />
                </span>
            </motion.div>
        </Backdrop>
    );
};

const ConfirmationModalButton = ({ onClick }: any) => (
    <motion.div
        className="confirmation_modal_button"
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
export default ConfirmationBackdropModel;
