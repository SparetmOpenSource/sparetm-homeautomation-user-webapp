import { spotifyCodeVerifier, spotifyRefreshToken } from '../../Data/Constants';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../Data/Enum';
import {
    displayToastify,
    generateCodeChallenge,
    resetSpotify,
} from '../../Utils/HelperFn';
import { api } from '../Axios';
import { featureUrl } from '../CoreAppApis';

export const apiScope = [
    'user-library-read',
    'playlist-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
];

const auth_uri: string = 'https://accounts.spotify.com/authorize';
const redirect_uri: string =
    'http://localhost:3000/app/dashboard/segment/status';
const client_id: string = 'ad37eacb72aa4f8891ccda3c0782b86a';
const scope: string =
    'user-library-read playlist-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-email user-read-private';

export const handleLogin = async () => {
    resetSpotify();
    const { codeVerifier, codeChallenge } = await generateCodeChallenge();
    const authUrl = new URL(auth_uri);
    sessionStorage.setItem(spotifyCodeVerifier, codeVerifier);
    const params = {
        response_type: 'code',
        client_id: client_id,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirect_uri,
    };
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
};

export const getPlaybackState = async (
    darkTheme: any,
    callForAccessTokenByRefreshToken: any,
    token: any,
) => {
    try {
        const response = await api.get(
            featureUrl.spotify_base_url + '?data=playbackState',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        // Handle 204 No Content (no active device/playback)
        if (
            response?.data?.statusCodeValue === 200 &&
            response?.data?.body === null
        ) {
            return response?.data?.body;
        }

        // Handle unauthorized access, token expired
        if (response?.data?.statusCodeValue === 401) {
            displayToastify(
                response?.data?.body?.message,
                darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
                TOASTIFYSTATE.INFO,
            );
            const token = localStorage.getItem(spotifyRefreshToken);
            callForAccessTokenByRefreshToken({ token });
            return undefined;
        }

        return response.data;
    } catch (error: any) {
        throw new Error(
            `Failed to fetch playback state: ${
                error.response?.data?.error?.message || error.message
            }`,
        );
    }
};

export const getProfileState = async (
    darkTheme: any,
    // callForAccessTokenByRefreshToken: any,
    token: any,
) => {
    try {
        const response = await api.get(featureUrl.spotify_current_user_url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Handle 204 No Content (no active device/playback)
        if (
            response?.data?.statusCodeValue === 200 &&
            response?.data?.body === null
        ) {
            return response?.data?.body;
        }

        // Handle unauthorized access, token expired
        if (response?.data?.statusCodeValue === 401) {
            displayToastify(
                response?.data?.body?.message,
                darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
                TOASTIFYSTATE.INFO,
            );
            // const token = localStorage.getItem('spotify_refresh_token');
            // callForAccessTokenByRefreshToken({ token });
            return undefined;
        }

        return response.data;
    } catch (error: any) {
        throw new Error(
            `Failed to fetch playback state: ${
                error.response?.data?.error?.message || error.message
            }`,
        );
    }
};

export const getDeviceState = async (
    darkTheme: any,
    // callForAccessTokenByRefreshToken: any,
    token: any,
) => {
    try {
        const response = await api.get(
            featureUrl.spotify_base_url + '?data=devices',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        // Handle 204 No Content (no active device/playback)
        if (
            response?.data?.statusCodeValue === 200 &&
            response?.data?.body === null
        ) {
            return response?.data?.body;
        }

        // Handle unauthorized access, token expired
        if (response?.data?.statusCodeValue === 401) {
            displayToastify(
                response?.data?.body?.message,
                darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
                TOASTIFYSTATE.INFO,
            );
            // const token = localStorage.getItem('spotify_refresh_token');
            // callForAccessTokenByRefreshToken({ token });
            return undefined;
        }

        return response.data;
    } catch (error: any) {
        throw new Error(
            `Failed to fetch playback state: ${
                error.response?.data?.error?.message || error.message
            }`,
        );
    }
};

export const getQueueState = async (darkTheme: any, token: any) => {
    try {
        const response = await api.get(
            featureUrl.spotify_base_url + '?data=queue',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        // Handle 204 No Content (no active device/playback)
        if (
            response?.data?.statusCodeValue === 200 &&
            response?.data?.body === null
        ) {
            return response?.data?.body;
        }

        // Handle unauthorized access, token expired
        if (response?.data?.statusCodeValue === 401) {
            displayToastify(
                response?.data?.body?.message,
                darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
                TOASTIFYSTATE.INFO,
            );
            return undefined;
        }

        return response.data;
    } catch (error: any) {
        throw new Error(
            `Failed to fetch playback state: ${
                error.response?.data?.error?.message || error.message
            }`,
        );
    }
};

export const getAllAlbumState = async (
    darkTheme: any,
    token: any,
    limit: any,
    offset: any,
) => {
    try {
        const response = await api.get(
            featureUrl.spotify_base_url +
                `?data=allalbum&limit=${limit}&offset=${offset}&market=IN`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        // Handle 204 No Content (no active device/playback)
        if (
            response?.data?.statusCodeValue === 200 &&
            response?.data?.body === null
        ) {
            return response?.data?.body;
        }

        // Handle unauthorized access, token expired
        if (response?.data?.statusCodeValue === 401) {
            displayToastify(
                response?.data?.body?.message,
                darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
                TOASTIFYSTATE.INFO,
            );
            return undefined;
        }

        return response.data;
    } catch (error: any) {
        throw new Error(
            `Failed to fetch playback state: ${
                error.response?.data?.error?.message || error.message
            }`,
        );
    }
};

export const getAllPlaylistState = async (
    darkTheme: any,
    token: any,
    limit: any,
    offset: any,
) => {
    try {
        const response = await api.get(
            featureUrl.spotify_base_url +
                `?data=allplaylist&limit=${limit}&offset=${offset}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        // Handle 204 No Content (no active device/playback)
        if (
            response?.data?.statusCodeValue === 200 &&
            response?.data?.body === null
        ) {
            return response?.data?.body;
        }

        // Handle unauthorized access, token expired
        if (response?.data?.statusCodeValue === 401) {
            displayToastify(
                response?.data?.body?.message,
                darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
                TOASTIFYSTATE.INFO,
            );
            return undefined;
        }

        return response.data;
    } catch (error: any) {
        throw new Error(
            `Failed to fetch playback state: ${
                error.response?.data?.error?.message || error.message
            }`,
        );
    }
};
