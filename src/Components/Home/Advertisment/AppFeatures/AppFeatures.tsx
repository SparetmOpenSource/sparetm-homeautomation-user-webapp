import { motion } from 'framer-motion';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import { MdLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { HomePageTypography } from '../../../../Data/HomePageConstant';
import AppFeatureAnimation from '../AppFeatureAnimation/AppFeatureAnimation';
import ScrollDown from './../../../../Assets/HomeScrollDown.svg';
import './AppFeatures.css';

const AppFeatures = () => {
    const [mode, setMode] = useState<boolean>(false);
    return (
        <div className="appFeatures" style={{ background: '#2E3438' }}>
            <div className="appFeatures_content">
                <section className="appFeatures_content_heading">
                    <span className="appFeatures_content_heading_row_1">
                        <p style={{ color: '#e2ff00' }}>APP FEATURES</p>
                        <h1 style={{ color: 'lavender' }}>
                            We created{' '}
                            <span style={{ color: '#00B5FF' }}>
                                modes for every situation.
                            </span>
                            <br />
                            Open bridge adapts to whatever life throws at you.
                        </h1>
                    </span>
                    <span className="appFeatures_content_heading_row_2">
                        <span className="appFeatures_content_heading_row_2_col_1">
                            <h1
                                style={{
                                    color: 'lavender',
                                }}
                            >
                                Switch themes
                            </h1>
                            <ul>
                                <li>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setMode(false)}
                                    >
                                        <IconContext.Provider
                                            value={{
                                                size: '2em',
                                                color: 'grey',
                                            }}
                                        >
                                            <span>
                                                <MdOutlineDarkMode />
                                            </span>
                                        </IconContext.Provider>
                                    </motion.div>
                                </li>
                                <li>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setMode(true)}
                                    >
                                        <IconContext.Provider
                                            value={{
                                                size: '2em',
                                                color: 'lavender',
                                            }}
                                        >
                                            <span>
                                                <MdLightMode />
                                            </span>
                                        </IconContext.Provider>
                                    </motion.div>
                                </li>
                            </ul>
                        </span>
                        <span className="appFeatures_content_heading_row_2_col_2">
                            {!mode && (
                                <span>
                                    <h1
                                        style={{
                                            color: 'lavender',
                                        }}
                                    >
                                        Dark Mode
                                    </h1>
                                    <p
                                        style={{
                                            color: '#909ba6',
                                        }}
                                    >
                                        {HomePageTypography.page_2.dark}
                                    </p>
                                </span>
                            )}
                            {mode && (
                                <span>
                                    <h1
                                        style={{
                                            color: 'lavender',
                                        }}
                                    >
                                        Light Mode
                                    </h1>
                                    <p
                                        style={{
                                            color: '#909ba6',
                                        }}
                                    >
                                        {HomePageTypography.page_2.light}
                                    </p>
                                </span>
                            )}
                        </span>
                    </span>
                </section>
                <section className="appFeatures_content_featureList">
                    <span className="appFeatures_content_featureList_scroll_btn">
                        <img
                            className="appFeatures_bounce_arrow"
                            src={ScrollDown}
                            height="4%"
                            width="4%"
                            loading="lazy"
                            alt="scroll_icon"
                        />
                    </span>
                    <span className="appFeatures_content_featureList_background_text">
                        UI / UX
                    </span>
                    <AppFeatureAnimation />
                </section>
            </div>
        </div>
    );
};

export default AppFeatures;
