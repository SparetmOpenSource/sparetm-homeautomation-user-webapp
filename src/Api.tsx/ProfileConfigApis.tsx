import { api, getHeaderConfig, postHeaderConfig } from './Axios';
import { useMutation } from 'react-query';

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

const profileUrl = {
    get_countryCityStateToken:
        'https://www.universal-tutorial.com/api/getaccesstoken',
    get_country: 'https://www.universal-tutorial.com/api/countries/',
    get_city: 'https://www.universal-tutorial.com/api/cities/',
    get_state: 'https://www.universal-tutorial.com/api/states/',
    get_all_profile: '/mpa/api/v1/profiles/all?admin=',
    get_profile: '/mpa/api/v1/profiles?id=',
    add_profile: '/mpa/api/v1/profiles?admin=',
    get_mqtt_cred: '/mpa/api/v1/profiles/mqtt/cred?admin=',
};

/********************************Fetch all profiles********************************/
export const getStateList = async (headerOptions: any, country: any) => {
    return await api.get(profileUrl.get_state + country, headerOptions);
};

/********************************Fetch all profiles********************************/
export const getCityList = async (headerOptions: any, state: any) => {
    return await api.get(profileUrl.get_city + state, headerOptions);
};

/********************************Fetch all profiles********************************/
export const getCountryList = async (headerOptions: any) => {
    return await api.get(profileUrl.get_country, headerOptions);
};

/********************************Fetch all profiles********************************/
export const getCityCountryStateToken = async () => {
    return await api.get(
        profileUrl.get_countryCityStateToken,
        cityCountryState_token_headers,
    );
};
/********************************Fetch all profiles********************************/
export const getProfiles = async (appUser: any) => {
    return await api.get(profileUrl.get_all_profile + appUser, getHeaderConfig);
};

/*************************Fetch specific profile*******************************/
// export const getProfile = async (appUser: any, profileId: any) => {
//     return await api.get(
//         `${profileUrl.get_profile}${appUser}&id=${profileId}`,
//         getHeaderConfig,
//     );
// };

export const getProfile = async (profileId: any) => {
    return await api.get(
        `${profileUrl.get_profile}${profileId}`,
        getHeaderConfig,
    );
};

/************************* Add user profile in profile config page *******************************/
export const useAddProfiles = (
    appUser: any,
    on_Success: any,
    on_Error: any,
) => {
    return useMutation(
        (data) => {
            return api.post(
                profileUrl.add_profile + appUser,
                data,
                postHeaderConfig,
            );
        },
        { onSuccess: on_Success, onError: on_Error },
    );
};

/*************************Fetch Mqtt Cred*******************************/
export const getMqttCred = async (admin: any) => {
    return await api.get(profileUrl.get_mqtt_cred + admin, getHeaderConfig);
};
