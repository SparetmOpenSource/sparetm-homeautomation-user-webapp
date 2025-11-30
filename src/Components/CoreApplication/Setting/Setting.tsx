import { useLocation } from 'react-router-dom';
import './Setting.css';
import OptionPage from '../../Others/UiSkin/OptionPage/OptionPage';
import { RoutePath } from '../../../Data/Constants';
import { MdRoomPreferences, MdSupervisorAccount } from 'react-icons/md';

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
