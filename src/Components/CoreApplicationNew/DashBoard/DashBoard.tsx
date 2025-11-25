import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './DashBoard.css';
import { useEffect, useState } from 'react';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import { useTheme } from '../../../Pages/ThemeProvider';
import { useAppSelector } from '../../../Features/ReduxHooks';
import { RoutePath } from '../../../Data/Constants';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import WidgetCarousel from '../../Others/Slide/WidgetCarousel/WidgetCarousel';
import { RiCalendarTodoLine } from 'react-icons/ri';
import { BsActivity } from 'react-icons/bs';

const DashBoard = () => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const navigate = useNavigate();
    const profile = useAppSelector((state: any) => state?.user?.profile);
    const statusListPath = RoutePath?.Dashboard_Device_Status;
    const todoListPath = RoutePath?.Dashboard_Todo;
    const location = useLocation();
    const { pathname } = location;
    const currentPath = pathname.replace('%20', '');

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="dashBoard">
            <section className="dashBoard-content">
                <span className="dashBoard-content-heading">
                    <div>
                        <h1 style={{ color: color?.text }}>
                            Hi, {profile} <br /> Check your <br />
                            Activity 👋
                        </h1>
                    </div>
                    <div>
                        <motion.span
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(statusListPath)}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2em',
                                    color:
                                        currentPath ===
                                        RoutePath.CoreApplication_Dashboard +
                                            RoutePath.Device_Status
                                            ? color?.button
                                            : color?.icon,
                                }}
                            >
                                <BsActivity />
                            </IconContext.Provider>
                            <p
                                style={{
                                    color:
                                        currentPath ===
                                        RoutePath.CoreApplication_Dashboard +
                                            RoutePath.Device_Status
                                            ? color?.text
                                            : color?.icon,
                                }}
                            >
                                status
                            </p>
                        </motion.span>
                        <motion.span
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(todoListPath)}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2em',
                                    color:
                                        currentPath ===
                                        RoutePath.CoreApplication_Dashboard +
                                            RoutePath.Device_Todo
                                            ? color?.button
                                            : color?.icon,
                                }}
                            >
                                <RiCalendarTodoLine />
                            </IconContext.Provider>
                            <p
                                style={{
                                    color:
                                        currentPath ===
                                        RoutePath.CoreApplication_Dashboard +
                                            RoutePath.Device_Todo
                                            ? color?.text
                                            : color?.icon,
                                }}
                            >
                                todo
                            </p>
                        </motion.span>
                    </div>
                </span>
                <span className="dashBoard-content-widget">
                    <WidgetCarousel />
                </span>
                <span className="dashBoard-content-status">
                    <Outlet />
                </span>
            </section>
            <section className="dashBoard-notification">
                <span
                    style={{
                        backgroundColor: `${color?.button.split(')')[0]},0.5)`,
                    }}
                >
                    yoyo
                </span>
            </section>
        </div>
    );
};

export default DashBoard;
