import { motion } from 'framer-motion';
import { page_2_content_list as Items } from './../../../../Data/HomePageConstant';
import './AppFeatureAnimation.css';

const AppFeatureAnimation = () => {
    const imageAnimate = {
        offscreen: { x: -100, opacity: 0 },
        onscreen: {
            x: 0,
            opacity: 1,
            rotate: [0, 10, 0],
            transition: { type: 'spring', bounce: 0.4, duration: 1 },
        },
    };

    const textAnimate = {
        offscreen: { y: 100, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', bounce: 0.4, duration: 1 },
        },
    };

    const Card = ({ image1, image2, image3, h1, p, id }: any) => {
        return (
            <motion.div
                className="appFeatureAnimation_card"
                id={id}
                initial={'offscreen'}
                whileInView={'onscreen'}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ staggerChildren: 0.5 }}
            >
                <span className="appFeatureAnimation_card_info">
                    <motion.h1 variants={textAnimate}>{h1}</motion.h1>
                    <motion.p
                        style={{ color: 'lavender' }}
                        variants={textAnimate}
                    >
                        {p}
                    </motion.p>
                </span>

                <motion.div className="appFeatureAnimation_image_container">
                    <motion.span
                        className="appFeatureAnimation_image_container_img_1"
                        variants={imageAnimate}
                        style={{
                            background: '#1F2123',
                        }}
                    >
                        <img
                            src={image1}
                            loading="lazy"
                            height="100%"
                            width="100%"
                            alt="app_feature_img"
                        />
                    </motion.span>
                    <motion.span
                        className="appFeatureAnimation_image_container_img_2"
                        variants={imageAnimate}
                        style={{ background: '#1F2123' }}
                    >
                        <img
                            src={image2}
                            loading="lazy"
                            height="100%"
                            width="100%"
                            alt="ui-design"
                        />
                    </motion.span>
                    <motion.span
                        className="appFeatureAnimation_image_container_img_3"
                        variants={imageAnimate}
                        style={{ background: '#1F2123' }}
                    >
                        <img
                            src={image3}
                            loading="lazy"
                            height="100%"
                            width="100%"
                            alt="ui-design"
                        />
                    </motion.span>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <div className="appFeatureAnimation">
            <div className="appFeatureAnimation_card_wrapper">
                {Items.map((item) => (
                    <Card
                        key={item.id}
                        image1={item.image1}
                        image2={item.image2}
                        image3={item.image3}
                        h1={item.h1}
                        p={item.p}
                        id={item.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default AppFeatureAnimation;
