import { useEffect, useState } from 'react';
import './SpotifyCurrentPlayback.css';
import { dark_colors, light_colors } from '../../../../../Data/ColorConstant';
import { IconContext } from 'react-icons';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import { CiWarning } from 'react-icons/ci';
import { FcAdvertising } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { FaSpotify } from 'react-icons/fa';
import { useBackDropOpen } from '../../../../../Pages/ThemeProvider';
import Expand from '../Expand/Expand';
import {
    HorizontalSize,
    SPOTIFY_ACTIVE_EXPAND,
} from '../../../../../Data/Constants';
import AudioProgressBar from '../../../Slide/AudioProgressBar/AudioProgressBar';
import {
    catchError,
    invalidateQueries,
    trimToNChars,
} from '../../../../../Utils/HelperFn';
import {
    IoPauseCircleOutline,
    IoPlayCircleOutline,
    IoPlaySkipBack,
    IoPlaySkipForward,
} from 'react-icons/io5';
import { usePostUpdateData } from '../../../../../Api.tsx/useReactQuery_Update';
import { featureUrl } from '../../../../../Api.tsx/CoreAppApis';
import { getMergedHeadersForSpotify } from '../../../../../Api.tsx/Axios';
import { GET_SPOTIFY_QUEUE_STATE_QUERY_ID } from '../../../../../Data/QueryConstant';
import { useQueryClient } from 'react-query';
import useLocalStorage from '../../../../../Hooks/UseLocalStorage';
import { SPOTIFY_TOKEN_GLOBAL } from '../../../../../Data/Constants';

