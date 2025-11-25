import { useEffect, useState } from 'react';
import './Library.css';
import { motion } from 'framer-motion';
import {
    dark_colors,
    light_colors,
} from '../../../../../../Data/ColorConstant';
import Cover from './Cover/Cover';
import Songs from './Songs/Songs';
import {
    GET_SPOTIFY_ALL_ALBUM_STATE_QUERY_ID,
    GET_SPOTIFY_ALL_PLAYLIST_STATE_QUERY_ID,
    GET_SPOTIFY_PLAYLIST_SONG_STATE_QUERY_ID,
} from '../../../../../../Data/QueryConstant';
import { useReactQuery_Get } from '../../../../../../Api.tsx/useReactQuery_Get';
import {
    getAllAlbumState,
    getAllPlaylistState,
    getPlaylistSongState,
} from '../../../../../../Api.tsx/Spotify/Api';
import { usePostUpdateData } from '../../../../../../Api.tsx/useReactQuery_Update';
import { featureUrl } from '../../../../../../Api.tsx/CoreAppApis';
import { getMergedHeadersForSpotify } from '../../../../../../Api.tsx/Axios';
import Pagination from '../../../../Pagination/Pagination';
import {
    catchError,
    displayToastify,
    getOffsetAndLimit,
    invalidateQueries,
} from '../../../../../../Utils/HelperFn';
import { useQueryClient } from 'react-query';
import LoadingFade from '../../../../LoadingAnimation/LoadingFade';
import {
    ITEMPERPAGE,
    // LandscapeSizeS,
    // SPOTIFY_EXPAND_ADD_TRACK_TO_QUEUE_CONFIRMATION,
    spotifyNonPremiumWarning,
    // spotifyQueueAddition,
} from '../../../../../../Data/Constants';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../../Data/Enum';
// import { useBackDropOpen } from '../../../../../../Pages/ThemeProvider';
// import Confirmation from '../../../../BackDrop/Confirmation/Confirmation';
import { useAppSelector } from '../../../../../../Features/ReduxHooks';

