import { catchError, displayToastify } from '../Utils/HelperFn';
import { api, getHeaderConfig } from './Axios';
import { useReactQuery_Get } from './useReactQuery_Get';
import { useAppDispatch } from '../Features/ReduxHooks';
import { addFirstRoom } from '../Features/Room/RoomSlice';
import { addProfileData } from '../Features/User/UserSlice';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../Data/Enum';
import { GET_PROFILE_QUERY_ID, SELECT_CITY_LIST_QUERY_ID, SELECT_STATE_LIST_QUERY_ID, SELECT_COUNTRY_LIST_QUERY_ID, SELECT_PROFILE_QUERY_ID } from '../Data/QueryConstant';

export const successMessage = {
    profile_added:
        'Your profile successfully added. Redirecting to select profile section',
};

export const profileUrl = {
    get_location: '/mpa/api/v1/profiles/location',
    get_all_profiles: '/mpa/api/v1/profiles/all?admin=',
    get_all_device_instance_url: '/mda/api/v1/devices/websocket/url',
    get_profile: '/mpa/api/v1/profiles?id=',
    add_profile: '/mpa/api/v1/profiles?admin=',
    add_mqtt: '/mpa/api/v1/profiles/mqtt/cred?admin=',
    get_mqtt_cred: '/mpa/api/v1/profiles/mqtt/cred?admin=',
    get_spotify_access_token: '/mpa/api/v1/profiles/spotify/token',
    get_spotify_refresh_access_token: '/mpa/api/v1/profiles/spotify/token/refresh',
    schedule: '/mda/api/v1/devices/schedules',
    add_schedule: '/mda/api/v1/devices/schedules?admin=',
    get_schedules: '/mda/api/v1/devices/schedules?deviceId=',
};

export const getDeviceSchedules = async (deviceId: any, admin: any, profileName: any, darkTheme: any) => {
    try {
        const response = await api.get(
            profileUrl.get_schedules + deviceId + `&admin=${admin}&profileName=${profileName}`,
            getHeaderConfig,
        );
        return response;
    } catch (error) {
        catchError(error, darkTheme);
        throw new Error('Failed to fetch schedules');
    }
};

export const addDeviceSchedule = async (scheduleData: any, admin: any, profileName: any, darkTheme: any) => {
    try {
        const response = await api.post(
            profileUrl.add_schedule + admin + `&profileName=${profileName}`,
            scheduleData,
            getHeaderConfig,
        );
        return response;
    } catch (error) {
        catchError(error, darkTheme);
        throw new Error('Failed to add schedule');
    }
};

export const deleteDeviceSchedule = async (scheduleId: any, darkTheme: any) => {
    try {
        const response = await api.delete(
            profileUrl.schedule + '/' + scheduleId,
            getHeaderConfig,
        );
        return response;
    } catch (error) {
        catchError(error, darkTheme);
        throw new Error('Failed to delete schedule');
    }
};

export const getProfiles = async (appUser: any, darkTheme: any) => {
    try {
        const response = await api.get(
            profileUrl.get_all_profiles + appUser,
            getHeaderConfig,
        );
        return response;
    } catch (error) {
        catchError(error, darkTheme);
        throw new Error('Failed to fetch user profile');
    }
};

export const getStateList = async (
    headerOptions: any,
    country: any,
    darkTheme: any,
) => {
    try {
        const response = await api.get(
            profileUrl.get_location + `?data=state&cnt_iso2=${country}`,
            headerOptions,
        );
        return response;
    } catch (error) {
        catchError(error, darkTheme);
        throw new Error('Failed to fetch state list');
    }
};

export const getCityList = async (
    headerOptions: any,
    country: any,
    state: any,
    darkTheme: any,
) => {
    try {
        const response = await api.get(
            profileUrl.get_location + `?data=city&cnt_iso2=${country}&st_iso2=${state}`,
            headerOptions,
        );
        return response;
    } catch (error) {
        catchError(error, darkTheme);
        throw new Error('Failed to fetch city list');
    }
};

export const getCountryList = async (headerOptions: any, darkTheme: any) => {
    try {
        const response = await api.get(profileUrl.get_location + `?data=country`, headerOptions);
        return response;
    } catch (error) {
        catchError(error, darkTheme);
        throw new Error('Failed to fetch country list');
    }
};

export const getWebSocketUrl = async () => {
    try {
        const response = await api.get(
            profileUrl.get_all_device_instance_url,
            getHeaderConfig,
        );
        return response;
    } catch (error) {
        throw new Error('Failed to fetch websocket server url');
    }
};

export const getProfile = async (profileId: any, darkTheme: any) => {
    try {
        const response = await api.get(
            `${profileUrl.get_profile}${profileId}`,
            getHeaderConfig,
        );
        return response;
    } catch (error) {
        catchError(error, darkTheme);
        throw new Error('Failed to fetch mqtt credentials');
    }
};

export const useProfileData = (profileId: any, darkTheme: any) => {
    const dispatch = useAppDispatch();

    return useReactQuery_Get(
        GET_PROFILE_QUERY_ID,
        () => getProfile(profileId, darkTheme),
        {
            enabled: !!profileId,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            staleTime: 300000,
            cacheTime: 300000,
            onSuccess: (data: any) => {
                if (data?.data && data?.data?.body) {
                    dispatch(addProfileData(data?.data?.body));
                    const firstRoomType = data?.data?.body?.room?.[0]?.room_type?.toLowerCase();
                    if (firstRoomType) dispatch(addFirstRoom(firstRoomType));
                }
            },
            onError: (error: any) => {
                displayToastify(
                    error?.response?.data?.message || 'Failed to load profile',
                    darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
                    TOASTIFYSTATE.ERROR,
                );
            }
        }
    );
};

export const useCountryList = (headerOptions: any, darkTheme: any) => {
    return useReactQuery_Get(
        SELECT_COUNTRY_LIST_QUERY_ID,
        () => getCountryList(headerOptions, darkTheme),
        {
            enabled: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 300000,
            onError: (error: any) => displayToastify(error?.message, !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.ERROR)
        }
    );
};

export const useStateList = (headerOptions: any, countryIso: any, darkTheme: any) => {
    return useReactQuery_Get(
        SELECT_STATE_LIST_QUERY_ID,
        () => getStateList(headerOptions, countryIso, darkTheme),
        {
            enabled: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 0,
            onError: (error: any) => displayToastify(error?.message, !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.ERROR)
        }
    );
};

export const useCityList = (headerOptions: any, countryIso: any, stateIso: any, darkTheme: any) => {
    return useReactQuery_Get(
        SELECT_CITY_LIST_QUERY_ID,
        () => getCityList(headerOptions, countryIso, stateIso, darkTheme),
        {
            enabled: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 0,
            onError: (error: any) => displayToastify(error?.message, !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.ERROR)
        }
    );
};

export const useAllProfiles = (admin: any, darkTheme: any) => {
    return useReactQuery_Get(
        SELECT_PROFILE_QUERY_ID,
        () => getProfiles(admin, darkTheme),
        {
            enabled: true,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 0,
            onError: (error: any) => catchError(error, darkTheme),
        }
    );
};

