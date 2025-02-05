// import './CoreApplication.css';
// import { LandscapeSizeM, RoutePath } from '../../Data/Constants';
// import { GrHomeRounded, GrAppsRounded } from 'react-icons/gr';
// import { IoGameControllerOutline, IoSettingsOutline } from 'react-icons/io5';
// import { VscDebugDisconnect, VscRefresh } from 'react-icons/vsc';
// import SideNavigation from '../../Components/Others/Navigation/SideNavigation/SideNavigation';
// import CommonSkin from '../../Components/Others/UiSkin/CommonSkin/CommonSkin';
// import UpperNavigation from '../../Components/Others/Navigation/UpperNavigation/UpperNavigation';
// import { MdLightMode } from 'react-icons/md';
// import { dark_colors, light_colors } from '../../Data/ColorConstant';
// import { useEffect, useState } from 'react';
// import { CiDark } from 'react-icons/ci';
// import { useBackDropOpen, useTheme, useThemeUpdate } from '../ThemeProvider';
// import { Outlet, useLocation } from 'react-router-dom';
// import { displayToastify, invalidateQueries } from '../../Utils/HelperFn';
// import { useReactQuery_Get } from '../../Api.tsx/useReactQuery_Get';
// import {
//     GET_PROFILE_QUERY_ID,
//     SELECT_DEVICE_LIST_QUERY_ID,
//     SELECT_DEVICE_SERVICE_URL_LIST_QUERY_ID,
//     SELECT_WEATHER_QUOTE_QUERY_ID,
// } from '../../Data/QueryConstant';
// import { getProfile } from '../../Api.tsx/ProfileConfigApis';
// import { useAppDispatch, useAppSelector } from '../../Features/ReduxHooks';
// import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../Data/Enum';
// import LoadingFade from '../../Components/Others/LoadingAnimation/LoadingFade';
// import Error from './../../Components/Others/ErrorPage/ErrorPage';
// import { addFirstRoom } from '../../Features/Room/RoomSlice';
// import { useQueryClient } from 'react-query';
// import { addProfileData } from '../../Features/User/UserSlice';
// import AddDevice from '../../Components/CoreApplicationNew/DeviceRoom/AddDevice/AddDevice';
// import { PiDevicesDuotone } from 'react-icons/pi';

// const CoreApplication = () => {
//     const location = useLocation();
//     const dispatch = useAppDispatch();
//     const queryClient = useQueryClient();
//     const [color, setColor] = useState<any>(light_colors);
//     const toggleTheme: any = useThemeUpdate(); // TODO fix issue
//     const darkTheme: any = useTheme();
//     const currentPath = location.pathname.replace('%20', '');
//     const profileId = useAppSelector((state: any) => state?.user?.profileId);
//     const firstRoom = useAppSelector((state: any) => state?.room?.firstRoom);
//     const roomType: any = location?.pathname
//         ?.split('/')[3]
//         ?.replace('%20', ' ');
//     const handleRefresh = () => {
//         let queryArray: any = [];
//         if (location.pathname.includes(RoutePath.CoreApplication_Dashboard)) {
//             queryArray.push(SELECT_DEVICE_SERVICE_URL_LIST_QUERY_ID);
//             queryArray.push(GET_PROFILE_QUERY_ID);
//             queryArray.push(SELECT_WEATHER_QUOTE_QUERY_ID);
//         } else if (location.pathname.includes(RoutePath.CoreApplication_Room)) {
//             queryArray.push(SELECT_DEVICE_SERVICE_URL_LIST_QUERY_ID);
//             queryArray.push(GET_PROFILE_QUERY_ID);
//             queryArray.push(SELECT_DEVICE_LIST_QUERY_ID);
//         }
//         invalidateQueries(queryClient, queryArray);
//         displayToastify(
//             `Refreshed ${queryArray.length} queries`,
//             !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
//             TOASTIFYSTATE.INFO,
//         );
//     };

//     const returnPageSpecificIcon = (currentPath: string, pathCheck: any) => {
//         if (currentPath.includes(pathCheck)) {
//             return <PiDevicesDuotone />;
//         }
//         return <></>;
//     };

//     const addDevice = () => {
//         toggleBackDropOpen();
//         setChildForCustomBackDrop(
//             <AddDevice
//                 darkTheme={darkTheme}
//                 roomType={roomType}
//                 toggleBackDropClose={toggleBackDropClose}
//             />,
//         );
//         setSizeForCustomBackDrop(LandscapeSizeM);
//     };

