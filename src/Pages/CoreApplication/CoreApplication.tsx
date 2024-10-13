import './CoreApplication.css';
import {
    LandscapeSizeM,
    RoutePath,
    socketUrlPostFix,
} from '../../Data/Constants';
import { GrHomeRounded } from 'react-icons/gr';
import { GrAppsRounded } from 'react-icons/gr';
import { IoGameControllerOutline } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import { VscDebugDisconnect } from 'react-icons/vsc';
import SideNavigation from '../../Components/Others/Navigation/SideNavigation/SideNavigation';
import CommonSkin from '../../Components/Others/UiSkin/CommonSkin/CommonSkin';
import UpperNavigation from '../../Components/Others/Navigation/UpperNavigation/UpperNavigation';
import { MdLightMode } from 'react-icons/md';
import { VscRefresh } from 'react-icons/vsc';
import { dark_colors, light_colors } from '../../Data/ColorConstant';
import { useEffect, useState } from 'react';
import { CiDark } from 'react-icons/ci';
import { useBackDropOpen, useTheme, useThemeUpdate } from '../ThemeProvider';
import { Outlet, useLocation } from 'react-router-dom';
import { displayToastify, invalidateQueries } from '../../Utils/HelperFn';
import { useReactQuery_Get } from '../../Api.tsx/useReactQuery_Get';
import { MdOutlineAddHomeWork } from 'react-icons/md';
import {
    GET_PROFILE_QUERY_ID,
    SELECT_DEVICE_LIST_QUERY_ID,
    SELECT_DEVICE_SERVICE_URL_LIST_QUERY_ID,
    SELECT_WEATHER_QUOTE_QUERY_ID,
} from '../../Data/QueryConstant';
import { getProfile } from '../../Api.tsx/ProfileConfigApis';
import { useAppDispatch, useAppSelector } from '../../Features/ReduxHooks';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../Data/Enum';
import LoadingFade from '../../Components/Others/LoadingAnimation/LoadingFade';
import Error from './../../Components/Others/ErrorPage/ErrorPage';
import { addFirstRoom } from '../../Features/Room/RoomSlice';
import useWebsocketReceiver from '../../Api.tsx/Socket/UseWebsocketReceiver';
import { useQueryClient } from 'react-query';
import { addProfileData } from '../../Features/User/UserSlice';
import Information from '../../Components/Others/BackDrop/Information/Information';
import AddDevice from '../../Components/CoreApplicationNew/DeviceRoom/AddDevice/AddDevice';

