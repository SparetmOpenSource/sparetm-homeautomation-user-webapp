import { Link, Outlet, useLocation } from 'react-router-dom';
import './CoreApplicationSetting.css';
import { RoutePath } from '../../../Data/Constants';

const CoreApplicationSetting = () => {
    const location = useLocation();
    const Nav_List = [
        {
            id: 1,
            to: RoutePath.Setting_Account,
            currentPath: location.pathname,
            listPath: RoutePath.Setting_Account,
            label: 'Account',
        },
        {
            id: 2,
            to: RoutePath.Setting_Features,
            currentPath: location.pathname,
            listPath: RoutePath.Setting_Features,
            label: 'Features',
        },
    ];

    return (
        <div className="coreApplicationSetting">
            <section className="coreApplicationSetting_content">
                <Outlet context="setting data" />
            </section>
            <section className="coreApplicationSetting_nav">
                <p>Setting</p>
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

export default CoreApplicationSetting;
