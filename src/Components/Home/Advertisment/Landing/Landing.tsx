import RaspberryPi from './../../../../Assets/HomeRaspberryPi.svg';
import NodeMCU from './../../../../Assets/HomeNodeMCU.svg';
import Arduino from './../../../../Assets/HomeArduino.svg';
import ConnectDevice from './../../../../Assets/HomeConnectDevice.svg';
import HomeSvg from './../../../../Assets/Home.svg';
import SpeakAlexa from './../../../../Assets/HomeSpeakAlexa.svg';
import { HomePageTypography } from './../../../../Data/HomePageConstant';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import BrandCanvas from '../../BrandCanvas/BrandCanvas';
import Typed from 'typed.js';
import './Landing.css';

const Landing = () => {
    const item1: any = useRef(null);
    const typed1: any = useRef(null);
    const item2: any = useRef(null);
    const typed2: any = useRef(null);

    useEffect(() => {
        const options = {
            strings: [
                'turn on <strong>light</strong>&#128161;',
                'play <strong>music</strong>&#127911;',
                'turn on <strong>fan</strong>&#127905; ',
            ],
            typeSpeed: 50,
            backSpeed: 50,
            loop: true,
        };
        const options2 = {
            strings: [
                'turn on <strong>light</strong>&#128161;',
                'play <strong>music</strong>&#127911;',
                'turn on <strong>fan</strong>&#127905; ',
            ],
            typeSpeed: 50,
            backSpeed: 50,
            loop: true,
        };
        typed1.current = new Typed(item1.current, options);
        typed2.current = new Typed(item2.current, options2);
        return () => {
            typed1.current.destroy();
            typed2.current.destroy();
        };
    }, []);

    return (
        <div className="landing">
            <div className="landing_content">

                {/* ************************first-colon************************** */}
                
                <section className="landing_content_col_1">
                    <span className="landing_content_col_1_row_1">
                        <img
                            src={HomeSvg}
                            loading="lazy"
                            height="80%"
                            width="80%"
                            alt="landing_img"
                        />
                        <div className="landing_content_col_1_row_1_slider_bck">
                            <h1>{HomePageTypography.page_1.col_1_row_1}</h1>
                        </div>
                    </span>
                    <span className="landing_content_col_1_row_2">
                        <BrandCanvas />
                    </span>
                </section>

                {/* ************************second-colon************************** */}

                <section className="landing_content_col_2">
                    <span className="landing_content_col_2_row_1">
                        <img
                            src={ConnectDevice}
                            loading="lazy"
                            height="80%"
                            width="80%"
                            alt="landingUI"
                        />
                        <div className="landing_content_col_2_row_1_slider_bck">
                            <h1>
                                <i>Alexa</i>,{' '}
                                <span
                                    style={{
                                        whiteSpace: 'pre',
                                        color: '#E2FF00',
                                    }}
                                    ref={item2}
                                />
                            </h1>
                        </div>
                    </span>
                    <span className="landing_content_col_2_row_2">
                        <img
                            src={SpeakAlexa}
                            loading="lazy"
                            height="80%"
                            width="80%"
                            alt="security"
                        />

                        <div className="landing_content_col_2_row_2_slider_bck">
                            <h1>
                                <i>Alexa</i>,{' '}
                                <span
                                    style={{
                                        whiteSpace: 'pre',
                                        color: '#E2FF00',
                                    }}
                                    ref={item1}
                                />
                            </h1>
                        </div>
                    </span>
                </section>

                {/* ************************third-colon************************** */}

                <section className="landing_content_col_3">
                    <span className="landing_content_col_3_row_1">
                        <motion.img
                            whileHover={{
                                scale: [1.1, 0.9, 1.1],
                                rotate: [0, 10, -10, 0],
                            }}
                            src={RaspberryPi}
                            loading="lazy"
                            height="95%"
                            width="95%"
                            alt="raspberry"
                        />
                    </span>
                    <span className="landing_content_col_3_row_2">
                        <motion.img
                            whileHover={{
                                scale: [1.1, 0.9, 1.1],
                                rotate: [0, 10, -10, 0],
                            }}
                            src={NodeMCU}
                            loading="lazy"
                            height="80%"
                            width="80%"
                            alt="nodemcu"
                        />
                    </span>
                    <span className="landing_content_col_3_row_3">
                        <motion.img
                            whileHover={{
                                scale: [1.1, 0.9, 1.1],
                                rotate: [0, 10, -10, 0],
                            }}
                            src={Arduino}
                            loading="lazy"
                            height="80%"
                            width="80%"
                            alt="arduino"
                        />
                    </span>
                </section>
            </div>
        </div>
    );
};

export default Landing;
