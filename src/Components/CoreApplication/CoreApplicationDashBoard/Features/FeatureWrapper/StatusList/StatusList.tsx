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
            description: '? devices running in Room ',
            count: 1,
            barStatus: '40%',
        },
        {
            id: 'c2',
            icon: <TbCircleDashedNumber2 />,
            description: '? devices running in Room ',
            count: 2,
            barStatus: '60%',
        },
        {
            id: 'c3',
            icon: <TbCircleDashedNumber3 />,
            description: '? devices running in Room ',
            count: 3,
            barStatus: '25%',
        },
        {
            id: 'c4',
            icon: <TbCircleDashedNumber4 />,
            description: '? devices running in Room ',
            count: 4,
            barStatus: '80%',
        },
        {
            id: 'c5',
            icon: <TbCircleDashedNumber5 />,
            description: '? devices running in Room ',
            count: 5,
            barStatus: '20%',
        },
        {
            id: 'c6',
            icon: <TbCircleDashedNumber6 />,
            description: '? devices running in Room ',
            count: 6,
            barStatus: '45%',
        },
    ];

    return (
        <div className="wrapper">
            <div className="container">
                {StatusNavigationList.map((item: any) => (
                    <span key={item?.id}>
                        <input
                            type="radio"
                            name="slide"
                            id={item?.id}
                            checked={
                                statusVisibility === item?.count ? true : false
                            }
                        />
                        <label
                            className="card"
                            onClick={() => onClickFn(item?.count)}
                        >
                            {statusVisibility !== item?.count && (
                                <DeviceStatusBar barStatus={item?.barStatus} />
                            )}
                            {statusVisibility === item?.count && (
                                <DeviceStatus room={item?.id} />
                            )}
                            {statusVisibility === item?.count && (
                                <div className="row">
                                    <motion.div
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="icon"
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
                                    <div className="description">
                                        <p>{item?.description}</p>
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
