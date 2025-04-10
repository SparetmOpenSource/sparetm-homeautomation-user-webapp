import { catchError } from '../Utils/HelperFn';
import { api, getHeaderConfig, updateHeaderConfig } from './Axios';
import { useMutation, useQueryClient } from 'react-query';

export const successMessage = {
    profile_added:
        'Your profile successfully added. Redirecting to select profile section',
};

export const CountryStateCityApiKey =
    'bEltb0FxY3dhajRDa3NxS1JMcUpMZ3ZDemV3emtBdzdIcm1Fa292bg==';

export const cityCountryState_headers = {
    headers: {
        Accept: 'application/json',
        'X-CSCAPI-KEY': CountryStateCityApiKey,
    },
};

export const profileUrl = {
    get_location: '/mpa/api/v1/profiles/location',
    // get_city:
    //     'https://api.countrystatecity.in/v1/countries/%cntry%/states/%stat%/cities ',
    // get_state: 'https://api.countrystatecity.in/v1/countries/%cntry%/states',
    get_all_profiles: '/mpa/api/v1/profiles/all?admin=',
    get_all_device_instance_url: '/mda/api/v1/devices/websocket/url',
    get_profile: '/mpa/api/v1/profiles?id=',
    add_profile: '/mpa/api/v1/profiles?admin=',
    add_mqtt: '/mpa/api/v1/profiles/mqtt/cred?admin=',
    get_mqtt_cred: '/mpa/api/v1/profiles/mqtt/cred?admin=',
    get_spotify_access_token: '/mpa/api/v1/profiles/spotify/token',
    get_spotify_refresh_access_token: '/mpa/api/v1/profiles/spotify/token/refresh',
};

/// new ///

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

// export const getMqttCred = async (admin: any, darkTheme: any) => {
//     try {
//         const response = await api.get(
//             profileUrl.get_mqtt_cred + admin,
//             getHeaderConfig,
//         );
//         return response;
//     } catch (error) {
//         catchError(error, darkTheme);
//         throw new Error('Failed to fetch mqtt credentials');
//     }
// };

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

/// new ///

/********************************Fetch all profiles********************************/

/********************************Fetch all profiles********************************/

/********************************Fetch all profiles********************************/

/*************************Fetch specific profile*******************************/
// export const getProfile = async (appUser: any, profileId: any) => {
//     return await api.get(
//         `${profileUrl.get_profile}${appUser}&id=${profileId}`,
//         getHeaderConfig,
//     );
// };

/************************* Add user profile in profile config page *******************************/
// export const useAddProfiles = (
//     appUser: any,
//     on_Success: any,
//     on_Error: any,
// ) => {
//     return useMutation(
//         (data) => {
//             return api.post(
//                 profileUrl.add_profile + appUser,
//                 data,
//                 postHeaderConfig,
//             );
//         },
//         { onSuccess: on_Success, onError: on_Error },
//     );
// };

/************************* Add user profile in profile config page *******************************/
export const useAddMqttCred = (appUser: any, on_Error: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (data) => {
            return api.post(
                profileUrl.add_mqtt + appUser,
                data,
                updateHeaderConfig,
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('get_Mqtt_Cred');
            },
            onError: on_Error,
        },
    );
};

/*************************Fetch Mqtt Cred*******************************/
