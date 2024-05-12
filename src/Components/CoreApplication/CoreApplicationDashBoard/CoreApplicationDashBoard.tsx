import { useState } from 'react';
import './CoreApplicationDashBoard.css';
import CalenderFrame from '../../Others/Calendar/CalenderFrame';
import StatusPanel from './Features/StatusPanel/StatusPanel';
import FeatureWrapper from './Features/FeatureWrapper/FeatureWrapper';
import { RiBaseStationLine } from 'react-icons/ri';
import { IconContext } from 'react-icons';

const CoreApplicationDashBoard = () => {
    const [dateValue, setDateValue]: any = useState();
    const serviceStatusList = [
        {
            id: 1,
            status: 'up',
            icon: <RiBaseStationLine />,
            name: 'Profile',
        },
        {
            id: 2,
            status: 'down',
            icon: <RiBaseStationLine />,
            name: 'Device',
        },
        {
            id: 3,
            status: 'down',
            icon: <RiBaseStationLine />,
            name: 'Gateway',
        },
        {
            id: 4,
            status: 'up',
            icon: <RiBaseStationLine />,
            name: 'Registry',
        },
        {
            id: 5,
            status: 'up',
            icon: <RiBaseStationLine />,
            name: 'Security',
        },
        {
            id: 6,
            status: 'down',
            icon: <RiBaseStationLine />,
            name: 'Notification',
        },
    ];
    return (
        <div className="coreApplicationDashBoard">
            {/* ****************************Dashboard Content*************************** */}

            <section className="coreApplicationDashBoard_content">
                <div>
                    <StatusPanel />
                </div>
                <div>
                    <FeatureWrapper dateValue={dateValue} />
                </div>
            </section>

            {/* ****************************Dashboard Notification*************************** */}

            <section className="coreApplicationDashBoard_notification">
                <div className="coreApplicationDashBoard_notification_center">
                    {serviceStatusList.map((item: any) => (
                        <span key={item?.id}>
                            <IconContext.Provider
                                value={{
                                    size: '1.5em',
                                    color:
                                        item.status === 'up' ? 'green' : 'red',
                                }}
                            >
                                {item.icon}
                            </IconContext.Provider>
                            <p style={{fontSize:'0.7rem'}}>{item.name}</p>
                        </span>
                    ))}
                </div>
                <div className="coreApplicationDashBoard_notification_center">
                    by
                </div>
                <div className="coreApplicationDashBoard_notification_center">
                    {dateValue}
                </div>
                <div>
                    <CalenderFrame setNewDate={setDateValue} />
                </div>
            </section>
        </div>
    );
};

export default CoreApplicationDashBoard;
