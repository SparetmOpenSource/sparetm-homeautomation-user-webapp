import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { CiWarning } from 'react-icons/ci';
import { FaSpotify } from 'react-icons/fa';
import { FcAdvertising } from 'react-icons/fc';
import {
    IoPauseCircleOutline,
    IoPlayCircleOutline,
    IoPlaySkipBack,
    IoPlaySkipForward,
} from 'react-icons/io5';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import { useBackDropOpen } from '../../../../../../../core/router/Themeprovider';
import { dark_colors, light_colors } from '../../../../../../../data/ColorConstant';
import {
    HorizontalSize,
    SPOTIFY_ACCOUNT_TYPE_GLOBAL,
    SPOTIFY_PREMIUM_ACCOUNT_TYPE,
    SPOTIFY_ACTIVE_EXPAND,
} from '../../../../../../../data/Constants';
import { useProfileLocalStorage } from '../../../../../../auth/utils/authhelpers';
import { SpotifyApiResponse, SpotifyPlaybackState } from '../../../../../../../core/api/spotify/types';
import { useSpotifyControls } from '../../../../../../../core/api/spotify/useSpotifyControls';
import AudioProgressBar from '../../../../../../../shared/commoncomponents/slide/audioprogressbar/Audioprogressbar';
import { trimToNChars } from '../../../../../../../utils/HelperFn';
import Expand from '../expand/Expand';
import './Spotifycurrentplayback.css';

interface SpotifyCurrentPlaybackProps {
    data: SpotifyApiResponse<SpotifyPlaybackState> | null;
    darkTheme: boolean;
    handleRefresh?: () => void;
    windowSize: 'S' | 'XL';
}

