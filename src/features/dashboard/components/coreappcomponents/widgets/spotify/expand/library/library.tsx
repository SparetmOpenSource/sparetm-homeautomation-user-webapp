import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { IconContext } from 'react-icons';
import { IoMdArrowBack } from 'react-icons/io';
import { FaGhost } from 'react-icons/fa';
import {
    useSpotifyAllAlbums,
    useSpotifyAllPlaylists,
    useSpotifyPlaylistSongs,
} from '../../../../../../../../core/api/spotify/api';
// import { useSpotifyControls } from '../../../../../../../../core/api/spotify/useSpotifyControls';
import { SpotifyApiResponse, SpotifyPlaybackState } from '../../../../../../../../core/api/spotify/types';
import {
    dark_colors,
    light_colors,
} from '../../../../../../../../data/colorconstant';
import {
    ITEMPERPAGE,
    // SPOTIFY_ACCOUNT_TYPE_GLOBAL,
    SPOTIFY_TOKEN_GLOBAL,
    // spotifyNonPremiumWarning,
} from '../../../../../../../../data/constants';
// import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../../../../data/enum';
import {
    GET_SPOTIFY_ALL_ALBUM_STATE_QUERY_ID,
    GET_SPOTIFY_ALL_PLAYLIST_STATE_QUERY_ID,
} from '../../../../../../../../data/queryconstant';
import { useProfileLocalStorage } from '../../../../../../../../features/auth/utils/authhelpers';
import LoadingFade from '../../../../../../../../shared/commoncomponents/loadinganimation/loadingfade';
import Pagination from '../../../../../../../../shared/commoncomponents/pagination/pagination';
import {
    // displayToastify,
    getOffsetAndLimit,
} from '../../../../../../../../utils/helperfn';
import Cover from './cover/cover';
import './library.css';
import Songs from './songs/songs';

interface LibraryProps {
    data: SpotifyApiResponse<SpotifyPlaybackState> | null;
    darkTheme: boolean;
}

