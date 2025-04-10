import { useLocation, useNavigate } from 'react-router-dom';
import './DeviceRoom.css';
import { useEffect, useState } from 'react';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import { useTheme } from '../../../Pages/ThemeProvider';
import Button from '../../Others/CustomButton/Button';
import { useAppDispatch, useAppSelector } from '../../../Features/ReduxHooks';
// import { FiPower } from 'react-icons/fi';
import { IconContext } from 'react-icons';
// import { motion } from 'framer-motion';
import { PiPlugsConnectedFill } from 'react-icons/pi';
import { TbPlugConnected } from 'react-icons/tb';
import { getAllDevices } from '../../../Api.tsx/CoreAppApis';
// import { usePatchUpdateData } from '../../../Api.tsx/useReactQuery_Update';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../Data/Enum';
import { displayToastify, invalidateQueries } from '../../../Utils/HelperFn';
import DeviceGrid from '../../Others/Grid/DeviceGrid';
import { useReactQuery_Get } from '../../../Api.tsx/useReactQuery_Get';
import { SELECT_DEVICE_LIST_QUERY_ID } from '../../../Data/QueryConstant';
import { useQueryClient } from 'react-query';
import { addFirstRoom } from '../../../Features/Room/RoomSlice';
import LoadingFade from '../../Others/LoadingAnimation/LoadingFade';
import Error from './../../../Components/Others/ErrorPage/ErrorPage';
import { addDeviceData } from '../../../Features/Device/DeviceSlice';

