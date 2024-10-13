import { GiCableStayedBridge } from 'react-icons/gi';
import Search from '../../Search/Search';
import './UpperNavigation.css';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { APPNAME } from '../../../../Data/Constants';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { useEffect, useState } from 'react';
import { useTheme } from '../../../../Pages/ThemeProvider';
import { useLocation } from 'react-router-dom';
import { isSearchActive, uriArray } from '../../../../Utils/HelperFn';

const UpperNavigation = ({ upper_nav_option }: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const location = useLocation();
    const [isSearchEnable, setIsSearchEnable] = useState<any>(false);
    const [currentPath, setCurrentPath] = useState<string>();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const isEnabled = isSearchActive(
            uriArray,
            `/${currentPath?.split('/')[1]}/${currentPath?.split('/')[2]}`,
        );
        setIsSearchEnable(isEnabled);
    }, [currentPath]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="upper_navigation">
            <section
                className="upper_navigation_logo"
                style={{ color: color?.text }}
            >
                <p>{APPNAME}</p>
                &nbsp;&nbsp;
                <IconContext.Provider
                    value={{
                        size: '1em',
                        color: color?.button,
                    }}
                >
                    <GiCableStayedBridge />
                </IconContext.Provider>
            </section>
            <section className="upper_navigation_search">
                {isSearchEnable && <Search placeholder="Type to search" />}
            </section>
            <section className="upper_navigation_user_option">
                {upper_nav_option?.map((item: any) => (
                    <section key={item?.id}>
                        <motion.span
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={item?.fn}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '1.5em',
                                    color: item?.color,
                                }}
                            >
                                {item?.icon}
                            </IconContext.Provider>
                        </motion.span>
                    </section>
                ))}
            </section>
        </div>
    );
};
export default UpperNavigation;
