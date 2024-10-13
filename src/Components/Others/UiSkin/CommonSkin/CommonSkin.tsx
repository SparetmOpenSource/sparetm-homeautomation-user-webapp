import { useEffect, useState } from 'react';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import './CommonSkin.css';
import { useTheme } from '../../../../Pages/ThemeProvider';

const CommonSkin = ({
    upper_nav,
    upper_nav_enable,
    side_nav,
    side_nav_enable,
    content,
}: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="common_skin" style={{ backgroundColor: color?.outer }}>
            {upper_nav_enable && (
                <section className="common_skin_upper_nav">{upper_nav}</section>
            )}
            <section className="common_skin_content">
                {side_nav_enable && (
                    <section className="common_skin_content_side_nav">
                        {side_nav}
                    </section>
                )}
                <section
                    className="common_skin_content_data"
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
export default CommonSkin;
