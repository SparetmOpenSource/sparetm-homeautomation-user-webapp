import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { HiCollection } from 'react-icons/hi';
import { IoLogoReddit } from 'react-icons/io';
import {
    MdOutlineElectricalServices,
    MdSettingsSuggest,
    MdSpaceDashboard,
    MdSwitchAccount,
} from 'react-icons/md';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { TbLogout } from 'react-icons/tb';
import { OpenWeatherApiKey } from '../Data/ProfileConfigConstant';
import { AnimatePresence, motion } from 'framer-motion';
import ConfirmationBackdropModel from '../Components/Others/FramerMotionBackdrop/ConfirmationBackdropModel/ConfirmationBackdropModel';
import { logOut } from '../Utils/AuthHelperFn';
import { RoutePath } from '../Data/Constant';

const CoreApplication = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [firstRoomRoute] = useState();

    /*************************************BACKDROP*************************************/

    const [logoutModelOpen, setLogoutModelOpen] = useState(false);
    const [accountModelOpen, setAccountModelOpen] = useState(false);
    const openLogout = () => {
        setLogoutModelOpen(true);
    };
    const closeLogout = () => {
        setLogoutModelOpen(false);
    };
    const openAccount = () => {
        setAccountModelOpen(true);
    };
    const closeAccount = () => {
        setAccountModelOpen(false);
    };

    /***********************************************************/

    var headers = new Headers();
    headers.append('Accept', 'application/json');

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow',
    };

    const getcoordinates = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=Ranchi,IN&limit=1&appid=${OpenWeatherApiKey}`,
                requestOptions as any,
            );
            const coordinatesData: any = await response.json();
            localStorage.setItem('lat', coordinatesData[0].lat);
            localStorage.setItem('lon', coordinatesData[0].lon);
        } catch (error) {
            return console.log('error', error);
        }
    };
    useEffect(() => {
        getcoordinates();
    });

    const SideNav_Upper_List = [
        {
            id: 1,
            to: '/app/dashboard',
            icon: <MdSpaceDashboard />,
            currentPath: location.pathname.replace('%20', ''),
            listPath: '/app/dashboard',
        },
        {
            id: 2,
            to: `/app/room/${firstRoomRoute}`,
            icon: <HiCollection />,
            currentPath: `/${location.pathname.split('/')[1]}/${
                location.pathname.split('/')[2]
            }/`,
            listPath: '/app/room/',
        },
        {
            id: 3,
            to: '/app/premium',
            icon: <RiSecurePaymentLine />,
            currentPath: location.pathname.replace('%20', ''),
            listPath: '/app/premium',
        },
    ];
    const SideNav_Lower_List = [
        {
            id: 1,
            to: '/app/connection',
            icon: <MdOutlineElectricalServices />,
            currentPath: location.pathname.replace('%20', ''),
            listPath: '/app/connection',
        },
        {
            id: 2,
            to: '/app/setting',
            icon: <MdSettingsSuggest />,
            currentPath: location.pathname.replace('%20', ''),
            listPath: '/app/setting',
        },
    ];
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                gap: '0.6rem',
            }}
        >
            {/* ***************************Navigation**************************** */}
            <section
                style={{
                    background: '#2E3438',
                    borderRadius: '0.6em',
                    padding: '0.6rem',
                    width: '6vw',
                    height: '100%',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                        gap: '0.6em',
                    }}
                >
                    {/* ************Upper Side Navigation************** */}
                    <section
                        style={{
                            width: '100%',
                            height: '70%',
                            background: '#181818',
                            borderRadius: '0.6em',
                        }}
                    >
                        <ul
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                width: '100%',
                                height: '100%',
                                flexDirection: 'column',
                                gap: '2em',
                                listStyle: 'none',
                                margin: '0',
                                padding: '1em 0',
                            }}
                        >
                            <li
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    height: '10%',
                                }}
                            >
                                <IconContext.Provider
                                    value={{
                                        size: '2em',
                                        color: '#ECE88A',
                                    }}
                                >
                                    <IoLogoReddit />
                                </IconContext.Provider>
                            </li>
                            {SideNav_Upper_List.map((item: any) => (
                                <li
                                    key={item.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '80%',
                                        height: '10%',
                                        borderLeft:
                                            item.currentPath === item.listPath
                                                ? '3px solid #38ff13'
                                                : '',
                                    }}
                                >
                                    <Link to={item.to}>
                                        <motion.div
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <IconContext.Provider
                                                value={{
                                                    size: '2em',
                                                    color:
                                                        item.currentPath ===
                                                        item.listPath
                                                            ? 'lavender'
                                                            : '#2E3438',
                                                }}
                                            >
                                                {item.icon}
                                            </IconContext.Provider>
                                        </motion.div>
                                    </Link>
                                </li>
                            ))}
                            <li
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '80%',
                                    height: '10%',
                                }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                        accountModelOpen
                                            ? closeAccount()
                                            : openAccount()
                                    }
                                >
                                    <IconContext.Provider
                                        value={{
                                            size: '2em',
                                            color: 'lavender',
                                        }}
                                    >
                                        <MdSwitchAccount />
                                    </IconContext.Provider>
                                </motion.div>
                            </li>
                        </ul>
                    </section>

                    {/* ************Lower Side Navigation************** */}

                    <section
                        style={{
                            width: '100%',
                            height: '30%',
                            background: '#181818',
                            borderRadius: '0.6em',
                        }}
                    >
                        <ul
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                width: '100%',
                                height: '100%',
                                flexDirection: 'column',
                                gap: '1em',
                                listStyle: 'none',
                                margin: '0',
                                padding: '1em 0',
                            }}
                        >
                            {SideNav_Lower_List.map((item: any) => (
                                <li
                                    key={item.id}
                                    style={{
                                        display: 'flex',

                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '80%',
                                        height: '33%',
                                        borderLeft:
                                            item.currentPath === item.listPath
                                                ? '3px solid #38ff13'
                                                : '',
                                    }}
                                >
                                    <Link to={item.to}>
                                        <motion.div
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <IconContext.Provider
                                                value={{
                                                    size: '2em',
                                                    color:
                                                        item.currentPath ===
                                                        item.listPath
                                                            ? 'lavender'
                                                            : '#2E3438',
                                                }}
                                            >
                                                {item.icon}
                                            </IconContext.Provider>
                                        </motion.div>
                                    </Link>
                                </li>
                            ))}
                            <li
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '80%',
                                    height: '33%',
                                }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                        logoutModelOpen
                                            ? closeLogout()
                                            : openLogout()
                                    }
                                >
                                    <IconContext.Provider
                                        value={{
                                            size: '2em',
                                            color: 'lavender',
                                        }}
                                    >
                                        <TbLogout />
                                    </IconContext.Provider>
                                </motion.div>
                            </li>
                        </ul>
                    </section>
                </div>
            </section>
            {/* **************************Content*************************** */}
            <section
                style={{
                    background: '#2E3438',
                    borderRadius: '0.6em',
                    padding: '0.6em',
                    width: '94vw',
                    height: '100%',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '0.6em',
                    }}
                >
                    {/* <Outlet context={data} /> */}
                    <Outlet />
                </div>
            </section>

            {/***********************************BACKDROP*********************************/}

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {accountModelOpen && (
                    <ConfirmationBackdropModel
                        backdropColor="rgb(202, 231, 234, 0.2)"
                        handleClose={closeAccount}
                        text="You want to switch profile, Are you sure?"
                        btn_text="Yes"
                        setConfirmation={() =>
                            navigate(RoutePath.SelectProfileConfig)
                        }
                    />
                )}
            </AnimatePresence>

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {logoutModelOpen && (
                    <ConfirmationBackdropModel
                        backdropColor="rgb(202, 231, 234, 0.2)"
                        handleClose={closeLogout}
                        text="Oh no! You are leaving. Are you sure?"
                        btn_text="Yes, Log me out"
                        setConfirmation={() => logOut(navigate)}
                    />
                )}
            </AnimatePresence>

            {/*************************************BACKDROP*************************************/}
        </div>
    );
};

export default CoreApplication;
