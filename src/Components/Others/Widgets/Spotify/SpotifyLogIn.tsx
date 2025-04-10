// import './Spotify.css';
// import { IconContext } from 'react-icons';
// import { FaSpotify } from 'react-icons/fa';
// import { useEffect, useRef, useState } from 'react';
// import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
// import { useTheme } from '../../../../Pages/ThemeProvider';
// import { motion } from 'framer-motion';
// import Button from '../../CustomButton/Button';
// import { SpotifyActive } from './SpotifyActive';
// import { profileUrl } from '../../../../Api.tsx/ProfileConfigApis';
// import { handleLogin } from '../../../../Api.tsx/Spotify/Api';
// import {
//     Current_Date_Time,
//     spotifyAccountType,
//     spotifyCodeVerifier,
//     spotifyRefreshToken,
//     spotifyToken,
//     spotifyTokenFetched,
//     spotifyTokenFetchedTime,
// } from '../../../../Data/Constants';
// import { usePostUpdateData } from '../../../../Api.tsx/useReactQuery_Update';
// import { updateHeaderConfig } from '../../../../Api.tsx/Axios';
// import LoadingFade from '../../LoadingAnimation/LoadingFade';

// const Spotify = ({ handleRefresh }: any) => {
//     const [color, setColor] = useState<any>(light_colors);
//     const darkTheme: any = useTheme();
//     const hasFetched = useRef(false);

//     const on_success = (data: any) => {
//         if (
//             data?.data?.body?.access_token !== undefined &&
//             data?.data?.body?.refresh_token !== undefined
//         ) {
//             localStorage.setItem(spotifyToken, data?.data?.body?.access_token);
//             localStorage.setItem(
//                 spotifyRefreshToken,
//                 data?.data?.body?.refresh_token,
//             );
//             localStorage.setItem(spotifyTokenFetched, 'true');
//             localStorage.setItem(
//                 spotifyTokenFetchedTime,
//                 `${Current_Date_Time}`,
//             );
//             handleRefresh();
//         }
//         if (data?.data?.headers?.spotify_account_type[0] !== undefined) {
//             localStorage.setItem(
//                 spotifyAccountType,
//                 data?.data?.headers?.spotify_account_type[0],
//             );
//         }
//     };

//     const on_error = () => {};

//     const { mutate: callForAccessToken } = usePostUpdateData(
//         `${profileUrl.get_spotify_access_token}`,
//         updateHeaderConfig,
//         on_success,
//         on_error,
//     );

//     const { isLoading, mutate: callForAccessTokenByRefreshToken } =
//         usePostUpdateData(
//             `${profileUrl.get_spotify_refresh_access_token}`,
//             updateHeaderConfig,
//             on_success,
//             on_error,
//         );

//     useEffect(() => {
//         const urlParams = new URLSearchParams(window.location.search);
//         const code = urlParams.get('code');
//         const hasFetchedSpotifyData = localStorage.getItem(spotifyTokenFetched);
//         if (code && !hasFetched.current && !hasFetchedSpotifyData) {
//             const codeVerifier = sessionStorage.getItem(spotifyCodeVerifier);
//             callForAccessToken({ code, codeVerifier });
//             hasFetched.current = true;
//         }
//     }, [callForAccessToken]); // eslint-disable-line react-hooks/exhaustive-deps

//     useEffect(() => {
//         darkTheme ? setColor(dark_colors) : setColor(light_colors);
//     }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

