import { useEffect, useState } from 'react';
import CommonSkin from '../../Components/Others/UiSkin/CommonNavSkin/CommonNavSkin';
import './ProfileConfig.css';
import { dark_colors, light_colors } from '../../Data/ColorConstant';
import { useTheme, useThemeUpdate } from '../ThemeProvider';
import { MdLightMode } from 'react-icons/md';
import { CiDark } from 'react-icons/ci';
import UpperNavigation from '../../Components/Others/Navigation/UpperNavigation/UpperNavigation';
import SideNavigation from '../../Components/Others/Navigation/SideNavigation/SideNavigation';
import { RoutePath } from '../../Data/Constants';
import { BiSolidSelectMultiple, BiAddToQueue } from 'react-icons/bi';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../Features/ReduxHooks';
import { resetProfile } from '../../Features/User/UserSlice';
import PageTransition from '../../Components/Others/PageTransition/PageTransition';

const ProfileConfig = () => {
    const [color, setColor] = useState<any>(light_colors);
    const toggleTheme: any = useThemeUpdate();
    const darkTheme: any = useTheme();
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetProfile());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const upper_nav_option = [
        {
            id: 1,
            icon: <></>,
            color: color?.button,
        },
        {
            id: 2,
            icon: <></>,
            color: color?.button,
        },
        {
            id: 3,
            icon: darkTheme ? <MdLightMode /> : <CiDark />,
            color: color?.button,
            fn: toggleTheme,
        },
    ];

    const side_upper_nav_option = [
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
    ];

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

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
