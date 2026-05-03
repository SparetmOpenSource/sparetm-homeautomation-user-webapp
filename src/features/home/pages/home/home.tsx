import { useEffect, useMemo, useRef, useState } from 'react';
import { GiCableStayedBridge } from 'react-icons/gi';
import {
    APPNAME,
    home_contact_social_list,
    PAGE_LOGGER,
    RoutePath,
    USE_ACTIVE_SETTINGS,
} from '../../../../data/constants';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../data/enum';
import {
    displayToastify,
    doScroll,
    logger,
    observer,
} from '../../../../utils/helperfn';
import './home.css';

import { AnimatePresence, motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { GoDotFill } from 'react-icons/go';
import { GrHomeRounded } from 'react-icons/gr';
import { HiOutlineSparkles } from 'react-icons/hi';
import { IoMdContacts } from 'react-icons/io';
import { MdOutlineAutoGraph } from 'react-icons/md';
import { RiBookOpenLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import HeroBackground from '../../../../assets/meet-home.svg';
import { useBackDropOpen } from '../../../../core/router/themeprovider';
import { home_colors, light_colors } from '../../../../data/colorconstant';
import { POLICY_MODAL, PolicyModalSize } from '../../../../data/constants';
import { useActive } from '../../../../hooks/useactive';
import BirdSimulation from '../../components/homecomponents/birdsimulation/birdsimulation';
import PolicyModal from '../../components/homecomponents/policymodal/policymodal';
import TextBlinkAnimation from '../../components/homecomponents/textblinkanimation/textblinkanimation';
import FloatingCube from './floatingcube/floatingcube';

import {
    ACTION_CLOSE_TEXT,
    ACTION_DEMO_TEXT,
    ACTION_DEMO_TOAST,
    ACTION_EXPLORE_TEXT,
    ACTION_IMPLEMENT_TOAST,
    ACTION_LOGIN_TEXT,
    FOOTER_COPYRIGHT_RIGHTS,
    FOOTER_COPYRIGHT_TEXT,
    FOOTER_LINKS,
    HOME_BRAND_NAME,
    HOME_BRAND_TAGLINE,
    HOME_FEATURE_STATS,
    HOME_FEATURES_DESCRIPTIONS,
    HOME_HERO_SUBTITLE,
    HOME_HERO_TITLE,
    HOME_HERO_TITLE_HIGHLIGHT,
    HOME_STORY_CONTENT_LIST,
    HOME_STORY_HEADER_P1,
    HOME_STORY_HEADER_P2,
    HOME_STORY_HEADER_P3,
    HOME_SYSTEM_STEPS,
    HOME_SYSTEM_TITLE,
    MENU_ITEMS
} from '../../data/homecontent';

interface StepCardProps {
    step: {
        titlePrimary: string;
        titleHighlight: string;
        description: string;
        tags: string[];
        pastelColor: string;
        pillColor: string;
        extraInfo: string;
    };
}

const StepCard = ({ step }: StepCardProps) => {
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
                <span className="explore-text">{ACTION_EXPLORE_TEXT}</span>
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
                        <button className="close-info-btn" onClick={() => setShowMeta(false)}>{ACTION_CLOSE_TEXT}</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Home = () => {
    const paragraphLandingRef = useRef<HTMLElement>(null);
    const paragraphStoryRef = useRef<HTMLDivElement>(null);
    const paragraphFeaturesRef = useRef<HTMLDivElement>(null);
    const paragraphStepsRef = useRef<HTMLDivElement>(null);
    const paragraphContactRef = useRef<HTMLElement>(null);
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
            name: MENU_ITEMS[0].name,
            icon: status ? <GrHomeRounded /> : <GoDotFill />,
            ref: paragraphLandingRef,
        },
        {
            id: 2,
            name: MENU_ITEMS[1].name,
            icon: status ? <RiBookOpenLine /> : <GoDotFill />,
            ref: paragraphStoryRef,
        },
        {
            id: 3,
            name: MENU_ITEMS[2].name,
            icon: status ? <HiOutlineSparkles /> : <GoDotFill />,
            ref: paragraphFeaturesRef,
        },
        {
            id: 4,
            name: MENU_ITEMS[3].name,
            icon: status ? <MdOutlineAutoGraph /> : <GoDotFill />,
            ref: paragraphStepsRef,
        },
        {
            id: 5,
            name: MENU_ITEMS[4].name,
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
                {MenuList.map((item) => (
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
                    {ACTION_LOGIN_TEXT}
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
                    {HOME_HERO_TITLE} <br />
                    {HOME_HERO_TITLE_HIGHLIGHT}
                </h1>
                <h2 className="home-subtitle">
                    {HOME_HERO_SUBTITLE}
                </h2>

                <motion.button
                    className="home-landing-demo-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                        displayToastify(
                            ACTION_DEMO_TOAST,
                            TOASTIFYCOLOR.DARK,
                            TOASTIFYSTATE.INFO,
                        )
                    }
                >
                    {ACTION_DEMO_TEXT}
                </motion.button>

                <div className="home-landing-pic-container">

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
                            {HOME_STORY_HEADER_P1} <br />
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
                            {HOME_STORY_HEADER_P2} <br />
                            {HOME_STORY_HEADER_P3}
                        </h1>
                    </section>
                    <section className="home-story-content">
                        {HOME_STORY_CONTENT_LIST.map((item, index) => (
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
                                    {HOME_FEATURE_STATS.map((stat, idx) => (
                                        <div key={idx} className="home-intro-feature-container-top-stat">
                                            <p className="home-intro-feature-container-top-label">{stat.label}</p>
                                            <p className="home-intro-feature-container-top-value">
                                                <IconContext.Provider value={{ size: '1.5em', className: 'accent-icon' }}>
                                                    {stat.icon}
                                                </IconContext.Provider>
                                            </p>
                                            <div className="home-intro-feature-container-top-description-rows">
                                                {stat.rows.map((row, rIdx) => (
                                                    <div key={rIdx}>{row}</div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="home-intro-feature-container-content">
                            {HOME_FEATURES_DESCRIPTIONS.map((desc, idx) => (
                                <p key={idx} className="hidden-el">
                                    <strong className="home-intro-text-style">{desc.title}</strong>
                                    {desc.content}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>



                <div ref={paragraphStepsRef} className="home-intro-bg-inner home-system-section hidden-el">
                    <h2 className="home-section-title">{HOME_SYSTEM_TITLE}</h2>
                    <div className="home-steps-grid-container">
                        {HOME_SYSTEM_STEPS.map((step, index) => (
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
                            &reg;&nbsp;<span>{HOME_BRAND_NAME}</span>
                        </p>
                        <p className="brand-tagline">
                            {HOME_BRAND_TAGLINE}
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
                            {FOOTER_LINKS.map((link) => (
                                <li key={link.key}>
                                    <p onClick={() => {
                                        if (link.key === 'about') navigate(RoutePath.About);
                                        else if (link.key === 'privacy' || link.key === 'cookie') {
                                            toggleBackDropOpen(
                                                POLICY_MODAL,
                                                <PolicyModal
                                                    handleClose={() => toggleBackDropClose(POLICY_MODAL)}
                                                    darkTheme={false}
                                                    initialTab={link.key === 'cookie' ? 'settings' : 'what'}
                                                />,
                                                PolicyModalSize,
                                                false
                                            );
                                        }
                                        else displayToastify(ACTION_IMPLEMENT_TOAST, TOASTIFYCOLOR.DARK, TOASTIFYSTATE.INFO);
                                    }}>
                                        {link.label}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="copyright-section">
                        <p>
                            {FOOTER_COPYRIGHT_TEXT} <br />
                            {FOOTER_COPYRIGHT_RIGHTS}
                        </p>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default Home;
