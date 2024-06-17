import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FcInfo } from 'react-icons/fc';
import './Device.css';
import { useUpdateDevice } from '../../../../Api.tsx/CoreAppApis';
import { Spring, catchError, changeDeviceIcon } from '../../../../Utils/HelperFn';

const ApplianceDevice = ({
    showName,
    deviceName,
    statusValue,
    deviceType,
    id,
    openInfoModel,
    adminName,
    profileName,
    roomType,
    // mqttCredDetails,
    setCurrentSelectedDeviceId,
}: any) => {
    const [isOn, setIsOn] = useState(false);
    const [status, setStatus] = useState();

    const handleInfoModule = () => {
        openInfoModel();
        setCurrentSelectedDeviceId(id);
    };

    /*************************/

    const onError = (error: any) => {
        catchError(error);
    };

    const { mutate } = useUpdateDevice(
        adminName,
        profileName,
        roomType,
        id,
        onError,
        setStatus,
        setIsOn,
    );

    /*************************/

    const toggleSwitch = () => {
        setIsOn(!isOn);
        mutate({
            status: !isOn,
            statusDetail: '',
            // mqttPublisherId: mqttCredDetails?.mqttPublisherId,
            // mqttServerAddress:
            //     mqttCredDetails?.mqttServerAddress +
            //     ':' +
            //     mqttCredDetails?.mqttServerPort,
            // brokerUserName: mqttCredDetails?.brokerUserName,
            // brokerPassword: mqttCredDetails?.brokerPassword,
        } as any);
    };

    useEffect(() => {
        setStatus(statusValue);
        setIsOn(statusValue);
    }, [statusValue]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            style={{
                background: status ? 'rgba(177, 216, 213, 0.9)' : '#2a3942',
            }}
            className="applianceDevice"
        >
            <section className="applianceDevice_status">
                <span>
                    <IconContext.Provider
                        value={{
                            size: '2.5em',
                            color: status ? 'yellow' : '#b1d8d5',
                        }}
                    >
                        {changeDeviceIcon(
                            deviceType.split('/')[1].toUpperCase(),
                        )}
                    </IconContext.Provider>
                </span>
                <span>
                    <div
                        className="applianceDevice_switch"
                        data-ison={isOn}
                        onClick={toggleSwitch}
                    >
                        <motion.div
                            className="applianceDevice_handle"
                            layout
                            transition={Spring}
                        />
                    </div>
                </span>
            </section>
            <section className="applianceDevice_info">
                <div className="applianceDevice_info_row_1">
                    <span
                        style={{
                            color: status ? 'black' : '#b1d8d5',
                        }}
                    >
                        {showName}
                    </span>
                    <span
                        style={{
                            color: status ? 'black' : '#b1d8d5',
                            fontSize: '14px',
                        }}
                    >
                        {deviceName}
                    </span>
                </div>
                <div className="applianceDevice_info_row_2">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleInfoModule()}
                    >
                        <IconContext.Provider value={{ size: '2em' }}>
                            <span>
                                <FcInfo />
                            </span>
                        </IconContext.Provider>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ApplianceDevice;
