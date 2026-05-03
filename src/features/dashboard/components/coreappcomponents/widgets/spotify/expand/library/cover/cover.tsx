// refactor code -----------------------------
import { useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { useSpotifyDeleteAlbum } from '../../../../../../../../../core/api/spotify/api';
import { SPOTIFY_TOKEN_GLOBAL, SPOTIFY_ACCOUNT_TYPE_GLOBAL, SPOTIFY_PREMIUM_ACCOUNT_TYPE } from '../../../../../../../../../data/constants';
import { useProfileLocalStorage } from '../../../../../../../../../features/auth/utils/authhelpers';
import {
    invalidateQueries,
} from '../../../../../../../../../utils/helperfn';
import Card from './card';
import './cover.css';

interface CoverProps {
    listData: {
        data?: {
            body?: {
                items?: any;
            };
        };
    };
    type: number;
    darkTheme: boolean;
    handleOnClickCover: any;
    selectedLibraryUri?: string;
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
    const [accessToken] = useProfileLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');
    const [spotifyAcntType] = useProfileLocalStorage(SPOTIFY_ACCOUNT_TYPE_GLOBAL, '');
    const isPremium = spotifyAcntType?.trim().toLowerCase() === SPOTIFY_PREMIUM_ACCOUNT_TYPE;

    const onSuccess = () => {
        invalidateQueries(queryClient, [albumIdQueryIdToBeRefreshed]);
    };

    const { mutate: deleteFromAlbumList } = useSpotifyDeleteAlbum(accessToken, darkTheme, onSuccess);

    const renderCards = useMemo(() => {
        const items = listData?.data?.body?.items ?? [];
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
                    isPremium={isPremium}
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
    }, [listData, type, darkTheme, handleOnClickCover, selectedLibraryUri, deleteFromAlbumList]); // eslint-disable-line react-hooks/exhaustive-deps

    return <div className="spotify-library-cover-wrapper">{renderCards}</div>;
};

export default Cover;
