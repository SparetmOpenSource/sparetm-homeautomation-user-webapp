import { useEffect, useState } from 'react';
import './AudioProgressBar.css';
import { formatTime } from '../../../../Utils/HelperFn';
import { featureUrl } from '../../../../Api.tsx/CoreAppApis';
import { getMergedHeaders } from '../../../../Api.tsx/Axios';
import { usePostUpdateData } from '../../../../Api.tsx/useReactQuery_Update';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';

const AudioProgressBar = ({
    totalTimeMs,
    progressTimeMs,
    onSeek,
    currentPlaybackData,
    darkTheme,
}: any) => {
    const totalTimeSec = totalTimeMs / 1000; // Convert ms to sec
    const [currentTime, setCurrentTime] = useState(progressTimeMs / 1000);
    const [isSeeking, setIsSeeking] = useState(false);
    const [color, setColor] = useState<any>(light_colors);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    const on_success_for_seek = (data: any) => {
        // console.log(data);
    };

    const on_error_for_seek = (error: any) => {};

    const updateHeaderConfig = {
        headers: getMergedHeaders(localStorage.getItem('spotify_access_token')),
    };

    const { mutate: seekPosition } = usePostUpdateData(
        featureUrl.spotify_base_url + '?data=seek',
        updateHeaderConfig,
        on_success_for_seek,
        on_error_for_seek,
    );

    useEffect(() => {
        if (!isSeeking) {
            setCurrentTime(progressTimeMs / 1000); // Sync with external progress updates
        }
    }, [progressTimeMs, isSeeking]);

    const handleSeek = (e: any) => {
        setIsSeeking(true);
        setCurrentTime(e.target.value);
    };

    const handleSeekEnd = (e: any) => {
        const seekTime = parseFloat(e.target.value) * 1000; // Convert back to ms
        setCurrentTime(seekTime / 1000);
        onSeek(seekTime); // Notify parent component about the seek
        seekPosition({
            position_ms: seekTime,
            device_ids: [`${currentPlaybackData?.body?.device?.id}`],
        });
        setIsSeeking(false);
    };

    return (
        <div
            className="progress-container"
            style={{
                backgroundColor: color?.outer,
                color: color?.text,
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
                // style={{
                //     backgroundColor: color?.button,
                // }}
            />
            <span className="time-label">{formatTime(totalTimeSec)}</span>
        </div>
    );
};

export default AudioProgressBar;
