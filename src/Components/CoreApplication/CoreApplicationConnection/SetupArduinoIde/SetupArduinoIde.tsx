import { AppConnectionLink } from '../../../../Data/CoreAppConnectionConstant';
import './SetupArduinoIde.css';

const SetupArduinoIde = () => {
    return (
        <div className="setupArduinoIde">
            <h1>Arduino IDE</h1>
            <p>
                On this page, we will show you how you can install Arduino IDE
                and the ESP8266 libraries and tools, and start programming your
                ESP8266 modules in the Arduino IDE.
            </p>
            <p>
                Go to the Arduino website and{' '}
                <span className="setupArduinoIde_arduino_download">
                    <a
                        href={AppConnectionLink.ArduinoDownload}
                        target="_blank"
                        rel="noreferrer"
                    >
                        download
                    </a>
                </span>{' '}
                the version for your operating system.
            </p>
            <h1>ESP8266</h1>
            <p>
                Step 1: Add the ESP8266 Boards Manager Link to the Arduino IDE
                Preferences
            </p>
            <ul>
                <li>
                    Open Arduino IDE. From the Menu select File {'>'}{' '}
                    Preferences {'>'} Settings.
                </li>
                <li>
                    In the <b>“Additional Boards Manager URLs”</b> field below,
                    copy the below link for the stable release of the ESP8266.{' '}
                    <a
                        href={AppConnectionLink.ESP8266Library}
                        target="_blank"
                        rel="noreferrer"
                    >
                        http://arduino.esp8266.com/stable/package_esp8266com_index.json
                    </a>
                </li>
                <li> Click the OK button.</li>
            </ul>
            <p>Step 2: Install the ESP8266 Board Libraries and Tools</p>
            <ul>
                <li>
                    From the Arduino IDE Menu select Tools {'>'} Board {'>'}{' '}
                    Boards Manager.
                </li>
                <li>
                    In the text box of the Boards Manager dialog type <b>ESP</b>
                    , then select the <b>“esp8266 by ESP8266 Community”</b> and
                    click on the Install button.
                </li>
                <li>
                    When the installation finishes, click on the <b>“Close”</b>{' '}
                    button.
                </li>
            </ul>
            <p>Step 3: Test the ESP8266 With Arduino Project</p>
            <ul>
                <li>
                    Connect the USB cable of your ESP8266 module to the
                    computer.
                </li>
                <li>
                    You can test with an empty sketch or a small sketch such as
                    Blink.
                </li>
                <li>
                    In the Arduino IDE from the menu select the type of board
                    type that you have. In my case, this is “NodeMCU 0.9 (ESP-12
                    Module)”.
                </li>
                <li>
                    Also from the Arduino IDE menu, select the Serial Port to
                    which the module is connected.
                </li>
                <li>
                    Click on the Upload button to compile and upload the sketch.
                </li>
            </ul>
            <p>
                If you want video tutorials, please click{' '}
                <a
                    href={AppConnectionLink.ESP8266SetupVideo}
                    target="_blank"
                    rel="noreferrer"
                >
                    here.
                </a>
            </p>
            <p>
                Congratulations! Your Arduino IDE is ready to support ESP8266
                modules.
            </p>
        </div>
    );
};

export default SetupArduinoIde;