const Library = ({ data, darkTheme }: LibraryProps) => {
    const color = darkTheme ? dark_colors : light_colors;
    const [accessToken] = useProfileLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');
    // const [spotifyAcntType] = useLocalStorage(SPOTIFY_ACCOUNT_TYPE_GLOBAL, '');

    const [isAlbumSongsVisible, setIsAlbumSongsVisible] = useState(false);
    const [isPlaylistSongsVisible, setIsPlaylistSongsVisible] = useState(false);
    const [albumCoverId, setAlbumCoverId] = useState(0);
    const [playlistCoverId, setPlaylistCoverId] = useState('');
    const [playlistContextUri, setPlaylistContextUri] = useState('');
    const [changeSection, setChangeSection] = useState(1);

    const [limitForAlbum, setLimitForAlbum] = useState(ITEMPERPAGE);
    const [offsetForAlbum, setOffsetForAlbum] = useState(0);
    const [limitForPlaylist, setLimitForPlaylist] = useState(ITEMPERPAGE);
    const [offsetForPlaylist, setOffsetForPlaylist] = useState(0);
    const [limitForPlaylistSong, setLimitForPlaylistSong] = useState(ITEMPERPAGE);
    const [offsetForPlaylistSong, setOffsetForPlaylistSong] = useState(0);
    const [offsetForAlbumSong, setOffsetForAlbumSong] = useState(0);
    const [limitForAlbumSong, setLimitForAlbumSong] = useState(ITEMPERPAGE);

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
        data: playlistSongData,
    } = useSpotifyPlaylistSongs(playlistCoverId, accessToken, offsetForPlaylistSong, limitForPlaylistSong, darkTheme);

    const handleChangeSection = (index: number) => {
        setChangeSection(index);
        setOffsetForAlbum(0);
        setOffsetForPlaylist(0);
        setOffsetForPlaylistSong(0);
    };

    const sectionData = [
        { id: 1, label: 'Playlists' },
        { id: 2, label: 'Albums' },
    ];

    const handlePageChange = (pageNo: number) => {
        const { offset: newOffset, limit: newLimit } = getOffsetAndLimit(pageNo, ITEMPERPAGE);

        if (changeSection === 1) {
            if (isPlaylistSongsVisible) {
                setOffsetForPlaylistSong(newOffset);
                setLimitForPlaylistSong(newLimit);
            } else {
                setOffsetForPlaylist(newOffset);
                setLimitForPlaylist(newLimit);
            }
        } else if (changeSection === 2) {
            if (isAlbumSongsVisible) {
                setOffsetForAlbumSong(newOffset);
                setLimitForAlbumSong(newLimit);
            } else {
                setOffsetForAlbum(newOffset);
                setLimitForAlbum(newLimit);
            }
        }
    };

    const handleOnClickCoverForAlbum = (id: number) => {
        setAlbumCoverId(id);
        setIsAlbumSongsVisible(true);
        setOffsetForAlbumSong(0);
    };

    const handleOnClickCoverForPlaylist = (id: string, uri: string) => {
        setPlaylistCoverId(id);
        setPlaylistContextUri(uri);
        setIsPlaylistSongsVisible(true);
        setOffsetForPlaylistSong(0);
    };

    // Manual invalidation removed in favor of React Query's automatic reactivity to key changes (accessToken, offsets, etc.)

    const totalItems = useMemo(() => {
        if (changeSection === 1) {
            return isPlaylistSongsVisible
                ? playlistSongData?.data?.body?.total
                : allPlaylistData?.data?.body?.total;
        } else if (changeSection === 2) {
            return isAlbumSongsVisible
                ? allAlbumData?.data?.body?.items?.[albumCoverId]?.album?.tracks?.total
                : allAlbumData?.data?.body?.total;
        }
        return 0;
    }, [changeSection, isPlaylistSongsVisible, isAlbumSongsVisible, playlistSongData, allPlaylistData, allAlbumData, albumCoverId]);

    const albumSongs = useMemo(() => {
        const allTracks = allAlbumData?.data?.body?.items?.[albumCoverId]?.album?.tracks?.items || [];
        return allTracks.slice(offsetForAlbumSong, offsetForAlbumSong + limitForAlbumSong);
    }, [allAlbumData, albumCoverId, offsetForAlbumSong, limitForAlbumSong]);

    const isEmpty = useMemo(() => {
        if (changeSection === 1) {
            return isPlaylistSongsVisible
                ? (playlistSongData?.data?.body?.items?.length || 0) === 0
                : (allPlaylistData?.data?.body?.items?.length || 0) === 0;
        } else if (changeSection === 2) {
            return isAlbumSongsVisible
                ? (allAlbumData?.data?.body?.items?.[albumCoverId]?.album?.tracks?.items?.length || 0) === 0
                : (allAlbumData?.data?.body?.items?.length || 0) === 0;
        }
        return false;
    }, [changeSection, isPlaylistSongsVisible, isAlbumSongsVisible, playlistSongData, allPlaylistData, allAlbumData, albumCoverId]);

    const isCurrentLoading = useMemo(() => {
        if (changeSection === 1) return isPlaylistSongsVisible ? playlistSongLoading : playlistLoading;
        if (changeSection === 2) return albumLoading;
        return false;
    }, [changeSection, isPlaylistSongsVisible, playlistSongLoading, playlistLoading, albumLoading]);

    const activePage = useMemo(() => {
        if (changeSection === 1) {
            if (isPlaylistSongsVisible) {
                return Math.floor(offsetForPlaylistSong / limitForPlaylistSong) + 1;
            }
            return Math.floor(offsetForPlaylist / limitForPlaylist) + 1;
        } else if (changeSection === 2) {
            if (isAlbumSongsVisible) {
                return Math.floor(offsetForAlbumSong / limitForAlbumSong) + 1;
            }
            return Math.floor(offsetForAlbum / limitForAlbum) + 1;
        }
        return 1;
    }, [changeSection, isPlaylistSongsVisible, isAlbumSongsVisible, offsetForPlaylistSong, limitForPlaylistSong, offsetForPlaylist, limitForPlaylist, offsetForAlbum, limitForAlbum, offsetForAlbumSong, limitForAlbumSong]);

    return (
        <div className="spotify-library">
            <header className="spotify-library-header" style={{ backgroundColor: color.outer }}>
                {(isAlbumSongsVisible || isPlaylistSongsVisible) && (
                    <motion.span
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="spotify-library-header-btn"
                        style={{
                            color: color.success,
                            backgroundColor: color.element,
                            padding: '0 1rem',
                            gap: '0.5rem',
                            height: '34px'
                        }}
                        onClick={() => {
                            setIsAlbumSongsVisible(false);
                            setIsPlaylistSongsVisible(false);
                        }}
                    >
                        <IconContext.Provider value={{ size: '1.2em' }}>
                            <IoMdArrowBack />
                        </IconContext.Provider>
                        back
                    </motion.span>
                )}

                {((isAlbumSongsVisible && changeSection === 2) || (isPlaylistSongsVisible && changeSection === 1)) && (
                    <div
                        className="spotify-library-header-count"
                        style={{
                            color: color.success,
                            backgroundColor: color.element,
                            height: '34px',
                        }}
                    >
                        {totalItems} songs
                    </div>
                )}
                {!isAlbumSongsVisible && !isPlaylistSongsVisible && (
                    <>
                        {sectionData.map((item) => (
                            <motion.span
                                key={item.id}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="spotify-library-header-btn"
                                style={{
                                    color: changeSection === item.id ? color.success : color.text,
                                    backgroundColor: color.element,
                                    border: `2px solid ${changeSection === item.id ? color.success : color.element}`,
                                }}
                                onClick={() => handleChangeSection(item.id)}
                            >
                                {item.label}
                            </motion.span>
                        ))}
                        <div
                            className="spotify-library-header-count"
                            style={{
                                color: color.success,
                                backgroundColor: color.element,
                                height: '34px',
                                marginLeft: '0.1rem'
                            }}
                        >
                            {totalItems} {changeSection === 1 ? 'playlists' : 'albums'}
                        </div>
                    </>
                )}
            </header>

            <section
                className={`spotify-library-content ${isEmpty ? 'empty' : ''}`}
                style={{ backgroundColor: color.inner }}
            >
                {(albumLoading || playlistLoading || (isPlaylistSongsVisible && playlistSongLoading)) && (
                    <div className="spotify-library-isLoading">
                        <LoadingFade />
                    </div>
                )}

                {!isCurrentLoading && isEmpty && (
                    <div className="spotify-library-empty">
                        <IconContext.Provider value={{ size: '15em', color: color.element }}>
                            <FaGhost />
                        </IconContext.Provider>
                        <p style={{ color: color.success }}>Your collection is empty.</p>
                    </div>
                )}

                {!playlistLoading && !errorWhileLoadingPlaylist && !isPlaylistSongsVisible && changeSection === 1 && (
                    <Cover
                        listData={allPlaylistData}
                        type={changeSection}
                        darkTheme={darkTheme}
                        handleOnClickCover={handleOnClickCoverForPlaylist}
                        selectedLibraryUri={data?.data?.body?.context?.uri}
                        albumIdQueryIdToBeRefreshed={`${GET_SPOTIFY_ALL_PLAYLIST_STATE_QUERY_ID}_offset(${offsetForPlaylist})_limit(${limitForPlaylist})`}
                    />
                )}

                {!albumLoading && !errorWhileLoadingAlbum && !isAlbumSongsVisible && changeSection === 2 && (
                    <Cover
                        listData={allAlbumData}
                        type={changeSection}
                        darkTheme={darkTheme}
                        handleOnClickCover={handleOnClickCoverForAlbum}
                        selectedLibraryUri={data?.data?.body?.context?.uri}
                        albumIdQueryIdToBeRefreshed={`${GET_SPOTIFY_ALL_ALBUM_STATE_QUERY_ID}_offset(${offsetForAlbum})_limit(${limitForAlbum})`}
                    />
                )}

                {changeSection === 2 && isAlbumSongsVisible && !albumLoading && (
                    <Songs
                        type={changeSection}
                        data={data}
                        songData={albumSongs}
                        contextUri={allAlbumData?.data?.body?.items[albumCoverId]?.album?.uri || ''}
                        darkTheme={darkTheme}
                        offset={offsetForAlbumSong}
                    />
                )}

                {changeSection === 1 && isPlaylistSongsVisible && !playlistSongLoading && (
                    <Songs
                        type={changeSection}
                        data={data}
                        songData={playlistSongData?.data?.body?.items}
                        contextUri={playlistContextUri || ''}
                        darkTheme={darkTheme}
                        offset={offsetForPlaylistSong}
                    />
                )}
            </section>

            <footer className="spotify-library-footer" style={{ color: color.text, backgroundColor: color.outer }}>
                {!isEmpty && (
                    <Pagination
                        totalItems={totalItems || 0}
                        itemsPerPage={ITEMPERPAGE}
                        onPageChange={handlePageChange}
                        darkTheme={darkTheme}
                        resetTriggerForSection={changeSection}
                        resetTriggerForPlaylistSongs={isPlaylistSongsVisible}
                        currentPage={activePage}
                    />
                )}
            </footer>
        </div>
    );
};

export default Library;
