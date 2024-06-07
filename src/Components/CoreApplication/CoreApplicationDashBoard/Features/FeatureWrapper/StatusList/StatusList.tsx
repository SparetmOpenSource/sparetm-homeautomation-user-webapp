import { useState } from 'react';
import './StatusList.css';
import { TbCircleDashedNumber1 } from 'react-icons/tb';
import { TbCircleDashedNumber2 } from 'react-icons/tb';
import { TbCircleDashedNumber3 } from 'react-icons/tb';
import { TbCircleDashedNumber4 } from 'react-icons/tb';
import { TbCircleDashedNumber5 } from 'react-icons/tb';
import { TbCircleDashedNumber6 } from 'react-icons/tb';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import DeviceStatus from './DeviceStatus/DeviceStatus';
import DeviceStatusBar from './DeviceStatus/DeviceStatusBar/DeviceStatusBar';
const StatusList = () => {
    const [statusVisibility, setStatusVisibility]: any = useState(1);
    const onClickFn = (num: any) => {
        console.log('clicked');
        setStatusVisibility(num);
    };

    const StatusNavigationList = [
        {
            id: 'c1',
            icon: <TbCircleDashedNumber1 />,
            description: '%COUNT% devices running in %ROOM% ',
            count: 1,
            barStatus: '40%',
            roomLabel: 'Bedroom',
        },
        {
            id: 'c2',
            icon: <TbCircleDashedNumber2 />,
            description: '%COUNT% devices running in %ROOM% ',
            count: 2,
            barStatus: '60%',
            roomLabel: 'Dining Room',
        },
        {
            id: 'c3',
            icon: <TbCircleDashedNumber3 />,
            description: '%COUNT% devices running in %ROOM% ',
            count: 3,
            barStatus: '25%',
            roomLabel: 'Drawing Room',
        },
        {
            id: 'c4',
            icon: <TbCircleDashedNumber4 />,
            description: '%COUNT% devices running in %ROOM%',
            count: 4,
            barStatus: '80%',
            roomLabel: 'Kitchen',
        },
        {
            id: 'c5',
            icon: <TbCircleDashedNumber5 />,
            description: '%COUNT% devices running in %ROOM% ',
            count: 5,
            barStatus: '20%',
            roomLabel: 'Living Room',
        },
        {
            id: 'c6',
            icon: <TbCircleDashedNumber6 />,
            description: '%COUNT% devices running in %ROOM% ',
            count: 6,
            barStatus: '45%',
            roomLabel: 'Master Bedroom',
        },
    ];

    return (
        <div className="statusList-wrapper">
            <div className="statusList-container">
                {StatusNavigationList.map((item: any) => (
                    <span key={item?.id}>
                        <input
                            className="statusList-input"
                            type="radio"
                            name="slide"
                            id={item?.id}
                            checked={
                                statusVisibility === item?.count ? true : false
                            }
                        />
                        <label
                            className="statusList-card"
                            onClick={() => onClickFn(item?.count)}
                        >
                            {statusVisibility !== item?.count && (
                                <DeviceStatusBar
                                    barStatus={item?.barStatus}
                                    roomLabel={item?.roomLabel}
                                />
                            )}
                            {statusVisibility === item?.count && (
                                <DeviceStatus
                                    room={item?.id}
                                    roomLabel={item?.roomLabel}
                                />
                            )}
                            {statusVisibility === item?.count && (
                                <div className="statusList-row">
                                    <motion.div
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="statusList-icon"
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
                                    <div className="statusList-description">
                                        <p>
                                            {item?.description
                                                .replace(
                                                    '%ROOM%',
                                                    item?.roomLabel,
                                                )
                                                .replace('%COUNT%', item?.count)
                                                .trim()}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </label>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default StatusList;
