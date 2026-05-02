import { SPOTIFY_CODE_VERIFIER } from '../../Data/Constants';
import { generateCodeChallenge, resetSpotify } from '../../Utils/HelperFn';
import { api } from '../Axios';
import { featureUrl } from '../CoreAppApis';
import { useReactQuery_Get } from '../useReactQuery_Get';
import { GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID } from '../../Data/QueryConstant';
import { spotify_refresh_playback_constant } from '../../Data/Constants';
import { catchError } from '../../Utils/HelperFn';

const auth_uri: string = 'https://accounts.spotify.com/authorize';
const getRedirectUri = () => {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://127.0.0.1:3000/app/dashboard/segment/status';
    }
    const baseUrl = window.location.origin;
    return `${baseUrl}/app/dashboard/segment/status`;
};

export const redirect_uri: string = getRedirectUri();
const client_id: string = 'ad37eacb72aa4f8891ccda3c0782b86a';
const scope: string =
    'user-library-modify user-library-read playlist-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-email user-read-private';

export const handleLogin = async () => {
    resetSpotify();
    const { codeVerifier, codeChallenge } = await generateCodeChallenge();
    const authUrl = new URL(auth_uri);
    sessionStorage.setItem(SPOTIFY_CODE_VERIFIER, codeVerifier);
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

export const getPlaybackState = async (token: any) => {
    try {
        const response = await api.get(featureUrl.spotify_base_url + '?data=playbackState');
        return response;
    } catch (error: any) {
        throw new Error(`Failed to fetch playback state: ${error.response?.data?.error?.message ?? error.message}`);
    }
};

export const useSpotifyPlaybackState = (accessToken: any, darkTheme: any) => {
    return useReactQuery_Get(
        GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID,
        () => getPlaybackState(accessToken),
        {
            enabled: true,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            refetchInterval: spotify_refresh_playback_constant.play_back_fetch_delay_time,
            refetchIntervalInBackground: false,
            cacheTime: 300000,
            staleTime: 0,
            onError: (error: any) => catchError(error, darkTheme),
        }
    );
};

export const getSearchState = async (query: any, type: any, limit: any, offset: any, token: any) => {
    try {
        const response = await api.get(
            featureUrl.spotify_base_url +
            `?data=search&query=${encodeURIComponent(query)}&type=${type}&limit=${limit}&offset=${offset}&include_external=audio&market=IN`
        );
        return response;
    } catch (error: any) {
        throw new Error(`Failed to fetch search state: ${error.response?.data?.error?.message ?? error.message}`);
    }
};

export const getProfileState = async (token: any) => {
    try {
        const response = await api.get(featureUrl.spotify_base_url + '?data=profile');
        return response;
    } catch (error: any) {
        throw new Error(`Failed to fetch profile state: ${error.response?.data?.error?.message ?? error.message}`);
    }
};

export const getDeviceState = async (token: any) => {
    try {
        const response = await api.get(featureUrl.spotify_base_url + '?data=devices');
        return response;
    } catch (error: any) {
        throw new Error(`Failed to fetch device state: ${error.response?.data?.error?.message ?? error.message}`);
    }
};

export const getQueueState = async (token: any) => {
    try {
        const response = await api.get(featureUrl.spotify_base_url + '?data=queue');
        return response;
    } catch (error: any) {
        throw new Error(`Failed to fetch queue state: ${error.response?.data?.error?.message ?? error.message}`);
    }
};

export const getPlaylistSongState = async (playlistId: string, token: any, limit: any, offset: any) => {
    try {
        const response = await api.get(
            featureUrl.spotify_base_url + `?data=playlistsong&playlistId=${playlistId}&limit=${limit}&offset=${offset}&market=IN`
        );
        return response;
    } catch (error: any) {
        throw new Error(`Failed to fetch playlist song state: ${error.response?.data?.error?.message ?? error.message}`);
    }
};

export const getAllAlbumState = async (token: any, limit: any, offset: any) => {
    try {
        const response = await api.get(featureUrl.spotify_base_url + `?data=allalbum&limit=${limit}&offset=${offset}&market=IN`);
        return response;
    } catch (error: any) {
        throw new Error(`Failed to fetch all album state: ${error.response?.data?.error?.message ?? error.message}`);
    }
};

export const getAllPlaylistState = async (token: any, limit: any, offset: any) => {
    try {
        const response = await api.get(featureUrl.spotify_base_url + `?data=allplaylist&limit=${limit}&offset=${offset}`);
        return response;
    } catch (error: any) {
        throw new Error(`Failed to fetch all playlist state: ${error.response?.data?.error?.message ?? error.message}`);
    }
};

export const useSpotifyAllAlbums = (accessToken: any, offset: any, limit: any, darkTheme: any) => {
    return useReactQuery_Get(
        `GET_SPOTIFY_ALL_ALBUM_STATE_QUERY_ID_offset(${offset})_limit(${limit})`,
        () => getAllAlbumState(accessToken, limit, offset),
        {
            enabled: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 300000,
            onError: (error: any) => catchError(error, darkTheme),
        }
    );
};

export const useSpotifyAllPlaylists = (accessToken: any, offset: any, limit: any, darkTheme: any) => {
    return useReactQuery_Get(
        `GET_SPOTIFY_ALL_PLAYLIST_STATE_QUERY_ID_offset(${offset})_limit(${limit})`,
        () => getAllPlaylistState(accessToken, limit, offset),
        {
            enabled: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 300000,
            onError: (error: any) => catchError(error, darkTheme),
        }
    );
};

export const useSpotifyPlaylistSongs = (playlistCoverId: any, accessToken: any, offset: any, limit: any, darkTheme: any) => {
    return useReactQuery_Get(
        `GET_SPOTIFY_PLAYLIST_SONG_STATE_QUERY_ID_offset(${offset})_limit(${limit})`,
        () => getPlaylistSongState(playlistCoverId, accessToken, limit, offset),
        {
            enabled: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 0,
            onError: (error: any) => catchError(error, darkTheme),
        }
    );
};

export const useSpotifySearchState = (query: any, type: any, limit: any, offset: any, accessToken: any, darkTheme: any) => {
    return useReactQuery_Get(
        `GET_SPOTIFY_SEARCH_STATE_QUERY_ID_${query}_${type}_${offset}_${limit}`,
        () => getSearchState(query, type, limit, offset, accessToken),
        {
            enabled: !!query,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 300000,
            onError: (error: any) => catchError(error, darkTheme),
        }
    );
};

export const useSpotifyProfileState = (accessToken: any, darkTheme: any) => {
    return useReactQuery_Get(
        'GET_SPOTIFY_PROFILE_STATE_QUERY_ID',
        () => getProfileState(accessToken),
        {
            enabled: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 300000,
            onError: (error: any) => catchError(error, darkTheme),
        }
    );
};

export const useSpotifyDeviceState = (accessToken: any, darkTheme: any) => {
    return useReactQuery_Get(
        'GET_SPOTIFY_DEVICE_STATE_QUERY_ID',
        () => getDeviceState(accessToken),
        {
            enabled: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 0,
            onError: (error: any) => catchError(error, darkTheme),
        }
    );
};

export const useSpotifyQueueState = (accessToken: any, darkTheme: any) => {
    return useReactQuery_Get(
        'GET_SPOTIFY_QUEUE_STATE_QUERY_ID',
        () => getQueueState(accessToken),
        {
            enabled: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 0,
            onError: (error: any) => catchError(error, darkTheme),
        }
    );
};

export const setting_up_token = (data: any) => {
    const access_token = data?.data?.body?.access_token;
    const refresh_token = data?.data?.body?.refresh_token;
    const accountType = data?.data?.headers?.spotify_account_type?.[0];
    return { access_token, refresh_token, accountType };
};
