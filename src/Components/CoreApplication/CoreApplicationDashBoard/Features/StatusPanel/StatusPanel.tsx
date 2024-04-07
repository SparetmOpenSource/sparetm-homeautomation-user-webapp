import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import './StatusPanel.css';
import { catchError, changeWeatherIcon } from '../../../../../Utils/HelperFn';
import { getWeatherQuote } from '../../../../../Api.tsx/CoreAppApis';
import { useReactQuery_Get } from '../../../../../Api.tsx/useReactQuery_Get';
import LoadingFade from '../../../../Others/LoadingAnimation/LoadingFade';
import {
    Current_Date_Time,
    weather_quote_constant,
} from '../../../../../Data/Constants';
import WindowBackdropModel from '../../../../Others/BackdropModel/WindowBackdropModel/WindowBackdropModel';
import ExpWeatherPanel from './ExpWeatherPanel/ExpWeatherPanel';
import {
    getProfileId,
    getProfileName,
} from '../../../../../Utils/ProfileConfigHelperFn';

const StatusPanel = () => {
    /*************************************BACKDROP*************************************/

    const [openWeatherModel, setOpenWeatherModel] = useState(false);
    const closeWeather = () => {
        setOpenWeatherModel(false);
    };
    const openWeather = () => {
        setOpenWeatherModel(true);
    };

    /*************************************BACKDROP*************************************/
    const profileId = getProfileId();
    const profileName = getProfileName();

    /*{----------------------------------------------------------------------------------------------------------}*/

    const weatherQuoteFn = () => {
        return getWeatherQuote(profileId);
    };
    const on_Success = () => {
        //toast.success(`Refreshed weather & quote`);
    };
    const on_Error = (error: any) => {
        catchError(error);
    };

    const { isLoading, data } = useReactQuery_Get(
        'get_weather_quote',
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
    const quote: any = data?.data?.body?.quoteData;
    let icon = changeWeatherIcon(iconCode);

    return (
        <div className="coreAppDashboardStatusPanel">
            {isLoading && (
                <div className="coreAppDashboardStatusPanel_isLoading">
                    <LoadingFade />
                </div>
            )}
            {/* {isError && !isLoading && (
                <div className="coreAppDashboardStatusPanel_isLoading">
                    <h1>{error}</h1>
                </div>
            )} */}
            {!isLoading && (
                <div className="coreAppDashboardStatusPanel_isLoaded">
                    {/* **********************Weather Panel************************** */}

                    <motion.section
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.95, border: '2px solid lavender' }}
                        onClick={() => openWeather()}
                    >
                        <section>
                            <div
                                style={{
                                    height: '70%',
                                    width: '100%',
                                }}
                            >
                                <h1>
                                    {Math.round(weather?.main?.temp)}
                                    &#8451;
                                </h1>
                            </div>
                            <div
                                style={{
                                    height: '30%',
                                    width: '100%',
                                }}
                            >
                                <p>
                                    {weather?.name}, {weather?.sys?.country}
                                </p>
                            </div>
                        </section>
                        <section>
                            <div
                                style={{
                                    height: '70%',
                                    width: '100%',
                                }}
                            >
                                <IconContext.Provider
                                    value={{
                                        size: '5em',
                                        color:
                                            iconCode?.charAt(2) === 'n'
                                                ? '#63787F'
                                                : 'orange',
                                    }}
                                >
                                    {icon}
                                </IconContext.Provider>
                            </div>
                            <div
                                style={{
                                    height: '30%',
                                    width: '100%',
                                }}
                            >
                                <p style={{ color: 'orangered' }}>
                                    {weather?.weather[0]?.main}
                                </p>
                            </div>
                        </section>
                    </motion.section>

                    {/* **********************Quote Panel************************** */}

                    <section>
                        <div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '1rem',
                                }}
                            >
                                <p
                                    style={{
                                        marginBottom: '0.5em',
                                        color: 'white',
                                        fontSize: '1.8rem',
                                        fontWeight: '400',
                                    }}
                                >
                                    {Current_Date_Time}
                                </p>
                            </div>
                            <div>
                                <p
                                    style={{
                                        marginBottom: '0.5em',
                                        color: 'white',
                                        fontWeight: '400',
                                    }}
                                >
                                    Hi&nbsp;!
                                </p>
                                <p
                                    style={{
                                        color: 'black',
                                        fontWeight: '900',
                                    }}
                                >
                                    {profileName}
                                </p>
                            </div>
                        </div>
                        <div
                            style={{
                                borderTop: '2px solid white',
                            }}
                        >
                            <q
                                style={{
                                    color: 'black',
                                }}
                            >
                                &nbsp;{quote?.text}
                            </q>
                            <p
                                style={{
                                    color: 'gray',
                                }}
                            >
                                ~&nbsp;
                                <b>
                                    {quote?.author
                                        ? quote?.author?.split(',')[0]
                                        : '(Unknown)'}
                                </b>
                            </p>
                        </div>
                    </section>
                </div>
            )}

            {/***********************************BACKDROP*********************************/}

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {openWeatherModel && (
                    <WindowBackdropModel
                        backgroundColor="linear-gradient(69.5deg, rgba(189, 73, 255, 0.5) 18.6%, rgb(254, 76, 227,0.5) 85.9%)"
                        handleClose={closeWeather}
                    >
                        <ExpWeatherPanel
                            weather={weather}
                            iconCode={iconCode}
                            icon={icon}
                        />
                    </WindowBackdropModel>
                )}
            </AnimatePresence>

            {/***********************************BACKDROP*********************************/}
        </div>
    );
};

export default StatusPanel;
