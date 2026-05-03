import { memo, useMemo, useCallback } from 'react';
import { useBackDropOpen } from '../../../../../../../../../core/router/themeprovider';
import {
    LandscapeSizeS,
    SPOTIFY_EXPAND_ADD_TRACK_TO_QUEUE_CONFIRMATION,
} from '../../../../../../../../../data/constants';
import Confirmation from '../../../../../../../../../shared/commoncomponents/backdrop/confirmation/confirmation';
import { useSpotifyControls } from '../../../../../../../../../core/api/spotify/useSpotifyControls';
import { SpotifyApiResponse, SpotifyPlaybackState, SpotifyTrack } from '../../../../../../../../../core/api/spotify/types';
import SongTemplate from '../../songtemplate';
import './songs.css';

interface SongItem {
    id?: string;
    uri?: string;
    name?: string;
    artists?: { name: string }[];
    duration_ms?: number;
    track?: SpotifyTrack;
}

interface SongsProps {
    type: number;
    data: SpotifyApiResponse<SpotifyPlaybackState> | null;
    songData: SongItem[];
    contextUri?: string;
    darkTheme: boolean;
    offset?: number;
}

const Songs = ({
    type,
    data,
    songData,
    contextUri,
    darkTheme,
    offset,
}: SongsProps) => {
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();
    const { addToQueue } = useSpotifyControls(darkTheme);

    const getUniqueSongs = useMemo(() => {
        if (!songData) return [];

        const isType1 = type === 1;
        return songData.filter((item, index, self) => {
            const idToCompare = isType1 ? item?.track?.id : item?.id;
            return (
                self.findIndex(
                    (i) => (isType1 ? i?.track?.id : i?.id) === idToCompare,
                ) === index
            );
        });
    }, [type, songData]);

    const handleAddTrackToQueue = useCallback((trackUri: string) => {
        const deviceId = data?.data?.body?.device?.id;
        if (!deviceId) return;

        const backdropId = SPOTIFY_EXPAND_ADD_TRACK_TO_QUEUE_CONFIRMATION;
        toggleBackDropOpen(
            backdropId,
            <Confirmation
                darkTheme={darkTheme}
                heading="Would you like to add this track to your queue?"
                btnOkFn={() => {
                    addToQueue(deviceId, trackUri);
                    toggleBackDropClose(backdropId);
                }}
                btnCancelFn={() => toggleBackDropClose(backdropId)}
                btnOkLabel="Yes, add"
                btnCancelLabel="Cancel"
            />,
            LandscapeSizeS,
        );
    }, [data, darkTheme, addToQueue, toggleBackDropOpen, toggleBackDropClose]);

    const renderSongItem = (item: SongItem, index: number) => {
        const isType1 = type === 1;
        const track = isType1 ? item?.track : (item as unknown as SpotifyTrack);

        if (!track?.id || !track.uri || !track.name) return null;

        return (
            <SongTemplate
                key={track.id}
                contextUri={contextUri}
                trackUri={track.uri}
                darkTheme={darkTheme}
                index={index + (offset || 0)}
                name={track.name}
                artist={track.artists?.[0]?.name || 'Unknown Artist'}
                durationMs={track.duration_ms || 0}
                playbackData={data}
                id={track.id}
                fnToAddTrackToQueue={() => handleAddTrackToQueue(track.uri)}
                showAddToQueue={true}
            />
        );
    };

    return (
        <div className="spotify-library-songs">
            {getUniqueSongs.map(renderSongItem)}
        </div>
    );
};

export default memo(Songs);
