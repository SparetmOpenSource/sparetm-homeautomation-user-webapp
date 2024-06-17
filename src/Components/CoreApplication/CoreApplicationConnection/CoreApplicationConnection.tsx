import { Link, Outlet, useLocation } from 'react-router-dom';
import { RoutePath } from '../../../Data/Constants';
import './CoreApplicationConnection.css';

const CoreApplicationConnection = () => {
    const location = useLocation();
    const Nav_List = [
        {
            id: 1,
            to: RoutePath.GettingStartedDocs,
            currentPath: location.pathname,
            listPath: RoutePath.GettingStartedDocs,
            label: 'Overview',
        },
        {
            id: 2,
            to: RoutePath.GettingStartedwithArduinoIdeDocs,
            currentPath: location.pathname,
            listPath: RoutePath.GettingStartedwithArduinoIdeDocs,
            label: 'Setup Arduino IDE',
        },
        {
            id: 3,
            to: RoutePath.GettingStartedwithEsp8266Docs,
            currentPath: location.pathname,
            listPath: RoutePath.GettingStartedwithEsp8266Docs,
            label: 'ESP8266 Basic Setup',
        },
        {
            id: 4,
            to: RoutePath.Esp8266SpecificDeviceCodeDocs,
            currentPath: location.pathname,
            listPath: RoutePath.Esp8266SpecificDeviceCodeDocs,
            label: 'ESP8266 Setup For Specific Device',
        },
        {
            id: 5,
            to: RoutePath.CodeExamplesDocs,
            currentPath: location.pathname,
            listPath: RoutePath.CodeExamplesDocs,
            label: 'Other Code Examples',
        },
    ];
    return (
        <div className="coreAppConnection">
            <section className="coreAppConnection_content">
                <Outlet context="hello bro" />
            </section>
            <section className="coreAppConnection_nav">
                <p>ON THIS PAGE</p>
                <ul>
                    {Nav_List.map((item: any) => (
                        <Link to={item.to} key={item.id}>
                            <li
                                style={{
                                    color:
                                        item.currentPath === item.listPath ||
                                        item.currentPath.includes(item.listPath)
                                            ? 'aqua'
                                            : '',
                                }}
                            >
                                {item.label}
                            </li>
                        </Link>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default CoreApplicationConnection;
