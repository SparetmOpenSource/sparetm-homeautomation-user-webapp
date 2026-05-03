import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSpotifyControls } from '../../../../core/api/spotify/useSpotifyControls';
import { SpotifyApiResponse, SpotifyPlaybackState } from '../../../../core/api/spotify/types';
import { dark_colors, light_colors } from '../../../../data/colorconstant';
import { SPOTIFY_ACCOUNT_TYPE_GLOBAL, SPOTIFY_PREMIUM_ACCOUNT_TYPE, spotifyNonPremiumWarning } from '../../../../data/constants';
import { useProfileLocalStorage } from '../../../../features/auth/utils/authhelpers';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../data/enum';
import {
    displayToastify,
    formatTime,
} from '../../../../utils/helperfn';
import './audioprogressbar.css';

interface AudioProgressBarProps {
    totalTimeMs: number;
    progressTimeMs: number;
    onSeek: (position: number) => void;
    currentPlaybackData: SpotifyApiResponse<SpotifyPlaybackState> | null;
    darkTheme: boolean;
}

const AudioProgressBar = ({
    totalTimeMs,
    progressTimeMs,
    onSeek,
    currentPlaybackData,
    darkTheme,
}: AudioProgressBarProps) => {
    const totalTimeSec = totalTimeMs / 1000;
    const [currentTime, setCurrentTime] = useState(progressTimeMs / 1000);
    const [isSeeking, setIsSeeking] = useState(false);
    const [spotifyAcntType] = useProfileLocalStorage(SPOTIFY_ACCOUNT_TYPE_GLOBAL, '');
    const isPremium = spotifyAcntType?.trim().toLowerCase() === SPOTIFY_PREMIUM_ACCOUNT_TYPE;
    
    const color = useMemo(() => (darkTheme ? dark_colors : light_colors), [darkTheme]);
    const { seek } = useSpotifyControls(darkTheme);

    // Sync current time when not seeking
    useEffect(() => {
        if (!isSeeking) {
            setCurrentTime(progressTimeMs / 1000);
        }
    }, [progressTimeMs, isSeeking]);

    const handleSeek = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (isPremium) {
                setIsSeeking(true);
                setCurrentTime(Number(e.target.value));
            }
        },
        [isPremium],
    );

    const handleSeekEnd = useCallback(
        (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
            if (isPremium) {
                const seekTime = parseFloat((e.target as HTMLInputElement).value) * 1000;
                const deviceId = currentPlaybackData?.data?.body?.device?.id;
                
                setCurrentTime(seekTime / 1000);
                onSeek(seekTime);
                
                if (deviceId) {
                    seek(deviceId, seekTime);
                }
                setIsSeeking(false);
            } else {
                displayToastify(
                    spotifyNonPremiumWarning,
                    darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
                    TOASTIFYSTATE.WARN,
                );
            }
        },
        [isPremium, currentPlaybackData, darkTheme, onSeek, seek],
    );

    return (
        <div
            className="progress-container"
            style={{
                backgroundColor: color.outer,
                color: color.text,
            }}
        >
            <span className="time-label">{formatTime(currentTime)}</span>
            <input
                type="range"
                min="0"
                max={totalTimeSec || 1}
                value={currentTime}
                onChange={handleSeek}
                onMouseUp={handleSeekEnd}
                onTouchEnd={handleSeekEnd}
                className="progress-bar"
                disabled={!isPremium}
            />
            <span className="time-label">{formatTime(totalTimeSec)}</span>
        </div>
    );
};

export default AudioProgressBar;
