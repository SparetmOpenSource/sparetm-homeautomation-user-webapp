import { useEffect, useState } from 'react';
import './Expand.css';
import { dark_colors, light_colors } from '../../../../../Data/ColorConstant';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { VscLibrary } from 'react-icons/vsc';
import { IoMdSearch } from 'react-icons/io';
import { IoHomeOutline } from 'react-icons/io5';
import { MdDeviceHub } from 'react-icons/md';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import AudioProgressBar from '../../../Slide/AudioProgressBar/AudioProgressBar';
import {
    catchError,
    invalidateQueries,
    trimTo8Chars,
} from '../../../../../Utils/HelperFn';
import { useReactQuery_Get } from '../../../../../Api.tsx/useReactQuery_Get';
import {
    GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID,
    GET_SPOTIFY_QUEUE_STATE_QUERY_ID,
} from '../../../../../Data/QueryConstant';
import { spotify_refresh_playback_constant } from '../../../../../Data/Constants';
import { getPlaybackState } from '../../../../../Api.tsx/Spotify/Api';
import { Home } from './Home/Home';
import { getMergedHeaders } from '../../../../../Api.tsx/Axios';
import { usePostUpdateData } from '../../../../../Api.tsx/useReactQuery_Update';
import { featureUrl } from '../../../../../Api.tsx/CoreAppApis';
import Info from './Info/Info';
import { useQueryClient } from 'react-query';
import Library from './Library/Library';
import LoadingFade from '../../../LoadingAnimation/LoadingFade';
import WidgetError from '../../../WidgetError/WidgetError';

const Expand = ({
    callForAccessTokenByRefreshToken,
    darkTheme,
    handleRefresh,
    // toggleBackDropClose,
}: any) => {
    const [color, setColor] = useState<any>(light_colors);
    // const [currentPlayBack, setCurrentPlayBack] = useState('');
    const [currentActiveDevice, setCurrentActiveDevice] = useState('');
    const [changeSection, setChangeSection] = useState<number>(1);
    // const [progress, setProgress] = useState(0);
    const queryClient = useQueryClient();

    const handleChangeSection = (index: number) => {
        setChangeSection(index);
    };

    const sectionData = [
        {
            id: 1,
            onClickParam: 1,
            icon: <IoHomeOutline />,
        },
        {
            id: 2,
            onClickParam: 2,
            icon: <IoMdSearch />,
        },
        {
            id: 3,
            onClickParam: 3,
            icon: <VscLibrary />,
        },
        {
            id: 4,
            onClickParam: 4,
            icon: <MdDeviceHub />,
        },
    ];

    const playbackStateFn = () => {
        const token = localStorage.getItem('spotify_access_token');
        return getPlaybackState(
            darkTheme,
            callForAccessTokenByRefreshToken,
            token,
        );
    };

    const on_Success = (data: any) => {
        // setCurrentPlayingSong(data?.body?.item?.name);
        setCurrentActiveDevice(data?.body?.device?.id);
        console.log('expand');
    };

    const on_Error = (error: any) => {
        catchError(error, darkTheme);
        // setPlayBackStatus(false);
    };

    const {
        isLoading,
        isError,
        data: currentPlaybackData,
    } = useReactQuery_Get(
        GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID,
        playbackStateFn,
        on_Success,
        on_Error,
        true, //playBackStatus, //true, // !fetch_On_Click_Status
        true, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        spotify_refresh_playback_constant.play_back_fetch_delay_time, //false, // refetch_Interval
        false, // refetch_Interval_In_Background
        300000, // Cache time
        0, // Stale Time
    );

    const on_success_for_change = () => {
        let queryArray: any = [];
        queryArray.push(GET_SPOTIFY_QUEUE_STATE_QUERY_ID);
        invalidateQueries(queryClient, queryArray);
    };

    const on_error_for_change = () => {};

    const updateHeaderConfig = {
        headers: getMergedHeaders(localStorage.getItem('spotify_access_token')),
    };

    const { mutate: next } = usePostUpdateData(
        featureUrl.spotify_base_url +
            `?data=next&id=${currentPlaybackData?.body?.device?.id}`,
        updateHeaderConfig,
        on_success_for_change,
        on_error_for_change,
    );

    const { mutate: previous } = usePostUpdateData(
        featureUrl.spotify_base_url +
            `?data=previous&id=${currentPlaybackData?.body?.device?.id}`,
        updateHeaderConfig,
        on_success_for_change,
        on_error_for_change,
    );

    const queryKeys = [GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID];

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            className="spotify-expand"
            style={{ backgroundColor: color?.element }}
        >
            <section
                className="spotify-expand-content"
                // style={{ backgroundColor: color?.inner }}
            >
                {isLoading && (
                    <div className="spotify-expand-isLoading">
                        <LoadingFade />
                    </div>
                )}
                {!isLoading && isError && (
                    <div className="spotify-expand-error">
                        <WidgetError queryKeys={queryKeys} />
                    </div>
                )}
                {!isLoading && !isError && changeSection === 1 && (
                    <Home
                        data={currentPlaybackData}
                        darkTheme={darkTheme}
                        next={next}
                        previous={previous}
                    />
                )}
                {changeSection === 2 && <div>search</div>}
                {changeSection === 3 && (
                    <Library data={currentPlaybackData} darkTheme={darkTheme} />
                )}
                {changeSection === 4 && (
                    <Info
                        darkTheme={darkTheme}
                        currentActiveDevice={currentActiveDevice}
                        handleRefresh={handleRefresh}
                        // toggleBackDropClose={toggleBackDropClose}
                    />
                )}
            </section>
            <section
                className="spotify-expand-nav"
                style={{ backgroundColor: color?.outer }}
            >
                {sectionData.map((item: any) => (
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
                                    changeSection === item?.id
                                        ? color?.success
                                        : color?.icon,
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
