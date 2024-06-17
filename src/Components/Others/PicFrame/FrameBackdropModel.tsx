import { motion } from 'framer-motion';
import Backdrop from '../BackdropModel/Backdrop/Backdrop';
import { SpringSuspense } from '../../../Data/Constants';

const FrameBackdropModel = ({ children, backgroundColor }: any) => {
    return (
        <Backdrop backgroundColor={backgroundColor}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="windowBackdropModel"
                variants={SpringSuspense}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {children}
            </motion.div>
        </Backdrop>
    );
};

export default FrameBackdropModel;
