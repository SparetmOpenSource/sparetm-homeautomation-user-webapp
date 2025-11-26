// useSpotifyAccessTokenManager.ts
import { useRef } from 'react';
import { catchError } from '../../Utils/HelperFn';
import { usePostUpdateData } from '../useReactQuery_Update';
import { profileUrl } from '../ProfileConfigApis';
import { updateHeaderConfig } from '../Axios';
import useLocalStorage from '../../Hooks/UseLocalStorage';
import { SPOTIFY_TOKEN_GLOBAL, SPOTIFY_REFRESH_TOKEN_GLOBAL, SPOTIFY_ACCOUNT_TYPE_GLOBAL } from '../../Data/Constants';

export const useSpotifyAccessTokenManager = (
    darkTheme: any,
    handleRefresh: () => void,
) => {
    const isCalled = useRef(false);
    const [accessToken, setAccessToken] = useLocalStorage(SPOTIFY_TOKEN_GLOBAL, '');
    const [refreshToken, setRefreshToken] = useLocalStorage(SPOTIFY_REFRESH_TOKEN_GLOBAL, '');
    const [accountType, setAccountType] = useLocalStorage(SPOTIFY_ACCOUNT_TYPE_GLOBAL, '');

    const onSuccess = (data: any) => {
        const access_token = data?.data?.body?.access_token;
        const refresh_token = data?.data?.body?.refresh_token;

        if (access_token && refresh_token) {
            setAccessToken(access_token);
            setRefreshToken(refresh_token);
            handleRefresh();
        }

        const acctType = data?.data?.headers?.spotify_account_type?.[0];
        if (acctType) {
            setAccountType(acctType);
        }
    };

    const onError = (error: any) => {
        catchError(error, darkTheme);
    };

    const { mutate: callForAccessTokenByRefreshToken, isLoading } =
        usePostUpdateData(
            profileUrl.get_spotify_refresh_access_token,
            updateHeaderConfig,
            onSuccess,
            onError,
        );

    const callOnce = () => {
        if (!isCalled.current) {
            isCalled.current = true;
            // callForAccessTokenByRefreshToken();
        }
    };

    return { callForAccessTokenByRefreshToken: callOnce, isLoading };
};
