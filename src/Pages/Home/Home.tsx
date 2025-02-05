import './Home.css';
import { GiCableStayedBridge } from 'react-icons/gi';
import { VscSignIn } from 'react-icons/vsc';
import { MdAddHomeWork, MdLightMode } from 'react-icons/md';
import { MdOutlineWifiProtectedSetup } from 'react-icons/md';
import { APPNAME, home_contact_social_list } from '../../Data/Constants';
import {
    displayToastify,
    doScroll,
    logger,
    observer,
} from '../../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../Data/Enum';
import { useEffect, useMemo, useRef, useState } from 'react';
import HomePage from './../../Assets/HomePage.svg';
import { useActive } from '../../Hooks/UseActive';
import { useNavigate } from 'react-router-dom';
import { useTheme, useThemeUpdate } from '../ThemeProvider';
import { dark_colors, light_colors } from '../../Data/ColorConstant';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { CiDark } from 'react-icons/ci';
import { GoDotFill } from 'react-icons/go';
import { GrHomeRounded } from 'react-icons/gr';
import { MdOutlineHistoryEdu } from 'react-icons/md';
import { IoFootstepsSharp } from 'react-icons/io5';
import { IoMdContacts } from 'react-icons/io';
import Button from '../../Components/Others/CustomButton/Button';
// import Maintenance from '../../Components/Others/Maintenance/Maintenance';

