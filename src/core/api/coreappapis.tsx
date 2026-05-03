import { useMutation, useQueryClient } from 'react-query';
import { weather_quote_constant } from '../../data/constants';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../data/enum';
import { addDeviceData } from '../../features/devices/store/device/deviceslice';
import { catchError, displayToastify } from '../../utils/helperfn';
import { useAppDispatch } from '../store/reduxhooks';
import { api, getHeaderConfig, updateHeaderConfig } from './axios';
import { useReactQuery_Get } from './usereactquery_get';
import { useDeleteData, usePatchUpdateData, usePostUpdateData } from './usereactquery_update';
import { GET_DEVICE_SCHEDULES_QUERY_ID } from '../../data/queryconstant';
import { getDeviceSchedules } from './profileconfigapis';

export const featureUrl = {
    get_weather_quote_1: '/mpa/api/v1/profiles/features?id=',
    get_weather_quote_2: `&data=weather&unit=metric&quotelimit=${weather_quote_constant.quote_char_limit}`,
    get_todo_list: `/mpa/api/v1/profiles/features?id=%profileId%&data=todo`,
    del_todo_list: '/mpa/api/v1/profiles/features/todo?id=',
    add_todo_list: `/mpa/api/v1/profiles/features/todo?id=`,
    update_todo_list: `/mpa/api/v1/profiles/features/todo?id=`,
    schedule: '/mda/api/v1/devices/schedules',
    add_schedule: '/mda/api/v1/devices/schedules?admin=',
    get_schedules: '/mda/api/v1/devices/schedules?deviceId=',
    get_active_device_list: `/mda/api/v1/devices/active?admin=`,
    add_device: `/mda/api/v1/devices?admin=`,
    get_all_devices: `/mda/api/v1/devices/all?admin=`,
    get_devices: `/mda/api/v1/devices/per/room?admin=`,
    update_device: `/mda/api/v1/devices?id=`,
    del_device: `/mda/api/v1/devices?id=`,
    update_all_device_status: `/mda/api/v1/devices/all?admin=`,
    update_device_data_store: `/mda/api/v1/devices/data?id=`,
    remove_device_data_store: `/mda/api/v1/devices/data/remove?id=`,
    spotify_base_url: `/mpa/api/v1/profiles/spotify`,
    mqtt_connect: `/mda/api/v1/devices/mqtt/connect`,
    get_mqtt_config: `/mda/api/v1/devices/mqtt/config/`,
    del_mqtt_config: `/mda/api/v1/devices/mqtt/config/`,
    mqtt_reconnect: `/mda/api/v1/devices/mqtt/reconnect/lastconfig`,
};

export const getWeatherQuote = async (profileId: any, darkTheme: any) => {
    try {
        const response = await api.get(
            featureUrl.get_weather_quote_1 +
            profileId +
            featureUrl.get_weather_quote_2,
            getHeaderConfig,
        );
        return response;
    } catch (error) {
        throw new Error('Failed to fetch weather and quote');
    }
};

export const useWeatherQuoteData = (profileId: any, darkTheme: any) => {
    return useReactQuery_Get(
        'SELECT_WEATHER_QUOTE_QUERY_ID',
        () => getWeatherQuote(profileId, darkTheme),
        {
            enabled: !!profileId,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchInterval: weather_quote_constant.fetch_delay_time,
            refetchIntervalInBackground: false,
            cacheTime: 300000,
            staleTime: 300000,
            onError: (error: any) => catchError(error, darkTheme),
        }
    );
};

export const getAllDevices = async (
    admin: any,
    profile: any,
    darkTheme: any,
) => {
    try {
        const response = await api.get(
            `${featureUrl.get_all_devices}${admin}&profileName=${profile}`,
            getHeaderConfig,
        );
        return response;
    } catch (error) {
        throw new Error('Failed to fetch device details');
    }
};

export const useDeviceListData = (admin: any, profile: any, darkTheme: any) => {
    const dispatch = useAppDispatch();

    return useReactQuery_Get(
        'SELECT_DEVICE_LIST_QUERY_ID',
        () => getAllDevices(admin, profile, darkTheme),
        {
            enabled: !!(admin && profile),
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 300000,
            onSuccess: (data: any) => {
                dispatch(addDeviceData(data?.data?.data));
            },
            onError: (error: any) => {
                displayToastify(
                    error?.message,
                    !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                    TOASTIFYSTATE.ERROR,
                );
            }
        }
    );
};

