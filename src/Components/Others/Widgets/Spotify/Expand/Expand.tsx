// import { useEffect, useState } from 'react';
// import './Expand.css';
// import { dark_colors, light_colors } from '../../../../../Data/ColorConstant';
// import { motion } from 'framer-motion';
// import { IconContext } from 'react-icons';
// import { VscLibrary } from 'react-icons/vsc';
// import { IoMdSearch } from 'react-icons/io';
// import { IoHomeOutline } from 'react-icons/io5';
// import { MdDeviceHub } from 'react-icons/md';
// import { catchError, invalidateQueries } from '../../../../../Utils/HelperFn';
// import { useReactQuery_Get } from '../../../../../Api.tsx/useReactQuery_Get';
// import {
//     GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID,
//     GET_SPOTIFY_QUEUE_STATE_QUERY_ID,
// } from '../../../../../Data/QueryConstant';
// import {
//     spotify_refresh_playback_constant,
//     spotifyAccountType,
// } from '../../../../../Data/Constants';
// import { getPlaybackState } from '../../../../../Api.tsx/Spotify/Api';
// import { Home } from './Home/Home';
// import { getMergedHeadersForSpotify } from '../../../../../Api.tsx/Axios';
// import { usePostUpdateData } from '../../../../../Api.tsx/useReactQuery_Update';
// import { featureUrl } from '../../../../../Api.tsx/CoreAppApis';
// import Info from './Info/Info';
// import { useQueryClient } from 'react-query';
// import Library from './Library/Library';
// import LoadingFade from '../../../LoadingAnimation/LoadingFade';
// import WidgetError from '../../../WidgetError/WidgetError';
// import Search from './Search/Search';

// const Expand = ({
//     callForAccessTokenByRefreshToken,
//     darkTheme,
//     handleRefresh,
// }: // currentPlaybackData,
// // onClose,
// any) => {
//     const spotifyAcntType = localStorage.getItem(spotifyAccountType);
//     const [color, setColor] = useState<any>(light_colors);
//     const [currentActiveDevice, setCurrentActiveDevice] = useState('');
//     const [changeSection, setChangeSection] = useState<number>(
//         spotifyAcntType !== 'premium' ? 3 : 1,
//     );
//     const queryClient = useQueryClient();

//     const handleChangeSection = (index: number) => {
//         setChangeSection(index);
//     };

//     const sectionData = [
//         {
//             id: 1,
//             onClickParam: 1,
//             icon: <IoHomeOutline />,
//         },
//         {
//             id: 2,
//             onClickParam: 2,
//             icon: <IoMdSearch />,
//         },
//         {
//             id: 3,
//             onClickParam: 3,
//             icon: <VscLibrary />,
//         },
//         {
//             id: 4,
//             onClickParam: 4,
//             icon: <MdDeviceHub />,
//         },
//     ];

//     const sectionDataModifiedList =
//         spotifyAcntType !== 'premium' ? sectionData.slice(2, 4) : sectionData;

//     const playbackStateFn = () => {
//         const token = localStorage.getItem('spotify_access_token');
//         return getPlaybackState(
//             darkTheme,
//             callForAccessTokenByRefreshToken,
//             token,
//         );
//     };

//     const on_success = (data: any) => {
//         setCurrentActiveDevice(data?.body?.device?.id);
//         console.log('expand');
//     };

//     const on_error = (error: any) => {
//         catchError(error, darkTheme);
//     };

//     const {
//         isLoading,
//         isError,
//         data: currentPlaybackData,
//     } = useReactQuery_Get(
//         GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID,
//         playbackStateFn,
//         on_success,
//         on_error,
//         true, //playBackStatus, //true, // !fetch_On_Click_Status
//         true, // refetch_On_Mount
//         false, // refetch_On_Window_Focus
//         spotify_refresh_playback_constant.play_back_fetch_delay_time, //false, // refetch_Interval
//         false, // refetch_Interval_In_Background
//         300000, // Cache time
//         0, // Stale Time
//     );

//     const on_success_for_change = () => {
//         let queryArray: any = [];
//         queryArray.push(GET_SPOTIFY_QUEUE_STATE_QUERY_ID);
//         invalidateQueries(queryClient, queryArray);
//     };

//     const on_error_for_change = (error: any) => {
//         catchError(error, darkTheme);
//     };

//     const updateHeaderConfig = {
//         headers: getMergedHeadersForSpotify(
//             localStorage.getItem('spotify_access_token'),
//         ),
//     };

// const { mutate: next } = usePostUpdateData(
//     featureUrl.spotify_base_url +
//         `?data=next&id=${currentPlaybackData?.body?.device?.id}`,
//     updateHeaderConfig,
//     on_success_for_change,
//     on_error_for_change,
// );

// const { mutate: previous } = usePostUpdateData(
//     featureUrl.spotify_base_url +
//         `?data=previous&id=${currentPlaybackData?.body?.device?.id}`,
//     updateHeaderConfig,
//     on_success_for_change,
//     on_error_for_change,
// );

//     const queryKeys = [GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID];

//     useEffect(() => {
//         darkTheme ? setColor(dark_colors) : setColor(light_colors);
//     }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

