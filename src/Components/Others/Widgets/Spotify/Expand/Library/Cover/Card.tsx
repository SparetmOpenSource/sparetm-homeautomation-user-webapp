// refactor code -----------------------------
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { trimToNChars } from '../../../../../../../Utils/HelperFn';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import {
    dark_colors,
    light_colors,
} from '../../../../../../../Data/ColorConstant';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useBackDropOpen } from '../../../../../../../Pages/ThemeProvider';
import Confirmation from '../../../../../BackDrop/Confirmation/Confirmation';
import {
    LandscapeSizeS,
    SPOTIFY_EXPAND_ALBUM_DELETE_CONFIRMATION,
} from '../../../../../../../Data/Constants';

interface CardProps {
    id: string | number;
    img: string;
    name: string;
    artist: string;
    darkTheme: boolean;
    fn: (id: string | number) => void;
    libraryUri: string;
    selectedLibraryUri: string;
    type: number;
    triggerDeletion: (id: string | number) => void;
    docId: string | number;
}

const Card = ({
    id,
    img,
    name,
    artist,
    darkTheme,
    fn,
    libraryUri,
    selectedLibraryUri,
    type,
    triggerDeletion,
    docId,
}: CardProps) => {
    const [color, setColor] = useState(light_colors);

    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();

    useEffect(() => {
        setColor(darkTheme ? dark_colors : light_colors);
    }, [darkTheme]);

    const handleDeleteClick = () => {
        const backdropId = SPOTIFY_EXPAND_ALBUM_DELETE_CONFIRMATION;

        toggleBackDropOpen(
            backdropId,
            <Confirmation
                darkTheme={darkTheme}
                heading="Would you like to delete this album from your collection?"
                btnOkFn={() => {
                    triggerDeletion(docId);
                    toggleBackDropClose(backdropId);
                }}
                btnCancelFn={() => toggleBackDropClose(backdropId)}
                btnOkLabel="Yes, delete"
                btnCancelLabel="Cancel"
            />,
            LandscapeSizeS,
        );
    };

    const handleMainClick = () => {
        if (type === 1) fn(id);
    };

    const handleBottomClick = () => {
        if (type === 2) fn(id);
    };

    return (
        <motion.section
            className="spotify-library-cover"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.0 }}
            style={{
                backgroundColor:
                    libraryUri === selectedLibraryUri
                        ? color.button
                        : color.element,
            }}
            onClick={handleMainClick}
        >
            <span style={{ backgroundColor: color.outer }}>
                <img
                    className="spotify-library-cover-img"
                    src={img}
                    height="100%"
                    width="100%"
                    loading="lazy"
                    alt="cover-img"
                />
            </span>

            {type === 2 && (
                <motion.span
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="spotify-library-cover-delete-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick();
                    }}
                >
                    <IconContext.Provider
                        value={{ size: '2em', color: color.error }}
                    >
                        <MdOutlineDeleteOutline />
                    </IconContext.Provider>
                </motion.span>
            )}

            <span
                style={{ backgroundColor: color.inner }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleBottomClick();
                }}
            >
                <div>
                    <h4 style={{ color: color.text }}>
                        {trimToNChars(name, 6)}
                    </h4>
                    <p style={{ color: color.text }}>
                        {trimToNChars(artist, 6)}
                    </p>
                </div>
                <div>
                    <IconContext.Provider
                        value={{ size: '2em', color: color.success }}
                    >
                        <RiNeteaseCloudMusicLine />
                    </IconContext.Provider>
                </div>
            </span>
        </motion.section>
    );
};

export default Card;
