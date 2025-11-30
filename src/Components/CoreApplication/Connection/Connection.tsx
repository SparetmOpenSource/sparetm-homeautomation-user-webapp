import './Connection.css';
import OptionPage from '../../Others/UiSkin/OptionPage/OptionPage';
import { useLocation } from 'react-router-dom';
import { RoutePath } from '../../../Data/Constants';
import { GrOverview } from 'react-icons/gr';
import { RiPsychotherapyLine } from 'react-icons/ri';
import {
    MdDisplaySettings,
    MdOutlineDeviceHub,
    MdOutlineSettingsRemote,
} from 'react-icons/md';
import { IoHardwareChip } from 'react-icons/io5';

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
            to: RoutePath.GettingStartedwithEsp8266Esp32Docs,
            icon: <MdOutlineSettingsRemote />,
            currentPath: location.pathname,
            listPath: RoutePath.GettingStartedwithEsp8266Esp32Docs,
            label: 'ESP Basic Setup',
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
        {
            id: 6,
            to: RoutePath.HardwareConnection,
            icon: <IoHardwareChip />,
            currentPath: location.pathname,
            listPath: RoutePath.HardwareConnection,
            label: 'Hardware Connection',
        },
    ];

    return (
        <div className="connection">
            <OptionPage menuType="Connect" menuList={menuList} />
        </div>
    );
};

export default Connection;
