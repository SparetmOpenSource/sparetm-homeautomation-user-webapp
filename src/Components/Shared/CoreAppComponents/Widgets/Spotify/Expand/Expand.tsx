// refactor code -----------------------------
import { useEffect, useState } from 'react';
import './Expand.css';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { IoMdSearch } from 'react-icons/io';
import { VscLibrary } from 'react-icons/vsc';
import { IoHomeOutline } from 'react-icons/io5';
import { MdDeviceHub } from 'react-icons/md';
import { dark_colors, light_colors } from '../../../../../../Data/ColorConstant';
import {
    GET_SPOTIFY_QUEUE_STATE_QUERY_ID,
} from '../../../../../../Data/QueryConstant';

import {
    useSpotifyPlaybackState,
} from '../../../../../../Api.tsx/Spotify/Api';

import { invalidateQueries } from '../../../../../../Utils/HelperFn';
import LoadingFade from '../../../../CommonComponents/LoadingAnimation/LoadingFade';
import WidgetError from '../../../../WidgetError/WidgetError';
import Search from './Search/Search';
import Library from './Library/Library';
import Info from './Info/Info';
import { Home } from './Home/Home';

import { useQueryClient } from 'react-query';
import useLocalStorage from '../../../../../../Hooks/UseLocalStorage';
import {
    SPOTIFY_TOKEN_GLOBAL,
    SPOTIFY_ACCOUNT_TYPE_GLOBAL,
} from '../../../../../../Data/Constants';

const Expand = ({ darkTheme, handleRefresh }: any) => {
    const [accessToken] = useLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');
    const [spotifyAcntType] = useLocalStorage(SPOTIFY_ACCOUNT_TYPE_GLOBAL, '');
    const [color, setColor] = useState(darkTheme ? dark_colors : light_colors);
    const queryClient = useQueryClient();
    const [changeSection, setChangeSection] = useState(
        spotifyAcntType !== 'premium' ? 3 : 1,
    );
    const [currentActiveDevice, setCurrentActiveDevice] = useState('');

    useEffect(() => {
        setColor(darkTheme ? dark_colors : light_colors);
    }, [darkTheme]);

    const sectionData = [
        { id: 1, onClickParam: 1, icon: <IoHomeOutline /> },
        { id: 2, onClickParam: 2, icon: <IoMdSearch /> },
        { id: 3, onClickParam: 3, icon: <VscLibrary /> },
        { id: 4, onClickParam: 4, icon: <MdDeviceHub /> },
    ];

    const sectionDataModifiedList =
        spotifyAcntType !== 'premium' ? sectionData.slice(2, 4) : sectionData;

    const handleChangeSection = (index: number) => {
        setChangeSection(index);
    };

    const {
        isLoading,
        isError,
        data: currentPlaybackData,
    } = useSpotifyPlaybackState(accessToken, darkTheme);

    useEffect(() => {
        if (currentPlaybackData) {
            setCurrentActiveDevice(currentPlaybackData?.data?.body?.device?.id);
            invalidateQueries(queryClient, [GET_SPOTIFY_QUEUE_STATE_QUERY_ID]);
        }
    }, [currentPlaybackData, queryClient]);

    return (
        <div
            className="spotify-expand"
            style={{ backgroundColor: color.element }}
        >
            <section className="spotify-expand-content">
                {isLoading && (
                    <div className="spotify-expand-isLoading">
                        <LoadingFade />
                    </div>
                )}
                {!isLoading && isError && (
                    <div className="spotify-expand-error">
                        <WidgetError darkTheme={darkTheme} />
                    </div>
                )}
                {spotifyAcntType === 'premium' &&
                    !isLoading &&
                    !isError &&
                    changeSection === 1 && (
                        <Home
                            data={currentPlaybackData}
                            darkTheme={darkTheme}
                        />
                    )}
                {spotifyAcntType === 'premium' && changeSection === 2 && (
                    <Search data={currentPlaybackData} darkTheme={darkTheme} />
                )}
                {changeSection === 3 && (
                    <Library data={currentPlaybackData} darkTheme={darkTheme} />
                )}
                {changeSection === 4 && (
                    <Info
                        darkTheme={darkTheme}
                        currentActiveDevice={currentActiveDevice}
                        handleRefresh={handleRefresh}
                    />
                )}
            </section>

            <section
                className="spotify-expand-nav"
                style={{ backgroundColor: color.outer }}
            >
                {sectionDataModifiedList.map((item: any) => (
                    <motion.span
                        key={item.id}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleChangeSection(item.onClickParam)}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color:
                                    changeSection === item.id
                                        ? color.success
                                        : color.icon,
                            }}
                        >
                            {item.icon}
                        </IconContext.Provider>
                    </motion.span>
                ))}
            </section>
        </div>
    );
};

export default Expand;



