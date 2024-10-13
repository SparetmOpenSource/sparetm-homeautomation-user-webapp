import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './CoreApplicationDeviceRoomWrapper.css';
import { FcPlus, FcRefresh } from 'react-icons/fc';
import { IconContext } from 'react-icons';
// import { TbPremiumRights } from 'react-icons/tb';
import { useQueryClient } from 'react-query';
import { catchError } from '../../../../Utils/HelperFn';
import {
    getAllDevices,
    useDeleteDevice,
} from '../../../../Api.tsx/CoreAppApis';
import { useReactQuery_Get } from '../../../../Api.tsx/useReactQuery_Get';
import LoadingFade from '../../../Others/LoadingAnimation/LoadingFade';
import {
    getAppAdminUser,
    getProfileName,
} from '../../../../Utils/ProfileConfigHelperFn';
import { GET_DEVICE_LIST_IN_COREAPPLICATIONDEVICEROOMCLASS } from '../../../../Data/QueryConstant';
import { deviceTypeArr } from '../../../../Data/Constants';
import ApplianceDevice from '../Device/ApplianceDevice';
import GadgetDevice from '../Device/GadgetDevice';
import InformationBackdropModel from '../../../Others/BackdropModel/InformationBackdropModel/InformationBackdropModel';
import AddColorToRgbModel from '../AddColorToRgbModel/AddColorToRgbModel';
import AddDeviceBackdropModel from '../AddDeviceBackdropModel/AddDeviceBackdropModel';
import DeviceInfoWrapper from '../DeviceInfo/DeviceInfoWrapper';
import { useTheme } from '../../../../Pages/ThemeProvider';

