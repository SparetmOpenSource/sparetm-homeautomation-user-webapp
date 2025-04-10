import { useEffect, useState } from 'react';
import './Weather.css';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { useBackDropOpen, useTheme } from '../../../../Pages/ThemeProvider';
import {
    catchError,
    changeWeatherIcon,
    getFormattedDate,
} from '../../../../Utils/HelperFn';
import { getWeatherQuote } from '../../../../Api.tsx/CoreAppApis';
import { useReactQuery_Get } from '../../../../Api.tsx/useReactQuery_Get';
import {
    colorNotificationStatus,
    HorizontalSize,
    WEATHER_EXPAND,
    weather_quote_constant,
} from '../../../../Data/Constants';
import { SELECT_WEATHER_QUOTE_QUERY_ID } from '../../../../Data/QueryConstant';
import { useAppSelector } from '../../../../Features/ReduxHooks';
// import { useColorNotification } from '../../../../App';
import LoadingFade from '../../LoadingAnimation/LoadingFade';
import { IconContext } from 'react-icons';
import WidgetError from '../../WidgetError/WidgetError';
import { CiCircleMore } from 'react-icons/ci';
import { motion } from 'framer-motion';
import Expand from './Expand';

const Weather = () => {
    const [color, setColor] = useState<any>(light_colors);
    const profileId = useAppSelector((state: any) => state?.user?.profileId);
    // const handleColorNotificationChange = useColorNotification();
    const darkTheme: any = useTheme();

    const weatherQuoteFn = () => {
        return getWeatherQuote(profileId, darkTheme);
    };

    const on_Success = () => {
        // handleColorNotificationChange(colorNotificationStatus[0]);
    };

    const on_Error = (error: any) => {
        // handleColorNotificationChange(colorNotificationStatus[1]);
        catchError(error, darkTheme);
    };

    const { isLoading, isError, data } = useReactQuery_Get(
        SELECT_WEATHER_QUOTE_QUERY_ID,
        weatherQuoteFn,
        on_Success,
        on_Error,
        true, // !fetch_On_Click_Status
        true, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        weather_quote_constant.fetch_delay_time, // refetch_Interval
        false, // refetch_Interval_In_Background
        300000, // Cache time
        0, // Stale Time
    );

    /*{----------------------------------------------------------------------------------------------------------}*/

    const iconCode: string = data?.data?.body?.weatherData?.weather[0]?.icon;
    const weather: any = data?.data?.body?.weatherData;
    const state: any = data?.data?.headers?.state[0];
    // const quote: any = data?.data?.body?.quoteData;
    let icon = changeWeatherIcon(iconCode);

    const queryKeys = [SELECT_WEATHER_QUOTE_QUERY_ID];

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
                    <WidgetError queryKeys={queryKeys} />
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
                            // onClick={() => {
                            //     toggleBackDropOpen();
                            //     setChildForCustomBackDrop(
                            //         <Expand
                            //             weather={weather}
                            //             state={state}
                            //             darkTheme={darkTheme}
                            //         />,
                            //     );
                            //     setSizeForCustomBackDrop(HorizontalSize);
                            // }}
                            onClick={() => {
                                const backdropId = WEATHER_EXPAND; // Unique ID for this backdrop

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
                                backgroundColor: `${
                                    color?.button.split(')')[0]
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
