import { useEffect, useMemo } from 'react';
import { BiAddToQueue, BiSolidSelectMultiple } from 'react-icons/bi';
import { CiDark } from 'react-icons/ci';
import { MdLightMode } from 'react-icons/md';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme, useThemeUpdate } from '../../../../core/router/themeprovider';
import { useAppSelector } from '../../../../core/store/reduxhooks';
import { dark_colors, light_colors } from '../../../../data/colorconstant';
import { RoutePath } from '../../../../data/constants';
import SideNavigation from '../../../../shared/commoncomponents/navigation/sidenavigation/sidenavigation';
import UpperNavigation from '../../../../shared/commoncomponents/navigation/uppernavigation/uppernavigation';
import PageTransition from '../../../../shared/commoncomponents/pagetransition/pagetransition';
import CommonSkin from '../../../../shared/commoncomponents/uiskin/commonnavskin/commonnavskin';
import './profileconfig.css';

const ProfileConfig = () => {
    const darkTheme = useTheme();
    const toggleTheme = useThemeUpdate();
    const location = useLocation();
    const navigate = useNavigate();
    const profileId = useAppSelector((state) => state.user?.profileId);

    const color = useMemo(() => (darkTheme ? dark_colors : light_colors), [darkTheme]);

    // Redirect to dashboard if profile already exists (handles back-button issue)
    useEffect(() => {
        if (profileId && location.pathname.startsWith(RoutePath.ProfileConfig)) {
            navigate(
                `${RoutePath.CoreApplication}/${RoutePath.Dashboard}/${RoutePath.Dashboard_Device_Status}`,
                { replace: true }
            );
        }
    }, [profileId, navigate, location.pathname]);

    const upper_nav_option = useMemo(() => [
        {
            id: 1,
            icon: <></>,
            color: color.button,
        },
        {
            id: 2,
            icon: <></>,
            color: color.button,
        },
        {
            id: 3,
            icon: darkTheme ? <MdLightMode /> : <CiDark />,
            color: color.button,
            fn: toggleTheme,
        },
    ], [color.button, darkTheme, toggleTheme]);

    const side_upper_nav_option = useMemo(() => [
        {
            id: 1,
            to: RoutePath.AddProfileConfig,
            icon: <BiAddToQueue />,
            label: 'Add',
            listPath: '/profileconfig/add',
            currentPath: location.pathname.replace('%20', ''),
        },
        {
            id: 2,
            to: RoutePath.SelectProfileConfig,
            icon: <BiSolidSelectMultiple />,
            label: 'Select',
            listPath: '/profileconfig/select',
            currentPath: location.pathname.replace('%20', ''),
        },
    ], [location.pathname]);

    return (
        <PageTransition>
            <div className="profileConfig">
                <CommonSkin
                    upper_nav_enable={true}
                    upper_nav={<UpperNavigation nav_option={upper_nav_option} />}
                    side_nav_enable={true}
                    side_nav={
                        <SideNavigation
                            upper_nav_option={side_upper_nav_option}
                            profile_logout_enable={false}
                        />
                    }
                    content={<Outlet />}
                />
            </div>
        </PageTransition>
    );
};

export default ProfileConfig;
