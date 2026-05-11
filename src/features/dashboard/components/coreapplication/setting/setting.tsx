import { MdRoomPreferences, MdSupervisorAccount } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { RoutePath } from '../../../../../data/Constants';
import OptionPage from '../../../../../shared/commoncomponents/uiskin/optionpage/Optionpage';
import './Setting.css';

const Setting = () => {
    const location = useLocation();
    const menuList = [
        {
            id: 1,
            to: RoutePath.Setting_Account,
            icon: <MdSupervisorAccount />,
            currentPath: location.pathname,
            listPath: RoutePath.Setting_Account,
            label: 'Account',
        },
        {
            id: 2,
            to: RoutePath.Setting_Features,
            icon: <MdRoomPreferences />,
            currentPath: location.pathname,
            listPath: RoutePath.Setting_Features,
            label: 'Preferences',
        },
    ];
    return (
        <div className="setting">
            <OptionPage menuType="Setting" menuList={menuList} />
        </div>
    );
};

export default Setting;
