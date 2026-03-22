import './Home.css';
import { GiCableStayedBridge } from 'react-icons/gi';
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
//import ReorderingGrid from '../../Components/Others/ReorderingGrid/ReorderingGrid';
import { useActive } from '../../Hooks/UseActive';
import { useNavigate } from 'react-router-dom';
import { light_colors } from '../../Data/ColorConstant';
import { home_colors } from '../../Data/ColorConstant';
import { motion, AnimatePresence } from 'framer-motion';
import { IconContext } from 'react-icons';
import { GoDotFill } from 'react-icons/go';
import { GrHomeRounded } from 'react-icons/gr';
import { IoMdContacts } from 'react-icons/io';
import TextBlinkAnimation from '../../Components/Others/TextBlinkAnimation/TextBlinkAnimation';
import FloatingCube from './FloatingCube/FloatingCube';
import { MdWeb } from 'react-icons/md';
import { FaCode } from 'react-icons/fa';
import { MdCloudSync } from 'react-icons/md';
import BirdSimulation from '../../Components/Others/BirdSimulation/BirdSimulation';
import PolicyModal from '../../Components/Others/PolicyModal/PolicyModal';
import HeroBackground from '../../Asset/Meet-home.svg'
import { useBackDropOpen } from '../ThemeProvider';
import { POLICY_MODAL, PolicyModalSize } from '../../Data/Constants';
import { RiBookOpenLine } from 'react-icons/ri';
import { HiOutlineSparkles } from 'react-icons/hi';
import { MdOutlineAutoGraph } from 'react-icons/md';
import { FaCogs, FaUsers, FaLightbulb } from 'react-icons/fa'; // Added icons for story section

