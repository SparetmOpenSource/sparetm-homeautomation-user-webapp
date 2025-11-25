import { useQuery } from 'react-query';
import useDebounce from './useDebounce';
import { getSearchState } from '../Api.tsx/Spotify/Api';

export const useSpotifySearch = (query: any, token: any) => {
    const debouncedQuery = useDebounce(query, 1000);

    return useQuery({
        queryKey: ['spotify-search', debouncedQuery],
        queryFn: () =>
            getSearchState(
                debouncedQuery,
                'track,playlist,artist,album',
                10,
                0,
                token,
            ),
        enabled: !!debouncedQuery && !!token,
        staleTime: 60 * 1000,
        retry: 1,
    });
};
