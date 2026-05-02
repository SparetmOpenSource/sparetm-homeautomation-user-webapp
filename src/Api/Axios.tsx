import axios from 'axios';
import { getItem } from '../Hooks/UseLocalStorage';
import { SPOTIFY_TOKEN_GLOBAL } from '../Data/Constants';

export const RootUrl = {
    gateway: process.env.REACT_APP_API_URL || 'http://localhost:8086',
};

export const authUrl = {
    app_registration: `${RootUrl.gateway}/msa/api/v1/auth/register`,
    app_login: `${RootUrl.gateway}/msa/api/v1/auth/authenticate`,
    app_refresh_token: `${RootUrl.gateway}/msa/api/v1/auth/refresh-token`,
};

export const api = axios.create({ baseURL: RootUrl.gateway });

let getAppToken: () => string | null = () => null;

export const setAppTokenProvider = (provider: () => string | null) => {
    getAppToken = provider;
};

api.interceptors.request.use((config) => {
    config.headers['ngrok-skip-browser-warning'] = 'true';
    
    // Dynamically inject JWT Token FAANG-Style via Provider
    const appToken = getAppToken();
    
    const isSpotifyUrl = config.url?.includes('/mpa/api/v1/profiles/spotify');
    const isAuthUrl = config.url?.includes('/msa/api/v1/auth');

    // 1. Inject Core App Token for ALL internal APIs (Including Spotify Gateway Routes)
    if (appToken && !isAuthUrl) {
        config.headers['Authorization'] = `Bearer ${appToken}`;
    }

    // 2. Inject Spotify Token specifically for Spotify Gateway Routes
    if (isSpotifyUrl) {
        const spotifyToken = getItem(SPOTIFY_TOKEN_GLOBAL);
        if (spotifyToken) {
            config.headers['X-Spotify-Authorization'] = `Bearer ${spotifyToken}`;
        }
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // Define Spotify base URL matching logic
        // We know from CoreAppApis that spotify base is /mpa/api/v1/profiles/spotify
        const isSpotifyUrl = originalRequest.url?.includes('/mpa/api/v1/profiles/spotify');

        if (error.response?.status === 401 && isSpotifyUrl && !(originalRequest as any)._retry) {
            (originalRequest as any)._retry = true;
            
            try {
                // Dynamically import to avoid circular dependency if SpotifyAuth imports Axios
                // However, we are passing 'api' so it depends on how SpotifyAuth is structured.
                // Assuming SpotifyAuth imports constants and not 'api' directly.
                // Wait, SpotifyAuth imports 'updateHeaderConfig' from this file. That might be circular.
                // updateHeaderConfig is a constant, so it might be fine, but let's be careful.
                
                const { refreshSpotifyToken } = await import('./Spotify/SpotifyAuth');
                // We need to read refresh token from storage here
                const { SPOTIFY_REFRESH_TOKEN_GLOBAL } = await import('../Data/Constants');
                
                const { getItem } = await import('../Hooks/UseLocalStorage');
                const refreshToken = getItem(SPOTIFY_REFRESH_TOKEN_GLOBAL);

                if (refreshToken) {
                    const newAccessToken = await refreshSpotifyToken(api, refreshToken);
                    if (newAccessToken) {
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return api(originalRequest);
                    }
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
            }
        }
        return Promise.reject(error);
    }
);

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

export const getMergedHeadersForSpotify = (token: any) => {
    return {
        ...updateHeaderConfig.headers,
        // Removed Authorization override so Axios Interceptor can handle dual tokens dynamically
    };
};

export const getMergedHeadersForLocation = (apiKey: any) => {
    return {
        ...getHeaderConfig.headers,
        'X-CSCAPI-KEY': apiKey,
    };
};
