import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './DashBoard.css';
import { useEffect, useState } from 'react';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import { useTheme } from '../../../Pages/ThemeProvider';
import Button from '../../Others/CustomButton/Button';
import { useAppSelector } from '../../../Features/ReduxHooks';
import { RoutePath } from '../../../Data/Constants';
import Spotify from '../../Others/Widgets/Spotify/SpotifyLogIn';
import { CiCircleChevLeft } from 'react-icons/ci';
import { CiCircleChevRight } from 'react-icons/ci';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import Weather from '../../Others/Widgets/Weather/Weather';
import WidgetCarousel from '../../Others/Slide/WidgetCarousel/WidgetCarousel';
import { RiCalendarTodoLine } from 'react-icons/ri';
import { IoIosStats } from 'react-icons/io';

const DashBoard = () => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const profile = useAppSelector((state: any) => state?.user?.profile);
    const currentPath = location.pathname;
    const statusListPath = RoutePath?.Dashboard_Device_Status;
    const todoListPath = RoutePath?.Dashboard_Todo;

    // const ddt = [
    //     {
    //         id: 'haskell',
    //         label: 'haskell',
    //         value: 480,
    //         color: 'hsl(252, 70%, 50%)',
    //     },
    //     {
    //         id: 'lisp',
    //         label: 'lisp',
    //         value: 166,
    //         color: 'hsl(263, 70%, 50%)',
    //     },
    //     {
    //         id: 'ruby',
    //         label: 'ruby',
    //         value: 360,
    //         color: 'hsl(13, 70%, 50%)',
    //     },
    //     {
    //         id: 'javascript',
    //         label: 'javascript',
    //         value: 464,
    //         color: 'hsl(191, 70%, 50%)',
    //     },
    //     {
    //         id: 'php',
    //         label: 'php',
    //         value: 8,
    //         color: 'rgb(0,0,0)',
    //     },
    // ];

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="dashBoard">
            <section className="dashBoard-content">
                {/*  */}
                <span>
                    <div>
                        <h1 style={{ color: color?.text }}>
                            Hi, {profile} <br /> Check your <br />
                            Activity 👋
                        </h1>
                    </div>
                    <div>
                        <motion.span
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigate(statusListPath)}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2.5em',
                                    color: color?.button,
                                }}
                            >
                                <IoIosStats />
                            </IconContext.Provider>
                        </motion.span>
                        <motion.span
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigate(todoListPath)}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2.5em',
                                    color: color?.button,
                                }}
                            >
                                <RiCalendarTodoLine />
                            </IconContext.Provider>
                        </motion.span>
                        {/* <Button
                            label="Status"
                            textCol={
                                currentPath === statusListPath ||
                                currentPath?.includes(statusListPath)
                                    ? color?.button
                                    : `${color?.button.split(')')[0]},0.3)`
                            }
                            backCol={color?.inner}
                            backColOnDis={color?.element}
                            width="150px"
                            fn={() => navigate(statusListPath)}
                            status={false}
                            border={
                                currentPath === statusListPath ||
                                currentPath?.includes(statusListPath)
                                    ? color?.button
                                    : `${color?.button.split(')')[0]},0.3)`
                            }
                        /> */}
                        {/* <Button
                            label="Todo"
                            textCol={
                                currentPath === todoListPath ||
                                currentPath?.includes(todoListPath)
                                    ? color?.button
                                    : `${color?.button.split(')')[0]},0.3)`
                            }
                            backCol={color?.inner}
                            backColOnDis={color?.inner}
                            width="150px"
                            fn={() => navigate(todoListPath)}
                            status={false}
                            border={
                                currentPath === todoListPath ||
                                currentPath?.includes(todoListPath)
                                    ? color?.button
                                    : `${color?.button.split(')')[0]},0.3)`
                            }
                        /> */}
                    </div>
                </span>
                <span>
                    {/* <Spotify />
                    <Weather /> */}
                    <WidgetCarousel />
                </span>
                <span>
                    <Outlet />
                </span>
            </section>
            <section className="dashBoard-notification">
                <span
                    style={{
                        backgroundColor: `${color?.button.split(')')[0]},0.5)`,
                    }}
                >
                    {/* <Pie data={ddt} fontColor={color} /> */}
                </span>
            </section>
        </div>
    );
};

export default DashBoard;
