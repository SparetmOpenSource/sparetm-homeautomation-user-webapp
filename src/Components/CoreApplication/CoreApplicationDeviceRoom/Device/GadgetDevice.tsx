import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import './Device.css';
import { ConvertTheRange, Spring, catchError, findAnimationBasedColor } from '../../../../Utils/HelperFn';
import { useUpdateDevice } from '../../../../Api.tsx/CoreAppApis';
import { IoIosColorPalette } from 'react-icons/io';
import { ChangeBrightnessIcon, GadgetRgbDefaultColor } from '../../../../Data/Constants';

const GadgetDevice = ({
    showName,
    deviceName,
    statusValue,
    statusDetail,
    id,
    adminName,
    profileName,
    roomType,
    mqttCredDetails,
    openAddColorToRgbModel,
    setCurrentSelectedDeviceId,
}: any) => {
    const [isOn, setIsOn] = useState(false);
    const [status, setStatus] = useState(false);

    let animationType = GadgetRgbDefaultColor[4];
    if (statusDetail !== null) {
        animationType = statusDetail.split(',')[4];
    }
    let backgroundColorValue: any = statusDetail
        ? statusDetail.split(',')
        : [
              GadgetRgbDefaultColor[0],
              GadgetRgbDefaultColor[1],
              GadgetRgbDefaultColor[2],
              GadgetRgbDefaultColor[3],
          ];

    const brightness = ConvertTheRange(
        parseFloat(backgroundColorValue[3]),
        0,
        1,
        0,
        100,
    );

    const handleOpenAddColorToRgbModel = () => {
        openAddColorToRgbModel();
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
            statusDetail: `${backgroundColorValue[0]},${backgroundColorValue[1]},${backgroundColorValue[2]},${backgroundColorValue[3]},${animationType}`,
            mqttPublisherId: mqttCredDetails?.mqttPublisherId,
            mqttServerAddress:
                mqttCredDetails?.mqttServerAddress +
                ':' +
                mqttCredDetails?.mqttServerPort,
            brokerUserName: mqttCredDetails?.brokerUserName,
            brokerPassword: mqttCredDetails?.brokerPassword,
        } as any);
    };

    useEffect(() => {
        setStatus(statusValue);
        setIsOn(statusValue);
    }, [statusValue, statusDetail]); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div
            className="gadgetDevice"
            style={{
                background: status
                    ? animationType === GadgetRgbDefaultColor[4]
                        ? `rgba(${backgroundColorValue[0]}, ${backgroundColorValue[1]}, ${backgroundColorValue[2]}, 0.9)`
                        : findAnimationBasedColor(animationType)
                    : '#2a3942',
            }}
        >
            <section className="gadgetDevice_status">
                <span
                    style={{
                        color: status ? 'white' : '#b1d8d5',
                    }}
                >
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleOpenAddColorToRgbModel()}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color: status ? 'white' : '#b1d8d5',
                            }}
                        >
                            {ChangeBrightnessIcon(brightness)}
                        </IconContext.Provider>
                    </motion.div>
                    {brightness}%
                </span>
                <span>
                    <div
                        className="gadgetDevice_switch"
                        data-ison={isOn}
                        onClick={toggleSwitch}
                    >
                        <motion.div
                            className="gadgetDevice_handle"
                            layout
                            transition={Spring}
                        />
                    </div>
                </span>
            </section>
            <section className="gadgetDevice_info">
                <div className="gadgetDevice_info_row_1">
                    <span
                        style={{
                            color: status ? 'white' : '#b1d8d5',
                        }}
                    >
                        {showName}
                    </span>
                    <span
                        style={{
                            fontSize: '14px',
                            color: status ? 'white' : '#b1d8d5',
                        }}
                    >
                        {deviceName}
                    </span>
                </div>
                <div className="gadgetDevice_info_row_2">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleOpenAddColorToRgbModel()}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color: status ? 'white' : '#b1d8d5',
                            }}
                        >
                            <span>
                                <IoIosColorPalette />
                            </span>
                        </IconContext.Provider>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default GadgetDevice;
