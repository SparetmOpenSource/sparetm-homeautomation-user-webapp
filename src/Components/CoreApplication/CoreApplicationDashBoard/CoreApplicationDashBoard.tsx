import { useEffect, useState } from 'react';
import './CoreApplicationDashBoard.css';
import CalenderFrame from '../../Others/Calendar/CalenderFrame';
import StatusPanel from './Features/StatusPanel/StatusPanel';
import FeatureWrapper from './Features/FeatureWrapper/FeatureWrapper';
import { RiBaseStationLine } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import Bar from '../../Others/Graph/Bar';
import { useOutletContext } from 'react-router-dom';
import { displayToastify, generateRandomInteger } from '../../../Utils/HelperFn';
import { motion } from 'framer-motion';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../Data/Enum';

const CoreApplicationDashBoard = () => {
    const [dateValue, setDateValue]: any = useState();
    const [keyValue, setKeyValue]: any = useState();
    const [dataValue, setDataValue]: any = useState();
    const profileDetails: any = useOutletContext();
    const serviceStatusList = [
        {
            id: 1,
            status: 'up',
            icon: <RiBaseStationLine />,
            name: 'Profile',
        },
        {
            id: 2,
            status: 'up',
            icon: <RiBaseStationLine />,
            name: 'Device',
        },
        {
            id: 3,
            status: 'up',
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

    const handleRefreshTemp = () => { 
         displayToastify(
             'Refreshing temperature',
             TOASTIFYCOLOR.DARK,
             TOASTIFYSTATE.INFO,
         );
    };

    useEffect(() => {
        const key: any = [];
        const data: any = [];

        for (var i = 0; i < profileDetails?.room?.length; i++) {
            key.push(`${profileDetails?.room[i]?.room_type}`);
        }

        for (var j = 0; j < profileDetails?.room?.length; j++) {
            let barData: any = {};
            barData.room = profileDetails?.room[j]?.room_type?.slice(0, 3);
            barData[`${profileDetails?.room[j]?.room_type}`] =
                generateRandomInteger(25, 35);
            data.push(barData);
        }
        setKeyValue(key);
        setDataValue(data);
    }, [profileDetails]); // eslint-disable-line react-hooks/exhaustive-deps

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
                            <p style={{ fontSize: '0.7rem' }}>{item.name}</p>
                        </span>
                    ))}
                </div>
                <motion.section
                    className="coreApplicationDashBoard_room_temp_notification_center"
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRefreshTemp()}
                >
                    {/* {dateValue} */}
                    <Bar
                        data={dataValue}
                        keyValue={keyValue}
                        indexBy="room"
                        barVerticalIndex="temp"
                    />
                </motion.section>
                <div>
                    <CalenderFrame setNewDate={setDateValue} />
                </div>
            </section>
        </div>
    );
};

export default CoreApplicationDashBoard;
