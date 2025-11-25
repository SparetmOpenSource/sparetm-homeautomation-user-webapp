import { useEffect, useState } from 'react';
import './Information.css';
import { dark_colors, light_colors } from '../../../../../Data/ColorConstant';
import { format, isValid } from 'date-fns';
import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';
import { MdOutlineDataSaverOff } from 'react-icons/md';
import { HiOutlineInformationCircle } from 'react-icons/hi2';
import { IoCopyOutline } from 'react-icons/io5';
import { AiTwotoneDelete } from 'react-icons/ai';
import {
    copyText,
    displayToastify,
    invalidateQueries,
    trimToNChars,
} from '../../../../../Utils/HelperFn';
import { TbDeviceRemote } from 'react-icons/tb';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../Data/Enum';
import { useDeleteData } from '../../../../../Api.tsx/useReactQuery_Update';
import { featureUrl } from '../../../../../Api.tsx/CoreAppApis';
import { useAppSelector } from '../../../../../Features/ReduxHooks';
import { useQueryClient } from 'react-query';
import { SELECT_DEVICE_LIST_QUERY_ID } from '../../../../../Data/QueryConstant';
import { useBackDropOpen } from '../../../../../Pages/ThemeProvider';
import Confirmation from '../../../BackDrop/Confirmation/Confirmation';
import {
    ADMIN,
    DEVICE_CARD_DELETE_DEVICE_CONFIRMATION,
    ID,
    LandscapeSizeS,
    PROFILENAMEKEY,
} from '../../../../../Data/Constants';
import { updateHeaderConfig } from '../../../../../Api.tsx/Axios';
import DeviceDataGraph from '../DeviceDataGraph/DeviceDataGraph';
import DeviceRemote from '../DeviceRemote/DeviceRemote';

