import { useMutation } from 'react-query';
import { api } from './Axios';

export const usePostUpdateData = (
    url: string,
    updateHeaderConfig: any,
    on_Success: any,
    on_Error: any,
) => {
    return useMutation(
        (data: any) => {
            return api.post(url, data, updateHeaderConfig);
        },
        {
            onSuccess: on_Success,
            onError: on_Error,
        },
    );
};

export const usePutUpdateData = (
    url: string,
    updateHeaderConfig: any,
    on_Success: any,
    on_Error: any,
) => {
    return useMutation(
        (data: any) => {
            return api.put(url, data, updateHeaderConfig);
        },
        {
            onSuccess: on_Success,
            onError: on_Error,
        },
    );
};

export const usePatchUpdateData = (
    url: string,
    updateHeaderConfig: any,
    on_Success: any,
    on_Error: any,
) => {
    return useMutation(
        (data: any) => {
            return api.patch(url, data, updateHeaderConfig);
        },
        {
            onSuccess: on_Success,
            onError: on_Error,
        },
    );
};

export const useDeleteData = (
    url: string,
    updateHeaderConfig: any,
    on_Success: any,
    on_Error: any,
) => {
    return useMutation(
        (id: any) => {
            return api.delete(url.replace('%id%', id), updateHeaderConfig);
        },
        {
            onSuccess: on_Success,
            onError: on_Error,
        },
    );
};

/////////

//     const { mutate: seekPosition } = usePostUpdateData(
//         featureUrl.spotify_base_url + '?data=seek',
//         updateHeaderConfig,
//         on_success_for_seek,
//         on_error_for_seek,
// );
