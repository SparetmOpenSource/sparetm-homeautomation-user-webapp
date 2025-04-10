import './ErrorPage.css';
import { useNavigate } from 'react-router-dom';
import WentWrong from './../../../Assets/Wrong.svg';
import { useEffect, useState } from 'react';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import { useTheme } from '../../../Pages/ThemeProvider';
import Button from '../CustomButton/Button';
import { reloadPage } from '../../../Utils/HelperFn';

const ErrorPage = ({ enableBtn, navigate, darkTheme }: any) => {
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
            <h1 style={{ color: color?.icon }}>Something went wrong!</h1>
            {enableBtn && (
                <p style={{ color: color?.text }}>Please choose an option</p>
            )}
            {enableBtn && (
                <section>
                    <Button
                        label="Try Again"
                        textCol={color?.button}
                        backCol={color?.inner}
                        backColOnDis={color?.element}
                        width="250px"
                        status={false}
                        border={color?.button}
                        fn={() => reloadPage()}
                    />
                    <Button
                        label="Go Back"
                        textCol={color?.button}
                        backCol={color?.inner}
                        backColOnDis={color?.element}
                        width="250px"
                        status={false}
                        border={color?.button}
                        fn={() => navigate(-1)}
                    />
                </section>
            )}
        </div>
    );
};

export default ErrorPage;
