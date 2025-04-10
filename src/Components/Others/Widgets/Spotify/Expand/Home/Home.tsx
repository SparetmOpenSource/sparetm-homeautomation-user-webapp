import { useEffect, useState } from 'react';
import {
    dark_colors,
    light_colors,
} from '../../../../../../Data/ColorConstant';
import { IconContext } from 'react-icons';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import {
    catchError,
    displayToastify,
    invalidateQueries,
    trimTo8Chars,
} from '../../../../../../Utils/HelperFn';
import AudioProgressBar from '../../../../Slide/AudioProgressBar/AudioProgressBar';
import { IoPlaySkipBack } from 'react-icons/io5';
import { IoPlaySkipForward } from 'react-icons/io5';
import { IoPauseCircleOutline, IoPlayCircleOutline } from 'react-icons/io5';
import './Home.css';
import { motion } from 'framer-motion';
import { getMergedHeadersForSpotify } from '../../../../../../Api.tsx/Axios';
import { usePostUpdateData } from '../../../../../../Api.tsx/useReactQuery_Update';
import { featureUrl } from '../../../../../../Api.tsx/CoreAppApis';
import { useReactQuery_Get } from '../../../../../../Api.tsx/useReactQuery_Get';
import { GET_SPOTIFY_QUEUE_STATE_QUERY_ID } from '../../../../../../Data/QueryConstant';
import { getQueueState } from '../../../../../../Api.tsx/Spotify/Api';
import { useQueryClient } from 'react-query';
import { FaSadTear } from 'react-icons/fa';
import {
    LandscapeSizeS,
    SPOTIFY_EXPAND_ADD_ALBUM_CONFIRMATION,
    spotifyAccountType,
    spotifyAlbumAddition,
    spotifyNonPremiumWarning,
} from '../../../../../../Data/Constants';
import { CiWarning } from 'react-icons/ci';
import LoadingFade from '../../../../LoadingAnimation/LoadingFade';
import SongTemplate from '../SongTemplate';
import { IoIosAddCircle } from 'react-icons/io';
import { useBackDropOpen } from '../../../../../../Pages/ThemeProvider';
import Confirmation from '../../../../BackDrop/Confirmation/Confirmation';
import { FcAdvertising } from 'react-icons/fc';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../../Data/Enum';
import Error from './../../../../ErrorPage/ErrorPage';