//     const nav_upper_list = [
//         {
//             id: 1,
//             to: RoutePath.CoreApplication_Dashboard + RoutePath.Device_Status,
//             icon: <GrHomeRounded />,
//             currentPath: currentPath,
//             listPath: RoutePath.CoreApplication_Dashboard,
//             label: 'Home',
//         },
//         {
//             id: 2,
//             to: `${RoutePath.CoreApplication_Room}/${firstRoom}`,
//             icon: <GrAppsRounded />,
//             currentPath: `/${location.pathname.split('/')[1]}/${
//                 location.pathname.split('/')[2]
//             }/`,
//             listPath: RoutePath.CoreApplication_Room + '/',
//             label: 'Room',
//         },
//         {
//             id: 3,
//             to: RoutePath.CoreApplication_Play,
//             icon: <IoGameControllerOutline />,
//             currentPath: currentPath,
//             listPath: RoutePath.CoreApplication_Play,
//             label: 'Play',
//         },
//     ];
//     const nav_lower_list = [
//         {
//             id: 1,
//             to: `${RoutePath.CoreApplication_Docs}/${
//                 RoutePath.GettingStartedDocs.split('/')[1]
//             }`,
//             icon: <VscDebugDisconnect />,
//             currentPath: currentPath,
//             listPath: RoutePath.CoreApplication_Docs,
//             label: 'Connect',
//         },
//         {
//             id: 2,
//             to: `${RoutePath.CoreApplication_Setting}/${RoutePath.Setting_Account}`,
//             icon: <IoSettingsOutline />,
//             currentPath: currentPath,
//             listPath: RoutePath.CoreApplication_Setting,
//             label: 'Setting',
//         },
//     ];

//     const nav_upper_list_option = [
//         {
//             id: 1,
//             icon: returnPageSpecificIcon(
//                 currentPath,
//                 RoutePath.CoreApplication_Room,
//             ),
//             color: color?.button,
//             fn: returnPageSpecificIcon(
//                 currentPath,
//                 RoutePath.CoreApplication_Room,
//             )
//                 ? addDevice
//                 : undefined,
//         },
//         {
//             id: 2,
//             icon: <VscRefresh />,
//             color: color?.button,
//             fn: handleRefresh,
//         },
//         {
//             id: 3,
//             icon: darkTheme ? <MdLightMode /> : <CiDark />,
//             color: color?.button,
//             fn: toggleTheme,
//         },
//     ];

//     const {
//         toggleBackDropOpen,
//         toggleBackDropClose,
//         setChildForCustomBackDrop,
//         setSizeForCustomBackDrop,
//     } = useBackDropOpen();

//     const profileFn = () => {
//         return getProfile(profileId, darkTheme);
//     };

//     const on_Success = (data: any) => {
//         dispatch(addProfileData(data?.data));
//         dispatch(addFirstRoom(data?.data?.body?.room[0]?.room_type));
//     };

//     const on_Error = (error: any) => {
//         displayToastify(
//             error?.response?.data?.message,
//             !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
//             TOASTIFYSTATE.ERROR,
//         );
//     };

//     const { isLoading, isError } = useReactQuery_Get(
//         GET_PROFILE_QUERY_ID,
//         profileFn,
//         on_Success,
//         on_Error,
//         true, // !fetch_On_Click_Status
//         true, // refetch_On_Mount
//         false, // refetch_On_Window_Focus
//         false, // refetch_Interval
//         false, // refetch_Interval_In_Background
//         20000, // Cache time
//         10000, // Stale Time
//     );

//     useEffect(() => {
//         darkTheme ? setColor(dark_colors) : setColor(light_colors);
//     }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

//     console.log('core app logging');

//     return (
//         <div className="coreApplication">
//             {isLoading && (
//                 <div className="coreApplication_isLoading">
//                     <LoadingFade />
//                 </div>
//             )}
//             {!isLoading && isError && (
//                 <div className="coreApplication_error">
//                     <Error />
//                 </div>
//             )}
//             {!isLoading && (
//                 <CommonSkin
//                     side_nav_enable={true}
//                     side_nav={
//                         <SideNavigation
//                             upper_list={nav_upper_list}
//                             lower_list={nav_lower_list}
//                             profileLogOut={true}
//                             logoutBtnOkLabel="Yes, Log me out"
//                             profileBtnOkLabel="Yes"
//                             profileBtnHeading="You want to switch profile, Are you sure?"
//                             logoutBtnHeading="Oh no! You are leaving. Are you sure?"
//                             toggleBackDropOpen={toggleBackDropOpen}
//                             toggleBackDropClose={toggleBackDropClose}
//                             setChildForCustomBackDrop={
//                                 setChildForCustomBackDrop
//                             }
//                             setSizeForCustomBackDrop={setSizeForCustomBackDrop}
//                         />
//                     }
//                     upper_nav_enable={true}
//                     upper_nav={
//                         <UpperNavigation
//                             upper_nav_option={nav_upper_list_option}
//                         />
//                     }
//                     content={<Outlet />}
//                 />
//             )}
//         </div>
//     );
// };
// export default CoreApplication;

