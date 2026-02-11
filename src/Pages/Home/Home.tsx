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
//import ReorderingGrid from '../../Components/Others/ReorderingGrid/ReorderingGrid';
import { useActive } from '../../Hooks/UseActive';
import { useNavigate } from 'react-router-dom';
import { useTheme, useThemeUpdate } from '../ThemeProvider';
import { dark_colors, light_colors } from '../../Data/ColorConstant';
import { motion, AnimatePresence } from 'framer-motion';
import { IconContext } from 'react-icons';
import { CiDark } from 'react-icons/ci';
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
import { HiOutlineSparkles} from 'react-icons/hi';
import { MdOutlineAutoGraph } from 'react-icons/md';

const StepCard = ({ step }: { step: any }) => {
    const [showMeta, setShowMeta] = useState(false);
    const darkTheme: any = useTheme();
    
    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="home-step-card"
        >
            <div 
                className={`home-step-card-header ${darkTheme ? 'dark-header' : ''}`}
                style={{ backgroundColor: darkTheme ? step.darkColor : step.pastelColor }}
            >
                <h3>
                    {step.titlePrimary} <br />
                    <span>{step.titleHighlight}</span>
                </h3>
                <p>{step.description}</p>
                <div className="home-step-card-tags">
                    {step.tags.map((tag: string, i: number) => (
                        <span key={i} className="home-step-card-tag-pill" style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}>
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
    const toggleTheme: any = useThemeUpdate();
    const darkTheme: any = useTheme();
    // Derived state for color - eliminates double render from useEffect sync
    const color = useMemo(() => darkTheme ? dark_colors : light_colors, [darkTheme]);
    
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
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    const sectionId = entry.target.getAttribute('data-section-id');
                    if (sectionId) setActiveSection(parseInt(sectionId));
                }
            });
        }, { threshold: [0.5] });

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
        '--color-accent': color?.button,
        '--bg-card': darkTheme ? color?.element : color?.card,
        '--card-border': darkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        '--card-shadow': darkTheme ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.05)',
        '--icon-bg': `${color?.button}20`,
        '--menu-bg': status ? color?.icon : `rgb(34, 34, 34, ${tranValForMenu})`,
        '--menu-item-bg': status ? color?.outer : `rgb(62, 62, 62, ${tranValForMenu})`,
        '--menu-icon-color': status ? color?.icon_font : `rgb(62, 62, 62, ${tranValForMenu})`,
        '--text-secondary': `${color?.text?.split(')')[0]}, ${tranValForText})`,
    } as React.CSSProperties), [color, darkTheme, status]);

    return (
        <div className="home" style={themeStyles} data-theme={darkTheme ? 'dark' : 'light'}>
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
            
            <span className={`home-bounce-menu-wrapper ${!status ? 'menu-inactive' : ''}`}>
                {MenuList.map((item: any) => (
                    <motion.span
                        key={item?.id}
                        className={`home-bounce-menu ${activeSection === item.id ? 'active' : ''}`}
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => doScroll(item?.ref)}
                        style={{
                            backgroundColor: activeSection === item.id ? (darkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)') : 'transparent'
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
                         backgroundColor: status ? color?.button : `rgb(62, 62, 62, ${tranValForMenu})`
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
                            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
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
                <div className="home-intro-bg-inner">
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
                    <section ref={paragraphStoryRef} className="home-story-content">
                        <p className="hidden-el text-secondary">
                            From the beginning, we’ve been driven by a passion for{' '}
                            <strong><i>electronics</i></strong> and{' '}
                            <strong><i>coding</i></strong>. Our vision has always been to build something
                            useful for <strong><i>many people.</i></strong>{' '}
                            And yes — we’ve also experienced those everyday inconveniences,
                            like being too tired to get up and turn off the lights at night.
                        </p>

                        <p className="hidden-el text-secondary">
                            <strong><i>That’s when it clicked.</i></strong>
                        </p>
                        
                        <p className="hidden-el text-secondary">
                            With the support of the <strong><i>open source</i></strong>{' '}
                            and <strong><i>DIY community</i></strong>{' '}
                            — whom we deeply admire — we set out to build a{' '}
                            <strong><i>platform</i></strong>{' '}
                            that empowers makers and dreamers alike. A{' '}
                            <strong><i>home automation</i></strong>{' '}
                            system that’s not just smart and helpful, but also
                            open source and fully customizable.
                        </p>
                        
                        <p className="hidden-el text-secondary">
                            It’s built for people who want to <strong><i>learn</i></strong>,{' '}
                            <strong><i>create</i></strong>, and even gain{' '}
                            <strong><i>recognition</i></strong> for their{' '}
                            <strong><i>contributions.</i></strong>
                        </p>
                        
                        <p className="hidden-el text-secondary">
                            If that sounds like you, <strong><i>welcome aboard.</i></strong>
                        </p>
                    </section>
                </div>

                <div ref={paragraphFeaturesRef} className="home-intro-bg-outer">
                    <div className="home-intro-feature-container">
                        <div className="home-intro-feature-container-top">
                            <FloatingCube />
                            <div className="home-intro-feature-container-top-stats">
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
                
                <div className="home-separator"></div>
                
                <div ref={paragraphStepsRef} className="home-intro-bg-inner hidden-el">
                    <div className="home-steps-grid-container">
                        {[
                            {
                                tags: ['Users', 'Permissions', 'Access'],
                                titlePrimary: 'Profile',
                                titleHighlight: 'Settings',
                                description:
                                    'Manage users and permissions. Configure your home location for precise weather and sunrise/sunset data.',
                                extraInfo: 'Keep your home secure with granular access control. create guest profiles and manage family access.',
                                pastelColor: '#E8F5E9', // Light Green
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
                                pastelColor: '#E0F7FA', // Light Cyan/Blue
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
                                pastelColor: '#FFF3E0', // Light Orange
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
                                pastelColor: '#F3E5F5', // Light Purple
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
                <BirdSimulation color={color?.button} opacity={darkTheme ? 0.5 : 0.4} />

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
                                                    darkTheme={darkTheme}
                                                    initialTab={link === 'COOKIE POLICY' ? 'settings' : 'what'}
                                                />,
                                                PolicyModalSize,
                                                false
                                            );
                                        }
                                        else displayToastify('Implementation in progress', !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.INFO);
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