const Home = () => {
    const paragraphLandingRef: any = useRef(null);
    const paragraphStoryRef: any = useRef(null);
    const paragraphStepsRef: any = useRef(null);
    const paragraphContactRef: any = useRef(null);
    const [status] = useActive(2000, true);
    const toggleTheme: any = useThemeUpdate();
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const navigate = useNavigate();

    const tranVal = 0.2;

    const MenuList = [
        {
            id: 1,
            icon: status ? <GrHomeRounded /> : <GoDotFill />,
            ref: paragraphLandingRef,
        },
        {
            id: 2,
            icon: status ? <MdOutlineHistoryEdu /> : <GoDotFill />,
            ref: paragraphStoryRef,
        },
        {
            id: 3,
            icon: status ? <IoFootstepsSharp /> : <GoDotFill />,
            ref: paragraphStepsRef,
        },
        {
            id: 4,
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

    logger('Home');

    return (
        <div className="home">
            <motion.span
                className="home-theme-icon"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
            >
                <IconContext.Provider
                    // value={{
                    //     size: '1.5em',
                    //     color: color?.button,
                    // }}
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
                className="home-opening_scroll_arrow"
                style={{
                    backgroundColor: status
                        ? color?.border
                        : `rgb(34, 34, 34, ${tranVal})`,
                }}
            >
                {MenuList.map((item: any) => (
                    <motion.span
                        key={item?.id}
                        className="home-opening_bounce_arrow"
                        style={{
                            backgroundColor: status
                                ? color?.inner
                                : `rgb(62, 62, 62, ${tranVal})`,
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
                                    ? color?.icon
                                    : `rgb(62, 62, 62, ${tranVal})`,
                            }}
                        >
                            {item?.icon}
                        </IconContext.Provider>
                    </motion.span>
                ))}
                <span
                    className="home-opening_bounce_arrow_login"
                    style={{
                        color: status
                            ? color?.text
                            : `rgb(62, 62, 62, ${tranVal})`,
                        backgroundColor: status
                            ? color?.button
                            : `rgb(62, 62, 62, ${tranVal})`,
                    }}
                    onClick={() => navigate('/auth')}
                >
                    Login
                </span>
            </span>
            <section
                className="home-opening"
                ref={paragraphLandingRef}
                style={{ backgroundColor: color?.outer }}
            >
                <div
                    className="home-opening-logo"
                    style={{ color: color?.text }}
                >
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
                    &nbsp;&nbsp;{APPNAME}
                </div>
                <h1 style={{ color: color?.button }}>
                    Build your home controller in just a few easy steps
                </h1>
                <h2 style={{ color: color?.text }}>
                    Trusted worldwide by millions of DIY enthusiasts eager to
                    take control of their projects
                </h2>

                <div
                    className="home-opening-pic"
                    style={{ backgroundColor: color?.inner }}
                >
                    <img
                        className="home-page-svg"
                        src={HomePage}
                        height="100%"
                        width="100%"
                        loading="lazy"
                        alt="home_icon"
                    />
                </div>
            </section>
            <section
                className="home-intro"
                style={{ backgroundColor: color?.inner }}
            >
                <div>
                    <section>
                        <h1
                            className="hidden-el"
                            style={{ color: color?.text }}
                        >
                            The story of {APPNAME} begins with trust.
                        </h1>
                    </section>
                    <section ref={paragraphStoryRef}>
                        <p className="hidden-el" style={{ color: color?.text }}>
                            Trust, as a virtue, has consistently played an
                            essential role in every great human achievement.
                            However, its importance has often been overlooked,
                            not just by individuals, but by entire societies. We
                            feel it is time someone gave it the spotlight it
                            deserves, especially for those who live by this
                            virtue: the trustworthy.
                        </p>
                        <p className="hidden-el" style={{ color: color?.text }}>
                            Our innovative app puts homeowners in charge of
                            their smart devices from anywhere. Easily schedule
                            routines, monitor energy usage, and receive tailored
                            recommendations for optimal efficiency. Gain daily
                            insights to optimize your setup and uncover
                            energy-saving opportunities effortlessly. Experience
                            the future of home automation, where control and
                            sustainability converge seamlessly.
                        </p>
                        <p className="hidden-el" style={{ color: color?.text }}>
                            If you make it to OpenBridge, congratulations and
                            welcome. we have a lot of things planned for you.
                        </p>
                    </section>
                </div>
                <div ref={paragraphStepsRef}>
                    <section className="hidden-el">
                        <IconContext.Provider
                            value={useMemo(() => {
                                return {
                                    size: '3em',
                                    color: 'red',
                                };
                            }, [])}
                        >
                            <VscSignIn />
                        </IconContext.Provider>
                        <h1 style={{ color: color?.text }}>
                            Sign In and create your profile
                        </h1>
                        <p style={{ color: color?.text }}>
                            Sign in, create your profile, and access all
                            features. Personalize your experience for tailored
                            functionality.
                        </p>
                    </section>
                    <section className="hidden-el">
                        <IconContext.Provider
                            value={useMemo(() => {
                                return {
                                    size: '3em',
                                    color: 'orange',
                                };
                            }, [])}
                        >
                            <MdAddHomeWork />
                        </IconContext.Provider>
                        <h1 style={{ color: color?.text }}>
                            Add your location and room details
                        </h1>
                        <p style={{ color: color?.text }}>
                            Personalize your app with room details. Enhance it
                            by adding a location for weather updates and more.
                        </p>
                    </section>
                    <section className="hidden-el">
                        <IconContext.Provider
                            value={useMemo(() => {
                                return {
                                    size: '3em',
                                    color: 'green',
                                };
                            }, [])}
                        >
                            <MdOutlineWifiProtectedSetup />
                        </IconContext.Provider>
                        <h1 style={{ color: color?.text }}>
                            Setup your device
                        </h1>
                        <p style={{ color: color?.text }}>
                            To set up your device/ESP8266, connect it to your
                            computer, install drivers, and use Arduino IDE to
                            upload code.
                        </p>
                    </section>
                </div>
            </section>
            <section className="home-contact" ref={paragraphContactRef}>
                <div style={{ backgroundColor: color?.outer }}>
                    {/* <ButtonLink
                        label="Try OpenBridge now"
                        textCol={color?.button}
                        backCol={color?.inner}
                        backColOnDis={color?.element}
                        width="450px"
                        to="/auth"
                        status={false}
                        border={color?.button}
                    /> */}

                    <Button
                        label="Try OpenBridge now"
                        textCol={color?.button}
                        backCol={color?.inner}
                        backColOnDis={color?.element}
                        width="450px"
                        fn={() => navigate('/auth')}
                        status={false}
                        border={color?.button}
                    />

                    {/* <Button
                        label="Try OpenBridge now"
                        textCol={color?.button}
                        backCol={color?.inner}
                        backColOnDis={color?.element}
                        width="450px"
                        fn={() => {
                            toggleBackDropOpen();
                            setChildForCustomBackDrop(
                                <Maintenance darkTheme={darkTheme} />,
                            );
                            setSizeForCustomBackDrop(landscapeSizeL);
                        }}
                        status={false}
                        border={color?.button}
                    /> */}

                    <section>
                        <span>
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
                                Make this app better by connecting with us
                                &#128512;
                            </p>
                        </span>
                        <span>
                            <div></div>
                            <div style={{ color: color?.text }}>
                                <ul>
                                    {home_contact_social_list.map((item) => (
                                        <li key={item?.id}>
                                            <a
                                                href={item?.href}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {item?.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </span>
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
                                            'Inprogress',
                                            !darkTheme
                                                ? TOASTIFYCOLOR.DARK
                                                : TOASTIFYCOLOR.LIGHT,
                                            TOASTIFYSTATE.INFO,
                                        )
                                    }
                                >
                                    PRIVACY POLICY
                                </p>
                            </li>
                            <li>
                                <p
                                    onClick={() =>
                                        displayToastify(
                                            'Inprogress',
                                            !darkTheme
                                                ? TOASTIFYCOLOR.DARK
                                                : TOASTIFYCOLOR.LIGHT,
                                            TOASTIFYSTATE.INFO,
                                        )
                                    }
                                    // onClick={() =>
                                    //     openPrivacyModel
                                    //         ? closePrivacy()
                                    //         : openPrivacy()
                                    // }
                                >
                                    COOKIE POLICY
                                </p>
                            </li>
                            <li>
                                {/* <Link to="/about"> */}
                                <p
                                    onClick={() =>
                                        displayToastify(
                                            'Inprogress',
                                            !darkTheme
                                                ? TOASTIFYCOLOR.DARK
                                                : TOASTIFYCOLOR.LIGHT,
                                            TOASTIFYSTATE.INFO,
                                        )
                                    }
                                >
                                    ABOUT
                                </p>
                                {/* </Link> */}
                            </li>
                        </ul>
                    </section>
                    <section>
                        <p>
                            COPYRIGHT &copy; {new Date().getFullYear()}{' '}
                            OPENBRIDGE INC. <br />
                            ALL RIGHT RESERVED.
                        </p>
                    </section>
                </div>
            </section>

            {/* ************** */}
        </div>
    );
};

export default Home;

// import './Home.css';
// import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, Variants } from 'framer-motion';
// import { IconContext } from 'react-icons';
// import { GiCableStayedBridge } from 'react-icons/gi';
// import { VscSignIn } from 'react-icons/vsc';
// import { MdAddHomeWork, MdLightMode } from 'react-icons/md';
// import { MdOutlineWifiProtectedSetup } from 'react-icons/md';
// import { CiDark } from 'react-icons/ci';
// import { GoDotFill } from 'react-icons/go';
// import { GrHomeRounded } from 'react-icons/gr';
// import { MdOutlineHistoryEdu } from 'react-icons/md';
// import { IoFootstepsSharp, IoMdContacts } from 'react-icons/io5';

// // Constants and Data
// import { APPNAME, home_contact_social_list } from '../../Data/Constants';
// import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../Data/Enum';
// import { dark_colors, light_colors } from '../../Data/ColorConstant';
// import { MENU_ITEMS } from './HomeConstants';

// // Utilities and Hooks
// import {
//     displayToastify,
//     doScroll,
//     logger,
//     observer,
// } from '../../Utils/HelperFn';
// import { useActive } from '../../Hooks/UseActive';
// import { useTheme, useThemeUpdate } from '../ThemeProvider';
// import Button from '../../Components/Others/CustomButton/Button';
// import HomePage from './../../Assets/HomePage.svg';

// interface ColorTheme {
//     outer?: string;
//     inner?: string;
//     button?: string;
//     text?: string;
//     icon?: string;
//     border?: string;
//     element?: string;
// }

// const ThemeToggleIcon = ({ darkTheme }: { darkTheme: boolean }) => {
//     const color = useMemo(
//         () => (darkTheme ? dark_colors : light_colors),
//         [darkTheme],
//     );
//     return darkTheme ? <MdLightMode /> : <CiDark />;
// };

// const SocialLinks = ({ color }: { color: ColorTheme }) => {
//     if (!home_contact_social_list?.length) return null;

//     return (
//         <ul>
//             {home_contact_social_list.map((item) => (
//                 <li key={item.id}>
//                     <a
//                         href={item.href}
//                         target="_blank"
//                         rel="noreferrer"
//                         style={{ color: color.text }}
//                     >
//                         {item.name}
//                     </a>
//                 </li>
//             ))}
//         </ul>
//     );
// };

// const AnimatedIcon = ({
//     icon,
//     color,
//     onClick,
//     variants,
// }: {
//     icon: React.ReactNode;
//     color: string;
//     onClick: () => void;
//     variants?: Variants;
// }) => (
//     <motion.span
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={onClick}
//         variants={variants}
//         style={{ backgroundColor: color }}
//     >
//         {icon}
//     </motion.span>
// );

// const Home = () => {
//     const navigate = useNavigate();
//     const [status] = useActive(2000, true);
//     const toggleTheme = useThemeUpdate();
//     const darkTheme = useTheme();

//     // Refs
//     const refs = {
//         landing: useRef<HTMLElement>(null),
//         story: useRef<HTMLElement>(null),
//         steps: useRef<HTMLElement>(null),
//         contact: useRef<HTMLElement>(null),
//     };

//     // Memoized values
//     const color = useMemo<ColorTheme>(
//         () => (darkTheme ? dark_colors : light_colors),
//         [darkTheme],
//     );

//     const menuItems = useMemo(
//         () =>
//             MENU_ITEMS.map((item:any) => ({
//                 ...item,
//                 icon: status ? item.activeIcon : <GoDotFill />,
//                 ref: refs[item.refKey as keyof typeof refs],
//             })),
//         [status, refs],
//     );

//     // Effects
//     useEffect(() => {
//         const hiddenElements = document.querySelectorAll('.hidden-el');
//         const observerInstance = observer;

//         hiddenElements.forEach((element) => {
//             observerInstance.observe(element);
//         });

//         return () =>
//             hiddenElements.forEach((element) => {
//                 observerInstance.unobserve(element);
//             });
//     }, []);

//     const handleAuthNavigation = useCallback(
//         () => navigate('/auth'),
//         [navigate],
//     );

//     // Logging
//     useEffect(() => {
//         logger('Home');
//     }, []);

//     return (
//         <div className="home" style={{ backgroundColor: color.outer }}>
//             <ThemeToggleButton
//                 darkTheme={darkTheme}
//                 toggleTheme={toggleTheme}
//                 color={color}
//             />

//             <NavigationMenu
//                 items={menuItems}
//                 color={color}
//                 status={status}
//                 navigate={navigate}
//             />

//             <HomeSections
//                 refs={refs}
//                 color={color}
//                 handleAuthNavigation={handleAuthNavigation}
//             />

//             <ContactSection color={color} darkTheme={darkTheme} />
//         </div>
//     );
// };

// const ThemeToggleButton = ({
//     darkTheme,
//     toggleTheme,
//     color,
// }: {
//     darkTheme: boolean;
//     toggleTheme: () => void;
//     color: ColorTheme;
// }) => (
//     <motion.span
//         className="home-theme-icon"
//         whileHover={{ scale: 1.2 }}
//         whileTap={{ scale: 0.9 }}
//         onClick={toggleTheme}
//     >
//         <IconContext.Provider value={{ size: '1.5em', color: color.button }}>
//             <ThemeToggleIcon darkTheme={darkTheme} />
//         </IconContext.Provider>
//     </motion.span>
// );

// const NavigationMenu = ({
//     items,
//     color,
//     status,
//     navigate,
// }: {
//     items: any[];
//     color: ColorTheme;
//     status: boolean;
// }) => (
//     <span
//         className="home-opening_scroll_arrow"
//         style={{
//             backgroundColor: status ? color.border : `rgba(34, 34, 34, 0.2)`,
//         }}
//     >
//         {items.map((item) => (
//             <AnimatedIcon
//                 key={item.id}
//                 icon={
//                     <IconContext.Provider
//                         value={{
//                             size: '1.5em',
//                             color: status
//                                 ? color.icon
//                                 : `rgba(62, 62, 62, 0.2)`,
//                         }}
//                     >
//                         {item.icon}
//                     </IconContext.Provider>
//                 }
//                 color={status ? color.inner : `rgba(62, 62, 62, 0.2)`}
//                 onClick={() => item.ref.current && doScroll(item.ref)}
//             />
//         ))}
//         <AuthButton
//             color={color}
//             status={status}
//             onClick={() => navigate('/auth')}
//         />
//     </span>
// );

// const AuthButton = ({
//     color,
//     status,
//     onClick,
// }: {
//     color: ColorTheme;
//     status: boolean;
//     onClick: () => void;
// }) => (
//     <span
//         className="home-opening_bounce_arrow_login"
//         style={{
//             color: status ? color.text : `rgba(62, 62, 62, 0.2)`,
//             backgroundColor: status ? color.button : `rgba(62, 62, 62, 0.2)`,
//         }}
//         onClick={onClick}
//     >
//         Login
//     </span>
// );

// // Additional section components would follow similar patterns...

// export default Home;
