import { useLocation, useNavigate } from 'react-router-dom';
import './DeviceRoom.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import { useTheme } from '../../../Pages/ThemeProvider';
import Button from '../../Others/CustomButton/Button';
import { useAppDispatch, useAppSelector } from '../../../Features/ReduxHooks';
import { IconContext } from 'react-icons';
import { PiPlugsConnectedFill } from 'react-icons/pi';
import { TbPlugConnected } from 'react-icons/tb';
import { featureUrl, getAllDevices } from '../../../Api.tsx/CoreAppApis';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../Data/Enum';
import { displayToastify, invalidateQueries } from '../../../Utils/HelperFn';
import DeviceGrid from '../../Others/Grid/DeviceGrid';
import { useReactQuery_Get } from '../../../Api.tsx/useReactQuery_Get';
import { SELECT_DEVICE_LIST_QUERY_ID } from '../../../Data/QueryConstant';
import { useQueryClient } from 'react-query';
import { addFirstRoom } from '../../../Features/Room/RoomSlice';
import LoadingFade from '../../Others/LoadingAnimation/LoadingFade';
import ErrorPage from './../../../Components/Others/ErrorPage/ErrorPage';
import { addDeviceData } from '../../../Features/Device/DeviceSlice';
import { ERROR_MSG, RoutePath } from '../../../Data/Constants';
import { FaPowerOff } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { usePatchUpdateData } from '../../../Api.tsx/useReactQuery_Update';
import { updateHeaderConfig } from '../../../Api.tsx/Axios';

const DeviceRoom = () => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const profileData = useAppSelector(
        (state: any) => state?.user?.profileData,
    );

    const admin = useAppSelector((state: any) => state?.user?.admin);
    const profile = useAppSelector((state: any) => state?.user?.profile);
    const roomType: any = location?.pathname
        ?.split('/')[3]
        ?.replace('%20', ' ');

    const { total, on, off } = useAppSelector(
        (state: any) =>
            state.device.roomCounts[roomType?.toLowerCase()] ?? {
                total: 0,
                on: 0,
                off: 0,
            },
    );
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const queryKeys = useMemo(() => [SELECT_DEVICE_LIST_QUERY_ID], []);
    const deviceFn = () => {
        return getAllDevices(admin, profile, darkTheme);
    };
    const on_fetch_device_Success = (data: any) => {
        dispatch(addDeviceData(data?.data?.body));
    };

    const { mutate } = usePatchUpdateData(
        `${featureUrl.update_all_device_status}${admin}&profilename=${profile}&roomtype=${roomType}`,
        updateHeaderConfig,
        () => {
            invalidateQueries(queryClient, queryKeys);
        },
        (error: any) => {
            displayToastify(
                error?.message,
                !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.ERROR,
            );
        },
    );

    const triggerAllDevices = useCallback(() => {
        const newStatus = on !== total;
        mutate({ status: newStatus, statusDetail: '' } as any);
    }, [mutate, on, total]);

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

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="deviceRoom">
            <section style={{ backgroundColor: color?.element }}>
                <span
                    className="deviceRoom-name"
                    style={{ color: color?.text }}
                >
                    {profile}'s Space
                </span>
                <span className="deviceRoom-btn" style={{ color: color?.text }}>
                    {profileData?.body?.room?.map((item: any) => (
                        <Button
                            key={item?.room_id}
                            label={item?.room_type}
                            textCol={
                                location?.pathname?.replace('%20', '') ===
                                `${
                                    RoutePath?.CoreApplication_Room
                                }/${item?.room_type
                                    ?.toLowerCase()
                                    ?.split(' ')
                                    ?.join('')}`
                                    ? color?.button
                                    : `${color?.icon_font?.split(')')[0]},0.7)`
                            }
                            backCol={color?.outer}
                            width="150px"
                            fn={() => {
                                invalidateQueries(queryClient, queryKeys);
                                dispatch(
                                    addFirstRoom(
                                        item?.room_type?.toLowerCase(),
                                    ),
                                );
                                navigate(
                                    `${
                                        RoutePath?.CoreApplication_Room
                                    }/${item?.room_type?.toLowerCase()}`,
                                );
                            }}
                            status={false}
                            border={
                                location?.pathname?.replace('%20', '') ===
                                `${
                                    RoutePath?.CoreApplication_Room
                                }/${item?.room_type
                                    ?.toLowerCase()
                                    ?.split(' ')
                                    ?.join('')}`
                                    ? color?.button
                                    : `${color?.icon?.split(')')[0]},0.7)`
                            }
                        />
                    ))}
                </span>
                <span
                    className="deviceRoom-status-btn"
                    style={{ color: color?.text }}
                >
                    <div title="Click to turn ON/OFF all devices">
                        <motion.span
                            whileHover={{ scale: 1.5 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => triggerAllDevices()}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '1.5em',
                                    color:
                                        on === total && total !== 0
                                            ? color?.success
                                            : color?.icon_font,
                                }}
                            >
                                <FaPowerOff />
                            </IconContext.Provider>
                        </motion.span>
                        <p
                            style={{
                                color:
                                    on === total && total !== 0
                                        ? color?.text
                                        : color?.icon,
                            }}
                        >
                            {total}
                        </p>
                    </div>
                    <div title="Total turned ON devices">
                        <span>
                            <IconContext.Provider
                                value={{
                                    size: '1.5em',
                                    color: color?.success,
                                }}
                            >
                                <PiPlugsConnectedFill />
                            </IconContext.Provider>
                        </span>
                        <p>{on}</p>
                    </div>
                    <div title="Total turned OFF devices">
                        <span>
                            <IconContext.Provider
                                value={{
                                    size: '1.5em',
                                    color: color?.error,
                                }}
                            >
                                <TbPlugConnected />
                            </IconContext.Provider>
                        </span>
                        <p>{off}</p>
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
                    <div className="deviceRoom_isError">
                        <ErrorPage errMsg={ERROR_MSG} darkTheme={darkTheme} />
                    </div>
                )}
                {!isLoading && !isError && <DeviceGrid />}
            </section>
        </div>
    );
};

export default DeviceRoom;
