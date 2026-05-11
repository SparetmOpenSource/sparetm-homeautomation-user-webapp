import { motion } from 'framer-motion';
import './Button.css';

// fn, status, width, height, backCol, textCol, border, label
const Button = (props: any) => {
    const status: boolean = props?.status ? props?.status : false;
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="custom_btn"
            onClick={props.fn}
            style={{
                margin: '1em 0',
                padding: '0.5em 0',
                width: props?.width,
                height: props?.height ? props?.height : 'auto',
                background: props?.backCol,
                color: props?.textCol,
                border: `2px solid ${props?.border}`,
            }}
            disabled={status}
            type="submit"
        >
            {props.label}
        </motion.button>
    );
};

export default Button;
