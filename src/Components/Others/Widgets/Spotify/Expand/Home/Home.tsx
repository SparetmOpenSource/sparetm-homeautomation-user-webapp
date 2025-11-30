// refactor code -----------------------------
import { useEffect, useState } from 'react';
import {
    dark_colors,
    light_colors,
} from '../../../../../../Data/ColorConstant';
import { IconContext } from 'react-icons';
import {
    catchError,
    displayToastify,
    invalidateQueries,
    trimToNChars,
} from '../../../../../../Utils/HelperFn';
import './Home.css';
import { motion } from 'framer-motion';
import { getMergedHeadersForSpotify } from '../../../../../../Api.tsx/Axios';
import { usePostUpdateData } from '../../../../../../Api.tsx/useReactQuery_Update';
import { featureUrl } from '../../../../../../Api.tsx/CoreAppApis';
import { useReactQuery_Get } from '../../../../../../Api.tsx/useReactQuery_Get';
import { GET_SPOTIFY_QUEUE_STATE_QUERY_ID } from '../../../../../../Data/QueryConstant';
import { getQueueState } from '../../../../../../Api.tsx/Spotify/Api';
import { useQueryClient } from 'react-query';
import {
    LandscapeSizeS,
    SPOTIFY_EXPAND_ADD_ALBUM_CONFIRMATION,
    spotifyAlbumAddition,
    spotifyNonPremiumWarning,
} from '../../../../../../Data/Constants';
import LoadingFade from '../../../../LoadingAnimation/LoadingFade';
import SongTemplate from '../SongTemplate';
import { useBackDropOpen } from '../../../../../../Pages/ThemeProvider';
import Confirmation from '../../../../BackDrop/Confirmation/Confirmation';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../../Data/Enum';
import Error from './../../../../ErrorPage/ErrorPage';
import { IoIosAddCircle } from 'react-icons/io';
import { FaSadTear } from 'react-icons/fa';
import SpotifyCurrentPlayback from '../../SpotifyCurrentPlayback/SpotifyCurrentPlayback';
import useLocalStorage from '../../../../../../Hooks/UseLocalStorage';
import { SPOTIFY_TOKEN_GLOBAL, SPOTIFY_ACCOUNT_TYPE_GLOBAL } from '../../../../../../Data/Constants';

const getCurrentColor = (darkTheme: boolean) =>
    darkTheme ? dark_colors : light_colors;

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

export const Home = ({ data, darkTheme }: any) => {
    const [color, setColor] = useState(getCurrentColor(darkTheme));
    const queryClient = useQueryClient();
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();
    const [spotifyAcntType] = useLocalStorage(SPOTIFY_ACCOUNT_TYPE_GLOBAL, '');
    const [accessToken] = useLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');

    const updateHeaderConfig = {
        headers: getMergedHeadersForSpotify(accessToken),
    };

    const refreshQueueState = () => {
        invalidateQueries(queryClient, [GET_SPOTIFY_QUEUE_STATE_QUERY_ID]);
    };

    const onError = (error: any) => catchError(error, darkTheme);
    const playMutation = useSpotifyMutation(
        'play',
        updateHeaderConfig,
        refreshQueueState,
        onError,
    );

    const addToAlbumMutation = useSpotifyMutation(
        'addtoalbum',
        updateHeaderConfig,
        () => {
            displayToastify(
                spotifyAlbumAddition,
                darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
                TOASTIFYSTATE.SUCCESS,
            );
            toggleBackDropClose(SPOTIFY_EXPAND_ADD_ALBUM_CONFIRMATION);
        },
        onError,
    );

    const {
        isLoading,
        isError,
        data: queueData,
    } = useReactQuery_Get(
        GET_SPOTIFY_QUEUE_STATE_QUERY_ID,
        () => getQueueState(accessToken),
        () => {},
        onError,
        true,
        true,
        false,
        false,
        false,
        100,
        0,
    );

    const startPlayingFn = (
        trackUri: string,
        data: any,
        contextUri: string,
    ) => {
        if (spotifyAcntType === 'premium') {
            playMutation.mutate({
                device_ids: [`${data?.body?.device?.id}`],
                context_uri: `${contextUri}`,
                offset: { uri: `${trackUri}` },
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

    useEffect(() => setColor(getCurrentColor(darkTheme)), [darkTheme]);

    const queue = queueData?.body?.queue ?? [];

    const filteredQueue = queue
        .filter(
            (item: any, index: any, self: any) =>
                self.findIndex((i: any) => i.id === item.id) === index,
        )
        .sort((a: any, b: any) => {
            const isCurrentA = data?.body?.item?.id === a.id;
            const isCurrentB = data?.body?.item?.id === b.id;
            return isCurrentA ? -1 : isCurrentB ? 1 : 0;
        });

    return (
        <div className="spotify-expand-content-home">
            <section className="spotify-expand-content-home-widget">
                <SpotifyCurrentPlayback
                    data={data}
                    darkTheme={darkTheme}
                    windowSize="XL"
                />
            </section>
            <section
                style={{ backgroundColor: color.inner }}
                className="spotify-expand-content-home-wrapper"
            >
                <div
                    style={{ backgroundColor: color.element }}
                    className="spotify-expand-content-home-wrapper-header"
                >
                    <section>
                        <p style={{ color: color.success }}>
                            album:{' '}
                            <span style={{ color: color.text }}>
                                {data
                                    ? trimToNChars(
                                          data.body.item?.album?.name,
                                          25,
                                      )
                                    : 'N / A'}
                            </span>
                        </p>
                        <motion.span
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="spotify-expand-content-home-wrapper-header-add-to-album"
                            onClick={() =>
                                toggleBackDropOpen(
                                    SPOTIFY_EXPAND_ADD_ALBUM_CONFIRMATION,
                                    <Confirmation
                                        darkTheme={darkTheme}
                                        heading="Would you like to add this album to your collection?"
                                        btnOkFn={() =>
                                            addToAlbumMutation.mutate({
                                                id: data?.body?.item?.album?.id,
                                            })
                                        }
                                        btnCancelFn={() =>
                                            toggleBackDropClose(
                                                SPOTIFY_EXPAND_ADD_ALBUM_CONFIRMATION,
                                            )
                                        }
                                        btnOkLabel="Yes, add"
                                        btnCancelLabel="Cancel"
                                    />,
                                    LandscapeSizeS,
                                )
                            }
                        >
                            <IconContext.Provider
                                value={{ size: '1.5em', color: color.success }}
                            >
                                <IoIosAddCircle />
                            </IconContext.Provider>
                        </motion.span>
                    </section>
                    <section>
                        <p style={{ color: color.success }}>
                            {data ? data.body.item?.album?.total_tracks : '0'}{' '}
                            <span style={{ color: color.text }}>
                                songs in album
                            </span>
                        </p>
                    </section>
                </div>

                <div className="spotify-expand-content-home-wrapper-song">
                    {isLoading && (
                        <div className="spotify-expand-content-home-wrapper-song-isLoading">
                            <LoadingFade />
                        </div>
                    )}
                    {isError && (
                        <div className="spotify-expand-content-home-wrapper-song-isError">
                            <Error enableBtn={false} />
                        </div>
                    )}
                    {!isLoading && !isError && filteredQueue.length === 0 && (
                        <section className="spotify-expand-content-home-wrapper-song-empty">
                            <IconContext.Provider
                                value={{ size: '15em', color: color.element }}
                            >
                                <FaSadTear />
                            </IconContext.Provider>
                        </section>
                    )}
                    {!isLoading &&
                        !isError &&
                        filteredQueue.map((item: any, index: any) => (
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
