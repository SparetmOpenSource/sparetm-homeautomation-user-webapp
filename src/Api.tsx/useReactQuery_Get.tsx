import { AxiosResponse } from 'axios';
import { QueryFunctionContext, useQuery, UseQueryOptions } from 'react-query';

export const useReactQuery_Get = (
    id: string | any[],
    fetchData: (context: QueryFunctionContext<any, any>) => Promise<AxiosResponse<any, any>> | unknown,
    optionsOrOnSuccess?: any | UseQueryOptions<any, any, any, any>,
    on_error?: (error: any) => void,
    fetch_on_click_status?: boolean,
    refetch_on_mount?: boolean,
    refetch_on_window_focus?: boolean,
    refetch_interval?: any,
    refetch_interval_in_background?: boolean,
    cache_time?: any,
    stale_time?: any,
): import('react-query').UseQueryResult<any, any> => {
    const isOptionsObject = typeof optionsOrOnSuccess === 'object' && optionsOrOnSuccess !== null;

    const queryOptions = isOptionsObject
        ? optionsOrOnSuccess
        : {
            refetchOnMount: refetch_on_mount,
            refetchOnWindowFocus: refetch_on_window_focus,
            onSuccess: optionsOrOnSuccess,
            onError: on_error,
            enabled: fetch_on_click_status,
            refetchInterval: refetch_interval,
            refetchIntervalInBackground: refetch_interval_in_background,
            cacheTime: cache_time,
            staleTime: stale_time,
        };

    return useQuery(id, fetchData, queryOptions);
};
