import { AxiosResponse } from 'axios';
import { QueryFunctionContext, useQuery } from 'react-query';

// return const {isLoading, data, isError, error, isFetching}
export const useReactQuery_Get = (
    id: string,
    fetchData: {
        (): Promise<AxiosResponse<any, any>>;
        (context: QueryFunctionContext<any, any>): unknown;
    },
    on_success: (data: any) => void,
    on_error: (error: any) => void,
    fetch_on_click_status: boolean,
    refetch_on_mount: boolean,
    refetch_on_window_focus: boolean,
    refetch_interval: any,
    refetch_interval_in_background: boolean,
    cache_time: any,
    stale_time: any,
) => {
    return useQuery(id, fetchData, {
        refetchOnMount: refetch_on_mount, //true(default),false,always
        refetchOnWindowFocus: refetch_on_window_focus, //true(default),false,always
        onSuccess: on_success,
        onError: on_error,
        enabled: fetch_on_click_status,
        refetchInterval: refetch_interval, // default false. ms - 2000(2 sec). Fetch after every 2 sec. this will work only when window is in focus.
        refetchIntervalInBackground: refetch_interval_in_background, // to support 'refetchInterval' in background without window focus.
        cacheTime: cache_time, //Default time is 5min.
        staleTime: stale_time, // Default time is 0sec. time after isFetching will trigger
    });
};