export const Home = ({ data, darkTheme, next, previous }: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();
    const spotifyAcntType = localStorage.getItem(spotifyAccountType);

    const on_Success = () => {};

    const on_add_to_album_success = () => {
        displayToastify(
            spotifyAlbumAddition,
            darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
            TOASTIFYSTATE.SUCCESS,
        );
        toggleBackDropClose(SPOTIFY_EXPAND_ADD_ALBUM_CONFIRMATION);
    };

    const on_play_success = () => {
        let queryArray: any = [];
        queryArray.push(GET_SPOTIFY_QUEUE_STATE_QUERY_ID);
        invalidateQueries(queryClient, queryArray);
    };

    const on_Error = (error: any) => {
        catchError(error, darkTheme);
    };

    const updateHeaderConfig = {
        headers: getMergedHeadersForSpotify(
            localStorage.getItem('spotify_access_token'),
        ),
    };

    const { mutate: play } = usePostUpdateData(
        featureUrl.spotify_base_url + `?data=play`,
        updateHeaderConfig,
        on_play_success,
        on_Error,
    );

    const { mutate: pause } = usePostUpdateData(
        featureUrl.spotify_base_url + `?data=pause`,
        updateHeaderConfig,
        on_Success,
        on_Error,
    );

    const { mutate: addToAlbum } = usePostUpdateData(
        featureUrl.spotify_base_url + `?data=addtoalbum`,
        updateHeaderConfig,
        on_add_to_album_success,
        on_Error,
    );

    const isPlayingFn = () => {
        setIsPlaying((prev): boolean => !prev);
        if (!isPlaying) {
            play({
                device_ids: [`${data?.body?.device?.id}`],
                context_uri: `${data?.body?.context?.uri}`,
                offset: {
                    uri: `${data?.body?.item?.uri}`,
                },
                position_ms: `${data?.body?.progress_ms}`,
            });
        } else {
            pause({ device_ids: [`${data?.body?.device?.id}`] });
        }
    };

    const getQueueStateFn = () => {
        const token = localStorage.getItem('spotify_access_token');
        return getQueueState(token);
    };

    const {
        isLoading,
        isError,
        data: queueData,
    } = useReactQuery_Get(
        GET_SPOTIFY_QUEUE_STATE_QUERY_ID,
        getQueueStateFn,
        on_Success,
        on_Error,
        true, //playBackStatus, //true, // !fetch_On_Click_Status
        true, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        100, // Cache time
        0, // Stale Time
    ); //spotify_refresh_playback_constant.queue_fetch_delay_time,

    const startPlayingFn = (trackUri: any, data: any, contextUri: any) => {
        if (spotifyAcntType === 'premium') {
            play({
                device_ids: [`${data?.body?.device?.id}`],
                context_uri: `${contextUri}`,
                offset: {
                    uri: `${trackUri}`,
                },
                position_ms: 0,
            });
        } else {
            displayToastify(
                spotifyNonPremiumWarning,
                darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
                TOASTIFYSTATE.WARN,
            );
        }
    };

    useEffect(() => {
        setIsPlaying(data?.body?.is_playing);
        setProgress(data?.body?.progress_ms);
        let queryArray: any = [];
        queryArray.push(GET_SPOTIFY_QUEUE_STATE_QUERY_ID);
        invalidateQueries(queryClient, queryArray);
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="spotify-expand-content-home">
            <section className="spotify-expand-content-home-song-widget">
                <div style={{ backgroundColor: color?.inner }}>
                    <span>
                        {data !== null &&
                            data !== undefined &&
                            data?.body?.currently_playing_type ===
                                'unknown' && (
                                <IconContext.Provider
                                    value={{
                                        size: '6em',
                                        color: color?.error,
                                    }}
                                >
                                    <CiWarning />
                                </IconContext.Provider>
                            )}
                        {data !== null &&
                            data !== undefined &&
                            data?.body?.currently_playing_type === 'ad' && (
                                <IconContext.Provider
                                    value={{
                                        size: '6em',
                                    }}
                                >
                                    <FcAdvertising />
                                </IconContext.Provider>
                            )}
                        {(data === null || data === undefined) && (
                            <IconContext.Provider
                                value={{
                                    size: '8em',
                                    color: color?.text,
                                }}
                            >
                                <RiNeteaseCloudMusicLine />
                            </IconContext.Provider>
                        )}
                        {data !== null &&
                            data !== undefined &&
                            data?.body?.currently_playing_type !== 'ad' &&
                            data?.body?.currently_playing_type !==
                                'unknown' && (
                                <img
                                    className="spotify-expand-content-home-spotify-img"
                                    src={
                                        data?.body?.item?.album?.images[0]?.url
                                    }
                                    height="95%"
                                    width="95%"
                                    loading="lazy"
                                    alt="song_image"
                                />
                            )}
                    </span>
                </div>
                {data?.body?.currently_playing_type === 'unknown' && (
                    <span className="spotify_container_playing_unknown">
                        <h1 style={{ color: color?.icon }}>
                            Something went wrong...
                        </h1>
                        <p style={{ color: color?.icon }}>
                            Please check your device for more details.
                        </p>
                    </span>
                )}
                {data?.body?.currently_playing_type === 'ad' && (
                    <div className="spotify-expand-content-home-song-widget-ad">
                        <h1 style={{ color: color?.icon }}>
                            Playing advertisement...
                        </h1>
                        <p style={{ color: color?.icon }}>
                            Upgrade to Spotify Premium for a better experience
                        </p>
                    </div>
                )}
                {data?.body?.currently_playing_type !== 'ad' &&
                    data?.body?.currently_playing_type !== 'unknown' && (
                        <div
                            style={{ backgroundColor: color?.inner }}
                            className="spotify-expand-content-home-song-widget-playing"
                        >
                            {data !== null && data !== undefined && (
                                <section>
                                    <h1 style={{ color: color?.text }}>
                                        {trimTo8Chars(
                                            data?.body?.item?.name,
                                            20,
                                        )}
                                    </h1>
                                    <p style={{ color: color?.icon_font }}>
                                        {trimTo8Chars(
                                            data?.body?.item?.album?.artists[0]
                                                ?.name,
                                            20,
                                        )}
                                    </p>
                                </section>
                            )}
                            {(data === null || data === undefined) && (
                                <section>
                                    <p
                                        style={{
                                            color: color?.error,
                                        }}
                                    >
                                        {data === null
                                            ? 'No playback device found !'
                                            : 'An unexpected error occurred !'}
                                    </p>
                                </section>
                            )}

                            {data !== null && data !== undefined && (
                                <section>
                                    <AudioProgressBar
                                        totalTimeMs={
                                            data?.body?.item?.duration_ms
                                        }
                                        progressTimeMs={progress}
                                        onSeek={(newTime: any) =>
                                            setProgress(newTime)
                                        }
                                        currentPlaybackData={data}
                                        darkTheme={darkTheme}
                                    />
                                    <div>
                                        <motion.span
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => previous()}
                                        >
                                            <IconContext.Provider
                                                value={{
                                                    size: '1.5em',
                                                    color: color?.text,
                                                }}
                                            >
                                                <IoPlaySkipBack />
                                            </IconContext.Provider>
                                        </motion.span>

                                        <motion.span
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => isPlayingFn()}
                                        >
                                            <IconContext.Provider
                                                value={{
                                                    size: '2em',
                                                    color: color?.text,
                                                }}
                                            >
                                                {!isPlaying ? (
                                                    <IoPlayCircleOutline />
                                                ) : (
                                                    <IoPauseCircleOutline />
                                                )}
                                            </IconContext.Provider>
                                        </motion.span>
                                        <motion.span
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => next()}
                                        >
                                            <IconContext.Provider
                                                value={{
                                                    size: '1.5em',
                                                    color: color?.text,
                                                }}
                                            >
                                                <IoPlaySkipForward />
                                            </IconContext.Provider>
                                        </motion.span>
                                    </div>
                                </section>
                            )}
                        </div>
                    )}
            </section>
            <section
                style={{ backgroundColor: color?.inner }}
                className="spotify-expand-content-home-song-wrapper"
            >
                <div
                    style={{ backgroundColor: color?.element }}
                    className="spotify-expand-content-home-song-wrapper-header"
                >
                    <section>
                        <p style={{ color: color?.success }}>
                            album:{' '}
                            {data !== null && data !== undefined && (
                                <span style={{ color: color?.text }}>
                                    {trimTo8Chars(
                                        data?.body?.item?.album?.name,
                                        25,
                                    )}
                                </span>
                            )}
                            {data === null && (
                                <span style={{ color: color?.error }}>
                                    N / A
                                </span>
                            )}
                        </p>
                        <motion.span
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="spotify-expand-content-home-add-to-album"
                            onClick={() => {
                                const backdropId =
                                    SPOTIFY_EXPAND_ADD_ALBUM_CONFIRMATION; // Unique ID for this backdrop

                                toggleBackDropOpen(
                                    backdropId,
                                    <Confirmation
                                        darkTheme={darkTheme}
                                        heading="Would you like to add this album to your collection?"
                                        btnOkFn={() => {
                                            addToAlbum({
                                                id: data?.body?.item?.album?.id,
                                            });
                                            toggleBackDropClose(backdropId);
                                        }}
                                        btnCancelFn={() =>
                                            toggleBackDropClose(backdropId)
                                        }
                                        btnOkLabel="Yes, add"
                                        btnCancelLabel="Cancel"
                                    />,
                                    LandscapeSizeS,
                                );
                            }}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '1.5em',
                                    color: color?.success,
                                }}
                            >
                                <IoIosAddCircle />
                            </IconContext.Provider>
                        </motion.span>
                    </section>
                    <section>
                        <p style={{ color: color?.success }}>
                            {data ? data?.body?.item?.album?.total_tracks : '0'}{' '}
                            <span style={{ color: color?.text }}>
                                songs in album
                            </span>
                        </p>
                    </section>
                </div>
                <div>
                    {!isLoading && queueData?.body?.queue?.length === 0 && (
                        <section className="spotify-song-template-empty">
                            <IconContext.Provider
                                value={{
                                    size: '15em',
                                    color: color?.element,
                                }}
                            >
                                <FaSadTear />
                            </IconContext.Provider>
                        </section>
                    )}
                    {isLoading && !isError && (
                        <div className="spotify-song-template-isLoading">
                            <LoadingFade />
                        </div>
                    )}
                    {!isLoading && isError && (
                        <div className="spotify-song-template-isError">
                            <Error enableBtn={false} />
                        </div>
                    )}
                    {!isLoading &&
                        queueData?.body?.queue
                            ?.filter((items: any, index: number, self: any) => {
                                return (
                                    self.findIndex(
                                        (i: any) => i.id === items.id,
                                    ) === index
                                );
                            })
                            ?.sort((a: any, b: any) => {
                                const aCondition =
                                    data?.body?.item?.id === a.id;
                                const bCondition =
                                    data?.body?.item?.id === b.id;

                                if (aCondition && !bCondition) return -1;
                                if (!aCondition && bCondition) return 1;
                                return 0;
                            })
                            ?.map((item: any, index: number) => (
                                <SongTemplate
                                    key={item?.id}
                                    contextUri={data?.body?.context?.uri}
                                    startPlayingFn={startPlayingFn}
                                    trackUri={item?.uri}
                                    darkTheme={darkTheme}
                                    index={index}
                                    imgUrl={item?.album?.images[0]?.url}
                                    imgType="img"
                                    name={item?.name}
                                    artist={item?.album?.artists[0]?.name}
                                    durationMs={item?.duration_ms}
                                    data={data}
                                    id={item?.id}
                                    fnToAddTrackToQueue={() => {}}
                                    showAddToQueue={false}
                                />
                            ))}
                </div>
            </section>
        </div>
    );
};
