import { motion } from 'framer-motion';
import './SubUserTestimonialBox.css';

const SubUserTestimonialBox = (props: any) => {
    return (
        <motion.div
            layoutId={props.id}
            whileHover={{
                scale: 1,
            }}
            onClick={() => props.setSelectedId(props.id)}
            className="userTestimonial_list_box"
        >
            <span className="userTestimonial_list_box_title">
                &ldquo;
                <p>
                    <b>{props.title}</b>
                </p>
                &rdquo;
            </span>
            <span className="userTestimonial_list_box_description">
                <p>{props.description}</p>
            </span>
            <span className="userTestimonial_list_box_expand">
                <p>Click to read more</p>
            </span>
        </motion.div>
    );
};

export default SubUserTestimonialBox;
