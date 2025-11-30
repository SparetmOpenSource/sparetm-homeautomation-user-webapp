import { motion } from 'framer-motion';
import './Backdrop.css';

const Backdrop = ({ children, onClick, background}: any) => {
    return (
        <motion.div
            style={{ background: background}}
            className="backdrop"
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    );
};

export default Backdrop;
