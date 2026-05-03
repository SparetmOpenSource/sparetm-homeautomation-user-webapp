import axios from 'axios';
import { SPOTIFY_REFRESH_TOKEN_GLOBAL, SPOTIFY_TOKEN_GLOBAL } from '../../data/constants';
import { getItem } from '../../hooks/uselocalstorage';
import { getProfileKey } from '../../features/auth/utils/authhelpers';

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

    // 2. Inject Spotify Token specifically for Spotify Gateway Routes (AS A FALLBACK)
    if (isSpotifyUrl && !config.headers['X-Spotify-Authorization']) {
        const spotifyToken = getItem(getProfileKey(SPOTIFY_TOKEN_GLOBAL.replace('_global', '')));
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
        const isSpotifyUrl = originalRequest.url?.includes('/mpa/api/v1/profiles/spotify');

        if (error.response?.status === 401 && isSpotifyUrl && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { refreshSpotifyToken } = await import('./spotify/spotifyauth');
                const { getProfileKey } = await import('../../features/auth/utils/authhelpers');

                const refreshToken = getItem(getProfileKey(SPOTIFY_REFRESH_TOKEN_GLOBAL.replace('_global', '')));

                if (refreshToken) {
                    const newAccessToken = await refreshSpotifyToken(api, refreshToken);
                    if (newAccessToken) {
                        // Correctly update the Spotify-specific header for the retry
                        originalRequest.headers['X-Spotify-Authorization'] = `Bearer ${newAccessToken}`;
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
        'X-Spotify-Authorization': token ? `Bearer ${token}` : undefined,
    };
};

export const getMergedHeadersForLocation = (apiKey: any) => {
    return {
        ...getHeaderConfig.headers,
        'X-CSCAPI-KEY': apiKey,
    };
};
