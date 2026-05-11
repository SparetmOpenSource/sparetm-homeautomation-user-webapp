import { useQuery } from 'react-query';
import { getSearchState } from '../../../core/api/spotify/Api';
import useDebounce from '../../../hooks/useDebounce';

export const useSpotifySearch = (query: any, token: any) => {
    const debouncedQuery = useDebounce(query, 300);

    return useQuery({
        queryKey: ['spotify-search', debouncedQuery, token],
        queryFn: ({ signal }) =>
            getSearchState(
                debouncedQuery,
                'track,playlist,artist,album',
                10,
                0,
                token,
                signal
            ),
        enabled: !!debouncedQuery && !!token,
        staleTime: 60 * 1000,
        retry: false,
    });
};