/*************************Fetch todo list*******************************/
export const getTodoList = async (profileId: any) => {
    return await api.get(
        featureUrl.get_todo_list.replace('%profileId%', profileId),
        getHeaderConfig,
    );
};

/*************************Delete todo list*******************************/
export const delTodoList = async (todoId: any) => {
    return await api.get(featureUrl.del_todo_list + todoId);
};

export const getActiveDeviceList = async (appUser: any, profileName: any) => {
    return await api.get(
        featureUrl.get_active_device_list +
        appUser +
        `&profileName=${profileName}`,
        getHeaderConfig,
    );
};

export const useDeleteTodo = (on_Error: any, closeDeleteTodo: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (todoId) => {
            return api.delete(
                featureUrl.del_todo_list + todoId,
                updateHeaderConfig,
            );
        },
        {
            onSuccess: () => {
                closeDeleteTodo();
                queryClient.invalidateQueries('get_todo_list');
            },
            onError: on_Error,
        },
    );
};

/*************************Add todo list*******************************/
export const useAddTodo = (profileId: any, on_Error: any, closeFn: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data) => {
            return api.post(
                featureUrl.add_todo_list + profileId,
                data,
                updateHeaderConfig,
            );
        },
        {
            onSuccess: () => {
                closeFn();
                queryClient.invalidateQueries('get_todo_list');
            },
            onError: on_Error,
        },
    );
};

/*************************Update todo list*******************************/
export const useUpdateTodo = (todoId: any, on_Error: any, handleClose: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data) => {
            return api.patch(
                featureUrl.update_todo_list + todoId,
                data,
                updateHeaderConfig,
            );
        },
        {
            onSuccess: () => {
                handleClose();
                queryClient.invalidateQueries('get_todo_list');
            },
            onError: on_Error,
        },
    );
};

/*************************Add device details*******************************/
export const useAddDevice = (
    admin: any,
    profileName: any,
    roomType: any,
    on_Success: any,
    on_Error: any,
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data: any) => {
            const url = roomType 
                ? `${featureUrl.add_device}${admin}&profileName=${profileName}&roomType=${roomType}`
                : `${featureUrl.add_device}${admin}&profileName=${profileName}`;
            return api.post(
                url,
                data,
                updateHeaderConfig,
            );
        },
        {
            onSuccess: () => {
                on_Success();
                queryClient.invalidateQueries('get_device_list');
            },
            onError: on_Error,
        },
    );
};

/*************************Fetch Devices*******************************/

export const getDevices = async (
    admin: any,
    profileName: any,
    roomType: any,
) => {
    return await api.get(
        `${featureUrl.get_devices}${admin}&profileName=${profileName}&roomType=${roomType}`,
        getHeaderConfig,
    );
};

/*************************Update device*******************************/
export const useUpdateDevice = (
    admin: any,
    profileName: any,
    roomType: any,
    id: any,
    on_Error: any,
    setDeviceStatus: any,
    setToggleStatus: any,
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data) => {
            return api.patch(
                `${featureUrl.update_device}${admin}&profileName=${profileName}&roomType=${roomType}&id=${id}`,
                data,
                updateHeaderConfig,
            );
        },
        {
            onSuccess: (data: any) => {
                setDeviceStatus(data?.data.data.status);
                setToggleStatus(data?.data.data.status);
                queryClient.invalidateQueries('get_device_list');
            },
            onError: on_Error,
        },
    );
};

/*************************Update device status*******************************/
export const useUpdateDeviceStatus = (
    admin: any,
    profileName: any,
    roomType: any,
    id: any,
    on_Error: any,
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data) => {
            return api.patch(
                `${featureUrl.update_device}${admin}&profileName=${profileName}&roomType=${roomType}&id=${id}`,
                data,
                updateHeaderConfig,
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('get_device_list');
            },
            onError: on_Error,
        },
    );
};

/*************************Update all device status*******************************/
export const useUpdateAllDeviceStatusWidget = (
    admin: any,
    profileName: any,
    roomType: any,
    on_Error: any,
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data) => {
            return api.patch(
                `${featureUrl.update_all_device_status}${admin}&profileName=${profileName}&roomType=${roomType}`,
                data,
                updateHeaderConfig,
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('get_widget_device_status');
            },
            onError: on_Error,
        },
    );
};

