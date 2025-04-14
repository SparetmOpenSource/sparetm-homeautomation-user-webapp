// import { useEffect, useState } from 'react';
// import { IconContext } from 'react-icons';
// import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
// import { catchError, trimTo8Chars } from '../../../../Utils/HelperFn';
// import { motion } from 'framer-motion';
// import Expand from './Expand/Expand';
// import {
//     HorizontalSize,
//     SPOTIFY_ACTIVE_EXPAND,
//     spotify_refresh_playback_constant,
// } from '../../../../Data/Constants';
// import { FaSpotify } from 'react-icons/fa';
// import { useBackDropOpen } from '../../../../Pages/ThemeProvider';
// import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
// import { getPlaybackState } from '../../../../Api.tsx/Spotify/Api';
// import { useReactQuery_Get } from '../../../../Api.tsx/useReactQuery_Get';
// import { GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID } from '../../../../Data/QueryConstant';
// import './Spotify.css';
// import AudioProgressBar from '../../Slide/AudioProgressBar/AudioProgressBar';
// import { FcAdvertising } from 'react-icons/fc';
// import { CiWarning } from 'react-icons/ci';

// export const SpotifyActive = ({
//     handleRefresh,
//     darkTheme,
//     callForAccessTokenByRefreshToken,
// }: any) => {
//     const [progress, setProgress] = useState(0);
//     const [color, setColor] = useState<any>(light_colors);
//     const { toggleBackDropOpen } = useBackDropOpen();

//     useEffect(() => {
//         darkTheme ? setColor(dark_colors) : setColor(light_colors);
//     }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

//     const playbackStateFn = () => {
//         const token = localStorage.getItem('spotify_access_token');
//         return getPlaybackState(
//             darkTheme,
//             callForAccessTokenByRefreshToken,
//             token,
//         );
//     };

//     const on_success = () => {
//         console.log('not expand');
//     };

//     const on_error = (error: any) => {
//         catchError(error, darkTheme);
//     };

//     useEffect(() => {
//         darkTheme ? setColor(dark_colors) : setColor(light_colors);
//     }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

//     const { data } = useReactQuery_Get(
//         GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID,
//         playbackStateFn,
//         on_success,
//         on_error,
//         true, // Only enable query when expand is NOT active
//         true, // refetch_On_Mount
//         false, // refetch_On_Window_Focus
//         spotify_refresh_playback_constant.play_back_fetch_delay_time,
//         false, // refetch_Interval_In_Background
//         300000, // Cache time
//         0, // Stale Time
//     );

//     useEffect(() => {
//         setProgress(data?.body?.progress_ms);
//     }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

