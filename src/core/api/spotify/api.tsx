import { SPOTIFY_CODE_VERIFIER, spotify_refresh_playback_constant } from '../../../data/Constants';
import {
    GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID,
    GET_SPOTIFY_ALL_ALBUM_STATE_QUERY_ID,
    GET_SPOTIFY_ALL_PLAYLIST_STATE_QUERY_ID,
    GET_SPOTIFY_PLAYLIST_SONG_STATE_QUERY_ID,
    GET_SPOTIFY_QUEUE_STATE_QUERY_ID,
    GET_SPOTIFY_PROFILE_STATE_QUERY_ID,
    GET_SPOTIFY_DEVICE_STATE_QUERY_ID
} from '../../../data/QueryConstant';
import { catchError, generateCodeChallenge, resetSpotify } from '../../../utils/HelperFn';
import { api, updateHeaderConfig } from '../Axios';
import { featureUrl } from '../Coreappapis';
import { profileUrl } from '../Profileconfigapis';
import { useReactQuery_Get } from '../usereactqueryGet';
import { useDeleteData, usePostUpdateData } from '../usereactqueryUpdate';
import { getMergedHeadersForSpotify } from '../Axios';
import {
    SpotifyApiResponse,
    SpotifyPlaybackState,
    SpotifyQueueState,
    SpotifyTrack,
    SpotifyAlbum
} from './types';

const auth_uri: string = process.env.REACT_APP_SPOTIFY_AUTH_URI || 'https://accounts.spotify.com/authorize';
export const redirect_uri: string = window.location.origin + (process.env.REACT_APP_SPOTIFY_REDIRECT_PATH || '/app/dashboard/segment/status');
const client_id: string = process.env.REACT_APP_SPOTIFY_CLIENT_ID || '';
const scope: string = process.env.REACT_APP_SPOTIFY_SCOPE || '';

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

export const getPlaybackState = async (token: string): Promise<SpotifyApiResponse<SpotifyPlaybackState>> => {
    try {
        const response = await api.get(featureUrl.spotify_base_url + '?data=playbackState', {
            headers: getMergedHeadersForSpotify(token)
        });
        return response as unknown as SpotifyApiResponse<any>;
    } catch (error: any) {
        throw new Error(`Failed to fetch playback state: ${error.response?.data?.error?.message ?? error.message}`);
    }
};


export const getSearchState = async (query: string, type: string, limit: number, offset: number, token: string, signal?: AbortSignal): Promise<SpotifyApiResponse<any>> => {
    try {
        const response = await api.get(
            featureUrl.spotify_base_url +
            `?data=search&query=${encodeURIComponent(query)}&type=${type}&limit=${limit}&offset=${offset}&include_external=audio&market=IN`,
            { 
                headers: getMergedHeadersForSpotify(token),
                signal 
            }
        );
        return response as unknown as SpotifyApiResponse<any>;
    } catch (error: any) {
        throw new Error(`Failed to fetch search state: ${error.response?.data?.error?.message ?? error.message}`);
    }
};

export const getProfileState = async (token: string): Promise<SpotifyApiResponse<any>> => {
    try {
        const response = await api.get(featureUrl.spotify_base_url + '?data=profile', {
            headers: getMergedHeadersForSpotify(token)
        });
        return response as unknown as SpotifyApiResponse<any>;
    } catch (error: any) {
        throw new Error(`Failed to fetch profile state: ${error.response?.data?.error?.message ?? error.message}`);
    }
};

export const getDeviceState = async (token: string): Promise<SpotifyApiResponse<any>> => {
    try {
        const response = await api.get(featureUrl.spotify_base_url + '?data=devices', {
            headers: getMergedHeadersForSpotify(token)
        });
        return response as unknown as SpotifyApiResponse<any>;
    } catch (error: any) {
        throw new Error(`Failed to fetch device state: ${error.response?.data?.error?.message ?? error.message}`);
    }
};

export const getQueueState = async (token: string): Promise<SpotifyApiResponse<SpotifyQueueState>> => {
    try {
        const response = await api.get(featureUrl.spotify_base_url + '?data=queue', {
            headers: getMergedHeadersForSpotify(token)
        });
        return response as unknown as SpotifyApiResponse<any>;
    } catch (error: any) {
        throw new Error(`Failed to fetch queue state: ${error.response?.data?.error?.message ?? error.message}`);
    }
};

export const getPlaylistSongState = async (playlistId: string, token: string, limit: number, offset: number): Promise<SpotifyApiResponse<SpotifyTrack[]>> => {
    try {
        const response = await api.get(
            featureUrl.spotify_base_url + `?data=playlistsong&playlistId=${playlistId}&limit=${limit}&offset=${offset}&market=IN`,
            { headers: getMergedHeadersForSpotify(token) }
        );
        return response as unknown as SpotifyApiResponse<any>;
    } catch (error: any) {
        throw new Error(`Failed to fetch playlist song state: ${error.response?.data?.error?.message ?? error.message}`);
    }
};

export const getAllAlbumState = async (token: string, limit: number, offset: number): Promise<SpotifyApiResponse<SpotifyAlbum[]>> => {
    try {
        const response = await api.get(featureUrl.spotify_base_url + `?data=allalbum&limit=${limit}&offset=${offset}&market=IN`, {
            headers: getMergedHeadersForSpotify(token)
        });
        return response as unknown as SpotifyApiResponse<any>;
    } catch (error: any) {
        throw new Error(`Failed to fetch all album state: ${error.response?.data?.error?.message ?? error.message}`);
    }
};

