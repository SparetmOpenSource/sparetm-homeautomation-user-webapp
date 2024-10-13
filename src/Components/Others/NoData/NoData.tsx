import { useEffect, useState } from 'react';
import './NoData.css';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import { useTheme } from '../../../Pages/ThemeProvider';
import Error from './../../../Assets/Error.svg';
// import { useNavigate } from 'react-router-dom';

const NoData = ({ item, fn, message1, onClickMessage, message2 }: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    // const navigate = useNavigate();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="noData">
            <img
                src={Error}
                height="40%"
                width="40%"
                loading="lazy"
                alt="home_icon"
            />
            <h1 style={{ color: color?.icon }}>No {item} found!</h1>
            <p style={{ color: color?.icon }}>
                {/* May be go{' '} */}
                {message1}
                <span
                    style={{ color: color?.button }}
                    // onClick={() => navigate(-1)}
                    onClick={() => fn()}
                >
                    {/* back */}
                    {onClickMessage}
                </span>{' '}
                {/* and try different keyword */}
                {message2}
            </p>
        </div>
    );
};

export default NoData;
