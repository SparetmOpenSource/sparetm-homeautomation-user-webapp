import './Spotify.css';
import { IconContext } from 'react-icons';
import { FaSpotify } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { useTheme } from '../../../../Pages/ThemeProvider';
import { motion } from 'framer-motion';
import Button from '../../CustomButton/Button';
import { executeLinkInNewTab } from '../../../../Utils/HelperFn';
import { loginEndpointForSpotify } from '../../../../Api.tsx/Spotify/Api';
import { SpotifyActive } from './SpotifyActive';

const Spotify = () => {
    const [token, setToken] = useState<any>('');
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();

    useEffect(() => {
        const token = window.localStorage.getItem('spotify_token');
        const hash = window.location.hash;
        window.location.hash = '';
        if (!token && hash) {
            const _token = hash.split('&')[0].split('=')[1];
            if (_token) {
                window.localStorage.setItem('spotify_token', _token);
                setToken(_token);
            }
        } else if (token) {
            setToken(token);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <motion.div
            className="spotify"
            style={{ backgroundColor: color?.element }}
        >
            {!token && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        backgroundColor: color?.outer,
                        borderRadius: '1.5rem',
                    }}
                >
                    <span
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            height: '100px',
                            width: '100px',
                        }}
                    >
                        <IconContext.Provider
                            value={{
                                size: '4em',
                                color: color?.success,
                            }}
                        >
                            <FaSpotify />
                        </IconContext.Provider>
                        <p
                            style={{
                                color: color?.success,
                                fontWeight: 'bold',
                            }}
                        >
                            Spotify
                        </p>
                    </span>
                    <Button
                        label="Login"
                        textCol={color?.text}
                        backCol={color?.button}
                        width="150px"
                        fn={() =>
                            executeLinkInNewTab(
                                loginEndpointForSpotify,
                                darkTheme,
                            )
                        }
                        status={false}
                        border={color?.element}
                    />
                </div>
            )}
            {token && <SpotifyActive darkTheme={darkTheme} token={token} />}
        </motion.div>
    );
};

export default Spotify;
