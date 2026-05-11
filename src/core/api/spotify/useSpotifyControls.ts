import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { GET_SPOTIFY_QUEUE_STATE_QUERY_ID, GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID } from '../../../data/QueryConstant';
import { SPOTIFY_TOKEN_GLOBAL, spotifyAlbumAddition } from '../../../data/Constants';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../data/Enum';
import { useProfileLocalStorage } from '../../../features/auth/utils/authhelpers';
import { catchError, displayToastify, invalidateQueries } from '../../../utils/HelperFn';
import { getMergedHeadersForSpotify } from '../Axios';
import { featureUrl } from '../Coreappapis';
import { usePostUpdateData } from '../usereactqueryUpdate';

interface PlayParams {
    deviceId: string;
    contextUri?: string;
    trackUri?: string;
    positionMs?: number;
}

export const useSpotifyControls = (darkTheme: boolean) => {
    const queryClient = useQueryClient();
    const [accessToken] = useProfileLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');

    const updateHeaderConfig = {
        headers: getMergedHeadersForSpotify(accessToken),
    };

    const refreshSpotifyState = useCallback(() => {
        setTimeout(() => {
            invalidateQueries(queryClient, [
                `${GET_SPOTIFY_QUEUE_STATE_QUERY_ID}_${accessToken}`,
                `${GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID}_${accessToken}`
            ]);
        }, 1000);
    }, [queryClient, accessToken]);

    const handleError = useCallback((error: any) => {
        catchError(error, darkTheme);
    }, [darkTheme]);

    // Mutations
    const playMutation = usePostUpdateData(
        `${featureUrl.spotify_base_url}?data=play`,
        updateHeaderConfig,
        refreshSpotifyState,
        handleError
    );

    const pauseMutation = usePostUpdateData(
        `${featureUrl.spotify_base_url}?data=pause`,
        updateHeaderConfig,
        refreshSpotifyState,
        handleError
    );

    const nextMutation = usePostUpdateData(
        `${featureUrl.spotify_base_url}?data=next`,
        updateHeaderConfig,
        refreshSpotifyState,
        handleError
    );

    const previousMutation = usePostUpdateData(
        `${featureUrl.spotify_base_url}?data=previous`,
        updateHeaderConfig,
        refreshSpotifyState,
        handleError
    );

    const seekMutation = usePostUpdateData(
        `${featureUrl.spotify_base_url}?data=seek`,
        updateHeaderConfig,
        undefined,
        handleError
    );

    const addToQueueMutation = usePostUpdateData(
        `${featureUrl.spotify_base_url}?data=addtoqueue`,
        updateHeaderConfig,
        () => {
            refreshSpotifyState();
            displayToastify(
                "Added to queue",
                darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
                TOASTIFYSTATE.SUCCESS
            );
        },
        handleError
    );

    const addToAlbumMutation = usePostUpdateData(
        `${featureUrl.spotify_base_url}?data=addtoalbum`,
        updateHeaderConfig,
        () => {
            displayToastify(
                spotifyAlbumAddition,
                darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
                TOASTIFYSTATE.SUCCESS
            );
        },
        handleError
    );

    // High-level controls
    const play = useCallback(({ deviceId, contextUri, trackUri, positionMs = 0 }: PlayParams) => {
        const payload: any = {
            device_ids: [deviceId],
            position_ms: positionMs,
        };

        if (contextUri) {
            payload.context_uri = contextUri;
            payload.offset = { uri: trackUri };
        } else if (trackUri) {
            payload.uris = [trackUri];
        }

        playMutation.mutate(payload);
    }, [playMutation]);

    const pause = useCallback((deviceId: string) => {
        pauseMutation.mutate({ device_ids: [deviceId] });
    }, [pauseMutation]);

    const next = useCallback((deviceId: string) => {
        nextMutation.mutate({
            url: `${featureUrl.spotify_base_url}?data=next&id=${deviceId}`,
            data: {}
        });
    }, [nextMutation]);

    const previous = useCallback((deviceId: string) => {
        previousMutation.mutate({
            url: `${featureUrl.spotify_base_url}?data=previous&id=${deviceId}`,
            data: {}
        });
    }, [previousMutation]);

    const seek = useCallback((deviceId: string, positionMs: number) => {
        seekMutation.mutate({
            device_ids: [deviceId],
            position_ms: positionMs,
        });
    }, [seekMutation]);

    const addToAlbum = useCallback((albumId: string) => {
        addToAlbumMutation.mutate({ id: albumId });
    }, [addToAlbumMutation]);

    const addToQueue = useCallback((deviceId: string, trackUri: string) => {
        addToQueueMutation.mutate({ id: deviceId, track_uri: trackUri });
    }, [addToQueueMutation]);

    return {
        play,
        pause,
        next,
        previous,
        seek,
        addToAlbum,
        addToQueue,
        isPlayLoading: playMutation.isLoading,
        isPauseLoading: pauseMutation.isLoading,
    };
};
