// useSpotifyAccessTokenManager.ts
import { useRef } from 'react';
import { catchError } from '../../Utils/HelperFn';
import { usePostUpdateData } from '../useReactQuery_Update';
import { profileUrl } from '../ProfileConfigApis';
import { updateHeaderConfig } from '../Axios';
import { useAppDispatch } from '../../Features/ReduxHooks';
import {
    setSpotifyAccountType,
    setSpotifyTokens,
} from '../../Features/Spotify/SpotifySlice';

export const useSpotifyAccessTokenManager = (
    darkTheme: any,
    handleRefresh: () => void,
) => {
    const isCalled = useRef(false);
    const dispatch = useAppDispatch();

    const onSuccess = (data: any) => {
        const access_token = data?.data?.body?.access_token;
        const refresh_token = data?.data?.body?.refresh_token;

        if (access_token && refresh_token) {
            dispatch(
                setSpotifyTokens({
                    accessToken: access_token,
                    refreshToken: refresh_token,
                }),
            );
            handleRefresh();
        }

        const accountType = data?.data?.headers?.spotify_account_type?.[0];
        if (accountType) {
            dispatch(setSpotifyAccountType(accountType));
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
