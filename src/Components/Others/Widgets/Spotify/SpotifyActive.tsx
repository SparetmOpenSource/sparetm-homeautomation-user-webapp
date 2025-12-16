// refactor code -----------------------------
import { useCallback } from 'react';
import { catchError } from '../../../../Utils/HelperFn';
import { useReactQuery_Get } from '../../../../Api.tsx/useReactQuery_Get';
import {
    getPlaybackState,
} from '../../../../Api.tsx/Spotify/Api';


import { spotify_refresh_playback_constant } from '../../../../Data/Constants';
import { useTheme } from '../../../../Pages/ThemeProvider';
import { GET_SPOTIFY_PLAYBACK_STATE_QUERY_ID } from '../../../../Data/QueryConstant';
import SpotifyCurrentPlayback from './SpotifyCurrentPlayback/SpotifyCurrentPlayback';
import useLocalStorage from '../../../../Hooks/UseLocalStorage';
import {
    SPOTIFY_TOKEN_GLOBAL,
} from '../../../../Data/Constants';

export const SpotifyActive = ({ handleRefresh }: any) => {
    const darkTheme: any = useTheme();
    const [accessToken] = useLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');



    const playbackStateFn = useCallback(() => {
        return getPlaybackState(accessToken);
    }, [accessToken]);

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
