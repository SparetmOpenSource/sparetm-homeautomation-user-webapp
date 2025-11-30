import { useEffect, useState } from 'react';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import './CommonNavSkin.css';
import { useTheme } from '../../../../Pages/ThemeProvider';

const CommonNavSkin = ({
    upper_nav_enable,
    upper_nav,
    side_nav_enable,
    side_nav,
    content,
}: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            className="common-nav-skin"
            style={{ backgroundColor: color?.outer }}
        >
            {upper_nav_enable && (
                <section className="common-nav-skin-upper-nav">
                    {upper_nav}
                </section>
            )}
            <section className="common-nav-skin-content">
                {side_nav_enable && (
                    <section className="common-nav-skin-content-side-nav">
                        {side_nav}
                    </section>
                )}
                <section
                    className="common-nav-skin-content-data"
                    style={{
                        backgroundColor: color?.inner,
                        borderTopLeftRadius: side_nav_enable ? '0.5rem' : '',
                        borderBottomLeftRadius: side_nav_enable ? '' : '0.5rem',
                    }}
                >
                    {content}
                </section>
            </section>
        </div>
    );
};
export default CommonNavSkin;
