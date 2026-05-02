import { useEffect, useState } from 'react';
import './Weather.css';
import { dark_colors, light_colors } from '../../../../../Data/ColorConstant';
import { useBackDropOpen, useTheme } from '../../../../../Pages/ThemeProvider';
import {
    changeWeatherIcon,
    getFormattedDate,
} from '../../../../../Utils/HelperFn';
import { useWeatherQuoteData } from '../../../../../Api.tsx/CoreAppApis';
import {
    HorizontalSize,
    WEATHER_EXPAND,
} from '../../../../../Data/Constants';
import { useAppSelector } from '../../../../../Features/ReduxHooks';
import LoadingFade from '../../../CommonComponents/LoadingAnimation/LoadingFade';
import { IconContext } from 'react-icons';
import WidgetError from '../../../WidgetError/WidgetError';
import { CiCircleMore } from 'react-icons/ci';
import { motion } from 'framer-motion';
import Expand from './Expand';

const Weather = () => {
    const [color, setColor] = useState<any>(light_colors);
    const profileId = useAppSelector((state: any) => state?.user?.profileId);
    const darkTheme: any = useTheme();

    const { isLoading, isError, data } = useWeatherQuoteData(profileId, darkTheme);

    const iconCode: string = data?.data?.body?.weatherData?.weather[0]?.icon;
    const weather: any = data?.data?.body?.weatherData;
    const state: any = data?.data?.headers?.state[0];
    let icon = changeWeatherIcon(iconCode);
    const { toggleBackDropOpen } = useBackDropOpen();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

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
            {!isLoading && !isError && (
                <div className="weather_wrapper">
                    <section
                        style={{
                            backgroundColor: color?.element,
                        }}
                    >
                        <span>
                            <IconContext.Provider
                                value={{
                                    size: '3em',
                                    color:
                                        iconCode?.charAt(2) === 'n'
                                            ? '#63787F'
                                            : 'yellow',
                                }}
                            >
                                {icon}
                            </IconContext.Provider>
                            <p style={{ color: color?.text }}>
                                {weather?.weather[0]?.main}
                            </p>
                        </span>
                        <motion.span
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                const backdropId = WEATHER_EXPAND;

                                toggleBackDropOpen(
                                    backdropId,
                                    <Expand
                                        weather={weather}
                                        state={state}
                                        darkTheme={darkTheme}
                                    />,
                                    HorizontalSize,
                                );
                            }}
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
                        <span
                            style={{
                                backgroundColor: color?.outer,
                            }}
                        >
                            <h1 style={{ color: color?.button }}>
                                {Math.round(weather?.main?.temp)}
                                &deg;
                                <span
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        color: color?.button,
                                    }}
                                >
                                    c
                                </span>
                            </h1>
                            <p style={{ color: color?.text }}>
                                {weather?.name}, {weather?.sys?.country}
                            </p>
                        </span>
                        <span
                            style={{
                                backgroundColor: `${color?.button.split(')')[0]
                                    },0.5)`,
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
};

export default Weather;
