import { useNavigate } from 'react-router-dom';
import './DeviceStatus.css';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { TbHomeStats } from 'react-icons/tb';
import PieChart from '../../../../../../Others/Graph/PieChart';
import { TfiPowerOff } from 'react-icons/tfi';
import { useEffect, useState } from 'react';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../../../Data/Enum';
import {
    catchError,
    displayToastify,
} from '../../../../../../../Utils/HelperFn';
import { useUpdateAllDeviceStatusWidget } from '../../../../../../../Api.tsx/CoreAppApis';
import {
    getAppAdminUser,
    getProfileName,
} from '../../../../../../../Utils/ProfileConfigHelperFn';

const DeviceStatus = (props: any) => {
    const navigate = useNavigate();
    const profileName = getProfileName();
    const adminName = getAppAdminUser();
    const [allDeviceStatus, setAllDeviceStatus]: any = useState(false);
    const handleRouteToRoom = (routePath: any) => {
        navigate(routePath);
    };

    const data = [
        {
            id: 'active',
            label: 'Active',
            value: props?.active,
            color: 'blue',
        },
        {
            id: 'inactive',
            label: 'Inactive',
            value: props?.inactive,
            color: 'blue',
        },
    ];
    const fill = [
        {
            match: {
                id: 'active',
            },
            id: 'dots',
        },
        {
            match: {
                id: 'inactive',
            },
            id: 'lines',
        },
    ];
    const onError = (error: any) => {
        catchError(error);
    };
    const { mutate } = useUpdateAllDeviceStatusWidget(
        adminName,
        profileName,
        props?.roomLabel,
        onError,
    );

    const handleDeviceToActive = () => {
        setAllDeviceStatus(!allDeviceStatus);
        handleAllDeviceStatus();
    };

    const handleAllDeviceStatus = () => {
        mutate({
            status: !allDeviceStatus,
            statusDetail: ' ',
        } as any);
        !allDeviceStatus
            ? displayToastify(
                  'Turning ON all devices',
                  TOASTIFYCOLOR.DARK,
                  TOASTIFYSTATE.INFO,
              )
            : displayToastify(
                  'Turning OFF all devices',
                  TOASTIFYCOLOR.DARK,
                  TOASTIFYSTATE.INFO,
              );
    };

    useEffect(() => {
        props?.active === props?.totalDevice && props?.totalDevice !== 0
            ? setAllDeviceStatus(true)
            : setAllDeviceStatus(false);
    }, [props?.totalDevice, props?.active]); // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     props?.refreshDeviceList();
    // }, [allDeviceStatus]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        console.log(props?.active);
        console.log(props?.inactive);
        console.log(props?.totalDevice);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="deviceStatus">
            <section>
                <PieChart data={data} fills={fill} />
            </section>
            <section>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                        handleRouteToRoom(
                            `/app/room/${props?.roomLabel
                                ?.replace(' ', '%20')
                                .trim()}`,
                        )
                    }
                >
                    <IconContext.Provider
                        value={{
                            size: '2em',
                            color: 'rgb(206,199,191)',
                        }}
                    >
                        <TbHomeStats />
                    </IconContext.Provider>
                </motion.div>
                <div className="deviceStatus-switch">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeviceToActive()}
                    >
                        <IconContext.Provider
                            value={{
                                size: '5em',
                                color: allDeviceStatus ? 'lightgreen' : 'grey',
                            }}
                        >
                            <TfiPowerOff />
                        </IconContext.Provider>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default DeviceStatus;
