import { useAllProfiles } from '../../../Api/ProfileConfigApis';
import { useAppDispatch, useAppSelector } from '../../../Features/ReduxHooks';
import { useTheme } from '../../../Pages/ThemeProvider';
import ProfileGrid from '../../Shared/CoreAppComponents/Grid/ProfileGrid';
import LoadingFade from '../../Shared/CommonComponents/LoadingAnimation/LoadingFade';
import './Select.css';
import { DATA_NOT_FOUND_MSG, ERROR_MSG } from '../../../Data/Constants';
import ErrorPage from '../../Shared/CommonComponents/ErrorPage/ErrorPage';
import { useEffect } from 'react';
import { resetProfile } from '../../../Features/User/UserSlice';

const Select = () => {
    const darkTheme: any = useTheme();
    const admin = useAppSelector((state: any) => state?.user?.admin);
    const dispatch = useAppDispatch();
    
    // Reset profile state when entering selection screen
    useEffect(() => {
        dispatch(resetProfile());
    }, [dispatch]);

    const {
        isLoading,
        isError,
        data: option,
    } = useAllProfiles(admin, darkTheme);

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
