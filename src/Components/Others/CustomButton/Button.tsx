import { motion } from 'framer-motion';
import './Button.css';

//fn, status, width, backColOnDis, backCol, textCol, border, label;
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
                // background: status ? props?.backColOnDis : props?.backCol,
                background: props?.backCol,
                // color: status
                //     ? `${props?.textCol?.split(')')[0]},0.5)`
                //     : props?.textCol,
                color: props?.textCol,
                // border: status
                //     ? `2px solid ${props?.border?.split(')')[0]},0.5)`
                //     : `2px solid ${props?.border}`,
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
