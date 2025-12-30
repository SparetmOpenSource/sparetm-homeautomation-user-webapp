import { catchError } from '../Utils/HelperFn';
import { api, getHeaderConfig } from './Axios';

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
    schedule: '/mda/api/v1/schedules',
    add_schedule: '/mda/api/v1/schedules?admin=',
    get_schedules: '/mda/api/v1/schedules?deviceId=',
};

export const getDeviceSchedules = async (deviceId: any, darkTheme: any) => {
    try {
        const response = await api.get(
            profileUrl.get_schedules + deviceId,
            getHeaderConfig,
        );
        return response;
    } catch (error) {
        catchError(error, darkTheme);
        throw new Error('Failed to fetch schedules');
    }
};

export const addDeviceSchedule = async (scheduleData: any, admin: any, darkTheme: any) => {
    try {
        const response = await api.post(
            profileUrl.add_schedule + admin,
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