const CoreApplication = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const [color, setColor] = useState<any>(light_colors);
    const toggleTheme: any = useThemeUpdate();
    const darkTheme: any = useTheme();
    const currentPath = location.pathname.replace('%20', '');
    const profileId = useAppSelector((state: any) => state?.user?.profileId);
    const firstRoom = useAppSelector((state: any) => state?.room?.firstRoom);
    const mqttInstanceUrl = useAppSelector(
        (state: any) => state?.device?.mqttInstanceUrl,
    );
    const mqttNotification = useAppSelector(
        (state: any) => state?.device?.mqttNotification,
    );
    const handleRefresh = () => {
        let queryArray: any = [];
        if (location.pathname.includes(RoutePath.CoreApplication_Dashboard)) {
            queryArray.push(SELECT_DEVICE_SERVICE_URL_LIST_QUERY_ID);
            queryArray.push(GET_PROFILE_QUERY_ID);
            queryArray.push(SELECT_WEATHER_QUOTE_QUERY_ID);
        } else if (location.pathname.includes(RoutePath.CoreApplication_Room)) {
            queryArray.push(SELECT_DEVICE_SERVICE_URL_LIST_QUERY_ID);
            queryArray.push(GET_PROFILE_QUERY_ID);
            queryArray.push(SELECT_DEVICE_LIST_QUERY_ID);
        }
        invalidateQueries(queryClient, queryArray);
        displayToastify(
            `Refreshed ${queryArray.length} queries`,
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.INFO,
        );
    };

    const returnPageSpecificIcon = (currentPath: string, pathCheck: any) => {
        switch (true) {
            case currentPath.includes(pathCheck):
                return <MdOutlineAddHomeWork />;
            default:
                return <></>;
        }
    };

    const addDevice = () => {
        toggleBackDropOpen();
        setChildForCustomBackDrop(<AddDevice darkTheme={darkTheme} />);
        setSizeForCustomBackDrop(LandscapeSizeM);
    };

    const nav_upper_list = [
        {
            id: 1,
            to: RoutePath.CoreApplication_Dashboard + RoutePath.Device_Status,
            icon: <GrHomeRounded />,
            currentPath: currentPath,
            listPath: RoutePath.CoreApplication_Dashboard,
            label: 'Home',
        },
        {
            id: 2,
            to: `${RoutePath.CoreApplication_Room}/${firstRoom}`,
            icon: <GrAppsRounded />,
            currentPath: `/${location.pathname.split('/')[1]}/${
                location.pathname.split('/')[2]
            }/`,
            listPath: RoutePath.CoreApplication_Room + '/',
            label: 'Room',
        },
        {
            id: 3,
            to: RoutePath.CoreApplication_Play,
            icon: <IoGameControllerOutline />,
            currentPath: currentPath,
            listPath: RoutePath.CoreApplication_Play,
            label: 'Play',
        },
    ];
    const nav_lower_list = [
        {
            id: 1,
            to: `${RoutePath.CoreApplication_Docs}/${
                RoutePath.GettingStartedDocs.split('/')[1]
            }`,
            icon: <VscDebugDisconnect />,
            currentPath: currentPath,
            listPath: RoutePath.CoreApplication_Docs,
            label: 'Connect',
        },
        {
            id: 2,
            to: `${RoutePath.CoreApplication_Setting}/${RoutePath.Setting_Account}`,
            icon: <IoSettingsOutline />,
            currentPath: currentPath,
            listPath: RoutePath.CoreApplication_Setting,
            label: 'Setting',
        },
    ];
    //  `${featureUrl.add_device}${admin}&profilename=${profileName}`,
    const nav_upper_list_option = [
        {
            id: 1,
            icon: returnPageSpecificIcon(
                currentPath,
                RoutePath.CoreApplication_Room,
            ),
            color: color?.button,
            fn: returnPageSpecificIcon(
                currentPath,
                RoutePath.CoreApplication_Room,
            )
                ? addDevice
                : undefined,
        },
        {
            id: 2,
            icon: <VscRefresh />,
            color: color?.button,
            fn: handleRefresh,
        },
        {
            id: 3,
            icon: darkTheme ? <MdLightMode /> : <CiDark />,
            color: color?.button,
            fn: toggleTheme,
        },
    ];

    const handleAlertNotification = () => {
        toggleBackDropOpen();
        setChildForCustomBackDrop(
            <Information
                text={mqttNotification?.msg}
                darkTheme={darkTheme}
                type={mqttNotification?.headers?.id}
            />,
        );
        setSizeForCustomBackDrop(LandscapeSizeM);
    };

    const {
        toggleBackDropOpen,
        toggleBackDropClose,
        setChildForCustomBackDrop,
        setSizeForCustomBackDrop,
    } = useBackDropOpen();

    const profileFn = () => {
        return getProfile(profileId, darkTheme);
    };
    const on_Success = (data: any) => {
        dispatch(addProfileData(data?.data));
        dispatch(addFirstRoom(data?.data?.body?.room[0]?.room_type));
    };

    const on_Error = (error: any) => {
        displayToastify(
            error?.response?.data?.message,
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    };

    const { isLoading, isError } = useReactQuery_Get(
        GET_PROFILE_QUERY_ID,
        profileFn,
        on_Success,
        on_Error,
        true, // !fetch_On_Click_Status
        true, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        20000, // Cache time
        10000, // Stale Time
    );

    // Apply load balancer to select Urls
    useWebsocketReceiver(`${mqttInstanceUrl[0]}${socketUrlPostFix}`);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (
            Object.keys(mqttNotification).length !== 0 &&
            mqttNotification?.headers?.status === 'OFF'
        ) {
            handleAlertNotification();
        }
    }, [mqttNotification]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="coreApplication">
            {isLoading && (
                <div className="coreApplication_isLoading">
                    <LoadingFade />
                </div>
            )}
            {!isLoading && isError && (
                <div className="coreApplication_error">
                    <Error />
                </div>
            )}
            {!isLoading && (
                <CommonSkin
                    side_nav_enable={true}
                    side_nav={
                        <SideNavigation
                            upper_list={nav_upper_list}
                            lower_list={nav_lower_list}
                            profileLogOut={true}
                            logoutBtnOkLabel="Yes, Log me out"
                            profileBtnOkLabel="Yes"
                            profileBtnHeading="You want to switch profile, Are you sure?"
                            logoutBtnHeading="Oh no! You are leaving. Are you sure?"
                            toggleBackDropOpen={toggleBackDropOpen}
                            toggleBackDropClose={toggleBackDropClose}
                            setChildForCustomBackDrop={
                                setChildForCustomBackDrop
                            }
                            setSizeForCustomBackDrop={setSizeForCustomBackDrop}
                        />
                    }
                    upper_nav_enable={true}
                    upper_nav={
                        <UpperNavigation
                            upper_nav_option={nav_upper_list_option}
                        />
                    }
                    content={<Outlet />}
                />
            )}
        </div>
    );
};
export default CoreApplication;
