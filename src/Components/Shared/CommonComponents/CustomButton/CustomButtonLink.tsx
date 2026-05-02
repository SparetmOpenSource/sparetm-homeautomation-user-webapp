import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Button.css';

const CustomButtonLink = (props: any) => {
    return (
        <Link to={props.to} className="link_val">
            <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={props.fn}
                className={
                    props.active === true
                        ? 'link_custom_btn link_custom_btn_active'
                        : 'link_custom_btn'
                }
            >
                {props.label}
            </motion.button>
        </Link>
    );
};

export default CustomButtonLink;
