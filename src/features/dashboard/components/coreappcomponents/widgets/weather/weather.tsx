import { motion } from 'framer-motion';
import { memo, useMemo } from 'react';
import { IconContext } from 'react-icons';
import { CiCircleMore } from 'react-icons/ci';
import { useWeatherQuoteData } from '../../../../../../core/api/coreappapis';
import { useBackDropOpen, useTheme } from '../../../../../../core/router/themeprovider';
import { useAppSelector } from '../../../../../../core/store/reduxhooks';
import { dark_colors, light_colors } from '../../../../../../data/colorconstant';
import {
    WEATHER_EXPAND,
    LandscapeSizeM,
} from '../../../../../../data/constants';
import LoadingFade from '../../../../../../shared/commoncomponents/loadinganimation/loadingfade';
import WidgetError from '../../../../../../shared/commoncomponents/widgeterror/widgeterror';
import {
    changeWeatherIcon,
    getFormattedDate,
} from '../../../../../../utils/helperfn';
import { WeatherData } from './types';
import Expand from './expand';
import './weather.css';

const Weather = memo(() => {
    const profileId = useAppSelector((state) => state?.user?.profileId);
    const darkTheme = useTheme();
    const { toggleBackDropOpen } = useBackDropOpen();

    const { isLoading, isError, data } = useWeatherQuoteData(profileId, darkTheme);

    // Optimized Color Selection via useMemo (FAANG Standard)
    const color = useMemo(() => (darkTheme ? dark_colors : light_colors), [darkTheme]);

    // Memoized Data Derivation
    const weather = useMemo<WeatherData | undefined>(() => data?.data?.body?.weatherData, [data]);
    const state = useMemo(() => data?.data?.headers?.state?.[0], [data]);
    const iconCode = useMemo(() => weather?.weather?.[0]?.icon, [weather]);
    const icon = useMemo(() => changeWeatherIcon(iconCode || ''), [iconCode]);

    const openExpand = () => {
        if (!weather) return;
        const backdropId = WEATHER_EXPAND;
        toggleBackDropOpen(
            backdropId,
            <Expand
                weather={weather}
                state={state}
                darkTheme={darkTheme}
            />,
            LandscapeSizeM,
        );
    };

    return (
        <div className="weather">
            {isLoading && (
                <div className="weather_isLoading">
                    <LoadingFade />
                </div>
            )}
            {!isLoading && isError && (
                <div className="weather_error">
                    <WidgetError darkTheme={darkTheme} />
                </div>
            )}
            {!isLoading && !isError && weather && (
                <div className="weather_wrapper">
                    <section style={{ backgroundColor: color?.element }}>
                        <span>
                            <IconContext.Provider
                                value={{
                                    size: '3em',
                                    color: iconCode?.charAt(2) === 'n' ? '#63787F' : 'yellow',
                                }}
                            >
                                {icon}
                            </IconContext.Provider>
                            <p style={{ color: color?.text }}>
                                {weather.weather[0]?.main}
                            </p>
                        </span>
                        <motion.span
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={openExpand}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2em',
                                    color: color?.text,
                                }}
                            >
                                <CiCircleMore />
                            </IconContext.Provider>
                        </motion.span>
                    </section>
                    <section>
                        <span style={{ backgroundColor: color?.outer }}>
                            <h1 style={{ color: color?.button }}>
                                {Math.round(weather.main.temp)}
                                &deg;
                                <span style={{ width: '50px', height: '50px', color: color.button }}>
                                    c
                                </span>
                            </h1>
                            <p style={{ color: color?.text }}>
                                {weather.name}, {weather.sys.country}
                            </p>
                        </span>
                        <span
                            style={{
                                backgroundColor: `${color?.button.split(')')[0]},0.5)`,
                                color: color?.text,
                            }}
                        >
                            {getFormattedDate()}
                        </span>
                    </section>
                </div>
            )}
        </div>
    );
});

export default Weather;
