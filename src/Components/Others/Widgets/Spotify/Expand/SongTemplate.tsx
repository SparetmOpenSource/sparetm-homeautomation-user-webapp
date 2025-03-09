import { useEffect, useState } from 'react';
import './Expand.css';
import { motion } from 'framer-motion';
import { formatTime, trimTo8Chars } from '../../../../../Utils/HelperFn';
import { dark_colors, light_colors } from '../../../../../Data/ColorConstant';
import { IconContext } from 'react-icons';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import { GiSoundWaves } from 'react-icons/gi';

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
}: any) => {
    const [color, setColor] = useState<any>(light_colors);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <motion.section
            className="spotify-song-template"
            style={{
                backgroundColor:
                    data?.body?.item?.id === id
                        ? `${color?.button.split(')')[0]}
                    ${color?.button.split(')')[1]},0.4)`
                        : color?.element,
            }}
            whileHover={{ scale: 0.99 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => startPlayingFn(trackUri, data, contextUri)}
        >
            <span>
                <p style={{ color: color?.text }}>{index + 1}</p>
                {imgType === 'img' && (
                    <img
                        className="spotify_song_template_image"
                        src={imgUrl}
                        height="80%"
                        width="40px"
                        loading="lazy"
                        alt="spotify_song_template_image"
                    />
                )}
                {imgType === 'icon' && (
                    <IconContext.Provider
                        value={{
                            size: '2em',
                            color: color?.success,
                        }}
                    >
                        <RiNeteaseCloudMusicLine />
                    </IconContext.Provider>
                )}
                <div>
                    <h1 style={{ color: color?.text }}>
                        {trimTo8Chars(name, 15)}
                    </h1>
                    <p style={{ color: color?.icon }}>
                        {trimTo8Chars(artist, 15)}
                    </p>
                </div>
            </span>
            <span>
                {data?.body?.item?.id !== id && (
                    <p style={{ color: color?.text }}>
                        {formatTime(durationMs / 1000)}
                    </p>
                )}

                {data?.body?.item?.id === id && (
                    <span>
                        <IconContext.Provider
                            value={{
                                size: '1.5em',
                                color: color?.success,
                            }}
                        >
                            <GiSoundWaves />
                        </IconContext.Provider>
                    </span>
                )}
            </span>
        </motion.section>
    );
};

export default SongTemplate;
