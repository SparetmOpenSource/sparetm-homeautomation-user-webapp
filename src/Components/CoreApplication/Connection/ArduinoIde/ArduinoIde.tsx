import { useEffect, useState } from 'react';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import './ArduinoIde.css';
import { useTheme } from '../../../../Pages/ThemeProvider';

const ArduinoIde = () => {
    const [color, setColor] = useState(light_colors);
    const darkTheme = useTheme();

    const Learn_List = [
        {
            id: 1,
            heading: 'Install Arduino IDE',
            label: [
                {
                    id: 1,
                    statement: `Download Arduino IDE from the official site: https://www.arduino.cc/en/software`,
                },
                {
                    id: 2,
                    statement:
                        'Install it on your computer (Windows/Mac/Linux)',
                },
                {
                    id: 3,
                    statement: 'Open Arduino IDE after installation',
                },
            ],
        },
        {
            id: 2,
            heading: 'Install ESP32 / ESP8266 Board Support',
            label: [
                {
                    id: 1,
                    statement: 'In Arduino IDE, go to File > Preferences',
                },
                {
                    id: 2,
                    statement:
                        'In the Additional Board Manager URLs field, paste below urls',
                },
                {
                    id: 3,
                    statement:
                        'Url for ESP32: https://dl.espressif.com/dl/package_esp32_index.json',
                },
                {
                    id: 4,
                    statement:
                        'Url for ESP8266: http://arduino.esp8266.com/stable/package_esp8266com_index.json',
                },
                {
                    id: 5,
                    statement:
                        'You can add anyone or both URLs separated by a comma depending upon the type of board you are using',
                },
                {
                    id: 6,
                    statement: 'Click OK',
                },
            ],
        },
        {
            id: 3,
            heading: 'Install the Boards',
            label: [
                {
                    id: 1,
                    statement: 'Go to Tools > Board > Board Manager',
                },
                {
                    id: 2,
                    statement: 'Search for ESP32 or ESP8266',
                },
                {
                    id: 3,
                    statement: 'Click Install for the board you want to use',
                },
            ],
        },
        {
            id: 4,
            heading: 'Connect Your Device',
            label: [
                {
                    id: 1,
                    statement:
                        'Connect ESP32 / ESP8266 to your computer via USB cable',
                },
                {
                    id: 2,
                    statement:
                        'In Arduino IDE, go to Tools. Change Board and Port',
                },
                {
                    id: 3,
                    statement:
                        'For Board: Select your board (ESP32 Dev Module or NodeMCU 1.0 (ESP8266))',
                },
                {
                    id: 4,
                    statement: 'For Port: Select the correct COM port',
                },
            ],
        },
        {
            id: 5,
            heading: 'Upload a Test Program',
            label: [
                {
                    id: 1,
                    statement: 'Open File > Examples > Basics > Blink',
                },
                {
                    id: 2,
                    statement:
                        'Replace the LED pin if needed. For ESP32 → GPIO 2 (onboard LED) and for ESP8266 (NodeMCU) → GPIO 2 or LED_BUILTIN',
                },
                {
                    id: 3,
                    statement: 'Click the Upload (→) button',
                },
                {
                    id: 4,
                    statement:
                        'If setup is correct, the onboard LED will start blinking',
                },
            ],
        },
        {
            id: 6,
            heading: 'Note for ESP32 Users',
            label: [
                {
                    id: 1,
                    statement:
                        'Some ESP32 boards require pressing the BOOT button when uploading code',
                },
                {
                    id: 2,
                    statement:
                        'After clicking the Upload (→) button, When you see "Connecting…" in the IDE, press and hold the BOOT button on the ESP32 board',
                },
                {
                    id: 3,
                    statement:
                        'Release the button once you see the upload progress bar moving',
                },
                {
                    id: 4,
                    statement:
                        'Newer ESP32 boards often have auto-reset circuitry, so you might not need to press BOOT. But if your upload fails, try this method',
                },
            ],
        },
    ];

    useEffect(() => {
        setColor(darkTheme ? dark_colors : light_colors);
    }, [darkTheme]);

    const renderWithLinks = (text: string) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = text.split(urlRegex);
        return parts.map((part: any, index: any) => {
            if (part.match(urlRegex)) {
                return (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            color: color?.button,
                            textDecoration: 'underline',
                            wordBreak: 'break-all',
                        }}
                    >
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    return (
        <div className="arduinoIde">
            <h1 style={{ color: color?.text }}>Arduino IDE Setup</h1>
            <p style={{ color: color?.text }}>
                Guide to install the Arduino IDE and set up ESP32 / ESP8266
                boards
            </p>
            <section className="arduinoIde-wrapper">
                {Learn_List?.map((item: any) => (
                    <div className="arduinoIde-info-wrapper" key={item?.id}>
                        <h2 style={{ color: color?.text }}>
                            {item?.id}. {item?.heading}
                        </h2>
                        <section
                            className="arduinoIde-info"
                            style={{
                                backgroundColor: color?.outer,
                                border: `2px solid ${color?.element}`,
                            }}
                        >
                            <ul>
                                {item?.label?.map((item: any) => (
                                    <li
                                        key={item?.id}
                                        style={{ color: color?.icon }}
                                    >
                                        {renderWithLinks(item?.statement)}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default ArduinoIde;
