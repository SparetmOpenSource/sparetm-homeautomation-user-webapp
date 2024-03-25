import axios from 'axios';

export const RootUrl = {
    gateway: 'http://localhost:8086',
};

//export const api = axios.create({ baseURL: 'http://localhost:8086', timeout: 100 });
export const api = axios.create({ baseURL: RootUrl.gateway });
// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });
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
