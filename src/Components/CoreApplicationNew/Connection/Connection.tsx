import './Connection.css';
import OptionPage from '../../Others/UiSkin/OptionPage/OptionPage';
import { useLocation } from 'react-router-dom';
import { RoutePath } from '../../../Data/Constants';
import { GrOverview } from 'react-icons/gr';
import { MdDisplaySettings } from 'react-icons/md';
import { MdOutlineSettingsRemote } from 'react-icons/md';
import { MdOutlineDeviceHub } from 'react-icons/md';
import { RiPsychotherapyLine } from 'react-icons/ri';

const Connection = () => {
    const location = useLocation();
    const menuList = [
        {
            id: 1,
            to: RoutePath.GettingStartedDocs,
            icon: <GrOverview />,
            currentPath: location.pathname,
            listPath: RoutePath.GettingStartedDocs,
            label: 'Overview',
        },
        {
            id: 2,
            to: RoutePath.GettingStartedwithArduinoIdeDocs,
            icon: <MdDisplaySettings />,
            currentPath: location.pathname,
            listPath: RoutePath.GettingStartedwithArduinoIdeDocs,
            label: 'Setup Arduino IDE',
        },
        {
            id: 3,
            to: RoutePath.GettingStartedwithEsp8266Docs,
            icon: <MdOutlineSettingsRemote />,
            currentPath: location.pathname,
            listPath: RoutePath.GettingStartedwithEsp8266Docs,
            label: 'ESP8266 Basic Setup',
        },
        {
            id: 4,
            to: RoutePath.Esp8266SpecificDeviceCodeDocs,
            icon: <MdOutlineDeviceHub />,
            currentPath: location.pathname,
            listPath: RoutePath.Esp8266SpecificDeviceCodeDocs,
            label: 'Specific Device Setup',
        },
        {
            id: 5,
            to: RoutePath.CodeExamplesDocs,
            icon: <RiPsychotherapyLine />,
            currentPath: location.pathname,
            listPath: RoutePath.CodeExamplesDocs,
            label: 'Other Code Examples',
        },
    ];

    return (
        <div className="connection">
            <OptionPage menuType="Connections" menuList={menuList} />
        </div>
    );
};

export default Connection;
