import { useEffect, useState } from 'react';
import './Library.css';
import { motion } from 'framer-motion';
import {
    dark_colors,
    light_colors,
} from '../../../../../../../Data/ColorConstant';
import Cover from './Cover/Cover';
import Songs from './Songs/Songs';
import {
    GET_SPOTIFY_ALL_ALBUM_STATE_QUERY_ID,
    GET_SPOTIFY_ALL_PLAYLIST_STATE_QUERY_ID,
    GET_SPOTIFY_PLAYLIST_SONG_STATE_QUERY_ID,
} from '../../../../../../../Data/QueryConstant';
import {
    useSpotifyAllAlbums,
    useSpotifyAllPlaylists,
    useSpotifyPlaylistSongs,
} from '../../../../../../../Api.tsx/Spotify/Api';
import { usePostUpdateData } from '../../../../../../../Api.tsx/useReactQuery_Update';
import { featureUrl } from '../../../../../../../Api.tsx/CoreAppApis';
import { getMergedHeadersForSpotify } from '../../../../../../../Api.tsx/Axios';
import Pagination from '../../../../../CommonComponents/Pagination/Pagination';
import {
    catchError,
    displayToastify,
    getOffsetAndLimit,
    invalidateQueries,
} from '../../../../../../../Utils/HelperFn';
import { useQueryClient } from 'react-query';
import LoadingFade from '../../../../../CommonComponents/LoadingAnimation/LoadingFade';
import {
    ITEMPERPAGE,
    spotifyNonPremiumWarning,
} from '../../../../../../../Data/Constants';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../../../Data/Enum';
import useLocalStorage from '../../../../../../../Hooks/UseLocalStorage';
import { SPOTIFY_TOKEN_GLOBAL, SPOTIFY_ACCOUNT_TYPE_GLOBAL } from '../../../../../../../Data/Constants';

const Library = ({ data, darkTheme }: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const [accessToken] = useLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');
    const [spotifyAcntType] = useLocalStorage(SPOTIFY_ACCOUNT_TYPE_GLOBAL, '');
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

    const {
        isLoading: albumLoading,
        isError: errorWhileLoadingAlbum,
        data: allAlbumData,
    } = useSpotifyAllAlbums(accessToken, offsetForAlbum, limitForAlbum, darkTheme);

    const {
        isLoading: playlistLoading,
        isError: errorWhileLoadingPlaylist,
        data: allPlaylistData,
    } = useSpotifyAllPlaylists(accessToken, offsetForPlaylist, limitForPlaylist, darkTheme);

    const {
        isLoading: playlistSongLoading,
        isError: errorWhileLoadingPlaylistSong,
        data: playlistSongData,
        refetch: fetchPlaylistSong,
    } = useSpotifyPlaylistSongs(playlistCoverId, accessToken, offsetForPlaylistSong, limitForPlaylistSong, darkTheme);

    const updateHeaderConfig = {
        headers: getMergedHeadersForSpotify(accessToken),
    };

    const { mutate: play } = usePostUpdateData(
        featureUrl.spotify_base_url + `?data=play`,
        updateHeaderConfig,
        on_success,
        on_error,
    );

    const startPlayingFn = (trackUri: any, data: any, contextUri: any) => {
        if (spotifyAcntType === 'premium') {
            play({
                device_ids: [`${data?.data?.body?.device?.id}`],
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

    const getTotalItemForPagination = () => {
        if (changeSection === 1) {
            return isPlaylistSongsVisible
                ? playlistSongData?.data?.body?.total
                : allPlaylistData?.data?.body?.total;
        } else if (changeSection === 2) {
            return allAlbumData?.data?.body?.items?.length;
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
                            selectedLibraryUri={data?.data?.body?.context?.uri}
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
                            selectedLibraryUri={data?.data?.body?.context?.uri}
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
                                allAlbumData?.data?.body?.items[albumCoverId]?.album
                                    ?.tracks?.items
                            }
                            contextUri={
                                allAlbumData?.data?.body?.items[albumCoverId]?.album
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
                            songData={playlistSongData?.data?.body?.items}
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
                            allAlbumData?.data?.body?.items[albumCoverId]?.album
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