export const getAllPlaylistState = async (token: string, limit: number, offset: number): Promise<SpotifyApiResponse<any>> => {
    try {
        const response = await api.get(featureUrl.spotify_base_url + `?data=allplaylist&limit=${limit}&offset=${offset}`, {
            headers: getMergedHeadersForSpotify(token)
        });
        return response as any;
    } catch (error: any) {
        throw new Error(`Failed to fetch all playlist state: ${error.response?.data?.error?.message ?? error.message}`);
    }
};

export const useSpotifyAllAlbums = (accessToken: string, offset: number, limit: number, darkTheme: boolean) => {
    return useReactQuery_Get(
        `${GET_SPOTIFY_ALL_ALBUM_STATE_QUERY_ID}_${accessToken}_offset(${offset})_limit(${limit})`,
        () => getAllAlbumState(accessToken, limit, offset),
        {
            enabled: !!accessToken,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 300000,
            onError: (error: any) => catchError(error, darkTheme),
        }
    );
};

export const useSpotifyAllPlaylists = (accessToken: string, offset: number, limit: number, darkTheme: boolean) => {
    return useReactQuery_Get(
        `${GET_SPOTIFY_ALL_PLAYLIST_STATE_QUERY_ID}_${accessToken}_offset(${offset})_limit(${limit})`,
        () => getAllPlaylistState(accessToken, limit, offset),
        {
            enabled: !!accessToken,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 300000,
            onError: (error: any) => catchError(error, darkTheme),
        }
    );
};

export const useSpotifyPlaylistSongs = (playlistCoverId: string, accessToken: string, offset: number, limit: number, darkTheme: boolean) => {
    return useReactQuery_Get(
        `${GET_SPOTIFY_PLAYLIST_SONG_STATE_QUERY_ID}_${accessToken}_${playlistCoverId}_offset(${offset})_limit(${limit})`,
        () => getPlaylistSongState(playlistCoverId, accessToken, limit, offset),
        {
            enabled: !!accessToken && !!playlistCoverId,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 0,
            onError: (error: any) => catchError(error, darkTheme),
        }
    );
};

export const useSpotifySearchState = (query: string, type: string, limit: number, offset: number, accessToken: string, darkTheme: boolean) => {
    return useReactQuery_Get(
        `GET_SPOTIFY_SEARCH_STATE_QUERY_ID_${accessToken}_${query}_${type}_${offset}_${limit}`,
        () => getSearchState(query, type, limit, offset, accessToken),
        {
            enabled: !!query && !!accessToken,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 300000,
            onError: (error: any) => catchError(error, darkTheme),
        }
    );
};

export const useSpotifyPlaybackState = (accessToken: string, darkTheme: boolean, refetchInterval?: number) => {
    return useReactQuery_Get(
        `${GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID}_${accessToken}`,
        () => getPlaybackState(accessToken),
        {
            enabled: !!accessToken,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            refetchInterval: refetchInterval ?? spotify_refresh_playback_constant.play_back_fetch_delay_time,
            refetchIntervalInBackground: false,
            cacheTime: 300000,
            staleTime: 0,
            retry: false,
            onError: (error: any) => catchError(error, darkTheme),
        }
    );
};

export const useSpotifyProfileState = (accessToken: string, darkTheme: boolean) => {
    return useReactQuery_Get(
        `${GET_SPOTIFY_PROFILE_STATE_QUERY_ID}_${accessToken}`,
        () => getProfileState(accessToken),
        {
            enabled: !!accessToken,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 300000,
            retry: false,
            onError: (error: any) => catchError(error, darkTheme),
        }
    );
};

export const useSpotifyDeviceState = (accessToken: string, darkTheme: boolean) => {
    return useReactQuery_Get(
        `${GET_SPOTIFY_DEVICE_STATE_QUERY_ID}_${accessToken}`,
        () => getDeviceState(accessToken),
        {
            enabled: !!accessToken,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 0,
            retry: false,
            onError: (error: any) => catchError(error, darkTheme),
        }
    );
};

export const useSpotifyQueueState = (accessToken: string, darkTheme: boolean) => {
    return useReactQuery_Get(
        `${GET_SPOTIFY_QUEUE_STATE_QUERY_ID}_${accessToken}`,
        () => getQueueState(accessToken),
        {
            enabled: !!accessToken,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            cacheTime: 300000,
            staleTime: 0,
            retry: false,
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

export const useSpotifyTransferPlayback = (accessToken: string, darkTheme: boolean, onSuccess?: any) => {
    return usePostUpdateData(
        `${featureUrl.spotify_base_url}?data=transferplayback`,
        { headers: getMergedHeadersForSpotify(accessToken) },
        onSuccess,
        (error: any) => catchError(error, darkTheme)
    );
};

export const useSpotifyDeleteAlbum = (accessToken: string, darkTheme: boolean, onSuccess?: any) => {
    return useDeleteData(
        `${featureUrl.spotify_base_url}?data=deletefromalbumlist&id=%id%`,
        { headers: getMergedHeadersForSpotify(accessToken) },
        onSuccess,
        (error: any) => catchError(error, darkTheme)
    );
};

export const useSpotifyAccessToken = (onSuccess: any, onError: any) => {
    return usePostUpdateData(
        profileUrl.get_spotify_access_token,
        updateHeaderConfig,
        onSuccess,
        onError
    );
};
