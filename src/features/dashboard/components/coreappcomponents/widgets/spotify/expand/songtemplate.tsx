import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { IconContext } from 'react-icons';
import { CiPlay1 } from 'react-icons/ci';
import { GiSoundWaves } from 'react-icons/gi';
import { MdAddCircleOutline } from 'react-icons/md';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import { useSpotifyControls } from '../../../../../../../core/api/spotify/useSpotifyControls';
import {
    dark_colors,
    light_colors,
} from '../../../../../../../data/ColorConstant';
import { SPOTIFY_ACCOUNT_TYPE_GLOBAL, SPOTIFY_PREMIUM_ACCOUNT_TYPE } from '../../../../../../../data/Constants';
import { useProfileLocalStorage } from '../../../../../../auth/utils/authhelpers';
import { msToTime, trimToNChars } from '../../../../../../../utils/HelperFn';

interface SongTemplateProps {
    index: number;
    imgUrl?: string;
    name: string;
    artist: string;
    durationMs: number;
    trackUri: string;
    contextUri?: string;
    darkTheme: boolean;
    playbackData: any;
    id: string;
    fnToAddTrackToQueue?: () => void;
    showAddToQueue?: boolean;
}

const SongTemplate = ({
    index,
    imgUrl,
    name,
    artist,
    durationMs,
    trackUri,
    contextUri,
    darkTheme,
    playbackData,
    id,
    fnToAddTrackToQueue,
    showAddToQueue = true,
}: SongTemplateProps) => {
    const [spotifyAcntType] = useProfileLocalStorage(SPOTIFY_ACCOUNT_TYPE_GLOBAL, '');
    const isPremium = spotifyAcntType?.trim().toLowerCase() === SPOTIFY_PREMIUM_ACCOUNT_TYPE;

    const color = useMemo(
        () => (darkTheme ? dark_colors : light_colors),
        [darkTheme],
    );

    const { play } = useSpotifyControls(darkTheme);

    const isCurrent = useMemo(() => {
        return playbackData?.data?.body?.item?.id === id;
    }, [playbackData, id]);

    const handlePlay = () => {
        const deviceId = playbackData?.data?.body?.device?.id || '';
        play({
            deviceId,
            trackUri,
            contextUri,
        });
    };

    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className="spotify-song-template"
            style={{
                backgroundColor: isCurrent ? color.button : 'transparent',
            }}
        >
            <section className="spotify-song-template-left">
                {isCurrent ? (
                    <div className="spotify-song-template-play-container">
                        <IconContext.Provider value={{ size: '1.5em', color: color.success }}>
                            <GiSoundWaves />
                        </IconContext.Provider>
                    </div>
                ) : (
                    <p className="spotify-song-template-index" style={{ color: color.text }}>
                        {index + 1}
                    </p>
                )}

                {imgUrl && (
                    <img
                        className="spotify_song_template_image"
                        src={imgUrl}
                        alt="Cover"
                        loading="lazy"
                    />
                )}

                <div className="spotify-song-template-info">
                    <h1 className="spotify-song-template-name" style={{ color: color.text }}>
                        {trimToNChars(name, 35)}
                    </h1>
                    <p className="spotify-song-template-artist" style={{ color: color.text }}>
                        {trimToNChars(artist, 25)}
                    </p>
                </div>
            </section>

            <section className="spotify-song-template-right">
                {isPremium && showAddToQueue && fnToAddTrackToQueue && (
                    <motion.span
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="spotify-song-template-add-to-queue"
                        onClick={fnToAddTrackToQueue}
                    >
                        <IconContext.Provider value={{ size: '1.5em', color: color.success }}>
                            <MdAddCircleOutline />
                        </IconContext.Provider>
                    </motion.span>
                )}

                {isPremium && (
                    <motion.span
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="spotify-song-template-play"
                        onClick={handlePlay}
                    >
                        <IconContext.Provider value={{ size: '1.5em', color: color.text }}>
                            {isCurrent ? <RiNeteaseCloudMusicLine /> : <CiPlay1 />}
                        </IconContext.Provider>
                    </motion.span>
                )}

                <p className="spotify-song-template-duration" style={{ color: color.text }}>
                    {msToTime(durationMs)}
                </p>
            </section>
        </motion.div>
    );
};

export default SongTemplate;
