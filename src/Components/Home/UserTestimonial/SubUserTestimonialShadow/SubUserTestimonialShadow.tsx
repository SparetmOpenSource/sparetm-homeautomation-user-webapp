import { motion } from 'framer-motion';
import './SubUserTestimonialShadow.css';

const SubUserTestimonialShadow = (props: any) => {
    return (
        <motion.li
            style={{
                background:
                    props.id === props.selectedId ? 'rgb(255,255,255,0.1)' : '',
            }}
            className="userTestimonial_list_box_shadow"
        ></motion.li>
    );
};

export default SubUserTestimonialShadow;