const DeviceRoom = () => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const profileData = useAppSelector(
        (state: any) => state?.user?.profileData,
    );
    // const mqttUpdate = useAppSelector(
    //     (state: any) => state?.device?.mqttUpdate,
    // );
    const admin = useAppSelector((state: any) => state?.user?.admin);
    const profile = useAppSelector((state: any) => state?.user?.profile);
    const roomType: any = location.pathname.split('/')[3].replace('%20', ' ');
    //const [allDeviceStatus, setAllDeviceStatus]: any = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [deviceOn, setDeviceOn] = useState(0);
    const [deviceOff, setDeviceOff] = useState(0);
    //const [totalDevice, setTotalDevice] = useState(1);
    const queryKeys: any = [SELECT_DEVICE_LIST_QUERY_ID];
    const deviceFn = () => {
        return getAllDevices(admin, profile, darkTheme);
    };
    const on_fetch_device_Success = (data: any) => {
        // setTotalDevice(
        //     data?.data?.body?.filter(
        //         (el: any) =>
        //             el.roomType.toLowerCase() === roomType.toLowerCase(),
        //     ).length,
        // );
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
        dispatch(addDeviceData(data?.data));
    };

    const on_fetch_device_Error = (error: any) => {
        displayToastify(
            error?.message,
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    };

    const { isLoading, isError } = useReactQuery_Get(
        SELECT_DEVICE_LIST_QUERY_ID,
        deviceFn,
        on_fetch_device_Success,
        on_fetch_device_Error,
        true, // !fetch_On_Click_Status
        true, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        300000, // Cache time
        0, // Stale Time
    );

    // const on_Error = (error: any) => {
    //     displayToastify(
    //         error?.message,
    //         !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
    //         TOASTIFYSTATE.ERROR,
    //     );
    // };

    // const on_Success = () => {};
    // const { mutate } = usePatchUpdateData(
    //     `${featureUrl.update_all_device_status}${admin}&profilename=${profile}&roomtype=${roomType}`,
    //     on_Success,
    //     on_Error,
    // );

    // const mutateAllDeviceStatus = () => {
    //     mutate({
    //         status: !allDeviceStatus,
    //         statusDetail: ' ',
    //     } as any);
    //     !allDeviceStatus
    //         ? displayToastify(
    //               'Turning ON all devices',
    //               !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
    //               TOASTIFYSTATE.INFO,
    //           )
    //         : displayToastify(
    //               'Turning OFF all devices',
    //               !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
    //               TOASTIFYSTATE.INFO,
    //           );
    // };

    // const handlePowerBtnClick = () => {
    //     if (totalDevice !== 0) {
    //         setAllDeviceStatus(!allDeviceStatus);
    //         mutateAllDeviceStatus();
    //     } else {
    //         displayToastify(
    //             'Please add your device first',
    //             !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
    //             TOASTIFYSTATE.WARN,
    //         );
    //     }
    // };

    // useEffect(() => {
    //     deviceOn === totalDevice && totalDevice !== 0
    //         ? setAllDeviceStatus(true)
    //         : setAllDeviceStatus(false);
    // }, [deviceOn, totalDevice, roomType]);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     const update_type = mqttUpdate?.msg?.message?.split('/');
    //     if (update_type !== undefined && update_type[4] === admin) {
    //         invalidateQueries(queryClient, queryKeys);
    //         displayToastify(
    //             `Socket device (${update_type[3]})`,
    //             !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
    //             TOASTIFYSTATE.INFO,
    //         );
    //     }
    // }, [mqttUpdate]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="deviceRoom">
            <section style={{ backgroundColor: color?.element }}>
                <span
                    className="deviceRoom-intro"
                    style={{ color: color?.text }}
                >
                    {profile}'s Home
                </span>
                <span
                    className="deviceRoom-room-btn"
                    style={{ color: color?.text }}
                >
                    {profileData?.body?.room?.map((item: any) => (
                        <Button
                            key={item?.room_id}
                            label={item?.room_type}
                            textCol={
                                location?.pathname?.replace('%20', '') ===
                                `/app/room/${item?.room_type
                                    ?.split(' ')
                                    ?.join('')}`
                                    ? color?.button
                                    : `${color?.icon?.split(')')[0]},0.5)`
                            }
                            backCol={color?.outer}
                            backColOnDis={color?.inner}
                            width="150px"
                            fn={() => {
                                invalidateQueries(queryClient, queryKeys);
                                dispatch(addFirstRoom(item?.room_type));
                                navigate(`/app/room/${item?.room_type}`);
                            }}
                            status={false}
                            border={
                                location?.pathname?.replace('%20', '') ===
                                `/app/room/${item?.room_type
                                    ?.split(' ')
                                    ?.join('')}`
                                    ? color?.button
                                    : `${color?.icon?.split(')')[0]},0.5)`
                            }
                        />
                    ))}
                </span>
                <span
                    className="deviceRoom-generic-btn"
                    style={{ color: color?.text }}
                >
                    {/* <div>
                        <motion.span
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handlePowerBtnClick()}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '1.5em',
                                    color: allDeviceStatus
                                        ? color?.button
                                        : 'black',
                                }}
                            >
                                <FiPower />
                            </IconContext.Provider>
                        </motion.span>
                        <p>{totalDevice}</p>
                    </div> */}
                    <div>
                        <span onClick={() => {}}>
                            <IconContext.Provider
                                value={{
                                    size: '1.5em',
                                    color: color?.success,
                                }}
                            >
                                <PiPlugsConnectedFill />
                            </IconContext.Provider>
                        </span>
                        <p>{deviceOn}</p>
                    </div>
                    <div>
                        <span onClick={() => {}}>
                            <IconContext.Provider
                                value={{
                                    size: '1.5em',
                                    color: color?.error,
                                }}
                            >
                                <TbPlugConnected />
                            </IconContext.Provider>
                        </span>
                        <p>{deviceOff}</p>
                    </div>
                </span>
            </section>
            <section style={{ backgroundColor: color?.inner }}>
                {isLoading && (
                    <div className="deviceRoom_isLoading">
                        <LoadingFade />
                    </div>
                )}
                {!isLoading && isError && (
                    <div className="deviceRoom_error">
                        <Error
                            enableBtn={true}
                            navigate={navigate}
                            darkTheme={darkTheme}
                        />
                    </div>
                )}
                {!isLoading && !isError && <DeviceGrid />}
            </section>
        </div>
    );
};

export default DeviceRoom;
