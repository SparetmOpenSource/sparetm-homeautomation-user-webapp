import { motion } from 'framer-motion';
import './Button.css';
import { Link } from 'react-router-dom';

const ButtonLink = (props: any) => {
    const status: boolean = props.status ? props.status : false;
    return (
        <Link to={props.to}>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                // className="custom_btn"
                className={
                    props.active === true
                        ? 'custom_btn link_custom_btn_active'
                        : 'custom_btn'
                }
                onClick={props.fn}
                style={{
                    margin: '1em 0',
                    padding: '0.5em 0',
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
            </motion.button>
        </Link>
    );
};

export default ButtonLink;
