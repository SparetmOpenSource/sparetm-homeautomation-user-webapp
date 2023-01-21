import axios from 'axios';

export const api = axios.create({ baseURL: 'http://localhost:8086' });

export const config_1 = {
    headers: {
        Accept: 'application/json',
    },
};

export const config_2 = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};