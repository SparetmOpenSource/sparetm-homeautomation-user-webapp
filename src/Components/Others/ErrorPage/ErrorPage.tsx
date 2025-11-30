import WentWrong from './../../../Assets/Wrong.svg';
import { useEffect, useState } from 'react';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import './ErrorPage.css';

const ErrorPage = ({ errMsg, darkTheme }: any) => {
    const [color, setColor] = useState<any>(light_colors);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="error">
            <img
                src={WentWrong}
                height="40%"
                width="40%"
                loading="lazy"
                alt="home_icon"
            />
            <h1 style={{ color: color?.icon }}>{errMsg || 'Something went wrong!'}</h1>
        </div>
    );
};

export default ErrorPage;
