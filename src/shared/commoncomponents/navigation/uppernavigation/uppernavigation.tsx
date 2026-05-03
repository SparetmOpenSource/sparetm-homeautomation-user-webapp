import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { GiCableStayedBridge } from 'react-icons/gi';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../../../core/router/themeprovider';
import { dark_colors, light_colors } from '../../../../data/colorconstant';
import { APPNAME } from '../../../../data/constants';
import { isSearchActive, uriArray } from '../../../../utils/helperfn';
import DoSearch from '../../search/dosearch';
import './uppernavigation.css';

const UpperNavigation = ({ nav_option }: any) => {
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
        const isEnabled = isSearchActive(uriArray, `${currentPath}`);
        setIsSearchEnable(isEnabled);
    }, [currentPath]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="upper-navigation">
            <section
                className="upper-navigation-logo"
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
            <section className="upper-navigation-search">
                {isSearchEnable && (
                    <DoSearch
                        placeholder="Type to search"
                        darkTheme={darkTheme}
                    />
                )}
            </section>
            <section className="upper-navigation-user-btn">
                {nav_option?.map((item: any) => (
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
