import { useEffect, useState } from 'react';
import './Information.css';
import { dark_colors, light_colors } from '../../../../../Data/ColorConstant';
import { format } from 'date-fns';
import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';
import { MdOutlineDataSaverOff } from 'react-icons/md';
import { HiOutlineInformationCircle } from 'react-icons/hi2';
import { IoCopyOutline } from 'react-icons/io5';
import {
    copyText,
    displayToastify,
    invalidateQueries,
} from '../../../../../Utils/HelperFn';
import { FcFullTrash } from 'react-icons/fc';
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
    DEVICE_CARD_DELETE_DEVICE_CONFIRMATION,
    LandscapeSizeS,
} from '../../../../../Data/Constants';
import { updateHeaderConfig } from '../../../../../Api.tsx/Axios';
// import { VscSymbolColor } from 'react-icons/vsc';
// import RgbGadgetExpand from '../RgbGadgetExpand';

const Information = ({
    deviceTopic,
    deviceType,
    createdAt,
    updatedAt,
    id,
    darkTheme,
    isRemoteActive,
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
        `${featureUrl.del_device}%id%&admin=${admin}&profilename=${profile}`,
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
                    {isRemoteActive && (
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
                                <TbDeviceRemote />
                            </IconContext.Provider>
                        </motion.span>
                    )}
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
                            <MdOutlineDataSaverOff />
                        </IconContext.Provider>
                    </motion.span>

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
                    {/* {props?.isRgbWindowActive && (
                        <motion.span
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                toggleBackDropOpen();
                                setChildForCustomBackDrop(
                                    <RgbGadgetExpand
                                        darkTheme={props?.darkTheme}
                                        defaultBrightness={props?.brightness}
                                        background={props?.background}
                                        roomType={props?.roomType}
                                        id={props?.id}
                                        backDropClose={toggleBackDropClose}
                                        deviceTopic={props?.deviceTopic}
                                        deviceType={props?.deviceType}
                                        createdAt={props?.createdAt}
                                        updatedAt={props?.updatedAt}
                                    />,
                                );
                                setSizeForCustomBackDrop(LandscapeSizeM);
                            }}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2em',
                                    color: 'gray',
                                }}
                            >
                                <VscSymbolColor />
                            </IconContext.Provider>
                        </motion.span>
                    )} */}
                </span>
                <span></span>
            </section>

            {infoWindowCount === 0 && (
                <section>
                    <div className="device-information-content">
                        <span style={{ color: color?.text }}>Created</span>
                        <span
                            style={{
                                backgroundColor: color?.inner,
                                color: color?.text,
                            }}
                        >
                            {format(new Date(createdAt), 'PPPPpp')}
                        </span>
                    </div>
                    <div className="device-information-content">
                        <span style={{ color: color?.text }}>Updated</span>
                        <span
                            style={{
                                backgroundColor: color?.inner,
                                color: color?.text,
                            }}
                        >
                            {format(new Date(updatedAt), 'PPPPpp')}
                        </span>
                    </div>
                    <div className="device-information-content">
                        <span style={{ color: color?.text }}>Type</span>
                        <span
                            style={{
                                backgroundColor: color?.inner,
                                color: color?.text,
                            }}
                        >
                            {deviceType.split('/')[0]}
                        </span>
                    </div>
                    <div className="device-information-content-topic">
                        <span style={{ color: color?.text }}>Topic</span>
                        <span
                            style={{
                                backgroundColor: color?.inner,
                                color: color?.text,
                            }}
                        >
                            {deviceTopic}
                        </span>
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
                    </div>
                    <div className="device-information-content">
                        <span style={{ color: color?.text }}>
                            Click to delete
                        </span>
                        <motion.span
                            whileHover={{ scale: 0.95 }}
                            whileTap={{ scale: 0.9 }}
                            // onClick={() => handleDelete()}
                            // onClick={() => {
                            //     toggleBackDropOpen();
                            //     setChildForCustomBackDrop(
                            //         <Confirmation
                            //             darkTheme={darkTheme}
                            //             heading={
                            //                 'You want to delete this device, Are you sure?'
                            //             }
                            //             btnOkFn={() => {
                            //                 toggleBackDropClose();
                            //                 handleDelete();
                            //             }}
                            //             btnCancelFn={() =>
                            //                 toggleBackDropClose()
                            //             }
                            //             btnOkLabel="Yes"
                            //             btnCancelLabel="Cancel"
                            //         />,
                            //     );
                            //     setSizeForCustomBackDrop(LandscapeSizeS);
                            // }}
                            onClick={() => {
                                const backdropId =
                                    DEVICE_CARD_DELETE_DEVICE_CONFIRMATION; // Unique ID for this backdrop

                                toggleBackDropOpen(
                                    backdropId,
                                    <Confirmation
                                        darkTheme={darkTheme}
                                        heading="You want to delete this device, Are you sure?"
                                        btnOkFn={() => {
                                            toggleBackDropClose(backdropId);
                                            handleDelete();
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
                                backgroundColor: 'rgb(142,38,34)',
                                color: color?.text,
                            }}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2.5em',
                                    color: 'white',
                                }}
                            >
                                <FcFullTrash />
                            </IconContext.Provider>
                        </motion.span>
                    </div>
                </section>
            )}
            {infoWindowCount === 1 && <section>graph</section>}
            {isRemoteActive && infoWindowCount === 2 && (
                <section>remote</section>
            )}
        </div>
    );
};
export default Information;
