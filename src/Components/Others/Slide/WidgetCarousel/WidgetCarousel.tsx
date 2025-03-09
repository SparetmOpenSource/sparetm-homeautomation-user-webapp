import { motion } from 'framer-motion';
import './WidgetCarousel.css';
import { CiCircleChevLeft } from 'react-icons/ci';
import { CiCircleChevRight } from 'react-icons/ci';
import { IconContext } from 'react-icons';
import Spotify from '../../Widgets/Spotify/SpotifyLogIn';
import Weather from '../../Widgets/Weather/Weather';
import { useEffect, useRef, useState } from 'react';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { useTheme } from '../../../../Pages/ThemeProvider';

function WidgetCarousel() {
    const [color, setColor] = useState<any>(light_colors);
    const [refreshWidget, setRefreshWidget] = useState<boolean>(false);
    //const [keyProp, setKeyProp] = useState(0);
    const darkTheme: any = useTheme();
    const listRef = useRef<HTMLUListElement | null>(null);
    const itemRef = useRef<HTMLLIElement | null>(null);
    const handleClick = (direction: 'previous' | 'next') => {
        if (listRef.current && itemRef.current) {
            const itemWidth = itemRef.current.offsetWidth;
            const scrollAmount =
                direction === 'previous' ? -itemWidth * 2 : itemWidth * 2;
            listRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const handleRefresh = () => {
        // Update the state to trigger a re-render
        setRefreshWidget((prevKey) => !prevKey);
    };

    const WidgetList = [
        {
            id: 1,
            el: <Spotify key={refreshWidget} handleRefresh={handleRefresh} />,
            ref: { itemRef },
        },
        {
            id: 2,
            el: <Weather />,
            ref: {},
        },
        {
            id: 3,
            el: <Weather />,
            ref: {},
        },
    ];

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className="list-wrapper">
            <div>
                <ul className="list" ref={listRef}>
                    {WidgetList?.map((item: any) => (
                        <li className="item" ref={itemRef} key={item?.id}>
                            {item?.el}
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
                        value={{
                            size: '3em',
                            color: color?.button,
                        }}
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
                        value={{
                            size: '3em',
                            color: color?.button,
                        }}
                    >
                        <CiCircleChevLeft />
                    </IconContext.Provider>
                </motion.span>
            </div>
        </div>
    );
}

export default WidgetCarousel;