const SpotifyCurrentPlayback = ({
    data,
    darkTheme,
    handleRefresh,
    windowSize,
}: SpotifyCurrentPlaybackProps) => {
    const color = darkTheme ? dark_colors : light_colors;
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [spotifyAcntType] = useProfileLocalStorage(SPOTIFY_ACCOUNT_TYPE_GLOBAL, '');
    const isPremium = spotifyAcntType?.trim().toLowerCase() === SPOTIFY_PREMIUM_ACCOUNT_TYPE;

    const { toggleBackDropOpen } = useBackDropOpen();
    const { play, pause, next, previous } = useSpotifyControls(darkTheme);

    const playbackBody = data?.data?.body;
    const playbackType = playbackBody?.currently_playing_type;
    const deviceId = playbackBody?.device?.id;

    useEffect(() => {
        setIsPlaying(!!playbackBody?.is_playing);
        if (playbackBody?.progress_ms !== undefined) {
            setProgress(playbackBody.progress_ms);
        }
    }, [playbackBody]);

    const renderPlaybackIcon = () => {
        if (!playbackBody?.item) return <RiNeteaseCloudMusicLine />;
        if (playbackType === 'unknown') return <CiWarning />;
        if (playbackType === 'ad') return <FcAdvertising />;

        return (
            <img
                className="spotifyCurrentPlayback-pic-image"
                src={playbackBody.item.album.images[0]?.url}
                alt="song_image"
                loading="lazy"
                width="95%"
                height="95%"
            />
        );
    };

    const handleTogglePlay = () => {
        if (!deviceId) return;
        if (isPlaying) {
            pause(deviceId);
        } else {
            play({
                deviceId,
                contextUri: playbackBody?.context?.uri,
                trackUri: playbackBody?.item?.uri,
                positionMs: progress,
            });
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="spotifyCurrentPlayback">
            <section
                className={
                    windowSize === 'S'
                        ? 'spotifyCurrentPlayback-pic spotifyCurrentPlayback-pic-s'
                        : 'spotifyCurrentPlayback-pic spotifyCurrentPlayback-pic-xl'
                }
            >
                <span style={{ backgroundColor: color.outer }}>
                    <IconContext.Provider value={{ size: '6em', color: color.text }}>
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
                    backgroundColor: windowSize === 'XL' ? color.inner : undefined,
                }}
            >
                {playbackBody && (playbackType === 'unknown' || playbackType === 'episode') && (
                    <span className={windowSize === 'S' ? 'spotifyCurrentPlayback-info-unknown-s' : 'spotifyCurrentPlayback-info-unknown'}>
                        <h1 style={{ color: color.icon }}>Something went wrong...</h1>
                        <p style={{ color: color.icon }}>
                            {playbackType === 'unknown' ? 'Check your device.' : 'Episodes not supported.'}
                        </p>
                    </span>
                )}

                {playbackBody && playbackType === 'ad' && (
                    <span className={windowSize === 'S' ? 'spotifyCurrentPlayback-info-ad-s' : 'spotifyCurrentPlayback-info-ad'}>
                        <h1 style={{ color: color.icon }}>Playing advertisement...</h1>
                        <p style={{ color: color.icon }}>Upgrade to Premium for ad-free music.</p>
                    </span>
                )}

                {!playbackBody && (
                    <span className={windowSize === 'S' ? 'spotifyCurrentPlayback-info-no-data-s' : 'spotifyCurrentPlayback-info-no-data'}>
                        <h1 style={{ color: color.icon }}>No device found!</h1>
                        <p style={{ color: color.icon }}>Play something on Spotify to continue.</p>
                    </span>
                )}

                {playbackBody && playbackType === 'track' && playbackBody.item && (
                    <span className={windowSize === 'S' ? 'spotifyCurrentPlayback-info-playing-s' : 'spotifyCurrentPlayback-info-playing-xl'}>
                        <div className={windowSize === 'XL' ? 'spotifyCurrentPlayback-info-playing-song-info' : ''}>
                            <h1 style={{ color: color.text }}>{trimToNChars(playbackBody.item.name, 15)}</h1>
                            <p style={{ color: color.text, opacity: 0.7 }}>{trimToNChars(playbackBody.item.album.artists[0]?.name, 15)}</p>

                            {windowSize === 'S' && (
                                <p style={{ color: color.success, fontWeight: 'bold', marginTop: '0.1rem' }}>
                                    album: <span style={{ color: color.text, opacity: 0.6 }}>{trimToNChars(playbackBody.item.album.name, 15)}</span>
                                </p>
                            )}
                        </div>

                        {(windowSize === 'S' || windowSize === 'XL') && (
                            <div className={windowSize === 'S' ? 'spotifyCurrentPlayback-info-playing-progress-s' : 'spotifyCurrentPlayback-info-playing-progress-xl'}>
                                <AudioProgressBar
                                    totalTimeMs={playbackBody.item.duration_ms}
                                    progressTimeMs={progress}
                                    onSeek={setProgress}
                                    currentPlaybackData={data}
                                    darkTheme={darkTheme}
                                />
                            </div>
                        )}

                        {windowSize === 'XL' && (
                            <div className="spotify-playback-controls-wrapper">
                                {isPremium && (
                                    <motion.span whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => deviceId && previous(deviceId)}>
                                        <IconContext.Provider value={{ size: '1.5em', color: color.text }}>
                                            <IoPlaySkipBack />
                                        </IconContext.Provider>
                                    </motion.span>
                                )}

                                {isPremium && (
                                    <motion.span whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={handleTogglePlay}>
                                        <IconContext.Provider value={{ size: '2em', color: color.text }}>
                                            {isPlaying ? <IoPauseCircleOutline /> : <IoPlayCircleOutline />}
                                        </IconContext.Provider>
                                    </motion.span>
                                )}

                                {isPremium && (
                                    <motion.span whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => deviceId && next(deviceId)}>
                                        <IconContext.Provider value={{ size: '1.5em', color: color.text }}>
                                            <IoPlaySkipForward />
                                        </IconContext.Provider>
                                    </motion.span>
                                )}
                            </div>
                        )}
                    </span>
                )}

                {windowSize === 'S' && (
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="spotifyCurrentPlayback-info-expand"
                        onClick={() =>
                            toggleBackDropOpen(
                                SPOTIFY_ACTIVE_EXPAND,
                                <Expand handleRefresh={handleRefresh} darkTheme={darkTheme} />,
                                HorizontalSize,
                            )
                        }
                    >
                        <IconContext.Provider value={{ size: '2em', color: color.success }}>
                            <FaSpotify />
                        </IconContext.Provider>
                    </motion.div>
                )}
            </section>
        </div>
    );
};

export default SpotifyCurrentPlayback;
