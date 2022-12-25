import { motion } from 'framer-motion';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Rating } from 'react-simple-star-rating';
import { FaQuoteLeft } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import './SubUserTestimonialBoxAfter.css';

const SubUserTestimonialBoxAfter = (props: any) => {
    return (
        <motion.div
            layoutId={props.selectedId}
            className="userTestimonial_list_box_after"
        >
            <span className="userTestimonial_list_box_after_content">
                <section className="userTestimonial_list_box_after_content_col_1">
                    <IconContext.Provider value={{ size: '1.5em' }}>
                        <span>
                            <FaQuoteLeft />
                        </span>
                    </IconContext.Provider>
                </section>
                <section className="userTestimonial_list_box_after_content_col_2">
                    <section className="userTestimonial_list_box_after_content_col_2_row_1">
                        <p>
                            {
                                props.items.find(
                                    (x: { id: any }) =>
                                        x.id === props.selectedId,
                                )?.description
                            }
                        </p>
                    </section>
                    <section className="userTestimonial_list_box_after_content_col_2_row_2">
                        <span>
                            {
                                props.items.find(
                                    (x: { id: any }) =>
                                        x.id === props.selectedId,
                                )?.dateAndTime
                            }
                        </span>
                        <span>
                            <Rating
                                initialValue={
                                    props.items.find(
                                        (x: { id: any }) =>
                                            x.id === props.selectedId,
                                    )?.rating
                                }
                                // ratingValue={0}
                                readonly={true}
                            />
                        </span>
                    </section>
                </section>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => props.setSelectedId(null)}
                    className="userTestimonial_list_box_after_content_closeBtn"
                >
                    <IconContext.Provider value={{ size: '1.5em' }}>
                        <span>
                            <AiOutlineCloseCircle />
                        </span>
                    </IconContext.Provider>
                </motion.div>
            </span>
        </motion.div>
    );
};

export default SubUserTestimonialBoxAfter;
