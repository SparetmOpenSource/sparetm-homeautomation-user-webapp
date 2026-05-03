import { useMemo, useState } from 'react';
import { IconContext } from 'react-icons';
import { FaSadTear } from 'react-icons/fa';
import { useBackDropOpen } from '../../../../../../../../core/router/themeprovider';
import {
    dark_colors,
    light_colors,
} from '../../../../../../../../data/colorconstant';
import {
    LandscapeSizeS,
    // SPOTIFY_ACCOUNT_TYPE_GLOBAL,
    SPOTIFY_EXPAND_ADD_TRACK_TO_QUEUE_CONFIRMATION,
    SPOTIFY_TOKEN_GLOBAL
} from '../../../../../../../../data/constants';
import { useProfileLocalStorage } from '../../../../../../../../features/auth/utils/authhelpers';
import Confirmation from '../../../../../../../../shared/commoncomponents/backdrop/confirmation/confirmation';
import LoadingFade from '../../../../../../../../shared/commoncomponents/loadinganimation/loadingfade';
import DoSearch from '../../../../../../../../shared/commoncomponents/search/dosearch';
import { useSpotifySearch } from '../../../../../../../spotify/hooks/usespotifysearch';
import { useSpotifyControls } from '../../../../../../../../core/api/spotify/useSpotifyControls';
import { SpotifyApiResponse, SpotifyPlaybackState } from '../../../../../../../../core/api/spotify/types';
import SongTemplate from '../songtemplate';
import './search.css';

interface SearchProps {
    data: SpotifyApiResponse<SpotifyPlaybackState> | null;
    darkTheme: boolean;
}

const Search = ({ data, darkTheme }: SearchProps) => {
    const [query, setQuery] = useState('');
    const [accessToken] = useProfileLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();

    const {
        data: results,
        isLoading,
        isError,
    } = useSpotifySearch(query, accessToken);

    const color = darkTheme ? dark_colors : light_colors;
    const { addToQueue } = useSpotifyControls(darkTheme);

    const handleAddTrackToQueue = (trackUri: string) => {
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
    };

    const trackArray = useMemo(() => results?.data?.body?.tracks?.items ?? [], [results]);

    const filteredResults = useMemo(() => {
        const currentItemId = data?.data?.body?.item?.id;
        return trackArray
            .filter((item: any, index: number, self: any[]) =>
                self.findIndex((i) => i.id === item.id) === index
            )
            .sort((a: any, b: any) => {
                const isCurrentA = currentItemId === a.id;
                const isCurrentB = currentItemId === b.id;
                return isCurrentA ? -1 : isCurrentB ? 1 : 0;
            });
    }, [trackArray, data?.data?.body?.item?.id]);

    return (
        <div className="search" style={{ backgroundColor: color.inner }}>
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
                style={{ backgroundColor: color.outer }}
            >
                {isLoading ? (
                    <div className="search_result-isLoading">
                        <LoadingFade />
                    </div>
                ) : trackArray.length === 0 ? (
                    <span className="search_result-empty">
                        <IconContext.Provider value={{ size: '15em', color: color.element }}>
                            <FaSadTear />
                        </IconContext.Provider>
                        <p style={{ color: color.success }}>
                            Looking for some music? Just start typing.
                        </p>
                    </span>
                ) : isError ? (
                    <div className="search_result-error">Error loading results.</div>
                ) : (
                    filteredResults.map((item: any, index: number) => (
                        <SongTemplate
                            key={item.id}
                            contextUri={item.album?.uri}
                            trackUri={item.uri}
                            darkTheme={darkTheme}
                            index={index}
                            imgUrl={item.album?.images[0]?.url}
                            name={item.name}
                            artist={item.album?.artists[0]?.name}
                            durationMs={item.duration_ms}
                            playbackData={data}
                            id={item.id}
                            fnToAddTrackToQueue={() => handleAddTrackToQueue(item.uri)}
                            showAddToQueue={true}
                        />
                    ))
                )}
            </section>
        </div>
    );
};

export default Search;