const StepCard = ({ step }: { step: any }) => {
    const [showMeta, setShowMeta] = useState(false);

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="home-step-card"
        >
            <div
                className={`home-step-card-header`}
                style={{ backgroundColor: step.pastelColor }}
            >
                <h3>
                    {step.titlePrimary} <br />
                    <span>{step.titleHighlight}</span>
                </h3>
                <p>{step.description}</p>
                <div className="home-step-card-tags">
                    {step.tags.map((tag: string, i: number) => (
                        <span key={i} className="home-step-card-tag-pill" style={{ backgroundColor: step.pillColor }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="home-step-card-footer">
                <span className="explore-text">Explore</span>
                <button
                    className={`explore-btn ${showMeta ? 'active' : ''}`}
                    onClick={() => setShowMeta(!showMeta)}
                >
                    <IconContext.Provider value={{ size: '1.2em' }}>
                        <MdOutlineAutoGraph />
                    </IconContext.Provider>
                </button>
            </div>

            <AnimatePresence>
                {showMeta && (
                    <motion.div
                        className="home-step-card-info-panel"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <p>{step.extraInfo}</p>
                        <button className="close-info-btn" onClick={() => setShowMeta(false)}>Close</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Home = () => {
    const paragraphLandingRef: any = useRef(null);
    const paragraphStoryRef: any = useRef(null);
    const paragraphFeaturesRef: any = useRef(null);
    const paragraphStepsRef: any = useRef(null);
    const paragraphContactRef: any = useRef(null);
    const [status] = useActive(2000, true, USE_ACTIVE_SETTINGS);

    // Constantly use light colors as per user request to permanently lock Light Mode
    const color = light_colors;

    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();
    const navigate = useNavigate();

    const tranValForMenu = 0.1;
    const tranValForText = 0.7;

    const [activeSection, setActiveSection] = useState(1);

    // Memoize MenuList to prevent recreation on every render
    const MenuList = useMemo(() => [
        {
            id: 1,
            name: 'Home',
            icon: status ? <GrHomeRounded /> : <GoDotFill />,
            ref: paragraphLandingRef,
        },
        {
            id: 2,
            name: 'Story',
            icon: status ? <RiBookOpenLine /> : <GoDotFill />,
            ref: paragraphStoryRef,
        },
        {
            id: 3,
            name: 'Features',
            icon: status ? <HiOutlineSparkles /> : <GoDotFill />,
            ref: paragraphFeaturesRef,
        },
        {
            id: 4,
            name: 'Steps',
            icon: status ? <MdOutlineAutoGraph /> : <GoDotFill />,
            ref: paragraphStepsRef,
        },
        {
            id: 5,
            name: 'Contact',
            icon: status ? <IoMdContacts /> : <GoDotFill />,
            ref: paragraphContactRef,
        },
    ], [status]);

    useEffect(() => {
        const hiddenElements = document.querySelectorAll('.hidden-el');
        hiddenElements.forEach((element) => {
            observer.observe(element);
        });

        // Intersection Observer for Active Section Highlighting
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('data-section-id');
                    if (sectionId) setActiveSection(parseInt(sectionId));
                }
            });
        }, { rootMargin: '-40% 0px -40% 0px' });

        const refs = [
            { ref: paragraphLandingRef, id: 1 },
            { ref: paragraphStoryRef, id: 2 },
            { ref: paragraphFeaturesRef, id: 3 },
            { ref: paragraphStepsRef, id: 4 },
            { ref: paragraphContactRef, id: 5 },
        ];

        refs.forEach(({ ref, id }) => {
            if (ref.current) {
                ref.current.setAttribute('data-section-id', id.toString());
                sectionObserver.observe(ref.current);
            }
        });

        return () => sectionObserver.disconnect();
    }, []);

    logger(PAGE_LOGGER.home_page);

    // Define CSS variables based on current theme state - Memoized
    const themeStyles = useMemo(() => ({
        '--bg-outer': color?.outer,
        '--bg-inner': color?.inner,
        '--text-primary': color?.text,
        '--color-accent': home_colors.c_FFC20E,
        '--bg-card': color?.card,
        '--card-border': 'rgba(0,0,0,0.05)',
        '--card-shadow': '0 10px 30px rgba(0,0,0,0.05)',

        /* Injected dynamically generated variables to power Home.css strictly via Constants */
        '--color_000000': home_colors.c_000000,
        '--color_333': home_colors.c_333,
        '--color_FFFFFF': home_colors.c_FFFFFF,
        '--color_FAFAFA': home_colors.c_FAFAFA,
        '--color_666666': home_colors.c_666666,
        '--color_333333': home_colors.c_333333,
        '--color_555': home_colors.c_555,
        '--color_3C4043': home_colors.c_3C4043,
        '--color_FF7A18': home_colors.c_FF7A18,
        '--color_AF002D': home_colors.c_AF002D,
        '--color_319197': home_colors.c_319197,
        '--color_20C6A9': home_colors.c_20C6A9,
        '--color_7700FF': home_colors.c_7700FF,
        '--color_2C7265': home_colors.c_2C7265,
        '--color_127866': home_colors.c_127866,
        '--color_F4F4F4': home_colors.c_F4F4F4,
        '--color_D0D0D0': home_colors.c_D0D0D0,
        '--color_000': home_colors.c_000,
        '--color_1A1A1A': home_colors.c_1A1A1A,
        '--color_4A4A4A': home_colors.c_4A4A4A,
        '--color_D1D5DB': home_colors.c_D1D5DB,
        '--color_E5E5E5': home_colors.c_E5E5E5,
        '--color_F4F4F5': home_colors.c_F4F4F5,
        '--color_E4E4E7': home_colors.c_E4E4E7,
        '--color_FFC20E': home_colors.c_FFC20E,
        '--icon-bg': `${home_colors.c_FFC20E}20`,
        '--menu-bg': status ? color?.icon : `rgb(34, 34, 34, ${tranValForMenu})`,
        '--menu-item-bg': status ? color?.outer : `rgb(62, 62, 62, ${tranValForMenu})`,
        '--menu-icon-color': status ? color?.icon_font : `rgb(62, 62, 62, ${tranValForMenu})`,
        '--text-secondary': `${color?.text?.split(')')[0]}, ${tranValForText})`,
    } as React.CSSProperties), [color, status]);

    return (
        <div className="home" style={themeStyles} data-theme="light">
            {/* Theme Toggle Button has been removed to enforce permanent Light Mode on landing page */}            <span className={`home-bounce-menu-wrapper ${!status ? 'menu-inactive' : ''}`}>
                {MenuList.map((item: any) => (
                    <motion.span
                        key={item?.id}
                        className={`home-bounce-menu ${activeSection === item.id ? 'active' : ''}`}
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => doScroll(item?.ref)}
                        style={{
                            /* backgroundColor moved to CSS for better contrast control */
                        }}
                    >
                        <IconContext.Provider
                            value={{
                                size: '1.2em',
                                className: 'home-menu-icon'
                            }}
                        >
                            {item?.icon}
                        </IconContext.Provider>
                        <AnimatePresence>
                            {status && (
                                <motion.span
                                    className="home-menu-text"
                                    initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                                    animate={{ width: 'auto', opacity: 1, marginLeft: 8 }}
                                    exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    {item?.name}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.span>
                ))}
                <motion.span
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="home-bounce-menu-login"
                    onClick={() => navigate(RoutePath.Auth)}
                    style={{
                        color: status ? color?.text : `rgb(62, 62, 62, ${0.5})`,
                        backgroundColor: status ? home_colors.c_FFC20E : `rgb(62, 62, 62, ${tranValForMenu})`
                    }}
                >
                    Login
                </motion.span>
            </span>

            {/* Hero Section */}
            <section className="home-landing" ref={paragraphLandingRef}>
                <div className="home-landing-logo">
                    {APPNAME}&nbsp;&nbsp;
                    <IconContext.Provider value={{ size: '1.5em', className: 'accent-icon' }}>
                        <GiCableStayedBridge />
                    </IconContext.Provider>
                </div>
                <h1>
                    Take control of your smart home <br />
                    your way
                </h1>
                <h2 className="home-subtitle">
                    Empowering DIYers with open tools, smart tech, and the
                    freedom to create from anywhere
                </h2>

                <motion.button
                    className="home-landing-demo-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                        displayToastify(
                            'Demo coming soon!',
                            TOASTIFYCOLOR.DARK,
                            TOASTIFYSTATE.INFO,
                        )
                    }
                >
                    See Demo
                </motion.button>

                <div className="home-landing-pic-container">
                    {/* <ReorderingGrid /> */}
                    <img
                        src={HeroBackground}
                        style={{ width: '99%', height: '98%', objectFit: 'cover', borderRadius: '12.5px' }}
                        loading="lazy"
                        alt="home_hero"
                    />
                </div>
            </section>

            {/* Intro & Features Section */}
            <section className="home-intro">
                <div className="home-intro-bg-inner home-story-section" ref={paragraphStoryRef}>
                    <section className="home-story-header">
                        <h1 className="hidden-el">
                            The story of <br />
                            <span style={{ display: 'inline-block' }}>
                                {APPNAME.split('').map((char, index) => (
                                    <TextBlinkAnimation
                                        key={index}
                                        customClass="home-intro-text-style"
                                        customStyle={{
                                            backgroundSize: '1000% 100%',
                                            backgroundPosition: `${(index / (APPNAME.length - 1)) * 100}% 0`,
                                        }}
                                        color="transparent"
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </TextBlinkAnimation>
                                ))}
                            </span>{' '}
                            begins <br />
                            with curiosity.
                        </h1>
                    </section>
                    <section className="home-story-content">
                        {[
                            {
                                title: "Driven by Passion",
                                text: "From the beginning, we’ve been driven by a passion for electronics and coding. Our vision has always been to build something useful for many people. And yes — we’ve also experienced those everyday inconveniences, like being too tired to get up and turn off the lights at night.",
                                highlight: "That’s when it clicked.",
                                icon: <FaCogs />,
                                reverse: false
                            },
                            {
                                title: "Community First",
                                text: "With the support of the open source and DIY community — whom we deeply admire — we set out to build a platform that empowers makers and dreamers alike. A home automation system that’s not just smart and helpful, but also open source and fully customizable.",
                                icon: <FaUsers />,
                                reverse: true
                            },
                            {
                                title: "Space to Create",
                                text: "It’s built for people who want to learn, create, and even gain recognition for their contributions. If that sounds like you, welcome aboard.",
                                icon: <FaLightbulb />,
                                reverse: false
                            }
                        ].map((item, index) => (
                            <div key={index} className={`home-story-row ${item.reverse ? 'reverse' : ''} hidden-el`}>
                                <div className="home-story-text-col">
                                    <h2>{item.title}</h2>
                                    <p>{item.text}</p>
                                    {item.highlight && <strong>{item.highlight}</strong>}
                                </div>
                                <div className="home-story-visual-col">
                                    <div className="home-story-icon-wrapper" style={{ color: home_colors.c_FFC20E }}>
                                        {item.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                </div>

                <div ref={paragraphFeaturesRef} className="home-intro-bg-outer">
                    <div className="home-intro-feature-container">
                        <div className="home-intro-feature-container-top">
                            <div className="home-intro-cube-wrapper">
                                <FloatingCube />
                            </div>
                            <div className="home-intro-stats-wrapper">
                                <div className="home-intro-feature-container-top-stats" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: '20px',
                                    background: '#f0f0f0',
                                    padding: '30px',
                                    border: '3px solid',
                                    borderColor: '#000',
                                    boxShadow: '8px 8px 0px #000'
                                }}>
                                    <div className="home-intro-feature-container-top-stat">
                                        <p className="home-intro-feature-container-top-label">Interface</p>
                                        <p className="home-intro-feature-container-top-value">
                                            <IconContext.Provider value={{ size: '1.5em', className: 'accent-icon' }}>
                                                <MdWeb />
                                            </IconContext.Provider>
                                        </p>
                                        <div className="home-intro-feature-container-top-description-rows">
                                            <div>React Web App</div>
                                            <div>Deployed on Netlify</div>
                                            <div>UI Enhancements Regularly</div>
                                        </div>
                                    </div>
                                    <div className="home-intro-feature-container-top-stat">
                                        <p className="home-intro-feature-container-top-label">DIY</p>
                                        <p className="home-intro-feature-container-top-value">
                                            <IconContext.Provider value={{ size: '1.5em', className: 'accent-icon' }}>
                                                <FaCode />
                                            </IconContext.Provider>
                                        </p>
                                        <div className="home-intro-feature-container-top-description-rows">
                                            <div>Setup Documentation</div>
                                            <div>Custom Code Snippets</div>
                                            <div>Regular Idea Updates</div>
                                        </div>
                                    </div>
                                    <div className="home-intro-feature-container-top-stat">
                                        <p className="home-intro-feature-container-top-label">Real-Time</p>
                                        <p className="home-intro-feature-container-top-value">
                                            <IconContext.Provider value={{ size: '1.5em', className: 'accent-icon' }}>
                                                <MdCloudSync />
                                            </IconContext.Provider>
                                        </p>
                                        <div className="home-intro-feature-container-top-description-rows">
                                            <div>Appliance State Sync</div>
                                            <div>Real-time Updates</div>
                                            <div>Unified Control System</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="home-intro-feature-container-content">
                            <p className="hidden-el">
                                <strong className="home-intro-text-style">Modern Web Interface: </strong>
                                <span className="text-secondary">
                                    {' '} Our system comes with a <strong><i>visually appealing</i></strong>,
                                    an intuitive <strong><i>web-based</i></strong>{' '}interface designed for
                                    <strong><i> Seamless appliance control</i></strong>. Whether you're turning on the lights,
                                    adjusting the fan speed, or checking the status of your devices, the user interface
                                    ensures a smooth and responsive experience. With just a few taps or clicks,
                                    you can manage your entire home environment in <strong><i>real-time</i></strong>,
                                    right from your browser.
                                </span>
                            </p>
                            <p className="hidden-el">
                                <strong className="home-intro-text-style">DIY-Friendly Code: </strong>
                                <span className="text-secondary">
                                    {' '} For those who love to tinker and build, We’ve got you covered. All our code is
                                    <strong><i> thoroughly documented, </i></strong> making it easy for
                                    <strong><i> DIY enthusiasts and developers</i></strong> to explore, modify or expand the system.
                                    Whether you're integrating new sensors, customizing controls, or simply learning how
                                    everything works, the clear and <strong><i>structured codebase </i></strong>
                                    empowers you to create your own <strong><i>tailored solutions.</i></strong>
                                </span>
                            </p>
                            <p className="hidden-el">
                                <strong className="home-intro-text-style">Real-Time Sync: </strong>
                                <span className="text-secondary">
                                    {' '} One of the core features of our system is <strong><i> full appliance synchronization</i></strong>.
                                    Any change made to the state of an appliance, be it through the UI, physical
                                    switches, or voice commands, is <strong><i>instantly reflected{' '}</i></strong>
                                    across all connected devices and dashboards. This <strong><i>Real-time sync</i></strong>
                                    {' '}ensures accuracy, consistency, and convenience, no matter where or how you
                                    interact with your home.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>



                <div ref={paragraphStepsRef} className="home-intro-bg-inner home-system-section hidden-el">
                    <h2 className="home-section-title">THE SYSTEM</h2>
                    <div className="home-steps-grid-container">
                        {[
                            {
                                tags: ['Users', 'Permissions', 'Access'],
                                titlePrimary: 'Profile',
                                titleHighlight: 'Settings',
                                description:
                                    'Manage users and permissions. Configure your home location for precise weather and sunrise/sunset data.',
                                extraInfo: 'Keep your home secure with granular access control. create guest profiles and manage family access.',
                                pastelColor: '#E1F3FF', // Light Blue (Web Design)
                                pillColor: '#B4D2EB', // Darker Blue
                                darkColor: '#1e3a29', // Dark Green
                                accentColor: '#4CAF50'
                            },
                            {
                                tags: ['Widgets', 'Layouts', 'Control'],
                                titlePrimary: 'Smart',
                                titleHighlight: 'Dashboard',
                                description:
                                    'Customize your interface to match your workflow. Organize devices, tweak settings, and control effortlessly.',
                                extraInfo: 'Choose from hundreds of widgets and layouts. Our drag-and-drop interface lets you build your perfect control center.',
                                pastelColor: '#FFE1CB', // Light Orange/Peach (Graphic Design)
                                pillColor: '#DCBEA0', // Darker Orange
                                darkColor: '#1a3b47', // Dark Cyan
                                accentColor: '#00BCD4'
                            },
                            {
                                tags: ['Rules', 'Schedules', 'Scripts'],
                                titlePrimary: 'Automation',
                                titleHighlight: 'Engine',
                                description:
                                    'Create powerful automation rules. Set schedules, triggers, and conditions to make your home truly smart.',
                                extraInfo: 'From simple timers to complex multi-device scenarios, our automation engine handles it all with ease.',
                                pastelColor: '#E2DBFA', // Light Purple (Developers)
                                pillColor: '#B9AFE1', // Darker Purple
                                darkColor: '#4a3b2a', // Dark Orange
                                accentColor: '#FF9800'
                            },
                            {
                                tags: ['ESP32', 'Raspberry Pi', 'Sensors'],
                                titlePrimary: 'Custom',
                                titleHighlight: 'Hardware',
                                description:
                                    'Seamlessly integrate your own hardware. Access step-by-step guides for ESP32 and Raspberry Pi.',
                                extraInfo: 'Secure, local-first control without cloud reliance. Download pre-configured firmware for instant connectivity.',
                                pastelColor: '#D4F6ED', // Light Mint (Copywriting)
                                pillColor: '#A0D2C3', // Darker Mint
                                darkColor: '#3a2a47', // Dark Purple
                                pastelBorder: '#E1BEE7',
                                accentColor: '#9C27B0'
                            },
                        ].map((step, index) => (
                            <StepCard key={index} step={step} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact / Footer Page */}
            <section className="home-contact" ref={paragraphContactRef}>
                {/* Bird Simulation Background */}
                <BirdSimulation color={'#ffffff'} opacity={1.0} />

                <div className="home-contact-top">
                    <section className="brand-section">
                        <p className="brand-name">
                            &reg;&nbsp;<span>Sparetm</span>
                        </p>
                        <p className="brand-tagline">
                            Make this app better by connecting with us &#128512;
                        </p>
                    </section>
                    <section className="social-links-section">
                        <ul>
                            {home_contact_social_list.map((item) => (
                                <li key={item?.id}>
                                    <a href={item?.href} target="_blank" rel="noreferrer">
                                        {item?.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <div className="home-contact-bottom">
                    <section className="footer-links">
                        <ul>
                            {['PRIVACY POLICY', 'COOKIE POLICY', 'ABOUT', 'FAQ'].map((link) => (
                                <li key={link}>
                                    <p onClick={() => {
                                        if (link === 'ABOUT') navigate(RoutePath.About);
                                        else if (link === 'PRIVACY POLICY' || link === 'COOKIE POLICY') {
                                            toggleBackDropOpen(
                                                POLICY_MODAL,
                                                <PolicyModal
                                                    handleClose={() => toggleBackDropClose(POLICY_MODAL)}
                                                    darkTheme={false}
                                                    initialTab={link === 'COOKIE POLICY' ? 'settings' : 'what'}
                                                />,
                                                PolicyModalSize,
                                                false
                                            );
                                        }
                                        else displayToastify('Implementation in progress', TOASTIFYCOLOR.DARK, TOASTIFYSTATE.INFO);
                                    }}>
                                        {link}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="copyright-section">
                        <p>
                            COPYRIGHT &copy; {new Date().getFullYear()} OPENBRIDGE INC. <br />
                            ALL RIGHTS RESERVED.
                        </p>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default Home;
