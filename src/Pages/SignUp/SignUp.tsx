import './SignUp.css';
import { useTheme, useThemeUpdate } from '../ThemeProvider';
import { useEffect, useState } from 'react';
import { dark_colors, light_colors } from '../../Data/ColorConstant';
import { MdLightMode } from 'react-icons/md';
import { CiDark } from 'react-icons/ci';
import CommonNavSkin from '../../Components/Others/UiSkin/CommonNavSkin/CommonNavSkin';
import UpperNavigation from '../../Components/Others/Navigation/UpperNavigation/UpperNavigation';
import Content from './Content/Content';

const SignUp = () => {
    const darkTheme: any = useTheme();
    const [color, setColor] = useState<any>(light_colors);
    const toggleTheme: any = useThemeUpdate();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    const nav_options = [
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
        <div className="signUp">
            <CommonNavSkin
                side_nav_enable={false}
                upper_nav_enable={true}
                upper_nav={<UpperNavigation nav_option={nav_options} />}
                content={<Content />}
            />
        </div>
    );
};

export default SignUp;
