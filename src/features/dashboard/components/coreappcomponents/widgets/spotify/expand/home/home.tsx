import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { IconContext } from 'react-icons';
import { FaSadTear } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import { useSpotifyQueueState } from '../../../../../../../../core/api/spotify/Api';
import { useSpotifyControls } from '../../../../../../../../core/api/spotify/useSpotifyControls';
import { SpotifyApiResponse, SpotifyPlaybackState } from '../../../../../../../../core/api/spotify/types';
import { useBackDropOpen } from '../../../../../../../../core/router/Themeprovider';
import {
    dark_colors,
    light_colors,
} from '../../../../../../../../data/ColorConstant';
import {
    LandscapeSizeS,
    // SPOTIFY_ACCOUNT_TYPE_GLOBAL,
    SPOTIFY_EXPAND_ADD_ALBUM_CONFIRMATION,
    SPOTIFY_TOKEN_GLOBAL,
    // spotifyNonPremiumWarning,
} from '../../../../../../../../data/Constants';
// import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../../../../data/Enum';
import { useProfileLocalStorage } from '../../../../../../../auth/utils/authhelpers';
import Confirmation from '../../../../../../../../shared/commoncomponents/backdrop/confirmation/Confirmation';
import Error from '../../../../../../../../shared/commoncomponents/errorpage/Errorpage';
import LoadingFade from '../../../../../../../../shared/commoncomponents/loadinganimation/Loadingfade';
import { trimToNChars } from '../../../../../../../../utils/HelperFn';
import SpotifyCurrentPlayback from '../../spotifycurrentplayback/Spotifycurrentplayback';
import SongTemplate from '../Songtemplate';
import './Home.css';

interface HomeProps {
    data: SpotifyApiResponse<SpotifyPlaybackState> | null;
    darkTheme: boolean;
}

export const Home = ({ data, darkTheme }: HomeProps) => {
    const color = darkTheme ? dark_colors : light_colors;
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();
    const [accessToken] = useProfileLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');

    const { addToAlbum } = useSpotifyControls(darkTheme);

    const {
        isLoading,
        isError,
        data: queueData,
    } = useSpotifyQueueState(accessToken, darkTheme);

    const filteredQueue = useMemo(() => {
        const queue = queueData?.data?.body?.queue ?? [];
        const currentItemId = data?.data?.body?.item?.id;

        return queue
            .filter((item: any, index: number, self: any[]) =>
                self.findIndex((i: any) => i.id === item.id) === index
            )
            .sort((a: any, b: any) => {
                const isCurrentA = currentItemId === a.id;
                const isCurrentB = currentItemId === b.id;
                return isCurrentA ? -1 : isCurrentB ? 1 : 0;
            });
    }, [queueData, data?.data?.body?.item?.id]);

    const albumInfo = data?.data?.body?.item?.album;

    return (
        <div className="spotify-expand-content-home">
            <section className="spotify-expand-content-home-widget">
                <SpotifyCurrentPlayback
                    data={data}
                    darkTheme={darkTheme}
                    windowSize="XL"
                />
            </section>

            <section
                style={{ backgroundColor: color.inner }}
                className="spotify-expand-content-home-wrapper"
            >
                <div
                    style={{ backgroundColor: color.element }}
                    className="spotify-expand-content-home-wrapper-header"
                >
                    <section className="spotify-expand-content-home-header-left">
                        <p style={{ color: color.success }}>
                            album:{' '}
                            <span style={{ color: color.text }}>
                                {albumInfo ? trimToNChars(albumInfo.name, 25) : 'N / A'}
                            </span>
                        </p>
                        {albumInfo && (
                            <motion.span
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                className="spotify-expand-content-home-wrapper-header-add-to-album"
                                onClick={() =>
                                    toggleBackDropOpen(
                                        SPOTIFY_EXPAND_ADD_ALBUM_CONFIRMATION,
                                        <Confirmation
                                            darkTheme={darkTheme}
                                            heading="Would you like to add this album to your collection?"
                                            btnOkFn={() => {
                                                addToAlbum(albumInfo.id);
                                                toggleBackDropClose(SPOTIFY_EXPAND_ADD_ALBUM_CONFIRMATION);
                                            }}
                                            btnCancelFn={() =>
                                                toggleBackDropClose(SPOTIFY_EXPAND_ADD_ALBUM_CONFIRMATION)
                                            }
                                            btnOkLabel="Yes, add"
                                            btnCancelLabel="Cancel"
                                        />,
                                        LandscapeSizeS,
                                    )
                                }
                            >
                                <IconContext.Provider value={{ size: '1.5em', color: color.success }}>
                                    <IoIosAddCircle />
                                </IconContext.Provider>
                            </motion.span>
                        )}
                    </section>
                    <section className="spotify-expand-content-home-header-right">
                        <p style={{ color: color.success }}>
                            {albumInfo?.total_tracks ?? '0'}{' '}
                            <span style={{ color: color.text }}>songs in album</span>
                        </p>
                    </section>
                </div>

                <div className="spotify-expand-content-home-wrapper-song">
                    {isLoading ? (
                        <div className="spotify-expand-content-home-wrapper-song-isLoading">
                            <LoadingFade />
                        </div>
                    ) : isError ? (
                        <div className="spotify-expand-content-home-wrapper-song-isError">
                            <Error enableBtn={false} />
                        </div>
                    ) : filteredQueue.length === 0 ? (
                        <section className="spotify-expand-content-home-wrapper-song-empty">
                            <IconContext.Provider value={{ size: '15em', color: color.element }}>
                                <FaSadTear />
                            </IconContext.Provider>
                        </section>
                    ) : (
                        filteredQueue.map((item: any, index: number) => (
                            <SongTemplate
                                key={item.id}
                                contextUri={data?.data?.body?.context?.uri}
                                trackUri={item.uri}
                                darkTheme={darkTheme}
                                index={index}
                                imgUrl={item.album?.images[0]?.url}
                                name={item.name}
                                artist={item.album?.artists[0]?.name}
                                durationMs={item.duration_ms}
                                playbackData={data}
                                id={item.id}
                                showAddToQueue={false}
                            />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
