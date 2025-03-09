import React from 'react';
import './Songs.css';
import SongTemplate from '../../SongTemplate';

const Songs = ({
    data,
    albumData,
    contextUri,
    startPlayingFn,
    darkTheme,
}: any) => {
    return (
        <div className="spotify-library-songs">
            {albumData
                ?.filter((item: any, index: number, self: any) => {
                    return (
                        self.findIndex((i: any) => i.id === item.id) === index
                    );
                })
                ?.map((item: any, index: number) => (
                    <SongTemplate
                        key={item?.id}
                        contextUri={contextUri}
                        startPlayingFn={startPlayingFn}
                        trackUri={item?.uri}
                        darkTheme={darkTheme}
                        index={index}
                        // imgUrl={item?.album?.images[0]?.url}
                        imgType="icon"
                        name={item?.name}
                        artist={item?.artists[0]?.name}
                        durationMs={item?.duration_ms}
                        data={data}
                        id={item?.id}
                    />
                ))}
        </div>
    );
};

export default Songs;
