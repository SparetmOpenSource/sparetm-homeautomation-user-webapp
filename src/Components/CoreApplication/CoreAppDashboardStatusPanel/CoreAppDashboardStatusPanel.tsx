import { motion } from 'framer-motion';
import { useState } from 'react';
import { IconContext } from 'react-icons';
//import { GiExpand } from 'react-icons/gi';
import './CoreAppDashboardStatusPanel.css';
import { ReactQueryFetch } from '../../../API/ReactQuery';
import { changeWeatherIcon } from '../../../Utils/CommonHelperFunction';
import { getProfileId } from '../../../Utils/AuthHelperFn';
import { getWeatherQuote } from '../../../API/CoreApplicationApi';

const CoreAppDashboardStatusPanel = () => {
    const [updateWeather, setUpdateWeather]: any = useState(false);
    const profileId = getProfileId();
    /*{----------------------------------------------------------------------------------------------------------}*/

    const weatherQuote = () => {
        return getWeatherQuote(profileId);
    };
    const onSuccess = (data: any) => {
        // toast.success('successfully fetched');
        console.log(data?.data?.body);
    };
    const onError = (error: any) => {
        // toast.error(error.message);
        console.log(error.response.data?.message);
    };
    const status = true;
    const { data } = ReactQueryFetch(
        'get_weather_quote',
        weatherQuote,
        onSuccess,
        onError,
        status,
    );

    /*{----------------------------------------------------------------------------------------------------------}*/

    const iconCode: string = data?.data?.body?.weatherData?.weather[0].icon;
    let icon = changeWeatherIcon(iconCode);

    return (
        <div className="coreAppDashboardStatusPanel">
            {/* **********************Weather Panel************************** */}

            <div className="coreAppDashboardStatusPanel_weather">
                <motion.section
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.95, border: '2px solid lavender' }}
                    onClick={() => {
                        setUpdateWeather(!updateWeather);
                    }}
                >
                    {/* left panel */}
                    <section>
                        <span style={{ height: '70%' }}>
                            <h1>
                                {data?.data?.body?.weatherData
                                    ? Math.round(
                                          data?.data?.body?.weatherData?.main
                                              .temp,
                                      )
                                    : '--'}
                                &#8451;
                            </h1>
                        </span>
                        <span
                            style={{
                                height: '30%',
                            }}
                        >
                            <p>
                                {data?.data?.body?.weatherData?.name},{' '}
                                {data?.data?.body?.weatherData?.sys.country}
                            </p>
                        </span>
                    </section>
                    <section>
                        <span style={{ height: '70%' }}>
                            <IconContext.Provider
                                value={{
                                    size: '5em',
                                    color:
                                        iconCode?.charAt(2) === 'n'
                                            ? '#63787F'
                                            : 'orange',
                                }}
                            >
                                <span>{icon ? icon : '----------'}</span>
                            </IconContext.Provider>
                        </span>
                        <span
                            style={{
                                height: '30%',
                            }}
                        >
                            <p style={{ color: '#D9EF82' }}>
                                {
                                    data?.data?.body?.weatherData?.weather[0]
                                        .description
                                }
                            </p>
                        </span>
                    </section>
                </motion.section>
                <section>{data?.data?.body?.quoteData?.text}</section>
            </div>
        </div>
    );
};

export default CoreAppDashboardStatusPanel;