const CoreApplicationDeviceRoomWrapper = ({
    setDeviceOn,
    setDeviceOff,
    setTotalDevice,
}: // mqttCredDetails,
any) => {
    const location = useLocation();
    const adminName = getAppAdminUser();
    const profileName = getProfileName();
    const queryClient = useQueryClient();
    const darkTheme: any = useTheme();
    const roomType: any = location.pathname.split('/')[3].replace('%20', ' ');

    /*************************************BACKDROP*************************************/

    const [currentSelectedDeviceId, setCurrentSelectedDeviceId]: any =
        useState();

    const [infoModelOpen, setInfoModelOpen]: any = useState(false);
    const openInfoModel = () => {
        setInfoModelOpen(true);
    };
    const closeInfoModel = () => {
        setInfoModelOpen(false);
    };

    const [addColorToRgbModelOpen, setAddColorToRgbModelOpen]: any =
        useState(false);
    const openAddColorToRgbModel = () => {
        setAddColorToRgbModelOpen(true);
    };
    const closeAddColorToRgbModel = () => {
        setAddColorToRgbModelOpen(false);
    };

    const [addDeviceModelOpen, setAddDeviceModelOpen]: any = useState(false);
    const openAddDeviceModel = () => {
        setAddDeviceModelOpen(true);
    };
    const closeAddDeviceModel = () => {
        setAddDeviceModelOpen(false);
    };

    /*************************************BACKDROP*************************************/

    /*************************/

    const onError = (error: any) => {
        // catchError(error);
    };
    const { mutate } = useDeleteDevice(
        adminName,
        profileName,
        onError,
        closeInfoModel,
    );

    /*************************/

    /*{----------------------------------------------------------------------------------------------------------}*/

    const deviceFn = () => {
        return getAllDevices(adminName, profileName, darkTheme);
    };
    const on_Success = (data: any) => {
        setTotalDevice(
            data?.data?.body?.filter(
                (el: any) =>
                    el.roomType.toLowerCase() === roomType.toLowerCase(),
            ).length,
        );
    };
    const on_Error = (error: any) => {
        // catchError(error);
    };

    const { isLoading, data } = useReactQuery_Get(
        GET_DEVICE_LIST_IN_COREAPPLICATIONDEVICEROOMCLASS,
        deviceFn,
        on_Success,
        on_Error,
        true, // !fetch_On_Click_Status
        true, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        300000, // Cache time
        0, // Stale Time
    );

    /*{----------------------------------------------------------------------------------------------------------}*/

    const refreshDeviceList = () => {
        queryClient.invalidateQueries(
            GET_DEVICE_LIST_IN_COREAPPLICATIONDEVICEROOMCLASS,
        );
    };

    useEffect(() => {
        setDeviceOn(
            data?.data?.body?.filter(
                (el: any) =>
                    el.roomType.toLowerCase() === roomType.toLowerCase() &&
                    el.status === true,
            ).length,
        );
        setDeviceOff(
            data?.data?.body?.filter(
                (el: any) =>
                    el.roomType.toLowerCase() === roomType.toLowerCase() &&
                    el.status === false,
            ).length,
        );
    });

    let currentDevice = data?.data?.body?.filter(
        (el: any) => el.deviceId === currentSelectedDeviceId,
    )[0];

    return (
        <div className="coreAppDeviceRoomWrapper">
            <div className="coreAppDeviceRoomWrapper_container">
                <section>
                    <input
                        type="text"
                        placeholder="Search with device name..."
                    />
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => refreshDeviceList()}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                            }}
                        >
                            <FcRefresh />
                        </IconContext.Provider>
                    </motion.div>
                    {/* <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color: 'orange',
                            }}
                        >
                            <TbPremiumRights />
                        </IconContext.Provider>
                    </motion.div> */}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openAddDeviceModel()}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                            }}
                        >
                            <FcPlus />
                        </IconContext.Provider>
                    </motion.div>
                </section>
                {isLoading && (
                    <section className="coreAppDeviceRoomWrapper_container_isLoading">
                        <LoadingFade />
                    </section>
                )}
                {!isLoading &&
                    data?.data?.body?.filter(
                        (el: any) =>
                            el.roomType.toLowerCase() ===
                            roomType.toLowerCase(),
                    ).length !== 0 && (
                        <section className="coreAppDeviceRoomWrapper_container_isLoaded_deviceFound">
                            {data?.data?.body
                                ?.filter(
                                    (el: any) =>
                                        el.roomType.toLowerCase() ===
                                            roomType.toLowerCase() &&
                                        el.deviceType
                                            .toLowerCase()
                                            .split('/')[0] ===
                                            deviceTypeArr[0].toLowerCase(),
                                )
                                .map((item: any) => (
                                    <GadgetDevice
                                        key={item.deviceId}
                                        showName={item.showName}
                                        deviceName={item.deviceName}
                                        deviceType={item.deviceType}
                                        statusValue={item.status}
                                        statusDetail={item.statusDetail}
                                        id={item.deviceId}
                                        adminName={item.adminName}
                                        profileName={item.profileName}
                                        roomType={item.roomType}
                                        // mqttCredDetails={mqttCredDetails}
                                        openAddColorToRgbModel={
                                            openAddColorToRgbModel
                                        }
                                        setCurrentSelectedDeviceId={
                                            setCurrentSelectedDeviceId
                                        }
                                    />
                                ))}
                            {data?.data?.body
                                ?.filter(
                                    (el: any) =>
                                        el.roomType.toLowerCase() ===
                                            roomType.toLowerCase() &&
                                        el.deviceType
                                            .toLowerCase()
                                            .split('/')[0] ===
                                            deviceTypeArr[1].toLowerCase(),
                                )
                                .map((item: any) => (
                                    <ApplianceDevice
                                        key={item.deviceId}
                                        showName={item.showName}
                                        deviceName={item.deviceName}
                                        deviceType={item.deviceType}
                                        statusValue={item.status}
                                        id={item.deviceId}
                                        openInfoModel={openInfoModel}
                                        adminName={item.adminName}
                                        profileName={item.profileName}
                                        roomType={item.roomType}
                                        // mqttCredDetails={mqttCredDetails}
                                        setCurrentSelectedDeviceId={
                                            setCurrentSelectedDeviceId
                                        }
                                    />
                                ))}
                        </section>
                    )}
                {!isLoading &&
                    data?.data?.body?.filter(
                        (el: any) =>
                            el.roomType.toLowerCase() ===
                            roomType.toLowerCase(),
                    ).length === 0 && (
                        <section className="coreAppDeviceRoomWrapper_container_isLoaded_deviceNotFound">
                            <h1
                                style={{
                                    color: 'red',
                                }}
                            >
                                DEVICE NOT FOUND
                            </h1>
                            <span
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <p>Please click on above</p> &nbsp;
                                <IconContext.Provider
                                    value={{
                                        size: '2em',
                                    }}
                                >
                                    <FcPlus />
                                </IconContext.Provider>
                                &nbsp; <p>button to add your device</p>
                            </span>
                        </section>
                    )}
            </div>

            {/***********************************BACKDROP*********************************/}

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {infoModelOpen && (
                    <InformationBackdropModel
                        backgroundColor="linear-gradient(69.5deg, rgba(189, 73, 255, 0.5) 18.6%, rgb(254, 76, 227,0.5) 85.9%)"
                        handleClose={closeInfoModel}
                    >
                        <DeviceInfoWrapper
                            currentDevice={currentDevice}
                            deleteDevice={mutate}
                        />
                    </InformationBackdropModel>
                )}
            </AnimatePresence>

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {addDeviceModelOpen && (
                    <InformationBackdropModel
                        backgroundColor="linear-gradient(69.5deg, rgba(189, 73, 255, 0.5) 18.6%, rgb(254, 76, 227,0.5) 85.9%)"
                        handleClose={closeAddDeviceModel}
                    >
                        <AddDeviceBackdropModel
                            closeAddDeviceModel={closeAddDeviceModel}
                        />
                    </InformationBackdropModel>
                )}
            </AnimatePresence>

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {addColorToRgbModelOpen && (
                    <InformationBackdropModel
                        backgroundColor="linear-gradient(69.5deg, rgba(189, 73, 255, 0.5) 18.6%, rgb(254, 76, 227,0.5) 85.9%)"
                        handleClose={closeAddColorToRgbModel}
                    >
                        <AddColorToRgbModel
                            closeAddColorToRgbModel={closeAddColorToRgbModel}
                            // mqttCredDetails={mqttCredDetails}
                            currentDevice={currentDevice}
                        />
                    </InformationBackdropModel>
                )}
            </AnimatePresence>

            {/***********************************BACKDROP*********************************/}
        </div>
    );
};

export default CoreApplicationDeviceRoomWrapper;
