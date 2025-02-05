import { getProfiles } from '../../../Api.tsx/ProfileConfigApis';
import { useReactQuery_Get } from '../../../Api.tsx/useReactQuery_Get';
import { SELECT_PROFILE_QUERY_ID } from '../../../Data/QueryConstant';
import { useAppSelector } from '../../../Features/ReduxHooks';
import { useTheme } from '../../../Pages/ThemeProvider';
import { catchError, navigateTo } from '../../../Utils/HelperFn';
import ProfileGrid from '../../Others/Grid/ProfileGrid';
import LoadingFade from '../../Others/LoadingAnimation/LoadingFade';
import './Select.css';
import Error from '../../Others/ErrorPage/ErrorPage';
import NoData from '../../Others/NoData/NoData';
import { RoutePath } from '../../../Data/Constants';
// import { useColorNotification } from '../../../App';
import { useNavigate } from 'react-router-dom';

const Select = () => {
    const darkTheme: any = useTheme();
    const navigate = useNavigate();
    const admin = useAppSelector((state: any) => state?.user?.admin);
    // const handleColorNotificationChange = useColorNotification();
    const getProfile = () => {
        return getProfiles(admin, darkTheme);
    };
    const on_Success = () => {
        // handleColorNotificationChange(colorNotificationStatus[0]);
    };
    const on_Error = (error: any) => {
        // handleColorNotificationChange(colorNotificationStatus[1]);
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

    const navigateToLoc = () => {
        navigateTo(navigate, RoutePath.AddProfileConfig);
    };

    return (
        <div className="select">
            {isLoading && (
                <div className="select_isLoading">
                    <LoadingFade />
                </div>
            )}
            {!isLoading && isError && (
                <div className="select_profile_error">
                    <Error />
                </div>
            )}
            {!isLoading && !isError && option?.data?.body?.length !== 0 && (
                <ProfileGrid data={option?.data?.body} />
            )}
            {!isLoading && !isError && option?.data?.body?.length === 0 && (
                <div className="select_profile_notfound">
                    <NoData
                        item="profile"
                        message1="click "
                        onClickMessage="here"
                        message2=" to add profile"
                        fn={() => navigateToLoc()}
                    />
                </div>
            )}
        </div>
    );
};

export default Select;
