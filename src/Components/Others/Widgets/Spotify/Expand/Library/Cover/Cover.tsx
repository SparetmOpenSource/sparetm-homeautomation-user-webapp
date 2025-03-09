import './Cover.css';
import Card from './Card';

const Cover = ({
    listData,
    type,
    darkTheme,
    handleOnClickCover,
    selectedLibraryUri,
}: any) => {
    return (
        <div className="spotify-library-cover-wrapper">
            {type === 1 &&
                listData?.body?.items?.map((items: any) => (
                    <Card
                        key={items?.id}
                        id={items?.album?.id}
                        img={items?.images[0]?.url}
                        name={items?.name}
                        artist={items?.owner?.display_name}
                        darkTheme={darkTheme}
                        fn={handleOnClickCover}
                        libraryUri={items?.uri}
                        selectedLibraryUri={selectedLibraryUri}
                    />
                ))}
            {type === 2 &&
                listData?.body?.items?.map((items: any, index: any) => (
                    <Card
                        key={items?.album?.id}
                        id={index}
                        img={items?.album?.images[0]?.url}
                        name={items?.album?.name}
                        artist={items?.album?.artists[0]?.name}
                        darkTheme={darkTheme}
                        fn={handleOnClickCover}
                        libraryUri={items?.album?.uri}
                        selectedLibraryUri={selectedLibraryUri}
                    />
                ))}
        </div>
    );
};

export default Cover;
