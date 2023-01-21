import { api, config_1, config_2 } from "./Axios";

export const profileUrl = {
    get_profile: '/mpa/api/v1/profiles?admin=',
    add_profile: '/mpa/api/v1/profiles?admin=',
};

/****************************************************************/

export const getProfiles = async (appUser: any) => {
    return await api.get(profileUrl.get_profile + appUser, config_1);
};

export const addProfiles = async (appUser: any, data: any) => {
    return await api.post(profileUrl.add_profile + appUser, data, config_2);
};
