import { useEffect, useState } from 'react';
import './Weather.css';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { CiLocationOn } from 'react-icons/ci';
import { IconContext } from 'react-icons';
import { Current_Date_Time } from '../../../../Data/Constants';
import { WiHumidity } from 'react-icons/wi';
import { CgCompress } from 'react-icons/cg';
import { GiWhirlwind, GiWindsock } from 'react-icons/gi';

const Expand = ({ weather, darkTheme, state }: any) => {
    const [color, setColor] = useState<any>(light_colors);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

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
                        {weather?.name}, {state}, {weather?.sys?.country}
                    </i>
                </span>
                <span style={{ color: color?.text }}>{Current_Date_Time}</span>
            </section>
            <section
                style={{ color: color?.button, backgroundColor: color?.inner }}
            >
                {Math.round(weather?.main?.temp)} &deg;c
            </section>
            <section
                style={{ color: color?.text, backgroundColor: color?.outer }}
            >
                {weather?.weather[0]?.main}
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
                    {weather?.main?.humidity} %
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
                    {weather?.main?.pressure} hPa
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
                    {weather?.wind?.speed} m/s
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
                    {weather?.wind?.deg} degrees
                </span>
            </section>
        </div>
    );
};

export default Expand;
