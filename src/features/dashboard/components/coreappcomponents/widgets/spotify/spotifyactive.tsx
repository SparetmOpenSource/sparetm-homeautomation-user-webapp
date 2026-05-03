// refactor code -----------------------------
import { useEffect } from 'react';
import { useSpotifyPlaybackState, useSpotifyProfileState } from '../../../../../../core/api/spotify/api';
import { useTheme } from '../../../../../../core/router/themeprovider';
import {
    SPOTIFY_ACCOUNT_TYPE_GLOBAL,
    SPOTIFY_PREMIUM_ACCOUNT_TYPE,
    SPOTIFY_TOKEN_GLOBAL,
    spotifyFreeAccountWarning,
} from '../../../../../../data/constants';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../../data/enum';
import { useProfileLocalStorage } from '../../../../../../features/auth/utils/authhelpers';
import { displayToastify } from '../../../../../../utils/helperfn';
import SpotifyCurrentPlayback from './spotifycurrentplayback/spotifycurrentplayback';

interface SpotifyActiveProps {
    handleRefresh: () => void;
}

export const SpotifyActive = ({ handleRefresh }: SpotifyActiveProps) => {
    const darkTheme = useTheme() as boolean;
    const [accessToken] = useProfileLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');
    const [spotifyAcntType, setAccountType] = useProfileLocalStorage(SPOTIFY_ACCOUNT_TYPE_GLOBAL, '');

    const isPremium = spotifyAcntType?.trim().toLowerCase() === SPOTIFY_PREMIUM_ACCOUNT_TYPE;
    // Increase polling interval for free accounts to 10s if they are getting errors, or just as a precaution
    const pollInterval = isPremium ? undefined : 10000;

    const { data } = useSpotifyPlaybackState(accessToken, darkTheme, pollInterval);
    const { data: profileData } = useSpotifyProfileState(accessToken, darkTheme);

    // Sync account type from profile data to ensure accuracy
    useEffect(() => {
        const product = profileData?.data?.body?.product;
        if (product && product !== spotifyAcntType) {
            setAccountType(product);
        }
    }, [profileData, spotifyAcntType, setAccountType]);

    useEffect(() => {
        if (spotifyAcntType && spotifyAcntType.trim().toLowerCase() !== SPOTIFY_PREMIUM_ACCOUNT_TYPE) {
            const hasShownWarning = sessionStorage.getItem('spotify_free_warning_shown');
            if (!hasShownWarning) {
                displayToastify(
                    spotifyFreeAccountWarning,
                    darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
                    TOASTIFYSTATE.INFO
                );
                sessionStorage.setItem('spotify_free_warning_shown', 'true');
            }
        }
    }, [spotifyAcntType, darkTheme]);

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
