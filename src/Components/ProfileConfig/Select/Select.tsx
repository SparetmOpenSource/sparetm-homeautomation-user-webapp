import { getProfiles } from '../../../Api.tsx/ProfileConfigApis';
import { useReactQuery_Get } from '../../../Api.tsx/useReactQuery_Get';
import { SELECT_PROFILE_QUERY_ID } from '../../../Data/QueryConstant';
import { useAppDispatch, useAppSelector } from '../../../Features/ReduxHooks';
import { useTheme } from '../../../Pages/ThemeProvider';
import { catchError } from '../../../Utils/HelperFn';
import ProfileGrid from '../../Others/Grid/ProfileGrid';
import LoadingFade from '../../Others/LoadingAnimation/LoadingFade';
import './Select.css';
import { DATA_NOT_FOUND_MSG, ERROR_MSG } from '../../../Data/Constants';
import ErrorPage from '../../Others/ErrorPage/ErrorPage';
import { useEffect } from 'react';
import { resetProfile } from '../../../Features/User/UserSlice';

const Select = () => {
    const darkTheme: any = useTheme();
    const admin = useAppSelector((state: any) => state?.user?.admin);
    const dispatch = useAppDispatch();
    
    const getProfile = () => {
        return getProfiles(admin, darkTheme);
    };

    // Reset profile state when entering selection screen
    useEffect(() => {
        dispatch(resetProfile());
    }, [dispatch]);

    const on_Success = () => {};
    
    const on_Error = (error: any) => {
        catchError(error, darkTheme);
    };

    const {
        isLoading,
        isError,
        data: option,
    } = useReactQuery_Get(
        SELECT_PROFILE_QUERY_ID,
        getProfile,
        on_Success,
        on_Error,
        true, // !fetch_On_Click_Status
        true, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        300000, // Cache time
        0, // Stale Time
    );

    return (
        <div className="select">
            {isLoading && (
                <div className="select-isLoading">
                    <LoadingFade />
                </div>
            )}
            {!isLoading && isError && (
                <div className="select-profile-error">
                    <ErrorPage errMsg={ERROR_MSG} darkTheme={darkTheme} />
                </div>
            )}
            {!isLoading && !isError && option?.data?.body?.length !== 0 && (
                <ProfileGrid data={option?.data?.body} />
            )}
            {!isLoading && !isError && option?.data?.body?.length === 0 && (
                <div className="select-profile-notfound">
                    <ErrorPage
                        errMsg={DATA_NOT_FOUND_MSG}
                        darkTheme={darkTheme}
                    />
                </div>
            )}
        </div>
    );
};

export default Select;