import { useCallback, useMemo, memo } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { MdLightMode } from 'react-icons/md';
import { CiDark } from 'react-icons/ci';
import { GrHomeRounded, GrAppsRounded } from 'react-icons/gr';
import { IoGameControllerOutline, IoSettingsOutline } from 'react-icons/io5';
import { VscDebugDisconnect, VscRefresh } from 'react-icons/vsc';
import { PiDevicesDuotone } from 'react-icons/pi';
import { LandscapeSizeM, RoutePath } from '../../Data/Constants';
import { dark_colors, light_colors } from '../../Data/ColorConstant';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../Data/Enum';
import { useBackDropOpen, useTheme, useThemeUpdate } from '../ThemeProvider';
import { displayToastify, invalidateQueries } from '../../Utils/HelperFn';
import { useReactQuery_Get } from '../../Api.tsx/useReactQuery_Get';
import {
    GET_PROFILE_QUERY_ID,
    SELECT_DEVICE_LIST_QUERY_ID,
    SELECT_DEVICE_SERVICE_URL_LIST_QUERY_ID,
    SELECT_WEATHER_QUOTE_QUERY_ID,
} from '../../Data/QueryConstant';
import { getProfile } from '../../Api.tsx/ProfileConfigApis';
import { useAppDispatch, useAppSelector } from '../../Features/ReduxHooks';
import { addFirstRoom } from '../../Features/Room/RoomSlice';
import { addProfileData } from '../../Features/User/UserSlice';
import SideNavigation from '../../Components/Others/Navigation/SideNavigation/SideNavigation';
import UpperNavigation from '../../Components/Others/Navigation/UpperNavigation/UpperNavigation';
import CommonSkin from '../../Components/Others/UiSkin/CommonSkin/CommonSkin';
import LoadingFade from '../../Components/Others/LoadingAnimation/LoadingFade';
import Error from '../../Components/Others/ErrorPage/ErrorPage';
import AddDevice from '../../Components/CoreApplicationNew/DeviceRoom/AddDevice/AddDevice';
import './CoreApplication.css';

interface NavItem {
    id: number;
    to: string;
    icon: JSX.Element;
    currentPath: string;
    listPath: string;
    label: string;
}

interface NavOption {
    id: number;
    icon: JSX.Element | null;
    color?: string;
    fn?: () => void;
}

