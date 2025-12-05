import './Home.css';
import { GiCableStayedBridge } from 'react-icons/gi';
import { MdLightMode } from 'react-icons/md';
import {
    APPNAME,
    home_contact_social_list,
    PAGE_LOGGER,
    RoutePath,
    USE_ACTIVE_SETTINGS,
} from '../../Data/Constants';
import {
    displayToastify,
    doScroll,
    logger,
    observer,
} from '../../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../Data/Enum';
import { useEffect, useMemo, useRef, useState } from 'react';
import HomePage_SVG from './../../Asset/HomePage_SVG.svg';
import { useActive } from '../../Hooks/UseActive';
import { useNavigate } from 'react-router-dom';
import { useTheme, useThemeUpdate } from '../ThemeProvider';
import { dark_colors, light_colors } from '../../Data/ColorConstant';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { CiDark } from 'react-icons/ci';
import { GoDotFill } from 'react-icons/go';
import { GrHomeRounded } from 'react-icons/gr';
import { IoMdContacts } from 'react-icons/io';
import { FaHourglassStart } from 'react-icons/fa6';
import { FaArrowUpRightDots } from 'react-icons/fa6';
import { MdContentPasteSearch } from 'react-icons/md';
import FloatingCube from './FloatingCube/FloatingCube';
import { MdWeb } from 'react-icons/md';
import { FaCode } from 'react-icons/fa';
import { MdCloudSync } from 'react-icons/md';
import { FaFileSignature } from 'react-icons/fa6';
import { MdAddBusiness, MdDashboard } from 'react-icons/md';
import { MdOutlineConnectWithoutContact } from 'react-icons/md';

