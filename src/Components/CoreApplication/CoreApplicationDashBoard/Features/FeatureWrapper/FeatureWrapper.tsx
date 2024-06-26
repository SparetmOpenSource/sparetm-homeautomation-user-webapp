import './FeatureWrapper.css';
import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { RoutePath } from '../../../../../Data/Constants';
import { IoCalendarSharp } from 'react-icons/io5';
import { SiStatuspal } from 'react-icons/si';

const FeatureWrapper = (props: any) => {
    const location = useLocation();

    const todoPath =
        RoutePath.CoreApplication_Dashboard +
        '/' +
        RoutePath.Dashboard_Todo.split('/')[1];
    const statusPath =
        RoutePath.CoreApplication_Dashboard +
        '/' +
        RoutePath.Dashboard_Device_Status.split('/')[1];

    let currentPageLocation = location.pathname.replace('%20', '');

    const FeatureNavigationList = [
        {
            id: 1,
            to: RoutePath?.Dashboard_Device_Status,
            icon: <SiStatuspal />,
        },
        {
            id: 2,
            to: RoutePath?.Dashboard_Todo,
            icon: <IoCalendarSharp />,
        },
    ];

    return (
        <div className="featureWrapper">
            <section className="featureWrapper_nav">
                <div>
                    {currentPageLocation === todoPath ? (
                        <p>
                            Task assigned to you show up here{' '}
                            {props?.dateValue
                                ? `( ${props?.dateValue?.split('T')[0]} )`
                                : ''}
                        </p>
                    ) : currentPageLocation === statusPath ? (
                        <p>Check current room status</p>
                    ) : (
                        <p>Something went wrong</p>
                    )}
                </div>
                <div>
                    {FeatureNavigationList.map((item: any) => (
                        <Link to={item?.to} key={item.id}>
                            <motion.div
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <IconContext.Provider
                                    value={{
                                        size: '1.7em',
                                        color: 'white',
                                    }}
                                >
                                    {item?.icon}
                                </IconContext.Provider>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>
            <section className="featureWrapper_content">
                <Outlet context={props?.dateValue} />
            </section>
        </div>
    );
};

export default FeatureWrapper;
