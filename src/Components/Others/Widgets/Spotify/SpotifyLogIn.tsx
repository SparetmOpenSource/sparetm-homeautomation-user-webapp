// refactor code -----------------------------
import './Spotify.css';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSpotify } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { profileUrl } from '../../../../Api.tsx/ProfileConfigApis';
import { handleLogin, setting_up_token } from '../../../../Api.tsx/Spotify/Api';
import { usePostUpdateData } from '../../../../Api.tsx/useReactQuery_Update';
import { updateHeaderConfig } from '../../../../Api.tsx/Axios';
import { spotifyCodeVerifier } from '../../../../Data/Constants';
import Button from '../../CustomButton/Button';
import { SpotifyActive } from './SpotifyActive';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { useTheme } from '../../../../Pages/ThemeProvider';
import { catchError } from '../../../../Utils/HelperFn';
import { useAppSelector, useAppDispatch } from '../../../../Features/ReduxHooks';

const Spotify = ({ handleRefresh }: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const hasFetched = useRef(false);
    const dispatch = useAppDispatch();
    const tokenFetched = useAppSelector((state) => state.spotify.tokenFetched);
    const accessToken = useAppSelector((state) => state.spotify.accessToken);

    const on_success = (data: any) => {
        setting_up_token(data, dispatch, handleRefresh);
    };

    const on_error = (error: any) => {
        catchError(error, darkTheme);
    };

    const { mutate: callForAccessToken } = usePostUpdateData(
        profileUrl.get_spotify_access_token,
        updateHeaderConfig,
        on_success,
        on_error,
    );

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const codeVerifier = sessionStorage.getItem(spotifyCodeVerifier);
        if (
            code &&
            codeVerifier &&
            !hasFetched.current &&
            !tokenFetched
        ) {
            callForAccessToken({ code, codeVerifier });
            hasFetched.current = true;
        }
    }, [callForAccessToken, tokenFetched]);

    const isLoggedIn = !!accessToken;

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <motion.div
            className="spotify"
            style={{ backgroundColor: color?.element }}
        >
            {!isLoggedIn && (
                <div
                    className="spotify-login-container"
                    style={{ backgroundColor: color?.outer }}
                >
                    <span className="spotify-icon-wrapper">
                        <IconContext.Provider
                            value={{ size: '4em', color: color?.success }}
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
                        label="Login with Spotify"
                        textCol={color?.text}
                        backCol={`${color?.button.split(')')[0]},0.6)`}
                        width="200px"
                        fn={() => handleLogin(dispatch)}
                        status={false}
                        border={color?.element}
                    />
                </div>
            )}

            {isLoggedIn && <SpotifyActive handleRefresh={handleRefresh} />}
        </motion.div>
    );
};

export default Spotify;