const Information = ({
    id,
    deviceType,
    deviceTopic,
    createdAt,
    updatedAt,
    isRemoteActive,
    darkTheme,
    applianceExpandBackdropId,
    rgbGadgetExpandBackdropId,
    currentDeviceStatus,
}: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const [infoWindowCount, setInfoWindowCount] = useState<number>(0);
    const admin = useAppSelector((state: any) => state?.user?.admin);
    const profile = useAppSelector((state: any) => state?.user?.profile);
    const queryClient = useQueryClient();
    const queryKeys = [SELECT_DEVICE_LIST_QUERY_ID];

    const changeInfoWindow = (count: number) => {
        if (count === 0) {
            setInfoWindowCount(0);
        } else if (count === 1) {
            setInfoWindowCount(1);
        } else if (count === 2) {
            setInfoWindowCount(2);
        }
    };

    const safeFormatDate = (dateValue: any, fallback: string = 'N/A') => {
        if (!dateValue) return fallback;

        const date = new Date(dateValue);
        return isValid(date) ? format(date, 'PPPPpp') : fallback;
    };

    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();

    const onSuccess = () => {
        invalidateQueries(queryClient, queryKeys);
    };
    const onError = (error: any) => {
        displayToastify(
            error?.message,
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    };
    const { mutate } = useDeleteData(
        `${
            featureUrl.del_device
        }%${ID?.toLowerCase()}%&${ADMIN?.toLowerCase()}=${admin}&${PROFILENAMEKEY?.toLowerCase()}=${profile}`,
        updateHeaderConfig,
        onSuccess,
        onError,
    );

    const handleDelete = () => {
        mutate(id);
    };

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="device-information">
            <section className="device-information-content">
                <span
                    style={{
                        borderRadius: '1rem',
                        border: `2px solid ${color?.button}`,
                    }}
                >
                    <motion.span
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => changeInfoWindow(0)}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color:
                                    infoWindowCount === 0
                                        ? color?.button
                                        : 'gray',
                            }}
                        >
                            <HiOutlineInformationCircle />
                        </IconContext.Provider>
                    </motion.span>
                    {isRemoteActive && (
                        <motion.span
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => changeInfoWindow(1)}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2em',
                                    color:
                                        infoWindowCount === 1
                                            ? color?.button
                                            : 'gray',
                                }}
                            >
                                <TbDeviceRemote />
                            </IconContext.Provider>
                        </motion.span>
                    )}
                    <motion.span
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => changeInfoWindow(2)}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color:
                                    infoWindowCount === 2
                                        ? color?.button
                                        : 'gray',
                            }}
                        >
                            <MdOutlineDataSaverOff />
                        </IconContext.Provider>
                    </motion.span>
                </span>
                <span></span>
            </section>
            {infoWindowCount === 0 && (
                <section>
                    <div className="device-information-content device-information-content-div">
                        <span style={{ color: color?.text }}>Created</span>
                        <span
                            style={{
                                backgroundColor: color?.inner,
                                color: color?.text,
                            }}
                        >
                            {safeFormatDate(createdAt)}
                        </span>
                    </div>
                    <div className="device-information-content device-information-content-div">
                        <span style={{ color: color?.text }}>Updated</span>
                        <span
                            style={{
                                backgroundColor: color?.inner,
                                color: color?.text,
                            }}
                        >
                            {safeFormatDate(updatedAt)}
                        </span>
                    </div>
                    <div className="device-information-content device-information-content-div">
                        <span style={{ color: color?.text }}>Type</span>
                        <span
                            style={{
                                backgroundColor: color?.inner,
                                color: color?.text,
                            }}
                        >
                            {deviceType?.split('/')[0]}
                        </span>
                    </div>
                    <div className="device-information-content-topic device-information-content-div">
                        <span style={{ color: color?.text }}>Topic</span>
                        <span
                            style={{
                                backgroundColor: color?.inner,
                                color: color?.text,
                            }}
                        >
                            {trimToNChars(deviceTopic, 65)}
                            <motion.span
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => copyText(deviceTopic)}
                            >
                                <IconContext.Provider
                                    value={{
                                        size: '1.5em',
                                        color: color?.text,
                                    }}
                                >
                                    <IoCopyOutline />
                                </IconContext.Provider>
                            </motion.span>
                        </span>
                    </div>
                    <div className="device-information-content device-information-content-div">
                        <span style={{ color: color?.text }}>
                            Click to delete
                        </span>
                        <motion.span
                            whileHover={{ scale: 0.95 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                const backdropId = `${DEVICE_CARD_DELETE_DEVICE_CONFIRMATION}_${applianceExpandBackdropId}`;
                                toggleBackDropOpen(
                                    backdropId,
                                    <Confirmation
                                        darkTheme={darkTheme}
                                        heading="You want to delete this device, Are you sure?"
                                        btnOkFn={() => {
                                            if (currentDeviceStatus) {
                                                toggleBackDropClose(backdropId);
                                                toggleBackDropClose(
                                                    applianceExpandBackdropId,
                                                );
                                                toggleBackDropClose(
                                                    rgbGadgetExpandBackdropId,
                                                );
                                                displayToastify(
                                                    'Please turn off your device before deleting',
                                                    !darkTheme
                                                        ? TOASTIFYCOLOR.DARK
                                                        : TOASTIFYCOLOR.LIGHT,
                                                    TOASTIFYSTATE.WARN,
                                                );
                                            } else {
                                                toggleBackDropClose(backdropId);
                                                toggleBackDropClose(
                                                    applianceExpandBackdropId,
                                                );
                                                toggleBackDropClose(
                                                    rgbGadgetExpandBackdropId,
                                                );
                                                handleDelete();
                                            }
                                        }}
                                        btnCancelFn={() =>
                                            toggleBackDropClose(backdropId)
                                        }
                                        btnOkLabel="Yes"
                                        btnCancelLabel="Cancel"
                                    />,
                                    LandscapeSizeS,
                                );
                            }}
                            style={{
                                backgroundColor: `${
                                    color?.error?.split(')')[0]
                                },1)`,
                                color: color?.text,
                            }}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2.5em',
                                    color: 'black',
                                }}
                            >
                                <AiTwotoneDelete />
                            </IconContext.Provider>
                        </motion.span>
                    </div>
                </section>
            )}
            {isRemoteActive && infoWindowCount === 1 && (
                <section>
                    <DeviceRemote />
                </section>
            )}
            {infoWindowCount === 2 && (
                <section>
                    <DeviceDataGraph />
                </section>
            )}
        </div>
    );
};
export default Information;
