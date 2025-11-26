// refactor code -----------------------------
import { useCallback } from 'react';
import { catchError } from '../../../../Utils/HelperFn';
import { useReactQuery_Get } from '../../../../Api.tsx/useReactQuery_Get';
import {
    getPlaybackState,
    setting_up_token,
} from '../../../../Api.tsx/Spotify/Api';

import { spotify_refresh_playback_constant } from '../../../../Data/Constants';
import { useTheme } from '../../../../Pages/ThemeProvider';
import { GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID } from '../../../../Data/QueryConstant';
import SpotifyCurrentPlayback from './SpotifyCurrentPlayback/SpotifyCurrentPlayback';
import { usePostUpdateData } from '../../../../Api.tsx/useReactQuery_Update';
import { profileUrl } from '../../../../Api.tsx/ProfileConfigApis';
import { updateHeaderConfig } from '../../../../Api.tsx/Axios';
import useLocalStorage from '../../../../Hooks/UseLocalStorage';
import {
    Current_Date_Time,
    SPOTIFY_TOKEN_GLOBAL,
    SPOTIFY_REFRESH_TOKEN_GLOBAL,
    SPOTIFY_ACCOUNT_TYPE_GLOBAL,
    SPOTIFY_TOKEN_FETCHED_GLOBAL,
    SPOTIFY_TOKEN_FETCHED_TIME_GLOBAL,
} from '../../../../Data/Constants';

export const SpotifyActive = ({ handleRefresh }: any) => {
    const darkTheme: any = useTheme();
    const [accessToken, setAccessToken] = useLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');
    const [refreshToken, setRefreshToken] = useLocalStorage(SPOTIFY_REFRESH_TOKEN_GLOBAL, '');
    const [, setAccountType] = useLocalStorage(SPOTIFY_ACCOUNT_TYPE_GLOBAL, '');
    const [, setTokenFetched] = useLocalStorage(SPOTIFY_TOKEN_FETCHED_GLOBAL, false);
    const [, setTokenFetchedTime] = useLocalStorage(SPOTIFY_TOKEN_FETCHED_TIME_GLOBAL, '');

    const on_success = (data: any) => {
        const { access_token, refresh_token, accountType: acctType } = setting_up_token(data);
        if (access_token && refresh_token) {
            setAccessToken(access_token);
            setRefreshToken(refresh_token);
            setTokenFetched(true);
            setTokenFetchedTime(Current_Date_Time);
            handleRefresh();
        }
        if (acctType) {
            setAccountType(acctType);
        }
    };

    const on_error = (error: any) => {
        catchError(error, darkTheme);
    };

    const { mutate: callForAccessTokenByRefreshToken } = usePostUpdateData(
        profileUrl.get_spotify_refresh_access_token,
        updateHeaderConfig,
        on_success,
        on_error,
    );

    const playbackStateFn = useCallback(() => {
        return getPlaybackState(callForAccessTokenByRefreshToken, accessToken, refreshToken);
    }, [callForAccessTokenByRefreshToken, accessToken, refreshToken]);

    const { data } = useReactQuery_Get(
        GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID,
        playbackStateFn,
        () => {},
        (error: any) => catchError(error, darkTheme),
        true,
        true,
        false,
        spotify_refresh_playback_constant.play_back_fetch_delay_time,
        false,
        300000,
        0,
    );

    return (
        <div className="spotify-container">
            <SpotifyCurrentPlayback
                data={data}
                darkTheme={darkTheme}
                handleRefresh={handleRefresh}
                windowSize="S"
            />
        </div>
    );
};
