import { useEffect, useState } from 'react';
import CommonSkin from '../../Components/Others/UiSkin/CommonSkin/CommonSkin';
import './ProfileConfig.css';
import { dark_colors, light_colors } from '../../Data/ColorConstant';
import { useBackDropOpen, useTheme, useThemeUpdate } from '../ThemeProvider';
import { MdLightMode } from 'react-icons/md';
import { CiDark } from 'react-icons/ci';
import UpperNavigation from '../../Components/Others/Navigation/UpperNavigation/UpperNavigation';
import SideNavigation from '../../Components/Others/Navigation/SideNavigation/SideNavigation';
import { RoutePath } from '../../Data/Constants';
import { BiSolidSelectMultiple, BiAddToQueue } from 'react-icons/bi';
import { Outlet, useLocation } from 'react-router-dom';

const ProfileConfig = () => {
    const [color, setColor] = useState<any>(light_colors);
    const toggleTheme: any = useThemeUpdate();
    const darkTheme: any = useTheme();
    const location = useLocation();

    const nav_upper_list_option = [
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

    const nav_upper_list = [
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

    // const {
    //     toggleBackDropOpen,
    //     toggleBackDropClose,
    //     setChildForCustomBackDrop,
    //     setSizeForCustomBackDrop,
    // } = useBackDropOpen();

    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="profileConfig">
            <CommonSkin
                side_nav_enable={true}
                side_nav={
                    <SideNavigation
                        upper_list={nav_upper_list}
                        logoutBtnOkLabel="Yes, Log me out"
                        logoutBtnHeading="Oh no! You are leaving. Are you sure?"
                        toggleBackDropOpen={toggleBackDropOpen}
                        toggleBackDropClose={toggleBackDropClose}
                        // setChildForCustomBackDrop={setChildForCustomBackDrop}
                        // setSizeForCustomBackDrop={setSizeForCustomBackDrop}
                    />
                }
                upper_nav_enable={true}
                upper_nav={
                    <UpperNavigation
                        upper_nav_option={nav_upper_list_option}
                        IsSearchEnable={
                            nav_upper_list[1].currentPath ===
                                nav_upper_list[1].listPath ||
                            nav_upper_list[1].currentPath?.includes(
                                nav_upper_list[1].listPath,
                            )
                                ? true
                                : false
                        }
                    />
                }
                content={<Outlet />}
            />
        </div>
    );
};
export default ProfileConfig;
