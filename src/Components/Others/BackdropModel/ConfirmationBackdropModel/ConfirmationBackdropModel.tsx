import { motion } from 'framer-motion';
import Backdrop from '../Backdrop/Backdrop';
import './ConfirmationBackdropModel.css';
import { SpringSuspense } from '../../../../Data/Constants';
import Button from '../../CustomButton/Button';
import { IconContext } from 'react-icons';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const ConfirmationBackdropModel = ({
    handleClose,
    setConfirmation,
    text,
    btn_text,
    foregroundColor,
    backgroundColor,
}: any) => {
    return (
        <Backdrop onClick={handleClose} backgroundColor={backgroundColor}>
            <motion.div
                // drag
                onClick={(e) => e.stopPropagation()}
                className="confirmationBackdropModel"
                variants={SpringSuspense}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ background: foregroundColor }}
            >
                <ConfirmationModalButton onClick={handleClose} />
                {text}
                <span className="confirmationBackdropModel_btn_container">
                    <Button
                        label={btn_text}
                        textCol="black"
                        backCol="rgb(8,246,125)"
                        width="250px"
                        fn={setConfirmation}
                    />
                    <Button
                        label="Naah, Just Kidding"
                        textCol="black"
                        backCol="rgb(8,246,125)"
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
        className="confirmationBackdropModel_modal_button"
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
