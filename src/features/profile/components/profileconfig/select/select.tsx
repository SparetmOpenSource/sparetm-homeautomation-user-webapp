import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAllProfiles } from '../../../../../core/api/Profileconfigapis';
import { useTheme } from '../../../../../core/router/Themeprovider';
import { useAppSelector } from '../../../../../core/store/Reduxhooks';
import { DATA_NOT_FOUND_MSG, ERROR_MSG } from '../../../../../data/Constants';
import ErrorPage from '../../../../../shared/commoncomponents/errorpage/Errorpage';
import LoadingFade from '../../../../../shared/commoncomponents/loadinganimation/Loadingfade';
import ProfileGrid from '../../../../dashboard/components/coreappcomponents/grid/Profilegrid';
import './Select.css';

const Select = () => {
    const darkTheme = useTheme() as boolean;
    const admin = useAppSelector((state) => state.user?.admin);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q')?.toLowerCase() || '';
    const [isSearching, setIsSearching] = useState(false);

    const {
        isLoading,
        isError,
        data: option,
    } = useAllProfiles(admin, darkTheme);

    useEffect(() => {
        setIsSearching(true);
        const timer = setTimeout(() => {
            setIsSearching(false);
        }, 500); // 500ms artificial delay for smoother UI transitions
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const filteredProfiles = option?.data?.body?.filter((profile: any) =>
        String(profile?.profileName || '').toLowerCase().includes(searchQuery)
    ) || [];

    return (
        <div className="select">
            {(isLoading || isSearching) && (
                <div className="select-isLoading">
                    <LoadingFade />
                </div>
            )}
            {!isLoading && !isSearching && isError && (
                <div className="select-profile-error">
                    <ErrorPage errMsg={ERROR_MSG} darkTheme={darkTheme} />
                </div>
            )}
            {!isLoading && !isSearching && !isError && filteredProfiles.length !== 0 && (
                <ProfileGrid data={filteredProfiles} />
            )}
            {!isLoading && !isSearching && !isError && filteredProfiles.length === 0 && (
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
