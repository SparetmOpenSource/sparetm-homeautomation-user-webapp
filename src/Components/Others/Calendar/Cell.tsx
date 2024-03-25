import { motion } from 'framer-motion';
import './Calendar.css';

const Cell = ({ onClick, children, isActive = false }: any) => {
    return (
        <motion.div
            whileHover={{
                scale: 0.9,
            }}
            whileTap={{ scale: 0.7 }}
            onClick={!isActive ? onClick : undefined}
            className="cell_container"
            style={{
                border: isActive ? '2px solid orangered' : '',
                borderRadius: isActive ? ' 0.5em' : '',
            }}
        >
            {children}
        </motion.div>
    );
};

export default Cell;
