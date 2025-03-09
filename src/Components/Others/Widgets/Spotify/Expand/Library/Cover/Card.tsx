import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { trimTo8Chars } from '../../../../../../../Utils/HelperFn';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import {
    dark_colors,
    light_colors,
} from '../../../../../../../Data/ColorConstant';

const Card = ({
    id,
    img,
    name,
    artist,
    darkTheme,
    fn,
    libraryUri,
    selectedLibraryUri,
}: any) => {
    const [color, setColor] = useState<any>(light_colors);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <motion.section
            className="spotify-library-cover"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.0 }}
            style={{
                backgroundColor:
                    libraryUri === selectedLibraryUri
                        ? color?.button
                        : color?.element,
            }}
            onClick={() => fn(id)}
        >
            <span style={{ backgroundColor: color?.outer }}>
                <img
                    className="spotify-library-cover-img"
                    // src={items?.album?.images[0]?.url}
                    src={img}
                    height="100%"
                    width="100%"
                    loading="lazy"
                    alt="cover-img"
                />
            </span>
            <span style={{ backgroundColor: color?.inner }}>
                <div>
                    <h4 style={{ color: color?.text }}>
                        {trimTo8Chars(name, 6)}
                    </h4>
                    <p style={{ color: color?.text }}>
                        {trimTo8Chars(artist, 6)}
                    </p>
                </div>
                <div>
                    <IconContext.Provider
                        value={{
                            size: '2em',
                            color: color?.success,
                        }}
                    >
                        <RiNeteaseCloudMusicLine />
                    </IconContext.Provider>
                </div>
            </span>
        </motion.section>
    );
};

export default Card;
