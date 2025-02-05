import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import {
    catchError,
    convertMsToMinutes,
    displayToastify,
    trimTo8Chars,
} from '../../../../Utils/HelperFn';
import { motion } from 'framer-motion';
import Expand from './Expand';
import {
    HorizontalSize,
    spotify_refresh_playback_constant,
} from '../../../../Data/Constants';
import { FaSpotify } from 'react-icons/fa';
import { IoPauseCircleOutline, IoPlayCircleOutline } from 'react-icons/io5';
import { useBackDropOpen } from '../../../../Pages/ThemeProvider';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { getPlaybackState } from '../../../../Api.tsx/Spotify/Api';
import { useReactQuery_Get } from '../../../../Api.tsx/useReactQuery_Get';
import { GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID } from '../../../../Data/QueryConstant';
import { VscRefresh } from 'react-icons/vsc';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../Data/Enum';
import './Spotify.css';

export const SpotifyActive = ({ darkTheme, token }: any) => {
    const [play, setPlay] = useState<boolean>(false);
    const [currentPlayingSong, setCurrentPlayingSong] = useState<string>('');
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
        setChildForCustomBackDrop,
        setSizeForCustomBackDrop,
    } = useBackDropOpen();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setPlay((prev) => !prev);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    const playbackStateFn = () => {
        return getPlaybackState(token);
    };

    const refreshStateFn = () => {
        if (!refreshOnClick) {
            // if (!refreshOnClick && autoTrigger) {
            displayToastify(
                `Refresh dissabled`,
                darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
                TOASTIFYSTATE.INFO,
            );
        } else {
            displayToastify(
                `Refreshed`,
                darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
                TOASTIFYSTATE.INFO,
            );
        }
        // setPlayBackStatus(refreshOnClick);
    };

    const on_Success = (data: any) => {
        setCurrentPlayingSong(data?.item?.name);
        console.log(data);
        // setPlayBackStatus(false);
        setPlay(data?.is_playing);
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
        spotify_refresh_playback_constant.fetch_delay_time, //false, // refetch_Interval
        false, // refetch_Interval_In_Background
        300000, // Cache time
        0, // Stale Time
    );

    return (
        <div className="spotify_container">
            <motion.span
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.85 }}
                onClick={() => refreshStateFn()}
                style={{ backgroundColor: color?.outer }}
            >
                {data === undefined && (
                    <IconContext.Provider
                        value={{
                            size: '6em',
                            color: color?.text,
                        }}
                    >
                        <RiNeteaseCloudMusicLine />
                    </IconContext.Provider>
                )}
                {data !== undefined && (
                    <img
                        className="spotify_song_image"
                        src={data?.item?.album?.images[0]?.url}
                        height="95%"
                        width="95%"
                        loading="lazy"
                        alt="song_image"
                    />
                )}
            </motion.span>
            <span>
                <div>
                    {data !== undefined && (
                        <section>
                            <h1 style={{ color: color?.text }}>
                                {trimTo8Chars(currentPlayingSong, 10)}
                            </h1>
                            <p style={{ color: color?.icon_font }}>
                                {trimTo8Chars(
                                    data?.item?.album?.artists[0]?.name,
                                    12,
                                )}
                            </p>
                            {data !== undefined && (
                                <p
                                    // className="spotify_song_progress"
                                    style={{
                                        color: color?.button,
                                    }}
                                >
                                    {convertMsToMinutes(
                                        data?.progress_ms,
                                    ).toFixed(2)}
                                    <span
                                        style={{
                                            color: color?.success,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {' '}
                                        /{' '}
                                    </span>
                                    {convertMsToMinutes(
                                        data?.item?.duration_ms,
                                    ).toFixed(2)}
                                </p>
                            )}
                        </section>
                    )}
                    {data === undefined && (
                        <p
                            style={{
                                color: color?.error,
                            }}
                        >
                            No playback device found !
                        </p>
                    )}
                    {data !== undefined && (
                        <section>
                            <h2
                                style={{
                                    marginTop: '1.5rem',
                                    fontSize: '1rem',
                                    color: color?.success,
                                }}
                            >
                                Next
                            </h2>
                            <h1 style={{ color: color?.text }}>God's Plan</h1>
                            {/* <p style={{ color: color?.icon_font }}>Drake</p> */}
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
                                <Expand darkTheme={darkTheme} />,
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
                    <motion.span
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
                    </motion.span>
                </div>
            </span>
        </div>
    );
};
