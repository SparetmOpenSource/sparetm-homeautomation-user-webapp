// refactor code -----------------------------
import './Songs.css';
import SongTemplate from '../../SongTemplate';
import { memo, useMemo } from 'react';
import { useBackDropOpen } from '../../../../../../../Pages/ThemeProvider';
import {
    catchError,
    displayToastify,
} from '../../../../../../../Utils/HelperFn';
import {
    LandscapeSizeS,
    SPOTIFY_EXPAND_ADD_TRACK_TO_QUEUE_CONFIRMATION,
    spotifyQueueAddition,
} from '../../../../../../../Data/Constants';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../../../Data/Enum';
import { getMergedHeadersForSpotify } from '../../../../../../../Api.tsx/Axios';
import { usePostUpdateData } from '../../../../../../../Api.tsx/useReactQuery_Update';
import { featureUrl } from '../../../../../../../Api.tsx/CoreAppApis';
import Confirmation from '../../../../../BackDrop/Confirmation/Confirmation';
import useLocalStorage from '../../../../../../../Hooks/UseLocalStorage';
import { SPOTIFY_TOKEN_GLOBAL } from '../../../../../../../Data/Constants';

interface Artist {
    name: string;
}

interface Track {
    id: string;
    uri: string;
    name: string;
    artists: Artist[];
    duration_ms: number;
}

interface SongItem {
    id?: string;
    uri?: string;
    name?: string;
    artists?: Artist[];
    duration_ms?: number;
    track?: Track;
}

interface SongsProps {
    type: number;
    data: any;
    songData: SongItem[];
    contextUri: string;
    startPlayingFn: (uri: string, data: any, contextUri: string) => void;
    darkTheme: boolean;
}

const Songs = ({
    type,
    data,
    songData,
    contextUri,
    startPlayingFn,
    darkTheme,
}: SongsProps) => {
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();
    const [accessToken] = useLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');
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

    const on_add_to_queue_success = () => {
        displayToastify(
            spotifyQueueAddition,
            darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
            TOASTIFYSTATE.SUCCESS,
        );
        toggleBackDropClose(SPOTIFY_EXPAND_ADD_TRACK_TO_QUEUE_CONFIRMATION);
    };

    const on_error = (error: any) => {
        catchError(error, darkTheme);
    };

    const updateHeaderConfig = {
        headers: getMergedHeadersForSpotify(accessToken),
    };

    const { mutate: addToQueue } = usePostUpdateData(
        featureUrl.spotify_base_url + `?data=addtoqueue`,
        updateHeaderConfig,
        on_add_to_queue_success,
        on_error,
    );

    const addTrackToQueue = (
        deviceId: string | undefined,
        trackUri: string | undefined,
    ) => {
        const backdropId = SPOTIFY_EXPAND_ADD_TRACK_TO_QUEUE_CONFIRMATION;
        toggleBackDropOpen(
            backdropId,
            <Confirmation
                darkTheme={darkTheme}
                heading="Would you like to add this track to your queue?"
                btnOkFn={() => {
                    addToQueue({
                        id: deviceId,
                        track_uri: trackUri,
                    });
                    toggleBackDropClose(backdropId);
                }}
                btnCancelFn={() => toggleBackDropClose(backdropId)}
                btnOkLabel="Yes, add"
                btnCancelLabel="Cancel"
            />,
            LandscapeSizeS,
        );
    };

    const renderSongItem = (item: SongItem, index: number) => {
        const isType1 = type === 1;
        const track = isType1 ? item?.track : item;

        if (!track?.id) return null;

        return (
            <SongTemplate
                key={track.id}
                contextUri={contextUri}
                startPlayingFn={startPlayingFn}
                trackUri={track.uri}
                darkTheme={darkTheme}
                index={index}
                imgType="icon"
                name={track.name}
                artist={track.artists?.[0]?.name}
                durationMs={track.duration_ms}
                data={data}
                id={track.id}
                fnToAddTrackToQueue={() =>
                    addTrackToQueue(data?.body?.device?.id, track?.uri)
                }
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
