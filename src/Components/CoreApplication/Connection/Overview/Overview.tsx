import { useEffect, useState } from 'react';
import { page_4_socialContact_list } from '../../../../Data/HomePageConstant';
import './Overview.css';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { useTheme } from '../../../../Pages/ThemeProvider';

const Overview = () => {
    const [color, setColor] = useState(light_colors);
    const darkTheme = useTheme();

    const Learn_List = [
        {
            id: 1,
            label: 'How to download and setup Arduino IDE for Node MCU(esp8266, esp32)',
        },
        {
            id: 2,
            label: 'How to do basic setup in your esp8266/esp32 devices',
        },
        {
            id: 3,
            label: 'How to write code in esp8266/esp32 for your specific devices',
        },
        {
            id: 4,
            label: 'Some code examples to automate your Home',
        },
        {
            id: 5,
            label: 'Hardware connection system diagram',
        },
    ];

    useEffect(() => {
        setColor(darkTheme ? dark_colors : light_colors);
    }, [darkTheme]);

    return (
        <div className="overview">
            <h1 style={{ color: color?.text }}>Quick Start</h1>
            <p style={{ color: color?.text }}>
                Welcome to the Open Bridge documentation! This page will give
                you an introduction to setup your Home.
            </p>
            <section
                className="overview-info"
                style={{
                    backgroundColor: color?.outer,
                    border: `2px solid ${color?.element}`,
                }}
            >
                <h2 style={{ color: color?.text }}>You will learn</h2>
                <ul>
                    {Learn_List.map((item: any) => (
                        <li key={item.id} style={{ color: color?.icon }}>
                            {item.label}
                        </li>
                    ))}
                </ul>
            </section>
            <p style={{ color: color?.text }}>
                Please do not hesitate to let us know if we can be of any
                further assistance. Please click{' '}
                <span>
                    <a
                        href={page_4_socialContact_list[2].href}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: color?.button }}
                    >
                        here
                    </a>
                </span>{' '}
                to connect.
            </p>
        </div>
    );
};

export default Overview;
