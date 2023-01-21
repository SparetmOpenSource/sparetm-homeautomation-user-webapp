import './SelectProfile.css';
import LoadingFade from '../../Others/LoadingAnimation/LoadingFade/LoadingFade';
import ProfileCard from '../ProfileCard/ProfileCard';
import { useOutletContext } from 'react-router-dom';
import { ReactQueryFetch } from '../../../API/ReactQuery';
import { getAppAdminUser } from '../../../Utils/AuthHelperFn';
import { getProfiles } from '../../../API/ProfileConfigApi';


const SelectProfile = () => {
    const ColorValue: any = useOutletContext();
    const appUser = getAppAdminUser();
    /*{----------------------------------------------------------------------------------------------------------}*/

    const profiles = () => {
        return getProfiles(appUser);
    };
    const onSuccess = (data: any) => {
        // toast.success('successfully fetched');
        console.log(data?.data);
    };
    const onError = (error: any) => {
        // toast.error(error.message);
        console.log(error.response.data?.message);
    };
    const status = true;
    const { isLoading, data } = ReactQueryFetch(
        'select_profile',
        profiles,
        onSuccess,
        onError,
        status,
    );

    /*{----------------------------------------------------------------------------------------------------------}*/

    return (
        <div
            className="selectProfile"
            style={{ background: ColorValue + '80' }}
        >
            <div className="selectProfile_search">
                <input
                    type="text"
                    placeholder="Search with profile name, city, country..."
                />
            </div>
            <div className="selectProfile_wrapper">
                {isLoading && (
                    <div className="selectProfile_wrapper_isLoading">
                        <LoadingFade />
                    </div>
                )}
                {!isLoading && (
                    <div className="selectProfile_wrapper_loaded">
                        {data?.data?.body?.map((el: any) => (
                            <ProfileCard
                                key={el.profileId}
                                profileId={el.profileId}
                                profileName={el.profileName}
                                roomCount={el.roomCount}
                                deviceCount={el.deviceCount}
                                col={ColorValue}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectProfile;
