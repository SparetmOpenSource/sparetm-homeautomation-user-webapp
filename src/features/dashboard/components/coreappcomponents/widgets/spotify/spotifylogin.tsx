// refactor code -----------------------------
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import { FaSpotify } from 'react-icons/fa';
import { handleLogin, redirect_uri, setting_up_token, useSpotifyAccessToken } from '../../../../../../core/api/spotify/api';
import './spotify.css';

import { useTheme } from '../../../../../../core/router/themeprovider';
import { dark_colors, light_colors } from '../../../../../../data/colorconstant';
import {
    SPOTIFY_ACCOUNT_TYPE_GLOBAL,
    SPOTIFY_CODE_VERIFIER,
    SPOTIFY_REFRESH_TOKEN_GLOBAL,
    SPOTIFY_TOKEN_FETCHED_GLOBAL,
    SPOTIFY_TOKEN_GLOBAL,
} from '../../../../../../data/constants';
import { useProfileLocalStorage } from '../../../../../../features/auth/utils/authhelpers';
import Button from '../../../../../../shared/commoncomponents/custombutton/button';
import LoadingFade from '../../../../../../shared/commoncomponents/loadinganimation/loadingfade';
import { catchError } from '../../../../../../utils/helperfn';
import { SpotifyActive } from './spotifyactive';

const SpotifyLogIn = ({ handleRefresh }: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const hasFetched = useRef(false);
    const [accessToken, setAccessToken] = useProfileLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');
    const [, setRefreshToken] = useProfileLocalStorage(SPOTIFY_REFRESH_TOKEN_GLOBAL, '');
    const [, setAccountType] = useProfileLocalStorage(SPOTIFY_ACCOUNT_TYPE_GLOBAL, '');
    const [tokenFetched, setTokenFetched] = useProfileLocalStorage(SPOTIFY_TOKEN_FETCHED_GLOBAL, false);

    const on_success = (data: any) => {
        const { access_token, refresh_token, accountType: acctType } = setting_up_token(data);
        if (access_token && refresh_token) {
            setAccessToken(access_token);
            setRefreshToken(refresh_token);
            setTokenFetched(true);
            handleRefresh();
        }
        if (acctType) {
            setAccountType(acctType);
        }
    };

    const on_error = (error: any) => {
        catchError(error, darkTheme);
    };

    const { mutate: callForAccessToken, isLoading: isAccessLoading } = useSpotifyAccessToken(on_success, on_error);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const codeVerifier = sessionStorage.getItem(SPOTIFY_CODE_VERIFIER);
        if (
            code &&
            codeVerifier &&
            !hasFetched.current &&
            !tokenFetched
        ) {
            callForAccessToken({ code, codeVerifier, redirect_uri });
            hasFetched.current = true;

            // Remove code from URL to prevent double invocation on re-renders
            const newUrlParams = new URLSearchParams(window.location.search);
            newUrlParams.delete('code');
            const newSearch = newUrlParams.toString();
            const newPath = window.location.pathname + (newSearch ? `?${newSearch}` : '');
            window.history.replaceState({}, document.title, newPath);
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
            {isAccessLoading && (
                <div className="spotify-isLoading">
                    <LoadingFade />
                </div>
            )}
            {!isAccessLoading && !isLoggedIn && (
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
                        fn={() => handleLogin()}
                        status={false}
                        border={color?.element}
                    />
                </div>
            )}

            {!isAccessLoading && isLoggedIn && <SpotifyActive handleRefresh={handleRefresh} />}
        </motion.div>
    );
};

export default SpotifyLogIn;
