import { useMutation, useQueryClient } from 'react-query';
import { api, postHeaderConfig, getHeaderConfig } from './Axios';
import { weather_quote_constant } from '../Data/Constants';

export const featureUrl = {
    get_weather_quote_1: '/mpa/api/v1/profiles/features?id=',
    get_weather_quote_2: `&data=weather&unit=metric&quotelimit=${weather_quote_constant.quote_char_limit}`,
    // get_todo_list_1: `/mpa/api/v1/profiles/features?id=`,
    // get_todo_list_2: `&data=todo`,
    get_todo_list: `/mpa/api/v1/profiles/features?id=%profileId%&data=todo`,
    del_todo_list: '/mpa/api/v1/profiles/features/todo?id=',
    add_todo_list: `/mpa/api/v1/profiles/features/todo?id=`,
    update_todo_list: `/mpa/api/v1/profiles/features/todo?id=`,
    add_device: `/mda/api/v1/devices?admin=`,
    get_all_devices: `/mda/api/v1/devices/all?admin=`,
    get_devices: `/mda/api/v1/devices?admin=`,
    update_device: `/mda/api/v1/devices?admin=`,
    del_device: `/mda/api/v1/devices?id=`,
    update_all_device_status: `/mda/api/v1/devices/all/status?admin=`,
    update_device_data_store: `/mda/api/v1/devices/data?id=`,
    delete_device_data_store: `/mda/api/v1/devices/data/remove?id=`,
};

/*************************Fetch weather and quotes*******************************/
export const getWeatherQuote = async (profileId: any) => {
    return await api.get(
        featureUrl.get_weather_quote_1 +
            profileId +
            featureUrl.get_weather_quote_2,
        getHeaderConfig,
    );
};

/*************************Fetch todo list*******************************/
export const getTodoList = async (profileId: any) => {
    return await api.get(
        // featureUrl.get_todo_list_1 + profileId + featureUrl.get_todo_list_2,
        featureUrl.get_todo_list.replace("%profileId%", profileId),  
        getHeaderConfig,
    );
};

/*************************Delete todo list*******************************/
export const delTodoList = async (todoId: any) => {
    return await api.get(featureUrl.del_todo_list + todoId);
};

export const useDeleteTodo = (on_Error: any, closeDeleteTodo: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (todoId) => {
            return api.delete(
                featureUrl.del_todo_list + todoId,
                postHeaderConfig,
            );
        },
        {
            onSuccess: () => {
                // toast.success(`Deleted todo`);
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
                postHeaderConfig,
            );
        },
        {
            onSuccess: () => {
                // toast.success(`Added todo`);
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
                postHeaderConfig,
            );
        },
        {
            onSuccess: () => {
                // toast.success(`Updated todo`);
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
    on_Error: any,
    closeFn: any,
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data) => {
            return api.post(
                `${featureUrl.add_device}${admin}&profilename=${profileName}`,
                data,
                postHeaderConfig,
            );
        },
        {
            onSuccess: () => {
                // toast.success(`Added device`);
                closeFn();
                queryClient.invalidateQueries('get_device_list');
            },
            onError: on_Error,
        },
    );
};

/*************************Fetch Devices*******************************/
export const getAllDevices = async (admin: any, profileName: any) => {
    return await api.get(
        `${featureUrl.get_all_devices}${admin}&profilename=${profileName}`,
        getHeaderConfig,
    );
};

export const getDevices = async (
    admin: any,
    profileName: any,
    roomType: any,
) => {
    return await api.get(
        `${featureUrl.get_devices}${admin}&profilename=${profileName}&roomtype=${roomType}`,
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
                `${featureUrl.update_device}${admin}&profilename=${profileName}&roomtype=${roomType}&id=${id}`,
                data,
                postHeaderConfig,
            );
        },
        {
            onSuccess: (data: any) => {
                setDeviceStatus(data?.data.body.status);
                setToggleStatus(data?.data.body.status);
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
                `${featureUrl.update_device}${admin}&profilename=${profileName}&roomtype=${roomType}&id=${id}`,
                data,
                postHeaderConfig,
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
export const useUpdateAllDeviceStatus = (
    admin: any,
    profileName: any,
    roomType: any,
    on_Error: any,
) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data) => {
            return api.patch(
                `${featureUrl.update_all_device_status}${admin}&profilename=${profileName}&roomtype=${roomType}`,
                data,
                postHeaderConfig,
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

/************************* Update device store data *******************************/

export const useUpdateDeviceStoreData = (deviceId: any, on_Error: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data) => {
            return api.patch(
                featureUrl.update_device_data_store + deviceId,
                data,
                postHeaderConfig,
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

/************************* Update device store data *******************************/

export const useDeleteDeviceStoreData = (deviceId: any, on_Error: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data) => {
            return api.patch(
                featureUrl.delete_device_data_store + deviceId,
                data,
                postHeaderConfig,
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

export const useDeleteDevice = (on_Error: any, closeDeleteDevice: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (deviceId) => {
            return api.delete(
                featureUrl.del_device + deviceId,
                postHeaderConfig,
            );
        },
        {
            onSuccess: () => {
                // toast.success(`Deleted device`);
                closeDeleteDevice();
                queryClient.invalidateQueries('get_device_list');
            },
            onError: on_Error,
        },
    );
};
