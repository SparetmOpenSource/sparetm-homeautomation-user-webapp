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

export const postHeaderConfig = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

