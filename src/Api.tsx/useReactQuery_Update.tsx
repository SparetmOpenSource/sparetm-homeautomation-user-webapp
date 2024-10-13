import { useMutation } from 'react-query';
import { api, postHeaderConfig } from './Axios';

export const useUpdateData = (url: string, on_Success: any, on_Error: any) => {
    return useMutation(
        (data: any) => {
            return api.post(url, data, postHeaderConfig);
        },
        {
            onSuccess: on_Success,
            onError: on_Error,
        },
    );
};

export const usePatchUpdateData = (
    url: string,
    on_Success: any,
    on_Error: any,
) => {
    return useMutation(
        (data: any) => {
            return api.patch(url, data, postHeaderConfig);
        },
        {
            onSuccess: on_Success,
            onError: on_Error,
        },
    );
};

export const useDeleteData = (url: string, on_Success: any, on_Error: any) => {
    return useMutation(
        (id: any) => {
            return api.delete(url.replace('%id%', id), postHeaderConfig);
        },
        {
            onSuccess: on_Success,
            onError: on_Error,
        },
    );
};