const SpotifyCurrentPlayback = ({
    data,
    darkTheme,
    handleRefresh,
    windowSize,
}: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const [progress, setProgress] = useState(0);
    const queryClient = useQueryClient();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const playbackType = data?.body?.currently_playing_type;
    const { toggleBackDropOpen } = useBackDropOpen();
    const [accessToken] = useLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');
    const renderPlaybackIcon = () => {
        if (!data) return <RiNeteaseCloudMusicLine />;
        if (data && playbackType === 'unknown') return <CiWarning />;
        if (data && playbackType === 'ad') return <FcAdvertising />;
        return (
            <img
                className="spotifyCurrentPlayback-pic-image"
                src={data?.body?.item?.album?.images[0]?.url}
                alt="song_image"
                loading="lazy"
                width="95%"
                height="95%"
            />
        );
    };

    const useSpotifyMutation = (
        urlSuffix: string,
        headers: any,
        onSuccess: any,
        onError: any,
    ) =>
        usePostUpdateData(
            featureUrl.spotify_base_url + `?data=${urlSuffix}`,
            headers,
            onSuccess,
            onError,
        );

    const updateHeaderConfig = {
        headers: getMergedHeadersForSpotify(accessToken),
    };

    const onNavSuccess = () => {
        invalidateQueries(queryClient, [GET_SPOTIFY_QUEUE_STATE_QUERY_ID]);
    };

    const onNavError = (error: any) => {
        catchError(error, darkTheme);
    };

    const { mutate: next } = usePostUpdateData(
        `${featureUrl.spotify_base_url}?data=next&id=${data?.body?.device?.id}`,
        updateHeaderConfig,
        onNavSuccess,
        onNavError,
    );

    const { mutate: previous } = usePostUpdateData(
        `${featureUrl.spotify_base_url}?data=previous&id=${data?.body?.device?.id}`,
        updateHeaderConfig,
        onNavSuccess,
        onNavError,
    );

    const onError = (error: any) => catchError(error, darkTheme);
    const playMutation = useSpotifyMutation(
        'play',
        updateHeaderConfig,
        () => {},
        onError,
    );
    const pauseMutation = useSpotifyMutation(
        'pause',
        updateHeaderConfig,
        () => {},
        onError,
    );

    const togglePlayPause = () => {
        setIsPlaying((prev): boolean => !prev);
        const deviceId = data?.body?.device?.id;
        if (!isPlaying) {
            playMutation.mutate({
                device_ids: [`${deviceId}`],
                context_uri: `${data?.body?.context?.uri}`,
                offset: {
                    uri: `${data?.body?.item?.uri}`,
                },
                position_ms: `${data?.body?.progress_ms}`,
            });
        } else {
            pauseMutation.mutate({ device_ids: [`${deviceId}`] });
        }
    };

    useEffect(() => {
        data?.body?.is_playing === true
            ? setIsPlaying(true)
            : setIsPlaying(false);
        if (data?.body?.progress_ms) {
            setProgress(data.body.progress_ms);
        }
    }, [data]);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="spotifyCurrentPlayback">
            <section
                className={
                    windowSize === 'S'
                        ? 'spotifyCurrentPlayback-pic spotifyCurrentPlayback-pic-s'
                        : 'spotifyCurrentPlayback-pic spotifyCurrentPlayback-pic-xl'
                }
            >
                <span style={{ backgroundColor: color?.outer }}>
                    <IconContext.Provider
                        value={{ size: '6em', color: color?.text }}
                    >
                        {renderPlaybackIcon()}
                    </IconContext.Provider>
                </span>
            </section>
            <section
                className={
                    windowSize === 'S'
                        ? 'spotifyCurrentPlayback-info spotifyCurrentPlayback-info-s'
                        : 'spotifyCurrentPlayback-info spotifyCurrentPlayback-info-xl'
                }
                style={{
                    backgroundColor: windowSize === 'XL' ? color?.inner : null,
                }}
            >
                {data &&
                    (playbackType === 'unknown' ||
                        playbackType === 'episode') && (
                        <span
                            className={
                                windowSize === 'S'
                                    ? 'spotifyCurrentPlayback-info-unknown spotifyCurrentPlayback-info-unknown-s'
                                    : 'spotifyCurrentPlayback-info-unknown'
                            }
                        >
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
                {/*  */}
                {data && playbackType === 'ad' && (
                    <span
                        className={
                            windowSize === 'S'
                                ? 'spotifyCurrentPlayback-info-ad spotifyCurrentPlayback-info-ad-s'
                                : 'spotifyCurrentPlayback-info-ad'
                        }
                    >
                        <h1 style={{ color: color?.icon }}>
                            Playing advertisement...
                        </h1>
                        <p style={{ color: color?.icon }}>
                            Upgrade to Spotify Premium to enjoy ad-free music.
                        </p>
                    </span>
                )}
                {/*  */}
                {!data && (
                    <span
                        className={
                            windowSize === 'S'
                                ? 'spotifyCurrentPlayback-info-no-data spotifyCurrentPlayback-info-no-data-s'
                                : 'spotifyCurrentPlayback-info-no-data'
                        }
                    >
                        <h1 style={{ color: color?.icon }}>
                            No playback device found !
                        </h1>
                        <p style={{ color: color?.icon }}>
                            Play something on Spotify app to continue.
                        </p>
                    </span>
                )}
                {/* *********** */}
                {data && playbackType === 'track' && (
                    <span
                        className={
                            windowSize === 'S'
                                ? 'spotifyCurrentPlayback-info-playing spotifyCurrentPlayback-info-playing-s'
                                : 'spotifyCurrentPlayback-info-playing spotifyCurrentPlayback-info-playing-xl'
                        }
                    >
                        <div
                            className={
                                windowSize === 'XL'
                                    ? 'spotifyCurrentPlayback-info-playing-song-info'
                                    : ''
                            }
                        >
                            <h1 style={{ color: color?.text }}>
                                {trimToNChars(data?.body?.item?.name, 15)}
                            </h1>
                            <p style={{ color: color?.icon_font }}>
                                {trimToNChars(
                                    data?.body?.item?.album?.artists[0]?.name,
                                    12,
                                )}
                            </p>
                            {windowSize === 'S' && (
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
                                        {trimToNChars(
                                            data?.body?.item?.album?.name,
                                            12,
                                        )}
                                    </span>
                                </p>
                            )}
                        </div>
                        {(windowSize === 'S' || windowSize === 'XL') && (
                            <div
                                className={
                                    windowSize === 'S'
                                        ? 'spotifyCurrentPlayback-info-playing-progress spotifyCurrentPlayback-info-playing-progress-s'
                                        : 'spotifyCurrentPlayback-info-playing-progress spotifyCurrentPlayback-info-playing-progress-xl'
                                }
                            >
                                <AudioProgressBar
                                    totalTimeMs={data?.body?.item?.duration_ms}
                                    progressTimeMs={progress}
                                    onSeek={setProgress}
                                    currentPlaybackData={data}
                                    darkTheme={darkTheme}
                                />
                            </div>
                        )}
                        {windowSize === 'XL' && (
                            <div
                                className={
                                    windowSize === 'S'
                                        ? 'spotifyCurrentPlayback-info-playing-btn spotifyCurrentPlayback-info-playing-btn-s'
                                        : 'spotifyCurrentPlayback-info-playing-btn spotifyCurrentPlayback-info-playing-btn-xl'
                                }
                            >
                                <motion.span
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => previous({})}
                                >
                                    <IconContext.Provider
                                        value={{
                                            size: '1.5em',
                                            color: color.text,
                                        }}
                                    >
                                        <IoPlaySkipBack />
                                    </IconContext.Provider>
                                </motion.span>

                                <motion.span
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => togglePlayPause()}
                                >
                                    <IconContext.Provider
                                        value={{
                                            size: '2em',
                                            color: color.text,
                                        }}
                                    >
                                        {isPlaying ? (
                                            <IoPauseCircleOutline />
                                        ) : (
                                            <IoPlayCircleOutline />
                                        )}
                                    </IconContext.Provider>
                                </motion.span>

                                <motion.span
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => next({})}
                                >
                                    <IconContext.Provider
                                        value={{
                                            size: '1.5em',
                                            color: color.text,
                                        }}
>
                                        <IoPlaySkipForward />
                                    </IconContext.Provider>
                                </motion.span>
                            </div>
                        )}
                    </span>
                )}
                {/* *********** */}
                {windowSize === 'S' && (
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="spotifyCurrentPlayback-info-expand"
                        onClick={() =>
                            toggleBackDropOpen(
                                SPOTIFY_ACTIVE_EXPAND,
                                <Expand
                                    handleRefresh={handleRefresh}
                                    darkTheme={darkTheme}
                                />,
                                HorizontalSize,
                            )
                        }
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color: color?.success,
                            }}
                        >
                            <FaSpotify />
                        </IconContext.Provider>
                    </motion.div>
                )}
            </section>
        </div>
    );
};

export default SpotifyCurrentPlayback;
