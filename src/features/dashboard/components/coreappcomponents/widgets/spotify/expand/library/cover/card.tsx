import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import { useBackDropOpen } from '../../../../../../../../../core/router/Themeprovider';
import {
    dark_colors,
    light_colors,
} from '../../../../../../../../../data/ColorConstant';
import {
    LandscapeSizeS,
    SPOTIFY_EXPAND_ALBUM_DELETE_CONFIRMATION,
} from '../../../../../../../../../data/Constants';
import Confirmation from '../../../../../../../../../shared/commoncomponents/backdrop/confirmation/Confirmation';

interface CardProps {
    id: string | number;
    img: string;
    name: string;
    artist: string;
    darkTheme: boolean;
    isPremium: boolean;
    fn: (id: string | number) => void;
    libraryUri: string;
    selectedLibraryUri?: string;
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
    isPremium,
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
        fn(id);
    };

    return (
        <motion.section
            className="spotify-library-cover"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{
                backgroundColor:
                    libraryUri === selectedLibraryUri
                        ? color.button
                        : color.element,
            }}
            onClick={handleMainClick}
        >
            <div className="spotify-library-cover-img-container" style={{ backgroundColor: color.outer }}>
                <img
                    className="spotify-library-cover-img"
                    src={img}
                    loading="lazy"
                    alt="cover-img"
                />
            </div>

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
                        value={{ size: '1.5em', color: color.error }}
                    >
                        <MdOutlineDeleteOutline />
                    </IconContext.Provider>
                </motion.span>
            )}

            <div
                className="spotify-library-cover-info"
                style={{ backgroundColor: color.inner }}
            >
                <div className="spotify-library-cover-info-text">
                    <h4 style={{ color: color.text }}>
                        {name}
                    </h4>
                    <p style={{ color: color.text }}>
                        {artist}
                    </p>
                </div>
                {isPremium && (
                    <div className="spotify-library-cover-info-icon">
                        <IconContext.Provider
                            value={{ size: '1.5em', color: color.success }}
                        >
                            <RiNeteaseCloudMusicLine />
                        </IconContext.Provider>
                    </div>
                )}
            </div>
        </motion.section>
    );
};

export default Card;
