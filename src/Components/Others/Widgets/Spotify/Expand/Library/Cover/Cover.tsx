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
import useLocalStorage from '../../../../../../../Hooks/UseLocalStorage';
import { SPOTIFY_TOKEN_GLOBAL } from '../../../../../../../Data/Constants';

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
    const [accessToken] = useLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');

    const onSuccess = () => {
        invalidateQueries(queryClient, [albumIdQueryIdToBeRefreshed]);
    };

    const onError = (error: any) => {
        catchError(error, darkTheme);
    };

    const updateHeaderConfig = {
        headers: getMergedHeadersForSpotify(accessToken),
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
