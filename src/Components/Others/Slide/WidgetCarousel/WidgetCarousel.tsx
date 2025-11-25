// refactor code -----------------------------
import './WidgetCarousel.css';
import { motion } from 'framer-motion';
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';
import { IconContext } from 'react-icons';
import Spotify from '../../Widgets/Spotify/SpotifyLogIn';
import Weather from '../../Widgets/Weather/Weather';
import { useMemo, useRef, useState, useCallback } from 'react';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { useTheme } from '../../../../Pages/ThemeProvider';

type WidgetItem = {
    id: number;
    component: JSX.Element;
};

const getThemeColors = (isDark: boolean) =>
    isDark ? dark_colors : light_colors;

const WidgetCarousel = () => {
    const isDarkTheme = useTheme();
    const color = useMemo(() => getThemeColors(isDarkTheme), [isDarkTheme]);

    const [refreshKey, setRefreshKey] = useState(false);

    const listRef = useRef<HTMLUListElement>(null);
    const itemRef = useRef<HTMLLIElement>(null);

    const handleClick = useCallback((direction: 'previous' | 'next') => {
        if (listRef.current && itemRef.current) {
            const itemWidth = itemRef.current.offsetWidth;
            const scrollAmount =
                direction === 'previous' ? -itemWidth * 2 : itemWidth * 2;
            listRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    }, []);

    const handleRefresh = useCallback(() => {
        setRefreshKey((prev) => !prev);
    }, []);

    const widgets: WidgetItem[] = useMemo(
        () => [
            {
                id: 1,
                component: (
                    <Spotify
                        key={refreshKey.toString()}
                        handleRefresh={handleRefresh}
                    />
                ),
            },
            { id: 2, component: <Weather /> },
            { id: 3, component: <Weather /> },
            { id: 4, component: <Weather /> },
            { id: 5, component: <Weather /> },
        ],
        [refreshKey, handleRefresh],
    );

    return (
        <div className="widgetCarousel">
            <div>
                <ul className="widgetCarousel-list" ref={listRef}>
                    {widgets.map((widget, index) => (
                        <li
                            className="widgetCarousel-list-item"
                            ref={index === 0 ? itemRef : null}
                            key={widget.id}
                        >
                            {widget.component}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleClick('next')}
                >
                    <IconContext.Provider
                        value={{ size: '2.5em', color: color.button }}
                    >
                        <CiCircleChevRight />
                    </IconContext.Provider>
                </motion.span>
                <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleClick('previous')}
                >
                    <IconContext.Provider
                        value={{ size: '2.5em', color: color.button }}
                    >
                        <CiCircleChevLeft />
                    </IconContext.Provider>
                </motion.span>
            </div>
        </div>
    );
};

export default WidgetCarousel;