//     return (
//         <div className="spotify_container">
//             <span style={{ backgroundColor: color?.outer }}>
//                 {data !== null &&
//                     data !== undefined &&
//                     data?.body?.currently_playing_type === 'unknown' && (
//                         <IconContext.Provider
//                             value={{
//                                 size: '6em',
//                                 color: color?.error,
//                             }}
//                         >
//                             <CiWarning />
//                         </IconContext.Provider>
//                     )}
//                 {data !== null &&
//                     data !== undefined &&
//                     data?.body?.currently_playing_type === 'ad' && (
//                         <IconContext.Provider
//                             value={{
//                                 size: '6em',
//                             }}
//                         >
//                             <FcAdvertising />
//                         </IconContext.Provider>
//                     )}
//                 {(data === null || data === undefined) && (
//                     <IconContext.Provider
//                         value={{
//                             size: '6em',
//                             color: color?.text,
//                         }}
//                     >
//                         <RiNeteaseCloudMusicLine />
//                     </IconContext.Provider>
//                 )}
//                 {data !== null &&
//                     data !== undefined &&
//                     data?.body?.currently_playing_type !== 'ad' &&
//                     data?.body?.currently_playing_type !== 'unknown' && (
//                         <img
//                             className="spotify_song_image"
//                             src={data?.body?.item?.album?.images[0]?.url}
//                             height="95%"
//                             width="95%"
//                             loading="lazy"
//                             alt="song_image"
//                         />
//                     )}
//             </span>
//             {data?.body?.currently_playing_type === 'unknown' && (
//                 <span className="spotify_container_playing_unknown">
//                     <h1 style={{ color: color?.icon }}>
//                         Something went wrong...
//                     </h1>
//                     <p style={{ color: color?.icon }}>
//                         Please check your device for more details.
//                     </p>
//                 </span>
//             )}
//             {data?.body?.currently_playing_type === 'ad' && (
//                 <span className="spotify_container_playing_ad">
//                     <h1 style={{ color: color?.icon }}>
//                         Playing advertisement...
//                     </h1>
//                     <p style={{ color: color?.icon }}>
//                         Upgrade to Spotify Premium to enjoy ad-free music.
//                     </p>
//                 </span>
//             )}
//             {data?.body?.currently_playing_type !== 'ad' &&
//                 data?.body?.currently_playing_type !== 'unknown' && (
//                     <span className="spotify_container_playing_song">
//                         <div>
//                             {data !== null && data !== undefined && (
//                                 <section>
//                                     <h1 style={{ color: color?.text }}>
//                                         {trimTo8Chars(
//                                             data?.body?.item?.name,
//                                             10,
//                                         )}
//                                     </h1>
//                                     <p style={{ color: color?.icon_font }}>
//                                         {trimTo8Chars(
//                                             data?.body?.item?.album?.artists[0]
//                                                 ?.name,
//                                             12,
//                                         )}
//                                     </p>
//                                     <p
//                                         style={{
//                                             color: color?.success,
//                                             fontWeight: 'bold',
//                                         }}
//                                     >
//                                         album:
//                                         <span
//                                             style={{
//                                                 color: color?.icon_font,
//                                             }}
//                                         >
//                                             {' '}
//                                             {trimTo8Chars(
//                                                 data?.body?.item?.album?.name,
//                                                 12,
//                                             )}
//                                         </span>
//                                     </p>
//                                 </section>
//                             )}
//                             {(data === null || data === undefined) && (
//                                 <p
//                                     style={{
//                                         color: color?.error,
//                                     }}
//                                 >
//                                     {data === null
//                                         ? 'No playback device found !'
//                                         : 'An unexpected error occurred !'}
//                                 </p>
//                             )}
//                             {data !== null && data !== undefined && (
//                                 <section>
//                                     <AudioProgressBar
//                                         totalTimeMs={
//                                             data?.body?.item?.duration_ms
//                                         }
//                                         progressTimeMs={progress}
//                                         onSeek={(newTime: any) =>
//                                             setProgress(newTime)
//                                         }
//                                         currentPlaybackData={data}
//                                         darkTheme={darkTheme}
//                                     />
//                                 </section>
//                             )}
//                         </div>
//                         <div>
//                             <motion.span
//                                 whileHover={{ scale: 1.2 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={() => {
//                                     const backdropId = SPOTIFY_ACTIVE_EXPAND;
//                                     toggleBackDropOpen(
//                                         backdropId,
//                                         <Expand
//                                             callForAccessTokenByRefreshToken={
//                                                 callForAccessTokenByRefreshToken
//                                             }
//                                             darkTheme={darkTheme}
//                                             handleRefresh={handleRefresh}
//                                         />,
//                                         HorizontalSize,
//                                     );
//                                 }}
//                             >
//                                 <IconContext.Provider
//                                     value={{
//                                         size: '2em',
//                                         color: color?.success,
//                                     }}
//                                 >
//                                     <FaSpotify />
//                                 </IconContext.Provider>
//                             </motion.span>
//                         </div>
//                     </span>
//                 )}
//         </div>
//     );
// };

// refactor code -----------------------------
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { FaSpotify } from 'react-icons/fa';
import { CiWarning } from 'react-icons/ci';
import { FcAdvertising } from 'react-icons/fc';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import AudioProgressBar from '../../Slide/AudioProgressBar/AudioProgressBar';
import { trimTo8Chars, catchError } from '../../../../Utils/HelperFn';
import { useReactQuery_Get } from '../../../../Api.tsx/useReactQuery_Get';
import { getPlaybackState } from '../../../../Api.tsx/Spotify/Api';
import Expand from './Expand/Expand';
import {
    SPOTIFY_ACTIVE_EXPAND,
    spotify_refresh_playback_constant,
    HorizontalSize,
} from '../../../../Data/Constants';
import { useBackDropOpen, useTheme } from '../../../../Pages/ThemeProvider';
import { GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID } from '../../../../Data/QueryConstant';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';

