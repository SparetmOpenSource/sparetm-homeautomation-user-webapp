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
import { BiSolidSelectMultiple } from 'react-icons/bi';
import { Outlet, useLocation } from 'react-router-dom';
import { BiAddToQueue } from 'react-icons/bi';
import { getCountryStateCityToken } from '../../Api.tsx/ProfileConfigApis';
import { SELECT_COUNTRY_STATE_CITY_TOKEN_QUERY_ID } from '../../Data/QueryConstant';
import { displayToastify } from '../../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../Data/Enum';
import { useReactQuery_Get } from '../../Api.tsx/useReactQuery_Get';
import LoadingFade from '../../Components/Others/LoadingAnimation/LoadingFade';
import ErrorPage from '../../Components/Others/ErrorPage/ErrorPage';

const ProfileConfig = () => {
    const [color, setColor] = useState<any>(light_colors);
    const toggleTheme: any = useThemeUpdate();
    const darkTheme: any = useTheme();
    const location = useLocation();

    const tokenFn = () => {
        return getCountryStateCityToken(darkTheme);
    };

    const on_Success = () => {};
    const on_Error = (error: any) => {
        displayToastify(
            error?.message,
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    };

    const {
        isLoading,
        isError,
        data: token,
    } = useReactQuery_Get(
        SELECT_COUNTRY_STATE_CITY_TOKEN_QUERY_ID,
        tokenFn,
        on_Success,
        on_Error,
        true, // !fetch_On_Click_Status
        true, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        300000, // Cache time
        0, // Stale Time
    );

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

    const {
        toggleBackDropOpen,
        toggleBackDropClose,
        setChildForCustomBackDrop,
        setSizeForCustomBackDrop,
    } = useBackDropOpen();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="profileConfig">
            {isLoading && (
                <div className="profileConfig_isLoading">
                    <LoadingFade />
                </div>
            )}
            {!isLoading && isError && (
                <div className="select_profile_error">
                    <ErrorPage />
                </div>
            )}
            {!isLoading && (
                <CommonSkin
                    side_nav_enable={true}
                    side_nav={
                        <SideNavigation
                            upper_list={nav_upper_list}
                            logoutBtnOkLabel="Yes, Log me out"
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
                    content={<Outlet context={token?.data?.auth_token} />}
                />
            )}
        </div>
    );
};
export default ProfileConfig;
