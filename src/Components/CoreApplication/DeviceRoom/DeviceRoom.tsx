import { useLocation, useNavigate } from 'react-router-dom';
import './DeviceRoom.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import { useTheme } from '../../../Pages/ThemeProvider';
import Button from '../../Shared/CommonComponents/CustomButton/Button';
import { useAppDispatch, useAppSelector } from '../../../Features/ReduxHooks';
import { IconContext } from 'react-icons';
import { PiPlugsConnectedFill } from 'react-icons/pi';
import { TbPlugConnected } from 'react-icons/tb';
import { featureUrl, useDeviceListData } from '../../../Api.tsx/CoreAppApis';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../Data/Enum';
import { displayToastify, invalidateQueries } from '../../../Utils/HelperFn';
import DeviceGrid from '../../Shared/CoreAppComponents/Grid/DeviceGrid';
import { SELECT_DEVICE_LIST_QUERY_ID } from '../../../Data/QueryConstant';
import { useQueryClient } from 'react-query';
import { addFirstRoom } from '../../../Features/Room/RoomSlice';
import LoadingFade from '../../Shared/CommonComponents/LoadingAnimation/LoadingFade';
import ErrorPage from '../../Shared/CommonComponents/ErrorPage/ErrorPage';
import { ERROR_MSG, RoutePath } from '../../../Data/Constants';
import { FaPowerOff } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { updateHeaderConfig } from '../../../Api.tsx/Axios';
import { useDeviceMutation } from '../../../Hooks/useDeviceMutation';


const DeviceRoom = () => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
    const profileData = useAppSelector(
        (state: any) => state?.user?.profileData,
    );

    const admin = useAppSelector((state: any) => state?.user?.admin);
    const profile = useAppSelector((state: any) => state?.user?.profile);
    const roomType: any = location?.pathname
        ?.split('/')[3]
        ?.replace('%20', ' ');

    useEffect(() => {
        if (!roomType && profileData?.room?.[0]?.room_type) {
            navigate(
                `${RoutePath.CoreApplication_Room}/${profileData.room[0].room_type.toLowerCase()}`,
                { replace: true }
            );
        }
    }, [roomType, profileData, navigate]);

    const roomCounts = useAppSelector(
        (state: any) => state.device.roomCounts[roomType?.toLowerCase()],
    );

    const { total, on, off } = useMemo(
        () => roomCounts ?? { total: 0, on: 0, off: 0 },
        [roomCounts],
    );
    const queryKeys = useMemo(() => [SELECT_DEVICE_LIST_QUERY_ID], []);

    const { mutate } = useDeviceMutation(
        `${featureUrl.update_all_device_status}${admin}&profileName=${profile}&roomType=${roomType}`,
        updateHeaderConfig,
        () => {
            invalidateQueries(queryClient, queryKeys);
        },
    );

    const triggerAllDevices = useCallback(() => {
        if (total === 0) {
            displayToastify(
                'No device found!',
                !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.WARN,
            );
            return;
        }
        const newStatus = on !== total;
        mutate({ status: newStatus, statusDetail: '' } as any);
    }, [mutate, on, total, darkTheme]);

    const { isLoading, isError } = useDeviceListData(admin, profile, darkTheme);

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
                    {profileData?.room?.map((item: any) => (
                        <Button
                            key={item?.room_id}
                            label={item?.room_type}
                            textCol={
                                location?.pathname?.replace('%20', '') ===
                                    `${RoutePath?.CoreApplication_Room
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
                                dispatch(
                                    addFirstRoom(
                                        item?.room_type?.toLowerCase(),
                                    ),
                                );
                                navigate(
                                    `${RoutePath?.CoreApplication_Room
                                    }/${item?.room_type?.toLowerCase()}`,
                                );
                            }}
                            status={false}
                            border={
                                location?.pathname?.replace('%20', '') ===
                                    `${RoutePath?.CoreApplication_Room
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
