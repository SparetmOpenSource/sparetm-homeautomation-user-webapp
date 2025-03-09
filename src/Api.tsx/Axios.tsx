import axios from 'axios';

export const RootUrl = {
    gateway: 'http://localhost:8086',
};

export const api = axios.create({ baseURL: RootUrl.gateway });

export const getHeaderConfig = {
    headers: {
        Accept: 'application/json',
    },
};

export const updateHeaderConfig = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

export const getMergedHeaders = (token: any) => {
    return {
        ...updateHeaderConfig.headers,
        Authorization: `Bearer ${token}`,
    };
};
