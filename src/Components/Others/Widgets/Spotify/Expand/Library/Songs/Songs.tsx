// import './Songs.css';
// import SongTemplate from '../../SongTemplate';

// const Songs = ({
//     type,
//     data,
//     songData,
//     contextUri,
//     startPlayingFn,
//     darkTheme,
//     fnToAddTrackToQueue,
// }: any) => {
//     return (
//         <div className="spotify-library-songs">
//             {type === 1 &&
//                 songData
//                     ?.filter((item: any, index: number, self: any) => {
//                         return (
//                             self.findIndex(
//                                 (i: any) => i?.track?.id === item?.track?.id,
//                             ) === index
//                         );
//                     })
//                     ?.map((item: any, index: number) => (
//                         <SongTemplate
//                             key={item?.track?.id}
//                             contextUri={contextUri}
//                             startPlayingFn={startPlayingFn}
//                             trackUri={item?.track?.uri}
//                             darkTheme={darkTheme}
//                             index={index}
//                             // imgUrl={item?.album?.images[0]?.url}
//                             imgType="icon"
//                             name={item?.track?.name}
//                             artist={item?.track?.artists[0]?.name}
//                             durationMs={item?.track?.duration_ms}
//                             data={data}
//                             id={item?.track?.id}
//                             fnToAddTrackToQueue={fnToAddTrackToQueue}
//                             showAddToQueue={true}
//                         />
//                     ))}
//             {type === 2 &&
//                 songData
//                     ?.filter((item: any, index: number, self: any) => {
//                         return (
//                             self.findIndex((i: any) => i.id === item.id) ===
//                             index
//                         );
//                     })
//                     ?.map((item: any, index: number) => (
//                         <SongTemplate
//                             key={item?.id}
//                             contextUri={contextUri}
//                             startPlayingFn={startPlayingFn}
//                             trackUri={item?.uri}
//                             darkTheme={darkTheme}
//                             index={index}
//                             // imgUrl={item?.album?.images[0]?.url}
//                             imgType="icon"
//                             name={item?.name}
//                             artist={item?.artists[0]?.name}
//                             durationMs={item?.duration_ms}
//                             data={data}
//                             id={item?.id}
//                             fnToAddTrackToQueue={fnToAddTrackToQueue}
//                             showAddToQueue={true}
//                         />
//                     ))}
//         </div>
//     );
// };

// export default Songs;

// refactor code -----------------------------
import './Songs.css';
import SongTemplate from '../../SongTemplate';
import { memo, useMemo } from 'react';

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
    fnToAddTrackToQueue: (track: any) => void;
}

const Songs = ({
    type,
    data,
    songData,
    contextUri,
    startPlayingFn,
    darkTheme,
    fnToAddTrackToQueue,
}: SongsProps) => {
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
                fnToAddTrackToQueue={fnToAddTrackToQueue}
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
