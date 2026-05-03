import { useMemo } from 'react';
import { IconContext } from 'react-icons';
import { CgCompress } from 'react-icons/cg';
import { CiLocationOn } from 'react-icons/ci';
import { GiWhirlwind, GiWindsock } from 'react-icons/gi';
import { WiHumidity } from 'react-icons/wi';
import { dark_colors, light_colors } from '../../../../../../data/colorconstant';
import { Current_Date_Time } from '../../../../../../data/constants';
import './weather.css';

import { WeatherExpandProps } from './types';

const Expand = ({ weather, darkTheme, state }: WeatherExpandProps) => {
    const color = useMemo(() => (darkTheme ? dark_colors : light_colors), [darkTheme]);

    return (
        <div
            className="weather-expand"
            style={{ backgroundColor: color?.element }}
        >
            <section>
                <span>
                    <IconContext.Provider
                        value={{
                            size: '1.5em',
                            color: color?.button,
                        }}
                    >
                        <CiLocationOn />
                    </IconContext.Provider>
                    <i style={{ color: color?.text }}>
                        {weather.name}, {state}, {weather.sys.country}
                    </i>
                </span>
                <span style={{ color: color?.text }}>{Current_Date_Time}</span>
            </section>
            <section
                style={{ color: color?.button, backgroundColor: color?.inner }}
            >
                {Math.round(weather.main.temp)} &deg;c
            </section>
            <section
                style={{ color: color?.text, backgroundColor: color?.outer }}
            >
                {weather.weather[0]?.main}
            </section>
            <section>
                <span style={{ color: color?.text }}>
                    <IconContext.Provider
                        value={{
                            size: '2em',
                            color: color?.button,
                        }}
                    >
                        <WiHumidity />
                    </IconContext.Provider>
                    <br />
                    {weather.main.humidity} %
                </span>
                <span style={{ color: color?.text }}>
                    <IconContext.Provider
                        value={{
                            size: '2em',
                            color: color?.button,
                        }}
                    >
                        <CgCompress />
                    </IconContext.Provider>
                    <br />
                    {weather.main.pressure} hPa
                </span>
                <span style={{ color: color?.text }}>
                    <IconContext.Provider
                        value={{
                            size: '2em',
                            color: color?.button,
                        }}
                    >
                        <GiWhirlwind />
                    </IconContext.Provider>
                    <br />
                    {weather.wind.speed} m/s
                </span>
                <span style={{ color: color?.text }}>
                    <IconContext.Provider
                        value={{
                            size: '2em',
                            color: color?.button,
                        }}
                    >
                        <GiWindsock />
                    </IconContext.Provider>
                    <br />
                    {weather.wind.deg} degrees
                </span>
            </section>
        </div>
    );
};

export default Expand;
