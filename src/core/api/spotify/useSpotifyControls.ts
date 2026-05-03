import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { GET_SPOTIFY_QUEUE_STATE_QUERY_ID } from '../../../data/queryconstant';
import { SPOTIFY_TOKEN_GLOBAL, spotifyAlbumAddition } from '../../../data/constants';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../data/enum';
import { useProfileLocalStorage } from '../../../features/auth/utils/authhelpers';
import { catchError, displayToastify, invalidateQueries } from '../../../utils/helperfn';
import { getMergedHeadersForSpotify } from '../axios';
import { featureUrl } from '../coreappapis';
import { usePostUpdateData } from '../usereactquery_update';

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

    const refreshQueue = useCallback(() => {
        invalidateQueries(queryClient, [GET_SPOTIFY_QUEUE_STATE_QUERY_ID]);
    }, [queryClient]);

    const handleError = useCallback((error: any) => {
        catchError(error, darkTheme);
    }, [darkTheme]);

    // Mutations
    const playMutation = usePostUpdateData(
        `${featureUrl.spotify_base_url}?data=play`,
        updateHeaderConfig,
        refreshQueue,
        handleError
    );

    const pauseMutation = usePostUpdateData(
        `${featureUrl.spotify_base_url}?data=pause`,
        updateHeaderConfig,
        refreshQueue,
        handleError
    );

    const nextMutation = usePostUpdateData(
        `${featureUrl.spotify_base_url}?data=next`,
        updateHeaderConfig,
        refreshQueue,
        handleError
    );

    const previousMutation = usePostUpdateData(
        `${featureUrl.spotify_base_url}?data=previous`,
        updateHeaderConfig,
        refreshQueue,
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
        nextMutation.mutate({}, {
            url: `${featureUrl.spotify_base_url}?data=next&id=${deviceId}`
        } as any);
    }, [nextMutation]);

    const previous = useCallback((deviceId: string) => {
        previousMutation.mutate({}, {
            url: `${featureUrl.spotify_base_url}?data=previous&id=${deviceId}`
        } as any);
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
