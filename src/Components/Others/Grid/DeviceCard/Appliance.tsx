import { motion } from 'framer-motion';
import './DeviceCard.css';
import { useEffect, useState } from 'react';
import { useBackDropOpen, useTheme } from '../../../../Pages/ThemeProvider';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { IconContext } from 'react-icons';
import { PiPowerFill } from 'react-icons/pi';
import { HiOutlineInformationCircle } from 'react-icons/hi2';
import {
    changeDeviceIcon,
    trimToNChars,
} from '../../../../Utils/HelperFn';
import { APPLIANCE_EXPAND, LandscapeSizeM, LandscapeSizeS } from '../../../../Data/Constants';
import ApplianceExpand from './ApplianceExpand';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../Features/ReduxHooks';
import { featureUrl } from '../../../../Api.tsx/CoreAppApis';
import { updateHeaderConfig } from '../../../../Api.tsx/Axios';
import { updateDeviceStatus } from '../../../../Features/Device/DeviceSlice';
import { useDeviceMutation } from '../../../../Hooks/useDeviceMutation';

const Appliance = ({ id, statusValue }: any) => {
    const currentDevice = useAppSelector(
        (state: any) =>
            state?.device?.deviceData?.body?.find(
                (device: any) => device.deviceId === id,
            ) ?? null,
    );
    const [color, setColor] = useState<any>(light_colors);
    const dispatch = useAppDispatch();
    const [status, setStatus] = useState<boolean>(false);
    const darkTheme: any = useTheme();
    const { toggleBackDropOpen } = useBackDropOpen();

    const onSuccess = () => {
        // useDeviceMutation handles safety re-fetch automatically
    };

    const onError = (error: any) => {
        // Revert Optimistic Update
        setStatus((prev) => {
             const reverted = !prev;
             setTimeout(() => {
                 dispatch(updateDeviceStatus({ id, status: reverted }));
             }, 0);
             return reverted;
        });
        // Note: useDeviceMutation handles the modal/toast logic automatically
    };

    const { mutate } = useDeviceMutation(
        `${featureUrl.update_device}${id}`,
        updateHeaderConfig,
        onSuccess,
        undefined, // Default non-MQTT error handling (Toast)
        LandscapeSizeS,
        onError // Run this on ANY error (revert)
    );

    const changeStatus = () => {
        const newStatus = !status;
        setStatus(newStatus);
        dispatch(updateDeviceStatus({ id, status: newStatus }));
        mutate({ status: newStatus, statusDetail: '' } as any);
    };

    useEffect(() => {
        setStatus(statusValue);
    }, [statusValue]);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
            className="device"
            style={{
                backgroundColor: color?.element,
                border: status ? `2px solid ${color?.button}` : '',
            }}
        >
            <section>
                <span>
                    <IconContext.Provider
                        value={{
                            size: '3em',
                            color: status ? color?.button : 'gray',
                        }}
                    >
                        {changeDeviceIcon(
                            currentDevice?.deviceType
                                .split('/')[1]
                                .toUpperCase(),
                        )}
                    </IconContext.Provider>
                </span>
                <motion.span
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 1.0 }}
                    onClick={() => changeStatus()}
                >
                    <IconContext.Provider
                        value={{
                            size: '2.5em',
                            color: status ? color?.success : 'gray',
                        }}
                    >
                        <PiPowerFill />
                    </IconContext.Provider>
                </motion.span>
            </section>
            <section>
                <span>
                    <p
                        style={{
                            color: status ? color?.text : 'gray',
                            fontSize: '1rem',
                            fontWeight: '600',
                        }}
                    >
                        {trimToNChars(currentDevice?.showName, 11)}
                    </p>
                    <p
                        style={{
                            color: status ? color?.text : 'gray',
                            fontSize: '0.9rem',
                            fontWeight: '100',
                        }}
                    >
                        {trimToNChars(currentDevice?.deviceName, 11)}
                    </p>
                </span>
                <motion.span
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 1.0 }}
                    onClick={() => {
                        const backdropId = APPLIANCE_EXPAND;
                        toggleBackDropOpen(
                            backdropId,
                            <ApplianceExpand
                                id={id}
                                darkTheme={darkTheme}
                                applianceExpandBackdropId={backdropId}
                                currentDeviceStatus={status}
                            />,
                            LandscapeSizeM,
                        );
                    }}
                >
                    <IconContext.Provider
                        value={{
                            size: '1.5em',
                            color: status ? color?.text : 'gray',
                        }}
                    >
                        <HiOutlineInformationCircle />
                    </IconContext.Provider>
                </motion.span>
            </section>
        </motion.div>
    );
};

export default Appliance;