const Home = () => {
    const paragraphLandingRef: any = useRef(null);
    const paragraphStoryRef: any = useRef(null);
    const paragraphFeaturesRef: any = useRef(null);
    const paragraphStepsRef: any = useRef(null);
    const paragraphContactRef: any = useRef(null);
    const [status] = useActive(2000, true, USE_ACTIVE_SETTINGS);
    const toggleTheme: any = useThemeUpdate();
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const navigate = useNavigate();

    const tranValForMenu = 0.1;
    const tranValForText = 0.7;

    const MenuListt = [
        {
            id: 1,
            icon: status ? <GrHomeRounded /> : <GoDotFill />,
            ref: paragraphLandingRef,
        },
        {
            id: 2,
            icon: status ? <FaHourglassStart /> : <GoDotFill />,
            ref: paragraphStoryRef,
        },
        {
            id: 3,
            icon: status ? <MdContentPasteSearch /> : <GoDotFill />,
            ref: paragraphFeaturesRef,
        },
        {
            id: 4,
            icon: status ? <FaArrowUpRightDots /> : <GoDotFill />,
            ref: paragraphStepsRef,
        },
        {
            id: 5,
            icon: status ? <IoMdContacts /> : <GoDotFill />,
            ref: paragraphContactRef,
        },
    ];

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]);

    useEffect(() => {
        const hiddenElements = document.querySelectorAll('.hidden-el');
        hiddenElements.forEach((element) => {
            observer.observe(element);
        });
    }, []);

    logger(PAGE_LOGGER.home_page);

    return (
        <div className="home" style={{ backgroundColor: color?.outer }}>
            <motion.span
                className="home-theme-icon"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
            >
                <IconContext.Provider
                    value={useMemo(() => {
                        return {
                            size: '1.5em',
                            color: color?.button,
                        };
                    }, [color?.button])}
                >
                    {darkTheme ? <MdLightMode /> : <CiDark />}
                </IconContext.Provider>
            </motion.span>
            <span
                className="home-bounce-menu-wrapper"
                style={{
                    backgroundColor: status
                        ? color?.icon
                        : `rgb(34, 34, 34, ${tranValForMenu})`,
                }}
            >
                {MenuListt.map((item: any) => (
                    <motion.span
                        key={item?.id}
                        className="home-bounce-menu"
                        style={{
                            backgroundColor: status
                                ? color?.outer
                                : `rgb(62, 62, 62, ${tranValForMenu})`,
                        }}
                        initial={{ scale: 1 }}
                        whileHover={{
                            scale: 1.05,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        onClick={() => doScroll(item?.ref)}
                    >
                        <IconContext.Provider
                            value={{
                                size: '1.5em',
                                color: status
                                    ? color?.icon_font
                                    : `rgb(62, 62, 62, ${tranValForMenu})`,
                            }}
                        >
                            {item?.icon}
                        </IconContext.Provider>
                    </motion.span>
                ))}
                <motion.span
                    initial={{ scale: 1 }}
                    whileHover={{
                        scale: 1.05,
                    }}
                    whileTap={{
                        scale: 0.95,
                    }}
                    className="home-bounce-menu-login"
                    style={{
                        color: status ? color?.text : `rgb(62, 62, 62, ${0.5})`,
                        backgroundColor: status
                            ? color?.button
                            : `rgb(62, 62, 62, ${tranValForMenu})`,
                    }}
                    onClick={() => navigate(RoutePath.Auth)}
                >
                    Login
                </motion.span>
            </span>

            {/* page - 1 */}

            <section
                className="home-landing"
                ref={paragraphLandingRef}
                style={{ backgroundColor: color?.outer }}
            >
                <div
                    className="home-landing-logo"
                    style={{ color: color?.text }}
                >
                    {APPNAME}&nbsp;&nbsp;
                    <IconContext.Provider
                        value={useMemo(() => {
                            return {
                                size: '1.5em',
                                color: color?.button,
                            };
                        }, [color?.button])}
                    >
                        <GiCableStayedBridge />
                    </IconContext.Provider>
                </div>
                <h1 style={{ color: color?.button }}>
                    Take control of your smart home <br />
                    your way
                </h1>
                <h2
                    style={{
                        color: `${
                            color?.text?.split(')')[0]
                        }, ${tranValForText})`,
                    }}
                >
                    Empowering DIYers with open tools, smart tech, and the
                    freedom to create from anywhere
                </h2>

                {/* TODO: Customize UI/UX for Demo Button */}
                <motion.button
                    className="home-landing-demo-btn"
                    style={{
                        backgroundColor: color?.button,
                        color: color?.outer,
                        padding: '15px 40px',
                        fontSize: '1.1rem',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginTop: '20px',
                        fontWeight: 'bold',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                        displayToastify(
                            'Demo coming soon!',
                            !darkTheme
                                ? TOASTIFYCOLOR.DARK
                                : TOASTIFYCOLOR.LIGHT,
                            TOASTIFYSTATE.INFO,
                        )
                    }
                >
                    See Demo
                </motion.button>

                <div
                    className="home-landing-pic"
                    style={{ backgroundColor: color?.inner }}
                >
                    <img
                        src={HomePage_SVG}
                        height="100%"
                        width="100%"
                        loading="lazy"
                        alt="home_icon"
                    />
                </div>
            </section>

            {/* page - 2&3&4 */}

            <section className="home-intro">
                <div style={{ backgroundColor: color?.inner }}>
                    <section>
                        <h1
                            className="hidden-el"
                            style={{ color: color?.text }}
                        >
                            The story of{' '}
                            <span className="home-intro-text-style">
                                {APPNAME}
                            </span>{' '}
                            begins with curiosity.
                        </h1>
                    </section>
                    <section ref={paragraphStoryRef}>
                        <p
                            className="hidden-el"
                            style={{
                                color: `${
                                    color?.text?.split(')')[0]
                                }, ${tranValForText})`,
                            }}
                        >
                            From the beginning, we’ve been driven by a passion
                            for{' '}
                            <strong>
                                <i>electronics</i>
                            </strong>{' '}
                            and{' '}
                            <strong>
                                <i>coding</i>
                            </strong>
                            . Our vision has always been to build something
                            useful for{' '}
                            <strong>
                                <i>many people.</i>
                            </strong>{' '}
                            And yes — we’ve also experienced those everyday
                            inconveniences, like being too tired to get up and
                            turn off the lights at night.
                        </p>

                        <p
                            className="hidden-el"
                            style={{
                                color: `${
                                    color?.text?.split(')')[0]
                                }, ${tranValForText})`,
                            }}
                        >
                            <strong>
                                <i>That’s when it clicked.</i>
                            </strong>
                        </p>
                        <p
                            className="hidden-el"
                            style={{
                                color: `${
                                    color?.text?.split(')')[0]
                                }, ${tranValForText})`,
                            }}
                        >
                            With the support of the{' '}
                            <strong>
                                <i>open source</i>
                            </strong>{' '}
                            and{' '}
                            <strong>
                                <i>DIY community</i>
                            </strong>{' '}
                            — whom we deeply admire — we set out to build a{' '}
                            <strong>
                                <i>platform</i>
                            </strong>{' '}
                            that empowers makers and dreamers alike. A{' '}
                            <strong>
                                <i>home automation</i>
                            </strong>{' '}
                            system that’s not just smart and helpful, but also
                            open source and fully customizable.
                        </p>
                        <p
                            className="hidden-el"
                            style={{
                                color: `${
                                    color?.text?.split(')')[0]
                                }, ${tranValForText})`,
                            }}
                        >
                            It’s built for people who want to{' '}
                            <strong>
                                <i>learn</i>
                            </strong>
                            ,{' '}
                            <strong>
                                <i>create</i>
                            </strong>
                            , and even gain{' '}
                            <strong>
                                <i>recognition</i>
                            </strong>{' '}
                            for their{' '}
                            <strong>
                                <i>contributions.</i>
                            </strong>
                        </p>
                        <p
                            className="hidden-el"
                            style={{
                                color: `${
                                    color?.text?.split(')')[0]
                                }, ${tranValForText})`,
                            }}
                        >
                            If that sounds like you,{' '}
                            <strong>
                                <i>welcome aboard.</i>
                            </strong>
                        </p>
                    </section>
                </div>
                <div
                    ref={paragraphFeaturesRef}
                    style={{ backgroundColor: color?.outer }}
                >
                    <div className="home-intro-feature-container">
                        <div className="home-intro-feature-container-top">
                            <FloatingCube />
                            <div
                                className="home-intro-feature-container-top-stats"
                                style={{
                                    color: color?.text,
                                    borderLeft: `2px solid ${color?.text}`,
                                }}
                            >
                                <div className="home-intro-feature-container-top-stat">
                                    <p className="home-intro-feature-container-top-label">
                                        Interface
                                    </p>
                                    <p className="home-intro-feature-container-top-value blue">
                                        <IconContext.Provider
                                            value={useMemo(() => {
                                                return {
                                                    size: '1.5em',
                                                    color: color?.button,
                                                };
                                            }, [color?.button])}
                                        >
                                            <MdWeb />
                                        </IconContext.Provider>
                                    </p>
                                    <p className="home-intro-feature-container-top-description">
                                        React Web App <br />
                                        Deployed on Netlify <br />
                                        UI Enhancements Regularly
                                    </p>
                                </div>
                                <div className="home-intro-feature-container-top-stat">
                                    <p className="home-intro-feature-container-top-label">
                                        DIY
                                    </p>
                                    <p className="home-intro-feature-container-top-value blue">
                                        <IconContext.Provider
                                            value={useMemo(() => {
                                                return {
                                                    size: '1.5em',
                                                    color: color?.button,
                                                };
                                            }, [color?.button])}
                                        >
                                            <FaCode />
                                        </IconContext.Provider>
                                    </p>
                                    <p className="home-intro-feature-container-top-description">
                                        Setup Documentation <br />
                                        Custom Code Snippets <br />
                                        Regular Idea Updates
                                    </p>
                                </div>
                                <div className="home-intro-feature-container-top-stat">
                                    <p className="home-intro-feature-container-top-label">
                                        Real-Time
                                    </p>
                                    <p className="home-intro-feature-container-top-value green">
                                        <IconContext.Provider
                                            value={useMemo(() => {
                                                return {
                                                    size: '1.5em',
                                                    color: color?.button,
                                                };
                                            }, [color?.button])}
                                        >
                                            <MdCloudSync />
                                        </IconContext.Provider>
                                    </p>
                                    <p className="home-intro-feature-container-top-description">
                                        Appliance State Sync <br />
                                        Real-time Updates <br />
                                        Unified Control System
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="home-intro-feature-container-content"
                            style={{ color: color?.text }}
                        >
                            <p className="hidden-el">
                                <strong className="home-intro-text-style">
                                    Modern Web Interface:{' '}
                                </strong>
                                <span
                                    style={{
                                        color: `${
                                            color?.text?.split(')')[0]
                                        }, ${tranValForText})`,
                                    }}
                                >
                                    {' '}
                                    Our system comes with a{' '}
                                    <strong>
                                        <i>visually appealing</i>
                                    </strong>
                                    , An intuitive{' '}
                                    <strong>
                                        <i>web-based</i>
                                    </strong>{' '}
                                    interface designed for{' '}
                                    <strong>
                                        <i>Seamless appliance control</i>
                                    </strong>
                                    . Whether you're turning on the lights,
                                    adjusting the fan speed, or checking the
                                    status of your devices, the user interface
                                    ensures a smooth and a responsive
                                    experience. With just a few taps or clicks,
                                    you can manage your entire home environment
                                    in{' '}
                                    <strong>
                                        <i>real-time</i>
                                    </strong>
                                    , right from Your browser.
                                </span>
                            </p>
                            <p className="hidden-el">
                                <strong className="home-intro-text-style">
                                    DIY-Friendly Code:{' '}
                                </strong>
                                <span
                                    style={{
                                        color: `${
                                            color?.text?.split(')')[0]
                                        }, ${tranValForText})`,
                                    }}
                                >
                                    {' '}
                                    For those who love to tinker and build,
                                    We’ve got you covered. All our code is
                                    <strong>
                                        <i> thoroughly documented, </i>
                                    </strong>
                                    making it easy for
                                    <strong>
                                        <i> DIY enthusiasts and developers</i>
                                    </strong>{' '}
                                    to explore, Modify or expand the system.
                                    Whether you're integrating new sensors,
                                    customizing controls, or simply learning how
                                    everything works, the clear and{' '}
                                    <strong>
                                        <i>structured codebase </i>
                                    </strong>
                                    empowers you to create your own{' '}
                                    <strong>
                                        <i>tailored solutions.</i>
                                    </strong>
                                </span>
                            </p>
                            <p className="hidden-el">
                                <strong className="home-intro-text-style">
                                    Real-Time Sync:{' '}
                                </strong>
                                <span
                                    style={{
                                        color: `${
                                            color?.text?.split(')')[0]
                                        }, ${tranValForText})`,
                                    }}
                                >
                                    {' '}
                                    One of the core features of our system is
                                    <strong>
                                        <i> full appliance synchronization</i>
                                    </strong>
                                    . Any change made to the state of an
                                    appliance, it through the UI, physical
                                    switches, or voice The commands are{' '}
                                    <strong>
                                        <i>instantly reflected</i>
                                    </strong>{' '}
                                    across all connected devices and dashboards.
                                    This
                                    <strong>
                                        <i> Real-time sync</i>
                                    </strong>{' '}
                                    ensures accuracy, consistency, and
                                    convenience, no matter where Or how you
                                    interact with your home.
                                </span>
                            </p>
                        </div>
                    </div>
                    {/*  */}
                </div>
                <div
                    ref={paragraphStepsRef}
                    className="hidden-el"
                    style={{
                        backgroundColor: color?.inner, 
                    }}
                >
                    <div
                        style={{
                            // Grid styles are now in CSS under .home-intro > :last-child > div
                        }}
                    >
                        {[
                            {
                                icon: <FaFileSignature />,
                                title: 'Create Your Profile',
                                description:
                                    'Join to unlock personalized features. Configure your rooms and location for real-time weather updates and a tailored automation experience.',
                            },
                            {
                                icon: <MdDashboard />,
                                title: 'Personalize Dashboard',
                                description:
                                    'Customize your interface to match your workflow. Organize devices, tweak settings, and control your environment effortlessly.',
                            },
                            {
                                icon: <MdOutlineConnectWithoutContact />,
                                title: 'Connect Your Devices',
                                description:
                                    'Access step-by-step guides for ESP32, ESP8266, and Raspberry Pi. Seamlessly integrate your custom circuits and start controlling your hardware.',
                            },
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                style={{
                                    backgroundColor: darkTheme
                                        ? color?.element
                                        : color?.card,
                                    border: `1px solid ${
                                        darkTheme
                                            ? 'rgba(255,255,255,0.05)'
                                            : 'rgba(0,0,0,0.05)'
                                    }`,
                                    boxShadow: darkTheme
                                        ? '0 10px 30px rgba(0,0,0,0.3)'
                                        : '0 10px 30px rgba(0,0,0,0.05)',
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: `${color?.button}20`, // 20% opacity
                                    }}
                                >
                                    <IconContext.Provider
                                        value={{
                                            size: '3em',
                                            color: color?.button,
                                        }}
                                    >
                                        {step.icon}
                                    </IconContext.Provider>
                                </div>
                                <h3
                                    style={{
                                        color: color?.button,
                                    }}
                                >
                                    {step.title}
                                </h3>
                                <p
                                    style={{
                                        color: color?.text,
                                    }}
                                >
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Page - 5 */}

            <section className="home-contact" ref={paragraphContactRef}>
                <div style={{ backgroundColor: color?.outer }}>
                    <section>
                        <p style={{ color: color?.button }}>
                            &reg;&nbsp;
                            <span
                                style={{
                                    color: color?.button,
                                    paddingLeft: '0',
                                }}
                            >
                                Sparetm
                            </span>
                        </p>
                        <p style={{ color: color?.text }}>
                            Make this app better by connecting with us &#128512;
                        </p>
                    </section>
                    <section>
                        <ul>
                            {home_contact_social_list.map((item) => (
                                <li key={item?.id}>
                                    <a
                                        href={item?.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ color: color?.button }}
                                    >
                                        {item?.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
                <div
                    style={{
                        backgroundColor: color?.inner,
                        color: color?.text,
                    }}
                >
                    <section>
                        <ul>
                            <li>
                                <p
                                    onClick={() =>
                                        displayToastify(
                                            'Implementation inprogress',
                                            !darkTheme
                                                ? TOASTIFYCOLOR.DARK
                                                : TOASTIFYCOLOR.LIGHT,
                                            TOASTIFYSTATE.INFO,
                                        )
                                    }
                                    style={{ color: color?.text }}
                                >
                                    PRIVACY POLICY
                                </p>
                            </li>
                            <li>
                                <p
                                    onClick={() =>
                                        displayToastify(
                                            'Implementation inprogress',
                                            !darkTheme
                                                ? TOASTIFYCOLOR.DARK
                                                : TOASTIFYCOLOR.LIGHT,
                                            TOASTIFYSTATE.INFO,
                                        )
                                    }
                                    style={{ color: color?.text }}
                                >
                                    COOKIE POLICY
                                </p>
                            </li>
                            <li>
                                <p
                                    onClick={() => navigate(RoutePath.About)}
                                    style={{ color: color?.text }}
                                >
                                    ABOUT
                                </p>
                            </li>
                            <li>
                                <p
                                    onClick={() =>
                                        displayToastify(
                                            'Implementation inprogress',
                                            !darkTheme
                                                ? TOASTIFYCOLOR.DARK
                                                : TOASTIFYCOLOR.LIGHT,
                                            TOASTIFYSTATE.INFO,
                                        )
                                    }
                                    style={{ color: color?.text }}
                                >
                                    FAQ
                                </p>
                            </li>
                        </ul>
                    </section>
                    <section>
                        <p style={{ color: color?.button }}>
                            COPYRIGHT &copy; {new Date().getFullYear()}{' '}
                            OPENBRIDGE INC. <br />
                            ALL RIGHT RESERVED.
                        </p>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default Home;
