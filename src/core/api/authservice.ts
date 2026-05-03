import { api, authUrl } from './axios';

export const AuthService = {
    login: async (data: any) => {
        return await api.post(authUrl.app_login, data);
    },
    register: async (data: any) => {
        return await api.post(authUrl.app_registration, data);
    }
};