//     return (
//         <motion.div
//             className="spotify"
//             style={{ backgroundColor: color?.element }}
//         >
//             {isLoading && (
//                 <div className="spotify-isLoading">
//                     <LoadingFade />
//                 </div>
//             )}
//             {!localStorage.getItem(spotifyToken) && !isLoading && (
//                 <div
//                     style={{
//                         display: 'flex',
//                         justifyContent: 'space-evenly',
//                         alignItems: 'center',
//                         width: '100%',
//                         height: '100%',
//                         backgroundColor: color?.outer,
//                         borderRadius: '1rem',
//                     }}
//                 >
//                     <span
//                         style={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             flexDirection: 'column',
//                             height: '100px',
//                             width: '100px',
//                         }}
//                     >
//                         <IconContext.Provider
//                             value={{
//                                 size: '4em',
//                                 color: color?.success,
//                             }}
//                         >
//                             <FaSpotify />
//                         </IconContext.Provider>
//                         <p
//                             style={{
//                                 color: color?.success,
//                                 fontWeight: 'bold',
//                             }}
//                         >
//                             Spotify
//                         </p>
//                     </span>
//                     <Button
//                         label="Login with Spotify"
//                         textCol={color?.text}
//                         backCol={`${color?.button.split(')')[0]},0.6)`}
//                         width="200px"
//                         fn={() => handleLogin()}
//                         status={false}
//                         border={color?.element}
//                     />
//                 </div>
//             )}
//             {localStorage.getItem(spotifyToken) && !isLoading && (
//                 <SpotifyActive
//                     handleRefresh={handleRefresh}
//                     darkTheme={darkTheme}
//                     callForAccessTokenByRefreshToken={
//                         callForAccessTokenByRefreshToken
//                     }
//                 />
//             )}
//         </motion.div>
//     );
// };

// export default Spotify;

// refactor code -----------------------------
import './Spotify.css';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSpotify } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { profileUrl } from '../../../../Api.tsx/ProfileConfigApis';
import { handleLogin } from '../../../../Api.tsx/Spotify/Api';
import { usePostUpdateData } from '../../../../Api.tsx/useReactQuery_Update';
import { updateHeaderConfig } from '../../../../Api.tsx/Axios';
import {
    Current_Date_Time,
    spotifyAccountType,
    spotifyCodeVerifier,
    spotifyRefreshToken,
    spotifyToken,
    spotifyTokenFetched,
    spotifyTokenFetchedTime,
} from '../../../../Data/Constants';
import Button from '../../CustomButton/Button';
import LoadingFade from '../../LoadingAnimation/LoadingFade';
import { SpotifyActive } from './SpotifyActive';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { useTheme } from '../../../../Pages/ThemeProvider';

const Spotify = ({ handleRefresh }: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const hasFetched = useRef(false);

    const on_success = (data: any) => {
        const access_token = data?.data?.body?.access_token;
        const refresh_token = data?.data?.body?.refresh_token;

        if (access_token && refresh_token) {
            localStorage.setItem(spotifyToken, access_token);
            localStorage.setItem(spotifyRefreshToken, refresh_token);
            localStorage.setItem(spotifyTokenFetched, 'true');
            localStorage.setItem(
                spotifyTokenFetchedTime,
                `${Current_Date_Time}`,
            );
            handleRefresh();
        }

        const accountType = data?.data?.headers?.spotify_account_type?.[0];
        if (accountType) {
            localStorage.setItem(spotifyAccountType, accountType);
        }
    };

    const { mutate: callForAccessToken } = usePostUpdateData(
        profileUrl.get_spotify_access_token,
        updateHeaderConfig,
        on_success,
        () => {},
    );

    const { isLoading, mutate: callForAccessTokenByRefreshToken } =
        usePostUpdateData(
            profileUrl.get_spotify_refresh_access_token,
            updateHeaderConfig,
            on_success,
            () => {},
        );

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const hasFetchedSpotifyData = localStorage.getItem(spotifyTokenFetched);
        if (code && !hasFetched.current && !hasFetchedSpotifyData) {
            const codeVerifier = sessionStorage.getItem(spotifyCodeVerifier);
            callForAccessToken({ code, codeVerifier });
            hasFetched.current = true;
        }
    }, [callForAccessToken]);

    const isLoggedIn = !!localStorage.getItem(spotifyToken);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <motion.div
            className="spotify"
            style={{ backgroundColor: color?.element }}
        >
            {isLoading && (
                <div className="spotify-isLoading">
                    <LoadingFade />
                </div>
            )}

            {!isLoggedIn && !isLoading && (
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
                        fn={handleLogin}
                        status={false}
                        border={color?.element}
                    />
                </div>
            )}

            {isLoggedIn && !isLoading && (
                <SpotifyActive
                    handleRefresh={handleRefresh}
                    callForAccessTokenByRefreshToken={
                        callForAccessTokenByRefreshToken
                    }
                />
            )}
        </motion.div>
    );
};

export default Spotify;
