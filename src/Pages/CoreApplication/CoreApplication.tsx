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

    const color = useMemo(
        () => (darkTheme ? dark_colors : light_colors),
        [darkTheme],
    );

    const {
        toggleBackDropOpen,
        toggleBackDropClose,
        setChildForCustomBackDrop,
        setSizeForCustomBackDrop,
    } = useBackDropOpen();

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
