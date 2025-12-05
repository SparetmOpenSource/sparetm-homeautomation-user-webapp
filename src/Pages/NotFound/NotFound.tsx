import './NotFound.css';
import CryingBaby404 from './../../Assets/CryingBaby404.svg';
import { useEffect, useState } from 'react';
import { dark_colors, light_colors } from '../../Data/ColorConstant';
import { useTheme } from '../ThemeProvider';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../Components/Others/PageTransition/PageTransition';

const NotFound = () => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <PageTransition>
            <div className="notFount" style={{ backgroundColor: color?.inner }}>
                <section>
                    <p style={{ color: color?.icon }}>4</p>
                    <img
                        className="notFount_img"
                        src={CryingBaby404}
                        height="90%"
                        width="40%"
                        loading="lazy"
                        alt="404_icon"
                    />
                    <p style={{ color: color?.icon }}>4</p>
                </section>
                <section style={{ color: color?.text }}>
                    <h1 style={{ color: color?.button }}>Oopsy daisies!</h1>
                    <h2>Sorry, but that page seems to be missing.</h2>
                    <p>We've been informed about it and will fix it right away.</p>
                    <p>In the meantime, why not explore more about the app?</p>
                    <p>
                        or{' '}
                        <span
                            onClick={() => navigate(-1)}
                            style={{ color: color?.button }}
                        >
                            crawl back to the previous page
                        </span>
                        ?
                    </p>
                </section>
            </div>
        </PageTransition>
    );
};

export default NotFound;
