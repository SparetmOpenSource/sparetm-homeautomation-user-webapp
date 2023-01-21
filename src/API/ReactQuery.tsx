import { AxiosResponse } from 'axios';
import { QueryFunctionContext, useQuery } from 'react-query';

export const ReactQueryFetch = (
    id: string,
    fetchData: {
        (): Promise<AxiosResponse<any, any>>;
        (context: QueryFunctionContext<any, any>): unknown;
    },
    onSuccess: (data: any) => void,
    onError: (error: any) => void,
    status: boolean,
) => {
    return useQuery(id, fetchData, {
        refetchOnMount: true, //true(default),false,always
        refetchOnWindowFocus: false, //true(default),false,always
        onSuccess: onSuccess,
        onError: onError,
        enabled: status,
    });
};
