// refactor code -----------------------------
import { useEffect, useState, useMemo } from 'react';
import './Expand.css';
import { motion } from 'framer-motion';
import { formatTime, trimToNChars } from '../../../../../Utils/HelperFn';
import { dark_colors, light_colors } from '../../../../../Data/ColorConstant';
import { IconContext } from 'react-icons';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import { GiSoundWaves } from 'react-icons/gi';
import { IoIosAddCircle } from 'react-icons/io';
import { CiPlay1 } from 'react-icons/ci';

const SongTemplate = ({
    contextUri,
    startPlayingFn,
    trackUri,
    darkTheme,
    index,
    imgUrl,
    imgType,
    name,
    artist,
    durationMs,
    data,
    id,
    fnToAddTrackToQueue,
    showAddToQueue,
}: any) => {
    const [color, setColor] = useState(light_colors);

    useEffect(() => {
        setColor(darkTheme ? dark_colors : light_colors);
    }, [darkTheme]);

    const isCurrentTrack = data?.body?.item?.id === id;

    const backgroundColor = useMemo(() => {
        if (isCurrentTrack) {
            const [start, end] = color?.button?.split(')');
            return `${start}${end},0.2)`;
        }
        return color?.element;
    }, [isCurrentTrack, color]);

    const handlePlayClick = () => startPlayingFn(trackUri, data, contextUri);

    return (
        <motion.div
            className="spotify-song-template"
            style={{ backgroundColor }}
            whileHover={{ scale: 0.99 }}
        >
            <section>
                <p style={{ color: color.text }}>{index + 1}</p>

                {!isCurrentTrack && (
                    <motion.span
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="spotify-song-template-play"
                        onClick={handlePlayClick}
                    >
                        <IconContext.Provider
                            value={{ size: '1.5em', color: color.text }}
                        >
                            <CiPlay1 />
                        </IconContext.Provider>
                    </motion.span>
                )}

                {isCurrentTrack && (
                    <span className="spotify-song-template-live-icon">
                        <IconContext.Provider
                            value={{ size: '1.5em', color: color.success }}
                        >
                            <GiSoundWaves />
                        </IconContext.Provider>
                    </span>
                )}

                {imgType === 'img' ? (
                    <img
                        className="spotify_song_template_image"
                        src={imgUrl}
                        height="80%"
                        width="40px"
                        loading="lazy"
                        alt="spotify_song_template_image"
                    />
                ) : (
                    <span className="spotify-song-template-music-icon">
                        <IconContext.Provider
                            value={{ size: '2em', color: color.success }}
                        >
                            <RiNeteaseCloudMusicLine />
                        </IconContext.Provider>
                    </span>
                )}

                <div>
                    <h1 style={{ color: color.text }}>
                        {trimToNChars(name, 18)}
                    </h1>
                    <p style={{ color: color.icon }}>
                        {trimToNChars(artist, 18)}
                    </p>
                </div>
            </section>

            <section>
                {showAddToQueue && (
                    <motion.span
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="spotify-song-template-add-to-queue"
                        onClick={fnToAddTrackToQueue}
                    >
                        <IconContext.Provider
                            value={{ size: '1.5em', color: color.success }}
                        >
                            <IoIosAddCircle />
                        </IconContext.Provider>
                    </motion.span>
                )}

                <p style={{ color: color.text }}>
                    {formatTime(durationMs / 1000)}
                </p>
            </section>
        </motion.div>
    );
};

export default SongTemplate;
