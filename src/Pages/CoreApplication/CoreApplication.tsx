import { useCallback, useMemo, memo, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { MdLightMode } from 'react-icons/md';
import { CiDark } from 'react-icons/ci';
import { GrHomeRounded, GrAppsRounded } from 'react-icons/gr';
import { IoGameControllerOutline, IoSettingsOutline } from 'react-icons/io5';
import { VscDebugDisconnect } from 'react-icons/vsc';
import {
    CORE_APP_ADD_DEVICE,
    ERROR_MSG,
    FullScreenSize,
    GLOBAL_SCREEN_SAVER,
    LandscapeSizeM,

    RoutePath,
    SCREENSAVER_ENABLED_KEY,
    SCREENSAVER_TIMEOUT_KEY,
    SECURITY_LOCK_ENABLED_KEY,
    SECURITY_LOCK_TIMEOUT_KEY,
} from '../../Data/Constants';
import { dark_colors, light_colors } from '../../Data/ColorConstant';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../Data/Enum';
import { useBackDropOpen, useTheme, useThemeUpdate } from '../ThemeProvider';
import { displayToastify } from '../../Utils/HelperFn';
import { useReactQuery_Get } from '../../Api.tsx/useReactQuery_Get';
import { getProfile } from '../../Api.tsx/ProfileConfigApis';
import { useAppDispatch, useAppSelector } from '../../Features/ReduxHooks';
import { addFirstRoom } from '../../Features/Room/RoomSlice';
import { addProfileData } from '../../Features/User/UserSlice';
import SideNavigation from '../../Components/Others/Navigation/SideNavigation/SideNavigation';
import UpperNavigation from '../../Components/Others/Navigation/UpperNavigation/UpperNavigation';
import CommonSkin from '../../Components/Others/UiSkin/CommonNavSkin/CommonNavSkin';
import LoadingFade from '../../Components/Others/LoadingAnimation/LoadingFade';
import AddDevice from '../../Components/CoreApplication/DeviceRoom/AddDevice/AddDevice';
import './CoreApplication.css';
import { GET_PROFILE_QUERY_ID } from '../../Data/QueryConstant';
import ErrorPage from '../../Components/Others/ErrorPage/ErrorPage';
import { BsHouseAddFill } from 'react-icons/bs';
import { SiWechat } from 'react-icons/si';
import { useUserActivity } from '../../Hooks/useUserActivity';
import PicFrame from '../../Components/Others/PicFrame/PicFrame';
import PersistentNotification from '../../Components/Others/Notification/PersistentNotification';
import PageTransition from '../../Components/Others/PageTransition/PageTransition';
import useLocalStorage from '../../Hooks/UseLocalStorage';
import LockScreen from '../../Components/Others/LockScreen/LockScreen';


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
    const darkTheme = useTheme();
    const toggleTheme = useThemeUpdate();
    const profileId = useAppSelector((state) => state.user?.profileId);
    const firstRoom = useAppSelector((state) => state.room?.firstRoom);

    const { pathname } = location;
    const currentPath = pathname.replace('%20', '');
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();
    const color = useMemo(
        () => (darkTheme ? dark_colors : light_colors),
        [darkTheme],
    );

    const addScreenSaver = useCallback(() => {
        toggleBackDropOpen(
            GLOBAL_SCREEN_SAVER,
            <PicFrame />,
            FullScreenSize,
            false
        );
    }, [toggleBackDropOpen]);

    const closeScreenSaver = useCallback(() => {
        toggleBackDropClose(GLOBAL_SCREEN_SAVER);
    }, [toggleBackDropClose]);

    // User activity detection for Screensaver
    const [screensaverEnabled] = useLocalStorage(SCREENSAVER_ENABLED_KEY, false);
    const [screensaverTimeout] = useLocalStorage(SCREENSAVER_TIMEOUT_KEY, 60000);

    useUserActivity({
        timeout: screensaverTimeout,
        enabled: screensaverEnabled,
        onActive: closeScreenSaver,
        onInactive: addScreenSaver,
    });

    // User activity detection for Security Lock
    const [securityLockEnabled] = useLocalStorage(SECURITY_LOCK_ENABLED_KEY, false);
    const [securityLockTimeout] = useLocalStorage(SECURITY_LOCK_TIMEOUT_KEY, 300000);
    const [isLocked, setIsLocked] = useState(false);

    useUserActivity({
        timeout: securityLockTimeout,
        enabled: securityLockEnabled && !isLocked, // Don't trigger if already locked
        onActive: () => {}, // Do nothing on active (unlock is manual)
        onInactive: () => setIsLocked(true),

    });

    const handleUnlock = useCallback(() => {
        setIsLocked(false);
    }, []);

    const roomType = useMemo(
        () => pathname?.split('/')[3]?.replace('%20', ' '),
        [pathname],
    );

    const { isLoading, isError } = useReactQuery_Get(
        GET_PROFILE_QUERY_ID,
        () => getProfile(profileId, darkTheme),
        (data) => {
            if (data?.data) {
                dispatch(addProfileData(data?.data));
                const firstRoomType =
                    data?.data?.body?.room?.[0]?.room_type?.toLowerCase();
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
        !!profileId,
        true,
        false,
        false,
        false,
        20000,
        10000,
    );

    const returnPageSpecificIcon = useCallback(
        (pathCheck: string) =>
            currentPath?.includes(pathCheck) ? <BsHouseAddFill /> : null,
        [currentPath],
    );

    const addDevice = useCallback(() => {
        const backdropId = CORE_APP_ADD_DEVICE;
        toggleBackDropOpen(
            backdropId,
            <AddDevice
                darkTheme={darkTheme}
                roomType={roomType || ''}
                toggleBackDropClose={() => toggleBackDropClose(backdropId)}
            />,
            LandscapeSizeM,
        );
    }, [darkTheme, roomType, toggleBackDropClose, toggleBackDropOpen]);

    const side_upper_nav_option = useMemo<NavItem[]>(
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
                to: RoutePath.CoreApplication_Chat,
                icon: <SiWechat />,
                currentPath,
                listPath: RoutePath.CoreApplication_Chat,
                label: 'Chat',
            },
            {
                id: 4,
                to: RoutePath.CoreApplication_Play,
                icon: <IoGameControllerOutline />,
                currentPath,
                listPath: RoutePath.CoreApplication_Play,
                label: 'Play',
            },
        ],
        [currentPath, firstRoom, pathname],
    );

    const side_lower_nav_option = useMemo<NavItem[]>(
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

    const upper_nav_option = useMemo<NavOption[]>(
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
                icon: darkTheme ? <MdLightMode /> : <CiDark />,
                color: color.button,
                fn: toggleTheme,
            },
        ],
        [
            returnPageSpecificIcon,
            color.button,
            addDevice,
            darkTheme,
            toggleTheme,
        ],
    );

    if (isLoading) {
        return (
            <div className="coreApplication-isLoading">
                <LoadingFade />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="coreApplication-error">
                <ErrorPage errMsg={ERROR_MSG} darkTheme={darkTheme} />
            </div>
        );
    }

    return (
        <PageTransition>
            <div className="coreApplication">
                {isLocked && <LockScreen onUnlock={handleUnlock} />}
                <PersistentNotification />
                <CommonSkin
                    upper_nav_enable={true}
                    upper_nav={<UpperNavigation nav_option={upper_nav_option} />}
                    side_nav_enable={true}
                    side_nav={
                        <SideNavigation
                            upper_nav_option={side_upper_nav_option}
                            lower_nav_option={side_lower_nav_option}
                            profile_logout_enable={true}
                        />
                    }
                    content={<Outlet />}
                />
            </div>
        </PageTransition>
    );
});

export default CoreApplication;
