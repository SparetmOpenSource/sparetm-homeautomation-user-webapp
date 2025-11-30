import { useEffect, useState } from 'react';
import './Information.css';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { FiAlertTriangle } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { IconContext } from 'react-icons';

const Information = ({ text, darkTheme, type }: any) => {
    const [color, setColor] = useState<any>(light_colors);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div
            className="mqtt-information"
            style={{ backgroundColor: color?.element, color: color?.text }}
        >
            <section style={{ backgroundColor: color?.inner }}>
                <IconContext.Provider
                    value={{ size: '12em', color: color?.button }}
                >
                    <span>
                        {type === 'ALERT' ? (
                            <FiAlertTriangle />
                        ) : (
                            <IoMdNotificationsOutline />
                        )}
                    </span>
                </IconContext.Provider>
            </section>
            <section style={{ backgroundColor: color?.outer }}>
                <h1 style={{ color: color?.text }}>
                    {type === 'ALERT' ? 'Alert' : 'Notification'}
                </h1>
                <p style={{ color: color?.border }}>{text}</p>
            </section>
        </div>
    );
};

export default Information;