//     return (
//         <div
//             className="spotify-expand"
//             style={{ backgroundColor: color?.element }}
//         >
//             <section className="spotify-expand-content">
//                 {isLoading && (
//                     <div className="spotify-expand-isLoading">
//                         <LoadingFade />
//                     </div>
//                 )}
//                 {!isLoading && isError && (
//                     <div className="spotify-expand-error">
//                         <WidgetError queryKeys={queryKeys} />
//                     </div>
//                 )}
//                 {spotifyAcntType === 'premium' &&
//                     !isLoading &&
//                     !isError &&
//                     changeSection === 1 && (
//                         <Home
//                             data={currentPlaybackData}
//                             darkTheme={darkTheme}
//                             next={next}
//                             previous={previous}
//                         />
//                     )}
//                 {spotifyAcntType === 'premium' && changeSection === 2 && (
//                     <Search />
//                 )}
//                 {changeSection === 3 && (
//                     <Library data={currentPlaybackData} darkTheme={darkTheme} />
//                 )}
//                 {changeSection === 4 && (
//                     <Info
//                         darkTheme={darkTheme}
//                         currentActiveDevice={currentActiveDevice}
//                         handleRefresh={handleRefresh}
//                     />
//                 )}
//             </section>
//             <section
//                 className="spotify-expand-nav"
//                 style={{ backgroundColor: color?.outer }}
//             >
//                 {sectionDataModifiedList?.map((item: any) => (
//                     <motion.span
//                         key={item.id}
//                         whileHover={{ scale: 1.2 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => handleChangeSection(item.onClickParam)}
//                     >
//                         <IconContext.Provider
//                             value={{
//                                 size: '2em',
//                                 color:
//                                     changeSection === item?.id
//                                         ? color?.success
//                                         : color?.icon,
//                             }}
//                         >
//                             {item.icon}
//                         </IconContext.Provider>
//                     </motion.span>
//                 ))}
//             </section>
//         </div>
//     );
// };

// export default Expand;

// refactor code -----------------------------
import { useEffect, useState } from 'react';
import './Expand.css';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { IoMdSearch } from 'react-icons/io';
import { VscLibrary } from 'react-icons/vsc';
import { IoHomeOutline } from 'react-icons/io5';
import { MdDeviceHub } from 'react-icons/md';
import { useQueryClient } from 'react-query';

import { dark_colors, light_colors } from '../../../../../Data/ColorConstant';
import {
    spotify_refresh_playback_constant,
    spotifyAccountType,
} from '../../../../../Data/Constants';
import {
    GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID,
    GET_SPOTIFY_QUEUE_STATE_QUERY_ID,
} from '../../../../../Data/QueryConstant';

import { getPlaybackState } from '../../../../../Api.tsx/Spotify/Api';
import { getMergedHeadersForSpotify } from '../../../../../Api.tsx/Axios';
import { useReactQuery_Get } from '../../../../../Api.tsx/useReactQuery_Get';
import { usePostUpdateData } from '../../../../../Api.tsx/useReactQuery_Update';
import { featureUrl } from '../../../../../Api.tsx/CoreAppApis';
import { catchError, invalidateQueries } from '../../../../../Utils/HelperFn';
import LoadingFade from '../../../LoadingAnimation/LoadingFade';
import WidgetError from '../../../WidgetError/WidgetError';
import Search from './Search/Search';
import Library from './Library/Library';
import Info from './Info/Info';
import { Home } from './Home/Home';

const Expand = ({
    callForAccessTokenByRefreshToken,
    darkTheme,
    handleRefresh,
}: any) => {
    const spotifyAcntType = localStorage.getItem(spotifyAccountType);
    const queryClient = useQueryClient();

    const [color, setColor] = useState(darkTheme ? dark_colors : light_colors);
    const [changeSection, setChangeSection] = useState(
        spotifyAcntType !== 'premium' ? 3 : 1,
    );
    const [currentActiveDevice, setCurrentActiveDevice] = useState('');

    // Update theme colors
    useEffect(() => {
        setColor(darkTheme ? dark_colors : light_colors);
    }, [darkTheme]);

    // Navigation data
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

    const playbackStateFn = () => {
        const token = localStorage.getItem('spotify_access_token');
        return getPlaybackState(
            darkTheme,
            callForAccessTokenByRefreshToken,
            token,
        );
    };

    const onPlaybackSuccess = (data: any) => {
        setCurrentActiveDevice(data?.body?.device?.id);
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

    const updateHeaderConfig = {
        headers: getMergedHeadersForSpotify(
            localStorage.getItem('spotify_access_token'),
        ),
    };

    const onNavSuccess = () => {
        invalidateQueries(queryClient, [GET_SPOTIFY_QUEUE_STATE_QUERY_ID]);
    };

    const onNavError = (error: any) => {
        catchError(error, darkTheme);
    };

    const { mutate: next } = usePostUpdateData(
        `${featureUrl.spotify_base_url}?data=next&id=${currentPlaybackData?.body?.device?.id}`,
        updateHeaderConfig,
        onNavSuccess,
        onNavError,
    );

    const { mutate: previous } = usePostUpdateData(
        `${featureUrl.spotify_base_url}?data=previous&id=${currentPlaybackData?.body?.device?.id}`,
        updateHeaderConfig,
        onNavSuccess,
        onNavError,
    );

    const queryKeys = [GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID];

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
                        <WidgetError queryKeys={queryKeys} />
                    </div>
                )}
                {spotifyAcntType === 'premium' &&
                    !isLoading &&
                    !isError &&
                    changeSection === 1 && (
                        <Home
                            data={currentPlaybackData}
                            darkTheme={darkTheme}
                            next={next}
                            previous={previous}
                        />
                    )}
                {spotifyAcntType === 'premium' && changeSection === 2 && (
                    <Search />
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
