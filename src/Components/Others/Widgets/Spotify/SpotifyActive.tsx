import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import { catchError, trimTo8Chars } from '../../../../Utils/HelperFn';
import { motion } from 'framer-motion';
import Expand from './Expand/Expand';
import {
    HorizontalSize,
    spotify_refresh_playback_constant,
} from '../../../../Data/Constants';
import { FaSpotify } from 'react-icons/fa';
import { useBackDropOpen } from '../../../../Pages/ThemeProvider';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { getPlaybackState } from '../../../../Api.tsx/Spotify/Api';
import { useReactQuery_Get } from '../../../../Api.tsx/useReactQuery_Get';
import { GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID } from '../../../../Data/QueryConstant';
import './Spotify.css';
import AudioProgressBar from '../../Slide/AudioProgressBar/AudioProgressBar';

export const SpotifyActive = ({
    handleRefresh,
    darkTheme,
    // token,
    callForAccessTokenByRefreshToken,
}: any) => {
    const [play, setPlay] = useState<boolean>(false);
    // const [currentPlayingSong, setCurrentPlayingSong] = useState<string>('');
    const [progress, setProgress] = useState(0);
    // const [playBackStatus, setPlayBackStatus] = useState<boolean>(false);
    const [color, setColor] = useState<any>(light_colors);
    const [refreshOnClick, setRefreshOnClick] = useState<boolean>(true);
    // const [autoTrigger, setAutoTrigger] = useState<boolean>(() => {
    //     const storedValue = localStorage.getItem('autoTriggerSpotifyApi');
    //     return storedValue !== null ? JSON.parse(storedValue) : false;
    // });

    const pausePlay = () => {
        setPlay((prev) => !prev);

        // setAutoTrigger((prev) => !prev);
        // setRefreshOnClick((prev) => !prev);
        // displayToastify(
        //     `Spotify auto trigger ` + !autoTrigger,
        //     darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
        //     TOASTIFYSTATE.INFO,
        // );
    };

    const {
        toggleBackDropOpen,
        // toggleBackDropClose,
        setChildForCustomBackDrop,
        setSizeForCustomBackDrop,
    } = useBackDropOpen();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setPlay((prev) => !prev);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const playbackStateFn = () => {
        const token = localStorage.getItem('spotify_access_token');
        return getPlaybackState(
            darkTheme,
            callForAccessTokenByRefreshToken,
            token,
        );
    };

    // const refreshStateFn = () => {
    //     handleRefresh();
    //     // if (!refreshOnClick) {
    //     //     // if (!refreshOnClick && autoTrigger) {
    //     //     displayToastify(
    //     //         `Refresh dissabled`,
    //     //         darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
    //     //         TOASTIFYSTATE.INFO,
    //     //     );
    //     // } else {
    //     //     displayToastify(
    //     //         `Refreshed`,
    //     //         darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
    //     //         TOASTIFYSTATE.INFO,
    //     //     );
    //     // }
    //     // setPlayBackStatus(refreshOnClick);
    // };

    const on_Success = (data: any) => {
        // setCurrentPlayingSong(data?.body?.item?.name);
        //console.log(data);
        // setPlayBackStatus(false);
        setPlay(data?.is_playing);
        console.log('not expand');
    };

    const on_Error = (error: any) => {
        catchError(error, darkTheme);
        // setPlayBackStatus(false);
    };

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     //    <button onClick={() => setIsEnabled((prev) => !prev)}></button>
    //     localStorage.setItem(
    //         'autoTriggerSpotifyApi',
    //         JSON.stringify(autoTrigger),
    //     );
    // }, [autoTrigger]);

    const { isLoading, isError, data } = useReactQuery_Get(
        GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID,
        playbackStateFn,
        on_Success,
        on_Error,
        true, //playBackStatus, //true, // !fetch_On_Click_Status
        true, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        spotify_refresh_playback_constant.play_back_fetch_delay_time, //false, // refetch_Interval
        false, // refetch_Interval_In_Background
        300000, // Cache time
        0, // Stale Time
    );

    useEffect(() => {
        setProgress(data?.body?.progress_ms);
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setProgress((prev) =>
    //             Math.min(prev + 1000, data?.body?.item?.duration_ms),
    //         ); // Simulate progress update every second
    //     }, 1000);

    //     return () => clearInterval(interval); // Cleanup on unmount
    // }, []);

    return (
        <div className="spotify_container">
            <motion.span
                // whileHover={{ scale: 0.95 }}
                // whileTap={{ scale: 0.85 }}
                // onClick={() => refreshStateFn()}
                style={{ backgroundColor: color?.outer }}
            >
                {(data === null || data === undefined) && (
                    <IconContext.Provider
                        value={{
                            size: '6em',
                            color: color?.text,
                        }}
                    >
                        <RiNeteaseCloudMusicLine />
                    </IconContext.Provider>
                )}
                {data !== null && data !== undefined && (
                    <img
                        className="spotify_song_image"
                        src={data?.body?.item?.album?.images[0]?.url}
                        height="95%"
                        width="95%"
                        loading="lazy"
                        alt="song_image"
                    />
                )}
            </motion.span>
            <span>
                <div>
                    {data !== null && data !== undefined && (
                        <section>
                            <h1 style={{ color: color?.text }}>
                                {/* {trimTo8Chars(currentPlayingSong, 10)} */}
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
                                album:
                                <span
                                    style={{
                                        color: color?.icon_font,
                                    }}
                                >
                                    {' '}
                                    {trimTo8Chars(
                                        data?.body?.item?.album?.name,
                                        12,
                                    )}
                                </span>
                            </p>
                        </section>
                    )}
                    {(data === null || data === undefined) && (
                        <p
                            style={{
                                color: color?.error,
                            }}
                        >
                            {data === null
                                ? 'No playback device found !'
                                : 'An unexpected error occurred !'}
                        </p>
                    )}
                    {data !== null && data !== undefined && (
                        <section>
                            <AudioProgressBar
                                totalTimeMs={data?.body?.item?.duration_ms}
                                progressTimeMs={progress}
                                onSeek={(newTime: any) => setProgress(newTime)}
                                currentPlaybackData={data}
                                darkTheme={darkTheme}
                            />
                        </section>
                    )}
                </div>
                <div>
                    <motion.span
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            toggleBackDropOpen();
                            setChildForCustomBackDrop(
                                <Expand
                                    callForAccessTokenByRefreshToken={
                                        callForAccessTokenByRefreshToken
                                    }
                                    darkTheme={darkTheme}
                                    handleRefresh={handleRefresh}
                                    // toggleBackDropClose={toggleBackDropClose}
                                />,
                            );
                            setSizeForCustomBackDrop(HorizontalSize);
                        }}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color: color?.success,
                            }}
                        >
                            <FaSpotify />
                        </IconContext.Provider>
                    </motion.span>
                    {/* <motion.span
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => pausePlay()}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color: color?.text,
                            }}
                        >
                            {play ? (
                                <IoPauseCircleOutline />
                            ) : (
                                <IoPlayCircleOutline />
                            )}
                        </IconContext.Provider>
                    </motion.span> */}
                </div>
            </span>
        </div>
    );
};
