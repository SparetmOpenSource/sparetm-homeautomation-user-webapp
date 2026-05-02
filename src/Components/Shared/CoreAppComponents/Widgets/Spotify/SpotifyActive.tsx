// refactor code -----------------------------
import { useSpotifyPlaybackState } from '../../../../../Api.tsx/Spotify/Api';
import { useTheme } from '../../../../../Pages/ThemeProvider';
import SpotifyCurrentPlayback from './SpotifyCurrentPlayback/SpotifyCurrentPlayback';
import useLocalStorage from '../../../../../Hooks/UseLocalStorage';
import {
    SPOTIFY_TOKEN_GLOBAL,
} from '../../../../../Data/Constants';

export const SpotifyActive = ({ handleRefresh }: any) => {
    const darkTheme: any = useTheme();
    const [accessToken] = useLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');

    const { data } = useSpotifyPlaybackState(accessToken, darkTheme);

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
