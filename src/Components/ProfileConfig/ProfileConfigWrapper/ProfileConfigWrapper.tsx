import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { ImProfile } from 'react-icons/im';
import { AiFillEdit, AiOutlineAppstoreAdd } from 'react-icons/ai';
import './ProfileConfigWrapper.css';
import { useEffect, useState } from 'react';
import FormToAddProfile from '../FormToAddProfile/FormToAddProfile';
import {
    AuthEmail,
    AuthToken,
    CountryCityStateUrl,
} from '../../../Data/ProfileConfigConstant';

const ProfileConfigWrapper = () => {
    const [switchProfileScreen, setSwitchProfileScreen] = useState(false);
    const [switchProfileEditScreen, setSwitchProfileEditScreen] =
        useState(false);

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

    /********************************************************/

    return (
        <div
            className="profileConfigWrapper"
            style={{ background: "'#25292D'" }}
        >
            <section className="profileConfigWrapper_column_1">
                <div
                    className="profileConfigWrapper_column_1_nav"
                    style={{ background: '#2E3438', color: 'lavender' }}
                >
                    <div onClick={() => setSwitchProfileScreen(false)}>
                        <motion.span
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <IconContext.Provider
                                value={{ size: '2em', color: '#00ffff' }}
                            >
                                <AiOutlineAppstoreAdd />
                            </IconContext.Provider>
                        </motion.span>
                        <p>Add</p>
                    </div>
                    <div
                        onClick={() => {
                            setSwitchProfileScreen(true);
                            setSwitchProfileEditScreen(false);
                        }}
                    >
                        <motion.span
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <IconContext.Provider
                                value={{ size: '2em', color: '#00ffff' }}
                            >
                                <ImProfile />
                            </IconContext.Provider>
                        </motion.span>
                        <p>Select</p>
                    </div>
                    <div
                        onClick={() => {
                            setSwitchProfileScreen(true);
                            setSwitchProfileEditScreen(true);
                        }}
                    >
                        <motion.span
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <IconContext.Provider
                                value={{ size: '2em', color: '#00ffff' }}
                            >
                                <AiFillEdit />
                            </IconContext.Provider>
                        </motion.span>
                        <p>Edit</p>
                    </div>
                </div>
            </section>

            {/* ***************************** */}

            <section className="profileConfigWrapper_column_2">
                {!switchProfileScreen && (
                    <div className="profileConfigWrapper_column_2_form">
                        <section
                            className="profileConfigWrapper_column_2_form_col_1"
                            style={{
                                background: 'rgb(0, 255, 255,0.5)',
                            }}
                        >
                            picture
                        </section>
                        <section className="profileConfigWrapper_column_2_form_col_2">
                            <FormToAddProfile />
                        </section>
                    </div>
                )}
                {switchProfileScreen &&
                    (switchProfileEditScreen ? (
                        <div className="profileConfigWrapper_column_2_edit_profile">
                            <h1>
                                This Edit Profile page is under construction.
                                Once done, you will be notify by mail.
                            </h1>
                        </div>
                    ) : (
                        <div className="profileConfigWrapper_column_2_select_profile">
                            select profile
                        </div>
                    ))}
            </section>
        </div>
    );
};

export default ProfileConfigWrapper;