const Library = ({ data, darkTheme }: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const accessToken = useAppSelector((state) => state.spotify.accessToken);
    const spotifyAcntType = useAppSelector((state) => state.spotify.accountType);
    const [isAlbumSongsVisible, setIsAlbumSongsVisible] =
        useState<boolean>(false);
    const [isPlaylistSongsVisible, setIsPlaylistSongsVisible] =
        useState<boolean>(false);
    const [albumCoverId, setAlbumCoverId] = useState<number>(0);
    const [playlistCoverId, setPlaylistCoverId] = useState<string>('');
    const [playlistContextUri, setPlaylistContextUri] = useState<string>('');
    const [changeSection, setChangeSection] = useState<number>(1);
    const [limitForAlbum, setLimitForAlbum] = useState<number>(ITEMPERPAGE);
    const [offsetForAlbum, setOffsetForAlbum] = useState<number>(0);
    const [limitForPlaylist, setLimitForPlaylist] =
        useState<number>(ITEMPERPAGE);
    const [offsetForPlaylist, setOffsetForPlaylist] = useState<number>(0);
    const [limitForPlaylistSong, setLimitForPlaylistSong] =
        useState<number>(ITEMPERPAGE);
    const [offsetForPlaylistSong, setOffsetForPlaylistSong] =
        useState<number>(0);
    const queryClient = useQueryClient();
    // const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();

    const handleChangeSection = (index: number) => {
        setChangeSection(index);
        setOffsetForAlbum(0);
        setOffsetForPlaylist(0);
        setOffsetForPlaylistSong(0);
    };

    const sectionData = [
        {
            id: 1,
            onClickParam: 1,
            label: 'Playlists',
        },
        {
            id: 2,
            onClickParam: 2,
            label: 'Albums',
        },
    ];

    const on_success = () => {};
    const on_error = (error: any) => {
        catchError(error, darkTheme);
    };

    const getAllAlbumStateFn = (offset: number, limit: number) => {
        return getAllAlbumState(accessToken, limit, offset);
    };

    const getAllPlaylistStateFn = (offset: number, limit: number) => {
        return getAllPlaylistState(accessToken, limit, offset);
    };
    const getPlaylistSongStateFn = (offset: number, limit: number) => {
        return getPlaylistSongState(playlistCoverId, accessToken, limit, offset);
    };

    const {
        isLoading: albumLoading,
        isError: errorWhileLoadingAlbum,
        data: allAlbumData,
    } = useReactQuery_Get(
        `${GET_SPOTIFY_ALL_ALBUM_STATE_QUERY_ID}_offset(${offsetForAlbum})_limit(${limitForAlbum})`, // Include offset and limit in the query key
        () => getAllAlbumStateFn(offsetForAlbum, limitForAlbum), // Pass offset and limit to the query function
        on_success,
        on_error,
        true, // playBackStatus
        true, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        100, // Cache time
        0, // Stale Time
    );

    const {
        isLoading: playlistLoading,
        isError: errorWhileLoadingPlaylist,
        data: allPlaylistData,
    } = useReactQuery_Get(
        `${GET_SPOTIFY_ALL_PLAYLIST_STATE_QUERY_ID}_offset(${offsetForPlaylist})_limit(${limitForPlaylist})`, // Include offset and limit in the query key
        () => getAllPlaylistStateFn(offsetForPlaylist, limitForPlaylist), // Pass offset and limit to the query function
        on_success,
        on_error,
        true, // playBackStatus
        true, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        100, // Cache time
        0, // Stale Time
    );

    const {
        isLoading: playlistSongLoading,
        isError: errorWhileLoadingPlaylistSong,
        data: playlistSongData,
        refetch: fetchPlaylistSong,
    } = useReactQuery_Get(
        `${GET_SPOTIFY_PLAYLIST_SONG_STATE_QUERY_ID}_offset(${offsetForPlaylistSong})_limit(${limitForPlaylistSong})`, // Include offset and limit in the query key
        () =>
            getPlaylistSongStateFn(offsetForPlaylistSong, limitForPlaylistSong), // Pass offset and limit to the query function
        on_success,
        on_error,
        false, // !fetch_On_Click_Status
        false, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        300000, // Cache time
        0, // Stale Time
    );

    const updateHeaderConfig = {
        headers: getMergedHeadersForSpotify(accessToken),
    };

    const { mutate: play } = usePostUpdateData(
        featureUrl.spotify_base_url + `?data=play`,
        updateHeaderConfig,
        on_success,
        on_error,
    );

    // const on_add_to_queue_success = () => {
    //     displayToastify(
    //         spotifyQueueAddition,
    //         darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
    //         TOASTIFYSTATE.SUCCESS,
    //     );
    //     toggleBackDropClose(SPOTIFY_EXPAND_ADD_TRACK_TO_QUEUE_CONFIRMATION);
    // };

    // const { mutate: addToQueuee } = usePostUpdateData(
    //     featureUrl.spotify_base_url + `?data=addtoqueue`,
    //     updateHeaderConfig,
    //     on_add_to_queue_success,
    //     on_error,
    // );

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

    const handlePageChange = (pageNo: number) => {
        const { offset: newOffset, limit: newLimit } = getOffsetAndLimit(
            pageNo,
            ITEMPERPAGE,
        );

        if (changeSection === 1) {
            if (isPlaylistSongsVisible) {
                console.log('Updating pagination for Playlist Songs', {
                    newOffset,
                    newLimit,
                });
                setOffsetForPlaylistSong(newOffset);
                setLimitForPlaylistSong(newLimit);
            } else {
                console.log('Updating pagination for Playlists', {
                    newOffset,
                    newLimit,
                });
                setOffsetForPlaylist(newOffset);
                setLimitForPlaylist(newLimit);
            }
        } else if (changeSection === 2) {
            console.log('Updating pagination for Albums', {
                newOffset,
                newLimit,
            });
            setOffsetForAlbum(newOffset);
            setLimitForAlbum(newLimit);
        }
    };

    const handleOnClickCoverForAlbum = (id: number) => {
        setAlbumCoverId(id);
        setIsAlbumSongsVisible(true);
        setOffsetForAlbum(0);
    };

    const handleOnClickCoverForPlaylist = (id: string, uri: string) => {
        setPlaylistCoverId(id);
        setPlaylistContextUri(uri);
        setIsPlaylistSongsVisible(true);
        setOffsetForPlaylistSong(0);
    };

    useEffect(() => {
        if (isPlaylistSongsVisible && playlistCoverId !== '') {
            fetchPlaylistSong();
        }
    }, [offsetForPlaylistSong, limitForPlaylistSong, playlistCoverId]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let queryArray: any = [];
        switch (changeSection) {
            case 1:
                queryArray.push(
                    isPlaylistSongsVisible
                        ? `${GET_SPOTIFY_PLAYLIST_SONG_STATE_QUERY_ID}_offset(${offsetForPlaylistSong})_limit(${limitForPlaylistSong})`
                        : `${GET_SPOTIFY_ALL_PLAYLIST_STATE_QUERY_ID}_offset(${offsetForPlaylist})_limit(${limitForPlaylist})`,
                );
                break;
            case 2:
                queryArray.push(
                    `${GET_SPOTIFY_ALL_ALBUM_STATE_QUERY_ID}_offset(${offsetForAlbum})_limit(${limitForAlbum})`,
                );
                break;
            default:
                queryArray.push('N/A');
                break;
        }
        invalidateQueries(queryClient, queryArray);
    }, [
        offsetForAlbum,
        limitForAlbum,
        offsetForPlaylist,
        limitForPlaylist,
        offsetForPlaylistSong,
        limitForPlaylistSong,
        queryClient,
        changeSection,
        isPlaylistSongsVisible,
    ]);

    useEffect(() => {
        if (changeSection === 1) {
            if (isPlaylistSongsVisible) {
                setOffsetForPlaylistSong(0);
                setLimitForPlaylistSong(ITEMPERPAGE);
            } else {
                setOffsetForPlaylist(0);
                setLimitForPlaylist(ITEMPERPAGE);
            }
        } else if (changeSection === 2) {
            setOffsetForAlbum(0);
            setLimitForAlbum(ITEMPERPAGE);
        }
    }, [changeSection]); // eslint-disable-line react-hooks/exhaustive-deps

    // const addTrackToQueue = () => {
    //     const backdropId = SPOTIFY_EXPAND_ADD_TRACK_TO_QUEUE_CONFIRMATION;
    //     toggleBackDropOpen(
    //         backdropId,
    //         <Confirmation
    //             darkTheme={darkTheme}
    //             heading="Would you like to add this track to your queue?"
    //             btnOkFn={() => {
    //                 addToQueue({
    //                     id: data?.body?.device?.id,
    //                     track_uri: data?.body?.item?.uri,
    //                 });
    //                 toggleBackDropClose(backdropId);
    //             }}
    //             btnCancelFn={() => toggleBackDropClose(backdropId)}
    //             btnOkLabel="Yes, add"
    //             btnCancelLabel="Cancel"
    //         />,
    //         LandscapeSizeS,
    //     );
    // };

    const getTotalItemForPagination = () => {
        if (changeSection === 1) {
            return isPlaylistSongsVisible
                ? playlistSongData?.body?.total
                : allPlaylistData?.body?.total;
        } else if (changeSection === 2) {
            return allAlbumData?.body?.items?.length;
        }
        return 1;
    };

    return (
        <div className="spotify-library">
            <section style={{ backgroundColor: color?.outer }}>
                {isAlbumSongsVisible && !isPlaylistSongsVisible && (
                    <motion.span
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            color: `${color?.success}`,
                            backgroundColor: color?.element,
                            border: `2px solid ${color?.success}`,
                        }}
                        onClick={() => setIsAlbumSongsVisible(false)}
                    >
                        back
                    </motion.span>
                )}
                {isPlaylistSongsVisible && !isAlbumSongsVisible && (
                    <motion.span
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            color: `${color?.success}`,
                            backgroundColor: color?.element,
                            border: `2px solid ${color?.success}`,
                        }}
                        onClick={() => setIsPlaylistSongsVisible(false)}
                    >
                        back
                    </motion.span>
                )}
                {!isAlbumSongsVisible &&
                    !isPlaylistSongsVisible &&
                    sectionData.map((item: any, index: any) => (
                        <motion.span
                            key={item?.id}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                color:
                                    changeSection === item?.id
                                        ? `${color?.success}`
                                        : `${color?.text}`,
                                backgroundColor: color?.element,
                                border:
                                    changeSection === item?.id
                                        ? `2px solid ${color?.success}`
                                        : `2px solid ${color?.element}`,
                            }}
                            onClick={() =>
                                handleChangeSection(item?.onClickParam)
                            }
                        >
                            {item?.label}
                        </motion.span>
                    ))}
            </section>
            <section style={{ backgroundColor: color?.inner }}>
                {changeSection === 1 &&
                    playlistLoading &&
                    !errorWhileLoadingPlaylist && (
                        <div className="spotify-library-isLoading">
                            <LoadingFade />
                        </div>
                    )}
                {changeSection === 1 &&
                    isPlaylistSongsVisible &&
                    playlistSongLoading &&
                    !errorWhileLoadingPlaylistSong && (
                        <div className="spotify-library-isLoading">
                            <LoadingFade />
                        </div>
                    )}
                {changeSection === 2 &&
                    albumLoading &&
                    !errorWhileLoadingAlbum && (
                        <div className="spotify-library-isLoading">
                            <LoadingFade />
                        </div>
                    )}

                {!playlistLoading &&
                    !errorWhileLoadingPlaylist &&
                    !isPlaylistSongsVisible &&
                    changeSection === 1 && (
                        <Cover
                            listData={allPlaylistData}
                            type={changeSection}
                            darkTheme={darkTheme}
                            handleOnClickCover={handleOnClickCoverForPlaylist}
                            selectedLibraryUri={data?.body?.context?.uri}
                            albumIdQueryIdToBeRefreshed={`${GET_SPOTIFY_ALL_ALBUM_STATE_QUERY_ID}_offset(${offsetForAlbum})_limit(${limitForAlbum})`}
                        />
                    )}

                {!albumLoading &&
                    !errorWhileLoadingAlbum &&
                    !isAlbumSongsVisible &&
                    changeSection === 2 && (
                        <Cover
                            listData={allAlbumData}
                            type={changeSection}
                            darkTheme={darkTheme}
                            handleOnClickCover={handleOnClickCoverForAlbum}
                            selectedLibraryUri={data?.body?.context?.uri}
                            albumIdQueryIdToBeRefreshed={`${GET_SPOTIFY_ALL_ALBUM_STATE_QUERY_ID}_offset(${offsetForAlbum})_limit(${limitForAlbum})`}
                        />
                    )}

                {changeSection === 2 &&
                    isAlbumSongsVisible &&
                    !albumLoading &&
                    !errorWhileLoadingAlbum && (
                        <Songs
                            type={changeSection}
                            data={data}
                            songData={
                                allAlbumData?.body?.items[albumCoverId]?.album
                                    ?.tracks?.items
                            }
                            contextUri={
                                allAlbumData?.body?.items[albumCoverId]?.album
                                    ?.uri
                            }
                            startPlayingFn={startPlayingFn}
                            darkTheme={darkTheme}
                        />
                    )}
                {changeSection === 1 &&
                    isPlaylistSongsVisible &&
                    !playlistSongLoading &&
                    !errorWhileLoadingPlaylistSong && (
                        <Songs
                            type={changeSection}
                            data={data}
                            songData={playlistSongData?.body?.items}
                            contextUri={playlistContextUri}
                            startPlayingFn={startPlayingFn}
                            darkTheme={darkTheme}
                        />
                    )}
            </section>
            <section
                style={{ color: color?.text, backgroundColor: color?.outer }}
            >
                {!isAlbumSongsVisible && (
                    <Pagination
                        totalItems={getTotalItemForPagination()}
                        itemsPerPage={ITEMPERPAGE}
                        onPageChange={handlePageChange}
                        darkTheme={darkTheme}
                        resetTriggerForSection={changeSection}
                        resetTriggerForPlaylistSongs={isPlaylistSongsVisible}
                    />
                )}
                {isAlbumSongsVisible && (
                    <p
                        style={{
                            color: color?.success,
                        }}
                    >
                        {
                            allAlbumData?.body?.items[albumCoverId]?.album
                                ?.tracks?.items?.length
                        }{' '}
                        <span
                            style={{
                                color: color?.text,
                            }}
                        >
                            songs
                        </span>
                    </p>
                )}
            </section>
        </div>
    );
};

export default Library;
