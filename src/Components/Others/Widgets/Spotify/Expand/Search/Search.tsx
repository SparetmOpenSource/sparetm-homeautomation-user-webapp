import { useMemo, useState } from 'react';
import {
    dark_colors,
    light_colors,
} from '../../../../../../Data/ColorConstant';
import DoSearch from '../../../../Search/DoSearch';
import './Search.css';
import { useSpotifySearch } from '../../../../../../Hooks/useSpotifySearch';
import SongTemplate from '../SongTemplate';
import {
    LandscapeSizeS,
    SPOTIFY_EXPAND_ADD_TRACK_TO_QUEUE_CONFIRMATION,
    spotifyNonPremiumWarning,
    spotifyQueueAddition,
} from '../../../../../../Data/Constants';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../../Data/Enum';
import { catchError, displayToastify } from '../../../../../../Utils/HelperFn';
import { getMergedHeadersForSpotify } from '../../../../../../Api.tsx/Axios';
import { usePostUpdateData } from '../../../../../../Api.tsx/useReactQuery_Update';
import { featureUrl } from '../../../../../../Api.tsx/CoreAppApis';
import { IconContext } from 'react-icons';
import LoadingFade from '../../../../LoadingAnimation/LoadingFade';
import { FaSadTear } from 'react-icons/fa';
import Confirmation from '../../../../BackDrop/Confirmation/Confirmation';
import { useBackDropOpen } from '../../../../../../Pages/ThemeProvider';
import useLocalStorage from '../../../../../../Hooks/UseLocalStorage';
import { SPOTIFY_TOKEN_GLOBAL, SPOTIFY_ACCOUNT_TYPE_GLOBAL } from '../../../../../../Data/Constants';

const Search = ({ data, darkTheme }: any) => {
    const [query, setQuery] = useState('');
    const [accessToken] = useLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');
    const [spotifyAcntType] = useLocalStorage(SPOTIFY_ACCOUNT_TYPE_GLOBAL, '');
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();
    const {
        data: results,
        isLoading,
        isError,
    } = useSpotifySearch(query, accessToken);

    const color = useMemo(
        () => (darkTheme ? dark_colors : light_colors),
        [darkTheme],
    );

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

    const useSpotifyMutation = (
        urlSuffix: string,
        headers: any,
        onSuccess: any,
        onError: any,
    ) =>
        usePostUpdateData(
            featureUrl.spotify_base_url + `?data=${urlSuffix}`,
            headers,
            onSuccess,
            onError,
        );

    const onError = (error: any) => catchError(error, darkTheme);

    const playMutation = useSpotifyMutation(
        'play',
        updateHeaderConfig,
        () => {},
        onError,
    );

    const startPlayingFn = (
        trackUri: string,
        data: any,
        contextUri: string,
    ) => {
        if (spotifyAcntType === 'premium') {
            playMutation.mutate({
                device_ids: [`${data?.body?.device?.id}`],
                context_uri: `${contextUri}`,
                offset: { uri: `${trackUri}` },
                position_ms: 0,
            });
        } else {
            displayToastify(
                spotifyNonPremiumWarning,
                darkTheme ? TOASTIFYCOLOR.LIGHT : TOASTIFYCOLOR.DARK,
                TOASTIFYSTATE.WARN,
            );
        }
    };

    const trackArray = results?.body?.tracks?.items ?? [];

    const filteredQueue = trackArray
        .filter(
            (item: any, index: any, self: any) =>
                self.findIndex((i: any) => i.id === item.id) === index,
        )
        .sort((a: any, b: any) => {
            const isCurrentA = data?.body?.item?.id === a.id;
            const isCurrentB = data?.body?.item?.id === b.id;
            return isCurrentA ? -1 : isCurrentB ? 1 : 0;
        });

    return (
        <div className="search" style={{ backgroundColor: color?.inner }}>
            <section className="search_bar">
                <DoSearch
                    placeholder="Search for songs, artists, albums..."
                    darkTheme={darkTheme}
                    value={query}
                    onChange={(e: any) => setQuery(e?.target?.value)}
                />
            </section>
            <section
                className="search_result"
                style={{ backgroundColor: color?.outer }}
            >
                {isLoading && (
                    <div className="search_result-isLoading">
                        <LoadingFade />
                    </div>
                )}
                {!isLoading && trackArray.length === 0 && (
                    <span className="search_result-empty">
                        <IconContext.Provider
                            value={{ size: '15em', color: color.element }}
                        >
                            <FaSadTear />
                        </IconContext.Provider>
                        <p style={{ color: color?.success }}>
                            Looking for some music? Just start typing.
                        </p>
                    </span>
                )}
                {trackArray.length !== 0 &&
                    !isLoading &&
                    !isError &&
                    filteredQueue?.map((item: any, index: any) => (
                        <SongTemplate
                            key={item?.id}
                            contextUri={item?.album?.uri}
                            startPlayingFn={startPlayingFn}
                            trackUri={item?.uri}
                            darkTheme={darkTheme}
                            index={index}
                            imgUrl={item?.album?.images[0]?.url}
                            imgType="img"
                            name={item?.name}
                            artist={item?.album?.artists[0]?.name}
                            durationMs={item?.duration_ms}
                            data={data}
                            id={item?.id}
                            fnToAddTrackToQueue={() =>
                                addTrackToQueue(
                                    data?.body?.device?.id,
                                    item?.uri,
                                )
                            }
                            showAddToQueue={true}
                        />
                    ))}
            </section>
        </div>
    );
};

export default Search;
