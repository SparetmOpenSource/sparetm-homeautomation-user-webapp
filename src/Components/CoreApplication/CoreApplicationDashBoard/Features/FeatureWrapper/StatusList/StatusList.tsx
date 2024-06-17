import { useState } from 'react';
import './StatusList.css';
import { SlRefresh } from 'react-icons/sl';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import DeviceStatus from './DeviceStatus/DeviceStatus';
import {
    getAppAdminUser,
    getProfileName,
} from '../../../../../../Utils/ProfileConfigHelperFn';
import { catchError, displayToastify } from '../../../../../../Utils/HelperFn';
import { useReactQuery_Get } from '../../../../../../Api.tsx/useReactQuery_Get';
import { getActiveDeviceList } from '../../../../../../Api.tsx/CoreAppApis';
import LoadingFade from '../../../../../Others/LoadingAnimation/LoadingFade';
import DeviceStatusNotFound from './DeviceStatus/DeviceStatusNotFound';
import { useQueryClient } from 'react-query';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../../Data/Enum';

const StatusList = () => {
    const queryClient = useQueryClient();
    const appUser = getAppAdminUser();
    const profileName = getProfileName();
    const [statusVisibility, setStatusVisibility]: any = useState(1);
    const onClickFn = (num: any) => {
        setStatusVisibility(num);
    };

    const refreshDeviceList = () => {
        displayToastify(
            'Refreshing device',
            TOASTIFYCOLOR.DARK,
            TOASTIFYSTATE.INFO,
        );
        queryClient.invalidateQueries('get_widget_device_status');
    };

    const profileFn = () => {
        return getActiveDeviceList(appUser, profileName);
    };
    const on_Success = () => {};
    const on_Error = (error: any) => {
        catchError(error);
    };

    const { isLoading, data } = useReactQuery_Get(
        'get_widget_device_status',
        profileFn,
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

    return (
        <div className="statusList-wrapper">
            {isLoading && (
                <div className="statusList-wrapper_isLoading">
                    <LoadingFade />
                </div>
            )}
            <div className="statusList-container">
                {!isLoading &&
                    typeof data?.data?.body !== 'undefined' &&
                    data?.data?.body.length === 0 && (
                        <div className="statusList-notFound-message">
                            <h1>DEVICE NOT FOUND</h1>
                            <p>
                                Please <b>ADD</b> your device
                            </p>
                        </div>
                    )}

                {!isLoading &&
                    typeof data?.data?.body !== 'undefined' &&
                    data?.data?.body.length !== 0 &&
                    data?.data?.body?.map((item: any) => (
                        <span key={item?.id}>
                            <input
                                className="statusList-input"
                                type="radio"
                                name="slide"
                                id={item?.id}
                                checked={
                                    statusVisibility === item?.barCount
                                        ? true
                                        : false
                                }
                            />
                            <label
                                className="statusList-card"
                                onClick={() => onClickFn(item?.barCount)}
                            >
                                {statusVisibility !== item?.barCount && (
                                    <span className="statusList-card-float-label">
                                        <p>{item?.roomLabel}</p>
                                        <span
                                            style={{
                                                height: `${
                                                    item?.barStatus?.split(
                                                        '.',
                                                    )[0]
                                                }%`,
                                            }}
                                        ></span>
                                    </span>
                                )}
                                {statusVisibility === item?.barCount &&
                                    item?.deviceCount !== 0 && (
                                        <DeviceStatus
                                            room={item?.id}
                                            roomLabel={item?.roomLabel}
                                            active={item?.deviceActive}
                                            totalDevice={item?.deviceCount}
                                            inactive={
                                                item?.deviceCount -
                                                item?.deviceActive
                                            }
                                        />
                                    )}
                                {statusVisibility === item?.barCount &&
                                    item?.deviceCount === 0 && (
                                        <DeviceStatusNotFound />
                                    )}
                                {statusVisibility === item?.barCount && (
                                    <div className="statusList-row">
                                        <motion.div
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="statusList-icon"
                                            onClick={() => refreshDeviceList()}
                                        >
                                            <IconContext.Provider
                                                value={{
                                                    size: '1.7em',
                                                    color: 'lavender',
                                                }}
                                            >
                                                <SlRefresh />
                                            </IconContext.Provider>
                                        </motion.div>
                                        <div className="statusList-description">
                                            <p>
                                                {item?.deviceCount !== 0
                                                    ? '%COUNT% devices added in %ROOM%'
                                                          .replace(
                                                              '%ROOM%',
                                                              item?.roomLabel,
                                                          )
                                                          .replace(
                                                              '%COUNT%',
                                                              item?.deviceCount,
                                                          )
                                                          .trim()
                                                    : 'No device found in %ROOM%'.replace(
                                                          '%ROOM%',
                                                          item?.roomLabel,
                                                      )}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </label>
                        </span>
                    ))}
            </div>
        </div>
    );
};

export default StatusList;
