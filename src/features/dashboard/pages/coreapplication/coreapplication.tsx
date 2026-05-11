import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { BsHouseAddFill } from 'react-icons/bs';
import { CiDark } from 'react-icons/ci';
import { GrAppsRounded, GrHomeRounded } from 'react-icons/gr';
import { IoGameControllerOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdLightMode } from 'react-icons/md';
import { SiWechat } from 'react-icons/si';
import { VscDebugDisconnect } from 'react-icons/vsc';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useProfileData } from '../../../../core/api/Profileconfigapis';
import { useBackDropOpen, useTheme, useThemeUpdate } from '../../../../core/router/Themeprovider';
import { useAppSelector } from '../../../../core/store/Reduxhooks';
import { dark_colors, light_colors } from '../../../../data/ColorConstant';
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
} from '../../../../data/Constants';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { useUserActivity } from '../../../../hooks/useUserActivity';
import ErrorPage from '../../../../shared/commoncomponents/errorpage/Errorpage';
import LoadingFade from '../../../../shared/commoncomponents/loadinganimation/Loadingfade';
import SideNavigation from '../../../../shared/commoncomponents/navigation/sidenavigation/Sidenavigation';
import UpperNavigation from '../../../../shared/commoncomponents/navigation/uppernavigation/Uppernavigation';
import PersistentNotification from '../../../../shared/commoncomponents/notification/Persistentnotification';
import PageTransition from '../../../../shared/commoncomponents/pagetransition/Pagetransition';
import CommonSkin from '../../../../shared/commoncomponents/uiskin/commonnavskin/Commonnavskin';
import LockScreen from '../../components/coreappcomponents/lockscreen/Lockscreen';
// import PicFrame from '../../components/coreappcomponents/picframe/Picframe';
import AddDevice from '../../components/coreapplication/deviceroom/adddevice/Adddevice';
import './Coreapplication.css';
import StandbyClock from '../../components/coreappcomponents/standbyclock/StandbyClock';


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
    const darkTheme = useTheme();
    const toggleTheme = useThemeUpdate();
    const profileId = useAppSelector((state) => state.user?.profileId);
    const firstRoom = useAppSelector((state) => state.room?.firstRoom);
    const navigate = useNavigate();

    // Force redirect to selection screen if profile is missing and we are still in the core app area
    useEffect(() => {
        if (!profileId && location.pathname.startsWith(RoutePath.CoreApplication)) {
            navigate(RoutePath.SelectProfileConfig, { replace: true });
        }
    }, [profileId, navigate, location.pathname]);

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
            // <PicFrame />,
            <StandbyClock />,
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
        onActive: () => { }, // Do nothing on active (unlock is manual)
        onInactive: () => setIsLocked(true),

    });

    const handleUnlock = useCallback(() => {
        setIsLocked(false);
    }, []);

    const roomType = useMemo(
        () => pathname?.split('/')[3]?.replace('%20', ' '),
        [pathname],
    );

    const { isLoading, isError } = useProfileData(profileId, darkTheme);

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
                currentPath: `/${pathname.split('/')[1]}/${pathname.split('/')[2]
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
                to: `${RoutePath.CoreApplication_Docs}/${RoutePath.GettingStartedDocs.split('/')[1]
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
