import React, { useEffect, useState } from 'react';
import {
    dark_colors,
    light_colors,
} from '../../../../../../Data/ColorConstant';
import { IconContext } from 'react-icons';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import {
    formatTime,
    invalidateQueries,
    trimTo8Chars,
} from '../../../../../../Utils/HelperFn';
import AudioProgressBar from '../../../../Slide/AudioProgressBar/AudioProgressBar';
import { IoPlaySkipBack } from 'react-icons/io5';
import { IoPlaySkipForward } from 'react-icons/io5';
import { IoPauseCircleOutline, IoPlayCircleOutline } from 'react-icons/io5';
import './Home.css';
import { motion } from 'framer-motion';
import { getMergedHeaders } from '../../../../../../Api.tsx/Axios';
import { usePostUpdateData } from '../../../../../../Api.tsx/useReactQuery_Update';
import { featureUrl } from '../../../../../../Api.tsx/CoreAppApis';
import { GiLoveSong } from 'react-icons/gi';
import { useReactQuery_Get } from '../../../../../../Api.tsx/useReactQuery_Get';
import { GET_SPOTIFY_QUEUE_STATE_QUERY_ID } from '../../../../../../Data/QueryConstant';
import { getQueueState } from '../../../../../../Api.tsx/Spotify/Api';
import { useQueryClient } from 'react-query';
import { FaSadTear } from 'react-icons/fa';
import { spotify_refresh_playback_constant } from '../../../../../../Data/Constants';
import { CiPlay1 } from 'react-icons/ci';
import LoadingFade from '../../../../LoadingAnimation/LoadingFade';
import SongTemplate from '../SongTemplate';

export const Home = ({ data, darkTheme, next, previous }: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const on_Success = (data: any) => {};

    const on_play_success = (data: any) => {
        console.log('gaaataaa' + data);
        let queryArray: any = [];
        queryArray.push(GET_SPOTIFY_QUEUE_STATE_QUERY_ID);
        invalidateQueries(queryClient, queryArray);
    };

    const on_Error = (error: any) => {};

    const updateHeaderConfig = {
        headers: getMergedHeaders(localStorage.getItem('spotify_access_token')),
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
        return getQueueState(darkTheme, token);
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
        play({
            device_ids: [`${data?.body?.device?.id}`],
            context_uri: `${contextUri}`,
            offset: {
                uri: `${trackUri}`,
            },
            position_ms: 0,
        });
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
            <section>
                <div style={{ backgroundColor: color?.inner }}>
                    <span>
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
                        {data !== null && data !== undefined && (
                            <img
                                className="spotify-expand-content-home-spotify-img"
                                src={data?.body?.item?.album?.images[0]?.url}
                                height="95%"
                                width="95%"
                                loading="lazy"
                                alt="song_image"
                            />
                        )}
                    </span>
                </div>
                <div style={{ backgroundColor: color?.inner }}>
                    {data !== null && data !== undefined && (
                        <section>
                            <h1 style={{ color: color?.text }}>
                                {trimTo8Chars(data?.body?.item?.name, 20)}
                            </h1>
                            <p style={{ color: color?.icon_font }}>
                                {trimTo8Chars(
                                    data?.body?.item?.album?.artists[0]?.name,
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
                                totalTimeMs={data?.body?.item?.duration_ms}
                                progressTimeMs={progress}
                                onSeek={(newTime: any) => setProgress(newTime)}
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
            </section>
            <section style={{ backgroundColor: color?.inner }}>
                <div
                    style={{ backgroundColor: color?.element }}
                    className="spotify-expand-content-home-song-header"
                >
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
                            <span style={{ color: color?.error }}>N / A</span>
                        )}
                    </p>
                    <p style={{ color: color?.success }}>
                        {data ? data?.body?.item?.album?.total_tracks : '0'}{' '}
                        <span style={{ color: color?.text }}>
                            songs in album
                        </span>
                    </p>
                </div>
                <div>
                    {!isLoading && queueData?.body?.queue.length === 0 && (
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
                    {isLoading && (
                        <div className="spotify-song-template-isLoading">
                            <LoadingFade />
                        </div>
                    )}
                    {/* {!isLoading &&
                        queueData?.body?.queue
                            ?.filter((items: any, index: number, self: any) => {
                                return (
                                    self.findIndex(
                                        (i: any) => i.id === items.id,
                                    ) === index
                                );
                            })
                            ?.map((item: any, index: number) => (
                                <SongTemplate
                                    key={item?.id}
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
                                />
                            ))} */}

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
                                />
                            ))}
                </div>
            </section>
        </div>
    );
};
