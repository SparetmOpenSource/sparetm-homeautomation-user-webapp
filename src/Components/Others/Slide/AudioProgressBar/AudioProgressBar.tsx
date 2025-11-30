import { useEffect, useMemo, useState, useCallback } from 'react';
import './AudioProgressBar.css';
import {
    catchError,
    displayToastify,
    formatTime,
} from '../../../../Utils/HelperFn';
import { featureUrl } from '../../../../Api.tsx/CoreAppApis';
import { getMergedHeadersForSpotify } from '../../../../Api.tsx/Axios';
import { usePostUpdateData } from '../../../../Api.tsx/useReactQuery_Update';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { spotifyNonPremiumWarning } from '../../../../Data/Constants';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../Data/Enum';
import useLocalStorage from '../../../../Hooks/UseLocalStorage';
import { SPOTIFY_TOKEN_GLOBAL, SPOTIFY_ACCOUNT_TYPE_GLOBAL } from '../../../../Data/Constants';

type AudioProgressBarProps = {
    totalTimeMs: number;
    progressTimeMs: number;
    onSeek: (position: number) => void;
    currentPlaybackData: any;
    darkTheme: boolean;
};

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
    const [spotifyAcntType] = useLocalStorage(SPOTIFY_ACCOUNT_TYPE_GLOBAL, '');
    const [accessToken] = useLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');
    const color = useMemo(
        () => (darkTheme ? dark_colors : light_colors),
        [darkTheme],
    );

    // useEffect to sync current time when not seeking
    useEffect(() => {
        if (!isSeeking) {
            setCurrentTime(progressTimeMs / 1000);
        }
    }, [progressTimeMs, isSeeking]);

    // Update seek API call config
    const updateHeaderConfig = useMemo(
        () => ({
            headers: getMergedHeadersForSpotify(accessToken),
        }),
        [accessToken],
    );

    const onSuccessSeek = () => {};
    const onErrorSeek = useCallback(
        (error: any) => {
            catchError(error, darkTheme);
        },
        [darkTheme],
    );

    const { mutate: seekPosition } = usePostUpdateData(
        `${featureUrl.spotify_base_url}?data=seek`,
        updateHeaderConfig,
        onSuccessSeek,
        onErrorSeek,
    );

    // Handlers
    const handleSeek = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (spotifyAcntType === 'premium') {
                setIsSeeking(true);
                setCurrentTime(Number(e.target.value));
            }
        },
        [spotifyAcntType],
    );

    const handleSeekEnd = useCallback(
        (
            e:
                | React.MouseEvent<HTMLInputElement>
                | React.TouchEvent<HTMLInputElement>,
        ) => {
            if (spotifyAcntType === 'premium') {
                const seekTime =
                    parseFloat((e.target as HTMLInputElement).value) * 1000;
                setCurrentTime(seekTime / 1000);
                onSeek(seekTime);
                seekPosition({
                    position_ms: seekTime,
                    device_ids: [`${currentPlaybackData?.body?.device?.id}`],
                });
                setIsSeeking(false);
            } else {
                displayToastify(
                    spotifyNonPremiumWarning,
                    darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
                    TOASTIFYSTATE.WARN,
                );
            }
        },
        [spotifyAcntType, currentPlaybackData, darkTheme, onSeek, seekPosition],
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
            />
            <span className="time-label">{formatTime(totalTimeSec)}</span>
        </div>
    );
};

export default AudioProgressBar;
