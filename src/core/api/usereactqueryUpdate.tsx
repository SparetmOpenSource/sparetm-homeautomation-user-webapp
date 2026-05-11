import { useMutation } from 'react-query';
import { api } from './Axios';

export const usePostUpdateData = (
    url: string,
    updateHeaderConfig: any,
    on_Success: any,
    on_Error: any,
) => {
    return useMutation(
        (variables: any) => {
            const finalUrl = variables?.url || url;
            const finalData = variables?.url ? variables.data : variables;
            return api.post(finalUrl, finalData, updateHeaderConfig);
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
        (variables: any) => {
            const finalUrl = variables?.url || url;
            const finalData = variables?.url ? variables.data : variables;
            return api.put(finalUrl, finalData, updateHeaderConfig);
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
        (variables: any) => {
            const finalUrl = variables?.url || url;
            const finalData = variables?.url ? variables.data : variables;
            return api.patch(finalUrl, finalData, updateHeaderConfig);
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
