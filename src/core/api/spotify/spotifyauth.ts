import {
    SPOTIFY_REFRESH_TOKEN_GLOBAL,
    SPOTIFY_TOKEN_FETCHED_GLOBAL,
    SPOTIFY_TOKEN_FETCHED_TIME_GLOBAL,
    SPOTIFY_TOKEN_GLOBAL,
} from '../../../data/constants';
import { setItem } from '../../../hooks/uselocalstorage';
import { getProfileKey } from '../../../features/auth/utils/authhelpers';

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
            setItem(getProfileKey(SPOTIFY_TOKEN_GLOBAL.replace('_global', '')), access_token);
            setItem(getProfileKey(SPOTIFY_REFRESH_TOKEN_GLOBAL.replace('_global', '')), new_refresh_token);
            setItem(getProfileKey(SPOTIFY_TOKEN_FETCHED_GLOBAL.replace('_global', '')), true);

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
            setItem(getProfileKey(SPOTIFY_TOKEN_FETCHED_TIME_GLOBAL.replace('_global', '')), now);
            
            return access_token;
        }
        return null;
    } catch (error) {
        console.error('Failed to refresh Spotify token via interceptor', error);
        return null;
    }
};