export const SpotifyActive = ({
    handleRefresh,
    callForAccessTokenByRefreshToken,
}: any) => {
    const [progress, setProgress] = useState(0);
    const { toggleBackDropOpen } = useBackDropOpen();
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();

    const playbackStateFn = useMemo(() => {
        const token = localStorage.getItem('spotify_access_token');
        return () =>
            getPlaybackState(
                darkTheme,
                callForAccessTokenByRefreshToken,
                token,
            );
    }, [darkTheme, callForAccessTokenByRefreshToken]);

    const { data } = useReactQuery_Get(
        GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID,
        playbackStateFn,
        () => {},
        (error: any) => catchError(error, darkTheme),
        true,
        true,
        false,
        spotify_refresh_playback_constant.play_back_fetch_delay_time,
        false,
        300000,
        0,
    );

    useEffect(() => {
        if (data?.body?.progress_ms) {
            setProgress(data.body.progress_ms);
        }
    }, [data]);

    const playbackType = data?.body?.currently_playing_type;

    const renderPlaybackIcon = () => {
        if (!data) return <RiNeteaseCloudMusicLine />;
        if (data && playbackType === 'unknown') return <CiWarning />;
        if (data && playbackType === 'ad') return <FcAdvertising />;
        return (
            <img
                className="spotify_song_image"
                src={data?.body?.item?.album?.images[0]?.url}
                alt="song_image"
                loading="lazy"
                width="95%"
                height="95%"
            />
        );
    };

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="spotify_container">
            <span style={{ backgroundColor: color?.outer }}>
                <IconContext.Provider
                    value={{ size: '6em', color: color?.text }}
                >
                    {renderPlaybackIcon()}
                </IconContext.Provider>
            </span>
            {data &&
                (playbackType === 'unknown' || playbackType === 'episode') && (
                    <span className="spotify_container_playing_unknown">
                        <h1 style={{ color: color?.icon }}>
                            Something went wrong...
                        </h1>
                        <p style={{ color: color?.icon }}>
                            {playbackType === 'unknown'
                                ? 'Please check your device for more details.'
                                : 'Episode playback not supported.'}
                        </p>
                    </span>
                )}
            {data && playbackType === 'ad' && (
                <span className="spotify_container_playing_ad">
                    <h1 style={{ color: color?.icon }}>
                        Playing advertisement...
                    </h1>
                    <p style={{ color: color?.icon }}>
                        Upgrade to Spotify Premium to enjoy ad-free music.
                    </p>
                </span>
            )}

            <span className="spotify_container_playing_song">
                {data && playbackType === 'track' && (
                    <div>
                        <section>
                            <h1 style={{ color: color?.text }}>
                                {trimTo8Chars(data?.body?.item?.name, 10)}
                            </h1>
                            <p style={{ color: color?.icon_font }}>
                                {trimTo8Chars(
                                    data?.body?.item?.album?.artists[0]?.name,
                                    12,
                                )}
                            </p>
                            <p
                                style={{
                                    color: color?.success,
                                    fontWeight: 'bold',
                                }}
                            >
                                album:{' '}
                                <span style={{ color: color?.icon_font }}>
                                    {trimTo8Chars(
                                        data?.body?.item?.album?.name,
                                        12,
                                    )}
                                </span>
                            </p>
                        </section>
                        <section>
                            <AudioProgressBar
                                totalTimeMs={data?.body?.item?.duration_ms}
                                progressTimeMs={progress}
                                onSeek={setProgress}
                                currentPlaybackData={data}
                                darkTheme={darkTheme}
                            />
                        </section>
                    </div>
                )}
                {!data && (
                    <div>
                        <h1 style={{ color: color?.icon }}>
                            No playback device found !
                        </h1>
                        <p style={{ color: color?.icon }}>
                            Play something on Spotify app to continue.
                        </p>
                    </div>
                )}
                <div>
                    <motion.span
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                            toggleBackDropOpen(
                                SPOTIFY_ACTIVE_EXPAND,
                                <Expand
                                    handleRefresh={handleRefresh}
                                    darkTheme={darkTheme}
                                    callForAccessTokenByRefreshToken={
                                        callForAccessTokenByRefreshToken
                                    }
                                />,
                                HorizontalSize,
                            )
                        }
                    >
                        <IconContext.Provider
                            value={{ size: '2em', color: color?.success }}
                        >
                            <FaSpotify />
                        </IconContext.Provider>
                    </motion.span>
                </div>
            </span>
        </div>
    );
};
