import { motion } from 'framer-motion';
import './DeviceCard.css';
import { useEffect, useState } from 'react';
import { useBackDropOpen, useTheme } from '../../../../Pages/ThemeProvider';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { VscSymbolColor } from 'react-icons/vsc';
import { IconContext } from 'react-icons';
import { PiPowerFill } from 'react-icons/pi';
import { MdBrightness5 } from 'react-icons/md';
import { MdBrightness4 } from 'react-icons/md';
import { MdBrightness6 } from 'react-icons/md';
import { MdBrightness7 } from 'react-icons/md';
import { LandscapeSizeM } from '../../../../Data/Constants';
import RgbGadgetExpand from './RgbGadgetExpand';
import { GadgetRgbDefaultColor } from '../../../../Data/DeviceRoomConstant';
import {
    ConvertTheRangeToRound,
    displayToastify,
} from '../../../../Utils/HelperFn';
import { featureUrl } from '../../../../Api.tsx/CoreAppApis';
import { usePatchUpdateData } from '../../../../Api.tsx/useReactQuery_Update';
import { useAppSelector } from '../../../../Features/ReduxHooks';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../Data/Enum';

const RgbGadget = ({
    statusDetail,
    statusValue,
    roomType,
    showName,
    deviceName,
    deviceTopic,
    deviceType,
    createdAt,
    updatedAt,
    id,
}: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const [status, setStatus] = useState<boolean>(false);
    const admin = useAppSelector((state: any) => state?.user?.admin);
    const profile = useAppSelector((state: any) => state?.user?.profile);
    const animationType = statusDetail
        ? statusDetail.split(',')[4]
        : GadgetRgbDefaultColor[4];
    const [brightness, setBrightness] = useState<number>(0.75);
    const darkTheme: any = useTheme();

    let background: any = statusDetail
        ? statusDetail.split(',')
        : [
              GadgetRgbDefaultColor[0],
              GadgetRgbDefaultColor[1],
              GadgetRgbDefaultColor[2],
              GadgetRgbDefaultColor[3],
          ];

    const {
        toggleBackDropOpen,
        toggleBackDropClose,
        setChildForCustomBackDrop,
        setSizeForCustomBackDrop,
    } = useBackDropOpen();

    const onSuccess = () => {};
    const onError = (error: any) => {
        displayToastify(
            error?.message,
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    };
    const { mutate } = usePatchUpdateData(
        `${featureUrl.update_device}${admin}&profilename=${profile}&roomtype=${roomType}&id=${id}`,
        onSuccess,
        onError,
    );

    const changeStatus = () => {
        setStatus((prev: boolean) => !prev);
        mutate({
            status: !status,
            statusDetail: `${background[0]},${background[1]},${background[2]},${background[3]},${animationType}`,
        } as any);
    };

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setBrightness(
            ConvertTheRangeToRound(
                parseFloat(statusDetail?.split(',')[3]),
                0,
                1,
                0,
                100,
            ),
        );
    }, [statusDetail]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setStatus(statusValue);
    }, [statusValue, statusDetail]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
            className="device"
            style={{
                backgroundColor: status
                    ? `rgb(${background[0]},${background[1]},${background[2]},0.2)`
                    : color?.element,
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
                            color: status ? color?.button : 'gray',
                        }}
                    >
                        {brightness <= 25 ? (
                            <MdBrightness5 />
                        ) : brightness > 25 && brightness <= 50 ? (
                            <MdBrightness4 />
                        ) : brightness > 50 && brightness <= 75 ? (
                            <MdBrightness6 />
                        ) : (
                            <MdBrightness7 />
                        )}
                    </IconContext.Provider>
                    <p
                        style={{
                            marginLeft: '0.3rem',
                            color: status ? color?.text : 'gray',
                        }}
                    >
                        {status ? `${brightness}%` : '---'}
                    </p>
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
                    <p style={{ color: status ? color?.text : 'gray' }}>
                        {showName}
                    </p>
                    <p style={{ color: status ? color?.text : 'gray' }}>
                        {deviceName}
                    </p>
                </span>
                <motion.span
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 1.0 }}
                    onClick={() => {
                        toggleBackDropOpen();
                        setChildForCustomBackDrop(
                            <RgbGadgetExpand
                                darkTheme={darkTheme}
                                defaultBrightness={brightness}
                                background={background}
                                roomType={roomType}
                                id={id}
                                backDropClose={toggleBackDropClose}
                                deviceTopic={deviceTopic}
                                deviceType={deviceType}
                                createdAt={createdAt}
                                updatedAt={updatedAt}
                            />,
                        );
                        setSizeForCustomBackDrop(LandscapeSizeM);
                    }}
                >
                    <IconContext.Provider
                        value={{
                            size: '1.5em',
                            color: status ? color?.text : 'gray',
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
