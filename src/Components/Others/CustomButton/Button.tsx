import { motion } from "framer-motion";
import './Button.css';

const Button = (props: any) => {
    const status: boolean = props.status ? props.status : false;
    return (
     <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="custom_btn"
            onClick={props.fn}
            style={{
                margin: '1em 0',
                padding: '0.5em 0',
                width: props.width,
                background: status ? 'rgb(226, 255, 0, 0.1)' : props.backCol,
                color: props.textCol,
            }}
            disabled={status}
            type="submit"
        >
            {props.label}
            </motion.button>
  )
}

export default Button