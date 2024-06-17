import { TbLogout } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { HiCollection } from 'react-icons/hi';
import { IoLogoReddit } from 'react-icons/io';
import {
    MdOutlineElectricalServices,
    MdSettingsSuggest,
    MdSpaceDashboard,
    MdSwitchAccount,
} from 'react-icons/md';
import { MdWorkspacePremium } from 'react-icons/md';
import { RoutePath } from '../../../Data/Constants';
import { motion } from 'framer-motion';
import './CoreApplicationNav.css';

const CoreApplicationNav = (props: any) => {
    const location = useLocation();

    const SideNav_Upper_List = [
        {
            id: 1,
            to: RoutePath.CoreApplication_Dashboard + '/status',
            icon: <MdSpaceDashboard />,
            currentPath: location.pathname.replace('%20', ''),
            listPath: RoutePath.CoreApplication_Dashboard,
        },
        {
            id: 2,
            to: `${RoutePath.CoreApplication_Room}/${props.firstRoomRoute}`,
            icon: <HiCollection />,
            currentPath: `/${location.pathname.split('/')[1]}/${
                location.pathname.split('/')[2]
            }/`,
            listPath: RoutePath.CoreApplication_Room + '/',
        },
        {
            id: 3,
            to: RoutePath.CoreApplication_Premium_Offer,
            icon: <MdWorkspacePremium />,
            currentPath: location.pathname.replace('%20', ''),
            listPath: RoutePath.CoreApplication_Premium_Offer,
        },
    ];
    const SideNav_Lower_List = [
        {
            id: 1,
            to: `${RoutePath.CoreApplication_Docs}/getting-started`,
            icon: <MdOutlineElectricalServices />,
            currentPath: location.pathname.replace('%20', ''),
            listPath: RoutePath.CoreApplication_Docs,
        },
        {
            id: 2,
            to: `${RoutePath.CoreApplication_Setting}/${RoutePath.Setting_Account}`,
            icon: <MdSettingsSuggest />,
            currentPath: location.pathname.replace('%20', ''),
            listPath: RoutePath.CoreApplication_Setting,
        },
    ];

    return (
        <div className="coreApplicationNav">
            {/* ************Upper Side Navigation************** */}

            <section className="coreApplication_upperNav_wrapper">
                <ul>
                    <li>
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
                        <li key={item.id}>
                            <Link to={item.to}>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        background:
                                            item.currentPath ===
                                                item.listPath ||
                                            item.currentPath.includes(
                                                item.listPath,
                                            )
                                                ? 'rgb(7, 22, 27)'
                                                : '',
                                        padding: '0.4em',
                                        borderRadius: '0.5em',
                                        borderLeft:
                                            item.currentPath ===
                                                item.listPath ||
                                            item.currentPath.includes(
                                                item.listPath,
                                            )
                                                ? '3px solid #ECE88A'
                                                : '',
                                    }}
                                >
                                    <IconContext.Provider
                                        value={{
                                            size: '2em',
                                            color:
                                                item.currentPath ===
                                                    item.listPath ||
                                                item.currentPath.includes(
                                                    item.listPath,
                                                )
                                                    ? '#CEC7BF'
                                                    : '#2E3438',
                                        }}
                                    >
                                        {item.icon}
                                    </IconContext.Provider>
                                </motion.div>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                                props.accountModelOpen
                                    ? props.closeAccount()
                                    : props.openAccount()
                            }
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2em',
                                    color: '#CEC7BF',
                                }}
                            >
                                <MdSwitchAccount />
                            </IconContext.Provider>
                        </motion.div>
                    </li>
                </ul>
            </section>

            {/* ************Lower Side Navigation************** */}

            <section className="coreApplication_lowerNav_wrapper">
                <ul>
                    {SideNav_Lower_List.map((item: any) => (
                        <li key={item.id}>
                            <Link to={item.to}>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        background:
                                            item.currentPath ===
                                                item.listPath ||
                                            item.currentPath.includes(
                                                item.listPath,
                                            )
                                                ? 'rgb(7, 22, 27)'
                                                : '',
                                        padding: '0.4em',
                                        borderRadius: '0.5em',
                                        borderLeft:
                                            item.currentPath ===
                                                item.listPath ||
                                            item.currentPath.includes(
                                                item.listPath,
                                            )
                                                ? '3px solid #ECE88A'
                                                : '',
                                    }}
                                >
                                    <IconContext.Provider
                                        value={{
                                            size: '2em',
                                            color:
                                                item.currentPath ===
                                                    item.listPath ||
                                                item.currentPath.includes(
                                                    item.listPath,
                                                )
                                                    ? '#CEC7BF'
                                                    : '#2E3438',
                                        }}
                                    >
                                        {item.icon}
                                    </IconContext.Provider>
                                </motion.div>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                                props.logoutModelOpen
                                    ? props.closeLogout()
                                    : props.openLogout()
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
    );
};

export default CoreApplicationNav;
