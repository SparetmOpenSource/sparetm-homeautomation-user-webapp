// refactor code -----------------------------
import { useCallback, useEffect, useState } from 'react';
import './Expand.css';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { IoMdSearch } from 'react-icons/io';
import { VscLibrary } from 'react-icons/vsc';
import { IoHomeOutline } from 'react-icons/io5';
import { MdDeviceHub } from 'react-icons/md';
import { dark_colors, light_colors } from '../../../../../Data/ColorConstant';
import { spotify_refresh_playback_constant } from '../../../../../Data/Constants';
import {
    GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID,
    GET_SPOTIFY_QUEUE_STATE_QUERY_ID,
} from '../../../../../Data/QueryConstant';

import {
    getPlaybackState,
    setting_up_token,
} from '../../../../../Api.tsx/Spotify/Api';
import { getMergedHeadersForSpotify } from '../../../../../Api.tsx/Axios';
import { useReactQuery_Get } from '../../../../../Api.tsx/useReactQuery_Get';
import { usePostUpdateData } from '../../../../../Api.tsx/useReactQuery_Update';
import { catchError, invalidateQueries } from '../../../../../Utils/HelperFn';
import LoadingFade from '../../../LoadingAnimation/LoadingFade';
import WidgetError from '../../../WidgetError/WidgetError';
import Search from './Search/Search';
import Library from './Library/Library';
import Info from './Info/Info';
import { Home } from './Home/Home';
import { profileUrl } from '../../../../../Api.tsx/ProfileConfigApis';
import { useQueryClient } from 'react-query';
import useLocalStorage from '../../../../../Hooks/UseLocalStorage';
import {
    Current_Date_Time,
    SPOTIFY_TOKEN_GLOBAL,
    SPOTIFY_REFRESH_TOKEN_GLOBAL,
    SPOTIFY_ACCOUNT_TYPE_GLOBAL,
    SPOTIFY_TOKEN_FETCHED_GLOBAL,
    SPOTIFY_TOKEN_FETCHED_TIME_GLOBAL,
} from '../../../../../Data/Constants';

const Expand = ({ darkTheme, handleRefresh }: any) => {
    const [accessToken, setAccessToken] = useLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');
    const [refreshToken, setRefreshToken] = useLocalStorage(SPOTIFY_REFRESH_TOKEN_GLOBAL, '');
    const [spotifyAcntType, setSpotifyAcntType] = useLocalStorage(SPOTIFY_ACCOUNT_TYPE_GLOBAL, '');
    const [, setTokenFetched] = useLocalStorage(SPOTIFY_TOKEN_FETCHED_GLOBAL, false);
    const [, setTokenFetchedTime] = useLocalStorage(SPOTIFY_TOKEN_FETCHED_TIME_GLOBAL, '');
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

    const updateHeaderConfig = {
        headers: getMergedHeadersForSpotify(accessToken),
    };

    const on_success = (data: any) => {
        const { access_token, refresh_token, accountType: acctType } = setting_up_token(data);
        if (access_token && refresh_token) {
            setAccessToken(access_token);
            setRefreshToken(refresh_token);
            setTokenFetched(true);
            setTokenFetchedTime(Current_Date_Time);
            handleRefresh();
        }
        if (acctType) {
            setSpotifyAcntType(acctType);
        }
    };

    const on_error = (error: any) => {
        catchError(error, darkTheme);
    };

    const { mutate: callForAccessTokenByRefreshToken } = usePostUpdateData(
        profileUrl.get_spotify_refresh_access_token,
        updateHeaderConfig,
        on_success,
        on_error,
    );

    const playbackStateFn = useCallback(() => {
        return getPlaybackState(callForAccessTokenByRefreshToken, accessToken, refreshToken);
    }, [callForAccessTokenByRefreshToken, accessToken, refreshToken]);

    const onPlaybackSuccess = (data: any) => {
        setCurrentActiveDevice(data?.body?.device?.id);
        invalidateQueries(queryClient, [GET_SPOTIFY_QUEUE_STATE_QUERY_ID]);
    };

    const onPlaybackError = (error: any) => {
        catchError(error, darkTheme);
    };

    const {
        isLoading,
        isError,
        data: currentPlaybackData,
    } = useReactQuery_Get(
        GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID,
        playbackStateFn,
        onPlaybackSuccess,
        onPlaybackError,
        true,
        true,
        false,
        spotify_refresh_playback_constant.play_back_fetch_delay_time,
        false,
        300000,
        0,
    );

    // const queryKeys = [GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID];

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
