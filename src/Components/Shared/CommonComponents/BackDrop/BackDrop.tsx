import { motion } from 'framer-motion';
import './BackDrop.css';

const BackDrop = ({ children, onClick, background }: any) => {
    return (
        <motion.div
            style={{ background: background }}
            className="backDrop"
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    );
};

export default BackDrop;
