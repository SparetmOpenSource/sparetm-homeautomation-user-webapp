import './CustomButton.css';
import { motion } from 'framer-motion';

const CustomButton = (props: any) => {
    const status: boolean = props.status ? props.status : false;
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="custom_btn"
            onClick={props.fn}
        >
            <button
                style={{
                    margin: '1em 0',
                    width: props.width,
                    background: status
                        ? 'rgb(226, 255, 0, 0.1)'
                        : props.backCol,
                    color: props.textCol,
                }}
                disabled={status}
                type="submit"
            >
                {props.label}
            </button>
        </motion.div>
    );
};

export default CustomButton;
