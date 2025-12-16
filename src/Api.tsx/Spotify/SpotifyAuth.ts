import {
    SPOTIFY_TOKEN_GLOBAL,
    SPOTIFY_REFRESH_TOKEN_GLOBAL,
    SPOTIFY_TOKEN_FETCHED_GLOBAL,
    SPOTIFY_TOKEN_FETCHED_TIME_GLOBAL,
} from '../../Data/Constants';
import { setItem } from '../../Hooks/UseLocalStorage';

// Inline constants to avoid circular dependency with Axios.tsx and ProfileConfigApis.tsx
const SPOTIFY_REFRESH_URL = '/mpa/api/v1/profiles/spotify/token/refresh';
const HEADER_CONFIG = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

export const refreshSpotifyToken = async (api: any, refreshToken: string) => {
    try {
        const response = await api.post(
            SPOTIFY_REFRESH_URL,
            { token: refreshToken },
            HEADER_CONFIG
        );

        const data = response.data;
        const access_token = data?.body?.access_token;
        const new_refresh_token = data?.body?.refresh_token;

        if (access_token && new_refresh_token) {
            setItem(SPOTIFY_TOKEN_GLOBAL, access_token);
            setItem(SPOTIFY_REFRESH_TOKEN_GLOBAL, new_refresh_token);
            setItem(SPOTIFY_TOKEN_FETCHED_GLOBAL, true);

            const now = new Date().toLocaleString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
            });
            setItem(SPOTIFY_TOKEN_FETCHED_TIME_GLOBAL, now);
            
            return access_token;
        }
        return null;
    } catch (error) {
        console.error('Failed to refresh Spotify token via interceptor', error);
        return null;
    }
};
