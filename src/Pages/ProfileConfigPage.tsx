import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './ProfileConfig.css';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { RoutePath } from '../Data/Constants';
import { ImProfile } from 'react-icons/im';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { HiOutlineLogout } from 'react-icons/hi';
import { appLogOut } from '../Utils/ProfileConfigHelperFn';

const ProfileConfig = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    const colorValue =
        location.pathname === RoutePath.AddProfileConfig
            ? '#00ffff'
            : location.pathname === RoutePath.SelectProfileConfig
            ? '#E5C454'
            : '#E57254';

    const NavigationList = [
        {
            id: 1,
            to: RoutePath.AddProfileConfig,
            icon: <AiOutlineAppstoreAdd />,
            label: 'Add',
            listPath: '/profileconfig/add',
            currentPath: location.pathname.replace('%20', ''),
        },
        {
            id: 2,
            to: RoutePath.SelectProfileConfig,
            icon: <ImProfile />,
            label: 'Select',
            listPath: '/profileconfig/select',
            currentPath: location.pathname.replace('%20', ''),
        },
    ];

    return (
        <div className="profileConfig">
            <section>
                <span>
                    {NavigationList.map((item: any) => (
                        <div
                            style={{
                                borderRadius: 'inherit',
                                background:
                                    item.currentPath === item.listPath ||
                                    item.currentPath.includes(item.listPath)
                                        ? 'rgb(11, 20, 22)'
                                        : '',
                            }}
                            key={item.id}
                        >
                            <Link to={item.to}>
                                <motion.span
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <IconContext.Provider
                                        value={{
                                            size: '2em',
                                            color: colorValue,
                                        }}
                                    >
                                        {item.icon}
                                    </IconContext.Provider>
                                </motion.span>
                                <p>{item.label}</p>
                            </Link>
                        </div>
                    ))}
                    <div
                        style={{
                            borderRadius: 'inherit',
                        }}
                    >
                        <Link to={RoutePath.Auth}>
                            <motion.span
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => appLogOut(navigate)}
                            >
                                <IconContext.Provider
                                    value={{
                                        size: '3em',
                                        color: colorValue,
                                    }}
                                >
                                    <HiOutlineLogout />
                                </IconContext.Provider>
                            </motion.span>
                        </Link>
                    </div>
                </span>
            </section>
            <section>
                <Outlet context={[colorValue, props.setBackgroundColor]} />
            </section>
        </div>
    );
};

export default ProfileConfig;
