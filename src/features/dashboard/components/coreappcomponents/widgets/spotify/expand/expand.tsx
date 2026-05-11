// refactor code -----------------------------
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { IoMdSearch } from 'react-icons/io';
import { IoHomeOutline } from 'react-icons/io5';
import { MdDeviceHub } from 'react-icons/md';
import { VscLibrary } from 'react-icons/vsc';
import { dark_colors, light_colors } from '../../../../../../../data/ColorConstant';
import {
    GET_SPOTIFY_QUEUE_STATE_QUERY_ID,
} from '../../../../../../../data/QueryConstant';
import './Expand.css';

import {
    useSpotifyPlaybackState,
} from '../../../../../../../core/api/spotify/Api';

import LoadingFade from '../../../../../../../shared/commoncomponents/loadinganimation/Loadingfade';
import WidgetError from '../../../../../../../shared/commoncomponents/widgeterror/Widgeterror';
import { invalidateQueries } from '../../../../../../../utils/HelperFn';
import { Home } from './home/Home';
import Info from './info/Info';
import Library from './library/Library';
import Search from './search/Search';

import { useQueryClient } from 'react-query';
import {
    SPOTIFY_ACCOUNT_TYPE_GLOBAL,
    SPOTIFY_PREMIUM_ACCOUNT_TYPE,
    SPOTIFY_TOKEN_GLOBAL,
} from '../../../../../../../data/Constants';
import { useProfileLocalStorage } from '../../../../../../auth/utils/authhelpers';

const Expand = ({ darkTheme, handleRefresh }: any) => {
    const [accessToken] = useProfileLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');
    const [spotifyAcntType] = useProfileLocalStorage(SPOTIFY_ACCOUNT_TYPE_GLOBAL, '');
    const [color, setColor] = useState(darkTheme ? dark_colors : light_colors);
    const queryClient = useQueryClient();
    
    const isPremium = spotifyAcntType?.trim().toLowerCase() === SPOTIFY_PREMIUM_ACCOUNT_TYPE;
    
    const [changeSection, setChangeSection] = useState(
        !isPremium ? 3 : 1,
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
        !isPremium ? sectionData.slice(2, 4) : sectionData;

    const handleChangeSection = (index: number) => {
        setChangeSection(index);
    };

    const pollInterval = isPremium ? undefined : 10000;

    const {
        isLoading,
        isError,
        data: currentPlaybackData,
    } = useSpotifyPlaybackState(accessToken, darkTheme, pollInterval);

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
                {isPremium &&
                    !isLoading &&
                    !isError &&
                    changeSection === 1 && (
                        <Home
                            data={currentPlaybackData}
                            darkTheme={darkTheme}
                        />
                    )}
                {isPremium && changeSection === 2 && (
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
