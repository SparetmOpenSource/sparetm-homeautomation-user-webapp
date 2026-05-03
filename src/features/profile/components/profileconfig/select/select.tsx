import { useAllProfiles } from '../../../../../core/api/profileconfigapis';
import { useTheme } from '../../../../../core/router/themeprovider';
import { useAppSelector } from '../../../../../core/store/reduxhooks';
import { DATA_NOT_FOUND_MSG, ERROR_MSG } from '../../../../../data/constants';
import ErrorPage from '../../../../../shared/commoncomponents/errorpage/errorpage';
import LoadingFade from '../../../../../shared/commoncomponents/loadinganimation/loadingfade';
import ProfileGrid from '../../../../dashboard/components/coreappcomponents/grid/profilegrid';
import './select.css';

const Select = () => {
    const darkTheme = useTheme() as boolean;
    const admin = useAppSelector((state) => state.user?.admin);

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
