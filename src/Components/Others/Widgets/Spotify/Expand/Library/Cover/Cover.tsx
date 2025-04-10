// import './Cover.css';
// import Card from './Card';
// import { featureUrl } from '../../../../../../../Api.tsx/CoreAppApis';
// import { useDeleteData } from '../../../../../../../Api.tsx/useReactQuery_Update';
// import {
//     catchError,
//     invalidateQueries,
// } from '../../../../../../../Utils/HelperFn';
// import { useQueryClient } from 'react-query';
// import { getMergedHeadersForSpotify } from '../../../../../../../Api.tsx/Axios';

// const Cover = ({
//     listData,
//     type,
//     darkTheme,
//     handleOnClickCover,
//     selectedLibraryUri,
//     albumIdQueryIdToBeRefreshed,
// }: any) => {
//     const queryClient = useQueryClient();

//     const on_removing_from_album_success = () => {
//         let queryArray: any = [];
//         queryArray.push(albumIdQueryIdToBeRefreshed);
//         invalidateQueries(queryClient, queryArray);
//     };

//     const on_error = (error: any) => {
//         catchError(error, darkTheme);
//     };

//     const updateHeaderConfig = {
//         headers: getMergedHeadersForSpotify(
//             localStorage.getItem('spotify_access_token'),
//         ),
//     };

//     const { mutate: deleteFromAlbumList } = useDeleteData(
//         featureUrl.spotify_base_url + `?data=deletefromalbumlist&id=%id%`,
//         updateHeaderConfig,
//         on_removing_from_album_success,
//         on_error,
//     );

//     return (
//         <div className="spotify-library-cover-wrapper">
//             {type === 1 &&
//                 listData?.body?.items?.map((items: any) => (
//                     <Card
// key={items?.id}
// id={items?.album?.id}
// img={items?.images[0]?.url}
// name={items?.name}
// artist={items?.owner?.display_name}
// darkTheme={darkTheme}
// fn={() => handleOnClickCover(items?.id, items?.uri)}
// libraryUri={items?.uri}
// selectedLibraryUri={selectedLibraryUri}
// type={1}
// triggerDeletion={deleteFromAlbumList}
// docId={items?.id}
//                     />
//                 ))}
//             {type === 2 &&
//                 listData?.body?.items?.map((items: any, index: any) => (
//                     <Card
// key={items?.album?.id}
// id={index}
// img={items?.album?.images[0]?.url}
// name={items?.album?.name}
// artist={items?.album?.artists[0]?.name}
// darkTheme={darkTheme}
// fn={handleOnClickCover}
// libraryUri={items?.album?.uri}
// selectedLibraryUri={selectedLibraryUri}
// type={2}
// triggerDeletion={deleteFromAlbumList}
// docId={items?.album?.id}
//                     />
//                 ))}
//         </div>
//     );
// };

// export default Cover;

// refactor code -----------------------------
import './Cover.css';
import Card from './Card';
import { featureUrl } from '../../../../../../../Api.tsx/CoreAppApis';
import { useDeleteData } from '../../../../../../../Api.tsx/useReactQuery_Update';
import {
    catchError,
    invalidateQueries,
} from '../../../../../../../Utils/HelperFn';
import { useQueryClient } from 'react-query';
import { getMergedHeadersForSpotify } from '../../../../../../../Api.tsx/Axios';
import { useMemo } from 'react';

interface CoverProps {
    listData: {
        body?: {
            items?: any;
        };
    };
    type: number;
    darkTheme: boolean;
    handleOnClickCover: any;
    selectedLibraryUri: string;
    albumIdQueryIdToBeRefreshed: string;
}

const Cover = ({
    listData,
    type,
    darkTheme,
    handleOnClickCover,
    selectedLibraryUri,
    albumIdQueryIdToBeRefreshed,
}: CoverProps) => {
    const queryClient = useQueryClient();

    const onSuccess = () => {
        invalidateQueries(queryClient, [albumIdQueryIdToBeRefreshed]);
    };

    const onError = (error: any) => {
        catchError(error, darkTheme);
    };

    const updateHeaderConfig = {
        headers: getMergedHeadersForSpotify(
            localStorage.getItem('spotify_access_token'),
        ),
    };

    const { mutate: deleteFromAlbumList } = useDeleteData(
        `${featureUrl.spotify_base_url}?data=deletefromalbumlist&id=%id%`,
        updateHeaderConfig,
        onSuccess,
        onError,
    );

    const renderCards = useMemo(() => {
        const items = listData?.body?.items ?? [];
        return items.map((item: any, index: any) => {
            const isType1 = type === 1;
            const data = isType1 ? item : item.album;

            if (!data?.id) return null;

            return (
                <Card
                    key={data.id}
                    id={isType1 ? item?.album?.id : index}
                    img={data.images?.[0]?.url}
                    name={data.name}
                    artist={
                        isType1
                            ? item.owner?.display_name
                            : data?.artists?.[0]?.name
                    }
                    darkTheme={darkTheme}
                    fn={
                        isType1
                            ? () => handleOnClickCover(item?.id, item?.uri)
                            : handleOnClickCover
                    }
                    libraryUri={data.uri}
                    selectedLibraryUri={selectedLibraryUri}
                    type={type}
                    triggerDeletion={deleteFromAlbumList}
                    docId={data.id}
                />
            );
        });
    }, [listData, type, darkTheme, handleOnClickCover, selectedLibraryUri]); // eslint-disable-line react-hooks/exhaustive-deps

    return <div className="spotify-library-cover-wrapper">{renderCards}</div>;
};

export default Cover;
