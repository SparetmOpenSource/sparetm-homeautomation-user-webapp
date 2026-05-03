import { useQuery } from 'react-query';
import { getSearchState } from '../../../core/api/spotify/api';
import useDebounce from '../../../hooks/usedebounce';

export const useSpotifySearch = (query: any, token: any) => {
    const debouncedQuery = useDebounce(query, 1000);

    return useQuery({
        queryKey: ['spotify-search', debouncedQuery, token],
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
        retry: false,
    });
};
