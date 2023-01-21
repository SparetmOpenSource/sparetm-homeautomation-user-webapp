import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { NavigationList as Navigation } from './../../../Data/ProfileConfigConstant';
import './ProfileConfigWrapper.css';
import { useEffect } from 'react';
import {
    AuthEmail,
    AuthToken,
    CountryCityStateUrl,
} from '../../../Data/ProfileConfigConstant';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { RoutePath } from '../../../Data/Constant';

const ProfileConfigWrapper = () => {
    const location = useLocation();
    const colorValue =
        location.pathname === RoutePath.AddProfileConfig
            ? '#00ffff'
            : location.pathname === RoutePath.SelectProfileConfig
            ? '#E5C454'
            : '#E57254';

    /********************************************************/

    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('api-token', AuthToken);
    headers.append('user-email', AuthEmail);

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow',
    };

    useEffect(() => {
        const getToken = async () => {
            await fetch(CountryCityStateUrl, requestOptions as any)
                .then((response) => response.text())
                .then((result) => {
                    localStorage.setItem(
                        'cityCountryStateToken',
                        JSON.parse(result as any)?.auth_token,
                    );
                })
                .catch((error) => console.log('error', error));
        };
        getToken();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            className="profileConfigWrapper"
            // style={{ background: "#25292D" }}
        >
            <section className="profileConfigWrapper_column_1">
                <div
                    className="profileConfigWrapper_column_1_nav"
                    style={{ background: '#2E3438', color: 'lavender' }}
                >
                    {Navigation.map((item: any) => (
                        <div key={item.id}>
                            <Link to={item.to}>
                                <motion.span
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <IconContext.Provider
                                        value={{
                                            size: '2em',
                                            color: colorValue,
                                        }}
                                    >
                                        {item.icon}
                                    </IconContext.Provider>
                                </motion.span>
                                <p>{item.label}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* ***************************** */}

            <section className="profileConfigWrapper_column_2">
                <Outlet context={colorValue} />
            </section>
        </div>
    );
};

export default ProfileConfigWrapper;
