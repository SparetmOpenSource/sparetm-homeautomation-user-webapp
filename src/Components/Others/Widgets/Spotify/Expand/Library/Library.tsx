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
} from '../../../../../../Data/QueryConstant';
import { useReactQuery_Get } from '../../../../../../Api.tsx/useReactQuery_Get';
import {
    getAllAlbumState,
    getAllPlaylistState,
} from '../../../../../../Api.tsx/Spotify/Api';
import { usePostUpdateData } from '../../../../../../Api.tsx/useReactQuery_Update';
import { featureUrl } from '../../../../../../Api.tsx/CoreAppApis';
import { getMergedHeaders } from '../../../../../../Api.tsx/Axios';
import Pagination from '../../../../Pagination/Pagination';
import {
    getOffsetAndLimit,
    invalidateQueries,
} from '../../../../../../Utils/HelperFn';
import { useQueryClient } from 'react-query';
import LoadingFade from '../../../../LoadingAnimation/LoadingFade';

const Library = ({ data, darkTheme }: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const [isAlbumSongsVisible, setIsAlbumSongsVisible] =
        useState<boolean>(false);
    const [albumCoverId, setAlbumCoverId] = useState<number>(0);
    const [changeSection, setChangeSection] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [offset, setOffset] = useState<number>(0);
    const queryClient = useQueryClient();

    const handleChangeSection = (index: number) => {
        setChangeSection(index);
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
        {
            id: 3,
            onClickParam: 3,
            label: 'Artists',
        },
    ];

    const on_success = (data: any) => {};
    const on_error = (error: any) => {};

    // Update query functions to accept offset and limit as arguments
    const getAllAlbumStateFn = (offset: number, limit: number) => {
        const token = localStorage.getItem('spotify_access_token');
        return getAllAlbumState(darkTheme, token, limit, offset);
    };

    const getAllPlaylistStateFn = (offset: number, limit: number) => {
        const token = localStorage.getItem('spotify_access_token');
        return getAllPlaylistState(darkTheme, token, limit, offset);
    };

    const {
        isLoading: albumLoading,
        isError: errorWhileLoadingAlbum,
        data: allAlbumData,
    } = useReactQuery_Get(
        `${GET_SPOTIFY_ALL_ALBUM_STATE_QUERY_ID}_offset(${offset})_limit(${limit})`, // Include offset and limit in the query key
        () => getAllAlbumStateFn(offset, limit), // Pass offset and limit to the query function
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
        `${GET_SPOTIFY_ALL_PLAYLIST_STATE_QUERY_ID}_offset(${offset})_limit(${limit})`, // Include offset and limit in the query key
        () => getAllPlaylistStateFn(offset, limit), // Pass offset and limit to the query function
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

    const updateHeaderConfig = {
        headers: getMergedHeaders(localStorage.getItem('spotify_access_token')),
    };

    const { mutate: play } = usePostUpdateData(
        featureUrl.spotify_base_url + `?data=play`,
        updateHeaderConfig,
        on_success,
        on_error,
    );

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

    const handlePageChange = (page: number) => {
        const { offset: newOffset, limit: newLimit } = getOffsetAndLimit(page);
        setOffset(newOffset);
        setLimit(newLimit);
    };

    const handleOnClickCoverForAlbum = (id: number) => {
        setAlbumCoverId(id);
        setIsAlbumSongsVisible(true);
    };

    const handleOnClickCoverForPlaylist = (id: number) => {
        console.log('For Playlist');
    };

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let queryArray: any = [];
        switch (changeSection) {
            case 1:
                queryArray.push(
                    `${GET_SPOTIFY_ALL_PLAYLIST_STATE_QUERY_ID}_offset(${offset})_limit(${limit})`,
                );
                break;
            case 2:
                queryArray.push(
                    `${GET_SPOTIFY_ALL_ALBUM_STATE_QUERY_ID}_offset(${offset})_limit(${limit})`,
                );
                break;
            case 3:
                queryArray.push('N/A');
                break;
            default:
                queryArray.push('N/A');
                break;
        }
        invalidateQueries(queryClient, queryArray);
    }, [offset, limit, queryClient, changeSection]);

    useEffect(() => {
        setOffset(0);
        setLimit(10);
    }, [changeSection]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        console.log(isAlbumSongsVisible);
    }, [isAlbumSongsVisible]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="spotify-library">
            <section style={{ backgroundColor: color?.outer }}>
                {isAlbumSongsVisible && (
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
                {!isAlbumSongsVisible &&
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
                {changeSection === 2 &&
                    albumLoading &&
                    !errorWhileLoadingAlbum && (
                        <div className="spotify-library-isLoading">
                            <LoadingFade />
                        </div>
                    )}

                {!playlistLoading &&
                    !errorWhileLoadingPlaylist &&
                    changeSection === 1 && (
                        <Cover
                            listData={allPlaylistData}
                            type={changeSection}
                            darkTheme={darkTheme}
                            handleOnClickCover={handleOnClickCoverForPlaylist}
                            selectedLibraryUri={data?.body?.context?.uri}
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
                        />
                    )}

                {changeSection === 2 &&
                    isAlbumSongsVisible &&
                    !albumLoading &&
                    !errorWhileLoadingAlbum && (
                        <Songs
                            data={data}
                            albumData={
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
            </section>
            <section
                style={{ color: color?.text, backgroundColor: color?.outer }}
            >
                {!isAlbumSongsVisible && (
                    <Pagination
                        totalItems={
                            changeSection === 1
                                ? allPlaylistData?.body?.total
                                : changeSection === 2
                                ? allAlbumData?.body?.items?.length
                                : 60
                        }
                        itemsPerPage={10}
                        onPageChange={handlePageChange}
                        darkTheme={darkTheme}
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
