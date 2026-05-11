import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IconContext } from 'react-icons';
import {
    MdBrightness4,
    MdBrightness5,
    MdBrightness6,
    MdBrightness7,
} from 'react-icons/md';
import { PiPowerFill } from 'react-icons/pi';
import { VscSymbolColor } from 'react-icons/vsc';
import { updateHeaderConfig } from '../../../../../../core/api/Axios';
import { featureUrl } from '../../../../../../core/api/Coreappapis';
import { useBackDropOpen, useTheme } from '../../../../../../core/router/Themeprovider';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../../../core/store/Reduxhooks';
import { dark_colors, light_colors } from '../../../../../../data/ColorConstant';
import {
    LandscapeSizeM,
    LandscapeSizeS,
    RGB_GADGET_EXPAND,
} from '../../../../../../data/Constants';
import {
    GadgetRgbDefaultColor,
    GadgetRgbDefaultPattern,
    GadgetRgbRainbowPattern,
} from '../../../../../../data/DeviceRoomConstant';
import {
    ConvertTheRangeToRound,
    trimToNChars,
} from '../../../../../../utils/HelperFn';
import { useDeviceMutation } from '../../../../../devices/hooks/usedevicemutation';
import { updateDeviceStatus } from '../../../../../devices/store/device/Deviceslice';
import './devicecard.css';
import RgbGadgetExpand from './Rgbgadgetexpand';


interface RgbGadgetProps {
    id: string;
    statusValue: boolean;
}

const RgbGadget = ({ id, statusValue }: RgbGadgetProps) => {
    const currentDevice = useAppSelector(
        (state: any) =>
            state?.device?.deviceData?.body?.find(
                (device: any) => device.deviceId === id,
            ) ?? null,
    );

    const [color, setColor] = useState(light_colors);
    const dispatch = useAppDispatch();
    const [status, setStatus] = useState<boolean>(statusValue);
    const darkTheme = useTheme();
    const { toggleBackDropOpen } = useBackDropOpen();

    const pattern =
        currentDevice?.statusDetail?.split(',')[4] ?? GadgetRgbDefaultPattern;

    const background = useMemo<number[]>(() => {
        return currentDevice?.statusDetail
            ? currentDevice?.statusDetail.split(',').map(Number)
            : [...GadgetRgbDefaultColor];
    }, [currentDevice?.statusDetail]);

    const brightnessPercent = useMemo<number>(() => {
        return ConvertTheRangeToRound(background[3] ?? 0.5, 0, 1, 0, 100);
    }, [background]);

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

    const changeStatus = useCallback(() => {
        const newStatus = !status;
        setStatus(newStatus);
        dispatch(updateDeviceStatus({ id, status: newStatus }));
        mutate({
            status: newStatus,
            statusDetail: `${background[0]},${background[1]},${background[2]},${background[3]},${pattern}`,
        });
    }, [status, mutate, background, pattern, dispatch, id]);

    useEffect(() => {
        setColor(darkTheme ? dark_colors : light_colors);
    }, [darkTheme]);

    useEffect(() => {
        setStatus(statusValue);
    }, [statusValue]);

    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
            className="device"
            style={{
                background: status
                    ? pattern === GadgetRgbRainbowPattern
                        ? 'conic-gradient(from 0deg at left, #00ffff 0%, #ff00ff 25%, #ffff00 50%, #00ff00 75%, #00ffff 100%)'
                        : `rgba(${background[0]}, ${background[1]}, ${background[2]}, 0.2)`
                    : color.element,
                border: status
                    ? `2px solid rgb(${background[0]},${background[1]},${background[2]})`
                    : '',
            }}
        >
            <section>
                <span>
                    <IconContext.Provider
                        value={{
                            size: '2.5em',
                            color: status ? color.button : 'gray',
                        }}
                    >
                        {brightnessPercent <= 25 ? (
                            <MdBrightness5 />
                        ) : brightnessPercent <= 50 ? (
                            <MdBrightness4 />
                        ) : brightnessPercent <= 75 ? (
                            <MdBrightness6 />
                        ) : (
                            <MdBrightness7 />
                        )}
                    </IconContext.Provider>
                    <p
                        style={{
                            marginLeft: '0.3rem',
                            color: status ? color.text : 'gray',
                        }}
                    >
                        {status ? `${brightnessPercent}%` : '---'}
                    </p>
                </span>

                <motion.span
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 1.0 }}
                    onClick={changeStatus}
                >
                    <IconContext.Provider
                        value={{
                            size: '2.5em',
                            color: status ? color.success : 'gray',
                        }}
                    >
                        <PiPowerFill />
                    </IconContext.Provider>
                </motion.span>
            </section>

            <section>
                <span>
                    <p style={{ color: status ? color.text : 'gray' }}>
                        {trimToNChars(currentDevice?.showName, 11)}
                    </p>
                    <p style={{ color: status ? color.text : 'gray' }}>
                        {trimToNChars(currentDevice?.deviceName, 11)}
                    </p>
                </span>
                <motion.span
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 1.0 }}
                    onClick={() => {
                        const backdropId = `${RGB_GADGET_EXPAND}_${id}`;
                        toggleBackDropOpen(
                            backdropId,
                            <RgbGadgetExpand
                                id={id}
                                defaultBrightness={brightnessPercent}
                                background={background}
                                darkTheme={darkTheme}
                                rgbGadgetExpandBackdropId={backdropId}
                                currentDeviceStatus={status}
                                currentAnimation={pattern}
                            />,
                            LandscapeSizeM,
                        );
                    }}
                >
                    <IconContext.Provider
                        value={{
                            size: '1.5em',
                            color: status ? color.text : 'gray',
                        }}
                    >
                        <VscSymbolColor />
                    </IconContext.Provider>
                </motion.span>
            </section>
        </motion.div>
    );
};

export default RgbGadget;