/************************* Update device store data *******************************/

export const useUpdateDeviceStoreData = (deviceId: any, on_Error: any, on_Success?: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data) => {
            return api.patch(
                featureUrl.update_device_data_store + deviceId,
                data,
                updateHeaderConfig,
            );
        },
        {
            onSuccess: (data: any) => {
                queryClient.invalidateQueries('get_device_list');
                if (on_Success) on_Success(data);
            },
            onError: on_Error,
        },
    );
};

/************************* Update device store data *******************************/

export const useDeleteDeviceStoreData = (deviceId: any, on_Error: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data) => {
            return api.patch(
                featureUrl.remove_device_data_store + deviceId,
                data,
                updateHeaderConfig,
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('get_device_list');
            },
            onError: on_Error,
        },
    );
};

/*************************Delete device*******************************/

export const useDeleteDevice = (
    admin: any,
    profileName: any,
    on_Error: any,
    closeDeleteDevice: any,
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (deviceId) => {
            return api.delete(
                `${featureUrl.del_device}${deviceId}&admin=${admin}&profileName=${profileName}`,
                updateHeaderConfig,
            );
        },
        {
            onSuccess: () => {
                closeDeleteDevice();
                queryClient.invalidateQueries('get_device_list');
            },
            onError: on_Error,
        },
    );
};

/*************************Get MQTT Config*******************************/
export const getMqttConfig = async (admin: string) => {
    try {
        const response = await api.get(
            featureUrl.get_mqtt_config + admin,
            getHeaderConfig,
        );
        return response;
    } catch (error) {
        throw new Error('Failed to fetch mqtt configuration');
    }
};

export const useGetDeviceSchedules = (deviceId: any, admin: any, profile: any, darkTheme: boolean, onSuccess?: any) => {
    return useReactQuery_Get(
        GET_DEVICE_SCHEDULES_QUERY_ID,
        () => getDeviceSchedules(deviceId, admin, profile, darkTheme),
        {
            enabled: !!(deviceId && admin && profile),
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 0,
            onSuccess,
            onError: (error: any) => {
                console.error('Failed to fetch schedules', error);
            }
        }
    );
};

export const useAddDeviceSchedule = (admin: any, profile: any, darkTheme: boolean, onSuccess: any) => {
    return usePostUpdateData(
        featureUrl.add_schedule + admin + `&profileName=${profile}`,
        getHeaderConfig,
        onSuccess,
        (error: any) => catchError(error, darkTheme)
    );
};

export const useDeleteDeviceSchedule = (darkTheme: boolean, onSuccess: any) => {
    return useDeleteData(
        featureUrl.schedule + '/%id%',
        getHeaderConfig,
        onSuccess,
        (error: any) => catchError(error, darkTheme)
    );
};

export const useGetMqttConfig = (admin: string, darkTheme: boolean, onSuccess: any, onError: any, enabled: boolean = true) => {
    return useReactQuery_Get(
        'get_mqtt_config',
        () => getMqttConfig(admin),
        {
            enabled: enabled && !!admin,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 0,
            retry: false,
            onSuccess,
            onError,
        }
    );
};

export const useConnectMqtt = (darkTheme: boolean, onSuccess: any, onError: any) => {
    return usePostUpdateData(
        featureUrl.mqtt_connect,
        updateHeaderConfig,
        onSuccess,
        onError
    );
};

export const useDeleteMqttConfig = (darkTheme: boolean, onSuccess: any, onError: any) => {
    return useDeleteData(
        featureUrl.del_mqtt_config + '%id%',
        updateHeaderConfig,
        onSuccess,
        onError
    );
};

export const useUpdateDeviceFanRemote = (id: any, onSuccess: any, onError: any) => {
    return usePatchUpdateData(
        `${featureUrl.update_device}${id}`,
        updateHeaderConfig,
        onSuccess,
        onError
    );
};

export const useUpdateDeviceAcRemote = (id: any, onSuccess: any, onError: any) => {
    return usePatchUpdateData(
        `${featureUrl.update_device}${id}`,
        updateHeaderConfig,
        onSuccess,
        onError
    );
};