import { useEffect, useState } from 'react';
import { CiDark } from 'react-icons/ci';
import { MdLightMode } from 'react-icons/md';
import { useTheme, useThemeUpdate } from '../../../../core/router/Themeprovider';
import { dark_colors, light_colors } from '../../../../data/ColorConstant';
import UpperNavigation from '../../../../shared/commoncomponents/navigation/uppernavigation/Uppernavigation';
import PageTransition from '../../../../shared/commoncomponents/pagetransition/Pagetransition';
import CommonNavSkin from '../../../../shared/commoncomponents/uiskin/commonnavskin/Commonnavskin';
import Content from './content/Content';
import './Signup.css';

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
        <PageTransition>
            <div className="signUp">
                <CommonNavSkin
                    side_nav_enable={false}
                    upper_nav_enable={true}
                    upper_nav={<UpperNavigation nav_option={nav_options} />}
                    content={<Content />}
                />
            </div>
        </PageTransition>
    );
};

export default SignUp;
