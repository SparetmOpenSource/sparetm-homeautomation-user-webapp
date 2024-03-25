import { AxiosResponse } from 'axios';
import { QueryFunctionContext, useQuery } from 'react-query';

// return const {isLoading, data, isError, error, isFetching}
export const useReactQuery_Get = (
    id: string,
    fetchData: {
        (): Promise<AxiosResponse<any, any>>;
        (context: QueryFunctionContext<any, any>): unknown;
    },
    on_Success: (data: any) => void,
    on_Error: (error: any) => void,
    fetch_On_Click_Status: boolean,
    refetch_On_Mount: boolean,
    refetch_On_Window_Focus: boolean,
    refetch_Interval: any,
    refetch_Interval_In_Background: boolean,
    cache_Time: any,
    stale_Time: any,
) => {
    return useQuery(id, fetchData, {
        refetchOnMount: refetch_On_Mount, //true(default),false,always
        refetchOnWindowFocus: refetch_On_Window_Focus, //true(default),false,always
        onSuccess: on_Success,
        onError: on_Error,
        enabled: fetch_On_Click_Status,
        refetchInterval: refetch_Interval, // default false. ms - 2000(2 sec). Fetch after every 2 sec. this will work only when window is in focus.
        refetchIntervalInBackground: refetch_Interval_In_Background, // to support 'refetchInterval' in background without window focus.
        cacheTime: cache_Time, //Default time is 5min.
        staleTime: stale_Time, // Default time is 0sec. time after isFetching will trigger
    });
};
