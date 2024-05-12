import { IconContext } from 'react-icons';
import { CgCompress } from 'react-icons/cg';
import { WiHumidity } from 'react-icons/wi';
import { GiWhirlwind, GiWindsock } from 'react-icons/gi';
import './ExpWeatherPanel.css';
import { Current_Date_Time } from '../../../../../../Data/Constants';

const ExpWeatherPanel = (props: any) => {
    return (
        <div className="expWeatherPanel">
            <section className="expWeatherPanel_main">
                <div>
                    <h1>
                        <span> {Math.round(props?.weather?.main?.temp)}</span>
                        &#8451;
                    </h1>
                </div>
                <div>
                    <IconContext.Provider
                        value={{
                            size: '10em',
                            color:
                                props?.iconCode?.charAt(2) === 'n'
                                    ? '#63787F'
                                    : 'orange',
                        }}
                    >
                        {props?.icon}
                    </IconContext.Provider>
                    <p style={{ marginTop: '1em' }}>
                        {' '}
                        {props?.weather?.weather[0]?.main}
                    </p>
                    <p>
                        <i>
                            {props?.weather?.name}, {props?.state},{' '}
                            {props?.weather?.sys?.country}
                        </i>
                    </p>
                    <p>{Current_Date_Time}</p>
                </div>
            </section>
            <section className="expWeatherPanel_sub">
                <span>
                    <IconContext.Provider
                        value={{
                            size: '4em',
                            color: 'orangered',
                        }}
                    >
                        <WiHumidity />
                    </IconContext.Provider>
                    <br />
                    {props?.weather?.main?.humidity} %
                </span>
                <span>
                    <IconContext.Provider
                        value={{
                            size: '4em',
                            color: 'orangered',
                        }}
                    >
                        <CgCompress />
                    </IconContext.Provider>
                    <br />
                    {props?.weather?.main?.pressure} hPa
                </span>
                <span>
                    <IconContext.Provider
                        value={{
                            size: '4em',
                            color: 'orangered',
                        }}
                    >
                        <GiWhirlwind />
                    </IconContext.Provider>
                    <br />
                    {props?.weather?.wind?.speed} m/s
                </span>
                <span>
                    <IconContext.Provider
                        value={{
                            size: '4em',
                            color: 'orangered',
                        }}
                    >
                        <GiWindsock />
                    </IconContext.Provider>
                    <br />
                    {props?.weather?.wind?.deg} degrees
                </span>
            </section>
        </div>
    );
};

export default ExpWeatherPanel;