const CoreApplication = memo(() => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const darkTheme = useTheme();
    const toggleTheme = useThemeUpdate();
    const profileId = useAppSelector((state) => state.user?.profileId);
    const firstRoom = useAppSelector((state) => state.room?.firstRoom);

    const { pathname } = location;
    const currentPath = pathname.replace('%20', '');
    const roomType = useMemo(
        () => pathname.split('/')[3]?.replace('%20', ' '),
        [pathname],
    );

    // Theme and color management
    const color = useMemo(
        () => (darkTheme ? dark_colors : light_colors),
        [darkTheme],
    );

    // Backdrop management
    const {
        toggleBackDropOpen,
        toggleBackDropClose,
        setChildForCustomBackDrop,
        setSizeForCustomBackDrop,
    } = useBackDropOpen();

    // Profile data fetching
    const { isLoading, isError } = useReactQuery_Get(
        GET_PROFILE_QUERY_ID,
        () => getProfile(profileId, darkTheme),
        (data) => {
            if (data?.data) {
                dispatch(addProfileData(data.data));
                const firstRoomType = data.data.body?.room?.[0]?.room_type;
                if (firstRoomType) dispatch(addFirstRoom(firstRoomType));
            }
        },
        (error) => {
            displayToastify(
                error?.response?.data?.message || 'Failed to load profile',
                darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
                TOASTIFYSTATE.ERROR,
            );
        },
        true,
        true,
        false,
        false,
        false,
        20000,
        10000,
    );

    // Refresh functionality
    const handleRefresh = useCallback(() => {
        const queryArray: string[] = [];
        if (pathname.includes(RoutePath.CoreApplication_Dashboard)) {
            queryArray.push(
                SELECT_DEVICE_SERVICE_URL_LIST_QUERY_ID,
                GET_PROFILE_QUERY_ID,
                SELECT_WEATHER_QUOTE_QUERY_ID,
            );
        } else if (pathname.includes(RoutePath.CoreApplication_Room)) {
            queryArray.push(
                SELECT_DEVICE_SERVICE_URL_LIST_QUERY_ID,
                GET_PROFILE_QUERY_ID,
                SELECT_DEVICE_LIST_QUERY_ID,
            );
        }

        if (queryArray.length > 0) {
            invalidateQueries(queryClient, queryArray);
            displayToastify(
                `Refreshed ${queryArray.length} queries`,
                darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
                TOASTIFYSTATE.INFO,
            );
        }
    }, [pathname, queryClient, darkTheme]);

    // Navigation configuration
    const returnPageSpecificIcon = useCallback(
        (pathCheck: string) =>
            currentPath.includes(pathCheck) ? <PiDevicesDuotone /> : null,
        [currentPath],
    );

    const addDevice = useCallback(() => {
        toggleBackDropOpen();
        setChildForCustomBackDrop(
            <AddDevice
                darkTheme={darkTheme}
                roomType={roomType || ''}
                toggleBackDropClose={toggleBackDropClose}
            />,
        );
        setSizeForCustomBackDrop(LandscapeSizeM);
    }, [
        darkTheme,
        roomType,
        toggleBackDropClose,
        toggleBackDropOpen,
        setChildForCustomBackDrop,
        setSizeForCustomBackDrop,
    ]);

    const navUpperList = useMemo<NavItem[]>(
        () => [
            {
                id: 1,
                to: `${RoutePath.CoreApplication_Dashboard}${RoutePath.Device_Status}`,
                icon: <GrHomeRounded />,
                currentPath,
                listPath: RoutePath.CoreApplication_Dashboard,
                label: 'Home',
            },
            {
                id: 2,
                to: `${RoutePath.CoreApplication_Room}/${firstRoom || ''}`,
                icon: <GrAppsRounded />,
                currentPath: `/${pathname.split('/')[1]}/${
                    pathname.split('/')[2]
                }/`,
                listPath: `${RoutePath.CoreApplication_Room}/`,
                label: 'Room',
            },
            {
                id: 3,
                to: RoutePath.CoreApplication_Play,
                icon: <IoGameControllerOutline />,
                currentPath,
                listPath: RoutePath.CoreApplication_Play,
                label: 'Play',
            },
        ],
        [currentPath, firstRoom, pathname],
    );

    const navLowerList = useMemo<NavItem[]>(
        () => [
            {
                id: 1,
                to: `${RoutePath.CoreApplication_Docs}/${
                    RoutePath.GettingStartedDocs.split('/')[1]
                }`,
                icon: <VscDebugDisconnect />,
                currentPath,
                listPath: RoutePath.CoreApplication_Docs,
                label: 'Connect',
            },
            {
                id: 2,
                to: `${RoutePath.CoreApplication_Setting}/${RoutePath.Setting_Account}`,
                icon: <IoSettingsOutline />,
                currentPath,
                listPath: RoutePath.CoreApplication_Setting,
                label: 'Setting',
            },
        ],
        [currentPath],
    );

    const navUpperOptions = useMemo<NavOption[]>(
        () => [
            {
                id: 1,
                icon: returnPageSpecificIcon(RoutePath.CoreApplication_Room),
                color: color.button,
                fn: returnPageSpecificIcon(RoutePath.CoreApplication_Room)
                    ? addDevice
                    : undefined,
            },
            {
                id: 2,
                icon: <VscRefresh />,
                color: color.button,
                fn: handleRefresh,
            },
            {
                id: 3,
                icon: darkTheme ? <MdLightMode /> : <CiDark />,
                color: color.button,
                fn: toggleTheme,
            },
        ],
        [
            returnPageSpecificIcon,
            color.button,
            addDevice,
            handleRefresh,
            darkTheme,
            toggleTheme,
        ],
    );

    if (isLoading) {
        return (
            <div className="coreApplication_isLoading">
                <LoadingFade />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="coreApplication_error">
                <Error />
            </div>
        );
    }

    console.log("Loading core application");

    return (
        <div className="coreApplication">
            <CommonSkin
                side_nav_enable={true}
                side_nav={
                    <SideNavigation
                        upper_list={navUpperList}
                        lower_list={navLowerList}
                        profileLogOut={true}
                        logoutBtnOkLabel="Yes, Log me out"
                        profileBtnOkLabel="Yes"
                        profileBtnHeading="You want to switch profile, Are you sure?"
                        logoutBtnHeading="Oh no! You are leaving. Are you sure?"
                        toggleBackDropOpen={toggleBackDropOpen}
                        toggleBackDropClose={toggleBackDropClose}
                        setChildForCustomBackDrop={setChildForCustomBackDrop}
                        setSizeForCustomBackDrop={setSizeForCustomBackDrop}
                    />
                }
                upper_nav_enable={true}
                upper_nav={
                    <UpperNavigation upper_nav_option={navUpperOptions} />
                }
                content={<Outlet />}
            />
        </div>
    );
});

export default CoreApplication;
