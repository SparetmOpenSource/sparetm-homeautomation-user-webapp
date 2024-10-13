import { colorNotificationStatus } from '../Data/Constants';
import { catchError } from '../Utils/HelperFn';
import { api, getHeaderConfig, postHeaderConfig } from './Axios';
import { useMutation, useQueryClient } from 'react-query';

const GeoAuthToken =
    'wOhI3LUC6CzqTj8JATleIaFkReJH6qmmnasmDz_xFnSXdd9ZDS-tlNFPO_iHtj0V4e8';
const AuthEmail = 'sksinghss1998@gmail.com';

const cityCountryState_token_headers = {
    headers: {
        Accept: 'application/json',
        'api-token': GeoAuthToken,
        'user-email': AuthEmail,
    },
};

export const successMessage = {
    profile_added:
        'Your profile successfully added. Redirecting to select profile section',
};

export const profileUrl = {
    get_countryStateCityAccessToken:
        'https://www.universal-tutorial.com/api/getaccesstoken',
    get_country: 'https://www.universal-tutorial.com/api/countries/',
    get_city: 'https://www.universal-tutorial.com/api/cities/',
    get_state: 'https://www.universal-tutorial.com/api/states/',
    get_all_profiles: '/mpa/api/v1/profiles/all?admin=',
    get_all_device_instance_url: '/mpa/api/v1/profiles/websocket/url',
    get_profile: '/mpa/api/v1/profiles?id=',
    add_profile: '/mpa/api/v1/profiles?admin=',
    add_mqtt: '/mpa/api/v1/profiles/mqtt/cred?admin=',
    get_mqtt_cred: '/mpa/api/v1/profiles/mqtt/cred?admin=',
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

export const getCountryStateCityToken = async (darkTheme: any) => {
    try {
        const response = await api.get(
            profileUrl.get_countryStateCityAccessToken,
            cityCountryState_token_headers,
        );
        return response;
    } catch (error) {
        catchError(error, darkTheme);
        throw new Error('Failed to fetch country, state, and city token');
    }
};

export const getStateList = async (
    headerOptions: any,
    country: any,
    darkTheme: any,
) => {
    try {
        const response = await api.get(
            profileUrl.get_state + country,
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
    state: any,
    darkTheme: any,
) => {
    try {
        const response = await api.get(
            profileUrl.get_city + state,
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
        const response = await api.get(profileUrl.get_country, headerOptions);
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
        throw new Error('Failed to fetch websocket url');
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
                postHeaderConfig,
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
