import './SignUp.css';
import { useTheme, useThemeUpdate } from '../ThemeProvider';
import { useEffect, useState } from 'react';
import { dark_colors, light_colors } from '../../Data/ColorConstant';
import { MdLightMode } from 'react-icons/md';
import { CiDark } from 'react-icons/ci';
import { LoginUser } from '../../Services/LogInUser';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../Services/RegisterUser';
import { authUrl } from '../../Api.tsx/SignUpApis';
import CommonSkin from '../../Components/Others/UiSkin/CommonSkin/CommonSkin';
import UpperNavigation from '../../Components/Others/Navigation/UpperNavigation/UpperNavigation';
import Content from './Content/Content';
import { useAppDispatch } from '../../Features/ReduxHooks';

const SignUp = () => {
    const [showSignIn, setshowSignIn] = useState(true);
    const darkTheme: any = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const formList: Record<string, any> = [
        {
            id: 1,
            formFormat: 'Input',
            type: 'email',
            placeholder: 'Email*',
            keyName: 'email',
            minLength: 3,
            maxLength: 36,
        },
        {
            id: 2,
            formFormat: 'Input',
            type: 'password',
            placeholder: 'Password*',
            keyName: 'password',
            minLength: 3,
            maxLength: 36,
        },
    ];

    const handleTypeChange = () => {
        setshowSignIn((prev) => !prev);
    };

    const handleInputData = (data: any) => {
        if (showSignIn) {
            LoginUser(data, darkTheme, dispatch, navigate);
        } else {
            Object.assign(data, { role: 'ADMIN' });
            RegisterUser(authUrl.app_registration, data, darkTheme);
        }
    };

    const [color, setColor] = useState<any>(light_colors);
    const toggleTheme: any = useThemeUpdate();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

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

    return (
        <div className="signUp" style={{ backgroundColor: color?.inner }}>
            <CommonSkin
                side_nav_enable={false}
                upper_nav_enable={true}
                upper_nav={
                    <UpperNavigation
                        upper_nav_option={nav_upper_list_option}
                        IsSearchEnable={false}
                    />
                }
                content={
                    <Content
                        formList={formList}
                        handleInputData={handleInputData}
                        handleTypeChange={handleTypeChange}
                        showSignIn={showSignIn}
                    />
                }
            />
        </div>
    );
};

export default SignUp;
