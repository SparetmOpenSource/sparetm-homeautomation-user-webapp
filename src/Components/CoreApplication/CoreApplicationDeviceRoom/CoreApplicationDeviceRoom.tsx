import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { MdOfflineBolt, MdPowerOff } from 'react-icons/md';
import { TfiPowerOff } from 'react-icons/tfi';
import { useQueryClient } from 'react-query';
import { useLocation, useOutletContext } from 'react-router-dom';
import './CoreApplicationDeviceRoom.css';
import { catchError, displayToastify } from '../../../Utils/HelperFn';
// import { getMqttCred } from '../../../Api.tsx/ProfileConfigApis';
// import { useReactQuery_Get } from '../../../Api.tsx/useReactQuery_Get';
import { useUpdateAllDeviceStatus } from '../../../Api.tsx/CoreAppApis';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../Data/Enum';
// import LoadingFade from '../../Others/LoadingAnimation/LoadingFade';
import {
    getAppAdminUser,
    getProfileName,
} from '../../../Utils/ProfileConfigHelperFn';
import { GET_DEVICE_LIST_IN_COREAPPLICATIONDEVICEROOMCLASS } from '../../../Data/QueryConstant';
import CustomButtonLink from '../../Others/CustomButton/CustomButtonLink';
import CoreApplicationDeviceRoomWrapper from './CoreApplicationDeviceRoomWrapper/CoreApplicationDeviceRoomWrapper';

const CoreApplicationDeviceRoom = () => {
    const location = useLocation();
    const profileName = getProfileName();
    const roomType: any = location.pathname.split('/')[3].replace('%20', ' ');
    const data: any = useOutletContext();
    const [allDeviceStatus, setAllDeviceStatus]: any = useState(false);
    const [deviceOn, setDeviceOn] = useState(0);
    const [deviceOff, setDeviceOff] = useState(0);
    const [totalDevice, setTotalDevice] = useState(0);
    // const [deviceOn] = useState(0);
    // const [deviceOff] = useState(0);
    // const [totalDevice] = useState(0);
    const queryClient = useQueryClient();
    const adminName = getAppAdminUser();

    /*{----------------------------------------------------------------------------------------------------------}*/

    // const mqttCredFn = () => {
    //     return getMqttCred(adminName);
    // };
    // const on_MqttCred_Success = () => {};
    // const on_MqttCred_Error = (error: any) => {
    //     catchError(error);
    // };

    // const { isLoading, data: mqttCredData } = useReactQuery_Get(
    //     GET_MQTT_CRED_IN_COREAPPLICATIONDEVICEROOMCLASS,
    //     mqttCredFn,
    //     on_MqttCred_Success,
    //     on_MqttCred_Error,
    //     true, // !fetch_On_Click_Status
    //     true, // refetch_On_Mount
    //     false, // refetch_On_Window_Focus
    //     false, // refetch_Interval
    //     false, // refetch_Interval_In_Background
    //     300000, // Cache time
    //     0, // Stale Time
    // );

    /*{----------------------------------------------------------------------------------------------------------}*/

    /*************************/

    const onError = (error: any) => {
        catchError(error);
    };

    const { mutate } = useUpdateAllDeviceStatus(
        adminName,
        profileName,
        roomType,
        onError,
    );

    /*************************/

    const refreshDeviceList = () => {
        queryClient.invalidateQueries(
            GET_DEVICE_LIST_IN_COREAPPLICATIONDEVICEROOMCLASS,
        );
    };

    const handleButtonClick = () => {
        if (totalDevice !== 0) {
            setAllDeviceStatus(!allDeviceStatus);
            handleAllDeviceStatus();
        } else {
            displayToastify(
                'Please add your device first',
                TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.WARN,
            );
        }
    };

    /************************************************************* */

    const handleAllDeviceStatus = () => {
        mutate({
            status: !allDeviceStatus,
            statusDetail: ' ',
        } as any);
        !allDeviceStatus
            ? displayToastify(
                  'Turning ON all devices',
                  TOASTIFYCOLOR.LIGHT,
                  TOASTIFYSTATE.INFO,
              )
            : displayToastify(
                  'Turning OFF all devices',
                  TOASTIFYCOLOR.LIGHT,
                  TOASTIFYSTATE.INFO,
              );
    };

    /************************************************************* */

    useEffect(() => {
        deviceOn === totalDevice && totalDevice !== 0
            ? setAllDeviceStatus(true)
            : setAllDeviceStatus(false);
    }, [deviceOn, totalDevice, roomType]);

    return (
        <div className="coreAppDeviceRoom">
            <section className="coreAppDeviceRoom_nav">
                <div>
                    <span>{profileName}'s Home</span>
                </div>
                <div>
                    {data?.room?.map((el: any) => (
                        <CustomButtonLink
                            to={`/app/room/${el?.room_type}`}
                            key={el?.room_id}
                            label={el?.room_type}
                            active={
                                location?.pathname?.replace('%20', '') ===
                                `/app/room/${el?.room_type
                                    ?.split(' ')
                                    ?.join('')}`
                                    ? true
                                    : false
                            }
                            fn={refreshDeviceList}
                        />
                    ))}
                </div>
                <div>
                    {/*  Bottom 3 status buttons START*/}
                    <span>
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleButtonClick()}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2em',
                                    color: allDeviceStatus
                                        ? 'lightgreen'
                                        : 'grey',
                                }}
                            >
                                <TfiPowerOff />
                            </IconContext.Provider>
                        </motion.div>
                        <br />
                        {totalDevice}
                    </span>
                    <span>
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color: 'green',
                            }}
                        >
                            <MdOfflineBolt />
                        </IconContext.Provider>
                        <br />
                        {deviceOn}
                    </span>
                    <span>
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color: 'rgb(207,81,81)',
                            }}
                        >
                            <MdPowerOff />
                        </IconContext.Provider>
                        <br />
                        {deviceOff}
                    </span>
                    {/*  Bottom 3 status buttons END*/}
                </div>
            </section>
            <section className="coreAppDeviceRoom_wrapper">
                {/* {isLoading && (
                    <div className="coreAppDeviceRoom_wrapper_isLoading">
                        <LoadingFade />
                    </div>
                )} */}
                {/* {!isLoading && (
                    <CoreApplicationDeviceRoomWrapper
                        setDeviceOn={setDeviceOn}
                        setDeviceOff={setDeviceOff}
                        setTotalDevice={setTotalDevice}
                        mqttCredDetails={mqttCredData?.data?.body}
                    />
                )} */}
                <CoreApplicationDeviceRoomWrapper
                    setDeviceOn={setDeviceOn}
                    setDeviceOff={setDeviceOff}
                    setTotalDevice={setTotalDevice}
                    // mqttCredDetails={mqttCredData?.data?.body}
                />
            </section>
        </div>
    );
};

export default CoreApplicationDeviceRoom;
