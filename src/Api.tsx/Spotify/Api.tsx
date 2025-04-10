import {
    spotifyAccountType,
    spotifyCodeVerifier,
    spotifyRefreshToken,
} from '../../Data/Constants';
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
    'user-library-modify',
];

const auth_uri: string = 'https://accounts.spotify.com/authorize';
const redirect_uri: string =
    'http://localhost:3000/app/dashboard/segment/status';
const client_id: string = 'ad37eacb72aa4f8891ccda3c0782b86a';
const scope: string =
    'user-library-modify user-library-read playlist-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-email user-read-private';

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
        if (response?.status === 204) {
            return null;
        }
        return response?.data;
    } catch (error: any) {
        if (error?.response?.status === 401) {
            const token = localStorage.getItem(spotifyRefreshToken);
            if (token) {
                localStorage.removeItem(spotifyAccountType);
                const token = localStorage.getItem(spotifyRefreshToken);
                callForAccessTokenByRefreshToken({ token });
                // return undefined;
            }
        }
        throw new Error(
            `Failed to fetch playback state: ${
                error.response?.data?.error?.message || error.message
            }`,
        );
    }
};

export const getProfileState = async (token: any) => {
    try {
        const response = await api.get(
            featureUrl.spotify_base_url + '?data=profile',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        throw new Error(
            `Failed to fetch playback state: ${
                error.response?.data?.error?.message || error.message
            }`,
        );
    }
};

export const getDeviceState = async (token: any) => {
    try {
        const response = await api.get(
            featureUrl.spotify_base_url + '?data=devices',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        throw new Error(
            `Failed to fetch playback state: ${
                error.response?.data?.error?.message || error.message
            }`,
        );
    }
};

export const getQueueState = async (token: any) => {
    try {
        const response = await api.get(
            featureUrl.spotify_base_url + '?data=queue',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        throw new Error(
            `Failed to fetch playback state: ${
                error.response?.data?.error?.message || error.message
            }`,
        );
    }
};

export const getPlaylistSongState = async (
    playlistId: string,
    token: any,
    limit: any,
    offset: any,
) => {
    try {
        const response = await api.get(
            featureUrl.spotify_base_url +
                `?data=playlistsong&playlistId=${playlistId}&limit=${limit}&offset=${offset}&market=IN`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        throw new Error(
            `Failed to fetch playback state: ${
                error.response?.data?.error?.message || error.message
            }`,
        );
    }
};

export const getAllAlbumState = async (token: any, limit: any, offset: any) => {
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
        return response.data;
    } catch (error: any) {
        throw new Error(
            `Failed to fetch playback state: ${
                error.response?.data?.error?.message || error.message
            }`,
        );
    }
};
